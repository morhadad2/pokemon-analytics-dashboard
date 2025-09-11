import axios from 'axios';
import Pokemon, { IPokemon } from '../models/Pokemon';

const POKEMON_API_BASE = 'https://pokeapi.co/api/v2';

interface PokemonAPIResponse {
  id: number;
  name: string;
  types: Array<{ type: { name: string } }>;
  height: number;
  weight: number;

  stats: Array<{
    base_stat: number;
    stat: { name: string };
  }>;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

interface SpeciesResponse {
  evolution_chain: {
    url: string;
  };
}

interface EvolutionChainResponse {
  chain: {
    species: { name: string };
    evolves_to: Array<{
      species: { name: string };
      evolves_to: Array<{
        species: { name: string };
        evolves_to: any[];
      }>;
    }>;
  };
}

export class PokemonService {
  static async getPokemonStats(): Promise<{ total: number; lastId: number; progress: string }> {
    try {
      const total = await Pokemon.countDocuments();
      const lastPokemon = await Pokemon.findOne().sort({ pokemonId: -1 });
      const lastId = lastPokemon ? lastPokemon.pokemonId : 0;
      const progress = `${total}/1070 (${((total / 1070) * 100).toFixed(1)}%)`;
      
      return { total, lastId, progress };
    } catch (error) {
      console.error('Error getting Pokemon stats:', error);
      throw error;
    }
  }
  private static async fetchPokemonData(pokemonId: number): Promise<PokemonAPIResponse> {
    try {
      const response = await axios.get(`${POKEMON_API_BASE}/pokemon/${pokemonId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching Pokemon ${pokemonId}:`, error);
      throw error;
    }
  }

  private static async fetchSpeciesData(pokemonId: number): Promise<SpeciesResponse> {
    try {
      const response = await axios.get(`${POKEMON_API_BASE}/pokemon-species/${pokemonId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching species for Pokemon ${pokemonId}:`, error);
      throw error;
    }
  }

  private static async fetchEvolutionChain(chainUrl: string): Promise<EvolutionChainResponse> {
    try {
      const response = await axios.get(chainUrl);
      return response.data;
    } catch (error) {
      console.error(`Error fetching evolution chain:`, error);
      throw error;
    }
  }

  private static determineEvolutionStage(pokemonName: string, evolutionChain: EvolutionChainResponse): number {
    const chain = evolutionChain.chain;
    
    // Check if it's the first evolution (base form)
    if (chain.species.name === pokemonName) {
      return 1;
    }
    
    // Check if it's the second evolution
    for (const firstEvolution of chain.evolves_to) {
      if (firstEvolution.species.name === pokemonName) {
        return 2;
      }
      
      // Check if it's the third evolution
      for (const secondEvolution of firstEvolution.evolves_to) {
        if (secondEvolution.species.name === pokemonName) {
          return 3;
        }
      }
    }
    
    // Default to first evolution if not found
    return 1;
  }

  private static processPokemonData(apiData: PokemonAPIResponse, evolutionStage: number): Partial<IPokemon> {
    const stats = apiData.stats.reduce((acc, stat) => {
      const statName = stat.stat.name.replace('-', '');
      acc[statName] = stat.base_stat;
      return acc;
    }, {} as any);

    return {
      pokemonId: apiData.id,
      name: apiData.name,
      types: apiData.types.map(t => t.type.name),
      height: apiData.height,
      weight: apiData.weight,
      imageUrl: apiData.sprites.other['official-artwork'].front_default || apiData.sprites.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${apiData.id}.png`,
      stats: {
        hp: stats.hp || 0,
        attack: stats.attack || 0,
        defense: stats.defense || 0,
        specialAttack: stats.specialattack || 0,
        specialDefense: stats.specialdefense || 0,
        speed: stats.speed || 0
      } as any,
      evolutionStage,
      isFirstEvolution: evolutionStage === 1,
      isSecondEvolution: evolutionStage === 2,
      isThirdEvolution: evolutionStage === 3,
      fetchedAt: new Date()
    };
  }

  static async fetchAndStorePokemon(pokemonId: number): Promise<IPokemon | null> {
    try {
      // Check if Pokemon already exists
      const existingPokemon = await Pokemon.findOne({ pokemonId });
      if (existingPokemon) {
        console.log(`Pokemon ${pokemonId} already exists, skipping...`);
        return existingPokemon;
      }

      // Fetch Pokemon data
      const pokemonData = await this.fetchPokemonData(pokemonId);
      
      // Fetch species data to get evolution chain
      const speciesData = await this.fetchSpeciesData(pokemonId);
      
      // Fetch evolution chain
      const evolutionChain = await this.fetchEvolutionChain(speciesData.evolution_chain.url);
      
      // Determine evolution stage
      const evolutionStage = this.determineEvolutionStage(pokemonData.name, evolutionChain);
      
      // Process and save Pokemon data
      const processedData = this.processPokemonData(pokemonData, evolutionStage);
      const pokemon = new Pokemon(processedData);
      
      const savedPokemon = await pokemon.save();
      console.log(`Successfully saved Pokemon: ${savedPokemon.name} (ID: ${savedPokemon.pokemonId})`);
      
      return savedPokemon;
    } catch (error: any) {
      // Handle 404 errors (Pokemon not found) gracefully
      if (error.response?.status === 404) {
        console.log(`Pokemon ${pokemonId} not found in PokeAPI, skipping...`);
        return null;
      }
      
      console.error(`Error processing Pokemon ${pokemonId}:`, error);
      throw error;
    }
  }

  static async fetchNext50Pokemon(): Promise<void> {
    try {
      console.log('Starting to fetch next 50 Pokemon...');
      
      // Get the highest Pokemon ID we have
      const lastPokemon = await Pokemon.findOne().sort({ pokemonId: -1 });
      const startId = lastPokemon ? lastPokemon.pokemonId + 1 : 1;
      
      const MAX_POKEMON_ID = 1000;
      const endId = Math.min(startId + 50, MAX_POKEMON_ID + 1);
      
      if (startId > MAX_POKEMON_ID) {
        console.log(`All Pokemon have been fetched! no data to fetch`);
        return;
      }
      
      const promises = [];
      for (let i = startId; i < endId; i++) {
        promises.push(this.fetchAndStorePokemon(i));
      }
      
      const results = await Promise.allSettled(promises);
      
      // Count successful and failed fetches
      const successful = results.filter(result => result.status === 'fulfilled').length;
      const failed = results.filter(result => result.status === 'rejected').length;
      
      console.log(`Completed fetching Pokemon batch starting from ID ${startId}`);
      console.log(`Successfully fetched: ${successful} Pokemon`);
      console.log(`Failed to fetch: ${failed} Pokemon`);
      
      // If we hit the limit, log it
      if (endId >= MAX_POKEMON_ID) {
        console.log(`🎯 Reached PokeAPI limit (${MAX_POKEMON_ID} Pokemon).`);
      }
      
    } catch (error) {
      console.error('Error fetching Pokemon batch:', error);
      throw error;
    }
  }
}

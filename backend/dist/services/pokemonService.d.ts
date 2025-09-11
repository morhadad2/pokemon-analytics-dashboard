import { IPokemon } from '../models/Pokemon';
export declare class PokemonService {
    private static fetchPokemonData;
    private static fetchSpeciesData;
    private static fetchEvolutionChain;
    private static determineEvolutionStage;
    private static processPokemonData;
    static fetchAndStorePokemon(pokemonId: number): Promise<IPokemon>;
    static fetchNext50Pokemon(): Promise<void>;
}
//# sourceMappingURL=pokemonService.d.ts.map
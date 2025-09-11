
export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface Pokemon {
  _id: string;
  pokemonId: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
  stats: PokemonStats;
evolutionStage: number;
  isFirstEvolution: boolean;
  isSecondEvolution: boolean;
  isThirdEvolution: boolean;
  imageUrl: string;
  fetchedAt: string;
}

export interface Distribution {
  _id: string;
  count: number;
}

export interface PokemonStatsSummary {
  totalPokemon: number;
  avgHp: number;
  avgAttack: number;
  avgDefense: number;
  avgSpecialAttack: number;
  avgSpecialDefense: number;
  avgSpeed: number;
  maxHp: number;
  maxAttack: number;
  maxDefense: number;
  maxSpecialAttack: number;
  maxSpecialDefense: number;
  maxSpeed: number;
}

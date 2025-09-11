import mongoose, { Document, Schema } from 'mongoose';

export interface IPokemonStats extends Document {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

const PokemonStatsSchema: Schema = new Schema({
    hp: { type: Number, required: true },
    attack: { type: Number, required: true },
    defense: { type: Number, required: true },
    specialAttack: { type: Number, required: true },
    specialDefense: { type: Number, required: true },
    speed: { type: Number, required: true }
  });


export interface IPokemon extends Document {
  pokemonId: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
  stats: IPokemonStats;
  evolutionStage: number; // 1, 2, or 3
  isFirstEvolution: boolean;
  isSecondEvolution: boolean;
  isThirdEvolution: boolean;
  imageUrl: string;
  fetchedAt: Date;
}


const PokemonSchema: Schema = new Schema({
  pokemonId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  types: [{
    type: String,
    required: true
  }],
  height: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  stats: {
    type: PokemonStatsSchema,
    required: true
  },
  evolutionStage: {
    type: Number,
    required: true,
    min: 1,
    max: 3
  },
  isFirstEvolution: {
    type: Boolean,
    required: true
  },
  isSecondEvolution: {
    type: Boolean,
    required: true
  },
  isThirdEvolution: {
    type: Boolean,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  fetchedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IPokemon>('Pokemon', PokemonSchema);

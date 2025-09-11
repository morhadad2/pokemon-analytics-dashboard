import mongoose, { Document } from 'mongoose';
export interface IPokemonStats extends Document {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
}
export interface IPokemon extends Document {
    pokemonId: number;
    name: string;
    types: string[];
    height: number;
    weight: number;
    stats: IPokemonStats;
    evolutionStage: number;
    isFirstEvolution: boolean;
    isSecondEvolution: boolean;
    isThirdEvolution: boolean;
    imageUrl: string;
    fetchedAt: Date;
}
declare const _default: mongoose.Model<IPokemon, {}, {}, {}, mongoose.Document<unknown, {}, IPokemon, {}, {}> & IPokemon & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Pokemon.d.ts.map
import mongoose, { Document } from 'mongoose';
export interface IPokemonStats extends Document {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
}
declare const _default: mongoose.Model<IPokemonStats, {}, {}, {}, mongoose.Document<unknown, {}, IPokemonStats, {}, {}> & IPokemonStats & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=PokemonStats.d.ts.map
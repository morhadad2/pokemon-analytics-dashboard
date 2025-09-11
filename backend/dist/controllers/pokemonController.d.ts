import { Request, Response } from 'express';
export declare const getAllPokemon: (req: Request, res: Response) => Promise<void>;
export declare const getPokemonById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const searchPokemon: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getPokemonStats: (req: Request, res: Response) => Promise<void>;
export declare const getTypeDistribution: (req: Request, res: Response) => Promise<void>;
export declare const getEvolutionDistribution: (req: Request, res: Response) => Promise<void>;
export declare const getTopPokemonByStat: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getGenerationDistribution: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=pokemonController.d.ts.map
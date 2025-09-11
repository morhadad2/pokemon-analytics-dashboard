import { Request, Response } from 'express';
export declare const getTypeDistribution: (req: Request, res: Response) => Promise<void>;
export declare const getEvolutionDistribution: (req: Request, res: Response) => Promise<void>;
export declare const getTopPokemonByStat: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getRarityAnalysis: (req: Request, res: Response) => Promise<void>;
export declare const getStatsEvolutionOverTime: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=dashboardController.d.ts.map
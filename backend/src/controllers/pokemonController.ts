import { Request, Response } from 'express';
import Pokemon from '../models/Pokemon';

export const getAllPokemon = async (req: Request, res: Response) => {
  try {
    const pokemon = await Pokemon.find().sort({ pokemonId: 1 });
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Pokemon data' });
  }
};

export const getPokemonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pokemon = await Pokemon.findOne({ pokemonId: parseInt(id) });
    
    if (!pokemon) {
      return res.status(404).json({ message: 'Pokemon not found' });
    }
    
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Pokemon' });
  }
};

export const searchPokemon = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    
    if (!name) {
      return res.status(400).json({ message: 'Name parameter is required' });
    }
    
    const pokemon = await Pokemon.find({
      name: { $regex: name as string, $options: 'i' }
    }).limit(10);
    
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ message: 'Error searching Pokemon' });
  }
};

export const getPokemonStats = async (req: Request, res: Response) => {
  try {
    const stats = await Pokemon.aggregate([
      {
        $group: {
          _id: null,
          totalPokemon: { $sum: 1 },
          avgHp: { $avg: '$stats.hp' },
          avgAttack: { $avg: '$stats.attack' },
          avgDefense: { $avg: '$stats.defense' },
          avgSpecialAttack: { $avg: '$stats.specialAttack' },
          avgSpecialDefense: { $avg: '$stats.specialDefense' },
          avgSpeed: { $avg: '$stats.speed' },
          maxHp: { $max: '$stats.hp' },
          maxAttack: { $max: '$stats.attack' },
          maxDefense: { $max: '$stats.defense' },
          maxSpecialAttack: { $max: '$stats.specialAttack' },
          maxSpecialDefense: { $max: '$stats.specialDefense' },
          maxSpeed: { $max: '$stats.speed' }
        }
      }
    ]);
    
    res.json(stats[0] || {});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Pokemon stats' });
  }
};

export const getTypeDistribution = async (req: Request, res: Response) => {
  try {
    const typeDistribution = await Pokemon.aggregate([
      { $unwind: '$types' },
      {
        $group: {
          _id: '$types',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    res.json(typeDistribution);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching type distribution' });
  }
};

export const getEvolutionDistribution = async (req: Request, res: Response) => {
  try {
    const evolutionDistribution = await Pokemon.aggregate([
      {
        $group: {
          _id: '$evolutionStage',
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    res.json(evolutionDistribution);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching evolution distribution' });
  }
};

export const getTopPokemonByStat = async (req: Request, res: Response) => {
  try {
    const { stat } = req.params;
    const validStats = ['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'];
    
    if (!validStats.includes(stat)) {
      return res.status(400).json({ message: 'Invalid stat name' });
    }
    
    const topPokemon = await Pokemon.find()
      .sort({ [`stats.${stat}`]: -1 })
      .limit(10)
      .select(`name pokemonId stats.${stat} types`);
    
    res.json(topPokemon);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top Pokemon by stat' });
  }
};

export const getGenerationDistribution = async (req: Request, res: Response) => {
  try {
    const generationDistribution = await Pokemon.aggregate([
      { $group: { _id: '$generation', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    res.json(generationDistribution);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching generation distribution' });
  }
};

import axios from 'axios';
import { 
  Pokemon, 
  Distribution, 
  PokemonStatsSummary 
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const pokemonAPI = {
  // Get all Pokemon
  getAllPokemon: async (): Promise<Pokemon[]> => {
    const response = await api.get('/pokemon');
    return response.data;
  },

  // Get Pokemon by ID
  getPokemonById: async (id: number): Promise<Pokemon> => {
    const response = await api.get(`/pokemon/${id}`);
    return response.data;
  },

  // Search Pokemon by name
  searchPokemon: async (name: string): Promise<Pokemon[]> => {
    const response = await api.get(`/pokemon/search?name=${encodeURIComponent(name)}`);
    return response.data;
  },

  // Get Pokemon statistics
  getPokemonStats: async (): Promise<PokemonStatsSummary> => {
    const response = await api.get('/pokemon/stats');
    return response.data;
  },

  // Get type distribution
  getTypeDistribution: async (): Promise<Distribution[]> => {
    const response = await api.get('/pokemon/types');
    return response.data;
  },

  // Get evolution distribution
  getEvolutionDistribution: async (): Promise<Distribution[]> => {
    const response = await api.get('/pokemon/evolution');
    return response.data;
  },

  // Get top Pokemon by stat
  getTopPokemonByStat: async (stat: string): Promise<Pokemon[]> => {
    const response = await api.get(`/pokemon/top/${stat}`);
    return response.data;
  },

  // Get rarity analysis
  getRarityAnalysis: async (): Promise<any> => {
    const response = await api.get('/pokemon/rarity');
    return response.data;
  },
};

export default api;

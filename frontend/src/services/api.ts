import axios from 'axios';
import { 
  DataPoint, 
  CreateDataPointRequest, 
  Pokemon, 
  TypeDistribution, 
  EvolutionDistribution, 
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

export const dashboardAPI = {
  // Get all dashboard data
  getData: async (): Promise<DataPoint[]> => {
    const response = await api.get('/dashboard');
    return response.data;
  },

  // Create new data point
  createDataPoint: async (data: CreateDataPointRequest): Promise<DataPoint> => {
    const response = await api.post('/dashboard', data);
    return response.data;
  },

  // Update data point
  updateDataPoint: async (id: string, data: CreateDataPointRequest): Promise<DataPoint> => {
    const response = await api.put(`/dashboard/${id}`, data);
    return response.data;
  },

  // Delete data point
  deleteDataPoint: async (id: string): Promise<void> => {
    await api.delete(`/dashboard/${id}`);
  },
};

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
  getTypeDistribution: async (): Promise<TypeDistribution[]> => {
    const response = await api.get('/pokemon/types');
    return response.data;
  },

  // Get evolution distribution
  getEvolutionDistribution: async (): Promise<EvolutionDistribution[]> => {
    const response = await api.get('/pokemon/evolution');
    return response.data;
  },

  // Get top Pokemon by stat
  getTopPokemonByStat: async (stat: string): Promise<Pokemon[]> => {
    const response = await api.get(`/pokemon/top/${stat}`);
    return response.data;
  },
};

export default api;

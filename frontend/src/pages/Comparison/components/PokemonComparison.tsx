import React, { useState, useEffect } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Pokemon } from '../../../types';
import { pokemonAPI } from '../../../services/api';
import ComparedPokemon from './ComparedPokemon';
import { FormCard, Button } from '../../../shared/components/ui';
import {
  ComparisonGrid,
  ChartsContainer,
  ChartWrapper,
  ChartTitle,
  ComparisonMessage
} from './';

// Color palette for multiple Pokemon comparison
const POKEMON_COLORS = [
  { stroke: '#3498db', fill: '#3498db' }, // Blue
  { stroke: '#e74c3c', fill: '#e74c3c' }, // Red  
  { stroke: '#2ecc71', fill: '#2ecc71' }, // Green
  { stroke: '#f39c12', fill: '#f39c12' }, // Orange
  { stroke: '#9b59b6', fill: '#9b59b6' }, // Purple
  { stroke: '#1abc9c', fill: '#1abc9c' }, // Turquoise
];

interface ComparedPokemonData {
  id: string;
  pokemon: Pokemon | null;
  searchTerm: string;
}

const PokemonComparison: React.FC = () => {
  const MAX_POKEMON_COUNT = 3;
  const [comparedPokemon, setComparedPokemon] = useState<ComparedPokemonData[]>([
    { id: '1', pokemon: null, searchTerm: '' },
    { id: '2', pokemon: null, searchTerm: '' }
  ]);
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const data = await pokemonAPI.getAllPokemon();
        setAllPokemon(data);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      }
    };

    fetchAllPokemon();
  }, []);

  const handlePokemonSelect = (id: string, pokemon: Pokemon) => {
    setComparedPokemon(prev => prev.map(item => 
      item.id === id 
        ? { ...item, pokemon, searchTerm: pokemon.name }
        : item
    ));
  };

  const handleSearchChange = (id: string, term: string) => {
    setComparedPokemon(prev => prev.map(item => 
      item.id === id 
        ? { ...item, searchTerm: term }
        : item
    ));
  };

  const addPokemonSlot = () => {
    if (comparedPokemon.length < MAX_POKEMON_COUNT) { // Limit to 6 for readability
      const newId = (comparedPokemon.length + 1).toString();
      setComparedPokemon(prev => [...prev, { id: newId, pokemon: null, searchTerm: '' }]);
    }
  };

  const removePokemonSlot = (id: string) => {
    if (comparedPokemon.length > 2) { // Keep minimum of 2
      setComparedPokemon(prev => prev.filter(item => item.id !== id));
    }
  };

  const getComparisonData = () => {
    const selectedPokemon = comparedPokemon.filter(item => item.pokemon);
    if (selectedPokemon.length < 2) return [];

    return [
      {
        stat: 'HP',
        ...selectedPokemon.reduce((acc, item) => ({
          ...acc,
          [item.pokemon!.name]: item.pokemon!.stats.hp
        }), {})
      },
      {
        stat: 'Attack',
        ...selectedPokemon.reduce((acc, item) => ({
          ...acc,
          [item.pokemon!.name]: item.pokemon!.stats.attack
        }), {})
      },
      {
        stat: 'Defense',
        ...selectedPokemon.reduce((acc, item) => ({
          ...acc,
          [item.pokemon!.name]: item.pokemon!.stats.defense
        }), {})
      },
      {
        stat: 'Sp. Attack',
        ...selectedPokemon.reduce((acc, item) => ({
          ...acc,
          [item.pokemon!.name]: item.pokemon!.stats.specialAttack
        }), {})
      },
      {
        stat: 'Sp. Defense',
        ...selectedPokemon.reduce((acc, item) => ({
          ...acc,
          [item.pokemon!.name]: item.pokemon!.stats.specialDefense
        }), {})
      },
      {
        stat: 'Speed',
        ...selectedPokemon.reduce((acc, item) => ({
          ...acc,
          [item.pokemon!.name]: item.pokemon!.stats.speed
        }), {})
      }
    ];
  };

  const getTotalStats = (pokemon: Pokemon | null): number => {
    if (!pokemon) return 0;
    return Object.values(pokemon.stats).filter(x => !isNaN(x)).reduce((sum, stat) => sum + stat, 0);
  };

  const comparisonData = getComparisonData();
  const selectedPokemon = comparedPokemon.filter(item => item.pokemon);
  const winner = selectedPokemon.reduce((best, current) => {
    const currentTotal = getTotalStats(current.pokemon);
    const bestTotal = getTotalStats(best.pokemon);
    return currentTotal > bestTotal ? current : best;
  }, selectedPokemon[0]);

  const getPokemonLabel = (index: number): { label: string; icon: string; variant: 'primary' | 'secondary' } => {
    const labels = [
      { label: 'First Pokemon', icon: '🔵', variant: 'primary' as const },
      { label: 'Second Pokemon', icon: '🔴', variant: 'secondary' as const },
      { label: 'Third Pokemon', icon: '🟢', variant: 'primary' as const },
      { label: 'Fourth Pokemon', icon: '🟠', variant: 'secondary' as const },
      { label: 'Fifth Pokemon', icon: '🟣', variant: 'primary' as const },
      { label: 'Sixth Pokemon', icon: '🟡', variant: 'secondary' as const },
    ];
    return labels[index] || { label: `Pokemon ${index + 1}`, icon: '⚫', variant: 'primary' as const };
  };

  return (
    <FormCard>
      <h2>⚔️ Pokemon Battle Comparison ({selectedPokemon.length}/{MAX_POKEMON_COUNT})</h2>
      
      <ComparisonGrid style={{ 
        gridTemplateColumns: `repeat(${Math.min(comparedPokemon.length, 3)}, 1fr)`,
        gap: '20px'
      }}>
        {comparedPokemon.map((item, index) => {
          const { label, icon, variant } = getPokemonLabel(index);
          return (
            <div key={item.id} style={{ position: 'relative' }}>
              <ComparedPokemon
                pokemon={item.pokemon}
                searchTerm={item.searchTerm}
                onSearchChange={(term) => handleSearchChange(item.id, term)}
                onPokemonSelect={(pokemon) => handlePokemonSelect(item.id, pokemon)}
                allPokemon={allPokemon}
                label={label}
                icon={icon}
                variant={variant}
                totalStats={getTotalStats(item.pokemon)}
              />
              {comparedPokemon.length > 2 && (
                <Button 
                  onClick={() => removePokemonSlot(item.id)}
                  style={{ 
                    position: 'absolute', 
                    top: '5px', 
                    right: '5px',
                    padding: '5px 10px',
                    fontSize: '12px',
                    backgroundColor: '#e74c3c'
                  }}
                >
                  ✕
                </Button>
              )}
            </div>
          );
        })}
      </ComparisonGrid>

      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <Button onClick={addPokemonSlot} disabled={comparedPokemon.length >= MAX_POKEMON_COUNT}>
          ➕ Add Pokemon ({comparedPokemon.length}/6)
        </Button>
      </div>

      {selectedPokemon.length >= 2 ? (
        <ChartsContainer>
          <ChartWrapper>
            <ChartTitle>
              {selectedPokemon.map(item => item.pokemon!.name).join(' vs ')}
            </ChartTitle>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={comparisonData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="stat" />
                <PolarRadiusAxis angle={90} domain={[0, 150]} />
                {selectedPokemon.map((item, index) => (
                  <Radar
                    key={item.pokemon!.name}
                    name={item.pokemon!.name}
                    dataKey={item.pokemon!.name}
                    stroke={POKEMON_COLORS[index % POKEMON_COLORS.length].stroke}
                    fill={POKEMON_COLORS[index % POKEMON_COLORS.length].fill}
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                ))}
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </ChartWrapper>

          <ChartWrapper>
            <ChartTitle>Stats Summary</ChartTitle>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${selectedPokemon.length}, 1fr)`, gap: '15px' }}>
              {selectedPokemon.map((item, index) => {
                const total = getTotalStats(item.pokemon);
                const isWinner = winner && item.pokemon!.name === winner.pokemon!.name;
                return (
                  <div key={item.pokemon!.name} style={{ textAlign: 'center' }}>
                    <h4 style={{ 
                      color: POKEMON_COLORS[index % POKEMON_COLORS.length].stroke,
                      margin: '0 0 10px 0' 
                    }}>
                      {getPokemonLabel(index).icon} {item.pokemon!.name}
                    </h4>
                    <div><strong>Total: {total}</strong></div>
                    <div>Average: {Math.round(total / MAX_POKEMON_COUNT)}</div>
                    {isWinner && selectedPokemon.length > 1 && (
                      <div style={{ color: '#27ae60', fontWeight: 'bold', marginTop: '5px' }}>
                        🏆 Winner!
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ChartWrapper>
        </ChartsContainer>
      ) : (
        <ComparisonMessage>
          Select at least two Pokemon above to see their battle comparison! ⚔️
        </ComparisonMessage>
      )}
    </FormCard>
  );
};

export default PokemonComparison;

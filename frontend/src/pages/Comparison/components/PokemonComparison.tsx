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
import AutocompleteInput from '../../../shared/components/AutocompleteInput';
import {
  FormCard,
  FormGroup,
  Label,
  ChartCard,
  ChartTitle,
} from '../../../shared/components/styled';

const PokemonComparison: React.FC = () => {
  const [pokemon1, setPokemon1] = useState<Pokemon | null>(null);
  const [pokemon2, setPokemon2] = useState<Pokemon | null>(null);
  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);

  // Fetch all Pokemon for autocomplete
  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const pokemon = await pokemonAPI.getAllPokemon();
        setAllPokemon(pokemon);
      } catch (error) {
        console.error('Error fetching Pokemon for autocomplete:', error);
      }
    };

    fetchAllPokemon();
  }, []);

  const handlePokemon1Select = (pokemon: Pokemon) => {
    setPokemon1(pokemon);
  };

  const handlePokemon2Select = (pokemon: Pokemon) => {
    setPokemon2(pokemon);
  };

  const getComparisonData = () => {
    if (!pokemon1 || !pokemon2) return [];

    return [
      {
        stat: 'HP',
        [pokemon1.name]: pokemon1.stats.hp,
        [pokemon2.name]: pokemon2.stats.hp,
      },
      {
        stat: 'Attack',
        [pokemon1.name]: pokemon1.stats.attack,
        [pokemon2.name]: pokemon2.stats.attack,
      },
      {
        stat: 'Defense',
        [pokemon1.name]: pokemon1.stats.defense,
        [pokemon2.name]: pokemon2.stats.defense,
      },
      {
        stat: 'Sp. Attack',
        [pokemon1.name]: pokemon1.stats.specialAttack,
        [pokemon2.name]: pokemon2.stats.specialAttack,
      },
      {
        stat: 'Sp. Defense',
        [pokemon1.name]: pokemon1.stats.specialDefense,
        [pokemon2.name]: pokemon2.stats.specialDefense,
      },
      {
        stat: 'Speed',
        [pokemon1.name]: pokemon1.stats.speed,
        [pokemon2.name]: pokemon2.stats.speed,
      }
    ];
  };

  const comparisonData = getComparisonData();
  const totalStats1 = pokemon1 ? Object.values(pokemon1.stats).reduce((sum, stat) => sum + stat, 0) : 0;
  const totalStats2 = pokemon2 ? Object.values(pokemon2.stats).reduce((sum, stat) => sum + stat, 0) : 0;

  return (
    <FormCard>
      <h2>⚔️ Pokemon Battle Comparison</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>
        <div>
          <FormGroup>
            <Label htmlFor="search1">🔵 First Pokemon</Label>
            <AutocompleteInput
              placeholder="Search first Pokemon..."
              allPokemon={allPokemon}
              onSelect={handlePokemon1Select}
              value={searchTerm1}
              onChange={setSearchTerm1}
            />
          </FormGroup>
          
          {pokemon1 && (
            <div style={{ 
              marginTop: '15px', 
              padding: '15px',
              background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(41, 128, 185, 0.1))',
              borderRadius: '10px',
              border: '2px solid rgba(52, 152, 219, 0.3)',
              textAlign: 'center'
            }}>
              <img
                src={pokemon1.imageUrl}
                alt={pokemon1.name}
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  padding: '5px',
                  marginBottom: '10px'
                }}
                onError={(e) => {
                  e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon1.pokemonId}.png`;
                }}
              />
              <div style={{ 
                fontWeight: 'bold', 
                marginBottom: '8px',
                color: '#2c3e50',
                fontFamily: 'Orbitron, monospace',
                fontSize: '1.1rem',
                textTransform: 'capitalize'
              }}>
                {pokemon1.name}
              </div>
              <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', marginBottom: '8px' }}>
                {pokemon1.types.map(type => (
                  <span 
                    key={type}
                    style={{
                      background: 'linear-gradient(135deg, #3498db, #2980b9)',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}
                  >
                    {type}
                  </span>
                ))}
              </div>
              <div style={{ 
                fontSize: '0.9rem', 
                color: '#2c3e50',
                fontFamily: 'Orbitron, monospace'
              }}>
                Total Stats: <strong>{totalStats1}</strong>
              </div>
            </div>
          )}
        </div>

        <div>
          <FormGroup>
            <Label htmlFor="search2">🔴 Second Pokemon</Label>
            <AutocompleteInput
              placeholder="Search second Pokemon..."
              allPokemon={allPokemon}
              onSelect={handlePokemon2Select}
              value={searchTerm2}
              onChange={setSearchTerm2}
            />
          </FormGroup>
          
          {pokemon2 && (
            <div style={{ 
              marginTop: '15px', 
              padding: '15px',
              background: 'linear-gradient(135deg, rgba(231, 76, 60, 0.1), rgba(192, 57, 43, 0.1))',
              borderRadius: '10px',
              border: '2px solid rgba(231, 76, 60, 0.3)',
              textAlign: 'center'
            }}>
              <img
                src={pokemon2.imageUrl}
                alt={pokemon2.name}
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  padding: '5px',
                  marginBottom: '10px'
                }}
                onError={(e) => {
                  e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon2.pokemonId}.png`;
                }}
              />
              <div style={{ 
                fontWeight: 'bold', 
                marginBottom: '8px',
                color: '#2c3e50',
                fontFamily: 'Orbitron, monospace',
                fontSize: '1.1rem',
                textTransform: 'capitalize'
              }}>
                {pokemon2.name}
              </div>
              <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', marginBottom: '8px' }}>
                {pokemon2.types.map(type => (
                  <span 
                    key={type}
                    style={{
                      background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}
                  >
                    {type}
                  </span>
                ))}
              </div>
              <div style={{ 
                fontSize: '0.9rem', 
                color: '#2c3e50',
                fontFamily: 'Orbitron, monospace'
              }}>
                Total Stats: <strong>{totalStats2}</strong>
              </div>
            </div>
          )}
        </div>
      </div>

      {pokemon1 && pokemon2 && (
        <>
          <ChartCard>
            <ChartTitle>
              ⚔️ {pokemon1.name.charAt(0).toUpperCase() + pokemon1.name.slice(1)} vs {pokemon2.name.charAt(0).toUpperCase() + pokemon2.name.slice(1)}
            </ChartTitle>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={comparisonData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                <PolarGrid />
                <PolarAngleAxis dataKey="stat" tick={{ fontSize: 12, fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={90} domain={[0, 255]} tick={{ fontSize: 10 }} tickCount={6} />
                <Radar
                  name={pokemon1.name}
                  dataKey={pokemon1.name}
                  stroke="#3498db"
                  fill="#3498db"
                  fillOpacity={0.3}
                  strokeWidth={3}
                  dot={{ fill: '#3498db', strokeWidth: 2, r: 4 }}
                />
                <Radar
                  name={pokemon2.name}
                  dataKey={pokemon2.name}
                  stroke="#e74c3c"
                  fill="#e74c3c"
                  fillOpacity={0.3}
                  strokeWidth={3}
                  dot={{ fill: '#e74c3c', strokeWidth: 2, r: 4 }}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '20px',
            marginTop: '20px',
            padding: '20px',
            background: 'linear-gradient(135deg, rgba(149, 165, 166, 0.1), rgba(127, 140, 141, 0.1))',
            borderRadius: '12px',
            border: '2px solid rgba(149, 165, 166, 0.3)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ 
                color: '#3498db', 
                margin: '0 0 15px 0',
                fontFamily: 'Orbitron, monospace',
                fontSize: '1.2rem'
              }}>
                🔵 {pokemon1.name.charAt(0).toUpperCase() + pokemon1.name.slice(1)}
              </h4>
              <div style={{ 
                fontSize: '1.1rem', 
                marginBottom: '8px',
                color: '#2c3e50',
                fontFamily: 'Orbitron, monospace'
              }}>
                <strong>Total: {totalStats1}</strong>
              </div>
              <div style={{ 
                fontSize: '0.9rem',
                color: '#2c3e50',
                fontFamily: 'Orbitron, monospace'
              }}>
                Average: {Math.round(totalStats1 / 6)}
              </div>
              {totalStats1 > totalStats2 && (
                <div style={{ 
                  marginTop: '10px',
                  color: '#27ae60',
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}>
                  🏆 Winner!
                </div>
              )}
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ 
                color: '#e74c3c', 
                margin: '0 0 15px 0',
                fontFamily: 'Orbitron, monospace',
                fontSize: '1.2rem'
              }}>
                🔴 {pokemon2.name.charAt(0).toUpperCase() + pokemon2.name.slice(1)}
              </h4>
              <div style={{ 
                fontSize: '1.1rem', 
                marginBottom: '8px',
                color: '#2c3e50',
                fontFamily: 'Orbitron, monospace'
              }}>
                <strong>Total: {totalStats2}</strong>
              </div>
              <div style={{ 
                fontSize: '0.9rem',
                color: '#2c3e50',
                fontFamily: 'Orbitron, monospace'
              }}>
                Average: {Math.round(totalStats2 / 6)}
              </div>
              {totalStats2 > totalStats1 && (
                <div style={{ 
                  marginTop: '10px',
                  color: '#27ae60',
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}>
                  🏆 Winner!
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </FormCard>
  );
};

export default PokemonComparison;

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Pokemon } from '../../types';

const AutocompleteContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 3px solid #2c3e50;
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Orbitron', monospace;
  background: #ecf0f1;
  color: #2c3e50;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #e74c3c;
    background: #ffffff;
    box-shadow: 0 0 10px rgba(231, 76, 60, 0.3);
  }
  
  &::placeholder {
    color: #7f8c8d;
    font-style: italic;
  }
`;

const SuggestionsList = styled.ul<{ isVisible: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #ecf0f1;
  border: 3px solid #2c3e50;
  border-top: none;
  border-radius: 0 0 8px 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  list-style: none;
  margin: 0;
  padding: 0;
  display: ${props => props.isVisible ? 'block' : 'none'};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const SuggestionItem = styled.li<{ isHighlighted: boolean }>`
  padding: 12px 15px;
  cursor: pointer;
  background: ${props => props.isHighlighted ? 
    'linear-gradient(135deg, #e74c3c, #c0392b)' : 
    'transparent'
  };
  color: ${props => props.isHighlighted ? '#ecf0f1' : '#2c3e50'};
  border-bottom: 1px solid #bdc3c7;
  font-family: 'Orbitron', monospace;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    color: #ecf0f1;
  }

  &:last-child {
    border-bottom: none;
    border-radius: 0 0 5px 5px;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    object-fit: contain;
    background: white;
    padding: 2px;
  }
`;

const PokemonInfo = styled.div`
  flex: 1;
`;

const PokemonName = styled.div`
  font-size: 1rem;
  font-weight: bold;
  text-transform: capitalize;
`;

const PokemonDetails = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
  margin-top: 2px;
`;

const NoResults = styled.div`
  padding: 15px;
  text-align: center;
  color: #7f8c8d;
  font-family: 'Orbitron', monospace;
  font-style: italic;
`;

interface AutocompleteInputProps {
  placeholder: string;
  allPokemon: Pokemon[];
  onSelect: (pokemon: Pokemon) => void;
  value: string;
  onChange: (value: string) => void;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  placeholder,
  allPokemon,
  onSelect,
  value,
  onChange
}) => {
  const [suggestions, setSuggestions] = useState<Pokemon[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.trim().length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filteredSuggestions = allPokemon
      .filter(pokemon => 
        pokemon.name.toLowerCase().includes(value.toLowerCase()) 
      )
      .slice(0, 3); // Limit to 3 suggestions

    setSuggestions(filteredSuggestions);
    setShowSuggestions(filteredSuggestions.length > 0);
    setHighlightedIndex(-1);
  }, [value, allPokemon]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSuggestionClick = (pokemon: Pokemon) => {
    console.log('🔍 AutocompleteInput handleSuggestionClick called:', { pokemonName: pokemon.name, value });
    onChange(pokemon.name);
    onSelect(pokemon);
    setShowSuggestions(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Delay hiding suggestions to allow for click events
    setTimeout(() => {
      if (!containerRef.current?.contains(document.activeElement)) {
        setShowSuggestions(false);
        setHighlightedIndex(-1);
      }
    }, 150);
  };

  return (
    <AutocompleteContainer ref={containerRef}>
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={() => value.trim().length > 0 && setShowSuggestions(suggestions.length > 0)}
        placeholder={placeholder}
      />
      
      <SuggestionsList isVisible={showSuggestions}>
        {suggestions.length > 0 ? (
          suggestions.map((pokemon, index) => (
            <SuggestionItem
              key={pokemon._id}
              isHighlighted={index === highlightedIndex}
              onClick={() => handleSuggestionClick(pokemon)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <img
                src={pokemon.imageUrl}
                alt={pokemon.name}
                onError={(e) => {
                  e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemonId}.png`;
                }}
              />
              <PokemonInfo>
                <PokemonName>
                  {pokemon.name} #{pokemon.pokemonId}
                </PokemonName>
                <PokemonDetails>
                  {pokemon.types.join(', ')} | Stage {pokemon.evolutionStage}
                </PokemonDetails>
              </PokemonInfo>
            </SuggestionItem>
          ))
        ) : (
          <NoResults>
            No Pokemon found matching "{value}"
          </NoResults>
        )}
      </SuggestionsList>
    </AutocompleteContainer>
  );
};

export default AutocompleteInput;

import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const HeaderContainer = styled.div`
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  padding: 20px 0;
  text-align: center;
  border-bottom: 8px solid #2c3e50;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
`;

const TopBar = styled.div`
  background: #2c3e50;
  padding: 10px 0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Pokeball = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;
  background: linear-gradient(180deg, #e74c3c 50%, #ecf0f1 50%);
  border: 3px solid #2c3e50;
  cursor: pointer;
  animation: ${bounce} 2s infinite;
  
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    background: #ecf0f1;
    border-radius: 50%;
    border: 2px solid #2c3e50;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 3px;
    background: #2c3e50;
    transform: translateY(-50%);
  }
  
  &:hover {
    transform: scale(1.1);
    animation: none;
  }
`;

const Title = styled.h1`
  font-family: 'Courier New', monospace;
  font-size: 3rem;
  font-weight: bold;
  color: #ecf0f1;
  margin: 20px 0 10px 0;
  text-shadow: 
    3px 3px 0px #2c3e50,
    -1px -1px 0px #2c3e50,  
    1px -1px 0px #2c3e50,
    -1px 1px 0px #2c3e50,
    1px 1px 0px #2c3e50,
    4px 4px 8px rgba(0, 0, 0, 0.5);
  letter-spacing: 2px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
  color: #ecf0f1;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 1px;
`;

const StatsBar = styled.div`
  background: rgba(44, 62, 80, 0.8);
  padding: 10px 20px;
  margin-top: 15px;
  border-radius: 20px;
  display: inline-block;
  backdrop-filter: blur(5px);
`;

const StatItem = styled.span`
  color: #ecf0f1;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  margin: 0 15px;
  font-size: 0.9rem;
  
  &:before {
    content: '▸ ';
    color: #f39c12;
  }
`;

const PixelBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: repeating-linear-gradient(
    90deg,
    #f39c12 0px,
    #f39c12 8px,
    #e67e22 8px,
    #e67e22 16px
  );
`;

interface PokemonHeaderProps {
  totalPokemon?: number;
  avgHp?: number;
  avgAttack?: number;
}

const PokemonHeader: React.FC<PokemonHeaderProps> = ({ totalPokemon, avgHp, avgAttack }) => {
  return (
    <>
      <TopBar>
        <Pokeball />
        <div style={{ 
          color: '#ecf0f1', 
          fontFamily: 'Courier New, monospace', 
          fontSize: '1.2rem', 
          fontWeight: 'bold',
          letterSpacing: '2px'
        }}>
          GOTTA CRUNCH 'EM ALL
        </div>
        <Pokeball />
      </TopBar>
      
      <HeaderContainer>
        <PixelBorder />
        
        <Title>POKESTATS</Title>
        <Subtitle>Advanced Pokemon Data Analytics</Subtitle>
        
        {totalPokemon && (
          <StatsBar>
            <StatItem>Total Pokemon: {totalPokemon}</StatItem>
            {avgHp && <StatItem>Avg HP: {Math.round(avgHp)}</StatItem>}
            {avgAttack && <StatItem>Avg Attack: {Math.round(avgAttack)}</StatItem>}
          </StatsBar>
        )}
      </HeaderContainer>
    </>
  );
};

export default PokemonHeader;

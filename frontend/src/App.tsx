import React, { useState, useEffect } from 'react';
import { 
  Pokemon, 
  Distribution, 
  PokemonStatsSummary 
} from './types';
import { pokemonAPI } from './services/api';
import { ThemeProvider } from './theme/ThemeProvider';
import { 
  Container,
  ErrorMessage
} from './shared/components/ui';
import PokemonHeader from './shared/components/PokemonHeader';
import Navigation, { NavigationPage } from './shared/components/Navigation';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Comparison from './pages/Comparison';
import styled from 'styled-components';

const AppBackground = styled.div`
  background: ${({ theme }) => theme.gradients.pokemonBackground};
  min-height: 100vh;
`;

const LoadingContainer = styled.div`
  background: ${({ theme }) => theme.colors.pokemonDark};
  min-height: 100vh;
`;

const LoadingContent = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['5xl']} 0;
  color: ${({ theme }) => theme.colors.pokemonLight};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
`;

const LoadingCard = styled.div`
  background: linear-gradient(135deg, rgba(231, 76, 60, 0.1), rgba(192, 57, 43, 0.1));
  padding: ${({ theme }) => theme.spacing['3xl']};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 2px solid rgba(231, 76, 60, 0.3);
  max-width: 400px;
  margin: 0 auto;
`;

const LoadingIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['5xl']};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const LoadingBar = styled.div`
  width: 100%;
  height: 4px;
  background: ${({ theme }) => theme.colors.pokemonDark};
  border-radius: 2px;
  margin-top: ${({ theme }) => theme.spacing.xl};
  overflow: hidden;
`;

const LoadingProgress = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.gradients.pokemonHeader};
  animation: loading 2s infinite ease-in-out;
`;

const StyledContainer = styled(Container)`
  padding-top: ${({ theme }) => theme.spacing['3xl']};
  padding-left: ${({ theme }) => theme.spacing['3xl']};
`;

const PollingIndicator = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.gradients.pokemonCard};
  border: 2px solid ${({ theme }) => theme.colors.pokemonDark};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.pokemonDark};
  z-index: ${({ theme }) => theme.zIndex.overlay};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const PollingStatus = styled.span<{ isActive: boolean }>`
  color: ${({ isActive, theme }) => 
    isActive ? theme.colors.success : theme.colors.pokemonRed};
  font-weight: bold;
`;

const PollingButton = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  padding: 2px;
  border-radius: 2px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

function AppContent() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('dashboard');
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [typeDistribution, setTypeDistribution] = useState<Distribution[]>([]);
  const [evolutionDistribution, setEvolutionDistribution] = useState<Distribution[]>([]);
  const [topPokemonByAttack, setTopPokemonByAttack] = useState<Pokemon[]>([]);
  const [topPokemonByHp, setTopPokemonByHp] = useState<Pokemon[]>([]);
  const [topPokemonByDefense, setTopPokemonByDefense] = useState<Pokemon[]>([]);
  const [topPokemonBySpeed, setTopPokemonBySpeed] = useState<Pokemon[]>([]);
  const [pokemonStats, setPokemonStats] = useState<PokemonStatsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isPolling, setIsPolling] = useState(true);

  const fetchPokemonData = async (isInitialLoad = false) => {
    try {
      if (isInitialLoad) {
        setLoading(true);
      }
      setError(null);
      
      const [
        pokemonData,
        typeData,
        evolutionData,
        attackData,
        hpData,
        defenseData,
        speedData,
        statsData
      ] = await Promise.all([
        pokemonAPI.getAllPokemon(),
        pokemonAPI.getTypeDistribution(),
        pokemonAPI.getEvolutionDistribution(),
        pokemonAPI.getTopPokemonByStat('attack'),
        pokemonAPI.getTopPokemonByStat('hp'),
        pokemonAPI.getTopPokemonByStat('defense'),
        pokemonAPI.getTopPokemonByStat('speed'),
        pokemonAPI.getPokemonStats()
      ]);
      
      setPokemon(pokemonData);
      setTypeDistribution(typeData);
      setEvolutionDistribution(evolutionData);
      setTopPokemonByAttack(attackData);
      setTopPokemonByHp(hpData);
      setTopPokemonByDefense(defenseData);
      setTopPokemonBySpeed(speedData);
      setPokemonStats(statsData);
      setLastUpdated(new Date());
      
      console.log('🔄 Pokemon data updated at:', new Date().toLocaleTimeString());
    } catch (err) {
      setError('Failed to fetch Pokemon data. Make sure the backend server is running.');
      console.error('Error fetching Pokemon data:', err);
    } finally {
      if (isInitialLoad) {
        setLoading(false);
      }
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchPokemonData(true);
  }, []);

  // Polling effect
  useEffect(() => {
    if (!isPolling) return;

    const interval = setInterval(() => {
      fetchPokemonData(false);
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(interval);
  }, [isPolling]);

  const togglePolling = () => {
    setIsPolling(!isPolling);
    console.log(isPolling ? '⏸️ Polling stopped' : '▶️ Polling started');
  };

  const handlePageChange = (page: NavigationPage) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard
            typeDistribution={typeDistribution}
            evolutionDistribution={evolutionDistribution}
            topPokemonByAttack={topPokemonByAttack}
            topPokemonByHp={topPokemonByHp}
            topPokemonByDefense={topPokemonByDefense}
            topPokemonBySpeed={topPokemonBySpeed}
          />
        );
      case 'search':
        return <Search />;
      case 'comparison':
        return <Comparison />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <PokemonHeader />
        <Container>
          <LoadingContent>
            <LoadingCard>
              <LoadingIcon>⚡</LoadingIcon>
              Loading Pokemon data...
              <LoadingBar>
                <LoadingProgress />
              </LoadingBar>
            </LoadingCard>
          </LoadingContent>
        </Container>
      </LoadingContainer>
    );
  }

  return (
    <AppBackground>
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      
      <PollingIndicator>
        <PollingStatus isActive={isPolling}>
          {isPolling ? '🔄' : '⏸️'}
        </PollingStatus>
        <span>
          {isPolling ? 'Auto-refresh: 10s' : 'Auto-refresh: OFF'}
        </span>
        {lastUpdated && (
          <span>
            | Last: {lastUpdated.toLocaleTimeString()}
          </span>
        )}
        <PollingButton onClick={togglePolling} title={isPolling ? 'Stop auto-refresh' : 'Start auto-refresh'}>
          {isPolling ? '⏸️' : '▶️'}
        </PollingButton>
      </PollingIndicator>
      
      <PokemonHeader 
        totalPokemon={pokemonStats?.totalPokemon}
        avgHp={pokemonStats?.avgHp}
        avgAttack={pokemonStats?.avgAttack}
      />
      
      <StyledContainer>
        {error && (
          <ErrorMessage>
            ⚠️ {error}
          </ErrorMessage>
        )}

        {pokemon.length > 0 && renderCurrentPage()}
      </StyledContainer>
    </AppBackground>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

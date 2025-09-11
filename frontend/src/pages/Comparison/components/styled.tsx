import styled from 'styled-components';

export const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

export const PokemonCard = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(41, 128, 185, 0.1));
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 2px solid rgba(52, 152, 219, 0.3);
  text-align: center;
`;

export const PokemonCard2 = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(135deg, rgba(231, 76, 60, 0.1), rgba(192, 57, 43, 0.1));
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 2px solid rgba(231, 76, 60, 0.3);
  text-align: center;
`;

export const PokemonImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background: white;
  padding: ${({ theme }) => theme.spacing.sm};
  box-shadow: ${({ theme }) => theme.shadows.base};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const PokemonName = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  color: ${({ theme }) => theme.colors.pokemonDark};
  font-family: ${({ theme }) => theme.fonts.primary};
  text-transform: capitalize;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

export const TypesContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const TypeBadge = styled.span`
  background: ${({ theme }) => theme.gradients.pokemonBlue};
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: bold;
  font-family: ${({ theme }) => theme.fonts.primary};
  text-transform: uppercase;
`;

export const TotalStats = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.pokemonDark};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-top: ${({ theme }) => theme.spacing['3xl']};
`;

export const ChartWrapper = styled.div`
  background: ${({ theme }) => theme.gradients.pokemonCard};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  border: 3px solid ${({ theme }) => theme.colors.pokemonDark};
`;

export const ChartTitle = styled.h3`
  color: ${({ theme }) => theme.colors.pokemonDark};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const ComparisonMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['3xl']};
  color: ${({ theme }) => theme.colors.pokemonLightDark};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

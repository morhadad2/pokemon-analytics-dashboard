import styled from 'styled-components';

export const PokemonPreview = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 2px solid rgba(52, 152, 219, 0.3);
`;

export const PokemonImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  object-fit: contain;
  background: white;
  padding: ${({ theme }) => theme.spacing.sm};
  box-shadow: ${({ theme }) => theme.shadows.base};
`;

export const PokemonName = styled.h4`
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  color: ${({ theme }) => theme.colors.pokemonDark};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-family: ${({ theme }) => theme.fonts.primary};
  text-transform: capitalize;
`;

export const TypeBadge = styled.span`
  background: ${({ theme }) => theme.gradients.pokemonBlue};
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: bold;
  font-family: ${({ theme }) => theme.fonts.primary};
  text-transform: uppercase;
`;

export const StatCard = styled.div`
  background: white;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  text-align: center;
  border: 2px solid ${({ theme }) => theme.colors.pokemonDark};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const StatName = styled.div<{ color: string }>`
  font-weight: bold;
  color: ${({ color }) => color};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

export const StatValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.pokemonDark};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

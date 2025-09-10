import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['2xl']};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.pokemonLight};
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.fonts.pixel};
  text-shadow: 3px 3px 0px ${({ theme }) => theme.colors.pokemonDark};
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.pokemonLightDark};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

export const ErrorMessage = styled.div`
  background: ${({ theme }) => theme.gradients.pokemonDanger};
  color: ${({ theme }) => theme.colors.pokemonLight};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  border: 3px solid ${({ theme }) => theme.colors.pokemonDark};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: bold;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.pokeball};
`;

export const SuccessMessage = styled.div`
  background: ${({ theme }) => theme.gradients.pokemonSuccess};
  color: ${({ theme }) => theme.colors.pokemonLight};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  border: 3px solid ${({ theme }) => theme.colors.pokemonDark};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: bold;
  text-align: center;
  box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
`;

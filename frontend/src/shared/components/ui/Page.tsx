import styled from 'styled-components';

export const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 2px solid rgba(231, 76, 60, 0.3);
`;

export const PageTitle = styled.h2`
  color: ${({ theme }) => theme.colors.pokemonLight};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export const PageSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.pokemonLightDark};
  font-family: ${({ theme }) => theme.fonts.primary};
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

import styled from 'styled-components';

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${({ theme }) => theme.spacing['3xl']};
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
`;

export const ChartCard = styled.div`
  background: ${({ theme }) => theme.gradients.pokemonCard};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border: 3px solid ${({ theme }) => theme.colors.pokemonDark};
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme }) => theme.gradients.pokemonHeader};
    border-radius: ${({ theme }) => theme.borderRadius.lg} ${({ theme }) => theme.borderRadius.lg} 0 0;
  }
`;

export const ChartTitle = styled.h2`
  color: ${({ theme }) => theme.colors.pokemonDark};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

import styled from 'styled-components';

export const RarityContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing['2xl']};
`;

export const ChartCard = styled.div`
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

export const TooltipContainer = styled.div`
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #333;
`;

export const TooltipText = styled.p`
  margin: 0;
  
  strong {
    color: #fff;
  }
`;

export const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const LegendItem = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.pokemonDark};
  
  &::before {
    content: '';
    width: 12px;
    height: 12px;
    background: ${({ color }) => color};
    border-radius: 50%;
    flex-shrink: 0;
  }
`;

export const LegendLabel = styled.span`
  font-weight: bold;
`;

export const LegendDescription = styled.span`
  font-style: italic;
  color: ${({ theme }) => theme.colors.pokemonLightDark};
`;

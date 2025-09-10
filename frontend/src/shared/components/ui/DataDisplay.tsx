import styled from 'styled-components';

export const DataList = styled.div`
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
  
  h3 {
    color: ${({ theme }) => theme.colors.pokemonDark};
    font-family: ${({ theme }) => theme.fonts.primary};
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

export const DataItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 2px solid ${({ theme }) => theme.colors.pokemonLightDark};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  transition: all 0.3s ease;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
  
  &:hover {
    background: rgba(52, 73, 94, 0.1);
    transform: translateX(5px);
  }
`;

export const DataInfo = styled.div`
  flex: 1;
`;

export const DataLabel = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.pokemonDark};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

export const DataValue = styled.div`
  color: ${({ theme }) => theme.colors.pokemonDarkLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.primary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const DataActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

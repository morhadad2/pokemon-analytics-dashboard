import styled from 'styled-components';

export const FormCard = styled.div`
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
  
  h2 {
    color: ${({ theme }) => theme.colors.pokemonDark};
    font-family: ${({ theme }) => theme.fonts.primary};
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Label = styled.label`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.pokemonDark};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.primary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border: 3px solid ${({ theme }) => theme.colors.pokemonDark};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.primary};
  background: ${({ theme }) => theme.colors.pokemonLight};
  color: ${({ theme }) => theme.colors.pokemonDark};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.pokemonRed};
    background: #ffffff;
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.grayDark};
    font-style: italic;
  }
`;

export const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.md};
  border: 3px solid ${({ theme }) => theme.colors.pokemonDark};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.primary};
  background: ${({ theme }) => theme.colors.pokemonLight};
  color: ${({ theme }) => theme.colors.pokemonDark};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.pokemonRed};
    background: #ffffff;
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;

export const Button = styled.button`
  background: ${({ theme }) => theme.gradients.pokemonRed};
  color: ${({ theme }) => theme.colors.pokemonLight};
  border: 3px solid ${({ theme }) => theme.colors.pokemonDark};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: bold;
  font-family: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: ${({ theme }) => theme.gradients.pokemonRedHover};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.pokeball};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.grayDark};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const ButtonDanger = styled(Button)`
  background: ${({ theme }) => theme.gradients.pokemonWarning};

  &:hover {
    background: linear-gradient(135deg, #d35400, #ba4a00);
  }
`;

export const SmallButton = styled.button`
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.gray}, ${theme.colors.grayDark})`};
  color: ${({ theme }) => theme.colors.pokemonLight};
  border: 2px solid ${({ theme }) => theme.colors.pokemonDark};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;

  &:hover {
    background: linear-gradient(135deg, #7f8c8d, #6c7b7d);
    transform: translateY(-1px);
  }
`;

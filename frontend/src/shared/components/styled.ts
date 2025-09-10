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

// Page-specific styled components
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

// Pokemon-specific components
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

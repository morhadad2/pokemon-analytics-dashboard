export const theme = {
  colors: {
    // Pokemon Primary Colors
    pokemonRed: '#e74c3c',
    pokemonRedDark: '#c0392b',
    pokemonRedDarker: '#a93226',
    
    // Pokemon Blues/Grays
    pokemonDark: '#2c3e50',
    pokemonDarkLight: '#34495e',
    pokemonLight: '#ecf0f1',
    pokemonLightDark: '#bdc3c7',
    
    // Pokemon Accents
    pokemonYellow: '#f39c12',
    pokemonOrange: '#e67e22',
    pokemonGreen: '#27ae60',
    pokemonBlue: '#3498db',
    pokemonBlueDark: '#2980b9',
    pokemonPurple: '#9b59b6',
    pokemonTeal: '#1abc9c',
    
    // Status Colors
    success: '#27ae60',
    warning: '#f39c12',
    error: '#e74c3c',
    info: '#3498db',
    
    // Neutral Colors
    gray: '#95a5a6',
    grayDark: '#7f8c8d',
    grayLight: '#bdc3c7',
    
    // Stat Colors
    hp: '#e74c3c',
    attack: '#f39c12',
    defense: '#3498db',
    specialAttack: '#9b59b6',
    specialDefense: '#1abc9c',
    speed: '#f1c40f'
  },
  
  fonts: {
    primary: "'Orbitron', 'Courier New', monospace",
    pixel: "'Press Start 2P', 'Courier New', monospace",
    mono: "'Courier New', monospace"
  },
  
  fontSizes: {
    xs: '0.7rem',
    sm: '0.8rem',
    base: '1rem',
    lg: '1.1rem',
    xl: '1.2rem',
    '2xl': '1.5rem',
    '3xl': '1.8rem',
    '4xl': '2.5rem',
    '5xl': '3rem'
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '40px',
    '5xl': '50px'
  },
  
  borderRadius: {
    sm: '4px',
    base: '8px',
    lg: '12px',
    xl: '15px',
    '2xl': '20px',
    full: '50%'
  },
  
  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.1)',
    base: '0 4px 15px rgba(0, 0, 0, 0.2)',
    lg: '0 8px 25px rgba(0, 0, 0, 0.3)',
    pokeball: '0 4px 15px rgba(231, 76, 60, 0.4)',
    glow: '0 0 10px rgba(243, 156, 18, 0.3)'
  },
  
  gradients: {
    pokemonRed: 'linear-gradient(135deg, #e74c3c, #c0392b)',
    pokemonRedHover: 'linear-gradient(135deg, #c0392b, #a93226)',
    pokemonBlue: 'linear-gradient(135deg, #3498db, #2980b9)',
    pokemonBackground: 'linear-gradient(135deg, #34495e 0%, #2c3e50 100%)',
    pokemonCard: 'linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%)',
    pokemonHeader: 'linear-gradient(90deg, #e74c3c, #f39c12, #e74c3c)',
    pokemonSuccess: 'linear-gradient(135deg, #27ae60, #229954)',
    pokemonWarning: 'linear-gradient(135deg, #f39c12, #e67e22)',
    pokemonInfo: 'linear-gradient(135deg, #3498db, #2980b9)',
    pokemonDanger: 'linear-gradient(135deg, #e74c3c, #c0392b)'
  },
  
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  },
  
  zIndex: {
    dropdown: 1000,
    overlay: 999,
    modal: 1001,
    tooltip: 1002
  }
};

export type Theme = typeof theme;

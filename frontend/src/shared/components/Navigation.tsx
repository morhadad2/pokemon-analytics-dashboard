import React from 'react';
import styled, { keyframes } from 'styled-components';

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%);
  border-bottom: 3px solid #e74c3c;
  z-index: 1000;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.3),
    0 2px 10px rgba(231, 76, 60, 0.2);
  animation: ${slideDown} 0.5s ease-out;
  backdrop-filter: blur(10px);
`;

const NavbarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  height: 80px;
  padding: 0 30px;
  
  @media (max-width: 768px) {
    height: 70px;
    padding: 0 20px;
  }
  
  @media (max-width: 480px) {
    height: 60px;
    padding: 0 15px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-family: 'Press Start 2P', monospace;
  font-size: 1.4rem;
  color: #ecf0f1;
  text-shadow: 
    2px 2px 0px #2c3e50,
    4px 4px 8px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    text-shadow: 
      2px 2px 0px #2c3e50,
      4px 4px 8px rgba(0, 0, 0, 0.5),
      0 0 20px rgba(231, 76, 60, 0.5);
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    gap: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    gap: 10px;
  }
`;

const PokeballLogo = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(180deg, #e74c3c 50%, #ecf0f1 50%);
  border: 4px solid #2c3e50;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.2),
    0 4px 8px rgba(0, 0, 0, 0.3);
  
  &:hover {
    transform: rotate(360deg) scale(1.1);
    box-shadow: 
      inset 0 2px 4px rgba(0, 0, 0, 0.2),
      0 6px 12px rgba(231, 76, 60, 0.4);
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    border: 3px solid #2c3e50;
  }
  
  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
    border: 2px solid #2c3e50;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    background: #ecf0f1;
    border-radius: 50%;
    border: 3px solid #2c3e50;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
    
    @media (max-width: 768px) {
      width: 12px;
      height: 12px;
      border: 2px solid #2c3e50;
    }
    
    @media (max-width: 480px) {
      width: 10px;
      height: 10px;
      border: 1px solid #2c3e50;
    }
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 4px;
    background: #2c3e50;
    transform: translateY(-50%);ERROR in src/App.tsx:69:33

    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    
    @media (max-width: 768px) {
      height: 3px;
    }
    
    @media (max-width: 480px) {
      height: 2px;
    }
  }
`;

const NavItems = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 15px;
  
  @media (max-width: 768px) {
    gap: 10px;
  }
  
  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const NavItem = styled.li`
  margin: 0;
`;

const NavButton = styled.button<{ isActive: boolean }>`
  background: ${props => props.isActive ? 
    'linear-gradient(135deg, #e74c3c, #c0392b)' : 
    'linear-gradient(135deg, rgba(231, 76, 60, 0.1), rgba(192, 57, 43, 0.1))'
  };
  border: 2px solid ${props => props.isActive ? '#f39c12' : 'transparent'};
  color: #ecf0f1;
  padding: 15px 25px;
  font-family: 'Orbitron', monospace;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(5px);

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    border-color: #f39c12;
    transform: translateY(-3px);
    box-shadow: 
      0 8px 25px rgba(231, 76, 60, 0.4),
      0 4px 15px rgba(0, 0, 0, 0.2);
    
    &:before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    padding: 12px 18px;
    font-size: 0.9rem;
    gap: 8px;
  }
  
  @media (max-width: 480px) {
    padding: 10px 14px;
    font-size: 0.8rem;
    gap: 6px;
  }
`;

const NavIcon = styled.span`
  font-size: 1.2rem;
  filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.5));
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const NavLabel = styled.span`
  @media (max-width: 480px) {
    display: none;
  }
`;

export type NavigationPage = 'dashboard' | 'search' | 'comparison';

interface NavigationProps {
  currentPage: NavigationPage;
  onPageChange: (page: NavigationPage) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const menuItems = [
    { id: 'dashboard' as NavigationPage, label: 'Dashboard', icon: '📊' },
    { id: 'search' as NavigationPage, label: 'Search', icon: '🔍' },
    { id: 'comparison' as NavigationPage, label: 'Compare', icon: '⚔️' },
  ];

  return (
    <NavbarContainer>
      <NavbarContent>
        <Logo onClick={() => onPageChange('dashboard')}>
          <PokeballLogo />
          POKESTATS
        </Logo>
        
        <NavItems>
          {menuItems.map((item) => (
            <NavItem key={item.id}>
              <NavButton
                isActive={currentPage === item.id}
                onClick={() => onPageChange(item.id)}
              >
                <NavIcon>{item.icon}</NavIcon>
                <NavLabel>{item.label}</NavLabel>
              </NavButton>
            </NavItem>
          ))}
        </NavItems>
      </NavbarContent>
    </NavbarContainer>
  );
};

export default Navigation;

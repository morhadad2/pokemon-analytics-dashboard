import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const HamburgerButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1001;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  border: 3px solid #2c3e50;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

  &:hover {
    background: linear-gradient(135deg, #c0392b, #a93226);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const HamburgerIcon = styled.div<{ isOpen: boolean }>`
  width: 25px;
  height: 3px;
  background: #ecf0f1;
  transition: all 0.3s ease;
  position: relative;

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 25px;
    height: 3px;
    background: #ecf0f1;
    transition: all 0.3s ease;
  }

  &:before {
    top: ${props => props.isOpen ? '0' : '-8px'};
    transform: ${props => props.isOpen ? 'rotate(45deg)' : 'rotate(0)'};
  }

  &:after {
    top: ${props => props.isOpen ? '0' : '8px'};
    transform: ${props => props.isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
  }

  ${props => props.isOpen && `
    background: transparent;
  `}
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const MenuContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  background: linear-gradient(135deg, #2c3e50, #34495e);
  z-index: 1000;
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.3);
  border-right: 4px solid #e74c3c;
`;

const MenuHeader = styled.div`
  padding: 80px 20px 20px 20px;
  border-bottom: 3px solid #e74c3c;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
`;

const MenuTitle = styled.h2`
  color: #ecf0f1;
  font-family: 'Press Start 2P', monospace;
  font-size: 1rem;
  margin: 0;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 20px 0;
  margin: 0;
`;

const MenuItem = styled.li<{ isActive: boolean }>`
  margin: 0;
`;

const MenuButton = styled.button<{ isActive: boolean }>`
  width: 100%;
  background: ${props => props.isActive ? 
    'linear-gradient(135deg, #e74c3c, #c0392b)' : 
    'transparent'
  };
  border: none;
  color: #ecf0f1;
  padding: 20px 30px;
  text-align: left;
  font-family: 'Orbitron', monospace;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: ${props => props.isActive ? '4px solid #f39c12' : '4px solid transparent'};
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    border-left: 4px solid #f39c12;
    transform: translateX(5px);
  }

  &:before {
    content: '▸ ';
    color: #f39c12;
    margin-right: 10px;
  }
`;

const Pokeball = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: linear-gradient(180deg, #e74c3c 50%, #ecf0f1 50%);
  border: 2px solid #2c3e50;
  
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background: #ecf0f1;
    border-radius: 50%;
    border: 1px solid #2c3e50;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: #2c3e50;
    transform: translateY(-50%);
  }
`;

export type NavigationPage = 'dashboard' | 'search' | 'comparison';

interface NavigationProps {
  currentPage: NavigationPage;
  onPageChange: (page: NavigationPage) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handlePageChange = (page: NavigationPage) => {
    onPageChange(page);
    setIsOpen(false);
  };

  const menuItems = [
    { id: 'dashboard' as NavigationPage, label: 'Dashboard', icon: '📊' },
    { id: 'search' as NavigationPage, label: 'Pokemon Search', icon: '🔍' },
    { id: 'comparison' as NavigationPage, label: 'Compare Pokemon', icon: '⚔️' },
  ];

  return (
    <>
      <HamburgerButton onClick={toggleMenu}>
        <HamburgerIcon isOpen={isOpen} />
      </HamburgerButton>

      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />

      <MenuContainer isOpen={isOpen}>
        <MenuHeader>
          <MenuTitle>POKESTATS MENU</MenuTitle>
        </MenuHeader>

        <MenuList>
          {menuItems.map((item) => (
            <MenuItem key={item.id} isActive={currentPage === item.id}>
              <MenuButton
                isActive={currentPage === item.id}
                onClick={() => handlePageChange(item.id)}
              >
                {item.icon} {item.label}
              </MenuButton>
            </MenuItem>
          ))}
        </MenuList>

        <Pokeball />
      </MenuContainer>
    </>
  );
};

export default Navigation;

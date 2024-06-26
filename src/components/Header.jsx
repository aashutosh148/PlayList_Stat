import React from 'react';
import DarkModeToggle from './DarkModeToggle';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center md:px-28">
      <div className="flex items-center space-x-2">
        <img src="/youtube.svg" alt="YouTube Logo" className="h-8" />
        
        <h1 className="text-2xl font-bold">Playlist Stats</h1>
      </div>
      <div className="flex items-center space-x-4">
        <a href="https://github.com/aashutosh148" target="_blank" rel="noopener noreferrer" className=""><img src="https://static-00.iconduck.com/assets.00/github-icon-2048x2048-dpporae2.png" alt="YouTube Logo" className="h-10" /></a>
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    </header>
  );
};

export default Header;

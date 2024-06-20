// src/App.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PlaylistForm from './components/PlaylistForm';
import PlaylistAnalysisResults from './components/PlaylistAnalysisResults';

const App = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [playlistData, setPlaylistData] = useState(null);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`min-h-screen flex flex-col justify-between bg-gray-100 dark:bg-slate-800 text-black dark:text-white transition duration-700`}>
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <main className="flex-grow flex flex-col items-center justify-center p-4">
                <PlaylistForm setPlaylistData={setPlaylistData} />
                {playlistData && (
                    <PlaylistAnalysisResults data={playlistData} />
                )}
            </main>
            <Footer />
        </div>
    );
};

export default App;

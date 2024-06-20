import React from 'react';


const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
    return (
        <div className="flex items-center justify-center ">
            <label htmlFor="darkModeToggle" className="relative inline-flex items-center justify-center cursor-pointer">
                <input
                    type="checkbox"
                    id="darkModeToggle"
                    className="sr-only"
                    checked={darkMode}
                    onChange={toggleDarkMode}
                />
                <div className={`w-16 h-8 rounded-full ${!(darkMode) ? 'bg-slate-700' : 'bg-gray-700'}`}>
                    <span
                        className={`absolute left-1 top-1 w-6 h-6 rounded-full shadow-md transform transition-transform ${(!darkMode) ? 'translate-x-8 bg-slate-700' : 'bg-slate-700'
                            }`}
                    >
                        {(!darkMode) ? <img src="./yellow-moon.svg" alt="Moon Logo" className="" />: <img src="/sun-color-icon.svg" alt="Sun Logo" className="" />}
                    </span>
                </div>
            </label>
        </div>
    );
};

export default DarkModeToggle;

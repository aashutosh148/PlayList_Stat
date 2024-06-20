import React, { useState } from 'react';
import { extractPlaylistId, fetchVideos, fetchVideoDurations, formatDuration, calculateAdjustedDuration } from '../utils/videoUtils';



const PlaylistForm = ({ setPlaylistData }) => {
    const [playlistLink, setPlaylistLink] = useState('');
    const [error, setError] = useState(null);
    const apiKey = import.meta.env.VITE_API_KEY; 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        const playlistId = extractPlaylistId(playlistLink);
        if (!playlistId) {
            setError('Invalid URL');
            return;
        }

        try {
            const { totalVideos, allVideoId } = await fetchVideos(playlistId, apiKey);
            const totalDurationInSeconds = await fetchVideoDurations(allVideoId, apiKey);
            const avgDuration = formatDuration(totalDurationInSeconds / totalVideos);
            const totalDuration = formatDuration(totalDurationInSeconds);

            const speed1_25x = calculateAdjustedDuration(totalDurationInSeconds, 1.25);
            const speed1_5x = calculateAdjustedDuration(totalDurationInSeconds, 1.5);
            const speed1_75x = calculateAdjustedDuration(totalDurationInSeconds, 1.75);
            const speed2x = calculateAdjustedDuration(totalDurationInSeconds, 2.0);
            // console.log({
            //     totalVideos,
            //     avgDuration,
            //     totalDuration,
            //     speed1_25x,
            //     speed1_5x,
            //     speed1_75x,
            //     speed2x,
            // });
            setPlaylistData({
                totalVideos,
                avgDuration,
                totalDuration,
                speed1_25x,
                speed1_5x,
                speed1_75x,
                speed2x,
            });
        } catch (error) {
            setError('Failed to fetch playlist data');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
            <label htmlFor="playlist-link" className="block mb-2">Enter the YouTube playlist Link OR Playlist ID:</label>
            <input 
                type="text" 
                id="playlist-link" 
                value={playlistLink}
                onChange={(e) => setPlaylistLink(e.target.value)}
                className="w-full p-2 border rounded mb-4 focus:outline-none focus:border-blue-500" 
                placeholder="youtube.com/playlist?list=ID"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">Analyze</button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
    );
};

export default PlaylistForm;

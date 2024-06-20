import React from 'react';

const PlaylistAnalysisResults = ({ data }) => {
    if (!data) return null;

    const { totalVideos, avgDuration, totalDuration, speed1_25x, speed1_5x, speed1_75x, speed2x } = data;

    function formatResult(duration) {
        return `${duration.days > 0 ? `${duration.days} days, ` : ''}${duration.hours > 0 ? `${duration.hours} hours, ` : ''}${duration.minutes > 0 ? `${duration.minutes} minutes, ` : ''}${duration.seconds > 0 ? `${duration.seconds} seconds` : ''}`;
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md mt-8">
            <h2 className="text-xl font-bold mb-4">Playlist Analysis Results</h2>
            <p>No of videos: ${totalVideos}</p>
            <p>Average length of video: ${formatResult(avgDuration)}</p>
            <p>Total length of playlist: ${formatResult(totalDuration)}</p>
            <p>On 1.25x: {formatResult(speed1_25x)}</p>
            <p>On 1.50x: {formatResult(speed1_5x)}</p>
            <p>On 1.75x: {formatResult(speed1_75x)}</p>
            <p>On 2.00x: {formatResult(speed2x)}</p>
        </div>
    );
};

export default PlaylistAnalysisResults;

// src/components/PlaylistAnalysisResults.js
import React from 'react';

const PlaylistAnalysisResults = ({ data }) => {
    if (!data) return null;

    const { totalVideos, avgDuration, totalDuration, speed1_25x, speed1_5x, speed1_75x, speed2x } = data;

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md mt-8">
            <h2 className="text-xl font-bold mb-4">Playlist Analysis Results</h2>
            <p>No of videos: {totalVideos}</p>
            <p>Average length of video: {`${avgDuration.hours} hours, ${avgDuration.minutes} minutes, ${avgDuration.seconds} seconds`}</p>
            <p>Total length of playlist: {`${totalDuration.hours} hours, ${totalDuration.minutes} minutes, ${totalDuration.seconds} seconds`}</p>
            <p>On 1.25x: {`${speed1_25x.hours} hours, ${speed1_25x.minutes} minutes, ${speed1_25x.seconds} seconds`}</p>
            <p>On 1.50x: {`${speed1_5x.hours} hours, ${speed1_5x.minutes} minutes, ${speed1_5x.seconds} seconds`}</p>
            <p>On 1.75x: {`${speed1_75x.hours} hours, ${speed1_75x.minutes} minutes, ${speed1_75x.seconds} seconds`}</p>
            <p>On 2.00x: {`${speed2x.hours} hours, ${speed2x.minutes} minutes, ${speed2x.seconds} seconds`}</p>
        </div>
    );
};

export default PlaylistAnalysisResults;

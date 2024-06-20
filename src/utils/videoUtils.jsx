export function extractPlaylistId(url) {
    const regex = /list=([^&]+)/;
    const match = url.match(regex);
    return match && match[1] ? match[1] : null;
}

export async function fetchVideos(playlistId, apiKey) {
    let totalVideos = 0;
    let nextPageToken = null;
    const allVideoId = [];

    async function fetchPage() {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=50${nextPageToken ? `&pageToken=${nextPageToken}` : ''}&key=${apiKey}`);
        const playlistItemsResponse = await response.json();

        const videos = playlistItemsResponse.items;
        totalVideos += videos.length;
        videos.forEach(video => allVideoId.push(video.contentDetails.videoId));
        nextPageToken = playlistItemsResponse.nextPageToken;

        if (nextPageToken) {
            await fetchPage();
        }
    }

    await fetchPage();
    return { totalVideos, allVideoId };
}

export function chunkArray(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}

export function parseISO8601Duration(durationString) {
    const durationRegex = /^P(?:([\d.]+Y)?(?:([\d.]+M))?(?:([\d.]+D))?T?(?:([\d.]+H))? ?(?:([\d.]+M))? ?(?:([\d.]+S))?)?$/;
    const matches = durationString.match(durationRegex);
    const [, years, months, days, hours, minutes, seconds] = matches.map(match => parseFloat(match) || 0);

    return (
        (years * 365 * 24 * 60 * 60) +
        (months * 30 * 24 * 60 * 60) +
        (days * 24 * 60 * 60) +
        (hours * 60 * 60) +
        (minutes * 60) +
        seconds
    );
}

export async function fetchVideoDurations(videoIds, apiKey) {
    let totalDurationInSeconds = 0;
    const videoIdChunks = chunkArray(videoIds, 50);

    for (const videoIdChunk of videoIdChunks) {
        const videoIdString = videoIdChunk.join(',');
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIdString}&key=${apiKey}`);
        const videosData = await response.json();

        videosData.items.forEach(video => {
            totalDurationInSeconds += parseISO8601Duration(video.contentDetails.duration);
        });
    }

    return totalDurationInSeconds;
}

export function formatDuration(totalDurationInSeconds) {
    const days = Math.floor(totalDurationInSeconds / 86400);
    const hours = Math.floor((totalDurationInSeconds % 86400) / 3600);
    const minutes = Math.floor((totalDurationInSeconds % 3600) / 60);
    const seconds = Math.floor(totalDurationInSeconds % 60);

    return { days, hours, minutes, seconds, totalDurationInSeconds };
}

export function calculateAdjustedDuration(totalDurationInSeconds, speed) {
    return formatDuration(totalDurationInSeconds / speed);
}

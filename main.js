// Create video element
const videoElement = document.getElementById('video-player');

// Select DOM elements
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-bar');
const volumeSlider = document.getElementById('volume');
const speedSelect = document.getElementById('speed');

// Video data
const videos = [
    { title: 'Dheragalin', artist: 'Sheikh Mustafa', src: 'SHM.mp4' },
    { title: ' Kun Rahma', artist: 'Maher Zain - ', src: 'mhzain.mp4' },
];

// Keep track of videos
let videoIndex = 0;
let isPlaying = false;
let speed = 1;

// Update video details
function loadVideo(video) {
    title.textContent = video.title;
    artist.textContent = video.artist;
    // cover.src = video.cover;
    videoElement.src = video.src;
}

// Initially load video details into DOM
loadVideo(videos[videoIndex]);

// Play video
function playVideo() {
    playBtn.querySelector('i').classList.remove('fa-play');
    playBtn.querySelector('i').classList.add('fa-pause');
    videoElement.play().catch(e => console.error("Error playing video:", e));
    isPlaying = true;
}

// Pause video
function pauseVideo() {
    playBtn.querySelector('i').classList.remove('fa-pause');
    playBtn.querySelector('i').classList.add('fa-play');
    videoElement.pause();
    isPlaying = false;
}

// Previous video
function prevVideo() {
    pauseVideo();
    setTimeout(() => {
        videoIndex--;
        if (videoIndex < 0) {
            videoIndex = videos.length - 1;
        }
        loadVideo(videos[videoIndex]);
        playVideo();
    }, 300);
}

// Next video
function nextVideo() {
    pauseVideo();
    setTimeout(() => {
        videoIndex++;
        if (videoIndex >= videos.length) {
            videoIndex = 0;
        }
        loadVideo(videos[videoIndex]);
        playVideo();
    }, 300);
}

// Update progress bar
function updateProgress() {
    const { duration, currentTime } = videoElement;
    if (isNaN(duration)) return;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

    videoElement.playbackRate = speed;
}

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = videoElement.duration;
    if (isNaN(duration)) return;
    const newTime = (clickX / width) * duration;

    if (isFinite(newTime)) {
        videoElement.currentTime = newTime;
    }
}

// Event listeners
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseVideo();
    } else {
        playVideo();
    }
});

// Change video
prevBtn.addEventListener('click', prevVideo);
nextBtn.addEventListener('click', nextVideo);

// Time/video update
videoElement.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Video ends
videoElement.addEventListener('ended', nextVideo);

// Change volume
volumeSlider.addEventListener('input', (e) => {
    videoElement.volume = e.target.value;
});

// Change speed
speedSelect.addEventListener('change', (e) => {
    speed = parseFloat(e.target.value);
    videoElement.playbackRate = speed;
});

// Load metadata
videoElement.addEventListener('loadedmetadata', updateProgress);


import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import VideoControls from './VideoControls';

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [skipTime, setSkipTime] = useState(null);
  const [volumeChange, setVolumeChange] = useState(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    const handleTimeUpdate = () => setProgress(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration);
    const handleFullscreenChange = () => {
      setIsFullscreen(
        !!document.fullscreenElement ||
        !!document.webkitFullscreenElement ||
        !!document.mozFullScreenElement ||
        !!document.msFullscreenElement
      );
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    let hideTimeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        if (isPlaying) setShowControls(false);
      }, 3000);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', () => setShowControls(true));
    container.addEventListener('mouseleave', () => {
      if (isPlaying) setShowControls(false);
    });

    const handleKeyDown = (e) => {
      switch (e.key.toLowerCase()) {
        case ' ':
        case 'enter':
          togglePlay();
          break;
        case 'arrowright':
          handleSkip(10);
          break;
        case 'arrowleft':
          handleSkip(-10);
          break;
        case 'arrowup':
          handleVolumeWithNotification(Math.min(volume + 0.1, 1));
          break;
        case 'arrowdown':
          handleVolumeWithNotification(Math.max(volume - 0.1, 0));
          break;
        case 'f':
          toggleFullScreen();
          break;
        case 'l':
          toggleLoop();
          break;
        case 'm':
          handleMuteToggle();
          break;
        case 'p':
          togglePictureInPicture();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', () => setShowControls(true));
      container.removeEventListener('mouseleave', () => {
        if (isPlaying) setShowControls(false);
      });
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(hideTimeout);
    };
  }, [isPlaying, volume]);

  const handleVolumeWithNotification = useCallback((newVolume) => {
    const video = videoRef.current;
    video.volume = newVolume;
    setVolume(newVolume);
    setVolumeChange(newVolume === 0 ? 'muted' : Math.round(newVolume * 100) + '%');
    setTimeout(() => setVolumeChange(null), 1000);
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
    setShowControls(true);
  }, []);

  const handleVolumeChange = useCallback((newVolume) => {
    const video = videoRef.current;
    video.volume = newVolume;
    setVolume(newVolume);
    setVolumeChange(newVolume === 0 ? 'muted' : Math.round(newVolume * 100) + '%');
    setTimeout(() => setVolumeChange(null), 1000);
  }, []);

  const handleMuteToggle = useCallback(() => {
    const video = videoRef.current;
    const isMuted = video.volume === 0;
    const newVolume = isMuted ? 1 : 0;
    video.volume = newVolume;
    setVolume(newVolume);
    setVolumeChange(isMuted ? '100%' : 'muted');
    setTimeout(() => setVolumeChange(null), 1000);
  }, []);

  const handlePlaybackRateChange = useCallback((newRate) => {
    const video = videoRef.current;
    video.playbackRate = newRate;
    setPlaybackRate(newRate);
  }, []);

  const toggleFullScreen = useCallback(() => {
    const container = containerRef.current;
    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }, [isFullscreen]);

  const handleProgressChange = useCallback((newProgress) => {
    const video = videoRef.current;
    video.currentTime = newProgress;
    setProgress(newProgress);
  }, []);

  const toggleLoop = useCallback(() => {
    const newLoop = !isLooping;
    videoRef.current.loop = newLoop;
    setIsLooping(newLoop);
  }, [isLooping]);

  const handleSkip = useCallback((seconds) => {
    const video = videoRef.current;
    video.currentTime += seconds;
    setSkipTime(seconds > 0 ? 'forward' : 'backward');
    setTimeout(() => setSkipTime(null), 1000);
  }, []);

  const togglePictureInPicture = useCallback(async () => {
    const video = videoRef.current;
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else if (document.pictureInPictureEnabled) {
      await video.requestPictureInPicture();
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative border border-gray-600 shadow-2xl shadow-gray-900 rounded-xl overflow-hidden w-full max-w-4xl aspect-video bg-black group"
      onClick={togglePlay}
    >
      <video
        src={src}
        className="w-full h-full object-contain cursor-pointer"
        ref={videoRef}
        loop={isLooping}
      ></video>

      {skipTime && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white px-6 py-4 rounded-lg flex items-center justify-center text-xl font-bold z-20">
          {skipTime === 'forward' ? '+10s' : '-10s'}
        </div>
      )}

      {volumeChange && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white px-6 py-4 rounded-lg flex items-center justify-center text-xl font-bold z-20">
          Volumen: {volumeChange}
        </div>
      )}

      {!isPlaying && (
        <button
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-4 z-10"
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          title="Reproducir video (Espacio)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white opacity-90" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        </button>
      )}

      {showControls && (
        <VideoControls
          progress={progress}
          duration={duration}
          isPlaying={isPlaying}
          volume={volume}
          playbackRate={playbackRate}
          isFullscreen={isFullscreen}
          isLooping={isLooping}
          togglePlay={togglePlay}
          onVolumeChange={handleVolumeChange}
          onPlaybackRateChange={handlePlaybackRateChange}
          toggleFullScreen={toggleFullScreen}
          onProgressChange={handleProgressChange}
          toggleLoop={toggleLoop}
          onSkip={handleSkip}
          togglePictureInPicture={togglePictureInPicture}
          handleMuteToggle={handleMuteToggle}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
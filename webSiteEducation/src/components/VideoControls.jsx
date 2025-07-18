import { useRef, useEffect, useState } from "react";
import {
  BsPauseFill,
  BsPlayFill,
  BsVolumeUpFill,
  BsVolumeMuteFill,
  BsVolumeDownFill,
  BsArrowsFullscreen,
  BsFullscreenExit,
  BsArrowRepeat,
  BsGearFill,
  BsSkipEndFill,
  BsSkipStartFill,
} from "react-icons/bs";
import { PiPictureInPictureFill } from "react-icons/pi";

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const VideoControls = ({
  progress,
  duration,
  isPlaying,
  volume,
  playbackRate,
  isFullscreen,
  isLooping,
  togglePlay,
  onVolumeChange,
  onPlaybackRateChange,
  toggleFullScreen,
  onProgressChange,
  toggleLoop,
  onSkip,
  togglePictureInPicture,
}) => {
  const [showPlaybackRateMenu, setShowPlaybackRateMenu] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const playbackRateRef = useRef(null);
  const volumeRef = useRef(null);
  const progressBarRef = useRef(null);

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        playbackRateRef.current &&
        !playbackRateRef.current.contains(event.target)
      ) {
        setShowPlaybackRateMenu(false);
      }
      if (volumeRef.current && !volumeRef.current.contains(event.target)) {
        setShowVolumeSlider(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const VolumeIcon = () => {
    if (volume === 0) return <BsVolumeMuteFill size={20} />;
    if (volume < 0.5) return <BsVolumeDownFill size={20} />;
    return <BsVolumeUpFill size={20} />;
  };

  const handleVolumeChange = (e) => {
    e.stopPropagation();
    const newVolume = parseFloat(e.target.value);
    onVolumeChange(newVolume);
  };

  const handleProgressChange = (e) => {
    e.stopPropagation();
    const newProgress = parseFloat(e.target.value);
    onProgressChange(newProgress);
  };

  return (
    <div
      className="absolute bottom-0 left-0 w-full p-4 transition-opacity duration-300"
      style={{
        background:
          "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Barra de progreso */}
      <div className="relative w-full h-1.5 bg-gray-600 bg-opacity-60 rounded-full mb-3 group">
        <input
          type="range"
          ref={progressBarRef}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
          min="0"
          max={duration}
          step={0.1}
          value={progress}
          onChange={handleProgressChange}
        />
        <div
          className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
          style={{ width: `${(progress / duration) * 100}%` }}
        ></div>
        <div
          className="absolute top-1/2 h-3 w-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            left: `${(progress / duration) * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        ></div>
      </div>

      {/* Controles inferiores */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            className="text-white hover:bg-white hover:bg-opacity-10 p-2 rounded-full transition-all relative group/tooltip"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            title={isPlaying ? "Pausar (Espacio)" : "Reproducir (Espacio)"}
          >
            {isPlaying ? <BsPauseFill size={24} /> : <BsPlayFill size={24} />}
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black bg-opacity-80 rounded whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity">
              {isPlaying ? "Pausar (Espacio)" : "Reproducir (Espacio)"}
            </span>
          </button>

          <button
            className="text-white hover:bg-white hover:bg-opacity-10 p-2 rounded-full transition-all relative group/tooltip"
            onClick={(e) => {
              e.stopPropagation();
              onSkip(-10);
            }}
            title="Retroceder 10s (←)"
          >
            <BsSkipStartFill size={20} />
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black bg-opacity-80 rounded whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity">
              Retroceder 10s (←)
            </span>
          </button>

          <button
            className="text-white hover:bg-white hover:bg-opacity-10 p-2 rounded-full transition-all relative group/tooltip"
            onClick={(e) => {
              e.stopPropagation();
              onSkip(10);
            }}
            title="Adelantar 10s (→)"
          >
            <BsSkipEndFill size={20} />
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black bg-opacity-80 rounded whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity">
              Adelantar 10s (→)
            </span>
          </button>

          {/* Control de volumen */}
          <div className="flex items-center relative" ref={volumeRef}>
            <button
              className="text-white hover:bg-white hover:bg-opacity-10 p-2 rounded-full transition-all relative group/tooltip"
              onClick={(e) => {
                e.stopPropagation();
                setShowVolumeSlider(!showVolumeSlider);
              }}
              title={`Volumen (↑/↓): ${Math.round(volume * 100)}%`}
            >
              <VolumeIcon />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black bg-opacity-80 rounded whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity">
                {volume === 0
                  ? "Silenciado (m)"
                  : `Volumen (↑/↓): ${Math.round(volume * 100)}%`}
              </span>
            </button>

            {showVolumeSlider && (
              <div
                className="absolute bottom-12 left-0 w-24 bg-black bg-opacity-80 p-3 rounded-lg shadow-lg z-20"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="range"
                  className="w-full h-1 bg-gray-400 rounded-full appearance-none cursor-pointer"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={handleVolumeChange}
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                      volume * 100
                    }%, #4b5563 ${volume * 100}%, #4b5563 100%)`,
                  }}
                />
              </div>
            )}
          </div>

          <div className="text-white text-sm font-medium">
            {formatTime(progress)} / {formatTime(duration)}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative" ref={playbackRateRef}>
            <button
              className="text-white hover:bg-white hover:bg-opacity-10 p-2 rounded-full transition-all relative group/tooltip"
              onClick={(e) => {
                e.stopPropagation();
                setShowPlaybackRateMenu(!showPlaybackRateMenu);
              }}
              title={`Velocidad: ${playbackRate}x`}
            >
              <BsGearFill size={20} />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black bg-opacity-80 rounded whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity">
                Velocidad: {playbackRate}x
              </span>
            </button>

            {showPlaybackRateMenu && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-32 bg-black bg-opacity-80 rounded-md shadow-lg z-20">
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                  <button
                    key={rate}
                    className={`w-full py-2 px-4 text-left text-white hover:bg-blue-600 ${
                      playbackRate === rate ? "bg-blue-600" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlaybackRateChange(rate);
                      setShowPlaybackRateMenu(false);
                    }}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className={`p-2 rounded-full transition-all relative group/tooltip ${
              isLooping
                ? "text-blue-400 bg-blue-400 bg-opacity-20"
                : "text-white hover:bg-white hover:bg-opacity-10"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              toggleLoop();
            }}
            title={isLooping ? "Desactivar bucle (l)" : "Activar bucle (l)"}
          >
            <BsArrowRepeat size={20} />
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black bg-opacity-80 rounded whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity">
              {isLooping ? "Desactivar bucle (l)" : "Activar bucle (l)"}
            </span>
          </button>

          <button
            className="text-white hover:bg-white hover:bg-opacity-10 p-2 rounded-full transition-all relative group/tooltip"
            onClick={(e) => {
              e.stopPropagation();
              togglePictureInPicture();
            }}
            title="Picture-in-Picture (p)"
          >
            <PiPictureInPictureFill size={20} />
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black bg-opacity-80 rounded whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity">
              Picture-in-Picture (p)
            </span>
          </button>

          <button
            className="text-white hover:bg-white hover:bg-opacity-10 p-2 rounded-full transition-all relative group/tooltip"
            onClick={(e) => {
              e.stopPropagation();
              toggleFullScreen();
            }}
            title={
              isFullscreen
                ? "Salir de pantalla completa (f)"
                : "Pantalla completa (f)"
            }
          >
            {isFullscreen ? (
              <BsFullscreenExit size={20} />
            ) : (
              <BsArrowsFullscreen size={20} />
            )}
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black bg-opacity-80 rounded whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity">
              {isFullscreen
                ? "Salir de pantalla completa (f)"
                : "Pantalla completa (f)"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;

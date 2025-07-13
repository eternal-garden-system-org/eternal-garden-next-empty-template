"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Volume1, Volume, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomAudioPlayerProps {
  src: string;
  className?: string;
}

export function CustomAudioPlayer({ src, className }: CustomAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const volumeControlRef = useRef<HTMLDivElement>(null);

  // Обработка клика вне элемента регулировки громкости
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        volumeControlRef.current &&
        !volumeControlRef.current.contains(event.target as Node)
      ) {
        setShowVolumeSlider(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Обработка метаданных при загрузке аудио
  const onLoadedMetadata = () => {
    if (audioRef.current) {
      const audioDuration = audioRef.current.duration;
      setDuration(audioDuration);
      setIsReady(true);
    }
  };

  // Обновление текущего времени воспроизведения
  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Воспроизведение/пауза
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Ошибка воспроизведения:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Изменение позиции воспроизведения
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current || !isReady) return;

    const newTime = parseFloat(e.target.value);
    if (isNaN(newTime)) return;

    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  // Изменение громкости
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;

    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;

    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  // Включение/выключение звука
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume || 1;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  // Форматирование времени (секунды -> MM:SS)
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Получение иконки громкости в зависимости от уровня
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={16} />;
    if (volume < 0.33) return <Volume size={16} />;
    if (volume < 0.66) return <Volume1 size={16} />;
    return <Volume2 size={16} />;
  };

  return (
    <div
      className={cn(
        "bg-accent rounded-full max-w-md relative overflow-visible",
        className,
      )}
    >
      <audio
        ref={audioRef}
        src={src}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
        className="hidden"
      />

      <div className="flex items-center p-2">
        {/* Кнопка воспроизведения */}
        <button
          onClick={togglePlayPause}
          className="size-11 flex items-center justify-center bg-primary text-primary-foreground rounded-full"
          disabled={!isReady}
        >
          {isPlaying ? (
            <Pause size={16} />
          ) : (
            <Play size={16} className="ml-0.5" />
          )}
        </button>

        {/* Прогресс с временем */}
        <div className="flex-grow flex flex-col gap-2 mx-4">
          <input
            type="range"
            min="0"
            max={isReady ? duration : 100}
            step="0.01"
            value={currentTime}
            onChange={handleProgressChange}
            className="w-full h-1.5 bg-primary/20 rounded-lg accent-primary appearance-none cursor-pointer"
            disabled={!isReady}
          />
          <div className="flex items-center gap-2">
            <div className="text-xs text-accent-foreground">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            {/* Управление громкостью */}
            <div ref={volumeControlRef} className="relative ml-auto">
              <button
                onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                className="text-accent-foreground hover:text-accent-foreground/80 p-1"
                disabled={!isReady}
              >
                {getVolumeIcon()}
              </button>

              {showVolumeSlider && (
                <div className="absolute bottom-0 right-full mr-2 bg-background shadow-md rounded-lg p-3 z-10 min-w-[120px]">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMute}
                      className="text-foreground hover:text-foreground/80"
                    >
                      {getVolumeIcon()}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-full h-1.5 bg-primary/20 rounded-lg accent-primary appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

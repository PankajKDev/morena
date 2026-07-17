"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

const ProfileMusicPlayer = ({
  src,
  volume,
  displayName,
}: {
  src: string;
  volume: number;
  displayName: string;
}) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
    } else {
      el.volume = volume / 100;
      el.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" />
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl border border-white/20 bg-background/80 backdrop-blur-md px-4 py-3 text-sm font-semibold text-foreground shadow-xl transition-all hover:scale-105 active:scale-95"
      >
        {playing ? <Pause size={18} /> : <Play size={18} />}
        {playing ? "Now playing" : `Play ${displayName}'s music`}
      </button>
    </>
  );
};

export { ProfileMusicPlayer };

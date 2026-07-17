"use client";

import { useRef, useState } from "react";
import { Music, Pause, Play, Trash2, Volume2 } from "lucide-react";
import { useProfile } from "@/components/shared/profile-context";

const IntegrationsTab = () => {
  const { music, musicVolume, setMusicFile, setMusicVolume } = useProfile();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
    } else {
      el.volume = musicVolume / 100;
      el.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="space-y-6">
      <audio
        ref={audioRef}
        src={music ?? undefined}
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />

      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Music
        </h3>

        <div className="space-y-2">
          <label className="text-sm font-medium">Add music to your page</label>
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-xl border-2 border-dashed border-input flex items-center justify-center text-muted-foreground bg-background shrink-0">
              <Music size={20} />
            </div>
            {music ? (
              <div className="flex-1 flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="text-foreground hover:text-primary transition-colors shrink-0"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <span className="text-sm text-foreground truncate">
                  Audio file loaded
                </span>
                <button
                  onClick={() => { setMusicFile(null); setPlaying(false); }}
                  className="text-muted-foreground hover:text-destructive transition-colors shrink-0 ml-auto"
                  aria-label="Remove music"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <label className="flex-1 cursor-pointer">
                <span className="inline-flex items-center justify-center w-full px-3 py-2 rounded-xl border border-input bg-background text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200">
                  Upload MP3
                </span>
                <input
                  type="file"
                  accept=".mp3,audio/mpeg"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setMusicFile(file);
                    e.target.value = "";
                  }}
                  className="sr-only"
                />
              </label>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Volume</label>
            <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
              <Volume2 size={12} />
              {musicVolume}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={musicVolume}
            onChange={(e) => {
              setMusicVolume(Number(e.target.value));
              if (audioRef.current) audioRef.current.volume = Number(e.target.value) / 100;
            }}
            className="w-full accent-primary cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export { IntegrationsTab };

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../components/shared/Button";
import { Check, X, Play, Music, Volume2 } from "lucide-react";
import { playSongPreview } from "../../../utils/playTone";

// Generic titles — public domain / royalty-free style (no copyrighted references)
const PLAYLIST = [
  "Acoustic Breeze",
  "Calm River",
  "Morning Walk",
  "Sunset Drive",
  "Starlight",
  "Ocean Waves",
  "Night Owl",
  "Summer Rain",
];

export function MusicPlaylistViz() {
  const [mode, setMode] = useState<"play" | "search" | "queue" | "next">("play");
  const [playIndex, setPlayIndex] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchStep, setSearchStep] = useState(-1);
  const [searchFound, setSearchFound] = useState<boolean | null>(null);
  const [playlist, setPlaylist] = useState<string[]>([...PLAYLIST]);
  const [newSong, setNewSong] = useState("");
  const [insertMode, setInsertMode] = useState<"queue" | "next" | null>(null);

  const resetAll = () => {
    setPlayIndex(null);
    setSearchValue("");
    setSearchStep(-1);
    setSearchFound(null);
    setPlaylist([...PLAYLIST]);
    setNewSong("");
    setInsertMode(null);
  };

  // Insert at end - 1 step
  const addToQueue = () => {
    if (!newSong.trim()) return;
    setPlaylist((prev) => [...prev, newSong.trim()]);
    setNewSong("");
    setInsertMode("queue");
  };

  // Insert at beginning - n+1 steps
  const playNext = () => {
    if (!newSong.trim()) return;
    const song = newSong.trim();
    setPlaylist((prev) => [song, ...prev]);
    setNewSong("");
    setInsertMode("next");
  };

  const runSearch = () => {
    if (!searchValue.trim()) return;
    setSearchStep(-1);
    setSearchFound(null);
    let step = 0;
    const interval = setInterval(() => {
      if (step >= playlist.length) {
        clearInterval(interval);
        setSearchFound(false);
        return;
      }
      setSearchStep(step);
      if (playlist[step].toLowerCase() === searchValue.trim().toLowerCase()) {
        setSearchFound(true);
        playSongPreview(step);
        clearInterval(interval);
        return;
      }
      step++;
    }, 500);
  };

  const stepsDisplay =
    insertMode === "next"
      ? `${playlist.length} steps — Shifted all ${playlist.length - 1} songs + 1 insert`
      : insertMode === "queue"
        ? "1 step — Added at end"
        : null;

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Try the four operations on a real playlist. See how many steps each takes.
      </p>

      {/* Mode tabs */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={mode === "play" ? "primary" : "secondary"}
          size="sm"
          onClick={() => { setMode("play"); resetAll(); }}
        >
          <Play className="mr-1.5 h-4 w-4" />
          Play Song #
        </Button>
        <Button
          variant={mode === "search" ? "primary" : "secondary"}
          size="sm"
          onClick={() => { setMode("search"); resetAll(); }}
        >
          Find Song
        </Button>
        <Button
          variant={mode === "queue" ? "primary" : "secondary"}
          size="sm"
          onClick={() => { setMode("queue"); resetAll(); }}
        >
          Add to Queue
        </Button>
        <Button
          variant={mode === "next" ? "primary" : "secondary"}
          size="sm"
          onClick={() => { setMode("next"); resetAll(); }}
        >
          Play Next
        </Button>
        <Button variant="ghost" size="sm" onClick={resetAll}>
          Reset
        </Button>
      </div>

      {/* Play by index */}
      {mode === "play" && (
        <div>
          <p className="mb-2 text-sm text-slate-600 dark:text-slate-400">
            Click an index to play that song — instant access (1 step).
          </p>
          <div className="flex flex-wrap gap-2">
            {playlist.map((song, i) => (
              <motion.button
                key={`${song}-${i}`}
                type="button"
                onClick={() => {
                  setPlayIndex(i);
                  playSongPreview(i);
                }}
                animate={{ scale: playIndex === i ? 1.05 : 1 }}
                className={`flex min-w-[100px] flex-col items-center rounded-lg border-2 px-3 py-2 text-left transition-colors ${
                  playIndex === i
                    ? "border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900/20"
                    : "border-slate-200 bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
                }`}
              >
                <span className="text-xs text-slate-500 dark:text-slate-400">[{i}]</span>
                <span className="truncate text-sm font-medium text-slate-900 dark:text-white">
                  {song}
                </span>
              </motion.button>
            ))}
          </div>
          {playIndex !== null && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 flex items-center gap-2 rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-200 dark:bg-indigo-800">
                <Volume2 className="h-4 w-4 animate-pulse text-indigo-600 dark:text-indigo-300" />
              </span>
              <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                1 step — Now playing: &quot;{playlist[playIndex]}&quot;
              </p>
            </motion.div>
          )}
        </div>
      )}

      {/* Search */}
      {mode === "search" && (
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search for a song..."
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />
            <Button variant="primary" size="sm" onClick={runSearch} disabled={!searchValue.trim()}>
              Search
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {playlist.map((song, i) => {
              const isChecked = i < searchStep || (searchFound !== null && i <= searchStep);
              const isCurrent = i === searchStep;
              const isMatch = searchFound === true && i === searchStep;
              return (
                <motion.div
                  key={`${song}-${i}`}
                  animate={{
                    scale: isCurrent ? 1.05 : 1,
                    opacity: isChecked && !isMatch ? 0.7 : 1,
                  }}
                  className={`flex min-w-[90px] flex-col items-center rounded-lg border-2 px-3 py-2 ${
                    isMatch
                      ? "border-green-500 bg-green-50 dark:border-green-400 dark:bg-green-900/20"
                      : isCurrent
                        ? "border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900/20"
                        : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
                  }`}
                >
                  <span className="text-xs text-slate-500">[{i}]</span>
                  <span className="truncate text-sm font-medium">{song}</span>
                  {i <= searchStep && searchFound !== null && (
                    isMatch ? <Check className="h-4 w-4 text-green-600" /> : <X className="h-4 w-4 text-red-500" />
                  )}
                </motion.div>
              );
            })}
          </div>
          {searchFound !== null && (
            <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-300">
              {searchFound
                ? `Found in ${searchStep + 1} steps.`
                : `Not found — checked all ${playlist.length} songs.`}
            </p>
          )}
        </div>
      )}

      {/* Add to Queue / Play Next */}
      {(mode === "queue" || mode === "next") && (
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <input
              type="text"
              value={newSong}
              onChange={(e) => setNewSong(e.target.value)}
              placeholder="New song name..."
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              disabled={insertMode !== null}
            />
            {mode === "queue" && (
              <Button
                variant="primary"
                size="sm"
                onClick={addToQueue}
                disabled={!newSong.trim()}
              >
                Add to Queue
              </Button>
            )}
            {mode === "next" && (
              <Button
                variant="primary"
                size="sm"
                onClick={playNext}
                disabled={!newSong.trim()}
              >
                Play Next
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <AnimatePresence mode="popLayout">
              {playlist.map((song, i) => (
                <motion.div
                  key={`${song}-${i}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-w-[90px] flex-col items-center rounded-lg border-2 border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
                >
                  <span className="text-xs text-slate-500">[{i}]</span>
                  <span className="truncate text-sm font-medium">{song}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {stepsDisplay && (
            <p className="mt-3 rounded-lg bg-slate-100 p-3 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {stepsDisplay}
            </p>
          )}
        </div>
      )}

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/50">
        <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
          <Music className="mr-1 inline h-4 w-4" />
          Play = 1 step · Search = up to {playlist.length} steps · Add to Queue = 1 step · Play Next = {playlist.length + 1} steps
        </p>
      </div>
    </div>
  );
}

/**
 * Play a short musical tone using Web Audio API.
 * Used for "Play Song" feedback in the Music Playlist viz.
 */

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioContext;
}

export function playTone(frequency: number, durationMs = 400): void {
  try {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + durationMs / 1000);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + durationMs / 1000);
  } catch {
    // Silently fail if audio is not supported
  }
}

/** Play a short musical "chord" for song playback (more satisfying feedback) */
export function playSongPreview(index: number): void {
  // C major scale frequencies (Hz) - different note per song index
  const notes = [262, 294, 330, 349, 392, 440, 494, 523];
  const freq = notes[index % notes.length];
  playTone(freq, 350);
}

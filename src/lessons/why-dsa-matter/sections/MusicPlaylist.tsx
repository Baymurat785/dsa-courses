import { motion } from "framer-motion";
import { Card } from "../../../components/shared/Card";
import { MusicPlaylistViz } from "../visualizations/MusicPlaylistViz";

export function MusicPlaylist() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        Real-World Example: The Music Playlist
      </h2>
      <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
        Instead of a new data structure, let&apos;s look at how Arrays behave in
        a real app, like a music player. You have a playlist with 1,000 songs.
      </p>

      <Card className="mb-8">
        <MusicPlaylistViz />
      </Card>

      <div className="space-y-4">
        <Card className="p-4">
          <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
            1. &quot;Play Song #50&quot; (Read)
          </h3>
          <ul className="mb-2 ml-4 list-disc space-y-1 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>Operation:</strong> Access Index [49]
            </li>
            <li>
              <strong>Speed:</strong> Instant (1 Step)
            </li>
          </ul>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            The computer jumps directly to the memory address of the 50th song.
            It doesn&apos;t care that there are 1,000 songs.
          </p>
        </Card>

        <Card className="p-4">
          <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
            2. &quot;Find &apos;Summer Rain&apos;&quot; (Search)
          </h3>
          <ul className="mb-2 ml-4 list-disc space-y-1 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>Operation:</strong> Linear Search
            </li>
            <li>
              <strong>Speed:</strong> Slow (Up to 1,000 Steps)
            </li>
          </ul>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            The computer must check Song 1, then Song 2, then Song 3... If
            &quot;Summer Rain&quot; is the last song, it checks everything.
          </p>
        </Card>

        <Card className="p-4">
          <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
            3. &quot;Add Song to Queue&quot; (Insert at End)
          </h3>
          <ul className="mb-2 ml-4 list-disc space-y-1 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>Operation:</strong> Insert at [length]
            </li>
            <li>
              <strong>Speed:</strong> Instant (1 Step)
            </li>
          </ul>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            We just place the song in the empty slot at the end. No one else has
            to move.
          </p>
        </Card>

        <Card className="p-4">
          <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
            4. &quot;Play Next&quot; (Insert at Beginning)
          </h3>
          <ul className="mb-2 ml-4 list-disc space-y-1 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>Operation:</strong> Insert at [0]
            </li>
            <li>
              <strong>Speed:</strong> Very Slow (1,000 Steps)
            </li>
          </ul>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            To put a song at the very top, we must shift Song #1 to position #2,
            Song #2 to #3... all the way to 1,000.
          </p>
        </Card>
      </div>

      <div className="mt-6 rounded-xl border-l-4 border-indigo-500 bg-indigo-50 p-4 dark:border-indigo-400 dark:bg-indigo-900/20">
        <h4 className="mb-2 font-semibold text-slate-900 dark:text-white">
          The Lesson
        </h4>
        <p className="leading-relaxed text-slate-600 dark:text-slate-300">
          If you are building a music player, using an Array is great for playing
          songs (random access), but if users frequently use &quot;Play
          Next&quot; (Insert at Start) on massive playlists, the app might become
          laggy. This is why choosing the right structure matters.
        </p>
      </div>
    </motion.div>
  );
}

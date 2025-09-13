import React, { useState, useRef, useEffect } from "react";

const MusicFeature = ({ songs }) => {
  const [playingSongId, setPlayingSongId] = useState(null);
  const audioRef = useRef(null);

  const handlePlay = (songId, songUrl) => {
    if (playingSongId === songId) {
      // Stop the song
      audioRef.current.pause();
      setPlayingSongId(null);
    } else {
      // Play new song
      if (audioRef.current) {
        audioRef.current.pause(); // Stop previous song
      }

      setPlayingSongId(songId);
      audioRef.current.src = songUrl;
      audioRef.current.play();
    }
  };

  return (
    <div className="mx-40 pt-10">
      <h1 className="text-4xl font-bold">Recommended Tracks</h1>
      {songs.map((song) => (
        <div
          key={song._id}
          className="flex items-center rounded-sm shadow-md mt-10 justify-between py-5 px-4"
        >
          <div>
            <h1 className="font-semibold text-xl">
              {song.title} <small className="italic">...{song.mood}</small>
            </h1>
            <p>{song.artist}</p>
          </div>
          <div
            className="icons border px-3 py-1 rounded-full cursor-pointer"
            onClick={() => handlePlay(song._id, song.song)}
          >
            {playingSongId === song._id ? (
              <i className="ri-pause-fill"></i>
            ) : (
              <i className="ri-play-fill"></i>
            )}
          </div>
        </div>
      ))}

      {/* Single hidden audio element */}
      <audio ref={audioRef} onEnded={() => setPlayingSongId(null)} />
    </div>
  );
};

export default MusicFeature;

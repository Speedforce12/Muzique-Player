import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSpotify from "./useSpotify";

function useSongInfo() {
  const selectedTrack = useSelector((state) => state.music.playingTrack);
  const spotify = useSpotify();
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (selectedTrack) {
          const trackInfo = await fetch(
            `https://api.spotify.com/v1/tracks/${selectedTrack.id}`,
            {
              headers: {
                Authorization: `Bearer ${spotify.getAccessToken()}`,
              },
            }
          ).then((response) => response.json());

        setSongInfo(trackInfo);
      }
    };
    fetchSongInfo();
  }, [selectedTrack, spotify]);
    
    console.log(spotify.getAccessToken());

  return songInfo;
}

export default useSongInfo;

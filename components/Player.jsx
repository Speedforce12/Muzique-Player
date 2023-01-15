import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startPlaying, togglePlayingTrack } from "../redux/reducer";
import SpotifyPlayer from "react-spotify-web-playback";
import useSongInfo from "../lib/useSongInfo";
import { useSession } from "next-auth/react";
import useSpotify from "../lib/useSpotify";
import {
  HiFastForward,
  HiPause,
  HiPlay,
  HiReply,
  HiRewind,
  HiSwitchHorizontal,
  HiVolumeUp,
} from "react-icons/hi";
import { BsVolumeDown } from "react-icons/bs";
import { debounce } from "lodash";

const Player = () => {
  const { data: session } = useSession();
  const playingTrack = useSelector((state) => state.music.playingTrack);
  const dispatch = useDispatch();
  const play = useSelector((state) => state.music.playing);
  const [volume, setVolume] = useState(25);
  const songInfo = useSongInfo();
  const spotify = useSpotify();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotify
        .getMyCurrentPlayingTrack()
        .then((data) => {
          dispatch(togglePlayingTrack(data.body?.item?.id));

          spotify.getMyCurrentPlaybackState().then((data) => {
            if (data.body?.is_playing) dispatch(startPlaying());
          });
        });
    }
  };

  const handlePlay = () => {
    spotify.getMyCurrentPlaybackState().then((data) => {
      if (data.body?.is_playing) {
        spotify.pause();
        dispatch(startPlaying());
      } else {
        spotify.play();
        dispatch(startPlaying());
      }
    });
  };

  useEffect(() => {
    if (spotify.getAccessToken() && !playingTrack) {
      fetchCurrentSong();
      setVolume(25);
    }
  }, [spotify, session, playingTrack]);


  useEffect(() => {
    if (volume > 0 && volume < 100) {
    debounceVolume(volume)
  }
  }, [volume])
  

  const debounceVolume = useCallback(
    debounce((volume) => {
      spotify.setVolume(volume).catch((err) => { console.log(err)})
    },500),[]
  )


  return (
    <div className='pb- grid h-24 grid-cols-3 bg-gradient-to-b from-black to-gray-900 px-2 text-xs text-white md:px-8 md:text-base'>
      <div className='flex items-center space-x-4'>
        <img
          className='hidden h-10 w-10 md:inline '
          src={songInfo?.album?.images?.[0]?.url}
          alt=''
        />

        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      <div className='flex items-center justify-evenly'>
        <HiSwitchHorizontal className='button' />
        <HiRewind className='button' />

        {play ? (
          <HiPause onClick={handlePlay} className='button h-10 w-10' />
        ) : (
          <HiPlay onClick={handlePlay} className='button  h-10 w-10' />
        )}

        <HiFastForward className='button' />
        <HiReply className='button' />
      </div>

      {/* right side */}
      <div className='flex items-center justify-end space-x-3 pr-5 md:space-x-4'>
        <BsVolumeDown
          className='button'
          onClick={() => volume > 0 && setVolume(volume - 5)}
        />
        <input
          type='range'
          value={volume}
          min={0}
          max={100}
          className='w-14  cursor-pointer accent-green-500 md:w-28'
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <HiVolumeUp
          onClick={() => volume < 100 && setVolume(volume + 5)}
          className='button'
        />
      </div>
    </div>
  );
};

export default Player;

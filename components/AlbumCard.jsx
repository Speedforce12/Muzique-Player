import Image from "next/image";
import React from "react";
import PlayPause from "./PlayPause";
import { useSelector, useDispatch } from "react-redux";
import { togglePlayingTrack,startPlaying } from "../redux/reducer";



const AlbumCard = ({ track }) => {
  const dispatch = useDispatch();
  const selectedTrack = useSelector((state) => state.music.playingTrack);
  
  // play selected track once selected track and current track is the same 
  const handlePlay = () => {
    dispatch(togglePlayingTrack(track));
    if (track?.uri === selectedTrack?.uri) {
      dispatch(startPlaying());
    };
  }

  return (
    <div
      className='group relative mx-auto flex w-[260px] cursor-pointer flex-col rounded-2xl  border bg-white/10 bg-opacity-80 p-4 backdrop-blur-sm duration-200 ease-out hover:scale-105 '
      onClick={handlePlay}>
      <div className='relative h-64 w-full'>
        <img
          src={track.albumUrl ? track.albumUrl : "/images/coverArt.jpg"}
          className='absolute inset-0 h-full w-full object-cover  shadow-lg'
        />

        <div className='absolute bottom-20 right-24 opacity-0 group-hover:opacity-100'>
          <PlayPause />
        </div>
      </div>

      <div className='right-15 absolute bottom-3 flex flex-col p-3 opacity-0 group-hover:opacity-100'>
        <span className='text-lg font-semibold text-white truncate w-56'>{track.title}</span>
        <span className='text-lg font-semibold text-white'>{track.artist}</span>
      </div>
    </div>
  );
};

export default AlbumCard;

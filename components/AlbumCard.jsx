import Image from "next/image";
import React from "react";

const AlbumCard = () => {
  return (
    <div className='mx-auto relative group flex w-[260px] cursor-pointer flex-col rounded-2xl  bg-white/10 border hover:scale-105 duration-200 ease-out bg-opacity-80 p-4 backdrop-blur-sm '>
      <div className='relative h-64 w-full'>
        <img
          src='/images/coverArt.jpg'
          className='absolute inset-0 h-full w-full object-cover  shadow-lg'
        />
      </div>
      <div className='absolute bottom-3 right-15 flex flex-col p-3 opacity-0 group-hover:opacity-100'>
        <span className='text-lg font-semibold text-white'>Stoney</span>
        <span className='text-lg font-semibold text-gray-400'>Post Malone</span>
      </div>
    </div>
  );
};

export default AlbumCard;

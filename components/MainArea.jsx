import React, { useEffect, useState } from "react";
import AlbumCard from "./AlbumCard";
import Search from "./Search";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import useSpotify from "../lib/useSpotify";

const MainArea = () => {
  const spotify = useSpotify();

  const [album, setAlbums] = useState([]);

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  // useEffect(() => {
  //   if (spotify.getAccessToken()) {
  //     // Get Elvis' albums
  //   spotify
  //     .getAlbums()
  //     .then(
  //       function (data) {
  //         console.log("Albums information", data.body);
  //       },
  //       function (err) {
  //         console.error(err);
  //       }
  //     );
  //   }
  // }, [session, spotify]);

  console.log(album)
  return (
    <div className='flex flex-1 flex-col'>
      <Search />
      <div className='grid w-full p-5'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-bold text-white lg:text-2xl'>
            Top Artist
          </h2>
          <div className='flex items-center justify-between space-x-4 pr-5'>
            <button
              className='cursor-pointer rounded-full bg-white p-2 shadow-lg'
              onClick={slideLeft}>
              <BiChevronLeft className='text-lg' />
            </button>
            <button
              className='cursor-pointer rounded-full bg-white p-2 shadow-lg'
              onClick={slideRight}>
              <BiChevronRight className='text-lg' />
            </button>
          </div>
        </div>
        <div
          id='slider'
          className=' scroll flex max-w-xs gap-x-4 overflow-x-scroll scroll-smooth p-5 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-700 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-hide xl:max-w-[1400px]'>
          <div className='ref={ref} my-4 flex h-56 gap-x-5'>
            <AlbumCard />
            <AlbumCard />
            <AlbumCard />
            <AlbumCard />
            <AlbumCard />
            <AlbumCard />
            <AlbumCard />
            <AlbumCard />
            <AlbumCard />
            <AlbumCard />
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default MainArea;

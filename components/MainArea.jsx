import React, { useEffect, useState } from "react";
import AlbumCard from "./AlbumCard";
import Search from "./Search";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import useSpotify from "../lib/useSpotify";
import Track from "./Track";

const MainArea = () => {
  const spotify = useSpotify();
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    if (spotify.getAccessToken() && search) {
      // Get searched results
      spotify.searchTracks(search).then((data) => {
        setSearchResult(
          data.body.tracks.items.map((track) => {
            return {
              id: track.id,
              artist: track?.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: track.album.images[0].url,
              popularity: track.popularity,
            };
          })
        );
      });
    }
    
      spotify.getNewReleases().then((data) => {
        setNewReleases(
          data.body.albums.items.map((track) => {
            return {
              id: track.id,
              artist: track?.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: track.images[0].url,
              popularity: track.popularity,
            };
          })
        );
      });
  }, [spotify,search]);


  return (
    <div className='flex flex-1 flex-col'>
      <Search search={search} setSearch={setSearch} />
      <div className='grid w-full p-5'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-bold text-white lg:text-2xl'>
            New Releases
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
            {searchResult.length === 0
              ? newReleases.map((track) => (
                  <AlbumCard key={track.id} track={track} />
                ))
              : searchResult.map((track) => (
                  <AlbumCard key={track.id} track={track} />
                ))}
          </div>
        </div>

        <div className='flex h-[335px] flex-col space-y-6  p-2 '>
          <h2 className='text-xl font-bold text-white'>
            {searchResult.length === 0 ? "New Releases" : "Tracks"}
          </h2>
          <div className='overflow-hidden overflow-y-scroll rounded-2xl  p-3 scrollbar-thin  scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500'>
            {searchResult.length === 0
              ? newReleases.map((track) => (
                  <Track key={track.id} track={track} />
                ))
              : searchResult.map((track) => (
                  <Track key={track.id} track={track} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainArea;

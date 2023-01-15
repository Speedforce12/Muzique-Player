import { BiHeadphone } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import PopUPMenu from "./PopUPMenu";
import { useSelector } from "react-redux";
import { useState } from "react";

const Track = ({ track }) => {
  const [like, setLike] = useState(false);
  const selectedTrack = useSelector((state) => state.music.playingTrack);
  const playing = useSelector((state) => state.music.playing);

  return (
    <div className='flex cursor-pointer items-center justify-between rounded-xl p-2 transition ease-out hover:bg-white/20'>
      {/* left side */}
      <div className='flex items-center space-x-4'>
        <img
          src={track.albumUrl ? track.albumUrl : "/images/coverArt.jpg"}
          alt=''
          className='h-12 w-12 rounded-xl object-cover'
        />
        <div className='flex flex-col'>
          <p className='text-sm font-bold text-white md:text-base'>
            {track.title}
          </p>
          <h6 className='text-sm font-semibold text-gray-500'>
            {track.artist}
          </h6>
        </div>
      </div>

      {/* right side */}
      <div className='ml-auto hidden items-center space-x-5 sm:flex'>
        <div className='flex items-center space-x-1'>
          <BiHeadphone className='text-2xl text-white' />
          <p className='text-sm font-medium text-white'>{track.popularity}</p>
        </div>

        <div className='group relative  flex h-10 w-[85px] items-center rounded-full border-2 border-[#646363]  pr-5'>
          <div className='relative'>
            <AiFillHeart
              className={` ${
                like ? " text-green-500" : "text-white/20"
              } absolute -top-3 ml-2 text-2xl  duration-200 hover:scale-110`}
              onClick={() => setLike(!like)}
            />
          </div>
          {/* play selected track once the track was selected elsewhere */}
          {track?.uri === selectedTrack?.uri && playing ? (
            <div className='absolute -right-1.5 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full hover:border hover:bg-[#0D0D0D] bg-[#15883e] duration-200 group-hover:scale-110'>
              <BsFillPauseFill className='text-2xl text-white' />
            </div>
          ) : (
            <div className='absolute -right-1.5 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full  border bg-[#0D0D0D] duration-200 group-hover:scale-110 hover:border-none hover:bg-[#15883e]'>
              <BsFillPlayFill className='text-2xl text-white' />
            </div>
          )}

        </div>
      </div>

      <div className='ml-auto inline-block sm:hidden'>
        <PopUPMenu />
      </div>
    </div>
  );
};

//

export default Track;

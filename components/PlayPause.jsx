import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const PlayPause = () => {
  const playing = useSelector((state) => state.music.playing)
    return (
      <div className='flex flex-col '>
        <div className='flex h-14 w-14 items-center justify-center rounded-full bg-green-600 shadow-lg transition duration-200 hover:scale-110'>
          {playing ? (
            <BsFillPauseFill className='text-3xl text-black' />
          ) : (
            <BsFillPlayFill className='text-3xl text-black' />
          )}
        </div>
      </div>
    );
};

export default PlayPause;

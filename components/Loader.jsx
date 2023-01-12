import PulseLoader from "react-spinners/PulseLoader";
import Image from "next/image";

function Loader() {
  return (
    <div className='h-screen bg-black'>
      <div className='flex flex-col items-center space-y-4 pt-40'>
        <span className='relative h-[250px] w-[400px] lg:h-[240px] lg:w-[550px]'>
          <Image
            src='https://rb.gy/y9mwtb'
            fill
            className='animate-pulse object-contain'
          />
        </span>
        <PulseLoader size={23} color='#15883e' />
      </div>
    </div>
  );
}

export default Loader;

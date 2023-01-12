import { signIn, getProviders, useSession } from "next-auth/react";
import Loader from "../../components/Loader"


const login = ({ providers }) => {

  const { data: session, status } = useSession();
  
  if (status === "loading") return <Loader />;



  return (
    <div className='mx-auto h-screen space-y-5 bg-black'>
      <div className='flex items-center justify-center space-x-3 border-b border-gray-400 py-6'>
        <img src='/images/SpotifyLogo.png' className='h-20 w-20 object-cover' />
        <h1 className='text-4xl font-bold text-black dark:text-white'>Spotify</h1>
      </div>

      <div className='mt-5 flex flex-col items-center justify-center space-y-3'>
        <p className='text-lg font-semibold  dark:text-white'>You are logged out.</p>
        <button className='w-[300px] rounded-full bg-green-500 px-4 py-2 font-semibold text-black hover:bg-green-400' onClick={()=>signIn("spotify",{callbackUrl:'/'})}>
          LOG IN
        </button>

        <div className='flex flex-col'>
          <div className='text-sm font-bold dark:text-white'> OR </div>
        </div>
        <p className='text-lg font-semibold  dark:text-white'>Don't have an account?</p>
        <button className='w-[300px] rounded-full bg-white border border-gray-700 px-4 py-2 font-semibold text-gray-500 hover:border-2 whitespace-nowrap'>
          SIGN UP FOR SPOTIFY
        </button>
      </div>
    </div>
  );
};

export default login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

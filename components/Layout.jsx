import { useRouter } from 'next/router';
import Sidebar from './Sidebar';
import { useSession } from 'next-auth/react';
import Loader from './Loader';


const Layout = ({ children }) => {
  const { status } = useSession()
  if (status === 'loading') return <Loader />
  
  const router = useRouter()
    return (
      <div className='relative flex bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black'>
        {router.pathname !== "/auth/login" && <Sidebar path={router.route} />}
        <div className='h-screen flex-1 '>{children}</div>
      </div>
    );
}

export default Layout
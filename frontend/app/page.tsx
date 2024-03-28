'use client'

import { useRouter } from 'next/navigation'
import { getAccessToken } from '../components/getAccessToken';
import { setAccessToken } from '../components/setAccessToken';

export default function Page() {
  const router = useRouter();
  // const cookies = new Cookies();
  const accessToken = getAccessToken();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleProfile = () => {
    router.push('/profile');
  };

  const handleLogout = () => {
    setAccessToken();
    router.push('/');
  };
  return (
  <>
    <header className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">My App</h1>
      </div>
      <div>
        {accessToken !== '' ? (
          <button onClick={handleProfile} className="mr-4">
            Profile
          </button>
        ) : (
          <button onClick={handleLogin} className="mr-4">
            Login
          </button>
        )}
        {accessToken && (
          <button onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
    <h1 className="text-3xl font-bold underline">Hello ohan, Next.js!</h1>
  </>
);

}

'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { getAccessToken } from '../components/getAccessToken';
import { deleteAccessToken } from '../components/deleteAccessToken';

export default function Page() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await getAccessToken();
      setAccessToken(token);
    };

    fetchAccessToken();
  }, []);

  if (!accessToken) {
    return <div>Loading ...</div>
  }

  const handleLogin = () => {
    router.push('/login');
  };

  const handleProfile = () => {
    router.push('/profile');
  };

  const handleLogout = () => {
    deleteAccessToken();
    setAccessToken(' ');
    router.refresh();
  };
  return (
  <>
    <header className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center">
      <div className="flex items-center">
      <h1 className="text-2xl mr-4 font-bold overline">Ohanlines.</h1>
      <button onClick={() => {router.push('/')}} className="mr-4">
        Home
      </button>
      <button onClick={() => {router.push('/content')}} className="mr-4">
        Content
      </button>
      </div>
      <div>
        {accessToken.value ? (
            <>
              <button onClick={handleProfile} className="mr-4">
                Profile
              </button>
              <button onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={handleLogin} className="mr-4">
                Login
              </button>
              <button onClick={() => { router.push('/signup') }}>
                Signup
              </button>
            </>
          )}
      </div>
    </header>
    <h1 className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 text-4xl text-slate-300">Empowering minds for tomorrow</h1>
  </>
);

}

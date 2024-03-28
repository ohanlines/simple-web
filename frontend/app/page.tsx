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

  console.log("ACC:", accessToken);
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
    console.log('handleLO:', accessToken);
    router.refresh(); // Refresh the page or perform any other necessary actions
  };
  return (
  <>
    <header className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">My App</h1>
      </div>
      <div>
        {accessToken.value ? (
          <button onClick={handleProfile} className="mr-4">
            Profile
          </button>
        ) : (
          <button onClick={handleLogin} className="mr-4">
            Login
          </button>
        )}
        {accessToken.value && (
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

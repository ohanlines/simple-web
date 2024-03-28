'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { viewProfile } from '../../api/viewProfile'
import { updateProfile } from '../../api/updateProfile'

export default function ViewProfile() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchContentData = async () => {
      try {
        const data = await viewProfile();
        setEmail(data.data.email);
        setUsername(data.data.username);
      } catch (error) {
        console.error('Error fetching content data:', error);
      }
    };

    fetchContentData();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call signIn function passing email and password
      const data = {
        email: email,
        username: username,
        oldPassword: oldPassword,
        newPassword: newPassword
      };
      const dataUpdate = await updateProfile(data);
      setUpdateStatus(true);
    } catch (error) {
      // Handle errors, such as displaying error messages to the user
      setError('Invalid email or password. Please try again.');
    }
  };

  // Function to handle changes in the password fields
  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    // Check if both oldPassword and newPassword are not empty
    setIsFormValid(oldPassword !== '' && e.target.value !== '');
  };

    if(updateStatus){
        return(
            <>
                <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-lg mb-4">Update Berhasil </p>
                <button onClick={() => {
                    router.push('/');
                    setUpdateStatus(false);
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Back to Home
            </button>
            </div>
            </>
        )
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Update Your Account Information</h2>
          {error && <p className="mt-2 text-center text-red-600">{error}</p>}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={email}
                readOnly // Make email field read-only
              />
            </div>
          <div>
              <label htmlFor="username" className="sr-only">Old Password</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="oldPass" className="sr-only">Old Password</label>
              <input
                id="oldPass"
                name="oldPass"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="newPass" className="sr-only">New Password</label>
              <input
                id="newPass"
                name="newPass"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="New Password"
                value={newPassword}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 ${!isFormValid && 'bg-gray-400 cursor-not-allowed'}`} // Disable button if form is not valid
              disabled={!isFormValid}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

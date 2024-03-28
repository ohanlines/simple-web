'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getContentDetails } from '../../../api/getContentDetails'

export default function ContentDetailsPage({ params }) {
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

    useEffect(() => {
    const fetchContentData = async () => {
      try {
        const data = await getContentDetails(params.id);
        // console.log("DATA:", data)
        setContent(data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchContentData();
  }, [params.id]);

  const handleBack = () => {
    router.back();
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-lg mb-4">Unauthorized</p>
        <button onClick={handleBack} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Go Back</button>
      </div>
    );
  }

  if (!content) {
    return <div>Loading...</div>;
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 text-xl">
      <h1 className="mb-4">{content[0].Title}</h1>
      <p>{content[0].Description}</p>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${content[0].Youtube_Code}`}
        frameBorder="0"
        allowFullScreen
        className="mt-4"
      ></iframe>
    </div>
  );
};

'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getContentDetails } from '../../api/getContentDetails'

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
      <div className="error-message">
        <p>Unauthorized</p>
        <button onClick={handleBack}>Go Back</button>
      </div>
    );
  }

  if (!content) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>{content[0].Title}</h1>
      <p>{content[0].Description}</p>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${content[0].Youtube_Code}`}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

'use client'
import { useEffect, useState } from 'react';
import ContentCard from '../../components/contentCard';
import { getContents } from '../../api/getContents'

export default function Page() {
  const [content, setContent] = useState({ free: [], premium: [] });

    useEffect(() => {
    const fetchContentData = async () => {
      try {
        const data = await getContents();
        // console.log("DATA:", data)
        setContent(data.data);
      } catch (error) {
        console.error('Error fetching content data:', error);
      }
    };

    fetchContentData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Free Content</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {content.free.map(item => (
            <ContentCard key={item.id} id={item.id} title={item.Title} type="Free" />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Premium Content</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {content.premium.map(item => (
            <ContentCard key={item.id} id={item.id} title={item.Title} type="Premium" />
          ))}
        </div>
      </div>
    </div>
  );
};

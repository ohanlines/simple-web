import Link from 'next/link';

const ContentCard = ({ id, title, type }) => {
  return (
    <Link href={`/content/${id}`}>
      <div className="hover:no-underline">
        <div className="bg-white shadow-md p-4 rounded-lg cursor-pointer">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p>{type}</p>
        </div>
      </div>
    </Link>
  );
};

export default ContentCard;

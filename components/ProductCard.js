'use client';

export default function ProductCard({ product }) {
  const { imageUrl, name, description, price } = product;

  return (
    <div className="border border-primary rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 bg-secondary overflow-hidden">
      <div className="w-full h-[180px] bg-white flex items-center justify-center rounded-lg mb-3 overflow-hidden border border-gray-200">
        {imageUrl ? (
          <div className="relative h-50 overflow-hidden rounded-lg mb-3">
            <img src={imageUrl} alt={name} className="h-full w-full object-contain" />
          </div>
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-primary text-gray-500">
            No Image
          </div>
        )}
      </div>
      <h2 className="font-bold text-lg text-primary truncate">{name}</h2>
      <p className="text-sm text-primary line-clamp-2 mb-2">{description}</p>
      <div className="flex justify-between items-center mt-3">
        <span className="text-green-600 font-bold">₹{price}</span>
        <button className="text-sm font-medium text-white bg-indigo-900 px-4 py-1.5 rounded-full hover:bg-indigo-800 transition-colors cursor-pointer">
          View Details
        </button>
      </div>
    </div>
  );
}
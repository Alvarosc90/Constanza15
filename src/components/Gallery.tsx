import React from "react";

interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <section className="bg-pink-50 py-10">
      <h3 className="text-2xl font-bold text-rose-600 text-center mb-6">Galería</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
        {images.map((img, index) => (
          <img key={index} src={img} alt={`Foto ${index+1}`} className="w-full h-64 object-cover rounded-lg shadow-md" />
        ))}
      </div>
    </section>
  );
};

export default Gallery;

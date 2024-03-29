import { useState } from "react";

const ImageSlider = ({ imageUrls }: { imageUrls: string[] }) => {
  const [, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  return (
    <>
      {imageUrls.map((imageUrl, index) => (
        <div
          key={index}
          className={`relative w-full pt-[100%]`}
          aria-hidden="true"
          role="button"
        >
          <img
            src={imageUrl}
            className="absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover"
            onClick={nextImage}
          />
        </div>
      ))}
    </>
  );
};

export default ImageSlider;

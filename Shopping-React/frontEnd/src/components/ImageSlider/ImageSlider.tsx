const ImageSlider = ({
  imageUrls,
  onImageClick,
}: {
  imageUrls: string[];
  onImageClick: (imageUrl: string) => void;
}) => {
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
            onClick={() => onImageClick(imageUrl)}
          />
        </div>
      ))}
    </>
  );
};

export default ImageSlider;

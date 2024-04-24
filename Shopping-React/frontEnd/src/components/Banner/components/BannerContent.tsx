import React, { useState } from "react";
import banner1 from "../../../assets/anh1.png";
import banner2 from "../../../assets/anh2.png";
import banner3 from "../../../assets/anh3.png";
import banner4 from "../../../assets/anh4.png";
import image5 from "../../../assets/anh5.png";
import image6 from "../../../assets/anh6.png";

export default function BannerContent() {
  const banners = [banner1, banner2, banner3, banner4];
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const nextImage = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prevImage = () =>
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="flex flex-wrap justify-between mx-[-4px] sm:mx-[-8px] md:mx-[-12px] lg:mx-[-16px] xl:mx-[-16px] mt-[30px] relative">
      <div className="flex-auto w-full sm:w-[66.66667%] md:px-2 block relative">
        <img
          src={banners[current]}
          alt="Banner"
          key={current}
          className="w-full h-[235px] object-cover animate-fadeIn"
          style={{ objectFit: "contain" }}
        />
        {isHovering && (
          <>
            <button
              className="absolute top-1/2 left-5 transform -translate-y-1/2 -translate-x-5 bg-white p-2 rounded-full opacity-50"
              style={{ transform: "translate(-50%, -50%)" }}
              onClick={prevImage}
            >
              ◀
            </button>
            <button
              className="absolute top-1/2 right-5 transform -translate-y-1/2 translate-x-5 bg-white p-2 rounded-full opacity-50"
              style={{ transform: "translate(50%, -50%)" }}
              onClick={nextImage}
            >
              ▶
            </button>
          </>
        )}
      </div>
      <div className="flex-auto w-full sm:w-[33.33333%] px-1 flex flex-col items-center justify-between h-[235px]">
        <img
          src={image5}
          alt="Image 1"
          className="w-full object-cover h-[115px]"
        />
        <img
          src={image6}
          alt="Image 2"
          className="w-full object-cover h-[115px]"
        />
      </div>
    </div>
  );
}

import BannerApp from "./components/BannerApp";
import BannerContent from "./components/BannerContent";

export default function Banner() {
  return (
    <div className="max-w-[80%] m-auto w-full  p-0 md:block hidden flex">
      <BannerContent />
      <BannerApp />
    </div>
  );
}

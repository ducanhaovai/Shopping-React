import Allfile from "./components/Allfile";
import Category from "./components/Category";

export default function Aside() {
  return (
    <div className="py-4">
      <Allfile />
      <Category />
      <div className="my-4 h-0.5 bg-gray-300"></div>
    </div>
  );
}

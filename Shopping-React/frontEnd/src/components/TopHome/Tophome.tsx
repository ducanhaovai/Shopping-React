import { useState } from "react";
import Button from "./components/Button";

export default function Tophome() {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleButtonClick = (buttonLabel: string) => {
    setActiveButton(buttonLabel);
  };
  return (
    <>
      <div className="bg-gray-300/40 py-4 px-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <div>Sắp xếp theo</div>
            <Button
              label="Phổ biến"
              isActive={activeButton === "Phổ biến"}
              onClick={() => handleButtonClick("Phổ biến")}
            />
            <Button
              label="Mới nhất"
              isActive={activeButton === "Mới nhất"}
              onClick={() => handleButtonClick("Mới nhất")}
            />
            <Button
              label="Bán chạy"
              isActive={activeButton === "Bán chạy"}
              onClick={() => handleButtonClick("Bán chạy")}
            />
            <select className="h-8 px-4 text-left text-sm capitalize outline-none  bg-white text-black hover:bg-slate-100">
              <option value="" className="bg-white text-black">
                Giá
              </option>
              <option value="asc" className="bg-white text-black">
                Giá: Thấp đến cao
              </option>
              <option value="desc" className="bg-white text-black">
                Giá: Cao đến thấp
              </option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

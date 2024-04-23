import { useTranslation } from "react-i18next";

export default function List() {
  const { t } = useTranslation();

  return (
    <ul className="list-none pl-0 mt-0  hidden sm:flex">
      <li className="flex items-center text-white no-underline font-light m-0 mx-2 relative h-6 text-lg">
        <a className="flex items-center text-white no-underline font-light text-xs hover:text-opacity-70">
          {t("sell.sellerChannel")}
        </a>
        <div className="absolute w-px h-4 bg-white right-[-9px] top-1/2 transform -translate-y-1/2"></div>
      </li>
      <li className="flex items-center text-white no-underline font-light m-0 mx-2 relative h-6 text-lg ">
        <a className="flex items-center text-white no-underline font-light text-xs hover:text-opacity-70">
          {t("sell.becomeASeller")}
        </a>
        <div className="absolute w-px h-4 bg-white right-[-9px] top-1/2 transform -translate-y-1/2"></div>
      </li>
      <li className="flex items-center text-white no-underline font-light m-0 mx-2 relative h-6 text-lg">
        <a className="flex items-center text-white no-underline font-light text-xs hover:text-opacity-70">
          {t("sell.downloadApp")}
        </a>
        <div className="absolute w-px h-4 bg-white right-[-9px] top-1/2 transform -translate-y-1/2"></div>
      </li>
      <li className="flex items-center text-white no-underline font-light m-0 mx-2 relative h-6 text-lg hover:text-opacity-70">
        <a className="flex items-center text-white no-underline font-light text-xs hover:text-opacity-70">
          {t("sell.connect")}
        </a>
        <div className="absolute w-px h-4 bg-white right-[-9px] top-1/2 transform -translate-y-1/2 "></div>
      </li>
    </ul>
  );
}

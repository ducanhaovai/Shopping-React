import { useTranslation } from "react-i18next";

export default function Search() {
  const { t } = useTranslation();
  return (
    <a className="mt-4 flex items-center font-bold uppercase">
      <svg
        enableBackground="new 0 0 15 15"
        viewBox="0 0 15 15"
        x="0"
        y="0"
        className="mr-3 h-4 w-3 fill-current stroke-current"
      >
        <g>
          <polyline
            fill="none"
            points="5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
          ></polyline>
        </g>
      </svg>
      {t("aside.search")}
    </a>
  );
}

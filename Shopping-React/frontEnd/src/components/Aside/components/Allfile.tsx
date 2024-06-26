import { useTranslation } from "react-i18next";
export default function Allfile() {
  const { t } = useTranslation();
  return (
    <a className="flex items-center font-bold  ">
      <svg viewBox="0 0 12 10" className="mr-3 h-4 w-3 fill-current">
        <g fillRule="evenodd" stroke="none" strokeWidth="1">
          <g transform="translate(-373 -208)">
            <g transform="translate(155 191)">
              <g transform="translate(218 17)">
                <path d="m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z"></path>
                <path d="m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z"></path>
                <path d="m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
      <h3 className="text-custom-color text-xl font-normal  uppercase">
        {t("List")}
      </h3>
    </a>
  );
}

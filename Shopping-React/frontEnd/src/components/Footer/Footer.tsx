import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <div className="bg-neutral-100 py-5">
      <div className="mx-auto max-w-7xl space-y-10 px-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div>{t("footer.copyright")}</div>
          </div>
          <div className="lg:col-span-2">
            <div>{t("footer.countryRegion")}</div>
          </div>
        </div>
        <div className="text-center text-sm mt-10">
          <div>{t("footer.companyName")}</div>
          <div className="mt-2">{t("footer.address")}</div>
          <div className="mt-2">{t("footer.contentManager")}</div>
          <div className="mt-2">{t("footer.rightsReserved")}</div>
        </div>
      </div>
    </div>
  );
}

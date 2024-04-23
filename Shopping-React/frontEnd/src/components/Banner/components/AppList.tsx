import { useTranslation } from "react-i18next";

type Props = {
  src: string;
  name: string;
};

export default function AppList({ src, name }: Props) {
  const { t } = useTranslation();

  return (
    <a className="text-decoration-none text-center font-normal text-[1.3rem] flex flex-wrap justify-center bg-transparent">
      <div
        className="w-[45px] h-[45px] bg-cover"
        style={{
          backgroundImage: `url('${src}')`,
        }}
      ></div>
      <span className="text-center py-2.5 text-xs ">{t(`app.${name}`)}</span>
    </a>
  );
}

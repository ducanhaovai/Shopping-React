import { apps } from "./appData";
import AppList from "./AppList";

export default function BannerApp() {
  return (
    <ul className="pl-0 mt-8 flex list-none items-center justify-around">
      {apps.map((app, index) => (
        <li key={index} className="w-[100px] h-[90px]">
          <AppList src={app.src} name={app.name} />
        </li>
      ))}
    </ul>
  );
}

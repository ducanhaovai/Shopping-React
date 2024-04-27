import { apps } from "./appData";
import AppList from "./AppList";

export default function BannerApp() {
  return (
    <ul className="pl-0 mt-8 flex list-none items-center justify-around">
      {apps.map((app, index) => (
        <li
          key={index}
          className="w-24 h-24 transform transition-transform duration-200 hover:-translate-y-2.5"
        >
          <AppList src={app.src} name={app.name} />
        </li>
      ))}
    </ul>
  );
}

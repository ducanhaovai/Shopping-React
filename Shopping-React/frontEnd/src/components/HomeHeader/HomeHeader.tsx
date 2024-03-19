import Cart from "./components/Cart";
import Logo from "./components/Logo";
import Search from "./components/Search";
import UserLogin from "./components/UserLogin";

export default function HomeHeader() {
  return (
    <header className="bg-[linear-gradient(-180deg,#f53d2d,#f63)]">
      <div className="container">
        <UserLogin />
        <div className="grid w-full grid-cols-10 space-x-4 py-4">
          <Logo />
          <form className="col-span-7">
            <label className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Search
            </label>
            <Search />
          </form>
          <Cart />
        </div>
      </div>
    </header>
  );
}

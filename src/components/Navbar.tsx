import { appleImg, bagImg, searchImg } from "../utils";
import { navLists } from "../constants";

/** Top navigation bar with logo, nav links, and actions (tutorial: presentational component) */
function Navbar(): React.ReactElement {
  return (
    <header className="w-full min-h-[60px] py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width items-center">
        <span className="flex shrink-0 w-[14px] h-[18px] min-w-[14px] min-h-[18px] items-center justify-center">
          <img
            src={appleImg}
            alt="Apple"
            width={14}
            height={18}
            className="w-[14px] h-[18px] object-contain block"
            fetchPriority="high"
          />
        </span>

        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((nav) => (
            <div
              key={nav}
              className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-colors"
            >
              {nav}
            </div>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-7 max-sm:justify-end max-sm:flex-1 min-w-[52px]">
          <span className="flex w-[18px] h-[18px] min-w-[18px] min-h-[18px] items-center justify-center">
            <img
              src={searchImg}
              alt="search"
              width={18}
              height={18}
              className="w-[18px] h-[18px] object-contain block"
              fetchPriority="high"
            />
          </span>
          <span className="flex w-[18px] h-[18px] min-w-[18px] min-h-[18px] items-center justify-center">
            <img
              src={bagImg}
              alt="bag"
              width={18}
              height={18}
              className="w-[18px] h-[18px] object-contain block"
              fetchPriority="high"
            />
          </span>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

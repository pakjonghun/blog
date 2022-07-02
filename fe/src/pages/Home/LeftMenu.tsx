import React, { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Profile from "../../components/Profile";
import useToggleMenu from "../../hooks/useToggleMenu";
import {
  isLeftMenuHidingState,
  isLeftMenuShowState,
  memoryScrollState,
} from "../../recoil/home/atom";
import { joinStyleClass } from "../../utils/styleUtils";

const LeftMenu = () => {
  const [isShowMenu, setIsShowMenu] = useRecoilState(isLeftMenuShowState);
  const [isLeftMenuHiding, setIsLeftMenuHiding] = useRecoilState(
    isLeftMenuHidingState
  );
  const scrollTop = useRecoilValue(memoryScrollState);

  useEffect(() => {
    if (isShowMenu) {
      window.scrollTo({ top: 0 });
      document.body.style.overflow = "hidden";
    } else {
      window.scrollTo({ top: scrollTop });
      document.body.style.overflow = "auto";
    }
  }, [isShowMenu, scrollTop]);

  const onToggleMenu = useToggleMenu();

  const onAnimationEnd = useCallback(() => {
    if (isShowMenu && isLeftMenuHiding) {
      setIsShowMenu(false);
      setIsLeftMenuHiding(false);
    }
  }, [isShowMenu, isLeftMenuHiding, setIsShowMenu, setIsLeftMenuHiding]);

  return (
    <>
      {isShowMenu && (
        <>
          <div
            onClick={onToggleMenu}
            className='absolute top-0 left-0 h-full w-screen backdrop-blur-sm backdrop-brightness-50 z-30'
          />
          <div
            onAnimationEnd={onAnimationEnd}
            className={joinStyleClass(
              isLeftMenuHiding
                ? "animate-[leftMenuHide_100ms_linear]"
                : "animate-[leftMenuShow_100ms_linear]",
              "absolute left-0 top-0 pl-5 pr-10 pt-7 h-full w-fit bg-gray-800 origin-left z-40 rounded-r-md shadow-md sm:pr-24"
            )}
          >
            <button
              onClick={onToggleMenu}
              className='z-50 scale-sm transition-all duration-75 fill-gray-200 focus-menu-reverse mb-10'
            >
              <svg
                className='w-5 h-5'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 320 512'
              >
                <path d='M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z' />
              </svg>
            </button>
            <Profile size='sm' classes='z-40 pl-6' />
          </div>
        </>
      )}
    </>
  );
};

export default LeftMenu;

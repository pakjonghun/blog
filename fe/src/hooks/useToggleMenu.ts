import { useSetRecoilState } from "recoil";
import {
  isLeftMenuShowState,
  isLeftMenuHidingState,
} from "./../recoil/home/atom";
import { useRecoilState } from "recoil";
import { useCallback } from "react";
const useToggleMenu = () => {
  const [isMenuShow, setIsMenuShow] = useRecoilState(isLeftMenuShowState);
  const setIsMenuHiding = useSetRecoilState(isLeftMenuHidingState);

  const onToggleMenu = useCallback(() => {
    if (isMenuShow) setIsMenuHiding(true);

    setIsMenuShow((pre) => {
      if (pre) return pre;
      else return !pre;
    });
  }, [isMenuShow, setIsMenuShow, setIsMenuHiding]);

  return onToggleMenu;
};

export default useToggleMenu;

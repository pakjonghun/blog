import { useCallback } from "react";
import { useResetRecoilState } from "recoil";
import {
  postPageState,
  memoryScrollState,
  searchTermState,
  searchCategoryState,
} from "./../recoil/home/atom";

const useResetPostState = () => {
  const resetPage = useResetRecoilState(postPageState);
  const resetScroll = useResetRecoilState(memoryScrollState);
  const resetSearchTerm = useResetRecoilState(searchTermState);
  const resetSearchCategory = useResetRecoilState(searchCategoryState);

  const reset = useCallback(() => {
    resetPage();
    resetScroll();
    resetSearchTerm();
    resetSearchCategory();
  }, [resetPage, resetScroll, resetSearchCategory, resetSearchTerm]);

  return reset;
};

export default useResetPostState;

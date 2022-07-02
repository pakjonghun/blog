import React, { useCallback } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  postPageState,
  searchCategoryState,
  searchTermState,
  showNoResultMessageState,
} from "../../recoil/home/atom";
import { joinStyleClass } from "../../utils/styleUtils";

interface props {
  categoriyList: string[];
}

const Categories: React.FC<props> = ({ categoriyList }) => {
  const { search } = useLocation();
  const resetPage = useResetRecoilState(postPageState);
  const resetShowNoResutMessage = useResetRecoilState(showNoResultMessageState);
  const resetSearchTerm = useResetRecoilState(searchTermState);
  const [currentCategory, setCategory] = useRecoilState(searchCategoryState);

  const onCategoryClick = useCallback(
    (category: string) => {
      setCategory(category);
      resetPage();
      resetSearchTerm();
      resetShowNoResutMessage();
    },
    [setCategory, resetPage, resetSearchTerm, resetShowNoResutMessage]
  );

  return (
    <ul className='flex space-x-3 mx-auto w-fit font-medium text-sm mt-6'>
      {categoriyList.map((category) => (
        <li
          className={joinStyleClass(
            "first-letter:uppercase cursor-pointer hover:text-gray-600 active:text-gray-400 transition-all duration-75",
            currentCategory === category ? "text-gray-600" : "text-gray-400"
          )}
          key={category}
        >
          <button onClick={() => onCategoryClick(category)}>
            {category}
            <div
              className={joinStyleClass(
                currentCategory === category
                  ? "animate-[leftMenuShow_100ms_linear] w-[70%] bg-gray-600"
                  : "",
                "h-[3px] mt-1 origin-left"
              )}
            />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Categories;

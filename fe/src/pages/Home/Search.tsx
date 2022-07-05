import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import useResetPostState from "../../hooks/useResetRecoilState";
import { searchTermState } from "../../recoil/home/atom";

const Search = () => {
  const [term, setTerm] = useRecoilState(searchTermState);
  const [inputValue, setInputValue] = useState(term);

  const timer = useRef<NodeJS.Timer | null>(null);

  const reset = useResetPostState();
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setTerm(inputValue);
      timer.current = null;
    }, 300);

    return () => {
      if (!timer.current) return;
      clearTimeout(timer.current);
    };
  }, [inputValue, reset, setTerm]);

  useEffect(() => {
    if (term.trim() === "") {
      setInputValue("");
    }
  }, [term]);

  return (
    <form className='relative max-w-sm mx-auto text-gray-500 mt-10'>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        type='text'
        placeholder='Search'
        className='py-2 pl-8 pr-5 w-full rounded-md shadow-md bg-gray-50 text-sm placeholder:font-medium placeholder:text-gray-300 border-gray-300 focus:ring-[1px] ring-gray-300 border-[1px] focus:outline-none'
      />
      <div className='absolute inset-y-0 flex items-center px-2 fill-gray-300'>
        <svg
          className='h-5 w-5'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 512 512'
        >
          <path d='M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z' />
        </svg>
      </div>
    </form>
  );
};

export default Search;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useResetPostState from "../hooks/useResetRecoilState";
import useToggleMenu from "../hooks/useToggleMenu";

interface props {
  canBack?: boolean;
}

const Navigator: React.FC<props> = ({ canBack = false }) => {
  const onToggleMenu = useToggleMenu();
  const navigate = useNavigate();
  const reset = useResetPostState();

  return (
    <nav>
      {canBack ? (
        <div className='flex space-x-3'>
          <button
            onClick={() => navigate(-1)}
            className='scale-sm focus-menu transition-all duration-75'
          >
            <svg
              className='h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 256 512'
            >
              <path d='M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z' />
            </svg>
          </button>
        </div>
      ) : (
        <div className='flex space-x-3'>
          <button
            onClick={onToggleMenu}
            className='z-50 scale-sm focus-menu transition-all duration-75'
          >
            <svg
              className='h-5 w-5 text-gray-500'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 448 512'
            >
              <path d='M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z' />
            </svg>
          </button>
          <Link
            onClick={reset}
            className='scale-sm focus-menu transition-all duration-75'
            to='/'
          >
            <svg
              className='h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 576 512'
            >
              <path d='M575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6H511.8L512.5 447.7C512.5 450.5 512.3 453.1 512 455.8V472C512 494.1 494.1 512 472 512H456C454.9 512 453.8 511.1 452.7 511.9C451.3 511.1 449.9 512 448.5 512H392C369.9 512 352 494.1 352 472V384C352 366.3 337.7 352 320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5L575.8 255.5z' />
            </svg>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigator;

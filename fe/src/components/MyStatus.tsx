import React from "react";
import Avatar from "./Avatar";

export type Mood = "good" | "annoyed" | "embarassed" | "interesting";

interface props {
  mood: Mood;
  date: string;
}

const MyStatus: React.FC<props> = ({ mood, date }) => {
  const createdAt = getDiffFromToday(date);
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center space-x-3'>
        <Avatar size='xs' url={getImgUrl(mood)} />
        <span className='first-letter:uppercase font-medium text-xs text-gray-700'>
          {mood}
        </span>
      </div>
      <span className='text-[8px] text-gray-300'>
        {createdAt ? `${createdAt} days ago` : "몇 시간 전"}
      </span>
    </div>
  );
};

export default MyStatus;

function getImgUrl(mood: Mood) {
  switch (mood) {
    case "annoyed":
      return "https://imagedelivery.net/0ZP-N9B45ji28JoChYUvWw/0f8c24fd-2d05-4e78-c6ac-b66ec540df00/avatar";
    case "interesting":
      return "https://imagedelivery.net/0ZP-N9B45ji28JoChYUvWw/c8923389-783f-4bdf-578e-d38cfc823100/avatar";
    case "good":
      return "https://imagedelivery.net/0ZP-N9B45ji28JoChYUvWw/f0d1ff60-2d0e-46b6-9f9c-9698fcfeb700/avatar";
    case "embarassed":
      return "https://imagedelivery.net/0ZP-N9B45ji28JoChYUvWw/cd331cfc-9009-4012-362b-e43ab9b1b100/avatar";
    default:
      throw new Error("error on getImgUrl");
  }
}

function getDiffFromToday(date: string) {
  const then = new Date(date);
  const today = new Date(`${new Date().toLocaleDateString()} 00:00`);
  const diff = today.getTime() - then.getTime();

  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

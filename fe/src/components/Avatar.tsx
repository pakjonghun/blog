import React from "react";
import { joinStyleClass } from "../utils/styleUtils";

interface props {
  size?: "xs" | "sm";
  url: string;
}

const Avatar: React.FC<props> = ({ size = "sm", url }) => {
  return (
    <img
      src={url}
      alt='avatar'
      className={joinStyleClass(
        "rounded-full bg-slate-200 shadow-sm",
        size === "sm" ? "w-12 h-12" : "w-9 h-9"
      )}
    />
  );
};

export default Avatar;

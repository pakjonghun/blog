import { atom } from "recoil";

export const isLeftMenuShowState = atom({
  key: "leftMenuState",
  default: false,
});

export const isLeftMenuHidingState = atom({
  key: "isLeftMenuHidingState",
  default: false,
});

export const searchTermState = atom({
  key: "searchTermState",
  default: "",
});

export const searchCategoryState = atom({
  key: "searchCategoryState",
  default: "",
});

export const postPageState = atom({
  key: "postPageState",
  default: 1,
});

export const memoryScrollState = atom({
  key: "memoryScrollState",
  default: 0,
});

export const showNoResultMessageState = atom({
  key: "isNoResultMessageState",
  default: true,
});

import { UserNav } from "interfaces/user";
import { ICategory } from "interfaces/category";
import { atom } from "recoil";

export const SelectedCategory = atom<ICategory>({
  key: "SelectedCategory",
  default: { id: 0, name: "전체" },
});

export const SelectedUserNav = atom<UserNav>({
  key: "SelectedUserNav",
  default: "profile",
});

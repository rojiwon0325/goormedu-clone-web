import { ICategory } from "interfaces/category";
import React, { Suspense, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { SelectedCategory } from "states/client";
import { useCategories } from "states/server/category";

const CategoryNav: React.FC<{ top?: boolean }> = ({ top = false }) => {
  const [visible, setVisible] = useState(!top);
  return (
    <div
      className={`p-4 ${
        top ? "flex md:hidden" : "hidden md:flex"
      } flex-col items-start rounded-lg shadow-md relative`}
    >
      <button
        className={`w-full text-left font-NanumSquareRoundBold text-lg whitespace-nowrap`}
        onClick={() => setVisible((pre) => !pre)}
      >
        카테고리
      </button>

      <div
        className={`${
          visible ? "max-h-screen" : "max-h-0"
        } w-full flex flex-col items-start text-base overflow-hidden transition-all`}
      >
        <Suspense>
          <Categories />
        </Suspense>
      </div>
    </div>
  );
};

export default CategoryNav;

const Categories: React.FC = React.memo(() => {
  const { data: categoriesData } = useCategories();
  const selected = useRecoilValue(SelectedCategory);
  if (categoriesData?.data.ok) {
    return (
      <>
        <CategoryItem
          key="category-0"
          category={{ id: 0, name: "전체" }}
          selected={selected.id === 0}
        />
        {categoriesData.data.result.map((category) => (
          <CategoryItem
            key={`category-${category.id}`}
            category={category}
            selected={category.id === selected.id}
          />
        ))}
      </>
    );
  } else {
    return null;
  }
});

const CategoryItem: React.FC<{ category: ICategory; selected: boolean }> = ({
  category,
  selected,
}) => {
  const select = useSetRecoilState(SelectedCategory);
  return (
    <button
      className={`w-full py-1 px-2 rounded-lg ${
        selected ? "bg-skyblue text-blue" : "bg-white text-black"
      } hover:bg-skyblue hover:text-blue`}
      onClick={() => select(category)}
    >
      {category.name}
    </button>
  );
};

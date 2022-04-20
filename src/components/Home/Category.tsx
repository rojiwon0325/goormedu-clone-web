import React from "react";
import CategoryContent from "./CategoryContent";
import CategoryNav from "./CategoryNav";

const Category = () => {
  return (
    <div className="max-w py-5 flex">
      <div>
        <CategoryNav />
      </div>
      <div className="flex-1">
        <CategoryContent />
      </div>
    </div>
  );
};

export default Category;

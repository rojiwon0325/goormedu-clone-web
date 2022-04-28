import React, { Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCoursesBySearch } from "states/server/course";
import CourseList from "./CourseList";
import CourseListSkeleton from "./CourseListSkeleton";

const Search: React.FC = () => {
  const { search } = useLocation();
  const [query, setQuery] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(search).get("query");
    setQuery(params);
  }, [search]);

  return (
    <div className="max-w py-5 flex">
      <div className="p-4 hidden md:flex flex-col items-start rounded-lg shadow-md">
        <div className="w-full text-left font-NanumSquareRoundBold text-lg whitespace-nowrap">
          카테고리
        </div>
      </div>
      <div className="flex-1 md:pl-4">
        <div className="border-gray86 border-b font-NanumSquareRoundBold">
          검색어 {query}
        </div>
        <div className="w-full">
          <Suspense fallback={<CourseListSkeleton />}>
            <div className="w-full animate-fade-in">
              <SearchWrap query={query} />
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Search;

const SearchWrap: React.FC<{ query: string | null }> = ({ query }) => {
  const { data } = useCoursesBySearch(query);
  if (data?.data.ok) {
    return <CourseList courses={data.data.result} key={`search-${query}`} />;
  }
  return null; // suspense
};

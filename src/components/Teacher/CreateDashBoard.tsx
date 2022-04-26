import React, { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCategories } from "states/server/category";
import { useCourseCreate } from "states/server/course";

interface IForm {
  title: string;
  description: string;
  level: number;
  cover_image: File[];
  category_id: number;
}

const CreateDashBoard: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    clearErrors,
  } = useForm<IForm>({ mode: "onSubmit" });
  const [coverImage, setImage] = useState("");
  const fileReader = new FileReader();
  const titleRegister = register("title");
  const coverImgRegister = register("cover_image");
  const levelRegister = register("level", {
    valueAsNumber: true,
    min: 1,
    max: 5,
  });
  const categoryRegister = register("category_id", { valueAsNumber: true });
  const descriptionRegister = register("description");

  const { mutate, isLoading } = useCourseCreate();

  const onSubmit = handleSubmit(({ cover_image, ...rest }) => {
    const body = new FormData();
    for (const [key, val] of Object.entries(rest)) body.append(key, val + "");
    body.append("cover_image", cover_image[0]);
    if (!isLoading) {
      mutate(body, {
        onSuccess: ({ data }) =>
          data.ok ? navigate("/users") : alert(data.error),
        onError: (error) => alert(error),
      });
    }
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_, err] of Object.entries(errors)) {
      if (err) {
        alert(err);
        clearErrors();
      }
    }
  }, [errors, clearErrors]);

  return (
    <div className="w-full p-4">
      <div className="hwfull p-4 flex flex-col border-gray122 border-4 rounded-lg">
        <div className="pb-3 border-gray122 border-b text-xl font-NanumSquareRoundBold">
          새 코스 생성
        </div>
        <div className="pt-4">
          <form onSubmit={onSubmit} className="w-96 md:w-full flex-none">
            <input
              {...titleRegister}
              onChange={(e) => {
                clearErrors();
                titleRegister.onChange(e);
              }}
              placeholder="코스명"
              className="w-full py-2 px-3 mb-2 placeholder:text-darkgray bg-gray229 rounded-lg"
            />
            <div className="w-full py-2 flex">
              <div
                className="w-1/2 aspect-video bg-black bg-cover bg-center"
                style={{ backgroundImage: `url(${coverImage})` }}
              />
              <div className="w-1/2 px-4">
                <label
                  htmlFor="cover"
                  className="w-36 py-2 px-3 block rounded-lg text-center font-NanumSquareRoundBold bg-blue text-white shadow-md cursor-pointer"
                >
                  커버 이미지 생성
                </label>
              </div>
              <input
                {...coverImgRegister}
                onChange={(e) => {
                  clearErrors();
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    coverImgRegister.onChange(e);
                    fileReader.readAsDataURL(files[0]);
                    fileReader.onload = () =>
                      setImage(fileReader.result?.toString() ?? "");
                  }
                }}
                id="cover"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="w-full py-2 flex">
              <div className="w-1/4 py-1 text-center bg-gray229 font-NanumSquareRoundBold">
                level
              </div>
              <input
                {...levelRegister}
                placeholder="level"
                type="number"
                defaultValue={1}
                min="1"
                max="5"
                className="w-1/4 border-gray229 border text-center"
              />
              <div className="w-1/4 py-1 text-center bg-gray229 font-NanumSquareRoundBold">
                카테고리
              </div>
              <select
                className="w-1/4 border-gray229 border text-center"
                {...categoryRegister}
              >
                <Suspense>
                  <Categories />
                </Suspense>
              </select>
            </div>
            <textarea
              {...descriptionRegister}
              placeholder="코스 소개"
              className="w-full p-2 my-2 placeholder:text-darkgray border-gray229 border-4 rounded-lg"
            />
            <div className="w-full flex-center">
              <button
                type="submit"
                className={`w-1/2 py-2 bg-blue rounded-lg ${
                  !isValid || isLoading ? "opacity-50" : "opacity-100"
                } text-white font-NanumSquareRoundBold`}
                disabled={!isValid || isLoading}
              >
                저장
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDashBoard;

const Categories = () => {
  const { data: categoriesData } = useCategories();
  if (categoriesData?.data.ok) {
    return (
      <>
        {categoriesData.data.result.map((category) => (
          <option key={`category-${category.id}`} value={category.id}>
            {category.name}
          </option>
        ))}
      </>
    );
  } else {
    return null;
  }
};

import React, { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useChapters,
  useLectureDelete,
  useLectureDetail,
  useLectureUpdate,
} from "states/server/course";

const LectureDashBoard: React.FC = () => {
  const { course_id, lecture_id } = useParams();
  if (course_id && lecture_id) {
    return (
      <div className="w-full px-4">
        <Suspense>
          <Content
            courseId={parseInt(course_id)}
            lectureId={parseInt(lecture_id)}
          />
        </Suspense>
      </div>
    );
  } else {
    return null;
  }
};

export default LectureDashBoard;

interface IForm {
  title: string;
  chapter_id: number;
  content?: string;
  is_public?: boolean;
  video_url: File[];
  video_exist: boolean;
  content_exist: boolean;
}

const Content: React.FC<{ courseId: number; lectureId: number }> = ({
  courseId,
  lectureId,
}) => {
  const navigate = useNavigate();
  const { data: lectureData } = useLectureDetail(courseId, lectureId);
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    clearErrors,
    setValue,
  } = useForm<IForm>({ mode: "onSubmit" });
  const [videoUrl, setUrl] = useState("");
  const fileReader = new FileReader();
  const titleRegister = register("title");
  const videoRegister = register("video_url");
  const contentRegister = register("content");
  const publicRegister = register("is_public");
  const chapterRegister = register("chapter_id", { valueAsNumber: true });
  const contentExistRegister = register("content_exist");
  const videoExistRegister = register("video_exist");

  const { mutate: updateMutate, isLoading: updateLoading } = useLectureUpdate(
    courseId,
    lectureId
  );
  const { mutate: deleteMutate, isLoading: deleteLoading } = useLectureDelete(
    courseId,
    lectureId
  );

  const onSubmit = handleSubmit(({ video_url, title, content, ...rest }) => {
    const body = new FormData();
    if (!title || title.length === 0) {
      alert("강의 제목은 필수 입니다.");
      return;
    }
    body.append("title", title);
    for (const [key, val] of Object.entries(rest)) body.append(key, val + "");
    if (content) body.append("content", content);
    if (video_url[0]) body.append("lecture_video", video_url[0]);
    if (updateLoading || deleteLoading) {
      alert("잠시만 기다려주세요.");
    } else {
      updateMutate(body);
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

  useEffect(() => {
    if (lectureData?.data.ok) {
      if (lectureData.data.result.video_url) setValue("video_exist", true);
      if (lectureData.data.result.content) setValue("content_exist", true);
      setValue("title", lectureData.data.result.title);
      setValue("content", lectureData.data.result.content);
      setValue("is_public", lectureData.data.result.is_public);
      setValue("chapter_id", lectureData.data.result.chapter_id);
    }
  }, [lectureData, setValue]);

  if (lectureData?.data.ok) {
    return (
      <div className="p-4 border-gray122 border-4">
        <form onSubmit={onSubmit} className="w-full flex flex-col">
          <input
            {...titleRegister}
            placeholder="강의명"
            className="w-full py-2 px-3 mb-2 placeholder:text-darkgray bg-gray229 rounded-lg"
          />
          <div className="w-full py-2 flex items-center">
            <label htmlFor="video_exist" className="px-2">
              해당 강의가 비디오를 포함합니다.
            </label>
            <input {...videoExistRegister} id="video_exist" type="checkbox" />
          </div>
          <div className="w-full py-2 flex items-center">
            <label htmlFor="content_exist" className="px-2">
              해당 강의가 강의 내용을 포함합니다.
            </label>
            <input
              {...contentExistRegister}
              id="content_exist"
              type="checkbox"
            />
          </div>
          <div className="w-full py-2 flex items-center">
            <label htmlFor="is_public" className="px-2">
              해당 강의가 미리보기로 제공됩니다.
            </label>
            <input {...publicRegister} id="is_public" type="checkbox" />
          </div>
          <div className="w-full px-2 flex">
            <div className="p-2 pl-0 flex">챕터 선택:</div>
            <select
              className="p-2 flex-1 text-left border-gray122 border rounded-lg"
              {...chapterRegister}
            >
              <Chapters courseId={courseId} />
            </select>
          </div>
          <div className="w-full py-2 flex">
            <video src={videoUrl} className="w-1/2" controls />
            <div className="w-1/2 px-4">
              <label
                htmlFor="video"
                className="w-36 py-2 px-3 block rounded-lg text-center font-NanumSquareRoundBold bg-blue text-white shadow-md cursor-pointer"
              >
                비디오 변경
              </label>
            </div>
            <input
              {...videoRegister}
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  videoRegister.onChange(e);
                  fileReader.readAsDataURL(files[0]);
                  fileReader.onload = () =>
                    setUrl(fileReader.result?.toString() ?? "");
                }
              }}
              id="video"
              type="file"
              accept="video/*"
              className="hidden"
            />
          </div>
          <textarea
            {...contentRegister}
            placeholder="강의 내용"
            className="w-full p-2 my-2 placeholder:text-darkgray border-gray229 border-4 rounded-lg"
          />
          <div className="w-full flex-center">
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-blue text-white font-NanumSquareRoundBold rounded-lg shadow-md"
              disabled={!isValid || updateLoading || deleteLoading}
            >
              변경
            </button>
            <div className="w-4" />
            <button
              type="button"
              onClick={() =>
                deleteMutate(undefined, {
                  onSuccess: (data) => {
                    if (data.data.ok) {
                      navigate(`/teacher/${courseId}`);
                    }
                  },
                })
              }
              className="flex-1 py-2 px-4 bg-gray229 text-black font-NanumSquareRoundBold rounded-lg shadow-md"
              disabled={!isValid || updateLoading || deleteLoading}
            >
              삭제
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return null;
  }
};

const Chapters: React.FC<{ courseId: number }> = ({ courseId }) => {
  const { data } = useChapters(courseId);
  if (data?.data.ok) {
    return (
      <>
        {data.data.result.map((chapter) => (
          <option key={`option-${chapter.id}`} value={chapter.id}>
            {chapter.title}
          </option>
        ))}
      </>
    );
  } else {
    return null;
  }
};

export interface ICourse {
  id: number;
  title: string;
  description: string;
  level: number;
  cover_image: string;
  teacher_id: number;
  category_id: number;
}
export interface ICourseDetail extends ICourse {
  created_at: Date;
  updated_at: Date;
}

export interface CreateCourse {
  title: string;
  description: string;
  cover_image: File;
  category_id: number;
  level: number;
}

export interface IChapter {
  id: number;
  course_id: number;
  teacher_id: number;
  title: string;
  order: number;
}

export interface IChapterDetail extends IChapter {
  created_at: Date;
  updated_at: Date;
}
export interface UpdateChapter {
  title: string;
}

export interface ILecture {
  id: number;
  title: string;
  course_id: number;
  teacher_id: number;
  chapter_id: number;
  order: number;
  is_public: boolean;
}

export interface ILectureDetail extends ILecture {
  video_url?: string;
  content?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateLecture {
  title: string;
  chapter_id: number;
}

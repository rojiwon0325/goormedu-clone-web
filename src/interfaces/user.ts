export type IUserRole = "Student" | "Teacher" | "Admin";
export type UserNav = "profile" | "my-learnings" | "my-offerings";

export const UserRole = {
  Student: "학생",
  Teacher: "교육자",
  Admin: "관리자",
  Unknown: "알 수 없음",
};

export interface IUserPublic {
  id: number;
  username: string;
  role: IUserRole;
}

export interface IUserDetail extends IUserPublic {
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface ILearnRecord {
  id: number;
  course_id: number;
  student_id: number;
  last_learning_data?: Date;
  last_lecture_id?: number;
  count_completion_record: number;
}

export interface ILearnRecordDetail extends ILearnRecord {
  created_at: Date;
  updated_at: Date;
}

export interface ITeacherRecord {
  id: number;
  user_id: number;
  career: string;
  accepted: boolean;
}

export interface CreateTeacherRecord {
  career: string;
}

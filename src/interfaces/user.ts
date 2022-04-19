export type IUserRole = "Student" | "Teacher" | "Admin";

export const UserRole = {
  Student: "학생",
  Teacher: "교육자",
  Admin: "관리자",
  Unknown: "알 수 없음",
};

interface QuerySuccess<T> {
  ok: true;
  result: T;
}

interface QueryFailure {
  ok: false;
  error: string;
}

export interface QueryResult<T> {
  data: QuerySuccess<T> | QueryFailure;
}

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

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

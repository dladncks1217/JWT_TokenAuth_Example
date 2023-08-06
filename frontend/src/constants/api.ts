// export const BASE_URL = "http://practice123.p-e.kr:8081";
export const BASE_URL = "http://127.0.0.1:8080";

export const HTTP_STATUS_CODE = {
  BAD_REQUEST: 400,
  NO_AUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const END_POINTS = {
  JOIN: "/auth/join",
  LOGIN: "/auth/login",
  REISSUANCE: "/auth/reissuance",
  GET_USER: "/getuser",
  GET_NUMBER: "/getnumber",
} as const;

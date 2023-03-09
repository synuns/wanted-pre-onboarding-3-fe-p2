import { BASE_URL } from './const';
import {
  getAccessTokenFromLocalStorage,
  saveAccessTokenToLocalStorage,
} from '../utils/accessTokenHandler';
import { UserInfo } from '../types/user';

type LoginResult = 'success' | 'fail';

export type LoginResultWithToken =
  | {
      result: 'success';
      access_token: string;
    }
  | {
      result: 'fail';
      access_token: null;
    };

export interface LoginRequest {
  username: string;
  password: string;
}

/*********
 *  실습 2-1
 * */

export const loginWithToken = async (
  args: LoginRequest
): Promise<LoginResultWithToken> => {
  // TODO(2-1): 로그인 API 호출 및 토큰 반환하기
  // POST, `${ BASE_URL }/auth/login`을 호출하세요.
  // API Spec은 강의 자료를 참고하세요.
  // access_token 발급에 성공한 경우에는 { result: 'success', access_token: string } 형태의 값을 반환하세요.
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  };

  const loginRes = await fetch(`${BASE_URL}/auth/login`, option);

  if (loginRes.ok) {
    const loginResData = await loginRes.json();

    return {
      result: 'success',
      access_token: loginResData.access_token as string,
    };
  }

  return {
    result: 'fail',
    access_token: null as null,
  };
};

export const getCurrentUserInfoWithToken = async (
  token: string
): Promise<UserInfo | null> => {
  // TODO(2-1): 함수에서 토큰을 직접 주입받아 사용하기
  // GET, `${ BASE_URL }/profile`을 호출하세요.
  // argument로 전달받은 token을 Authorization header에 Bearer token으로 넣어주세요.
  // API Spec은 강의 자료를 참고하세요.
  // 유저 정보 조회에 성공한 경우에는 UserInfo 타입의 값을 반환하세요.
  const userInfoRes = await fetch(`${BASE_URL}/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (userInfoRes.ok) {
    return userInfoRes.json() as Promise<UserInfo>;
  }

  return null;
};

/*********
 *  실습 2-2
 * */

export const login = async (args: LoginRequest): Promise<LoginResult> => {
  // TODO(2-2): 로그인 API 호출 및 access token 로컬스토리지에 저장하기
  // POST, `${ BASE_URL }/auth/login`을 호출하세요.
  // API Spec은 강의 자료를 참고하세요.
  // access_token 발급에 성공한 경우에는 saveAccessTokenToLocalStorage 함수를 호출하여 access_token을 localStorage에 저장하고 'success'를 반환하세요.
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  };

  const loginRes = await fetch(`${BASE_URL}/auth/login`, option);

  if (loginRes.ok) {
    const loginResData = await loginRes.json();
    saveAccessTokenToLocalStorage(loginResData.access_token);
    return 'success';
  }

  return 'fail';
};

export const getCurrentUserInfo = async (): Promise<UserInfo | null> => {
  // TODO(2-2): 로컬스토리지에서 토큰을 가져와 사용하기
  // GET, `${ BASE_URL }/profile`을 호출하세요.
  // 로컬 스토리지에 있는 token을 getAccessTokenFromLocalStorage로 가져와서 Authorization header에 Bearer token으로 넣어주세요.
  // API Spec은 강의 자료를 참고하세요.
  // 유저 정보 조회에 성공한 경우에는 UserInfo 타입의 값을 반환하세요.
  const userInfoRes = await fetch(`${BASE_URL}/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
    },
  });

  if (userInfoRes.ok) {
    return userInfoRes.json() as Promise<UserInfo>;
  }

  return null;
};

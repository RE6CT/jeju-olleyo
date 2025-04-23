'use server';

import dayjs from 'dayjs';
import { revalidatePath } from 'next/cache';

import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants/mypage.constants';
import { PATH } from '@/constants/path.constants';
import { ERROR_CODES } from '@/constants/supabase.constant';
import { getServerClient } from '@/lib/supabase/server';

import { fetchGetCurrentUser } from '../auth/auth-server.api';
import { QueryClient } from '@tanstack/react-query';
import { USER_QUERY_KEY } from '@/lib/queries/auth-queries';

/**
 * 유저의 닉네임을 업데이트하는 서버 액션 함수
 * @param userId - 유저의 uuid
 * @param nickname - 새 닉네임
 */
export const fetchUpdateNickname = async (userId: string, nickname: string) => {
  try {
    const supabase = await getServerClient();

    if (!userId) throw new Error(ERROR_MESSAGES.USER_DATA_MISSING);
    if (!nickname) throw new Error(ERROR_MESSAGES.NICKNAME_DATA_MISSING);

    const { error } = await supabase
      .from('users')
      .update({ nickname })
      .eq('user_id', userId);

    if (error) {
      if (error.code === ERROR_CODES.UNIQUE_VIOLATION) {
        throw new Error(ERROR_MESSAGES.NICKNAME_DUPLICATE);
      } else {
        throw new Error(error.message);
      }
    }

    revalidatePath(PATH.ACCOUNT);

    // 클라이언트측 TanStack Query 캐시 무효화 추가 코드
    if (typeof window !== 'undefined') {
      // window 객체에 저장해둔 queryClient 사용
      // 또는 useUpdateNickname 훅을 만들어 queryClient.invalidateQueries 사용
      const queryClient = new QueryClient();
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    }

    return { success: true, message: SUCCESS_MESSAGES.NICKNAME_UPDATED };
  } catch (error: unknown) {
    // 에러 메시지 없을 경우의 디폴트 메시지
    let errorMessage = ERROR_MESSAGES.NICKNAME_UPDATE_FAILED;

    // 에러 객체라면 해당 에러 메시지를 적용
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

/**
 * 프로필 이미지를 변경하는 함수
 * @param formData 프로필 이미지 변경 핸들러로부터 전달된 폼 데이터 (userId, profileImage)
 */
export const fetchUpdateProfileImage = async (formData: FormData) => {
  try {
    const supabase = await getServerClient();

    const file = formData.get('profileImage') as File;
    const userId = formData.get('userId') as string;

    if (!userId) throw new Error(ERROR_MESSAGES.USER_DATA_MISSING);
    if (!file) {
      throw new Error(ERROR_MESSAGES.IMAGE_DATA_MISSING);
    }

    // 확장자 추출 및 이름 지정
    const fileExtension = file.name.split('.').pop();
    const fileName = `${userId}/profile_${dayjs().valueOf()}.${fileExtension}`;

    // Supabase Storage에 이미지 업로드
    const { error: imageUploadError } = await supabase.storage
      .from('profile-images')
      .upload(fileName, file);

    if (imageUploadError) {
      throw new Error(ERROR_MESSAGES.PROFILE_UPDATE_FAILED);
    }

    // URL 생성
    const { data: urlData } = supabase.storage
      .from('profile-images')
      .getPublicUrl(fileName);

    // 유저 테이블에 이미지 저장
    const { error: dataUpdateError } = await supabase
      .from('users')
      .update({
        profile_img: urlData.publicUrl,
      })
      .eq('user_id', userId);

    if (dataUpdateError) {
      throw new Error(ERROR_MESSAGES.USER_UPDATE_FAILED);
    }

    revalidatePath(PATH.ACCOUNT);
    return {
      success: true,
      message: SUCCESS_MESSAGES.PROFILE_UPDATED,
    };
  } catch (error: unknown) {
    // 에러 메시지 없을 경우의 디폴트 메시지
    let errorMessage = ERROR_MESSAGES.PROFILE_UPDATE_FAILED;

    // 에러 객체라면 해당 에러 메시지를 적용
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

/**
 * 유저의 프로필 이미지를 초기화하는 함수
 * @param userId 유저의 uuid
 */
export const fetchDeleteProfileImage = async (
  userId: string,
  profileImage: string,
) => {
  try {
    const supabase = await getServerClient();

    if (!userId) throw new Error(ERROR_MESSAGES.USER_DATA_MISSING);
    if (!profileImage) throw new Error(ERROR_MESSAGES.IMAGE_DATA_MISSING);

    // 유저의 프로필 이미지 모두 삭제
    const imagePath = profileImage.split('/').pop();
    const { error: imageDeleteError } = await supabase.storage
      .from('profile-images')
      .remove([`${userId}/${imagePath}`]);

    if (imageDeleteError) {
      throw new Error(ERROR_MESSAGES.PROFILE_UPDATE_FAILED);
    }

    // 유저 테이블의 프로필 이미지 빈 문자열로 업데이트
    const { error: dataUpdateError } = await supabase
      .from('users')
      .update({
        profile_img: '',
      })
      .eq('user_id', userId);

    if (dataUpdateError) {
      throw new Error(ERROR_MESSAGES.USER_UPDATE_FAILED);
    }

    revalidatePath(PATH.ACCOUNT);
    return {
      success: true,
      message: SUCCESS_MESSAGES.PROFILE_UPDATED,
    };
  } catch (error: unknown) {
    // 에러 메시지 없을 경우의 디폴트 메시지
    let errorMessage = ERROR_MESSAGES.PROFILE_UPDATE_FAILED;

    // 에러 객체라면 해당 에러 메시지를 적용
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

/**
 * 유저의 휴대폰 번호를 업데이트하는 서버 액션 함수
 * @param userId - 유저의 uuid
 * @param phone - 새 휴대폰 번호
 */
export const fetchUpdatePhoneByUserId = async (
  userId: string,
  phone: string,
) => {
  try {
    const supabase = await getServerClient();

    if (!userId) throw new Error(ERROR_MESSAGES.USER_DATA_MISSING);
    if (!phone) throw new Error(ERROR_MESSAGES.PHONE_DATA_MISSING);

    const { error } = await supabase
      .from('users')
      .update({ phone })
      .eq('user_id', userId);

    if (error) {
      if (error.code === ERROR_CODES.UNIQUE_VIOLATION) {
        throw new Error(ERROR_MESSAGES.PHONE_DUPLICATE);
      } else {
        throw new Error(error.message);
      }
    }

    revalidatePath(PATH.ACCOUNT);
    return { success: true, message: SUCCESS_MESSAGES.PHONE_UPDATED };
  } catch (error: unknown) {
    // 에러 메시지 없을 경우의 디폴트 메시지
    let errorMessage = ERROR_MESSAGES.PHONE_UPDATE_FAILED;

    // 에러 객체라면 해당 에러 메시지를 적용
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

/**
 * 비밀번호 변경 함수
 * @param oldPassword - 현재 비밀번호
 * @param newPassword - 새로운 비밀번호
 */
export const fetchUpdatePassword = async (
  oldPassword: string,
  newPassword: string,
) => {
  try {
    const supabase = await getServerClient();

    // 유저 정보 가져오기
    const user = await fetchGetCurrentUser();
    if (!user.user || !user.user.email)
      throw new Error(ERROR_MESSAGES.USER_DATA_MISSING);

    // 현재 비밀번호 검증
    const { error: passwordCheckError } =
      await supabase.auth.signInWithPassword({
        email: user.user.email,
        password: oldPassword,
      });

    if (passwordCheckError) throw new Error(ERROR_MESSAGES.PASSWORD_INVALID);

    // 비밀번호 업데이트
    const { error: passwordUpdateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (passwordUpdateError) throw new Error(passwordUpdateError.message);

    revalidatePath(PATH.ACCOUNT);
    return { success: true, message: SUCCESS_MESSAGES.PASSWORD_UPDATED };
  } catch (error: unknown) {
    let errorMessage = ERROR_MESSAGES.PASSWORD_UPDATE_FAILED;

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

'use server';

import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants/mypage.constants';
import { PATH } from '@/constants/path.constants';
import { ERROR_CODES } from '@/constants/supabase.constant';
import { getServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

/**
 * 유저의 닉네임을 업데이트하는 서버 액션 함수
 * @param userId - 유저의 uuid
 * @param nickname - 새 닉네임
 */
export const fetchUpdateNickname = async (userId: string, nickname: string) => {
  try {
    const supabase = await getServerClient();

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

    if (!file) {
      throw new Error(ERROR_MESSAGES.IMAGE_DATA_MISSING);
    }

    // 확장자 추출 및 이름 지정
    const fileExtension = file.name.split('.').pop();
    const fileName = `${userId}/profile_${Date.now()}.${fileExtension}`;

    // Supabase Storage에 이미지 업로드
    const { error: imageUploadError } = await supabase.storage
      .from('profile-images')
      .upload(fileName, file);

    if (imageUploadError) {
      console.log(imageUploadError.message);
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

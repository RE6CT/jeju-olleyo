'use server';

import { getServerClient } from '@/lib/supabase/server';
import { camelize } from '@/lib/utils/camelize';
import { isDateInRange } from '@/lib/utils/date';
import { CommunitySortType } from '@/types/community.type';
import { LocationData } from '@/types/kakao-map.type';
import { DayPlaces } from '@/types/plan-detail.type';
import { Plan, PlanFilterOptions, PlanWithDays } from '@/types/plan.type';

/**
 * 사용자의 일정 목록을 가져오는 API
 * @param userId - 사용자 ID
 * @returns Promise<Plan[]> - 일정 목록
 */
export const fetchGetAllPlansByUserId = async (
  userId: string,
): Promise<Plan[] | null> => {
  const supabase = await getServerClient();

  const { data, error } = await supabase.rpc('get_user_plans', {
    user_id_param: userId,
  });

  if (error) {
    throw new Error('일정 목록을 불러오는데 실패했습니다.');
  }

  return data.map(camelize); // snake_case -> camelCase
};

/**
 * 필터 옵션에 따라 사용자의 일정을 필터링하여 가져오는 API
 * @param userId - 사용자 ID
 * @param filterOptions - 필터링 옵션
 * @returns Promise<Plan[]> - 필터링된 일정 목록
 *
 * @example
 * ```typescript
 * const filteredPlans = await getFilteredPlans(userId, {
 *   title: '제주도',
 *   startDate: '2024-03-01',
 *   endDate: '2024-03-31',
 *   isPublic: true
 * });
 * ```
 */
export const fetchGetFilteredPlansByUserId = async (
  userId: string,
  filterOptions: PlanFilterOptions,
) => {
  const supabase = await getServerClient();
  let query = supabase.rpc('get_user_plans', {
    user_id_param: userId,
  });

  if (filterOptions.keyword) {
    query = query.or(`title.ilike.%${filterOptions.keyword}%`);
  }
  if (filterOptions.isPublic !== undefined) {
    query = query.eq('public', filterOptions.isPublic);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    throw new Error('일정 필터링에 실패했습니다.');
  }

  // 날짜 필터링은 클라이언트 측에서 처리
  let filteredDataByDate = data;
  if (filterOptions.date) {
    // UTC 기준으로 날짜를 비교하도록 수정
    const targetDate = new Date(filterOptions.date);
    const utcTargetDate = new Date(
      Date.UTC(
        targetDate.getFullYear(),
        targetDate.getMonth(),
        targetDate.getDate(),
      ),
    );

    filteredDataByDate = filteredDataByDate.filter((plan) => {
      const startDate = new Date(plan.travel_start_date);
      const endDate = new Date(plan.travel_end_date);

      const utcStartDate = new Date(
        Date.UTC(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
        ),
      );
      const utcEndDate = new Date(
        Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()),
      );

      return utcTargetDate >= utcStartDate && utcTargetDate <= utcEndDate;
    });
  }

  return filteredDataByDate.map(camelize);
};

/**
 * 일정을 삭제하는 API
 * @param planId - 삭제할 일정의 ID
 *
 * @example
 * ```typescript
 * const { mutate: deletePlan } = useDeletePlan();
 * deletePlan(planId);
 * ```
 */
export const fetchDeletePlan = async (planId: number) => {
  const supabase = await getServerClient();

  const { error } = await supabase.from('plans').delete().eq('plan_id', planId);

  if (error) {
    throw new Error('일정 삭제에 실패했습니다.');
  }
};

/**
 * 전체 일정을 가져오는 함수
 * @param userId - 사용자의 userId
 * @param limit - 개수 제한
 * @param sortOption - 정렬 옵션
 * @returns 좋아요 여부가 포함된 전체 일정 목록
 */
export const fetchGetAllPlans = async (
  userId: string | null = null,
  sortOption: CommunitySortType = 'popular',
  page: number = 1,
  pageSize: number = 12,
) => {
  const supabase = await getServerClient();

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize - 1;

  const query = supabase
    .rpc('get_plans', {
      user_id_param: userId,
      sort_option: sortOption,
    })
    .range(startIndex, endIndex);

  const { data, error: dataError } = await query;
  const { count, error: CountError } = await supabase
    .from('plans')
    .select('*', { count: 'exact' })
    .eq('public', true);

  if (dataError) throw new Error(dataError.message);
  if (CountError) throw new Error(CountError.message);

  return {
    data: data.map(camelize),
    totalPage: Math.ceil((count ?? 1) / pageSize),
  };
};

/**
 * 일정을 저장하는 API
 * @param plan - 저장할 일정 데이터
 * @returns Promise<number> - 저장된 일정의 ID
 */
export const fetchSavePlan = async (
  plan: Omit<
    Plan,
    'planId' | 'nickname' | 'createdAt' | 'publicAt' | 'isLiked'
  >,
): Promise<number> => {
  const supabase = await getServerClient();

  try {
    const { data, error } = await supabase
      .from('plans')
      .insert({
        user_id: plan.userId,
        title: plan.title,
        description: plan.description,
        travel_start_date: plan.travelStartDate,
        travel_end_date: plan.travelEndDate,
        plan_img: plan.planImg,
        public: plan.public,
      })
      .select('plan_id')
      .single();

    if (error) {
      console.error('일정 저장 실패 - Supabase 에러:', error);
      throw new Error(`일정 저장에 실패했습니다. ${error.message}`);
    }

    if (!data || !data.plan_id) {
      console.error('일정 ID가 없음:', data);
      throw new Error('일정 ID를 가져오는데 실패했습니다.');
    }

    return data.plan_id;
  } catch (error) {
    console.error('일정 저장 중 예외 발생:', error);
    throw error;
  }
};

/**
 * 일정의 상세 장소들을 저장하는 API
 * @param planId - 일정 ID
 * @param dayPlaces - 일자별 장소 데이터
 */
export const fetchSavePlanPlaces = async (
  planId: number,
  dayPlaces: DayPlaces,
): Promise<void> => {
  const supabase = await getServerClient();

  try {
    // plan_id 유효성 검사
    const { data: planData, error: planError } = await supabase
      .from('plans')
      .select('plan_id')
      .eq('plan_id', planId)
      .single();

    if (planError || !planData) {
      throw new Error(`유효하지 않은 plan_id입니다: ${planId}`);
    }

    // 1. days 테이블에 일자 데이터 삽입
    const daysToInsert = Object.keys(dayPlaces).map((day) => ({
      plan_id: planId,
      day: parseInt(day),
    }));

    //console.log('daysToInsert:', daysToInsert);

    const { data: daysData, error: daysError } = await supabase
      .from('days')
      .insert(daysToInsert)
      .select('day_id, day');

    if (daysError) {
      console.error('days 테이블 삽입 에러:', daysError);
      throw new Error(`일정 일자 저장에 실패했습니다: ${daysError.message}`);
    }

    if (!daysData || daysData.length === 0) {
      console.error('days 데이터가 없음');
      throw new Error('일정 일자 데이터가 없습니다.');
    }

    //console.log('daysData:', daysData);

    // 2. locations 테이블에 장소 데이터 삽입
    const locationsToInsert = daysData.flatMap((dayData) => {
      const day = dayData.day;
      if (typeof day !== 'number') {
        console.error('유효하지 않은 day 값:', day);
        return [];
      }

      const places = dayPlaces[day] || [];
      if (places.length === 0) {
        return [];
      }

      return places
        .filter((place) => {
          if (!place.id) {
            console.error('장소 ID가 없음:', place);
            return false;
          }
          return true;
        })
        .map((place, index) => ({
          day_id: dayData.day_id,
          place_id: place.placeId,
          visit_order: index + 1,
        }));
    });

    //console.log('locationsToInsert:', locationsToInsert);

    if (locationsToInsert.length === 0) {
      return;
    }

    // 장소 ID의 유효성을 검사
    const placeIds = locationsToInsert.map((location) => location.place_id);
    //console.log('검사할 장소 ID들:', placeIds);

    const { data: existingPlaces, error: placesError } = await supabase
      .from('places')
      .select('place_id')
      .in('place_id', placeIds);

    if (placesError) {
      console.error('장소 ID 검증 에러:', placesError);
      throw new Error(`장소 ID 검증에 실패했습니다: ${placesError.message}`);
    }

    //console.log('존재하는 장소 ID들:', existingPlaces);

    const existingPlaceIds = new Set(
      existingPlaces?.map((p) => p.place_id) || [],
    );
    const invalidPlaceIds = placeIds.filter((id) => !existingPlaceIds.has(id));

    if (invalidPlaceIds.length > 0) {
      console.error('유효하지 않은 장소 ID:', invalidPlaceIds);
      throw new Error(
        `다음 장소 ID가 places 테이블에 존재하지 않습니다: ${invalidPlaceIds.join(', ')}`,
      );
    }

    // locations 테이블에 데이터 삽입
    const { error: locationsError } = await supabase
      .from('locations')
      .insert(locationsToInsert)
      .select();

    if (locationsError) {
      console.error('locations 테이블 삽입 에러:', locationsError);
      console.error('삽입 시도한 데이터:', locationsToInsert);
      throw new Error(
        `일정 장소 저장에 실패했습니다: ${locationsError.message}`,
      );
    }
  } catch (error) {
    console.error('fetchSavePlanPlaces 전체 에러:', error);
    if (error instanceof Error) {
      throw new Error(`일정 장소 저장에 실패했습니다: ${error.message}`);
    } else {
      throw new Error(
        '일정 장소 저장에 실패했습니다: 알 수 없는 에러가 발생했습니다.',
      );
    }
  }
};

/**
 * 파일 이름을 영어로 변환하고 특수문자를 제거하는 함수
 * @param fileName - 원본 파일 이름
 * @returns 변환된 파일 이름
 */
const sanitizeFileName = (fileName: string): string => {
  // 확장자 추출
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  // 파일 이름에서 확장자 제거
  const nameWithoutExtension = fileName.slice(0, -(extension.length + 1));
  // 파일 이름을 영어로 변환하고 특수문자 제거
  const sanitizedName = nameWithoutExtension
    .replace(/[^a-zA-Z0-9]/g, '_') // 영문자와 숫자가 아닌 모든 문자를 언더스코어로 변환
    .toLowerCase();
  // 타임스탬프 추가
  return `${Date.now()}_${sanitizedName}.${extension}`;
};

/**
 * 이미지를 Supabase Storage에 업로드하는 API
 * @param formData - FormData 객체 (file 필드 포함)
 * @returns Promise<string> - 업로드된 이미지의 URL
 */
export const fetchUploadPlanImage = async (
  formData: FormData,
): Promise<string> => {
  const supabase = await getServerClient();

  const file = formData.get('file') as File;
  const planId = formData.get('planId') as string;

  if (!file) {
    throw new Error('파일이 없습니다.');
  }

  const planIdRaw = formData.get('planId');
  if (typeof planIdRaw !== 'string') {
    throw new Error('일정 ID가 없습니다.');
  }
  const planIdNum = Number(planIdRaw);
  if (!Number.isInteger(planIdNum) || planIdNum <= 0) {
    throw new Error('유효하지 않은 일정 ID입니다.');
  }

  // 현재 사용자 정보 가져오기
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error('인증된 사용자만 이미지를 업로드할 수 있습니다.');
  }

  // 파일 이름 정리
  const sanitizedFileName = sanitizeFileName(file.name);
  // 사용자별 폴더 경로 생성
  const filePath = `${user.id}/plan-images/${sanitizedFileName}`;

  const { error: uploadError } = await supabase.storage
    .from('plan-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`이미지 업로드에 실패했습니다: ${uploadError.message}`);
  }

  // 업로드된 이미지의 공개 URL 가져오기
  const {
    data: { publicUrl },
  } = supabase.storage.from('plan-images').getPublicUrl(filePath);

  // 데이터베이스에 이미지 URL 업데이트
  const { error: updateError } = await supabase
    .from('plans')
    .update({ plan_img: publicUrl })
    .eq('plan_id', parseInt(planId))
    .eq('user_id', user.id);

  if (updateError) {
    throw new Error(
      `이미지 URL 업데이트에 실패했습니다: ${updateError.message}`,
    );
  }

  return publicUrl;
};

export const fetchGetPlanById = async (
  planId: number,
): Promise<PlanWithDays> => {
  const supabase = await getServerClient();

  // 1. 기본 plan 정보와 user 정보 가져오기
  const { data: planData, error: planError } = await supabase
    .from('plans')
    .select(`*, users:user_id (nickname)`)
    .eq('plan_id', planId)
    .single();

  if (planError || !planData) {
    throw new Error('일정 정보를 불러오는데 실패했습니다.');
  }

  // 2. days 테이블에서 plan_id에 해당하는 모든 day 정보 가져오기
  const { data: daysData, error: daysError } = await supabase
    .from('days')
    .select('day_id, day')
    .eq('plan_id', planId)
    .order('day', { ascending: true });

  if (daysError || !daysData) {
    throw new Error('일정의 날짜 정보를 불러오는데 실패했습니다.');
  }

  // 3. 각 day에 대한 locations 정보 가져오기
  const transformedDays = [];

  for (const day of daysData) {
    const { data: locationsData, error: locationsError } = await supabase
      .from('locations')
      .select(
        `
        visit_order,
        places!locations_place_id_fkey (
          id,
          address,
          place_id,
          content_type_id,
          image,
          lng,
          lat,
          title,
          category
        )
      `,
      )
      .eq('day_id', day.day_id)
      .order('visit_order', { ascending: true });

    if (locationsError) {
      console.error('Location error details:', locationsError);
      throw new Error(
        `장소 정보를 불러오는데 실패했습니다: ${locationsError.message}`,
      );
    }

    if (!locationsData) continue;

    transformedDays.push({
      dayId: day.day_id,
      day: day.day || 0,
      locations: locationsData.map((location: LocationData) => ({
        visitOrder: location.visit_order || 0,
        places: {
          placeId: location.places.place_id,
          name: location.places.title,
          address: location.places.address,
          latitude: location.places.lat,
          longitude: location.places.lng,
          category: location.places.category,
          imageUrl: location.places.image,
        },
      })),
    });
  }

  return {
    planId: planData.plan_id,
    userId: planData.user_id,
    title: planData.title,
    description: planData.description,
    travelStartDate: planData.travel_start_date,
    travelEndDate: planData.travel_end_date,
    planImg: planData.plan_img,
    public: planData.public,
    createdAt: planData.created_at,
    publicAt: planData.public_at,
    nickname: planData.users.nickname,
    isLiked: false,
    days: transformedDays,
  };
};

export const fetchGetPlanDaysAndLocations = async (
  planId: number,
): Promise<DayPlaces> => {
  const supabase = await getServerClient();

  // 1. days 테이블에서 plan_id에 해당하는 모든 day 정보 가져오기
  const { data: daysData, error: daysError } = await supabase
    .from('days')
    .select('day_id, day')
    .eq('plan_id', planId)
    .order('day', { ascending: true });

  if (daysError) {
    throw new Error('일정의 날짜 정보를 가져오는데 실패했습니다.');
  }

  // 2. 각 day에 대한 locations 정보 가져오기
  const dayPlaces: DayPlaces = {};
  let totalIndex = 0;

  for (const day of daysData) {
    if (day.day === null) continue; // day가 null인 경우 건너뛰기

    const { data: locationsData, error: locationsError } = await supabase
      .from('locations')
      .select(
        `
        visit_order,
        places!locations_place_id_fkey (
          id,
          address,
          place_id,
          content_type_id,
          image,
          lng,
          lat,
          title,
          category
        )
      `,
      )
      .eq('day_id', day.day_id)
      .order('visit_order', { ascending: true });

    if (locationsError) {
      console.error('Location error details:', locationsError);
      throw new Error(
        `장소 정보를 불러오는데 실패했습니다: ${locationsError.message}`,
      );
    }

    if (!locationsData) continue;

    // DayPlaces 타입에 맞게 변환
    dayPlaces[day.day] = locationsData.map((location) => {
      const place = location.places as {
        place_id: number;
        title: string;
        address: string;
        category: string;
        image: string | null;
        lat: number;
        lng: number;
      }; // 명시적 타입 정의
      const uniqueId = `${place.place_id}-${totalIndex++}`; // 전체 dayPlaces 기준으로 index 생성
      return {
        id: place.place_id,
        placeId: place.place_id,
        title: place.title,
        address: place.address,
        category: place.category,
        contentTypeId: 0, // 기본값 설정
        image: place.image,
        lat: place.lat,
        lng: place.lng,
        uniqueId,
      };
    });
  }

  return dayPlaces;
};

/**
 * 일정을 업데이트하는 API
 * @param plan - 업데이트할 일정 데이터
 * @param userId - 사용자 ID
 * @returns Promise<Plan> - 업데이트된 일정
 */
export const fetchUpdatePlan = async (
  plan: Plan,
  userId: string,
): Promise<Plan> => {
  const supabase = await getServerClient();

  const { data, error } = await supabase
    .from('plans')
    .update({
      title: plan.title,
      description: plan.description,
      plan_img: plan.planImg,
      public: plan.public,
      travel_start_date: plan.travelStartDate,
      travel_end_date: plan.travelEndDate,
    })
    .eq('plan_id', plan.planId)
    .eq('user_id', userId)
    .select(
      `
      *,
      users:user_id (
        nickname
      )
    `,
    )
    .single();

  if (error) {
    throw new Error('일정 업데이트에 실패했습니다.');
  }

  const camelizedData = camelize(data);
  return {
    ...camelizedData,
    nickname: data.users.nickname,
    isLiked: plan.isLiked, // 기존 plan의 isLiked 값 유지
  };
};

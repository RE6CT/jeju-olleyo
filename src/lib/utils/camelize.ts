import { CamelCaseObject } from '@/types/common.type';

/**
 * 스네이크 케이스 문자열을 카멜 케이스로 변환하는 유틸 함수
 *
 * @param str - 변환할 스네이크 케이스 문자열
 * @returns 카멜 케이스로 변환된 문자열
 */
export const toCamelCase = (str: string): string =>
  str.replace(/_([a-z])/g, (_, char: string) => char.toUpperCase());

/**
 * 객체의 모든 키를 스네이크 케이스에서 카멜 케이스로 재귀적으로 변환하는 함수
 * 배열, 중첩 객체 등을 모두 처리합니다.
 *
 * @template T - 입력 객체의 타입
 * @param obj - 변환할 객체, 배열 또는 원시값
 * @returns 모든 키가 카멜 케이스로 변환된 객체
 *
 * @example
 * camelize({ user_id: 1, created_at: '2023-01-01', nested_obj: { prop_name: 'value' } })
 */
export const camelize = <T>(obj: T): CamelCaseObject<T> => {
  if (obj === null || obj === undefined) {
    return obj as unknown as CamelCaseObject<T>;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => camelize(item)) as unknown as CamelCaseObject<T>;
  }

  if (typeof obj !== 'object') {
    return obj as CamelCaseObject<T>;
  }

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = toCamelCase(key);
    if (typeof value === 'object' && value !== null) {
      result[newKey] = camelize(value);
    } else {
      result[newKey] = value;
    }
  }

  return result as CamelCaseObject<T>;
};

/** 문자열을 카멜 케이스로 변환하는 타입 */
type CamelCase<S extends string> = S extends `${infer P}_${infer Q}`
  ? `${P}${Capitalize<CamelCase<Q>>}`
  : S;

/** 객체의 모든 키를 카멜 케이스로 변환하는 타입 */
export type CamelCaseObject<T> =
  T extends Array<infer U>
    ? Array<CamelCaseObject<U>>
    : T extends object
      ? {
          [K in keyof T as CamelCase<
            K extends string ? K : never
          >]: CamelCaseObject<T[K]>;
        }
      : T;

// 프로필 이미지 컴포넌트 props 타입
export type ProfileImageProps = {
  image: string | null;
  width?: number;
  height?: number;
  className?: string;
};

// 장소 이미지 컴포넌트 props 타입
export type PlaceImageProps = {
  image: string | null;
  title: string;
  className?: string;
  isPriority?: boolean;
};

// 날짜 기간 표시 컴포넌트의 props
export type DurationProps = {
  start: string;
  end: string;
  separator: string;
  className?: string;
  showShortYear?: boolean;
};

// 제주 여행 배너 컴포넌트 props
export type JejuBannerProps = {
  imageUrl: string;
  title: string;
  buttonText: string;
  buttonUrl: string;
};

export type List = {
  value: string;
  label: string;
}[];

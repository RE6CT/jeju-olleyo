## 📢 프로젝트 소개

Jeju Olleyo (제주 올레요)는 제주도 여행 일정을 쉽고 빠르게 계획하고, 다른 사람과 공유할 수 있는 웹 서비스입니다.<br />
일정 저장, 지도 제공, 북마크 및 좋아요 기능 등을 제공하여 사용자가 직접 만든 여행 플랜을 기록하고 공유 할 수 있습니다.<br />
사용자는 관심 있는 장소를 검색하고, 해당 장소가 포함된 공개 일정을 확인 할 수 있습니다.
<br />

## 📍 배포 링크

[제주 올레요](https://jeju-olleyo.vercel.app/)

<br />

## 📅 프로젝트 기간

- **2025.04.01 ~ 2025.04.30**

<br />

## [프로젝트 계기]

- 해외여행 수요 증가로 국내여행 수요가 급감하는 상황에서 제주도의 관광 활성화를 돕기 위해 제주에 특화된 여행 플랫폼을 기획하게 되었습니다.
- 여행 정보를 찾고 저장하는 과정을 간소화하여 한눈에 제주 여행 일정을 설계할 수 있는 서비스를 만들고자 했습니다.
- 공공 데이터 API 등을 활용해 신뢰도 높은 관광 정보를 제공하고자 하였습니다.
- 여행 일정을 공유하는 커뮤니티를 제공하여 더 많은 사람들이 다시 제주를 찾도록 유도하고자 하였습니다.
  <br />

## 💏멤버 소개

<table>
  <tbody>
    <tr>
      <td width="300px" align="center">
        <a href="https://github.com/joyounghyun550">
        <img src="https://avatars.githubusercontent.com/u/192574613?v=4" width="80" alt="YounghyunJo"/>
        <br />
        <sub><b>조영현</b></sub>
        </a>
        <br />
      </td>
         <td width="300px" align="center">
        <a href="https://github.com/Eletsia">
        <img src="https://avatars.githubusercontent.com/u/166839043?v=4" width="80" alt="Jeonghyun Min"/>
        <br />
        <sub><b>민정현</b></sub>
        </a>
        <br />
      </td>
      <td width="300px" align="center">
        <a href="https://github.com/PureunKang">
        <img src="https://avatars.githubusercontent.com/u/144876018?v=4" width="80" alt="Pureun Kang"/>
        <br />
        <sub><b>강푸른</b></sub>
        </a>
        <br />
      </td>
    </tr>
    <tr>
      <td align="center">
        <b>인증시스템 설계 및 구현, 메인페이지</b> <br/>
      </td>
      <td align="center">
        <b>DB 설계, 항공권 조회 및 예약 페이지</b> <br/>
      </td>
      <td align="center">
        <b>검색바, 검색 결과, 장소 상세 페이지</b> <br/>
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/sohxxny">
        <img src="https://avatars.githubusercontent.com/u/119118662?v=4" width="80" alt="Soheun Lee"/>
        <br />
        <sub><b>이소흔</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        <a href="https://github.com/mbdyjk">
        <img src="https://avatars.githubusercontent.com/u/129130338?v=4" width="80" alt="YongjunKo"/>
        <br />
        <sub><b>고용준</b></sub>
        </a>
        <br />
      </td>
    </tr>
    <tr>
      <td align="center">
        <b>마이페이지, 커뮤니티, 카테고리 페이지</b> <br/>
      </td>
      <td align="center">
        <b>내 일정 페이지, 일정 생성/수정/조회 페이지</b> <br/>
      </td>
      <td align="center">
    </tr>
  </tbody>
</table>

<br />

## 🛠 **기술스택**

### 📌 **프로그래밍 언어 및 프레임워크**

- **TypeScript**
- **Next.js**

### 🎨 **UI 프레임워크 및 스타일링**

- **Tailwind CSS**
- **Shadcn/ui**
- **Framer Motion**
- **Embla Carousel**
- **React DatePicker**
- **Hello Pangea DND**

### 🔍 **데이터 검증**

- **Zod:** 런타임 데이터 검증 및 TypeScript 타입 안전성 확보

### ✅ **코드 품질 및 포맷팅**

- **ESLint**
- **Prettier**

### 🗄️ **백엔드 및 데이터베이스**

- **Supabase (PostgreSQL 기반)**
  - **데이터베이스:** 장소 / 일정 정보 등 관리
  - **인증:** 사용자 로그인 및 회원가입 관리
  - **Storage:** 파일 업로드 관리

### 🗃️ **상태 관리 및 데이터 패칭**

- **Zustand:** 클라이언트 상태 관리
- **TanStack Query:** 서버 상태 관리 및 데이터 패칭
- **React Hook Form:** 폼 상태와 입력 검증 효율화

### 🗃️ **버전 관리**

- **Git/GitHub**

### 🚀 **배포**

- **Vercel**

<br />

## 📝 **주요 기능**

### 📆 일정 생성 및 공유

- 사용자는 일정 생성 페이지를 통해 일정의 제목, 설명, 여행 기간, 대표 이미지를 설정할 수 있습니다.
- 특정 날짜의 장소들을 **복사, 삭제**할 수 있는 편의 기능을 제공합니다.
- 화면 사이드에 **장소 검색, 내가 북마크한 장소**를 제공하여 검색 후 장소를 추가하거나 북마크한 장소를 일정에 추가할 수 있습니다.
- 일정 저장 시 공개/비공개 여부를 선택하여 공개한 일정은 **커뮤니티**에 개시할 수 있습니다.

### 📍 장소 정보 제공 및 검색

- 장소 이름 및 주소 기반으로 검색 할 수 있습니다.
- 특정 키워드 검색없이 카테고리를 통해 제주도 내 **명소, 맛집, 카페, 숙박** 장소를 확인 할 수 있습니다.

### 🛫 항공권 검색

- 인원, 좌석 등급, 출발지, 일정을 입력하여 왕복 항공권을 검색 할 수 있습니다.
- 가는 편, 오는 편 항공기를 선택하여 항공기를 예약합니다.

### 🪪 마이페이지

- 프로필 사진, 닉네임, 연락처 등의 사용자 계정 정보를 확인하고 수정할 수 있습니다.
- **예약한 항공권, 북마크한 장소, 좋아요한 일정, 저장한 일정**을 확인할 수 있습니다.

<br />

## 📁 **프로젝트 구조**

```
├──📁api #라우트핸들러 모음
├──📁app #앱라우터 기반 페이지 라우팅
├── 📁components
│ ├── 📁commons # 재사용 가능한 공통 컴포넌트
│ ├── 📁features # 특정 기능 내에서 재사용 가능한 공통 컴포넌트
│ ├── 📁icons # 아이콘 컴포넌트
│ ├── 📁layouts # 레이아웃 공통 컴포넌트
│ └── 📁ui # shadcn/ui 모음
├──📁config #인증/인가 프로바이더 및 탠스텍쿼리 프로바이더
├──📁constants #상수화 모음
├──📁data #홈 페이지 내 캐러셀 이미지 제이슨 파일
├── 📁lib
│ ├── 📁apis #수파베이스 함수 모음
│ ├── 📁hooks #커스텀훅 모음
│ ├── 📁mutations #TanStack Query Mutation 관련 설정
│ ├── 📁queries #TanStack Query 관련 설정
│ ├── 📁schemas #스키마 모음
│ ├── 📁supabase #수파베이스 서버/클라이언트 컴포넌트 설정 모음
│ └── 📁utils #유틸 함수 모음
├── 📁types #타입 정의
└── 📁zustand #zustand store 모음
```

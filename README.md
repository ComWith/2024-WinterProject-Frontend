# 2024-WinterProject-Frontend

# (웹서비스 이름)
> **인천대학교 정보통신공학과 프로그래밍 소모임 ComWith** <br/> **개발기간: 2024.12.28 ~

## 배포 주소
> **개발 버전** : [http://...](http://...) <br>
> **프론트 서버** : [http://...](http://...)<br>
> **백엔드 서버** : [http://...](http://...)<br>

## 개발자 소개
|      김경재       |          박병욱         |       전민경         |                                                                                                               
| :------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | 
|   <img width="160px" src="이미지 주소" />    |                      <img width="160px" src="이미지 주소" />    |                   <img width="160px" src="이미지 주소"/>   |
|   [@silly0302](https://github.com/silly0302)   |    [@Rockernun](https://github.com/Rockernun)  | [@jeon1105](https://github.com/jeon1105)  |
| 인천대학교 정보통신공학과 | 인천대학교 정보통신공학과 | 인천대학교 정보통신공학과 |

## 프로젝트 소개

(웹서비스 이름)는 연주하고 싶은 곡의 악보가 없을 때, 누구나 쉽게 해당 음악의 악보를 얻을 수 있도록 한다. 악보를 찾거나 제작하는 데 들이는 시간과 비용을 절약하고, 음악 연주에 더 집중할 수 있는 환경을 제공한다.

## 시작 가이드
### Requirements
For building and running the application you need:
(예시)
- [Node.js 14.19.3](https://nodejs.org/ca/blog/release/v14.19.3/)
- [Npm 9.2.0](https://www.npmjs.com/package/npm/v/9.2.0)
- [Strapi 3.6.6](https://www.npmjs.com/package/strapi/v/3.6.6)

## Stacks 🪄

### Environment
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)

### Config
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

### Development
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

### Communication
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)

## 화면 구성 📺
| 메인 페이지  |  OO 페이지   |
| :-------------------------------------------: | :------------: |
|  <img width="329" src="이미지 주소"/> |  <img width="329" src="이미지 주소"/>|  
| OO 페이지   |  OO 페이지   |  
| <img width="329" src="이미지 주소"/>   |  <img width="329" src="이미지 주소"/>     |

## 주요 기능 🔥
### ⭐️ 업로드한 음악 파일을 자동으로 악보로 변환
- AI Music Analysis API | Klangio를 이용하여 음악 파일을 원하는 악보 형식으로 변경한다.

&nbsp;

### ⭐️ 무슨 악기의 악보를 원하는지 선택
- AI Music Analysis API | Klangio를 이용하여 악보로 변환할 때 사용자가 원하는 악기 선택 가능

&nbsp;

### ⭐️ 난이도 단계별 악보 표출
**a. 초급**
- 목표: 초보자도 쉽게 따라 할 수 있는 간단한 멜로디 제공
- 기준:
    1. 단순 멜로디: 곡의 주 멜로디만 추출. 화음(코드)나 복잡한 리듬은 생략
    2. 기본 코드: 멜로디와 함께 간단한 코드명 표시
    - 이유: 초급자는 화음 연주 대신 멜로디를 치는 데 집중하거나, 코드만 알아도 반주 가능
 
**b. 중급**

- 목표: 연주자의 표현력을 높이고, 음악적 이해를 확장.
- 기준:
    1. 코드 추가: 멜로디와 함께 코드 진행을 악보에 포함
    2. 리듬 추가: 원곡의 리듬감을 표현할 수 있도록 리듬 표기 추가
    3. 장식음: 꾸밈음, 이음줄 등을 추가해 악보를 풍부하게 구성
    - 이유: 중급자는 단순한 멜로디만 연주하기엔 지루할 수 있고, 리듬과 장식음은 더 자연스러운 연주로 이어짐
 
**c. 고급**

- 목표: 원곡에 최대한 가까운 연주를 위한 상세 정보 제공.
- 기준:
    1. 세부 화음: 코드뿐 아니라 화음의 세부 구성음까지 악보에 표시
    2. 복잡한 리듬: 빠른 음표, 복합 박자, 다이내믹 마크 등을 포함
    3. 연주 기법: 트릴, 글리산도, 스트로크, 핑거링 등 연주 기법 추가
    - 이유: 숙련자는 곡의 원곡 느낌을 살리는 디테일한 표현에 관심이 많음


## 아키텍쳐

### 디렉토리 구조

<!--
```bash
├── README.md : 리드미 파일
│
├── strapi-backend/ : 백엔드
│   ├── api/ : db model, api 관련 정보 폴더
│   │   └── [table 이름] : database table 별로 분리되는 api 폴더 (table 구조, 해당 table 관련 api 정보 저장)
│   │       ├── Config/routes.json : api 설정 파일 (api request에 따른 handler 지정)
│   │       ├── Controllers/ [table 이름].js : api controller 커스텀 파일
│   │       ├── Models : db model 관련 정보 폴더
│   │       │   ├── [table 이름].js : (사용 X) api 커스텀 파일
│   │       │   └── [table 이름].settings.json : model 정보 파일 (field 정보)
│   │       └─── Services/ course.js : (사용 X) api 커스텀 파일
│   │ 
│   ├── config/ : 서버, 데이터베이스 관련 정보 폴더
│   │   ├── Env/production : 배포 환경(NODE_ENV = production) 일 때 설정 정보 폴더
│   │   │   └── database.js : production 환경에서 database 설정 파일
│   │   ├── Functions : 프로젝트에서 실행되는 함수 관련 정보 폴더
│   │   │   │   ├── responses : (사용 X) 커스텀한 응답 저장 폴더
│   │   │   │   ├── bootstrap.js : 어플리케이션 시작 시 실행되는 코드 파일
│   │   │   │   └── cron.js : (사용 X) cron task 관련 파일
│   │   ├── database.js : 기본 개발 환경(NODE_ENV = development)에서 database 설정 파일
│   │   └── server.js : 서버 설정 정보 파일
│   │  
│   ├── extensions/
│   │   └── users-permissions/config/ : 권한 정보
│   │ 
│   └── public/
│       └── uploads/ : 강의 별 사진
│
└── voluntain-app/ : 프론트엔드
    ├── components/
    │   ├── NavigationBar.js : 네비게이션 바 컴포넌트, _app.js에서 공통으로 전체 페이지에 포함됨.
    │   ├── MainBanner.js : 메인 페이지에 있는 남색 배너 컴포넌트, 커뮤니티 이름과 슬로건을 포함.
    │   ├── RecentLecture.js : 사용자가 시청 정보(쿠키)에 따라, 현재/다음 강의를 나타내는 컴포넌트 [호출: MainCookieCard]
    │   ├── MainCookieCard.js : 상위 RecentLecture 컴포넌트에서 전달받은 props를 나타내는 레이아웃 컴포넌트.
    │   ├── MainCard.js : 현재 등록된 course 정보를 백엔드에서 받아서 카드로 나타내는 컴포넌트 [호출: CourseCard]
    │   └── CourseCard.js : 상위 MainCard 컴포넌트에서 전달받은 props를 나타내는 레이아웃 컴포넌트
    │
    ├── config/
    │   └── next.config.js
    │
    ├── lib/
    │   └── ga/
    │   │   └── index.js
    │   └── context.js
    │
    ├── pages/
    │   ├── courses/
    │   │   └── [id].js : 강의 페이지
    │   ├── _app.js : Next.js에서 전체 컴포넌트 구조를 결정, 공통 컴포넌트(navbar, footer)가 선언되도록 customizing 됨.
    │   ├── _document.js : Next.js에서 전체 html 문서의 구조를 결정, lang 속성과 meta tag가 customizing 됨.
    │   ├── about.js : 단체 소개 페이지
    │   ├── index.js : 메인 페이지
    │   ├── question.js : Q&A 페이지
    │   └── setting.js : 쿠키, 구글 애널리틱스 정보 수집 정책 페이지
    │
    ├── public/
    │   ├── favicon.ico : 네비게이션바 이미지
    │   └── logo_about.png : about 페이지 로고 이미지
    │
    └── styles/
        └── Home.module.css

```
-->


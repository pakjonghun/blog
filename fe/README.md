## 개요

- til 블로그 프론트 서버입니다.
- 역할
  - til 블로그 검색을 통해 결과를 출력합니다.
  - 무한스크롤 을 통해 스크롤로 포스트를 끊김없이 확인합니다.
  - 각각 포스트 세부사항을 요청해서 출력합니다.

## 사용 기술

- react : component page 단위 모듈화를 쉽게 하기 위함
- tailwind,
  - 스타일링을 빠르게 작성하기 위함
  - 애니메이션 및 조건별 스타일링을 쉽게 작성하기 위함
- markdown-it
  - markdown 파일의 날짜, 카테고리 정보를 분류 관리하기 위함

## 성과

- virtualize 기능 의 훅 별도 구현 : 보이는 컴포넌트만 랜더링, 보이지 않거나 로딩중일 경우 스켈레톤 ui 출력
- 컴포넌트 마운트 언마운트시 animation이 각각 실행되도록 작성(onAnimationEnd 활용)
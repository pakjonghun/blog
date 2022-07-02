## 개요

- til 블로그 백엔드 서버입니다.
- 역할
  - 마크다운 블로그 파일을 관리합니다.
  - 마크다운 파일을 pagnation 을 적용하여 프론트 서버에 제공합니다.
  - 마크다운 파일을 필터 하여 요청한 파일의 내용을 프론트 서버에 제공합니다.

## 사용 기술

- nestjs
  - 프로젝트 구조에 대한 고민 없이 빠르게 작성하기 위함
  - 서비스 프로바이더 분류를 익스프레스 보다 비교적 쉽게 하여 관리하기 위함
  - class-validator 을 적용하여 쉽게 유효성 검사를 위함
- gray-matter
  - markdown 파일의 날짜, 카테고리 정보를 분류 관리하기 위함

## 구조

- 모듈 : appModule
- 서비스 : cache, appService
- api : getPosts, getPost

## 성과

- 별도의 캐쉬 클레스 구현
- 마크다운 파일 관리를 통한 데이터 관리(gray-matter)
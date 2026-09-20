# 향후 yangmalkr_cms 연결 계약

`yangmalkr`는 공개 웹사이트, `yangmalkr_cms`는 추후 만들 별도 관리 프로젝트입니다. 이 문서는 연결 경계만 정의하며 API 서버나 DB는 구현하지 않습니다.

## 읽기 경계

웹사이트의 모든 페이지는 `ContentRepository.getPublishedContent(): Promise<SiteContent>`를 통해 콘텐츠를 받습니다. 현재 구현은 로컬 seed입니다. CMS를 붙일 때 이 adapter만 원격 fetch로 교체합니다. 콘텐츠 조회용 인증이 필요하면 서버 측 환경 변수로 처리하고, 클라이언트에 쓰기 토큰을 전달하지 않습니다.

예상 공개 API: `GET /api/public/site-content`, JSON 스키마 버전 1. 실제 API 경로와 인증 방식은 CMS 구현 시 확정합니다. 실행 가능한 API나 작동 중인 연결로 오해하지 않도록 아직 환경 변수 스위치를 제공하지 않습니다.

## 데이터

정확한 TypeScript 계약은 `lib/content/types.ts`입니다.

- `categories`: 고정 ID, URL slug, 한/영 이름·소개, 대표 미디어, 정렬 순서.
- `products`: 고정 ID, categoryId 참조, URL slug, 한/영 상품명·설명·특징, 가격·할인가·배송비, 구매 URL, 공개 상태, 판매 상태, 추천 여부, 정렬 순서, 이미지 배열.
- `home`: 한/영 제목·설명, 히어로와 브랜드 이미지. 향후 필요할 때 한정된 페이지 섹션 블록으로 확장.
- `settings`: 스마트스토어·이메일·전화·주소 등 사이트 공통 정보.
- `Media`: 고정 ID, nullable URL, 한/영 alt, filler 라벨과 색상, contain/cover, 0~1 범위의 초점 좌표.

공개 상태 `draft | published | archived`와 판매 상태 `available | coming-soon | sold-out`를 분리합니다. 대표 이미지는 images[0]이며, 관리 화면에서 재정렬할 수 있도록 각 이미지에도 ID를 둡니다. 카테고리 순서가 바뀌어도 번역과 상품 연결은 ID 기준으로 유지됩니다.

## CMS 구현 시 필요한 규칙

1. 서버에서 데이터 스키마, 가격의 유효 범위, slug 중복, 참조 무결성, HTTPS 구매 URL, 미디어 URL과 접근 권한을 검증.
2. draft 저장과 publish를 분리하고 공개 조회는 published만 반환. 로그인된 미리보기 요청만 초안 접근 가능.
3. 제거는 archived/게시 취소부터 지원. 영구 삭제 전 사용 중인 배너·상품·미디어 참조 확인. slug 변경 시 이전 URL 리디렉션 관리.
4. 미디어는 외부 object storage/CDN에 저장. 업로드 형식·용량 검증과 이미지 크기별 변환, 삭제된 파일의 참조 검사 구현.
5. 게시 시 웹사이트 캐시를 무효화하거나 짧은 유효기간으로 재조회. 초안 미리보기 구독과 공개 방문자 갱신 정책은 분리.
6. MCP와 관리자 화면은 동일한 서버 규칙을 사용. 변경 이력과 version 충돌 감지, 복구 구현.

## 현재 지원 범위

데이터와 화면의 분리, 고정 ID, 다국어 콘텐츠, 공개 상태 필터, 상품별 구매 상태, 실패 시 filler, 재사용 가능한 페이지 컴포넌트까지만 구현되어 있습니다. 인증, 업로드, 데이터 변경, 게시 버튼, 실시간 미리보기는 향후 CMS 작업입니다.

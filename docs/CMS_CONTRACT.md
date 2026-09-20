# yangmalkr_cms 연결 계약

공개 웹사이트는 `yangmalkr`, 각 담당자 PC의 관리 프로그램은 형제 프로젝트 `yangmalkr_cms`입니다. CMS는 Supabase Auth 계정으로 로그인하여 DB 공개본과 Storage 이미지를 게시합니다. 방문자 사이트에 쓰기 권한을 전달하지 않습니다.

## 데이터와 공유 스키마

- 타입: `lib/content/types.ts`
- 런타임 검증 및 공통 변환: `lib/content/schema.ts`
- 웹사이트 읽기: `lib/content/repository.ts`, `lib/content/supabase.ts`
- CMS는 위 스키마와 웹사이트 React 컴포넌트를 개발 시 재사용하며, 배포할 때 독립 번들로 묶습니다.

`SiteContent.schemaVersion`은 1입니다. 상품·카테고리·미디어는 고정 ID를 사용합니다. 상품의 공개 상태 `draft | published | archived`와 판매 상태 `available | coming-soon | sold-out`를 구분합니다. 가격은 원 단위 정수 또는 null입니다. URL은 HTTPS, 이미지의 로컬 초안 경로는 `/media/<sha256>.webp`입니다. 미디어 초점은 x/y 각각 **0~1**입니다.

공개 snapshot은 products에서 published만 포함합니다. 초안·보관·로컬 이력은 공개 API에 들어가지 않습니다. 대표 이미지는 images[0]이며 사용자는 CMS에서 이미지를 교체·재정렬합니다. CMS 업로드는 최대 12MB/2,400만 픽셀의 JPG/PNG/WebP를 받아 최대 2000×3000의 WebP로 변환합니다. 표시 비율은 기존 페이지 컴포넌트에서 고정합니다.

## 읽기와 게시

서버 환경 변수 `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`를 함께 지정하면 다음 read-only API를 사용합니다.

```text
GET <SUPABASE_URL>/rest/v1/yangmal_content?id=eq.main&select=content
apikey: <publishable 또는 레거시 anon 키>
```

이미지는 `<SUPABASE_URL>/storage/v1/object/public/yangmal-media/<hash>.webp`에서 읽습니다. 로컬 PC 주소는 공개 콘텐츠에 허용하지 않습니다. 저장소와 DB가 온라인에 있으므로 담당자 PC의 실행 여부에 영향을 받지 않습니다.

웹사이트는 매 페이지 요청 시 공개본을 조회하고 검증합니다. 환경 변수가 없으면 seed를 사용합니다. 연결된 프로젝트에 아직 공개본이 없으면 빈 상품 목록을 표시합니다. 조회 실패·잘못된 스키마는 오류 처리하며, 오래된 seed 상품으로 바꿔 판매하지 않습니다. 이미 열린 탭은 새로고침해야 최신 내용이 보입니다.

CMS는 이미지부터 업로드하고, `yangmal_publish` RPC로 공개 JSON을 마지막에 교체합니다. RPC는 DB의 편집자 목록을 확인하고 초안의 기준 revision과 현재 공개 revision을 비교합니다. 다른 담당자의 선행 게시가 있으면 409로 거부합니다. 로컬 초안은 공유/자동 병합되지 않습니다. 새 공개본을 불러와 필요한 변경을 적용합니다.

## 권한

Supabase SQL 설치 파일은 `../yangmalkr_cms/supabase/setup.sql`입니다. 익명·일반 인증 사용자는 공개 컬럼 SELECT만 가능하고, 허용된 담당자만 게시 RPC와 이미지 업로드가 가능합니다. 허용 목록은 사업주가 DB에서 관리합니다. 프로그램은 secret/service_role 키를 받지 않으며 각 계정의 세션을 로컬 서버 메모리에만 보관합니다.

CMS의 API에도 요청 출처·loopback Host·임시 토큰 검사와 스키마 검증이 있습니다. 배포본에는 공개 설정만 포함합니다. 공개 이미지 삭제, 리디렉션 관리, 실시간 공동 편집, 공유 초안, MCP 서버는 현재 구현 범위에 포함하지 않습니다.

실제 상품은 Supabase 공개본과 Storage를 통해 제공합니다. 배포 환경에는 공개 URL과 publishable 키만 설정합니다. 새로운 환경에서는 담당자 계정과 편집 권한을 먼저 설정해야 합니다.

상품 상세 이미지는 배열 순서대로 최대 880px의 공통 너비로 세로 배치하며, 원본 비율을 유지하고 자르지 않습니다. `Media.width`와 `Media.height`는 선택 필드로 레이아웃 공간 예약에 사용합니다. 크기 정보가 없는 기존 이미지도 자연 높이로 표시합니다. 대표 사진과 갤러리의 슬롯 크기는 고정입니다.

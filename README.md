# yangmalkr

NINESOCKS / yangmal.kr의 새 React 웹사이트. 기존 `front2`는 참조용으로 보존합니다.

## 실행

Node.js 22.13 이상과 npm이 필요합니다.

```sh
npm install
npm run dev
```

개발 서버는 출력된 Local URL에서 확인합니다. 배포용 빌드는 `npm run build`, 로컬 배포 빌드 확인은 `npm start`입니다.

```sh
npm run typecheck
npm test
npm run build
```

React 19 + TypeScript + Vite/Vinext를 사용합니다. `next/*` import는 Vinext의 React App Router 호환 API입니다. Next.js 서버를 실행하는 프로젝트는 아닙니다. 배포 출력은 Cloudflare Worker ESM이며 Sites 어댑터가 포함되어 있습니다.

## 페이지

- `/`: 홈, 카테고리, 추천 상품, 브랜드 소개
- `/products`: 전체 상품, 카테고리 필터, 한/영 검색, 가격 정렬
- `/product/[category]`: 카테고리별 상품
- `/product/[category]/[item]`: 상품 상세, 이미지 선택, 구매 안내, 관련 상품
- `/about`: 브랜드 소개
- `/contact`: 이메일·전화·지도·스마트스토어 연결

기존 상품 URL을 유지합니다. 한국어/영어 선택은 쿠키에 저장하고 서버 렌더링에도 적용합니다. 실제 구매·옵션 선택·주문 처리는 네이버 스마트스토어에서 진행합니다.

## 이미지

요청에 따라 모든 콘텐츠 이미지는 **filler** 상태입니다. 기존 `front2` 이미지 파일을 복사하거나 참조하지 않습니다. 플레이스홀더는 이미지가 없어도 레이아웃이 유지되도록 고정 비율을 예약합니다.

| 용도             | 기준 크기   | 비율 |
| ---------------- | ----------- | ---- |
| 메인 배너        | 1440 × 1200 | 6:5  |
| 상품 카드        | 800 × 1000  | 4:5  |
| 상세 갤러리      | 1200 × 1200 | 1:1  |
| 카테고리 카드    | 800 × 600   | 4:3  |
| 브랜드 이미지    | 1000 × 1200 | 5:6  |
| 상품 설명 이미지 | 1200 × 900  | 4:3  |

컴포넌트: `components/media.tsx`. 추후 콘텐츠의 `src`에 이미지 URL을 넣고 `fit`, `focalPoint`, 언어별 `alt`를 지정합니다. 네트워크 오류 시에도 같은 크기의 filler가 표시됩니다. 실제 이미지 서비스 연결 시 크기별 파생 이미지와 `srcset`을 추가해야 합니다. 실이미지가 없으므로 OG/X 이미지도 생성하지 않습니다.

## 콘텐츠와 미래 CMS

- 타입: `lib/content/types.ts`
- 임시 콘텐츠: `lib/content/seed.ts`
- 공개 데이터 접근: `lib/content/repository.ts`
- 상품 검색·정렬·가격·구매 가능 여부: `lib/content/catalog.ts`

현재는 로컬 seed 데이터를 읽습니다. 런타임 편집/저장/업로드 기능은 아직 없습니다. 추후 별도 형제 프로젝트 **`yangmalkr_cms`**를 만들고 repository 구현을 공개 콘텐츠 API로 교체할 예정입니다. 이번 작업에서는 CMS 프로젝트나 관리자 기능을 만들지 않았습니다. 계약과 후속 범위는 [CMS_CONTRACT.md](docs/CMS_CONTRACT.md)를 참고하세요.

## 디자인

기존의 밝은 바탕과 Pretendard를 이어받고, 메인 테마 컬러는 트루 블랙 `#000000`으로 설정했습니다. 버튼·주요 텍스트·강조 배너·포커스에 검정을 사용하고 회색과 아이보리를 보조색으로 사용합니다. 상세한 변경 이유는 [DESIGN.md](docs/DESIGN.md)에 기록했습니다.

배포 도메인은 `SITE_URL`로 지정합니다. 미지정 시 현재 Sites 검토 주소를 사용합니다. 실제 브랜드 도메인 배포 시 `.env.example`처럼 `SITE_URL=https://yangmal.kr`을 설정합니다. `.env.example`은 예시이며 비밀키를 넣지 않습니다.

원본에 있는 가격·판매 예정 상태·회사 정보는 임시 콘텐츠로 이관했습니다. 공개 서비스 전 최종 상품 정보와 실제 이미지, 상품별 구매 링크를 확정해야 합니다.

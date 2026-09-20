'use client';
import { Button } from '@/components/ui/button';
export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main id="main" className="container not-found">
      <p className="eyebrow">PLEASE TRY AGAIN</p>
      <h1>페이지를 불러오지 못했습니다.</h1>
      <p>잠시 후 다시 시도해 주세요. / Please try again in a moment.</p>
      <Button className="retry-button" onClick={reset}>
        다시 시도 / Retry
      </Button>
    </main>
  );
}

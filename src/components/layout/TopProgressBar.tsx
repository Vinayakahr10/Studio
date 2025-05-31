
"use client";

import { useEffect } from 'react';
import NProgress from 'nprogress';
import { usePathname, useSearchParams } from 'next/navigation';

// NProgress styles are added in src/app/globals.css

export function TopProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.configure({ showSpinner: false }); // Spinner is hidden via CSS as well

    // When the route changes (pathname or searchParams change),
    // start the progress bar.
    NProgress.start();

    // When the component unmounts or the dependencies change again (meaning navigation is complete
    // for the current context and a new page/component is rendering), stop the progress bar.
    // This relies on the fact that this component will re-render/unmount on navigation.
    return () => {
      NProgress.done();
    };
  }, [pathname, searchParams]); // Listen to changes in pathname and searchParams

  return null; // This component doesn't render any visible elements itself
}

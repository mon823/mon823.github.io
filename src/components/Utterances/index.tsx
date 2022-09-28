import React, { createRef, useEffect, useRef } from 'react';
import { useTheme } from '@hooks/useDarkMode';

const src = 'https://utteranc.es/client.js';
const utterancesSelector = 'iframe.utterances-frame';

export const Utterances = React.memo(({ repo }: { repo: string }) => {
  const [isDarkMode] = useTheme();
  const containerRef = createRef<HTMLDivElement>();
  //   const isUtterancesLoaded = useRef<boolean>(false);

  useEffect(() => {
    // if (!containerRef.current || isUtterancesLoaded.current) return;
    const createUtteranesElement = () => {
      const utterances = document.createElement('script');
      const attributes = {
        src,
        repo,
        theme: isDarkMode ? 'photon-dark' : 'github-light',
        'issue-term': 'pathname',
        label: 'comments',
        crossorigin: 'anonymous',
        async: 'true',
      };

      Object.entries(attributes).forEach(([key, value]) => {
        utterances.setAttribute(key, value);
      });

      containerRef.current?.appendChild(utterances);
    };

    const postThemeMessage = () => {
      const message = {
        type: 'set-theme',
        theme: isDarkMode ? 'photon-dark' : 'github-light',
      };

      utterancesEl?.contentWindow?.postMessage(message, src);
    };

    const utterancesEl = containerRef.current?.querySelector<HTMLIFrameElement>(utterancesSelector);
    utterancesEl ? postThemeMessage() : createUtteranesElement();
  }, [repo, isDarkMode]);

  return <div className="utterances" ref={containerRef} />;
});

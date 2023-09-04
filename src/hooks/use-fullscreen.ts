import { RefObject, useState, useLayoutEffect, useCallback } from "react";

const useFullscreen = (elRef: RefObject<HTMLElement>) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const setFullscreen = useCallback(async () => {
    const isCompressed = document["fullscreenElement"] === null;
    if (isCompressed) {
      setIsFullscreen(true);
      return await elRef.current?.requestFullscreen();
    }
    setIsFullscreen(false);
    document.exitFullscreen();
  }, [elRef]);

  useLayoutEffect(() => {
    document.onfullscreenchange = () => {
      const isExpanded = document["fullscreenElement"] === null;
      if (isExpanded) {
        setIsFullscreen(false);
      }
    };

    return () => {
      document["onfullscreenchange"] = null;
    };
  }, []);

  return [isFullscreen, setFullscreen];
};

export default useFullscreen;

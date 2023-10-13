import { useEffect, useState } from "react";
import Hls from "hls.js";
import styled from "styled-components";
import { Loader } from "@components/ui";
import useVideoPlayerStore from "@store/video-player-store";

declare const window: Window &
  typeof globalThis & {
    Hls: typeof Hls;
  };

const StyledVideo = styled.video`
  width: ${({ width }) => width || "100%"};
  height: ${({ width }) => width || "auto"};
  cursor: pointer;
  object-fit: fill;
  &:hover ~ div {
    display: flex;
  }
`;

const HlsPlayer = () => {
  const {
    playerRef,
    playingSrc,
    posterSrc,
    updateDuration,
    updateProgress,
    pauseToggler,
    setHlsInstance,
    setPlaying,
  } = useVideoPlayerStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPoster, setShowPoster] = useState<boolean>(true);

  const handleOnCanPlayTrough = () => {
    setPlaying();
    setShowPoster(false);
  };

  const handleOnPlaying = (e: any) => {
    const { currentTime, duration } = e.target as HTMLVideoElement;
    if (+duration > 0) {
      updateDuration(+duration);
      updateProgress(+currentTime);
      setIsLoading(false);
    }
  };

  const handleOnMetadataLoaded = (e: any) => {
    const { duration } = e.target as HTMLVideoElement;
    updateDuration(+duration);
  };

  const defaultConfig = {
    poster: showPoster ? posterSrc : "",
    onClick: pauseToggler,
    onLoadStart: () => {
      setShowPoster(true);
      if (playingSrc) {
        setIsLoading(true);
      }
    },
    onWaiting: () => setIsLoading(true),
    onCanPlayThrough: handleOnCanPlayTrough,
    onTimeUpdate: handleOnPlaying,
    onLoadedMetadata: handleOnMetadataLoaded,
  };

  useEffect(() => {
    let hls: Hls;

    const _initPlayer = () => {
      if (hls != null) {
        hls.destroy();
      }

      window.Hls = Hls;

      const newHls = new Hls({
        enableWorker: true,
        startLevel: -1,
      });

      if (playerRef.current != null) {
        newHls.attachMedia(playerRef.current);
      }

      // Event Docs: https://github.com/video-dev/hls.js/blob/v1.4.7/docs/API.md#runtime-events
      newHls.on(Hls.Events.MEDIA_ATTACHED, () => {
        newHls.loadSource(playingSrc);

        newHls.on(Hls.Events.MANIFEST_PARSED, () => {
          setHlsInstance(newHls);
        });
        newHls.on(Hls.Events.FRAG_PARSING_METADATA, (_event, data) => {
          console.log("Data", { _event, data });
        });
      });

      newHls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              newHls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              newHls.recoverMediaError();
              break;
            default:
              _initPlayer();
              break;
          }
        }
      });

      hls = newHls;
    };

    // Check for Media Source support
    if (Hls.isSupported()) {
      _initPlayer();
    }

    return () => {
      if (hls != null) {
        hls.destroy();
      }
    };
  }, [playingSrc, playerRef, setHlsInstance]);

  return (
    <>
      <StyledVideo ref={playerRef} src={playingSrc} {...defaultConfig} />
      {isLoading && <Loader />}
    </>
  );
};

export default HlsPlayer;

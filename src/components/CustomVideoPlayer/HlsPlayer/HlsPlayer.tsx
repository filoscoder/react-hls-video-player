import { useEffect, createRef, useState } from "react";
import Hls from "hls.js";
import styled from "styled-components";
import { Loader } from "@components/Loader";
import { BE_PRO_POSTER_LINK } from "@const/links";

declare const window: Window &
  typeof globalThis & {
    Hls: typeof Hls;
  };

interface HlsPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  playerRef: React.RefObject<HTMLVideoElement>;
  setHlsInstance: React.Dispatch<React.SetStateAction<Hls | undefined>>;
}

const StyledVideo = styled.video`
  width: ${({ width }) => width || "100%"};
  height: ${({ width }) => width || "auto"};
  cursor: pointer;
  object-fit: fill;
  &:hover ~ div {
    display: flex;
  }
`;

const HlsPlayer = ({
  src,
  playerRef = createRef<HTMLVideoElement>(),
  setHlsInstance,
  ...props
}: HlsPlayerProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleOnWaiting = () => {
    setIsLoading(true);
  };
  const handleOnCanPlayTrough = () => {
    setIsLoading(false);
  };

  const defaultConfig = {
    poster: isLoading ? BE_PRO_POSTER_LINK : "",
    onWaiting: handleOnWaiting,
    onCanPlayThrough: handleOnCanPlayTrough,
  };

  useEffect(() => {
    let hls: Hls;

    const _initPlayer = () => {
      if (hls != null) {
        hls.destroy();
      }

      window.Hls = Hls;

      const newHls = new Hls({
        enableWorker: false,
      });

      if (playerRef.current != null) {
        newHls.attachMedia(playerRef.current);
      }

      // Event Docs: https://github.com/video-dev/hls.js/blob/v1.4.7/docs/API.md#runtime-events
      newHls.on(Hls.Events.MEDIA_ATTACHED, () => {
        newHls.loadSource(src);

        newHls.on(Hls.Events.MANIFEST_PARSED, () => {
          setHlsInstance(newHls);
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
  }, [src, playerRef, setHlsInstance]);

  // If Media Source is supported, use HLS.js to play video
  // Fallback to using a regular video player if HLS is supported by default in the user's browser
  return (
    <>
      {Hls.isSupported() ? (
        <StyledVideo ref={playerRef} src={src} {...defaultConfig} {...props} />
      ) : (
        <StyledVideo ref={playerRef} src={src} {...defaultConfig} {...props} />
      )}
      {isLoading && <Loader />}
    </>
  );
};

export default HlsPlayer;

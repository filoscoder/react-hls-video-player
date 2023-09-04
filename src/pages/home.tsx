import { useRef } from "react";
import { VideoPlayer } from "../components";
import { Flex } from "../components/ui";

const Home = () => {
  const playerRef = useRef<HTMLVideoElement>(null);

  const hlsConfig = {
    playerRef,
    maxWidth: 900,
    src: "https://s.bepro11.com/videos-eu/7a449dcafd/2020-10-22T06:26:42_8c3e076c65db258d/playlist.m3u8",
  };

  return (
    <Flex direction="column">
      <h1>HSL Video Player</h1>
      <VideoPlayer hlsConfig={hlsConfig}>Video</VideoPlayer>
    </Flex>
  );
};

export default Home;

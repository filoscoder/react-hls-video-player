import { useState, useEffect } from "react";
import { CustomVideoPlayer } from "../components";
import { Flex } from "../components/ui";

// * Mock Server API Request
const getVideoSourcesApi = (): Promise<Array<string>> =>
  new Promise((resolve) => {
    const sources = [
      "https://s.bepro11.com/videos-eu/7a449dcafd/2020-10-22T06:26:42_8c3e076c65db258d/playlist.m3u8",
      "http://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8",
      "http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8",
      "http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8",
    ];

    resolve(sources);
  });

const Home = () => {
  const [sources, setSources] = useState<Array<string>>([]);

  useEffect(() => {
    (async () => {
      const data = await getVideoSourcesApi();

      setSources(data);
    })();
  }, []);

  return (
    <Flex direction="column">
      <h1>HSL Video Player</h1>
      <CustomVideoPlayer size={900} sources={sources} />
    </Flex>
  );
};

export default Home;

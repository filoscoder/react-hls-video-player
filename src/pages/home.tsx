import { CustomVideoPlayer } from "../components";
import { Flex } from "../components/ui";

const Home = () => {
  // const src =
  //   "https://s.bepro11.com/videos-eu/7a449dcafd/2020-10-22T06:26:42_8c3e076c65db258d/playlist.m3u8";
  // const src = "http://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8";
  const src =
    "http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8";
  // const src = "http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8";

  return (
    <Flex direction="column">
      <h1>HSL Video Player</h1>
      <CustomVideoPlayer size={900} src={src} />
    </Flex>
  );
};

export default Home;

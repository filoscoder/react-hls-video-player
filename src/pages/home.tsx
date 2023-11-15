import { useState, useEffect } from "react";
import { CustomVideoPlayer } from "@components";
import { Flex, Heading, Icon, Link } from "@components/ui";
import { getVideoSourcesApi } from "@api/videos";
import CustomDataForm from "@components/CustomDataForm";

const Home = () => {
  const [data, setData] = useState<Array<string>>([]);

  useEffect(() => {
    (async () => {
      const data = await getVideoSourcesApi();

      setData(data);
    })();
  }, []);

  return (
    <Flex $direction="column">
      <Heading tag="h2">
        <Link href={"https://github.com/filoscoder/react-hls-video-player"}>
          React HLS Video Player
        </Link>
      </Heading>
      <CustomVideoPlayer data={data} />
      <CustomDataForm />
      <Heading tag="h4">
        Made with ❤️ by{" "}
        <Link href="https://github.com/filoscoder">filoscoder</Link>
      </Heading>
    </Flex>
  );
};

export default Home;

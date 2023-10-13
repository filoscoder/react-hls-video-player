import { useState, useEffect } from "react";
import { CustomVideoPlayer } from "@components";
import { Flex, Heading } from "@components/ui";
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
      <Heading tag="h1">React HLS Video Player</Heading>
      <CustomDataForm />
      <CustomVideoPlayer size={900} data={data} />
    </Flex>
  );
};

export default Home;

import { Flex } from "../ui";

interface LoaderProps {}

const Loader = (props: LoaderProps) => {
  return (
    <Flex>
      <span>loading...</span>
    </Flex>
  );
};

export default Loader;

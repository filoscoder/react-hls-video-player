import { useNavigate } from "react-router-dom";
import { Flex, Heading } from "@components/ui";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Flex direction="column" style={{ backgroundColor: "purple" }}>
      <Heading tag="h1">Home</Heading>
      <button
        onClick={() => {
          navigate("/player");
        }}
      >
        Go to Player
      </button>
    </Flex>
  );
};

export default Home;

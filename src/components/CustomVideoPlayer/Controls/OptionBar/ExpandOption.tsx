import { Icon } from "@components/ui/Icon";
import useFullscreen from "@hooks/use-fullscreen";

interface ExpandOptionProps {
  playerContainerRef: React.RefObject<HTMLDivElement>;
}

const ExpandOption = ({ playerContainerRef }: ExpandOptionProps) => {
  const [isFullscreen, setFullscreen] = useFullscreen(playerContainerRef);

  return (
    <Icon
      name={isFullscreen ? "compress" : "expand"}
      // @ts-ignore
      onClick={setFullscreen}
    />
  );
};

export default ExpandOption;

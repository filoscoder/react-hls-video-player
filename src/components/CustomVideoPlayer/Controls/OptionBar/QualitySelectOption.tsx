import styled from "styled-components";
import { Icon } from "@components/ui/Icon";
import { rem } from "@utils";
import { useState, useEffect } from "react";
import Hls from "hls.js";

const QualityOptions = styled.ul`
  position: absolute;
  bottom: 70px;
  right: ${rem("8px")};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  min-width: 100px;
  color: #fff;
  background-color: #303030;
`;
const QualityOption = styled.li`
  display: flex;
  align-items: center;
  font-family: helvetica;
  font-size: ${rem("16px")};
  padding: ${rem("8px")} ${rem("16px")};
  user-select: none;
  svg {
    margin-left: 6px;
  }
  &:hover {
    cursor: pointer;
    color: #303030;
    background-color: #fff;
    border-radius: 4px;
    svg > path {
      fill: #303030;
    }
  }
`;

interface QualitySelectOptionProps {
  hlsInstance?: Hls;
  currentLevel?: number;
}

interface LevelValue {
  level: number;
  value: number;
  label: string;
}

const QualitySelectOption = ({
  hlsInstance,
  currentLevel = -1,
}: QualitySelectOptionProps) => {
  const [showLevelOpts, setShowLevelOpts] = useState<boolean>(false);
  const [levelData, setLevelData] = useState<{
    current: number;
    levels: Array<LevelValue>;
  }>({
    current: currentLevel,
    levels: [],
  });

  const toggleOptions = () => {
    setShowLevelOpts((prev) => !prev);
  };

  const handleQualitySelect = (selectedLevel: number) => {
    // @ts-ignore
    hlsInstance.nextLevel = selectedLevel;
    setLevelData((prev) => ({
      ...prev,
      current: selectedLevel,
    }));
    toggleOptions();
  };

  useEffect(() => {
    if (hlsInstance) {
      const autoLevelValue = {
        level: -1,
        value: -1,
        label: "Auto",
      };
      const reducedLevelValue = hlsInstance?.levels
        .reduce<Array<LevelValue>>((acc, l, idx) => {
          if (l.height) {
            const data = {
              level: idx,
              value: l.height,
              label: `${l.height}p`,
            };
            acc.push(data);
          }
          return acc;
        }, [])
        .sort((a, b) => b.value - a.value);

      const current = currentLevel;
      const levels =
        reducedLevelValue.length > 1
          ? [...reducedLevelValue, autoLevelValue]
          : reducedLevelValue;

      setLevelData({
        current,
        levels,
      });
    }
  }, [hlsInstance, currentLevel]);

  return (
    levelData.levels.length && (
      <>
        <Icon
          name={"more"}
          style={{ position: "relative" }}
          onClick={toggleOptions}
        />
        {showLevelOpts && (
          <QualityOptions
            onMouseEnter={() => setShowLevelOpts(true)}
            onMouseLeave={() => setShowLevelOpts(false)}
          >
            {levelData.levels.map(({ level, value, label }) => (
              <QualityOption
                key={`${level}_${value}`}
                onClick={() => handleQualitySelect(level)}
              >
                {label}
                {levelData.current === level && (
                  <Icon name={"check"} size={"16px"} />
                )}
              </QualityOption>
            ))}
          </QualityOptions>
        )}
      </>
    )
  );
};

export default QualitySelectOption;

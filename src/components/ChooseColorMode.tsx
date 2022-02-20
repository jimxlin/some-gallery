import { Circle, Icon, useColorMode } from "@chakra-ui/react";
import { FaRegSun, FaRegMoon } from "react-icons/fa";

function ChooseColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Circle onClick={toggleColorMode} px={4} cursor="pointer">
      {colorMode === "light" ? (
        <Icon as={FaRegSun} />
      ) : (
        <Icon as={FaRegMoon} w={3} h={3} />
      )}
    </Circle>
  );
}
export default ChooseColorMode;

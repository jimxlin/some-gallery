import { Button, useColorMode } from "@chakra-ui/react";

function ChooseColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return <Button onClick={toggleColorMode}>{colorMode}</Button>;
}
export default ChooseColorMode;

import {
  Flex,
  Spacer,
  Center,
  Text,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import ChooseColorMode from "./ChooseColorMode";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Center w="100%" p={2}>
      <Flex w={["100%", "100%", "lg", "xl", "6xl"]}>
        <Text fontSize="2xl">Some Photographs</Text>
        <Spacer />
        <ChooseColorMode />
      </Flex>
    </Center>
  );
}
export default Header;

import { Flex, Text, Center } from "@chakra-ui/react";

function Header() {
  return (
    <Center w="100%" p={2}>
      <Flex w={["100%", "100%", "lg", "xl", "6xl"]}>
        <Text fontSize="2xl">Some Photographs</Text>
      </Flex>
    </Center>
  );
}
export default Header;

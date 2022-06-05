import { VStack, Center, Text, Icon } from "@chakra-ui/react";
import { FaLongArrowAltDown } from "react-icons/fa";

function About() {
  return (
    <VStack w={["90%", "90%", "60%"]} spacing={[2, 4]} align="start">
      <Text>
        Hi, I'm a hobby photographer, it's just something I do for fun!
      </Text>
      <Text>I hope you enjoy some of my photographs shown here!
      </Text>
      <Center w="100%">
        <Icon as={FaLongArrowAltDown} w={4} h={36} />
      </Center>
    </VStack>
  );
}
export default About;

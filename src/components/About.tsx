import { VStack, Text } from "@chakra-ui/react";

function About() {
  return (
    <VStack w={["90%", "90%", "60%"]} spacing={[2, 4]} align="start">
      <Text>Photography is a hobby, web development is my profession.</Text>
      <Text>Please enjoy some of my photographs shown here.</Text>
    </VStack>
  );
}
export default About;

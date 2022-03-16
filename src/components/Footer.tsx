import { VStack, HStack, Text, Icon, Link } from "@chakra-ui/react";
import { FaGithub, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <VStack w={["100%", "100%", "lg", "xl", "6xl"]} p={2} align="start">
      <Link isExternal href="https://github.com/miljinx/some-gallery/">
        <HStack>
          <Icon as={FaGithub} />
          <Text>Source</Text>
        </HStack>
      </Link>
      <Link isExternal href="https://www.instagram.com/jimxlin/">
        <HStack>
          <Icon as={FaInstagram} />
          <Text>Instagram</Text>
        </HStack>
      </Link>
      <Text fontSize="sm">&copy; 2022 Jim Lin</Text>
    </VStack>
  );
}
export default Footer;

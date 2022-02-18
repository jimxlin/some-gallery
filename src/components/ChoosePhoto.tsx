import { VStack, HStack, Text, Link } from "@chakra-ui/react";

type Props = {
  nextPhotoTags: Array<string>;
  handleViewNextPhoto: (tag: string) => void;
};
function ChoosePhoto({ nextPhotoTags, handleViewNextPhoto }: Props) {
  return (
    <VStack w="100%" py={4} justify="center">
      <Text>Show me something:</Text>
      <HStack w="100%" justify="center">
        <Text>[</Text>
        {nextPhotoTags.map((tag: string, index: number) => (
          <Text as={Link} key={tag} onClick={() => handleViewNextPhoto(tag)}>
            {tag}
            {index !== nextPhotoTags.length - 1 ? ", " : ""}
          </Text>
        ))}
        <Text>]</Text>
      </HStack>
    </VStack>
  );
}
export default ChoosePhoto;

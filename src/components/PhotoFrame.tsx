import { Center, Image } from "@chakra-ui/react";
import { FRAME_HEIGHTS, FRAME_PADDINGS } from "../constants";

type Props = {
  imageSrc: string;
};
function PhotoFrame({ imageSrc }: Props) {
  return (
    <Center
      onContextMenu={(e) => e.preventDefault()}
      bgImage="/photoframe-light.png"
      bgPosition="center"
      bgRepeat="repeat"
      h={FRAME_HEIGHTS} // avoid percentages
      p={FRAME_PADDINGS}
      boxShadow="outsetLight"
      rounded="xs"
    >
      <Image
        maxW="100%"
        maxH="100%"
        boxShadow="insetLight"
        border="1px solid rgb(0, 0, 0, 0.1)"
        src={imageSrc}
      />
    </Center>
  );
}
export default PhotoFrame;

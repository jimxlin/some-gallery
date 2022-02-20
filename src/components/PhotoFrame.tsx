import { Center, Image } from "@chakra-ui/react";
import { FRAME_HEIGHTS, PHOTO_HEIGHTS } from "../constants";

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
      w={FRAME_HEIGHTS}
      boxShadow="outsetLight"
      rounded="xs"
    >
      <Image
        // avoid percentages on img and padding in parent, buggy on smaller mobile devices
        maxW={PHOTO_HEIGHTS}
        maxH={PHOTO_HEIGHTS}
        boxShadow="insetLight"
        border="1px solid rgb(0, 0, 0, 0.1)"
        src={imageSrc}
      />
    </Center>
  );
}
export default PhotoFrame;

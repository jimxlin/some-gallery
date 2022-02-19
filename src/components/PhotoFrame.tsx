import { Square, Image } from "@chakra-ui/react";
import { FRAME_HEIGHTS } from "../constants";

type Props = {
  imageSrc: string;
};
function PhotoFrame({ imageSrc }: Props) {
  return (
    <Square
      onContextMenu={(e) => e.preventDefault()}
      bgImage="/photoframe-light.png"
      bgPosition="center"
      bgRepeat="repeat"
      size={FRAME_HEIGHTS} // avoid percentages
      boxShadow="outsetLight"
      rounded="xs"
    >
      <Image
        h="70%"
        boxShadow="insetLight"
        border="1px solid rgb(0, 0, 0, 0.1)"
        src={imageSrc}
      />
    </Square>
  );
}
export default PhotoFrame;

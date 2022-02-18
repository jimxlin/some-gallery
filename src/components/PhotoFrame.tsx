import { Square, Image } from "@chakra-ui/react";

type Props = {
  imageSrc: string;
};
function PhotoFrame({ imageSrc }: Props) {
  return (
    <Square
      bgImage="/photoframe-light.png"
      bgPosition="center"
      bgRepeat="repeat"
      size="90%"
      p="8%"
      boxShadow="outsetLight"
      rounded="xs"
    >
      <Image
        boxShadow="insetLight"
        border="1px solid rgb(0, 0, 0, 0.1)"
        src={imageSrc}
      />
    </Square>
  );
}
export default PhotoFrame;

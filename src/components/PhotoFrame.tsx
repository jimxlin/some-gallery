import { Center, Image, useColorMode } from "@chakra-ui/react";
import { FRAME_HEIGHTS, PHOTO_HEIGHTS } from "../constants";

type Props = {
  imageSrc: string;
};
function PhotoFrame({ imageSrc }: Props) {
  const { colorMode } = useColorMode();

  const frameStyle =
    colorMode === "light"
      ? {
          bgImage: "/photoframe-light.png",
          boxShadow: "outsetLight",
          rounded: "xs",
        }
      : {
          bgImage: "/photoframe-dark.png",
          boxShadow: "outsetDark",
          rounded: "xl",
        };

  const photoStyle =
    colorMode === "light"
      ? {
          boxShadow: "insetLight",
          border: "1px solid rgb(0, 0, 0, 0.1)",
        }
      : {
          boxShadow: "insetDark",
          border: "1px solid rgb(255, 255, 255, 0.3)",
        };

  return (
    <Center
      onContextMenu={(e) => e.preventDefault()}
      {...frameStyle}
      bgPosition="center"
      bgRepeat="repeat"
      h={FRAME_HEIGHTS} // avoid percentages
      w={FRAME_HEIGHTS}
    >
      <Image
        {...photoStyle}
        // avoid percentages on img and padding in parent, buggy on smaller mobile devices
        maxW={PHOTO_HEIGHTS}
        maxH={PHOTO_HEIGHTS}
        src={imageSrc}
      />
    </Center>
  );
}
export default PhotoFrame;

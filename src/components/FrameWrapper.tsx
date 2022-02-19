import { Center, VStack } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import PhotoFrame from "./PhotoFrame";
import About from "./About";
import { FRAME_HEIGHTS } from "../constants";

type Props = {
  imageSrc: string | undefined;
};
function FrameWrapper({ imageSrc }: Props) {
  return (
    <VStack h={FRAME_HEIGHTS} align="center">
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.div // using `motion<BoxProps>(Box)` does not animate properly
          key={imageSrc || "noImage"}
          initial={{ x: 1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -1000, opacity: 0 }}
          transition={{
            x: { type: "tween", ease: "easeInOut", duration: 0.6 },
            opacity: { duration: 0.6 },
          }}
        >
          <Center>
            {imageSrc ? <PhotoFrame imageSrc={imageSrc} /> : <About />}
          </Center>
        </motion.div>
      </AnimatePresence>
    </VStack>
  );
}
export default FrameWrapper;

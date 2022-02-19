import { Fragment, useState } from "react";
import { VStack, HStack, Text, Link } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  nextPhotoTags: Array<string>;
  handleViewNextPhoto: (tag: string | undefined) => void;
};
function ChoosePhoto({ nextPhotoTags, handleViewNextPhoto }: Props) {
  const [disableNext, setDisableNext] = useState(false);

  const handleClick = (tag: string | undefined = undefined) => {
    if (disableNext) return;
    handleViewNextPhoto(tag);
    setDisableNext(true);
    setTimeout(() => setDisableNext(false), 3000);
  };

  const tagList = (tag: string, index: number) => (
    <Fragment key={tag}>
      <Text as={Link} onClick={() => handleClick(tag)}>
        {tag}
      </Text>
      {index !== nextPhotoTags.length - 1 && <Text>,</Text>}
    </Fragment>
  );

  return (
    <VStack w="100%" py={4} justify="center">
      <Text>Show me something:</Text>
      <HStack w="100%" justify="center">
        <Text>[</Text>
        <AnimatePresence initial={false} exitBeforeEnter>
          {!disableNext && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {nextPhotoTags.length > 0 ? (
                <HStack spacing={1}>{nextPhotoTags.map(tagList)}</HStack>
              ) : (
                <Text as={Link} onClick={() => handleClick()}>
                  random
                </Text>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <Text>]</Text>
      </HStack>
    </VStack>
  );
}
export default ChoosePhoto;

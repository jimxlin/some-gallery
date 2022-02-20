import { useState, useEffect } from "react";
import { VStack, Spinner, useToast } from "@chakra-ui/react";
import { getPhotoList, getPhotoSrc } from "./api";
import { Photo } from "./types";
import {
  viewedPhotos,
  randomUnviewedPhoto,
  randomWeightedTags,
} from "./helpers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FrameWrapper from "./components/FrameWrapper";
import ChoosePhoto from "./components/ChoosePhoto";

function App() {
  const [photos, setPhotos] = useState<Array<Photo> | undefined>(undefined);
  const [isInitializing, setIsInitializing] = useState(true);
  const [nextPhotoTags, setNextPhotoTags] = useState<Array<string> | undefined>(
    undefined
  );
  const [displaySrc, setDisplaySrc] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  // const dbg = (): void => {
  //   console.log(photos?.map((p) => p.viewed));
  // };
  // useEffect(dbg, [photos]);

  const chooseNextPhotoTags = (photos: Array<Photo>): void => {
    const tags = randomWeightedTags(photos, 3);
    setNextPhotoTags(tags);
  };

  const getPhoto = async (
    photos: Array<Photo>,
    tag: string | undefined = undefined
  ): Promise<[Photo, string]> => {
    if (!photos) throw new Error("No photos found.");
    const photo = randomUnviewedPhoto(photos, tag);
    const src = await getPhotoSrc(photo.Key);
    return [photo, src];
  };

  const viewNextPhoto = (tag: string | undefined = undefined): void => {
    if (!photos) return;
    const loadPhoto = async () => {
      try {
        const [nextPhoto, src] = await getPhoto(photos, tag);
        setDisplaySrc(src);
        const newPhotos = viewedPhotos(photos, nextPhoto);
        setPhotos(newPhotos);
        chooseNextPhotoTags(newPhotos);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error");
      }
    };
    loadPhoto();
  };

  const errorToast = useToast();
  useEffect(() => {
    if (!error) return;
    errorToast({
      position: "top",
      description: error,
      status: "error",
      duration: 20000,
      isClosable: true,
    });
  }, [error, errorToast]);

  const initialize = (): void => {
    setError(undefined);
    // https://www.robinwieruch.de/react-hooks-fetch-data/
    const fetchData = async () => {
      try {
        const response = await getPhotoList();
        if (!response) throw new Error("No photos found.");
        setPhotos(response);
        chooseNextPhotoTags(response);
        setIsInitializing(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error");
        setIsInitializing(false);
      }
    };
    fetchData();
  };
  useEffect(initialize, []);

  return (
    <VStack w="100%" spacing={[2, 6]}>
      <Header />
      <VStack
        mx={4}
        w={["100%", "100%", "lg", "xl", "2xl"]}
        px={[2, 2, 0]}
        minH="80vh"
      >
        {!isInitializing && <FrameWrapper imageSrc={displaySrc} />}
        {isInitializing && !nextPhotoTags && <Spinner mt="20vh" />}
        {nextPhotoTags && (
          <ChoosePhoto
            nextPhotoTags={nextPhotoTags}
            handleViewNextPhoto={viewNextPhoto}
          />
        )}
      </VStack>
      <Footer />
    </VStack>
  );
}

export default App;

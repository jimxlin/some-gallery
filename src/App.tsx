import { useState, useEffect } from "react";
import { VStack, Text, Spinner, useToast } from "@chakra-ui/react";
import { getPhotoList, getPhotoSrc } from "./api";
import { Photo } from "./types";
import { randomUnviewedPhoto, randomWeightedTags } from "./helpers";
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

  const showPhoto = async (
    photos: Array<Photo>,
    tag: string | undefined = undefined
  ): Promise<void> => {
    if (!photos) throw new Error("No photos found.");
    const [photo, newPhotos] = randomUnviewedPhoto(photos, tag);
    const src = await getPhotoSrc(photo.Key);
    setPhotos(newPhotos);
    setDisplaySrc(src);
  };

  const unviewAllPhotos = (): void => {
    if (!photos) return;
    setPhotos(
      photos.map((photo: Photo): Photo => ({ ...photo, viewed: false }))
    );
  };

  const chooseNextPhotoTags = (photos: Array<Photo>): void => {
    const tags = randomWeightedTags(photos, 3);
    setNextPhotoTags(tags);
  };

  const viewNextPhoto = (tag: string): void => {
    if (!photos) return;
    if (photos.every((photo: Photo) => photo.viewed)) unviewAllPhotos();
    const loadPhoto = async () => {
      try {
        await showPhoto(photos);
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

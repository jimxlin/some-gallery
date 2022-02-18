import { useState, useEffect } from "react";
import { VStack, Text, Spinner } from "@chakra-ui/react";
import { getPhotoList, getPhotoSrc } from "./api";
import { Photo } from "./types";
import { randomUnviewedPhoto, randomWeightedTags } from "./helpers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PhotoFrame from "./components/PhotoFrame";
import About from "./components/About";
import ChoosePhoto from "./components/ChoosePhoto";

function App() {
  const [photos, setPhotos] = useState<Array<Photo> | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [displayPhoto, setDisplayPhoto] = useState<Photo | undefined>(
    undefined
  );
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
    setPhotos(newPhotos);
    setDisplayPhoto(photo);
    const src = await getPhotoSrc(photo.Key);
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
        setIsLoading(true);
        await showPhoto(photos);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error");
        setIsLoading(false);
      }
    };
    loadPhoto();
  };

  const initialize = (): void => {
    setError(undefined);
    // https://www.robinwieruch.de/react-hooks-fetch-data/
    const fetchData = async () => {
      try {
        const response = await getPhotoList();
        if (!response) throw new Error("No photos found.");
        setPhotos(response);
        // console.log(photoAry && tagDistribution(photoAry));
        chooseNextPhotoTags(response);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error");
        setIsLoading(false);
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
        {error && <Text color="red.500">{error}</Text>}
        {isLoading && <Spinner />}
        {!displayPhoto && <About />}
        {displayPhoto && displaySrc && !isLoading && (
          <PhotoFrame imageSrc={displaySrc} />
        )}
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

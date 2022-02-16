import { useState, useEffect } from "react";
import { VStack, Heading, Text, Image, Spinner, Link } from "@chakra-ui/react";
import { getPhotoList, getPhotoSrc } from "./api";
import { Photo } from "./types";
import { randomUnviewedPhoto, randomWeightedTags } from "./helpers";

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
        const photoAry = await getPhotoList();
        if (!photoAry) throw new Error("No photos found.");
        setPhotos(photoAry);
        // console.log(photoAry && tagDistribution(photoAry));
        showPhoto(photoAry);
        chooseNextPhotoTags(photoAry);
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
      <Heading>Some Photographs</Heading>
      {error && <Text color="red.500">{error}</Text>}
      {isLoading && <Spinner />}
      {displayPhoto && displaySrc && !isLoading && (
        <>
          <Image src={displaySrc} width="50vw" />
          <Text>{displayPhoto.Key}</Text>
        </>
      )}
      {nextPhotoTags && <Text>Show me...</Text>}
      {nextPhotoTags &&
        nextPhotoTags.map((tag: string) => (
          <Text as={Link} key={tag} onClick={() => viewNextPhoto(tag)}>
            something {tag}
          </Text>
        ))}
    </VStack>
  );
}

export default App;

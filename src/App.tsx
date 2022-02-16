import { useState, useEffect } from "react";
import { VStack, Heading, Text, Image, Spinner } from "@chakra-ui/react";
import { getPhotoList, getPhotoSrc } from "./api";
import { Photo } from "./types";
import { randomUnviewedPhoto } from "./helpers";

function App() {
  const [photos, setPhotos] = useState<Array<Photo> | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [displayPhoto, setDisplayPhoto] = useState<Photo | undefined>(
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

  const getPhotos = (): void => {
    // https://www.robinwieruch.de/react-hooks-fetch-data/
    const fetchData = async () => {
      try {
        const photoAry = await getPhotoList();
        if (!photoAry) throw new Error("No photos found.");
        setPhotos(photoAry);
        // console.log(photos && tagDistribution(photos));
        showPhoto(photoAry);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error");
        setIsLoading(false);
      }
    };
    fetchData();
  };
  useEffect(getPhotos, []);

  return (
    <VStack w="100%" spacing={[2, 6]}>
      <Heading>Some Gallery</Heading>
      {error && <Text color="red.500">{error}</Text>}
      {isLoading && <Spinner />}
      {displayPhoto && displaySrc && !isLoading && (
        <>
          <Image src={displaySrc} width="50vw" />
          <Text>{displayPhoto.Key}</Text>
        </>
      )}
      {/* {photos &&
        photos.map((photo: any) => (
          <Text key={photo.Key} onClick={() => showPhoto(photo.Key)} as={Link}>
            {JSON.stringify(photo)}
          </Text>
        ))} */}
    </VStack>
  );
}

export default App;

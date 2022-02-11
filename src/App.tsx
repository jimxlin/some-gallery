import { useState, useEffect, useMemo, createContext } from "react";
import { VStack, Heading, Text, Image } from "@chakra-ui/react";
import { getPhotoList, getPhoto } from "./api";

function App() {
  const [photos, setPhotos] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const showPhoto = async (photoKey: string) => {
    const src = await getPhoto(photoKey);
    setImgSrc(src);
  }

  const getPhotos = (): void => {
    // https://www.robinwieruch.de/react-hooks-fetch-data/
    const fetchData = async () => {
      try {
        const objList = await getPhotoList();
        setPhotos(objList);
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
      <Heading>Glacially</Heading>
      {error && <Text color="red.500">{error}</Text>}
      {imgSrc && <Image src={imgSrc} />}
      {photos.map((photo: any) => (
        <Text key={photo.Key} onClick={() => showPhoto(photo.Key)}>
          {JSON.stringify(photo)}
        </Text>
      ))}
    </VStack>
  );
}

export default App;

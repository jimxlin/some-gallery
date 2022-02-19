import { Photo } from "./types";

const randEl = (array: Array<any>): any =>
  array[Math.floor(Math.random() * array.length)];

export const getAdjectives = (adjectives: string): Array<string> =>
  adjectives.trim().split(/\s+/);

const allTags = (
  photos: Array<Photo>,
  unviewed: boolean = false
): Array<string> => {
  const filtered = unviewed
    ? photos.filter((photo: Photo) => !photo.viewed)
    : photos;
  const tags = filtered.flatMap((photo: Photo) => photo.tags);
  return tags.filter((tag: string) => tag !== "");
};

export const randomUnviewedPhoto = (
  photos: Array<Photo>,
  selectedTag: undefined | string = undefined
): Photo => {
  const displayPhoto = randEl(
    photos.filter(
      (photo: Photo) =>
        !photo.viewed &&
        (selectedTag
          ? photo.tags.some((tag: string) => tag === selectedTag)
          : true)
    )
  );
  return displayPhoto;
};

export const viewedPhotos = (
  photoAry: Array<Photo>,
  viewingPhoto: Photo
): Array<Photo> => {
  const viewedPhotos = photoAry.map((photo: Photo) =>
    viewingPhoto.Key === photo.Key ? { ...photo, viewed: true } : photo
  );
  if (viewedPhotos.every((photo: Photo) => photo.viewed))
    return viewedPhotos.map(
      (photo: Photo): Photo => ({ ...photo, viewed: false })
    );
  return viewedPhotos;
};

// randomly get unique tags, with weighted probability
export const randomWeightedTags = (
  photos: Array<Photo>,
  tagCount: number,
  unviewed: boolean = true
): Array<string> => {
  let tags = allTags(photos, unviewed);
  if (tags.length === 0) return [];
  const randomTags = [];
  for (let i = 0; i < tagCount; i++) {
    if (tags.length === 0) return randomTags;
    const selectedTag = randEl(tags);
    randomTags.push(selectedTag);
    tags = tags.filter((tag) => tag !== selectedTag);
  }
  return randomTags;
};

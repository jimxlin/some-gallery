import { Photo } from "./types";

const randEl = (array: Array<any>): any =>
  array[Math.floor(Math.random() * array.length)];

const allTags = (
  photos: Array<Photo>,
  unviewed: boolean = false
): Array<string> => {
  const filtered = unviewed
    ? photos.filter((photo: Photo) => !photo.viewed)
    : photos;
  return filtered.flatMap((photo: Photo) => Object.keys(photo.tags));
};

export const randomUnviewedPhoto = (
  photos: Array<Photo>,
  tag: undefined | string = undefined
): [Photo, Array<Photo>] => {
  const displayPhoto = randEl(
    photos.filter(
      (photo: Photo) => !photo.viewed && (tag ? photo.tags[tag] : true)
    )
  );
  const updatedPhotos = photos.map((photo: Photo) =>
    photo.Key === displayPhoto.Key ? { ...photo, viewed: true } : photo
  );
  return [displayPhoto, updatedPhotos];
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

export const tagDistribution = (photos: Array<Photo>) =>
  allTags(photos).reduce((dist: any, tag: string) => {
    if (dist[tag] === undefined) return { ...dist, [tag]: 0 };
    return { ...dist, [tag]: dist[tag] + 1 };
  }, {});

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

import { Photo } from "./types";

const randomEl = (array: Array<any>): any =>
  array[Math.floor(Math.random() * array.length)];

// randomly get unique tags, with weighted probability
export const randomTags = (photos: Array<Photo>, tagCount: number) => {
  let tags = photos.flatMap((photo: Photo) => Object.keys(photo.tags));
  const randomTags = [];
  for (let i = 0; i < tagCount; i++) {
    if (tags.length === 0) return randomTags;
    const selectedTag = randomEl(tags);
    randomTags.push(selectedTag);
    tags = tags.filter((tag) => tag !== selectedTag);
  }
  return randomTags;
};

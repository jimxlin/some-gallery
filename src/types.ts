export interface Photo {
  Key: string;
  tags: Array<string>;
  LastModified?: Date | undefined;
  ETag?: string | undefined;
  Size?: number | undefined;
  viewed: boolean;
}

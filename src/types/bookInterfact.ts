export interface book {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  image: {
    image: string;
    thumbnail: string;
  };
}

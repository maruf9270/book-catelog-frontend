export interface book {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  publiCationDate: string;
  image: {
    image: string;
    thumbnail: string;
  };
}

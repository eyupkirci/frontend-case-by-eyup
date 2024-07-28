export interface ICard {
  banner_image: { url: string };
  categories: [{ slug: string }];
  content: { text: string }[];
  title: string;
  _id: string;
  _slug: string;
}

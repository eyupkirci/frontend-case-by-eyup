export interface IHTMLContent {
  text: string;
  html: string;
}
export interface ICard {
  banner_image: { url: string };
  categories: [{ slug: string }];
  content: IHTMLContent[];
  title: string;
  _id: string;
  _slug?: string;
  _last_published_on?: string;
}
export interface PaginationState {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
}

export interface IInputState {
  input: string;
  slug: { label: string; value: string };
}

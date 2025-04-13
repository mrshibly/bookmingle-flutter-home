
export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  rating: number;
  isFavorite: boolean;
  genre: string;
  description?: string;
  ownerName?: string;
  addedDate?: string;
}

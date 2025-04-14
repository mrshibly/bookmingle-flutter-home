
export interface Post {
  id: string;
  title: string;
  author: string;
  edition: string;
  category: string;
  description: string;
  coverUrl: string;
  ownerId: string;
  userId: string; // Added this field
  createdAt: string;
}

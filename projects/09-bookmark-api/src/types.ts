export interface Bookmark {
  id: string;
  url: string;
  title: string;
  tags: string[];
  createdAt: string;
}

// What a client may send when creating or updating a bookmark.
export type BookmarkInput = Pick<Bookmark, "url" | "title" | "tags">;

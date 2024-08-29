export type ItemList = string[];

export interface Category {
    depth: number;
    items?: ItemList;
    subcategories?: Record<string, Category>;
}

export interface Hierarchy {
    [key: string]: Category;
}
  
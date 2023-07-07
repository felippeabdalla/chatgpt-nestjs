export interface PaginationObject {
  skip: number;
  take: number;
  start?: number;
  end?: number;
  originals: {
    page: number;
    itemsPerPage: number;
  };
}

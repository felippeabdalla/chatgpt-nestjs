import { PaginationMetaObject, PaginationObject } from '../interfaces';

export class PaginationMeta {
  pageCount: number;

  totalCount: number;

  page: number;

  itemsPerPage: number;

  /**
   * @constructs
   * @param queryResult
   * @param paginationParams
   */
  constructor(
    queryResult: [Array<unknown>, number],
    paginationParams: PaginationObject,
  ) {
    this.totalCount = queryResult[1];
    this.itemsPerPage = paginationParams.originals.itemsPerPage;
    this.pageCount = 0;
    this.page = paginationParams.originals.page;
  }

  getPageCount() {
    const pageCount = Math.floor(this.totalCount / this.itemsPerPage);
    const saldo = this.totalCount % this.itemsPerPage;

    return saldo ? pageCount + 1 : pageCount;
  }

  /**
   * Fetch the values formatted by metadata
   */
  getValues(): PaginationMetaObject {
    return {
      _metadata: {
        page: this.page,
        pageCount: this.getPageCount(),
        totalCount: this.totalCount,
        itemsPerPage: this.itemsPerPage,
      },
    };
  }
}

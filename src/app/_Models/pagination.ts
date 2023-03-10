export interface Pagination{
    currentPage:number
    pageCount:number
    itemsPerPage:number
    totalPages:number
}
export class PaginatedResult<T>{
    result:T //our list of member  is gonna be stored in the result proberty
    Pagination:Pagination
}
export interface UserPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}
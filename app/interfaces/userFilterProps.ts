export interface UserFilterProps {
    filters: {
        city: string;
        company: string[];
    },
    data: {
        cities: string[];
        companies: string[];
    }
    onFilterChange: (filters: any) => void;
}
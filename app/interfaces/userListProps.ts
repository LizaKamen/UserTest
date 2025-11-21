import {User} from "@/app/interfaces/user";

interface sortBy{
    by: string;
    order: string
}

export interface UserListProps {
    users: User[];
    onDeleted: (userId: number) => void;
    onUpdated: (user: User) => void;
    emails: string[];
    setSortBy: (sortBy: sortBy) => void;
    sortBy: sortBy;
}
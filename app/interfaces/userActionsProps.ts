import {User} from "@/app/interfaces/user";

export interface UserActionsProps {
    user: User;
    onUserUpdated: (updatedUser: User) => void;
    onUserDeleted: (userId: number) => void;
    emails: string[];
}
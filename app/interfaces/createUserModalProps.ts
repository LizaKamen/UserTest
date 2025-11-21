import {User} from "@/app/interfaces/user";

export interface CreateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (user: Partial<User>) => void;
    emails: string[];
}
import {User} from "@/app/interfaces/user";

export interface EditUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (user: Partial<User>, userId: number) => void;
    user: User;
    userId: number;
    emails: string[];
}
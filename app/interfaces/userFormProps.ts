import {User} from "@/app/interfaces/user";

export default interface UserFormProps {
    user? : User,
    onSubmit: (userData: Partial<User>) => void,
    onCancel: () => void,
    emails: string[]
}
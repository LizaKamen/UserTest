import {User} from "@/app/interfaces/user";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import UserForm from "@/components/users/UserForm";
import {CreateUserModalProps} from "@/app/interfaces/createUserModalProps";

export default function CreateUserModal({isOpen, onClose, onSave, emails}: CreateUserModalProps) {
    const handleSubmit = (user: Partial<User>) => {
        onSave(user);
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={(open) => {if(!open) onClose()}}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create user</DialogTitle>
                        <DialogDescription>create</DialogDescription>
                    </DialogHeader>
                    <UserForm emails={emails} onSubmit={handleSubmit} onCancel={onClose}></UserForm>
                </DialogContent>
            </Dialog>
        </>
    )
}
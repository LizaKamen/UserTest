import {EditUserModalProps} from "@/app/interfaces/editUserModalProps";
import {User} from "@/app/interfaces/user";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {toast} from "sonner";
import UserForm from "@/components/users/UserForm";

export default function EditUserModal({isOpen, onClose, onSave, user, userId, emails}: EditUserModalProps) {
    const handleSubmit = (user: Partial<User>) => {
        onSave(user, userId);
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={(open) => {if(!open) onClose()}}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>{user.name}</DialogDescription>
                    </DialogHeader>
                    <UserForm user={user} onSubmit={handleSubmit} onCancel={onClose} emails={emails}></UserForm>
                </DialogContent>
            </Dialog>
        </>
    )
}
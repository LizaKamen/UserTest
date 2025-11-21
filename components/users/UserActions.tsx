import {ButtonGroup} from "@/components/ui/button-group";
import {Button} from "@/components/ui/button";
import {Pencil, Trash} from "lucide-react";
import {UserActionsProps} from "@/app/interfaces/userActionsProps";
import {useState} from "react";
import { User } from "@/app/interfaces/user";
import DeleteUserModal from "@/components/users/DeleteUserModal";
import EditUserModal from "@/components/users/EditUserModal";
import {toast} from "sonner";

export default function UserActions({user, onUserUpdated, onUserDeleted, emails} : UserActionsProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleDelete = async () => {
        try{
            await fetch(`/api/users/${user.id}`, {method: "DELETE"});
            toast.success("User Deleted");
            onUserDeleted(user.id);
            setShowDeleteModal(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = async (user: Partial<User>, userId: number) => {
        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: "PUT",
            body: JSON.stringify(user)
            });
            const updatedUser = await response.json();
            toast.success("User updated");
            onUserUpdated(updatedUser);
            setShowEditModal(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <ButtonGroup>
                <Button onClick={() => setShowEditModal(true)} variant="outline" size="sm"><Pencil/></Button>
                <Button onClick={() => setShowDeleteModal(true)} variant="outline" color="error"
                        size="sm"><Trash/></Button>
            </ButtonGroup>

            <DeleteUserModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                userId={user.id}>
            </DeleteUserModal>

            <EditUserModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSave={handleEdit}
                user={user}
                userId={user.id}
                emails={emails}>
            </EditUserModal>
        </>
    )
}
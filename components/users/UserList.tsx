import {UserListProps} from "@/app/interfaces/userListProps";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import UserActions from "@/components/users/UserActions";
import {Button} from "@/components/ui/button";

export default function UserList({users, onUpdated, onDeleted, emails, setSortBy, sortBy}: UserListProps) {
    if (users.length === 0) return <div>No users found.</div>;
    return (
        <div>
            <Table>
                <TableCaption>Users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setSortBy({by: "id", order: sortBy.order === "asc" ? "dec" : "asc"})}>Id
                            </Button>
                        </TableHead>
                        <TableHead>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setSortBy({by: "name", order: sortBy.order === "asc" ? "dec" : "asc"})}>Name
                            </Button>
                        </TableHead>
                        <TableHead>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setSortBy({by: "email", order: sortBy.order === "asc" ? "dec" : "asc"})}>Email
                            </Button>
                        </TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setSortBy({
                                    by: "company",
                                    order: sortBy.order === "asc" ? "dec" : "asc"
                                })}>Company
                            </Button>
                        </TableHead>
                        <TableHead>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setSortBy({
                                    by: "address",
                                    order: sortBy.order === "asc" ? "dec" : "asc"
                                })}>Address
                            </Button>
                        </TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.company.name}</TableCell>
                            <TableCell>{user.address.city}</TableCell>
                            <TableCell>
                                <UserActions user={user} onUserUpdated={onUpdated} onUserDeleted={onDeleted}
                                             emails={emails}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>)
}
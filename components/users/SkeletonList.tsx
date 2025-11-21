import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Skeleton} from "@/components/ui/skeleton";
import UserSearch from "@/components/users/UserSearch";
import UserFilters from "@/components/users/UserFilters";
import {Button} from "@/components/ui/button";
import CreateUserModal from "@/components/users/CreateUserModal";

export default function SkeletonList() {
    const skeletonItems = Array.from({length: 10}, (_, i) => i);
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Users</h1>

            <UserSearch searchTerm={''} onSearchChange={() => {}}/>

            <UserFilters filters={{company: [], city: ''}} data={{cities: [], companies: []}}
                         onFilterChange={() => {}}/>

            <Button onClick={() => {}} variant="outline" size="sm">Create</Button>
            <CreateUserModal isOpen={false} onClose={() => {}} onSave={() => {}} />

            <Table>
                <TableCaption>Users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {skeletonItems.map((index) => (
                        <TableRow key={index}>
                            <TableCell><Skeleton className="h-4 w-8"/></TableCell>
                            <TableCell><Skeleton className="h-4 w-32"/></TableCell>
                            <TableCell><Skeleton className="h-4 w-40"/></TableCell>
                            <TableCell><Skeleton className="h-4 w-28"/></TableCell>
                            <TableCell><Skeleton className="h-4 w-24"/></TableCell>
                            <TableCell><Skeleton className="h-4 w-20"/></TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Skeleton className="h-8 w-8 rounded-md"/>
                                    <Skeleton className="h-8 w-8 rounded-md"/>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>)
}
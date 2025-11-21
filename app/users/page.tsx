'use client';

import {User} from "@/app/interfaces/user";
import {useEffect, useMemo, useState} from "react";
import UserSearch from "@/components/users/UserSearch";
import UserFilters from "@/components/users/UserFilters";
import UserList from "@/components/users/UserList";
import {Button} from "@/components/ui/button";
import CreateUserModal from "@/components/users/CreateUserModal";
import {toast} from "sonner";
import SkeletonList from "@/components/users/SkeletonList";
import {UserPagination} from "@/components/users/UserPagination";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sortBy, setSortBy] = useState({by: "", order: ""});
    const [filters, setFilters] = useState({
        city: '',
        company: [] as string[],
    });

    const filteredUsers = useMemo(() => {
        const filtered = users.filter((user) => {
            const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCity = !filters.city || user.address?.city === filters.city;

            const matchesCompany = !filters.company ||
                filters.company.length === 0 ||
                !filters.company.some(c => c) ||
                (user.company?.name && filters.company.includes(user.company.name));

            return matchesSearch && matchesCity && matchesCompany;
        });
        let sortFn
        switch (sortBy.by) {
            case "id":
                sortFn = sortBy.order === "asc"
                    ? (a: User, b: User) => a.id - b.id
                    : (a: User, b: User) => b.id - a.id
                break
            case "name":
                sortFn = sortBy.order === "asc"
                    ? (a: User, b: User) => a.name.localeCompare(b.name)
                    : (a: User, b: User) => b.name.localeCompare(a.name)
                break
            case "email":
                sortFn = sortBy.order === "asc"
                    ? (a: User, b: User) => a.email.localeCompare(b.email)
                    : (a: User, b: User) => b.email.localeCompare(a.email)
                break
            case "company":
                sortFn = sortBy.order === "asc"
                    ? (a: User, b: User) => a.company.name.localeCompare(b.company.name)
                    : (a: User, b: User) => b.company.name.localeCompare(a.company.name)
                break
            case "address":
                sortFn = sortBy.order === "asc"
                    ? (a: User, b: User) => a.address.city.localeCompare(b.address.city)
                    : (a: User, b: User) => b.address.city.localeCompare(a.address.city)
                break
            default:
                sortFn = (a: User, b: User) => b.id - a.id
        }
        return filtered.sort(sortFn)

    }, [users, sortBy.by, sortBy.order, searchTerm, filters.city, filters.company]);

    const currentUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredUsers.slice(startIndex, endIndex);
    }, [filteredUsers, currentPage, pageSize]);

    const totalPages = Math.ceil(filteredUsers.length / pageSize);

    const handleUsersPerPageChange = (value: string) => {
        setPageSize(Number(value));
        setCurrentPage(1);
    };

    // Сбрасываем страницу при изменении фильтров или поиска
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filters.city, filters.company, sortBy]);

    const exportJson = () => {
        const data = JSON.stringify(users, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'users.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    const cities = [...new Set([
        "Минск", "Брест", "Витебск", "Гомель", "Гродно", "Могилёв", ...users.map(user => user.address.city)])]

    const emails = [...new Set([...users.map(user => user.email)])]

    const companies = [...new Set([...users.map(user => user.company.name)])]

    const handleSave = async (user: Partial<User>) => {
        try {
            const response = await fetch(`/api/users/`, {method: "POST", body: JSON.stringify(user)});
            toast.success("User saved successfully.");
            setShowCreateModal(false);
            setUsers([await response.json() as User, ...users]);
        } catch (error) {
            console.log(error);
        }
    }

    const onDeleted = (userId: number) => {
        setUsers(users.filter((user) => user.id !== userId));
    }
    const onUpdated = (updatedUser: User) => {
        setUsers([...users.filter((user) => user.id !== updatedUser.id), updatedUser]);
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/users");
                if (!response.ok) {
                    throw Error('Failed to fetch users.');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An error occurred.');
            } finally {
                await new Promise(resolve => setTimeout(resolve, 500));
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    if (loading) return <SkeletonList/>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Users</h1>

            <UserSearch searchTerm={searchTerm} onSearchChange={setSearchTerm}/>

            <UserFilters filters={filters} data={{cities: cities, companies: companies}}
                         onFilterChange={setFilters}/>

            <Button onClick={() => exportJson()} variant="outline" size="sm">Download Json</Button>
            <Button onClick={() => setShowCreateModal(true)} variant="outline" size="sm">Create</Button>
            <CreateUserModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} onSave={handleSave}
                             emails={emails}/>
            <UserList users={currentUsers} onDeleted={onDeleted} onUpdated={onUpdated} emails={emails} setSortBy={setSortBy} sortBy={sortBy}/>
            <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                        Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredUsers.length)} of {filteredUsers.length} users
                    </span>

                <Select value={pageSize.toString()} onValueChange={handleUsersPerPageChange}>
                    <SelectTrigger className="w-20">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <UserPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                />
        </div>
    )
        ;
}
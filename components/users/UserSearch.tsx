'use client'

import {UserSearchProps} from "@/app/interfaces/userSearchProps";
import {Input} from "@/components/ui/input";
import {useCallback, useEffect, useState} from "react";
import {Button} from "@/components/ui/button";


export default function UserSearch({searchTerm, onSearchChange}: UserSearchProps) {
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

    useEffect(() => {
        setLocalSearchTerm(searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearchChange(localSearchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [localSearchTerm, onSearchChange]);

    const handleInputChange = useCallback((value: string) => {
        setLocalSearchTerm(value);
    }, [])

    const clear = () => {
        setLocalSearchTerm('');
    }

    return (
        <div className="flex w-full max-w-sm items-center gap-2">
        <Input type="text" placeholder="name or email" value={localSearchTerm}
               onChange={(e) => handleInputChange(e.target.value)}/>
            <Button onClick={clear}>X</Button>
        </div>
    )
}
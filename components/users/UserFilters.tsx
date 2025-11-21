'use client'

import {UserFilterProps} from "@/app/interfaces/userFilterProps";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";

export default function UserFilters({filters, onFilterChange, data}: UserFilterProps) {
    const resetFilters = () => {
        onFilterChange({city: '', company: []});
    }

    return (
        <div className="flex gap-4 mb-4">
            <Select value={filters.city} onValueChange={(e) => onFilterChange({...filters, city: e})}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select city"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>City</SelectLabel>
                        {data.cities.map(city => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            {data.companies.map(company => (
                <div className="flex items-center gap-3" key={company}>
                    <Checkbox
                        id={company}
                        checked={filters.company.includes(company)}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                onFilterChange({...filters, company: [...filters.company, company]});
                            } else {
                                onFilterChange({...filters, company: filters.company.filter(c => c !== company)});
                            }
                        }}/>
                    <Label>{company}</Label>
                </div>
            ))}

            <Button onClick={resetFilters}>Reset</Button>
        </div>
    )
}
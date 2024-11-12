import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface DropdownProps {
    label: string;
    children: JSX.Element
}

const DynamicDropdown: React.FC<DropdownProps> = ({ label, children }) => {

    return (
        <div className="z-[2000]">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">{label}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 z-[1000] mt-2">
                    {children}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

    )
}
export default DynamicDropdown

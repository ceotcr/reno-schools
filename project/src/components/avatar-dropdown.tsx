import React from "react";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "./ui/dropdown-menu";

export function AvatarDropdown() {
    const { data: session } = useSession();
    if (!session || !session.user) return null;

    const { name, email } = session.user;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
                <Avatar>
                    <AvatarFallback>
                        {name ? name.charAt(0).toUpperCase() : "?"}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <div className="px-2 py-1">
                    <div className="font-semibold">{name}</div>
                    <div className="text-sm text-gray-500">{email}</div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

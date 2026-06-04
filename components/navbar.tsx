"use client";

import { useAuth } from "@/hooks/useAuth";
import { loginWithGoogle, logout } from "@/services/auth.service";
import { Button } from "./ui/button";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 sm:px-0 flex items-center justify-between py-4 ">
        <h3>Application Tracker</h3>

        {user ? (
          <div className="flex items-center gap-4">
            {user.photoURL && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user.photoURL ?? ""}
                      alt={user.displayName || "User Avatar"}
                    />
                    <AvatarFallback>
                      {user.displayName?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-64">
                  <div className="mb-2 text-xs text-muted-foreground">
                    You are logged in with{" "}
                    <span className="block font-medium">{user.email}</span>
                  </div>

                  <Button className="w-full" onClick={logout}>
                    Logout
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        ) : (
          <Button onClick={loginWithGoogle} variant="outline">
            Login with
            <Image
              src="/assets/google.png"
              alt="Google Logo"
              width={14}
              height={14}
            />
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

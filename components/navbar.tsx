"use client";

import { useAuth } from "@/hooks/useAuth";
import { loginWithGoogle, logout } from "@/services/auth.service";
import { Button } from "./ui/button";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 sm:px-0 flex items-center justify-between py-4 ">
        <h3>Application Tracker</h3>

        {user ? (
          <div className="flex items-center gap-4">
            {user.photoURL && (
              <HoverCard openDelay={10} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      src={user.photoURL}
                      alt={user.displayName || "User Avatar"}
                    />
                    <AvatarFallback>
                      {user.displayName?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                </HoverCardTrigger>
                <HoverCardContent className="flex w-64 mr-6 flex-col gap-2.5">
                  <div className="mt-1 text-xs text-muted-foreground">
                    You are logged in with{" "}
                    <span className="font-medium text-shadow">
                      {user.email}
                    </span>
                  </div>
                  <Button onClick={logout}>Logout</Button>
                </HoverCardContent>
              </HoverCard>
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

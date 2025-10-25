import {
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  Settings,
} from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import React, { useEffect } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import type { User } from "@/types/user";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";
import useLogout from "@/hooks/auth/useLogout";

interface SideBarProps {
  user: User;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar = ({ user, isOpen, setIsOpen }: SideBarProps) => {
  const { mutate: logout } = useLogout();

  function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    function keyDownHandler(e: globalThis.KeyboardEvent) {
      if (e.key === "\\") {
        setIsOpen(!isOpen);
      }
    }

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  return (
    <>
      <div
        className={`bg-muted z-10 w-screen h-screen absolute sm:max-w-[18rem] border-r-2 p-2 transition-transform ease duration-300 ${isOpen ? "" : "-translate-x-[100%]"}`}
      >
        <div className="flex">
          {isOpen && (
            <Popover>
              <PopoverTrigger className="w-full" asChild>
                <Button
                  className="w-full flex items-center justify-between  p-[0.1rem] group"
                  variant={"ghost"}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Avatar className="p-[3px]">
                      <AvatarFallback>
                        {user.username.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium tracking-tight text-start min-w-0 overflow-hidden whitespace-nowrap text-ellipsis">
                      {user.firstName}'s Interact
                    </p>
                    <Button
                      variant={"ghost"}
                      size={"icon-sm"}
                      className="hidden group-hover:flex shrink-0"
                    >
                      <ChevronDown />
                    </Button>
                  </div>
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handleClick}
                        variant={"ghost"}
                        size={"icon-sm"}
                      >
                        <ChevronsLeft />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div>
                        <p>Close sidebar</p>
                        <p className="text-muted-foreground">Ctrl+\</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[17rem] bg-red ml-[0.1rem] p-0">
                <div className="flex flex-col text- gap-1">
                  <div className="flex flex-col gap-2 px-3 py-2">
                    <div className="flex gap-2">
                      <Avatar className="size-10">
                        <AvatarFallback>
                          {user.username.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-[0.85rem]">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Since {user.createdAt.split("T")[0]}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      className="w-fit text-[0.85rem] h-7"
                    >
                      <Settings />
                      Settings
                    </Button>
                  </div>
                  <Separator className="w-full" />
                  <div className="flex flex-col gap-1 px-3 py-2 text-[0.85rem]">
                    <p className="text-muted-foreground">{user.email}</p>
                    <button
                      onClick={() => logout()}
                      className="text-sm w-fit p-0 m-0 hover:underline cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
      {!isOpen && (
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Button
              onClick={handleClick}
              className="fixed top-1 left-1"
              variant={"ghost"}
              size={"icon-sm"}
            >
              <ChevronsRight />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="ml-1">
            <div>
              <p>Open sidebar</p>
              <p className="text-muted-foreground">Ctrl+\</p>
            </div>
          </TooltipContent>
        </Tooltip>
      )}
    </>
  );
};

export default SideBar;

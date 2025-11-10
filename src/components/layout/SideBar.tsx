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
import { TreeView, type TreeDataItem } from "../tree-view";

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

  const data: TreeDataItem[] = [
    {
      id: "1",
      name: "Item 1",
      children: [
        {
          id: "2",
          name: "Item 1.1",
          children: [
            {
              id: "3",
              name: "Item 1.1.1",
            },
            {
              id: "4",
              name: "Item 1.1.2",
            },
          ],
        },
        {
          id: "5",
          name: "Item 1.2 (disabled)",
          disabled: true,
        },
      ],
    },
    {
      id: "6",
      name: "Item 2 (draggable)",
      draggable: true,
    },
  ];

  return (
    <>
      <div
        className={`menu group bg-muted ease absolute z-10 w-screen border-t-2 border-r-2 border-b-2 p-2 shadow-xs transition-[translate,margin,height] duration-300 sm:max-w-[18rem] ${isOpen ? "h-screen rounded-r-none border-t-0" : "top mt-12 mb-12 h-[calc(100%-6rem)] -translate-x-[100%] rounded-r-xl border-t-2 hover:translate-0"} `}
      >
        <Popover>
          <PopoverTrigger className="w-full" asChild>
            <div
              tabIndex={1}
              className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 inline-flex w-full shrink-0 items-center justify-between gap-2 rounded-md p-[0.1rem] text-sm font-medium whitespace-nowrap transition-all outline-none hover:cursor-pointer focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            >
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <Avatar className="p-[3px]">
                  <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <p className="min-w-0 overflow-hidden text-start text-sm font-medium tracking-tight text-ellipsis whitespace-nowrap">
                  {user.firstName}'s Interact
                </p>
                <Button
                  variant={"ghost"}
                  size={"icon-sm"}
                  className="hidden shrink-0 group-hover:flex"
                >
                  <ChevronDown />
                </Button>
              </div>
              {isOpen && (
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
                  <TooltipContent side="right">
                    <div>
                      <p>Close sidebar</p>
                      <p className="text-muted-foreground">Ctrl+\</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="bg-red ml-[0.1rem] w-[17rem] p-0">
            <div className="text- flex flex-col gap-1">
              <div className="flex flex-col gap-2 px-3 py-2">
                <div className="flex gap-2">
                  <Avatar className="size-10">
                    <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="overflow-hidden text-[0.85rem] text-ellipsis whitespace-nowrap">
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
                  className="h-7 w-fit text-[0.85rem]"
                >
                  <Settings />
                  Settings
                </Button>
              </div>
              <Separator className="w-full" />
              <div className="flex flex-col px-3 py-2 text-[0.85rem]">
                <p className="text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap">
                  {user.email}
                </p>
                <Button
                  onClick={() => logout()}
                  variant={"link"}
                  size={"sm"}
                  className="h-7 w-fit p-0 text-[0.85rem]"
                >
                  Logout
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <TreeView data={data} />
      </div>
      {!isOpen && (
        <div
          className="open-sidebar-wrapper fixed top-0 left-0 w-[17rem] p-2"
          style={{ clipPath: "polygon(0 0, 0% 100%, 100% 100%)" }}
        >
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button
                onClick={handleClick}
                className="open-sidebar-button"
                variant={"ghost"}
                size={"icon-sm"}
              >
                <ChevronsRight />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="open-sidebar-wrapper" side="right">
              <div>
                <p>Lock sidebar</p>
                <p className="text-muted-foreground">Ctrl+\</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </>
  );
};

export default SideBar;

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import React, { useEffect } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import type { User } from "@/types/user";

interface SideBarProps {
  user: User;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar = ({ user, isOpen, setIsOpen }: SideBarProps) => {
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
                  className="w-full flex items-center justify-between p-[0.1rem]"
                  variant={"ghost"}
                >
                  <div>{user.username}'s Interact app</div>
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
              <PopoverContent className="w-[17rem] bg-red ml-[0.1rem]">
                Content
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

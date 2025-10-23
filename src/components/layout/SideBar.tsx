import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const SideBar = () => {
  return (
    <div className="bg-muted w-screen h-screen absolute sm:static sm:max-w-[18rem] border-r-2">
      <Popover>
        <PopoverTrigger>open</PopoverTrigger>
        <PopoverContent className="w-[17rem] bg-red ml-2">xd</PopoverContent>
      </Popover>
    </div>
  );
};

export default SideBar;

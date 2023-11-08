import { IoIosAddCircleOutline } from "react-icons/io";
import { user } from "@/db/db";

const Navbar = () => {
  return (
    <div className="w-full bg-zinc-900 px-8 h-20 flex justify-between items-center">
      <div className="text-xl font-mono">{`Hi, ${user.name}`}</div>
      <div
        onClick={() => {
          console.log("coming soon :)");
          //creating events
          () => {};
        }}
        className="cursor-pointer"
      >
        <IoIosAddCircleOutline size={30} />
      </div>
    </div>
  );
};

export default Navbar;

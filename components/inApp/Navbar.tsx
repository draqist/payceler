"use client";
import { Avatar } from "@radix-ui/react-avatar";
import Image from "next/image";
import { AvatarFallback, AvatarImage } from "../ui/avatar";

const Navbar = () => {
  return (
    <nav className="w-full h-74px rounded-full border border-blue-200 bg-white flex justify-between items-center px-20 py-3">
      <div className="flex items-center">
        <Image
          src="/payceler.svg"
          alt="Payceler logo"
          className="h-12 w-18 mr-4"
          width={115}
          height={40}
        />
      </div>
      <div className="flex items-center">
        <h1 className="text-lg font-bold text-[#6882B6]">Send Money</h1>
      </div>
      <div className="flex items-center">
        <div className="h-10 w-10 border-[3px] rounded-full border-[#D7E1F4] mr-2">
          <Avatar className="">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="rounded-full"
            />
            <AvatarFallback>AA</AvatarFallback>
          </Avatar>
        </div>
        <div className="h-10 w-10 border-[3px] rounded-full border-[#D7E1F4]">
          <Avatar className="">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="rounded-full"
            />
            <AvatarFallback>AA</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";

export default function BottomNav() {
  return (
    <Card className="w-full flex rounded-[48px] items-center justify-between h-[117px]  border-borderGray left-0 right-0 mt-8 px-8 py-4 bg-white">
      <div className="grid justify-center text-center items-center gap-1">
        <div className="w-10 lg:w-16 h-10 lg:h-16 rounded-full">
          <Image
            src="/send.svg"
            alt="send icon"
            width={64}
            height={64}
            className=""
          />
        </div>
        <p className="font-semibold text-xs lg:text-sm text-textGray"> Send </p>
      </div>
      <div className="grid justify-center text-center items-center gap-1">
        <div className="w-10 lg:w-16 h-10 lg:h-16 rounded-full">
          <Image
            src="/transactions.svg"
            alt="transaction icon"
            width={64}
            height={64}
            className="opacity-50 w-full"
          />
        </div>
        <p className="font-semibold text-xs lg:text-sm text-textGray opacity-50">
          {" "}
          Transactions{" "}
        </p>
      </div>
      <div className="grid justify-center text-center items-center gap-1">
        <div className="w-10 lg:w-16 h-10 lg:h-16 rounded-full">
          <Image
            src="/beneficiaries.svg"
            alt="send icon"
            width={64}
            height={64}
            className="opacity-50"
          />
        </div>
        <p className="font-semibold text-xs lg:text-sm text-textGray opacity-50">
          {" "}
          Beneficiaries{" "}
        </p>
      </div>
      <div className="grid justify-center text-center items-center gap-1">
        <div className="w-10 lg:w-16 h-10 lg:h-16 rounded-full">
          <Image
            src="/account.svg"
            alt="send icon"
            width={64}
            height={64}
            className="opacity-50"
          />
        </div>
        <p className="font-semibold text-xs lg:text-sm text-textGray opacity-50">
          {" "}
          Account{" "}
        </p>
      </div>
    </Card>
  );
}

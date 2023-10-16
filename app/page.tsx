"use client";
import BottomNav from "@/components/inApp/BottomNav";
import Navbar from "@/components/inApp/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  convertFromNaira,
  convertToNaira,
  currencyHelpers,
} from "@/lib/conversion";
import { Currency } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const currencies = useRef(currencyHelpers);
  const [moneySent, setMoneySent] = useState<string>("");
  const [moneyReceived, setMoneyReceived] = useState<string>("");
  const [senderCurrency, setSenderCurrency] = useState<Currency>(
    currencyHelpers[0],
  );
  const [receiverCurrency, setReceiverCurrency] = useState<Currency>(
    currencyHelpers.at(-1) || currencyHelpers[currencyHelpers.length - 1],
  );

  useEffect(() => {
    if (senderCurrency && !!moneySent) {
      //TODO: handle for dynamic

      const cleanedInput = parseFloat(moneySent);
      const money = convertToNaira(
        cleanedInput,
        senderCurrency.title,
      ).toString();
      setMoneyReceived(money);
    }

    return () => {
      // second
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [senderCurrency]);

  useEffect(() => {
    if (receiverCurrency && !!moneySent) {
      const cleanedInput = parseFloat(moneySent);
      const money = convertToNaira(
        cleanedInput,
        senderCurrency.title,
      ).toString();
      setMoneyReceived(money);
    }

    return () => {
      // second
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiverCurrency]);

  const handleSenderConversion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const senderMoneyInput = e.target.value.trim();

    if (!senderMoneyInput) return;

    const cleanedInput = parseFloat(senderMoneyInput);

    const money = convertToNaira(cleanedInput, senderCurrency.title);

    setMoneySent(senderMoneyInput);
    setMoneyReceived(money.toString());
  };

  const handleReceiverConversion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const receiverMoneyInput = e.target.value.trim();
    const recieverMoney = parseFloat(receiverMoneyInput);

    const money = convertFromNaira(recieverMoney, receiverCurrency.title);
    setMoneyReceived(receiverMoneyInput);
    setMoneySent(money.toString());
    // console.log(moneyReceived, moneySent)
  };

  const handleSenderChange = (currValue: string) => {
    const currency = currencies.current.find(
      (curr) => curr.value.toLowerCase() === currValue.toLowerCase(),
    );
    if (currency) {
      setSenderCurrency(currency);
    }
  };

  const handleReceiverChange = (currValue: string) => {
    // console.log({ e });
    const currency = currencies.current.find(
      (curr) => curr.value.toLowerCase() === currValue.toLowerCase(),
    );
    if (currency) {
      setReceiverCurrency(currency);
    }
  };

  return (
    <main className="min-h-screen lg:mx-auto px-4 lg:px-24 py-6">
      <Navbar />
      <div className="w-full flex flex-col items-center mt-14">
        <Card className="rounded-[38px] bg-white border-borderGray w-full max-w-[452px] p-6 mb-6">
          <span className="text-xs font-semibold text-textGray"> Spent </span>
          <p className="text-textGray font-semibold text-base">$0.00</p>
          <Slider
            defaultValue={[0]}
            max={100}
            step={1}
            className="mt-3 bg-[#03A1DB33] my-3"
          />
          <div className="flex justify-between items-end">
            <Button
              size={"sm"}
              className="py-3 px-4 text-buttonText text-xs font-semibold rounded-full bg-buttonBg"
            >
              Increase Limit
            </Button>
            <div className="text-right text-textGray font-semibold text-lg">
              <p className="text-xs">Limit</p>
              <p className="text-base">$10,000</p>
            </div>
          </div>
        </Card>
        <Card className="rounded-t-[38px] bg-white border-borderGray border-b-0 w-full max-w-[452px] p-6 mb-3 flex justify-between items-center">
          <div className="grid w-full max-w-sm items-center gap-1">
            <Label
              htmlFor="moneySent"
              className="text-base font-semibold bg-transparent text-app"
            >
              You Send
            </Label>
            <div className="flex items-center">
              <span className="text-3xl text-inputText font-semibold">
                {senderCurrency.sign}
              </span>
              <Input
                type="text"
                id="moneySent"
                pattern="/^\d+$/"
                inputMode="numeric"
                placeholder="0.00"
                className="text-inputText"
                value={moneySent}
                onChange={handleSenderConversion}
              />
            </div>
          </div>
          <Select onValueChange={handleSenderChange}>
            <SelectTrigger className="w-[114px] rounded-l-full">
              <SelectValue
                placeholder={`${senderCurrency.value.toUpperCase()}`}
                defaultValue={`${senderCurrency.value.toLowerCase()}`}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {currencyHelpers.map((curr, idx) => (
                  <SelectItem
                    key={`${curr.value} + ${idx + 72}`}
                    value={curr.value}
                  >
                    {curr.value.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Card>
        <Card className="bg-white border-borderGray w-full max-w-[452px] flex items-center justify-between p-6 mb-3">
          <div className="grid text-left items-center gap-1">
            <p className="text-sm font-medium text-textGray"> Rate: </p>
            <p className="text-sm font-medium text-textGray"> Commission: </p>
            <p className="text-sm font-medium text-textGray"> Total to pay: </p>
          </div>
          <div className="rounded-full w-[68px] h-[68px] flex items-center justify-center bg-[#F7F9FD] border-[#D7E1F4]">
            <Image
              src="./exchange.svg"
              alt="exchange icon"
              width={23}
              height={23}
            />
          </div>
          <div className="grid text-right items-center gap-1">
            <p className="text-sm font-medium text-textGray">
              {" "}
              1 USD = 1,000 NGN{" "}
            </p>
            <p className="text-sm font-medium text-textGray"> 0 NGN </p>
            <p className="text-sm font-medium text-textGray"> 0.00 NGN </p>
          </div>
        </Card>
        <Card className="relative rounded-b-[48px] bg-white border-borderGray border-b-0 w-full max-w-[452px] pt-6">
          <Card className=" px-6 flex justify-between shadow-none border-0  items-center">
            <div className="grid w-full max-w-sm items-center gap-1">
              <Label
                htmlFor="moneyReceived"
                className="text-base font-semibold bg-transparent text-app"
              >
                Reciever Gets
              </Label>
              <div className="flex items-center">
                <span className="text-3xl text-inputText font-semibold">
                  {receiverCurrency?.sign}
                </span>
                <Input
                  type="text"
                  id="moneyReceived"
                  pattern="/^\d+$/"
                  inputMode="numeric"
                  placeholder="0.00"
                  className="text-inputText"
                  value={moneyReceived}
                  onChange={handleReceiverConversion}
                />
              </div>
            </div>
            <Select onValueChange={handleReceiverChange}>
              <SelectTrigger className="w-[114px] rounded-l-full">
                <SelectValue
                  placeholder={`${receiverCurrency?.value.toUpperCase()}`}
                  defaultValue={`${receiverCurrency?.value.toLowerCase()}`}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {currencyHelpers.map((curr, idx) => (
                    <SelectItem
                      key={`${curr.value} + ${idx + 64}`}
                      value={curr.value}
                    >
                      {curr.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Card>
          <BottomNav />
        </Card>
      </div>
    </main>
  );
}

"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent } from "@/components/ui/select";
import { convertToNaira, currencyHelpers } from "@/lib/conversion";
import { Currency } from "@/utils/types";
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
      //TODO: the logic here is poor as i don't have full context but it should be dynamic and do just one thing

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

    // console.log({ cleanedInput });

    const money = convertToNaira(cleanedInput, senderCurrency.title);

    // console.log({ money });

    setMoneySent(senderMoneyInput);
    setMoneyReceived(money.toString());

    // setMoneySent(Number(e.target.value));
    // setMoneyReceived(convertToNaira(Number(e.target.value), currency))
    // console.log(moneyReceived, moneySent)
  };

  const handleReceiverConversion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const receiverMoneyInput = e.target.value;
    // setMoneyReceived(receiverMoneyInput);
    // console.log(moneyReceived, moneySent)
  };

  const handleSenderChange = (currValue: string) => {
    // console.log({ e });
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
    <main className="flex min-h-screen flex-col items-center justify-between px-24 py-6">
      <Navbar />
      {/*       
      <Card className='rounded-[38px] bg-white border-borderGray w-[452px] p-6 mb-2'>
        <span className='text-xs font-semibold text-textGray'> Spent </span>
        <p className='text-textGray font-semibold text-base'>$0.00</p>
        <Slider
          defaultValue={[0]}
          max={100}
          step={1}
          className='mt-3 bg-[#03A1DB33] my-3'
        />
        <div className='flex justify-between items-end'>
          <Button size={"sm"} className='py-3 px-4 text-buttonText text-xs font-semibold rounded-full bg-buttonBg'>
            Increase Limit
          </Button>
          <div className='text-right text-textGray font-semibold text-lg'>
            <p className='text-xs'>Limit</p>
            <p className='text-base'>$10,000</p>
          </div>
        </div>
      </Card> */}
      <Card className="rounded-t-[38px] bg-white border-borderGray border-b-0 w-[452px] p-6 mb-6 flex justify-between items-center">
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

      <Card className="rounded-b-[38px] bg-white border-borderGray border-b-0 w-[452px] p-6 flex justify-between items-center">
        <div className="grid w-full max-w-sm items-center gap-1">
          <Label
            htmlFor="moneyReceived"
            className="text-base font-semibold bg-transparent text-app"
          >
            You Receive
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
    </main>
  );
}

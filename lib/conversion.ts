function convertToNaira(amount: number, currency: string): number {
  switch (currency) {
    case "Pound":
      return amount * 930;
    case "Euro":
      return amount * 805;
    case "Dollar":
      return amount * 1000;
    case "Naira":
      return amount;
    default:
      throw new Error("Invalid currency");
  }
}

function convertFromNaira(amount: number, currency: string): number {
  switch (currency) {
    case "Pound":
      return amount / 930;
    case "Euro":
      return amount / 805;
    case "Dollar":
      return amount / 1000;
    case "Naira":
      return amount;
    default:
      throw new Error("Invalid currency");
  }
}

const currencyHelpers = [
  {
    title: "Dollar",
    sign: "$",
    value: "usd",
  },
  {
    title: "Pound",
    sign: "£",
    value: "pound",
  },
  {
    title: "Euro",
    sign: "€",
    value: "euro",
  },
  {
    title: "Naira",
    sign: "₦",
    value: "naira",
  },
];

export { convertToNaira, convertFromNaira, currencyHelpers };

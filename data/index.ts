const bankAccounts = [
  {
    _id: 1,
    name: "CHASE CHECKINGS",
    number: "123455545",
    balance: "1150.00",
  },
  {
    _id: 2,
    name: "CHASE SAVINGS",
    number: "123452200",
    balance: "5250.00",
  },
  {
    _id: 3,
    name: "CHASE PAYMENTS",
    number: "123455231",
    balance: "3720.00",
  },
];

interface Widget {
  _id: number;
  label: string;
  goTo: string;
}

interface WidgetArray extends Array<Widget> {}

const userWidgets: WidgetArray = [
  {
    _id: 1,
    label: "See statements",
    goTo: "/see-statements",
  },
  {
    _id: 2,
    label: "Payment history",
    goTo: "/payment-history",
  },
];

const availableWidgets: WidgetArray = [
  {
    _id: 3,
    label: "Transfer funds",
    goTo: "/transfer-funds",
  },
  {
    _id: 4,
    label: "Pay bills",
    goTo: "/pay-bills",
  },
  {
    _id: 5,
    label: "See statements",
    goTo: "/see-statements",
  },
];

export { bankAccounts, userWidgets, availableWidgets };

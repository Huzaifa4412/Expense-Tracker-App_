"use client";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";

// Importing Font
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function App() {
  function getDataFromLS() {
    const data = localStorage.getItem("tracker");
    if (data) {
      return JSON.parse(data);
    }
    return [];
  }

  const [main, setMain] = useState<MainType[]>(getDataFromLS());
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(
    main.length > 0 ? main[main.length - 1].amount : 0
  );
  const [total, setTotal] = useState(
    main.length > 0 ? main[main.length - 1].total : 0
  );
  const [earning, setEarning] = useState(
    main.length > 0 ? main[main.length - 1].earning : 0
  );
  const [expense, setExpense] = useState(
    main.length > 0 ? main[main.length - 1].expense : 0
  );
  const [type, setType] = useState(
    main.length > 0 ? main[main.length - 1].type : ""
  );

  type MainType = {
    text: string;
    amount: number;
    total: number;
    expense: number;
    earning: number;
    type: string;
  };

  // type AmountCal = {
  //   total: number;
  //   expense: number;
  //   earning: number;
  // };
  function editHandler(
    id: number,
    amount: number,
    type: string,
    title: string
  ) {
    delHandler(id, amount, type);
    setText(title);
    setAmount(amount);
  }

  function delHandler(id: number, amount: number, type: string) {
    const shallowCopy = [...main];
    console.log("total", total, " Amount", amount, " Type", type);
    if (type == "expense") {
      setTotal(total + amount);
      setExpense(expense - amount);
    } else if (type == "earning") {
      setTotal(total - amount);
      setEarning(earning - amount);
    } else {
      console.log("kia yr");
    }
    shallowCopy.splice(id, 1);
    setMain(shallowCopy);
  }
  function FormHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMain([...main, { text, amount, total, expense, earning, type }]); // or setMain([text, amount]);
    setAmount(0);
    setText("");
  }
  useEffect(() => {
    localStorage.setItem("tracker", JSON.stringify(main));
  }, [main]);

  const initialRender = (
    <h2 className="grid place-items-center mt-8 text-slate-300">
      Noting is Present
    </h2>
  );
  const FinalRender = main.map((data, index) => {
    return (
      <Card
        id={index}
        title={data.text}
        amount={data.amount}
        key={index}
        number={index + 1}
        color="green"
        del={delHandler}
        edit={editHandler}
        type={main[index].type}
      />
    );
  });

  function earningCal() {
    setTotal(total + amount);

    setEarning(earning + amount);
  }
  function expenseCal() {
    setTotal(total - amount);
    setExpense(expense + amount);
  }
  return (
    <main>
      <div className={`container ${poppins}`}>
        <div className="upperPart relative">
          <h1>Expense Tracker</h1>
          <div className="priceContainer">
            <div className="amount">
              <span className="text-sm text-slate-200">PKR &nbsp;</span>
              {total}
            </div>
            <h2>Your Balance</h2>
          </div>
          <div className="sample flex justify-between">
            <h3>Transactions</h3>

            <button
              onClick={() => {
                localStorage.clear();
                location.reload();
              }}
              className="bg-red-600 h-10 items-end px-4 rounded-lg  text-sm hover:bg-red-700 duration-500 "
            >
              Clear All
            </button>
          </div>
          <div className="transactionContainer">
            {main.length === 0 ? initialRender : FinalRender}
          </div>
        </div>
        <div className="lowerPart">
          <h3>_Add Transaction_</h3>
          <form
            onSubmit={(e) => {
              FormHandler(e);
            }}
          >
            <div className="inputContainer">
              <div className="textContainer">
                <p>Text</p>
                <input
                  required
                  type="text"
                  autoFocus
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter your text ..."
                />
              </div>
              <div className="amountContainer">
                <p>Amount</p>
                <input
                  required
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value))}
                  placeholder="Enter your Amount ..."
                />
              </div>
            </div>
            <div className="buttonContainer">
              <button
                className="earning"
                onClick={() => {
                  earningCal();
                  setType("earning");
                }}
              >
                <span className="earningVal">{earning}</span>
                Earning
              </button>
              <button
                className="expanse"
                onClick={() => {
                  setType("expense");
                  expenseCal();
                }}
              >
                <span className="expanseVal">{expense}</span>
                Expanse
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

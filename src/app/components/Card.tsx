"use client";
import React from "react";

const Card = (props: {
  title: string;
  amount: number;
  number: number;
  id: number;
  color: string;
  del: any;
  type: string;
  edit: any;
}) => {
  // const colorName = props.color;
  // const color = "red";
  let color = "";
  if (props.type == "earning") {
    color = "green";
  } else {
    color = "red";
  }
  const myColor = `bg-${color}-500`;

  return (
    <div className={`card ${props.type} relative`} id={props.id.toString()}>
      <div className={`trackerCategory ${myColor}`}>{props.number}</div>
      <div className="dataContainer">
        <div className="data">
          <div className="dataName">{props.title}</div>
          <div className="dataAmount absolute right-2">{props.amount}</div>
        </div>
      </div>
      {/* <button onClick={() => props.getInfo(props.id)}>Get Info</button> */}
      <div className="actionBtn gap-2 text-white hidden bg-[#333333] absolute w-full h-full">
        <button
          className="editBtn bg-green-500 px-3"
          onClick={() => {
            props.edit(props.id, props.amount, props.type, props.title);
          }}
        >
          Edit
        </button>
        <button
          className="delBtn bg-red-500 px-3"
          onClick={() => {
            props.del(props.id, props.amount, props.type);
          }}
        >
          Delect
        </button>
      </div>
    </div>
  );
};

export default Card;

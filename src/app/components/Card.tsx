"use client";
import React from "react";

const Card = (props: {
  title: string;
  amount: number;
  number: number;
  id: number;
  // color: string;
}) => {
  // const colorName = props.color;
  // const color = `bg-${colorName}-500`;

  return (
    <div className="card">
      <div className={`trackerCategory`}>{props.number}</div>
      <div className="dataContainer">
        <div className="data">
          <div className="dataName">{props.title}</div>
          <div className="dataAmount absolute right-2">{props.amount}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;

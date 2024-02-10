import "./styles.css";
import { useState } from "react";
// arr of the user list information

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [arr, setArr] = useState(initialFriends);
  const [formOpen, setFormOpen] = useState(false);
  const [select, setSelect] = useState();
  // pass arr to the MyandfriendExpenses component

  function ArrUpdate(value) {
    setArr(
      arr.map((i) =>
        i.id === select.id ? { ...i, balance: i.balance + value } : i
      )
    );
  }

  return (
    <div className="App">
      <div className="container">
        <ProfileList arr={arr} setSelect={setSelect} />
        <button id="btn" onClick={() => setFormOpen(!formOpen)}>
          add friend
        </button>
        {formOpen && (
          <ProfileAdding
            setArr={setArr}
            arr={arr}
            setSelect={setSelect}
            setFormOpen={setFormOpen}
            formOpen={formOpen}
          />
        )}
      </div>
      <div className="kuchbhi">
        {select && (
          <MyandfriendExpenses
            select={select}
            ArrUpdate={ArrUpdate}
            key={select.id}
            setSelect={setSelect}
          />
        )}
      </div>
    </div>
  );
}

// profile list

function ProfileList({ arr, setSelect }) {
  return (
    <ul>
      {arr.map((item) => {
        return (
          <ProfileInformation item={item} arr={arr} setSelect={setSelect} />
        );
      })}
    </ul>
  );
}

// Profile information component

function ProfileInformation({ item, setSelect, arr }) {
  return (
    <li className="ProfileInformation">
      <div id="img-and-name-balance">
        <img src={item.image} alt={item.name} />
        <div id="name-and-balance">
          <h3>{item.name}</h3>
          {item.balance < 0 && (
            <p className="red">
              You owe {item.name} {Math.abs(item.balance)}
            </p>
          )}
          {item.balance > 0 && (
            <p className="green">
              {item.name} owes you {Math.abs(item.balance)}
            </p>
          )}
          {item.balance === 0 && <p>You and {item.name} are even</p>}
        </div>
      </div>
      <button
        onClick={() => {
          setSelect(item);
        }}
      >
        select
      </button>
    </li>
  );
}

// Profile Adding friend to the list

function ProfileAdding({ setArr, arr, setFormOpen, formOpen }) {
  // this satate use to pass input to the array to add the new user
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const newUser = {
    id: crypto.randomUUID(),
    name,
    image,
    balance: 0,
  };

  function Add() {
    setArr([...arr, newUser]);
    setFormOpen(!formOpen);
  }

  return (
    <div className="ProfileAdding">
      <div id="label-and-input">
        <label htmlFor="">👫 Friend name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div id="label-and-input">
        <label htmlFor="">🌄 Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
      </div>
      <button onClick={Add}>Add</button>
    </div>
  );
}

// this component use for take input of bill and expenses

function MyandfriendExpenses({ select, ArrUpdate, setSelect }) {
  const [bill, setBill] = useState();
  const [your, setYour] = useState();
  const friendexpense = bill - your;
  const [who, setWho] = useState("you");

  function Update() {
    console.log(who);
    ArrUpdate(Number(who === "you" ? friendexpense : -your));
    setSelect();
  }

  return (
    <div>
      <div className="MyandfriendExpenses">
        <h2>SPLIT A BILL WITH {select.name}</h2>
        <div id="label-and-input">
          <label htmlFor="">💰 Bill value</label>
          <input
            type="text"
            value={bill}
            onChange={(e) => {
              setBill(e.target.value);
            }}
          />
        </div>
        <div id="label-and-input">
          <label htmlFor="">🧍‍♀️ Your expense</label>
          <input
            type="text"
            value={your}
            onChange={(e) => {
              setYour(
                Number(e.target.value) > bill ? your : Number(e.target.value)
              );
            }}
          />
        </div>
        <div id="label-and-input">
          <label htmlFor="">👫 {select.name}'s expense</label>
          <input type="text" disabled value={friendexpense} />
        </div>
        <div id="label-and-input">
          <label htmlFor="">🤑 Who is paying the bill</label>
          <select
            name=""
            id="select"
            value={who}
            onChange={(e) => {
              setWho(e.target.value);
            }}
          >
            <option value="you">you</option>
            <option value="friend">{select.name}</option>
          </select>
        </div>
      </div>
      <button id="split" onClick={Update}>
        split
      </button>
    </div>
  );
}

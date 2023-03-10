import React from "react";
import Popup from "reactjs-popup";
import { useState } from "react";
import { db } from "../Firebase";
import { setDoc, doc } from "firebase/firestore";
import "../UsersEssays.css";

function AddEssay(props) {
  const [prompt, setPrompt] = useState("");
  const [countType, setCountType] = useState();
  const [count, setCount] = useState("");
  const college = props.college;

  function handlePrompt(e) {
    setPrompt(e.target.value);
  }

  function handleCountType(e) {
    if (
      document.getElementById("wordCount").checked ||
      document.getElementById("charCount").checked
    ) {
      document.getElementById("countLabel").hidden = false;
      document.getElementById("count").hidden = false;
    } else {
      document.getElementById("countLabel").hidden = true;
      document.getElementById("count").hidden = true;
    }
    setCountType(e.target.value);
  }

  function handleCount(e) {
    setCount(e.target.value);
    const result = e.target.value.replace(/\D/g, "");

    setCount(result);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await setDoc(
        doc(
          db,
          JSON.parse(sessionStorage.getItem("user")).email,
          college,
          "essays",
          prompt
        ),
        {
          text: "",
          countType: countType,
          count: count,
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    if (college == sessionStorage.getItem("college")) {
      window.location.reload();
    }
  }

  return (
    <Popup id="popup" trigger={<button>Add</button>} modal>
      {(close) => (
        <div id="form">
          <form id="popupform">
            <h3>Add an essay for {college}</h3>
            <label id="prompt1">Add your essay prompt:</label>
            <input
              required
              id="input1"
              type="text"
              value={prompt}
              onChange={handlePrompt}
            />
            <br />
            <h3>Count Type</h3>
            <fieldset onChange={handleCountType}>
              <input
                type="radio"
                name="countType"
                id="wordCount"
                value="Word Count"
              />
              <label>Word Count</label>
              <br />
              <input
                type="radio"
                name="countType"
                id="charCount"
                value="Character Count"
              />
              <label>Character Count</label>
              <br />
              <input
                type="radio"
                name="countType"
                id="noCount"
                value="No Count"
              />
              <label>No Count</label>
              <br />
            </fieldset>
            <label id="countLabel" hidden>
              Count:
            </label>
            <input
              type="text"
              value={count}
              id="count"
              placeholder="Enter here"
              onChange={handleCount}
              hidden
            />
            <br />
            <input
              id="submit"
              type="submit"
              value="Add"
              onClick={(event) => {
                if (
                  prompt != "" &&
                  (((countType == "Word Count" ||
                    countType == "Character Count") &&
                    count != "") ||
                    countType == "No Count")
                ) {
                  handleSubmit(event);
                  close();
                }
              }}
            />
          </form>
        </div>
      )}
    </Popup>
  );
}

export default AddEssay;

import React from "react";
import { useState, useEffect } from "react";
import CollegeEssays from "./CollegeEssays";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../Firebase";
import TextEditor from "./TextEditor";

function EssayManager() {
  const [college, setCollege] = useState();
  const [collegeList, setColleges] = useState([]);
  const [essayList, setEssays] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    if (sessionStorage.getItem("user") == null) {
      sessionStorage.setItem(
        "previousPage",
        "http://localhost:3000/essaymanager"
      );
      window.location = "http://localhost:3000/signIn";
    }
  });
  useEffect(() => {
    setLoading("Loading");
    async function loadUser() {
      const colleges = await getDocs(
        collection(db, JSON.parse(sessionStorage.getItem("user")).email)
      );
      colleges.forEach((doc) => {
        if (doc.id != "user") {
          setColleges((current) => [
            ...current,
            <div
              className="collegedivclass"
              id={doc.id}
              key={doc.id}
              onClick={() => changeCollege(doc.id)}
            >
              <CollegeEssays name={doc.id} />
            </div>,
          ]);
        }
      });
      if (collegeList.length == 0) {
        setLoading("No Colleges in List");
      }
    }
    loadUser();
  }, []);
  useEffect(() => {
    if (
      sessionStorage.getItem("college") != undefined &&
      college == undefined
    ) {
      setCollege(sessionStorage.getItem("college"));
    }
    async function loadEssays() {
      setEssays([]);
      const essays = await getDocs(
        collection(
          db,
          JSON.parse(sessionStorage.getItem("user")).email,
          `${college}`,
          "essays"
        )
      );
      essays.forEach((doc) => {
        if (doc.id != "exists") {
          setEssays((current) => [
            ...current,
            <li key={doc.id}>
              <TextEditor
                prompt={doc.id}
                text={doc.data().text}
                count={doc.data().count}
                countType={doc.data().countType}
                college={college}
              />
            </li>,
          ]);
        }
      });
    }
    if (college != undefined) {
      loadEssays();
    }
  }, [college]);
  async function changeCollege(id) {
    setCollege(id);
    sessionStorage.setItem("college", id);
  }
  return (
    <>
      {collegeList.length > 0 || sessionStorage.getItem("college" != null) ? (
        <div id="page3">
          <ul id="listul">{collegeList}</ul>
          <ul id="essaylist">
            <h1 id="collegename">{college}</h1>
            {essayList}
          </ul>
        </div>
      ) : (
        <h1 id="nocolleges">{loading}</h1>
      )}
    </>
  );
}
export default EssayManager;

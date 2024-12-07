"use client"
import styles from "./page.module.css";
import {Navbar, Navitem} from "./components/navbar.js"
import {Header, Text} from "./components/header.js"
import {useState, useEffect, useReducer} from "react";
import Image from "next/image";
import avatar from "./images/avatar.jpg";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsVisible(true);
    }, 50);
  }, []);
  return (
    <>
    <div className={`${styles.page} ${isVisible ? styles.slideinleft : styles.page}`}>
      <Header>
         Hey, it's Daniel!
      </Header>
      <Text>
        I am currently studying Computer Science at the University of Waterloo, with an expected graduation date in 2029. I aspire to become
        a professional software developer, and I'm particularly interested in backend development.
      </Text>
      
    </div>
    <div className={`${styles.container} ${isVisible ? styles.slideinright : styles.container}`}>
    <Image className={`${styles.avatar}`} src={avatar} alt="profile"/>
    </div>
    </>
  );
}

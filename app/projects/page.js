"use client";
import {Navbar, Navitem} from "../components/navbar.js"
import Image from "next/image";
import Link from "next/link"
import {Header, Text} from "../components/header.js"
import starduo from "../images/starduo.jpeg";
import website from "../images/website.png"
import drchecker from "../images/drchecker.png"
import styles1 from "./page.module.css";
import React, {useState} from "react";


export default function Home() {
  const [curHover, setCurHover] = useState(0);
  const handleMouseOver1 = () => {
    if(1!=curHover) setCurHover(1);
  };
  const handleMouseOver2 = () => {
    if(2!=curHover) setCurHover(2);
  };
  const handleMouseOver3 = () => {
    if(3!=curHover) setCurHover(3);
  };
  const handleMouseLeave = () => {
    if(curHover!=0) setCurHover(0);
  };
    return (
      <div className={styles1.container}>
        <div className={styles1.projectlist}>
          <Header> My Projects </Header>
          <div className={styles1.projects} onMouseLeave={handleMouseLeave}>
          <Link className={styles1.projectname} onMouseOver={handleMouseOver1}  href="">Personal Website</Link>
          <hr className={styles1.divider}/>
          <Link className={styles1.projectname} onMouseOver={handleMouseOver2} href="">StarDuo</Link>
          <hr className={styles1.divider}/>
          <Link className={styles1.projectname} onMouseOver={handleMouseOver3} href="">DRChecker</Link>
          </div>
        </div>
        <div className={`${styles1.image} ${styles1.imageTransition} ${curHover!=0 ? styles1.fadeIn : styles1.fadeOut}`}>
        <div className={styles1.imagebox}>
          <Image src={website} className={`${styles1.imageTransition} ${curHover == 1 ? styles1.fadeIn : styles1.fadeOut}`} alt="Pic"></Image>
          </div>
          <div className={styles1.imagetextcontainer}>
            <p className={`${styles1.imageheader} ${styles1.imageTransition} ${curHover == 1 ? styles1.fadeIn : styles1.fadeOut}`} >
              dzhang.ca
          </p>
          <p className={`${styles1.imagedescription} ${styles1.imageTransition} ${curHover == 1 ? styles1.fadeIn : styles1.fadeOut}`} >
          Portfolio website built using React, HTML, CSS and JS

          </p>
          </div>
          <div className={styles1.imagebox}>
          <Image src={starduo} className={`${styles1.imageTransition} ${curHover == 2 ? styles1.fadeIn : styles1.fadeOut}`} alt="Pic"></Image>
          </div>
          
          <div className={styles1.imagetextcontainer}>
            <p className={`${styles1.imageheader} ${styles1.imageTransition} ${curHover == 2 ? styles1.fadeIn : styles1.fadeOut}`} >
              StarDuo
          </p>
          <p className={`${styles1.imagedescription} ${styles1.imageTransition} ${curHover == 2 ? styles1.fadeIn : styles1.fadeOut}`} >
           An iOS app built using React Native, Expo and TypeScript to enable friends to better connect with each other.

          </p>
          </div>
          <div className={styles1.imagebox}>
          <Image src={drchecker} className={`${styles1.imageTransition} ${curHover == 3 ? styles1.fadeIn : styles1.fadeOut}`} alt="Pic"></Image>
          </div>
          
          <div className={styles1.imagetextcontainer}>
            <p className={`${styles1.imageheader} ${styles1.imageTransition} ${curHover == 3 ? styles1.fadeIn : styles1.fadeOut}`} >
              DRChecker
          </p>
          <p className={`${styles1.imagedescription} ${styles1.imageTransition} ${curHover == 3 ? styles1.fadeIn : styles1.fadeOut}`} >
          An app for graphical analysis of relay signals, built using WPF, XAML and C#. 

          </p>
          </div>
      </div>
        
      </div>
    );
  }
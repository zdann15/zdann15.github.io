'use client'
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { Header, Text } from './components/header.js';
import Image from 'next/image';
import avatar from './images/avatar.jpg';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    const loadTimeout = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => {
      clearTimeout(timeOut);
      clearTimeout(loadTimeout);
    };
  }, []);
  
  return (
    <>
      <div className={`${styles.page} ${isVisible ? styles.slideinleft : styles.page} ${isLoaded ? styles.fadeIn : ''}`}>
        <Header>
          Hey, I'm Daniel! 👋
        </Header>
        <Text>
          I'm a Computer Science student at the University of Waterloo, passionate about software development 
          and backend engineering. I love building innovative solutions and exploring new technologies.
        </Text>
      </div>
      <div className={`${styles.container} ${isVisible ? styles.slideinright : styles.container} ${isLoaded ? styles.fadeIn : ''}`}>
        <Image 
          className={`${styles.avatar}`} 
          src={avatar} 
          alt="Daniel Zhang - Software Developer"
          priority
          quality={90}
        />
      </div>
    </>
  );
}

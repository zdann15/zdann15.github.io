"use client"
import styles from "../page.module.css";
import {Navbar, Navitem} from "../components/navbar.js"
import {useState, useEffect} from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timeOut);
  }, []);
  
  return (
    <div className={`${isVisible ? styles.slideinleft : ''}`} style={{
      padding: '120px 80px',
      maxWidth: '1200px',
      margin: '0 auto',
      color: 'white',
      fontFamily: 'Inter',
      opacity: isVisible ? 1 : 0
    }}>
      <h1 style={{
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        fontWeight: '700',
        marginBottom: '32px',
        textAlign: 'center',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
      }}>
        About Me
      </h1>
      
      <p style={{
        fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
        lineHeight: '1.6',
        marginBottom: '48px',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto 48px auto'
      }}>
        I'm a passionate Computer Science student at the University of Waterloo, 
        specializing in backend development and software engineering. I love creating 
        innovative solutions and exploring new technologies.
      </p>
      
      <h2 style={{
        fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
        fontWeight: '600',
        marginBottom: '24px',
        textAlign: 'center',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
      }}>
        Let's Connect
      </h2>
      
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a 
          href="https://github.com/zdann15" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            padding: '12px 20px',
            borderRadius: '50px',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
            fontWeight: '500'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px) scale(1.05)';
            e.target.style.background = 'rgba(255,255,255,0.2)';
            e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.background = 'rgba(255,255,255,0.1)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
        <a 
          href="https://www.linkedin.com/in/zhangdaniel/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            padding: '12px 20px',
            borderRadius: '50px',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
            fontWeight: '500'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px) scale(1.05)';
            e.target.style.background = 'rgba(255,255,255,0.2)';
            e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.background = 'rgba(255,255,255,0.1)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </a>
        <a 
          href="mailto:dc4zhang@uwaterloo.ca" 
          style={{
            padding: '12px 20px',
            borderRadius: '50px',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
            fontWeight: '500'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px) scale(1.05)';
            e.target.style.background = 'rgba(255,255,255,0.2)';
            e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.background = 'rgba(255,255,255,0.1)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 3v18h24V3H0zm21.518 2L12 12.713 2.482 5h19.036zM2 19V7.183l10 8.104 10-8.104V19H2z"/>
          </svg>
          Email
        </a>
      </div>
    </div>
  );
}
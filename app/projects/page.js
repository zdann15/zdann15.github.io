'use client'
import { useState } from 'react';
import styles1 from './page.module.css';
import Image from 'next/image';
import finlyze from '../images/finlyze.png';
import starduo from '../images/starduo.png';
import capyspend from '../images/capyspend.png';

export default function Projects() {
  const [activeProject, setActiveProject] = useState(0);
  
  const projects = [
    {
      id: 1,
      name: "Finlyze",
      image: finlyze,
      description: "Finlyze is a financial app where users can track their income and expenses, as well as monitor their stock portfolio all in one place.",
      technologies: ["Angular", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/starlyze/Finlyze"
    },
    {
      id: 2,
      name: "StarDuo",
      image: starduo,
      description: "An iOS app built using React Native, Expo and TypeScript to enable friends to better connect with each other.",
      technologies: ["React Native", "Expo", "TypeScript", "PostgreSQL"],
      github: "https://github.com/starlyze/starduo"
    },
    {
      id: 3,
      name: "CapySpend",
      image: capyspend,
      description: "An AI-powered chatbot that can build personalized budgets based on real financial data.",
      technologies: ["React", "Node.js", "PostgreSQL", "OpenAI", "Plaid"],
      github: "https://github.com/StealthHydra179/spurhacks2025"
    }
  ];

  return (
    <>
      <title>Projects</title>
      <div className={styles1.container}>
        <div className={`${styles1.header} ${styles1.slideinleft}`}>
          <h1 className={styles1.title}>My Projects</h1>
        </div>
        
        <div className={styles1.projectsGrid}>
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={`${styles1.projectCard} ${styles1.slideinleft}`}
              style={{ animationDelay: `${index * 0.2}s` }}
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(0)}
            >
              <div className={styles1.projectImage}>
                <Image 
                  src={project.image} 
                  alt={project.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className={styles1.image}
                />
                
                {/* Default title overlay - always visible */}
                <div className={styles1.defaultTitleOverlay}>
                  <h3 className={styles1.defaultProjectName}>{project.name}</h3>
                </div>
                
                {/* Full description overlay - visible on hover */}
                <div className={styles1.imageOverlay}>
                  <div className={styles1.overlayContent}>
                    <h3 className={styles1.projectName}>{project.name}</h3>
                    <p className={styles1.projectDescription}>{project.description}</p>
                    <div className={styles1.technologies}>
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className={styles1.techTag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className={styles1.projectLinks}>
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles1.githubLink}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        View on GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
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
      technologies: ["Angular", "Node.js", "MongoDB", "Express"]
    },
    {
      id: 2,
      name: "StarDuo",
      image: starduo,
      description: "An iOS app built using React Native, Expo and TypeScript to enable friends to better connect with each other.",
      technologies: ["React Native", "Expo", "TypeScript", "PostgreSQL"]
    },
    {
      id: 3,
      name: "CapySpend",
      image: capyspend,
      description: "An AI-powered chatbot that can build personalized budgets based on real financial data.",
      technologies: ["React", "Node.js", "PostgreSQL", "OpenAI", "Plaid"]
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
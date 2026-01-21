import styles1 from './resume.module.css';
import { Header, Header1, Header2, Header3, Date, Content } from '../components/header.js';

export default function Home() {
  return (
    <>
      <title>Daniel Zhang | Resume</title>
      <div className={styles1.page}>
        <div className={`${styles1.title} ${styles1.slideinleft}`}>
          <Header>Daniel Zhang</Header>
        </div>
        <div className={`${styles1.resume} ${styles1.slideinleft}`}>
          <div className={styles1.section}>
            <Header1>Education</Header1>
            <hr className={styles1.line}/>
            <Header2>University of Waterloo</Header2>
            <Date>Anticipated Graduation: April 2028</Date>
            <Header3>Bachelor of Computer Science, Honours</Header3>
            <Content>
              - Dean's Honours List | Cumulative Average: 96.4%, Major Average: 99%
            </Content>
          </div>
          
          <div className={styles1.section}>
            <Header1>Experience</Header1>
            <hr className={styles1.line}/>
            <Header2>Software Engineer Intern</Header2>
            <Date>May 2026 - Aug 2026</Date>
            <Header3>Ramp | New York City, NY</Header3>
            <Content>
              - Incoming backend engineering intern for Summer 2026.
            </Content>
            <Header2>Engineering Intern</Header2>
            <Date>May 2025 - Aug 2025</Date>
            <Header3>Shopify | Toronto, ON</Header3>
            <Content>
              - On the Shopify Payments team, accelerated a critical GraphQL mutation by 90% by implementing asynchronous jobs for payment provider (e.g. Stripe) syncs, eliminating latency during settings updates.
              <br/>- Engineered an internal Ruby tool that automated international terms of service updates across 39 countries, saving significant engineering hours.
              <br/>- Strengthened codebase stability by refactoring legacy payment logic to enforce strict typing, ensuring clearer error reporting and logging.
            </Content>
            <Header2>Research Assistant</Header2>
            <Date>Dec 2024 - Present</Date>
            <Header3>University of Waterloo | Waterloo, ON</Header3>
            <Content>
              - Contributed to RankLLM, a Python machine learning/reranking framework, by integrating OpenRouter support, expanding the toolkit's compatibility to hundreds of additional LLMs and significantly enhancing its flexibility.
              <br/>- Integrated Document Screenshot Embedding (DSE) into Pyserini, a Python information retrieval (IR) toolkit, to enable multimodal encoding and retrieval, directly supporting experimentation for an upcoming IR research paper (targeting SIGIR).
            </Content>
            <Header2>Software Developer Intern</Header2>
            <Date>Apr 2024 - Apr 2025</Date>
            <Header3>Utility Automation Solutions</Header3>
            <Content>
              - Architected and developed a Windows application using C# and WPF to automate the analysis of power system fault data, increasing productivity for 20+ engineers.
            </Content>
          </div>
          
          <div className={styles1.section}>
            <Header1>Projects</Header1>
            <hr className={styles1.line}/>
            <Header2>CapySpend</Header2>
            <Date></Date>
            <Header3>React, PostgreSQL, Express.js, Node.js, OpenAI API</Header3>
            <Content>
              - Developed a full-stack web app for personalized financial management, leveraging the OpenAI API to allow users to conversationally query their spending habits and bank data.
              <br/>- Engineered an agentic AI system that intelligently parses transactional history to dynamically create budgets and suggest actionable savings goals, providing users with proactive financial advice.
            </Content>
            <Header2>Vim-Inspired Text Editor for C/C++</Header2>
            <Date></Date>
            <Header3>C++, OpenAI API</Header3>
            <Content>
              - Engineered a low-latency, modal text editor in C++ supporting 30+ Vim commands, macros, and split-views, utilizing RAII principles and smart pointers to ensure memory safety.
              <br/>- Implemented an AI code-completion feature by embedding the OpenAI API directly into the CLI loop, allowing users to apply code generation without leaving the terminal environment.
            </Content>
          </div>
          
          <div className={styles1.section}>
            <Header1>Awards and Achievements</Header1>
            <hr className={styles1.line}/>
            <Header2>Schulich Leader Scholarship</Header2>
            <Content>
              Awarded the $100,000 Schulich Leader Scholarship, Canada's most prestigious scholarship for entrepreneurial-minded STEM undergraduates.
            </Content>
            <Header2>Competitive Programming</Header2>
            <Content>
              Advanced to the Gold division (top 10%) in the USA Computing Olympiad and achieved three consecutive top 5% finishes in the Senior Division of the Canadian Computing Competition, demonstrating strong problem-solving and algorithm design skills.
            </Content>
          </div>
          
          <div className={styles1.section}>
            <Header1>Skills</Header1>
            <hr className={styles1.line}/>
            <Content>
              <strong>Languages:</strong> Java, Python, C++, C#, JavaScript/TypeScript, SQL, Ruby
              <br/><strong>Frameworks & Libraries:</strong> React, React Native, Next.js, Node.js, Express.js, WPF, Ruby on Rails
              <br/><strong>Databases & Tools:</strong> MongoDB, PostgreSQL, Git, Linux
            </Content>
          </div>
        </div>
      </div>
    </>
  );
}
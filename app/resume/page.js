import styles1 from './resume.module.css';
import { Header, Header1, Header2, Header3, Date, Content } from '../components/header.js';

export default function Home() {
  return (
    <>
      <title>Daniel Zhang | Resume</title>
      <div className={styles1.page}>
        <div className={`${styles1.title} ${styles1.slideinleft}`}>
          <Header>Daniel Zhang </Header>
        </div>
        <div className={`${styles1.resume} ${styles1.slideinleft}`}>
          <div className={styles1.section}>
            <Header1>Education</Header1>
            <hr className={styles1.line}/>
            <Header2>University of Waterloo</Header2>
            <Date>Sept 2024 - Apr 2029</Date>
            <Header3>Bachelor of Computer Science (Honours Co-op)</Header3>
          </div>
          
          <div className={styles1.section}>
            <Header1>Experience</Header1>
            <hr className={styles1.line}/>
            <Header2>Software Engineer Intern</Header2>
            <Date>May 2025 - Present</Date>
            <Header3>Shopify</Header3>
            <Content>
              - Interning on the Shopify Payments Account Capabilities team
            </Content>
            <Header2>Software Developer Intern</Header2>
            <Date>Apr 2024 - Present</Date>
            <Header3>Utility Automation Solutions</Header3>
            <Content>
              - Built app using Windows Forms, WPF and C# to process COMTRADE event files and graphically model analog/digital channel signals
            </Content>
            <Header2>Lead Code Sensei</Header2>
            <Date>July 2023 - May 2024 </Date>
            <Header3>Code Ninjas Aurora</Header3>
            <Content>
              - Initiated new robotics/chess program, directs special events and oversaw digital marketing strategy
            </Content>
          </div>
          
          <div className={styles1.section}>
            <Header1>Awards</Header1>
            <hr className={styles1.line}/>
            <Header2>Schulich Leader Scholarship</Header2>
            <Content>
              Awarded the $100K Schulich Leader Scholarship by the University of Waterloo. 
              Canada's most prestigious STEM undergraduate scholarship.
            </Content>
            <Header2>International Economics Olympiad - Absolute Winner</Header2>
            <Content>
              Placed first overall in 2023 IEO, among competitors from 40+ countries
            </Content>
          </div>
          
          <div className={styles1.section}>
            <Header1>Skills</Header1>
            <hr className={styles1.line}/>
            <Content> 
              C#, Python, Ruby, Java, HTML, CSS, JavaScript, Next.js, React Native 
            </Content>
          </div>
        </div>
      </div>
    </>
  );
}
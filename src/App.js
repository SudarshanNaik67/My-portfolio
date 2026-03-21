import './App.css';

function App() {
  const projects = [
    {
      title: 'Blood Bank Management System',
      description: 'A comprehensive system for managing blood inventory and donations',
      tech: 'HTML • CSS • JavaScript • MySQL'
    },
    {
      title: 'React Portfolio App',
      description: 'Professional portfolio website built with React',
      tech: 'React • JavaScript • CSS'
    },
    {
      title: 'Resume Builder',
      description: 'Interactive tool for creating and customizing professional resumes',
      tech: ' • JAVA • Spring Boot • Thymeleaf'
    },
    {
      title: 'Android Tours And Travels App',
      description: 'Mobile app connecting travelers with tour operators and providing travel information',
      tech: 'Java • Kotlin • Firebase'
    },
    {
      title: 'Expense Tracker',
      description: 'Financial management app for tracking expenses and budgets',
      tech: 'python• Django • SQLite'
    },
    {
      title: 'StudentData Management System',
      description: 'Complete student data management and academic operations',
      tech: 'PHP • MySQL • HTML'
    }
  ];

  const skills = [
    'React',
    'JavaScript',
    'Python',
    'Django',
    'xml',
    'HTML5',
    'CSS3',
    'Java',
    'Kotlin',
    'PHP',
    'MySQL',
    'Firebase',
    'Full Stack Development',
    'Android Development',
    'UI/UX Design'
  ];

  return (
    <div className="App">
      <header className="hero">
        <div className="hero-content">
          <div className="avatar-wrapper">
            <img className="hero-avatar" src="https://avatars.githubusercontent.com/u/195913316?s=400&u=5a87810ab3eb11c836fefa7189d83974b004d18f&v=4" alt="Sudarshan Naik" />
          </div>
          <h1 className="hero-title">Sudarshan Naik</h1>
          <p className="hero-subtitle">Full Stack Developer & Android Specialist</p>
          <p className="hero-description">Creating seamless digital experiences with React, Android, and Full Stack technologies</p>
          <div className="hero-buttons">
            <a href="https://www.linkedin.com/in/sudarshan-naik67" className="btn btn-primary">Get in Touch</a>
            <a href="https://github.com/SudarshanNaik67" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">View GitHub</a>
          </div>
        </div>
      </header>

      <section className="about">
        <h2>About Me</h2>
        <p>I'm a passionate developer with expertise in web and mobile development. I specialize in building responsive web applications with React and developing Android apps. With a strong foundation in full stack development, I create solutions that are user-centric and technically sound.</p>
      </section>

      <section className="skills">
        <h2>Skills & Technologies</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-tag">{skill}</div>
          ))}
        </div>
      </section>

      <section className="projects">
        <h2>Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <p className="project-tech">{project.tech}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <h3>Let's Connect</h3>
        <div className="contact-info">
          <a href="mailto:naiksudarshan898@gmail.com" className="contact-link">📧 naiksudarshan898@gmail.com</a>
          <a href="https://github.com/SudarshanNaik67" target="_blank" rel="noopener noreferrer" className="contact-link">🔗 GitHub Profile</a>
        </div>
        <p className="copyright">© 2026 Sudarshan Naik. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Moon, Sun, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className={`min-h-screen font-mono ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-800'} transition-colors duration-300`}>
      {/* Left Fixed Sidebar */}
      <div className="fixed left-10 bottom-0 hidden lg:block">
        <div className="flex flex-col items-center space-y-4">
          <a href="https://www.linkedin.com/in/ian-wong-gt/" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="hover:-translate-y-1 transition-transform duration-200">
            <Linkedin size={20} />
          </a>
          <a href="mailto:ianwong.gatech@gmail.com"
             className="hover:-translate-y-1 transition-transform duration-200">
            <Mail size={20} />
          </a>
          <div className="w-px h-24 bg-gray-400 mt-4"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-8 lg:px-16 py-24">
        {/* Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
          <nav className={`max-w-5xl mx-auto px-8 lg:px-16 py-6 flex justify-between items-center`}>
            <div className="text-lg font-bold">IW</div>
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex space-x-8">
                {navItems.map((item, index) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`text-sm hover:text-green-400 transition-colors ${
                      activeSection === item.id ? 'text-green-400' : ''
                    }`}
                  >
                    <span className="text-green-400 mr-1">0{index + 1}.</span>
                    {item.label}
                  </a>
                ))}
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center">
          <div className={`space-y-4 transition-all duration-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-green-400 mb-4">Hi, my name is</p>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-100">Ian Wong.</h1>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-400">I build intelligent systems.</h2>
            <p className="max-w-xl text-gray-400 mt-6">
              I'm a computer science graduate student at Georgia Tech specializing in Machine Learning. 
              Currently, I'm focused on developing scalable ML systems and data visualizations.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen py-24">
          <h2 className="text-2xl font-bold mb-8">
            <span className="text-green-400 mr-2">01.</span>
            About Me
          </h2>
          <div className="space-y-4 text-gray-400">
            <p>
              I'm a computer science graduate student passionate about machine learning and data visualization. 
              My background in mathematics and education has given me a unique perspective on problem-solving 
              and explaining complex concepts.
            </p>
            <p>Here are some technologies I've been working with recently:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {['Python', 'C++', 'Java', 'D3.js', 'React', 'Machine Learning', 'Spark', 'AWS'].map((tech) => (
                <div key={tech} className="flex items-center space-x-2">
                  <span className="text-green-400">▹</span>
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="min-h-screen py-24">
          <h2 className="text-2xl font-bold mb-8">
            <span className="text-green-400 mr-2">02.</span>
            Experience
          </h2>
          <div className="space-y-12">
            <div className="group">
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-semibold">Graduate Teaching Assistant</h3>
                <p className="text-green-400">@ Georgia Institute of Technology</p>
                <p className="text-sm text-gray-400">August 2024 - Present</p>
                <ul className="space-y-4 mt-4">
                  <li className="flex space-x-2">
                    <span className="text-green-400 flex-shrink-0">▹</span>
                    <span>Led in-person office hours offering one-on-one support for complex CS concepts</span>
                  </li>
                  <li className="flex space-x-2">
                    <span className="text-green-400 flex-shrink-0">▹</span>
                    <span>Optimized and upgraded auto-grader for immediate feedback on assignments</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="group">
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-semibold">Secondary School Teacher</h3>
                <p className="text-green-400">@ Richmond School District</p>
                <p className="text-sm text-gray-400">September 2022 - June 2024</p>
                <ul className="space-y-4 mt-4">
                  <li className="flex space-x-2">
                    <span className="text-green-400 flex-shrink-0">▹</span>
                    <span>Developed curriculum material for advanced mathematics courses</span>
                  </li>
                  <li className="flex space-x-2">
                    <span className="text-green-400 flex-shrink-0">▹</span>
                    <span>Implemented new grading scale tools improving assessment efficiency</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen py-24">
          <h2 className="text-2xl font-bold mb-8">
            <span className="text-green-400 mr-2">03.</span>
            Some Things I've Built
          </h2>
          <div className="space-y-24">
            <div className="group relative grid gap-4">
              <div className="relative">
                <div className={`p-6 rounded-md ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <p className="text-green-400 text-sm mb-2">Featured Project</p>
                  <h3 className="text-xl font-bold mb-4">US Property Price Visualization</h3>
                  <div className="text-gray-400 mb-4">
                    <p>Interactive visualization platform processing millions of property records. 
                    Implemented advanced clustering algorithms and predictive models for real-time analysis.</p>
                  </div>
                  <ul className="flex flex-wrap gap-4 text-sm">
                    <li>Python</li>
                    <li>Spark</li>
                    <li>D3.js</li>
                    <li>Machine Learning</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="group relative grid gap-4">
              <div className="relative">
                <div className={`p-6 rounded-md ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <p className="text-green-400 text-sm mb-2">Featured Project</p>
                  <h3 className="text-xl font-bold mb-4">Fake News Detector</h3>
                  <div className="text-gray-400 mb-4">
                    <p>NLP-powered system achieving 83%+ accuracy in detecting fake news articles. 
                    Implemented Word2Vec embeddings and Random Forest classification.</p>
                  </div>
                  <ul className="flex flex-wrap gap-4 text-sm">
                    <li>Python</li>
                    <li>NLP</li>
                    <li>Streamlit</li>
                    <li>Machine Learning</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen py-24 flex flex-col justify-center items-center text-center">
          <h2 className="text-2xl font-bold mb-8">
            <span className="text-green-400 mr-2">04.</span>
            What's Next?
          </h2>
          <h3 className="text-4xl font-bold mb-4">Get In Touch</h3>
          <p className="max-w-md text-gray-400 mb-8">
            I'm currently looking for new opportunities in machine learning and software development. 
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          <a
            href="mailto:ianwong.gatech@gmail.com"
            className="border-2 border-green-400 text-green-400 px-6 py-4 rounded hover:bg-green-400/10 transition-colors"
          >
            Say Hello
          </a>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-400 py-6">
          <p>Built with React & Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;

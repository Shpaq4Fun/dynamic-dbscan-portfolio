import React from 'react';
import { usePublications } from '../hooks/usePublications';
import './Portfolio.css';

const Portfolio: React.FC = () => {
  const { selectedPublications, recentPublications } = usePublications();

  return (
    <div className="content-wrapper min-h-screen flex items-center justify-center p-4 sm:p-5 lg:p-8">
      <main className="max-w-4xl w-full space-y-8">
        {/* Header Section */}
        <header className="text-center space-y-6 relative" style={{ paddingBottom: '20px' }}>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-4">
            <div className="flex-shrink-0">
              <img
                src="https://scontent-waw2-2.xx.fbcdn.net/v/t39.30808-6/330110123_1386178918806868_3713378071254120577_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=SJNQRNo2UvcQ7kNvwE5LRox&_nc_oc=AdmWriI7PY4R_wyAU0DYDbmhJupCGKEFMrHDc4oWJtiAGnPw7tUXYNvJnR3gAjrxAFk&_nc_zt=23&_nc_ht=scontent-waw2-2.xx&_nc_gid=YNSwfoHIxA5FHlx9Qc0msw&oh=00_AfdxpqZHLp0tedtqKaZR1APkpUJr5tHN6WiO_A4LzsBo4w&oe=68FBDD97"
                alt="Jacek Wodecki's professional profile photo"
                className="w-50 h-70 sm:w-50 sm:h-60 rounded-20px object-cover border-4 border-sky-500/50 shadow-lg"
                id="profile-photo"
              />
            </div>
            <div style={{ textAlign: 'left', padding: '10px' }}>
              <h1 className="text-5xl sm:text-5xl text-white tracking-tight padding-30px">Jacek Wodecki, Ph.D.</h1>
              <p className="text-2xl text-gray-300" style={{ paddingTop: '10px' }}>Assistant Professor</p>
              <p className="text-2xl text-gray-300" style={{ paddingTop: '10px' }}>Wrocław University of Science and Technology</p>
              <p className="text-2xl text-gray-300" style={{ paddingTop: '10px' }}>
                <a href="https://dmc.pwr.edu.pl/" className="publication-link text-2xl highlight-text font-semibold">
                  Digital Mining Center
                </a>
              </p>
            </div>
          </div>
        </header>

        {/* About Me Section */}
        <section id="about" className="section-card">
          <h2 className="text-3xl text-white mb-6 border-b-2 border-sky-500/30 pb-2">About Me</h2>
          <p className="text-lg leading-relaxed text-gray-300">
            I am a researcher and teacher at the Faculty of Geoengineering, Mining and Geology at Wrocław University of Science and Technology. My work is centered on the challenges of <span className="highlight-text">multidimensional data analysis</span> and <span className="highlight-text">advanced signal processing</span>. I focus on developing novel methods for fault detection and condition monitoring in industrial environments, particularly those characterized by non-Gaussian noise. My passion lies in translating complex data into useful insights, leveraging techniques from <span className="highlight-text">machine learning</span>, <span className="highlight-text">algebra</span> and <span className="highlight-text">statistical analysis</span> to enhance the reliability and efficiency of industrial machinery.
          </p>
        </section>

        {/* Research Interests Section */}
        <section id="research" className="section-card">
          <h2 className="text-3xl text-white mb-4 border-b-2 border-sky-500/30 pb-2">Research Interests</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
            <div className="bg-gray-600/30 p-3 rounded-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-3 highlight-text">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
              <span>Advanced Signal Processing</span>
            </div>
            <div className="bg-gray-600/30 p-3 rounded-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-3 highlight-text">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
              <span>Machine Learning & AI</span>
            </div>
            <div className="bg-gray-600/30 p-3 rounded-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-3 highlight-text">
                <path d="M12 1a2.828 2.828 0 0 0-2 4.828L3 13v6a2 2 0 0 0 2 2h6l7.172-7.172A2.828 2.828 0 0 0 12 1z"></path>
                <path d="m18 13-1.5-1.5"></path>
              </svg>
              <span>Condition Monitoring & Diagnostics</span>
            </div>
            <div className="bg-gray-600/30 p-3 rounded-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-3 highlight-text">
                <path d="M11.614,25.866c-0.557,0-1.039-0.248-1.152-0.793L8.901,17.6l-1.028,1.774c-0.211,0.359-0.597,0.613-1.012,0.613H1.176 C0.527,19.987,0,19.46,0,18.813c0-0.65,0.527-1.178,1.176-1.178h5.013l2.235-3.777c0.247-0.417,0.721-0.644,1.205-0.562 c0.479,0.08,0.86,0.446,0.958,0.921l0.945,4.566l2.155-11.956c0.101-0.56,0.588-0.949,1.158-0.949c0.001,0,0.004,0,0.005,0 c0.571,0,1.058,0.396,1.154,0.958l2.3,13.421l0.74-1.875c0.176-0.45,0.61-0.749,1.093-0.749H30.57 c0.649,0,1.176,0.526,1.176,1.177c0,0.648-0.526,1.176-1.176,1.176h-9.635l-1.99,5.029c-0.192,0.49-0.682,0.787-1.215,0.737 c-0.522-0.056-0.947-0.452-1.037-0.972l-1.876-10.965l-2.046,11.225c-0.1,0.555-0.579,0.824-1.142,0.824 C11.624,25.866,11.619,25.866,11.614,25.866z"></path>
              </svg>
              <span>Non-Gaussian Data Analysis</span>
            </div>
            <div className="bg-gray-600/30 p-3 rounded-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-3 highlight-text">
                <path d="M9.25 4V20M14.75 4V20M4 14.75H20M4 9.25H20M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Multidimensional Data Processing</span>
            </div>
          </div>
        </section>

        {/* Selected Publications Section */}
        <section id="publications" className="section-card">
          <h2 className="text-3xl text-white mb-4 border-b-2 border-sky-500/30 pb-2">Most Cited Publications</h2>
          <ul className="space-y-4 text-gray-300">
            {selectedPublications.map((pub, index) => {
              // Highlight your name in the author list
              const highlightedAuthors = pub.authors.replace('J Wodecki', '<strong className="highlight-text">J Wodecki</strong>');

              return (
                <li key={index}>
                  <p className="font-semibold text-lg text-white">{pub.title}</p>
                  <p className="text-sm">
                    <span dangerouslySetInnerHTML={{ __html: highlightedAuthors }} />
                    . <em className="text-gray-400">{pub.source}</em>
                  </p>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 text-center">
            <a href="https://scholar.google.com/citations?user=aPdWgQ8AAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="publication-link text-lg highlight-text font-semibold">
              View all publications on Google Scholar &rarr;
            </a>
          </div>
        </section>

        {/* Most Recent Publications Section */}
        <section id="recent-publications" className="section-card">
          <h2 className="text-3xl text-white mb-4 border-b-2 border-sky-500/30 pb-2">Recent Publications</h2>
          <ul className="space-y-4 text-gray-300">
            {recentPublications.map((pub, index) => {
              // Highlight your name in the author list
              const highlightedAuthors = pub.authors.replace('J Wodecki', '<strong className="highlight-text">J Wodecki</strong>');

              return (
                <li key={index}>
                  <p className="font-semibold text-lg text-white">{pub.title}</p>
                  <p className="text-sm">
                    <span dangerouslySetInnerHTML={{ __html: highlightedAuthors }} />
                    . <em className="text-gray-400">{pub.source}</em>
                  </p>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Contact Section */}
        <footer className="text-center text-gray-400 space-y-4 pt-8">
          <p>Get in touch:</p>
          <div className="flex items-center justify-center space-x-6">
            <a href="mailto:jacek.wodecki@pwr.edu.pl" className="social-link flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              <span>Email</span>
            </a>
            <a href="https://scholar.google.com/citations?user=aPdWgQ8AAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="social-link flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14z"></path>
                <path d="M12 3v1"></path>
                <path d="m6.6 5.2-1.4 1.4"></path>
                <path d="M2 12h1"></path>
                <path d="m6.6 18.8 1.4-1.4"></path>
                <path d="m12 20.5 2.8-5"></path>
                <path d="m17.4 18.8 1.4 1.4"></path>
                <path d="M22 12h-1"></path>
                <path d="m17.4 5.2-1.4-1.4"></path>
              </svg>
              <span>Google Scholar</span>
            </a>
            <a href="https://dmc.pwr.edu.pl" target="_blank" rel="noopener noreferrer" className="social-link flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                <path d="M2 12h20"></path>
              </svg>
              <span>Digital Mining Center</span>
            </a>
          </div>
          <p className="text-sm pt-4">&copy; 2025 Jacek Wodecki. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default Portfolio;
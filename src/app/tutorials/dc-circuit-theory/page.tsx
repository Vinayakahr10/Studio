
"use client"; // Required for using next/head for arbitrary head tags like CDN links

import Head from 'next/head';
import './style.css'; // Import page-specific CSS

// Metadata for title can be exported statically if this wasn't a client component.
// For client components, you'd typically manage title dynamically if needed, or rely on parent layout.
// For simplicity and to match the provided HTML's title, we'll include it via Head.

export default function DCCircuitsTutorialPage() {
  // Note: The mobile menu button (<button class="mobile-menu-btn">) is included
  // but will not be functional as no JavaScript for it was provided.
  return (
    <>
      <Head>
        <title>DC Circuits Tutorial</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </Head>
      
      <div className="dc-circuits-tutorial-container"> {/* Wrapper to help scope styles if needed or for structure */}
        <nav>
          <div className="nav-container">
            <a href="#" className="logo">
              <i className="fas fa-bolt"></i>
              DC Circuits
            </a>
            <ul className="nav-links">
              <li><a href="#introduction">Introduction</a></li>
              <li><a href="#topics">Topics</a></li>
              <li><a href="#learning-path">Learning Path</a></li>
              <li><a href="#interactive">Interactive</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
            <button className="mobile-menu-btn">
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </nav>

        <header>
          <div className="container header-content">
            <h1>Master DC Circuit Theory</h1>
            <p>A comprehensive guide to understanding and analyzing DC circuits from fundamentals to advanced techniques</p>
          </div>
        </header>

        <main className="container main-content">
          <section id="introduction" className="intro-section">
            <h2>Introduction to DC Circuits</h2>
            <p>Welcome to the DC Circuit Theory tutorial! This comprehensive guide covers everything from basic electrical concepts to advanced circuit analysis techniques. Whether you&apos;re a student, hobbyist, or professional, you&apos;ll find detailed explanations, interactive examples, and practical problems to enhance your understanding.</p>
            <p>Direct Current (DC) circuits form the foundation of electrical engineering and are essential to understand before moving on to more complex topics. In these tutorials, we&apos;ll explore the fundamental laws, components, and analysis methods that govern DC circuit behavior.</p>
            <p>Each topic includes detailed explanations, circuit diagrams, example problems with step-by-step solutions, and interactive elements to help reinforce your learning.</p>
          </section>

          <section id="learning-path" className="learning-path">
            <h2>Recommended Learning Path</h2>
            <p>To get the most out of this tutorial, we recommend following these topics in sequence:</p>
            
            <div className="path-container">
              <div className="path-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Foundation</h3>
                  <p>Start with DC Circuit Theory, Electrical Units, and Ohm&apos;s Law to build a solid foundation.</p>
                </div>
              </div>
              
              <div className="path-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Sources and Laws</h3>
                  <p>Learn about Voltage Sources, Current Sources, and Kirchhoff&apos;s Laws.</p>
                </div>
              </div>
              
              <div className="path-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Circuit Configurations</h3>
                  <p>Study Series, Parallel, and Combination Circuits along with Voltage and Current Dividers.</p>
                </div>
              </div>
              
              <div className="path-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Analysis Techniques</h3>
                  <p>Master Mesh Current and Nodal Voltage Analysis techniques.</p>
                </div>
              </div>
              
              <div className="path-step">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h3>Theorems and Transformations</h3>
                  <p>Apply Thevenin&apos;s, Norton&apos;s, and Superposition Theorems, along with Star-Delta Transformations.</p>
                </div>
              </div>
            </div>
          </section>
          
          <h2 id="topics">DC Circuit Topics</h2>
          <div className="topics-container">
            <div className="topic-card">
              <h3>1. DC Circuit Theory</h3>
              <p>Introduction to direct current, circuit elements, and basic electrical principles that govern DC circuits.</p>
              <div className="card-footer">
                <a href="#" className="btn">Learn More</a>
                <span className="difficulty beginner">Beginner</span>
              </div>
            </div>
            
            <div className="topic-card">
              <h3>2. Electrical Units of Measure</h3>
              <p>Understanding voltage, current, resistance, and power units in electrical engineering.</p>
              <div className="card-footer">
                <a href="#" className="btn">Learn More</a>
                <span className="difficulty beginner">Beginner</span>
              </div>
            </div>
            
            <div className="topic-card">
              <h3>3. Ohm&apos;s Law and Power</h3>
              <p>The fundamental relationship between voltage, current, and resistance, along with electrical power calculations.</p>
              <div className="card-footer">
                <a href="#" className="btn">Learn More</a>
                <span className="difficulty beginner">Beginner</span>
              </div>
            </div>
            
            <div className="topic-card">
              <h3>4. Electrical Energy and Power</h3>
              <p>Concepts of electrical energy, power consumption, efficiency, and energy conversion in DC circuits.</p>
              <div className="card-footer">
                <a href="#" className="btn">Learn More</a>
                <span className="difficulty beginner">Beginner</span>
              </div>
            </div>
            
            <div className="topic-card">
              <h3>5. Voltage Sources</h3>
              <p>Ideal and real voltage sources, internal resistance, and voltage source models in circuit analysis.</p>
              <div className="card-footer">
                <a href="#" className="btn">Learn More</a>
                <span className="difficulty beginner">Beginner</span>
              </div>
            </div>
            
            <div className="topic-card">
              <h3>6. Current Sources</h3>
              <p>Ideal and real current sources, internal resistance, and current source models in circuit analysis.</p>
              <div className="card-footer">
                <a href="#" className="btn">Learn More</a>
                <span className="difficulty beginner">Beginner</span>
              </div>
            </div>
            
            <div className="topic-card">
              <h3>7. Kirchhoff&apos;s Circuit Laws</h3>
              <p>General introduction to Kirchhoff&apos;s fundamental circuit laws and their applications.</p>
              <div className="card-footer">
                <a href="#" className="btn">Learn More</a>
                <span className="difficulty intermediate">Intermediate</span>
              </div>
            </div>
            
            <div className="topic-card">
              <h3>8. Kirchhoff&apos;s Current Law (KCL)</h3>
              <p>In-depth exploration of KCL, node analysis, and current conservation in circuits.</p>
              <div className="card-footer">
                <a href="#" className="btn">Learn More</a>
                <span className="difficulty intermediate">Intermediate</span>
              </div>
            </div>
            
            <div className="topic-card">
              <h3>9. Kirchhoff&apos;s Voltage Law (KVL)</h3>
              <p>Detailed explanation of KVL, loop analysis, and voltage conservation in circuits.</p>
              <div className="card-footer">
                <a href="#" className="btn">Learn More</a>
                <span className="difficulty intermediate">Intermediate</span>
              </div>
            </div>
            
            <div className="topic-card">
              <h3>10. Voltage Divider</h3>
              <p>Understanding voltage division in series circuits and practical applications of voltage dividers.</p>
              <div className="card-footer">
                <a href="#" className="btn">Learn More</a>
                <span className="difficulty intermediate">Intermediate</span>
              </div>
            </div>
            
            <div className="topic-card">
              <h3>11. Current Divider</h3>
              <p>Understanding current division in parallel circuits and practical applications of current dividers.</p>
              <div className="card-footer">
                <a href="#" className="btn">Learn More</a>
                <span className="difficulty intermediate">Intermediate</span>
              </div>
            </div>
            
            <div className="topic-card">
              <h3>12. DC Series Circuit</h3>
              <p>Analysis of series-connected components, equivalent resistance, and voltage distribution.</p>
              <div className="card-footer">
                <a href="#" className="btn">Learn More</a>
                <span className="difficulty intermediate">Intermediate</span>
              </div>
            </div>
            
            <div className="topic-card">
              <h3>13. DC Parallel Circuit</h3>
              <p>Analysis of parallel-connected components, equivalent resistance, and current distribution.</p>
              <div className="card-footer">
                <a href="#" className="btn">Learn More</a>
                <span className="difficulty intermediate">Intermediate</span>
              </div>
            </div>
            
            <div className="topic-card">
              <h3>14. Combination Series and Parallel Circuits</h3>
              <p>Analysis techniques for circuits with both series and parallel connections.</p>
              <div className="card-footer">
                <a href="#" className="btn">Learn More</a>
                <span className="difficulty intermediate">Intermediate</span>
              </div>
            </div>
            
            <div className="topic-card">
              <h3>15. Star-Delta Transformation</h3>
              <p>Methods to convert between star (Y) and delta (Δ) configurations to simplify circuit analysis.</p>
              <div className="card-footer">
                <a href="#" className="btn">Learn More</a>
                <span className="difficulty advanced">Advanced</span>
              </div>
            </div>
            
            <div className="topic-card">
              <h3>16. Mesh Current Analysis</h3>
              <p>Systematic approach to solve circuits by analyzing mesh currents and applying KVL.</p>
              <div className="card-footer">
                <a href="#" className="btn">Learn More</a>
                <span className="difficulty advanced">Advanced</span>
              </div>
            </div>
            
            <div className="topic-card">
              <h3>17. Nodal Voltage Analysis</h3>
              <p>Systematic approach to solve circuits by analyzing node voltages and applying KCL.</p>
              <div className="card-footer">
                <a href="#" className="btn">Learn More</a>
                <span className="difficulty advanced">Advanced</span>
              </div>
            </div>
            
            <div className="topic-card">
              <h3>18. Thevenin&apos;s Theorem</h3>
              <p>Simplifying complex circuits into an equivalent voltage source and series resistance.</p>
              <div className="card-footer">
                <a href="#" className="btn">Learn More</a>
                <span className="difficulty advanced">Advanced</span>
              </div>
            </div>
            
            <div className="topic-card">
              <h3>19. Norton&apos;s Theorem</h3>
              <p>Simplifying complex circuits into an equivalent current source and parallel resistance.</p>
              <div className="card-footer">
                <a href="#" className="btn">Learn More</a>
                <span className="difficulty advanced">Advanced</span>
              </div>
            </div>
            
            <div className="topic-card">
              <h3>20. Superposition Theorem</h3>
              <p>Analyzing circuits with multiple sources by considering one source at a time.</p>
              <div className="card-footer">
                <a href="#" className="btn">Learn More</a>
                <span className="difficulty advanced">Advanced</span>
              </div>
            </div>
            
            <div className="topic-card">
              <h3>21. Maximum Power Transfer</h3>
              <p>Conditions for transferring maximum power from a source to a load in DC circuits.</p>
              <div className="card-footer">
                <a href="#" className="btn">Learn More</a>
                <span className="difficulty advanced">Advanced</span>
              </div>
            </div>
          </div>
        </main>
        
        <footer>
          <div className="footer-content">
            <div className="footer-section">
              <h3>About DC Circuits</h3>
              <p>This tutorial provides in-depth explanations of DC circuit principles and analysis methods.</p>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><a href="#introduction">Introduction</a></li>
                <li><a href="#topics">Topics</a></li>
                <li><a href="#learning-path">Learning Path</a></li>
                <li><a href="#interactive">Interactive</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Contact</h3>
              <p>Email: vinayakahr10.com</p> {/* Assuming this was a placeholder for an email */}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

    
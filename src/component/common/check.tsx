import React, { useRef, useEffect, useState } from 'react';

const App = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state based on whether the section is intersecting the viewport
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, // Adjust this threshold as needed
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    // Cleanup function
    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <div>
      <section ref={sectionRef} style={{ marginTop: isVisible ? '90px' : '0' }}>
        {/* Your section content here */}
      </section>
    </div>
  );
}

export default App;

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useInView } from 'react-intersection-observer';
import CertificateCard from './CertificateCard';
import { certificates } from '@/data/certificates';

const CertificatesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && sectionRef.current) {
      gsap.fromTo('.certificates-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, [inView]);

  return (
    <section id="certificates" ref={ref} className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div ref={sectionRef}>
          <h2 className="certificates-title text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
            Licenses & Certificates
          </h2>
          
          <p className="text-center text-gray-300 text-lg mb-12 max-w-3xl mx-auto">
            Professional certifications, licenses, and awards that validate my expertise 
            in modern web development, cloud technologies, and innovative design solutions.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {certificates.map((certificate, index) => (
              <CertificateCard key={certificate.id} certificate={certificate} index={index} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <div className="glass p-8 rounded-2xl glow inline-block">
              <h3 className="text-2xl font-bold text-white mb-4">Continuous Learning</h3>
              <p className="text-gray-300 max-w-2xl">
                I'm committed to staying current with the latest technologies and best practices. 
                These certifications represent my dedication to professional growth and excellence 
                in delivering cutting-edge solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;

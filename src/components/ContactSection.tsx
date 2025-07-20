import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, Twitter, Globe } from 'lucide-react';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_8a365m8';
const TEMPLATE_ID = 'template_90tvjur';
const PUBLIC_KEY = 'dil8RwbfRTwBTd0zc';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView && sectionRef.current) {
      const tl = gsap.timeline();

      // Floating particles animation
      gsap.to('.floating-particle', {
        y: 20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.2,
          from: 'random'
        }
      });

      // Main section animation
      tl.fromTo('.contact-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
      .fromTo('.contact-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo('.contact-form',
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo('.contact-info',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo('.contact-info-item',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.4'
      )
      .fromTo('.social-icon',
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, stagger: 0.1, duration: 0.5, ease: 'back.out(1.7)' },
        '-=0.4'
      );
    }
  }, [inView]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formRef.current) return;

      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);

      setShowSuccess(true);
      toast.success("🚀 Message sent! I'll get back to you soon.");
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success animation after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error('EmailJS error:', err);
      toast.error('❌ Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'Mohammedafreedhi6@gmail.com',
      href: 'mailto:Mohammedafreedhi06@gmail.com',
      overlayGradient: 'linear-gradient(to right, rgba(6,182,212,0) 0%, rgba(6,182,212,0.2) 50%, rgba(6,182,212,0) 100%)',
      borderColor: 'border-cyan-500/30',
      hoverBorderColor: 'group-hover:border-cyan-500/80',
      lineColor: 'bg-cyan-400',
      hoverLineColor: 'group-hover:bg-cyan-300'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 7012561431',
      href: 'tel:+917012561431',
      overlayGradient: 'linear-gradient(to right, rgba(16,185,129,0) 0%, rgba(16,185,129,0.2) 50%, rgba(16,185,129,0) 100%)',
      borderColor: 'border-emerald-500/30',
      hoverBorderColor: 'group-hover:border-emerald-500/80',
      lineColor: 'bg-emerald-400',
      hoverLineColor: 'group-hover:bg-emerald-300'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Koduvayur, Palakkad, Kerala',
      href: 'https://www.google.com/maps/place/Koduvayur+-+Palakkad+Rd,+Koduvayur,+Kerala+678501/@10.68787,76.660252,15z',
      overlayGradient: 'linear-gradient(to right, rgba(244,63,94,0) 0%, rgba(244,63,94,0.2) 50%, rgba(244,63,94,0) 100%)',
      borderColor: 'border-rose-500/30',
      hoverBorderColor: 'group-hover:border-rose-500/80',
      lineColor: 'bg-rose-400',
      hoverLineColor: 'group-hover:bg-rose-300'
    }
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/mohammed-afreedhi/',
      overlayGradient: 'linear-gradient(to right, rgba(59,130,246,0) 0%, rgba(59,130,246,0.2) 50%, rgba(59,130,246,0) 100%)',
      borderColor: 'border-blue-500/30',
      hoverBorderColor: 'group-hover:border-blue-500/80',
      label: 'LinkedIn'
    },
    {
      icon: Github,
      href: 'https://github.com/MOHAMMEDAFREEDHI',
      overlayGradient: 'linear-gradient(to right, rgba(107,114,128,0) 0%, rgba(107,114,128,0.2) 50%, rgba(107,114,128,0) 100%)',
      borderColor: 'border-gray-500/30',
      hoverBorderColor: 'group-hover:border-gray-500/80',
      label: 'GitHub'
    },
    {
      icon: Instagram,
      href: 'https://www.instagram.com/afreedhiansari/',
      overlayGradient: 'linear-gradient(to right, rgba(236,72,153,0) 0%, rgba(236,72,153,0.2) 50%, rgba(236,72,153,0) 100%)',
      borderColor: 'border-pink-500/30',
      hoverBorderColor: 'group-hover:border-pink-500/80',
      label: 'Instagram'
    },
    {
      icon: Twitter,
      href: 'https://twitter.com/afreedhiansari',
      overlayGradient: 'linear-gradient(to right, rgba(56,189,248,0) 0%, rgba(56,189,248,0.2) 50%, rgba(56,189,248,0) 100%)',
      borderColor: 'border-sky-500/30',
      hoverBorderColor: 'group-hover:border-sky-500/80',
      label: 'Twitter'
    },
    {
      icon: Globe,
      href: 'https://afreedhi-portfolio.vercel.app/',
      overlayGradient: 'linear-gradient(to right, rgba(99,102,241,0) 0%, rgba(99,102,241,0.2) 50%, rgba(99,102,241,0) 100%)',
      borderColor: 'border-indigo-500/30',
      hoverBorderColor: 'group-hover:border-indigo-500/80',
      label: 'Portfolio'
    }
  ];

  return (
    <section id="contact" ref={ref} className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-[#05051f] via-[#0a0a30] to-[#020217]">
      {/* Success Animation */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
          <div className="relative z-10 text-center p-8 max-w-md">
            <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">Success!</h3>
            <p className="text-gray-200 text-lg">Your message has been sent successfully</p>
          </div>
        </div>
      )}
      
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <div 
          key={i}
          className="floating-particle absolute rounded-full opacity-10"
          style={{
            width: `${Math.random() * 20 + 5}px`,
            height: `${Math.random() * 20 + 5}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, 
              ${i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#ec4899' : '#3b82f6'}, 
              transparent)`
          }}
        />
      ))}
      
      {/* Background Gradient */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-500 rounded-full mix-blend-soft-light filter blur-[100px] opacity-30 animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-soft-light filter blur-[120px] opacity-20 animate-pulse-slower"></div>
      </div>

      {/* Geometric grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:40px_40px]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={sectionRef}>
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="contact-title text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Get in Touch
            </h2>
            
            <div className="relative inline-block">
              <p className="contact-subtitle relative z-10 max-w-3xl mx-auto">
                <span className="text-lg md:text-xl block text-center">
                  <span className="inline-flex flex-col sm:flex-row sm:items-center gap-1.5">
                    <span className="text-gray-300 font-light tracking-wide">
                      Got an idea? 
                    </span>
                    
                    <span className="relative inline-block group cursor-pointer">
                      <span className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 via-cyan-400/40 to-emerald-500/30 
                                      rounded-xl blur-sm opacity-70 group-hover:opacity-100 group-hover:blur-md
                                      transition-all duration-500"></span>
                      <span className="relative text-transparent bg-clip-text 
                                      bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400
                                      font-medium tracking-tight
                                      group-hover:bg-[length:200%] group-hover:animate-pulse-shift
                                      bg-[length:100%] transition-all duration-700">
                        Let's build something futuristic together!
                      </span>
                    </span>
                  </span>
                  
                  <span className="mt-3 block text-gray-400 text-base md:text-lg leading-relaxed 
                                  bg-gradient-to-r from-gray-700/0 via-gray-700/40 to-gray-700/0
                                  py-2 px-4 rounded-lg backdrop-blur-sm">
                    Reach out through the form or connect via details below. ↓
                  </span>
                </span>
                
                {/* Animated elements */}
                <span className="absolute -top-4 -left-4 w-3 h-3 rounded-full bg-cyan-400/80 
                                animate-pulse [animation-delay:-2s]"></span>
                <span className="absolute -bottom-4 -right-4 w-2 h-2 rounded-full bg-blue-400/80 
                                animate-pulse [animation-delay:-1.5s]"></span>
              </p>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/30 via-cyan-500/30 to-pink-500/30 rounded-full"></div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="contact-form">
              <div className="glass p-8 rounded-3xl backdrop-blur-xl shadow-2xl border border-white/10 relative overflow-hidden">
                {/* Form background elements */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600 rounded-full mix-blend-soft-light filter blur-[80px] opacity-20"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-600 rounded-full mix-blend-soft-light filter blur-[80px] opacity-20"></div>
                
                <h3 className="text-2xl font-bold text-white mb-6 relative z-10">
                  Send a Message
                  <div className="w-15 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mt-2"></div>
                </h3>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="group">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="input-field w-full bg-gray-900/60 border border-gray-700/50 rounded-xl py-4 px-5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                      />
                      <div className="h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mt-1 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"></div>
                    </div>
                    <div className="group">
                      <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="input-field w-full bg-gray-900/60 border border-gray-700/50 rounded-xl py-4 px-5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                      />
                      <div className="h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mt-1 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"></div>
                    </div>
                  </div>
                  <div className="group">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="input-field w-full bg-gray-900/60 border border-gray-700/50 rounded-xl py-4 px-5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                    <div className="h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mt-1 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"></div>
                  </div>
                  <div className="group">
                    <textarea
                      name="message"
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="input-field w-full resize-none bg-gray-900/60 border border-gray-700/50 rounded-xl py-4 px-5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    ></textarea>
                    <div className="h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mt-1 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"></div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full py-4 bg-gradient-to-r from-[#0a192f] to-[#0f3460] border border-cyan-500/30 rounded-xl text-gray-200 font-semibold text-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center disabled:opacity-50 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={20} className="mr-2" /> 
                          Send Message
                        </>
                      )}
                    </span>
                    <div className="ml-3 h-px w-8 bg-cyan-400 transition-all duration-500 group-hover:w-12 group-hover:bg-cyan-300"></div>
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-x-full group-hover:translate-x-0"
                      style={{ 
                        background: 'linear-gradient(to right, rgba(6,182,212,0) 0%, rgba(6,182,212,0.2) 50%, rgba(6,182,212,0) 100%)' 
                      }}
                    ></div>
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info and Map */}
            <div className="contact-info space-y-8">
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`contact-info-item group relative flex items-center p-4 bg-gradient-to-r from-[#0a192f] to-[#0f3460] ${item.borderColor} rounded-xl backdrop-blur-sm transition-all duration-500 ${item.hoverBorderColor} hover:scale-[1.05] overflow-hidden`}
                  >
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-full group-hover:translate-x-0 z-0"
                      style={{ background: item.overlayGradient }}
                    ></div>
                    <div className="relative z-10 flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <item.icon size={20} className="text-gray-300 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{item.title}</h4>
                        <p className="text-gray-300 group-hover:text-white transition-colors">{item.value}</p>
                      </div>
                    </div>
                    <div className={`ml-3 h-px w-8 ${item.lineColor} transition-all duration-500 group-hover:w-12 ${item.hoverLineColor}`}></div>
                  </a>
                ))}
              </div>

              {/* Google Map */}
              <div className="glass p-4 rounded-3xl backdrop-blur-xl shadow-2xl border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">My Location</h3>
                <div className="w-full h-64 rounded-xl overflow-hidden border-2 border-purple-600/30 shadow-xl relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 z-10 pointer-events-none"></div>
                  <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.1384639556974!2d76.6576771!3d10.6878753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba812b45b66c267:0x396048fccdc5cb06!2sKoduvayur%20-%20Palakkad%20Rd%2C%20Koduvayur%2C%20Kerala%20678501!5e0!3m2!1sen!2sin!4v1688323611184!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="relative z-0"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Let's Connect Section */}
          <div className="mt-16 text-center">
            <h3 className="text-3xl font-bold text-white mb-6">Let's Connect</h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Feel free to reach out through any of these platforms. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-icon group relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 overflow-hidden border ${social.borderColor} ${social.hoverBorderColor}`}
                  aria-label={social.label}
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-full group-hover:translate-x-0 z-0"
                    style={{ background: social.overlayGradient }}
                  ></div>
                  
                  <div className="relative z-10 transform transition-all duration-300 group-hover:scale-110">
                    <social.icon 
                      size={32} 
                      className="text-gray-300 group-hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
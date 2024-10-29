import React from 'react';
import { motion } from 'framer-motion';
import CallToAction from '../components/CallToAction';

const About: React.FC = () => {
  const founders = [
    {
      name: "Ofek Salama",
      title: "CEO & Co-Founder",
      profilePicture: "/ofek.jpeg",
      linkedin: "https://www.linkedin.com/in/ofek-salama-a18012154/",
    },
    {
      name: "Tehila Pelled",
      title: "CTO & Co-Founder",
      profilePicture: "/tehila.jpeg",
      linkedin: "https://www.linkedin.com/in/tehila-pelled-7aa43a148/",
    },
    {
      name: "Naama Schwartz",
      title: "CPO & Co-Founder",
      profilePicture: "/naama.jpeg",
      linkedin: "https://www.linkedin.com/in/naama-schwartz-956563172/",
    },
    {
      name: "Ziv Bakhajian",
      title: "VP R&D & Co-Founder",
      profilePicture: "/ziv.jpeg",
      linkedin: "https://www.linkedin.com/in/ziv-bakhajian-199b60175/",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <section className="pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto space-y-16">
          {/* Hero Section with Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl sm:text-6xl md:text-6xl font-bold tracking-tight mb-2 gradient-text py-2"
            >
              About Catalyzator
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl sm:text-2xl mb-2 text-crazy-orange"
            >
              <span className="font-bold">Transforming</span> Innovation Funding
            </motion.p>
          </motion.div>

          {/* Main Content Section - Styled like AppShowcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto mb-24"
          >
            <div className="rounded-3xl p-12 shadow-lg relative z-10 bg-gradient-to-r from-soft-orange to-crazy-orange">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-2xl leading-relaxed text-white">
                  <span className="font-bold">Catalyzator</span> is transforming the landscape of innovation funding by creating an AI-driven <span className="font-bold">Pitch-to-Grant OS</span> that replaces complex, rigid application processes with an intuitive, conversational experience.
                </p>
                
                <p className="text-xl leading-relaxed text-white/90">
                  Founded in Tel Aviv, we envisioned a future where funding is streamlined, transparent, and tailored to innovation's dynamic nature. Our system intelligently matches startups to optimal funding pathways, equips venture funds and accelerators with real-time market insights, and empowers grant programs to evolve as proactive catalysts for change.
                </p>

                <p className="text-xl leading-relaxed text-white/90">
                  Built on a sophisticated AI architecture, Catalyzator doesn't just process applications—it recognizes narratives, maps the DNA of successful ventures, and provides actionable insights for both funders and founders.
                </p>

                <p className="text-xl leading-relaxed font-semibold text-cool-purple">
                  Today, we're focused on simplifying grants; tomorrow, we'll connect all forms of innovation funding, from grants and venture capital to impact investments, ensuring every transformative idea finds the resources to thrive.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Team Section - Now with hover cards */}
          <div className="space-y-8 text-center">
            <h2 className="text-4xl font-bold text-purple-900">The Catalyzators</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {founders.map((founder, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <img 
                    src={founder.profilePicture}
                    alt={founder.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-purple-900">{founder.name}</h3>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-crazy-orange font-medium">{founder.title}</p>
                    <a 
                      href={founder.linkedin}
                      className="text-purple-600 hover:text-crazy-orange"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <CallToAction />
        </div>
      </section>
    </div>
  );
};

export default About;
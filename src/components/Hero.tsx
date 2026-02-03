import { motion } from 'framer-motion';
import { ArrowRight, Github, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="pt-48 pb-24 px-6 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 -z-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full mb-10 shadow-lg shadow-indigo-500/30"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-black uppercase tracking-widest">Version 3.0 Now Available</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9]"
        >
          Ship your SaaS{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            lightning fast
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 font-medium leading-relaxed"
        >
          The ultimate React + Vite + Vercel starter kit. Auth, dashboard, animations, and production-ready configs included.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <button className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-[2rem] text-lg hover:shadow-xl hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-3 active:scale-95">
            Get Started Free <ArrowRight />
          </button>
          <button className="w-full md:w-auto px-10 py-5 bg-white text-gray-900 border-2 border-gray-200 font-black rounded-[2rem] text-lg hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-3">
            <Github className="w-5 h-5" /> View on GitHub
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { value: '10K+', label: 'GitHub Stars' },
            { value: '5K+', label: 'Deployments' },
            { value: '99.9%', label: 'Uptime' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 font-semibold mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

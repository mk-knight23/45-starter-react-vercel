import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Cloud, Shield, Zap, Globe, Users, Menu, X, Github } from 'lucide-react';
import { useState } from 'react';

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const features = [
        { title: "Cloud Scale", icon: <Cloud className="w-6 h-6" />, desc: "Deploy globally on edge with zero configuration." },
        { title: "Bank-Grade Security", icon: <Shield className="w-6 h-6" />, desc: "Enterprise level encryption for all your data." },
        { title: "Lightning Fast", icon: <Zap className="w-6 h-6" />, desc: "Optimized for speed and performance everywhere." },
        { title: "Global Network", icon: <Globe className="w-6 h-6" />, desc: "CDN powered delivery for localized experiences." },
    ];

    const pricing = [
        { name: "Starter", price: "0", features: ["1 Project", "Basic Analytics", "Community Support"] },
        { name: "Pro", price: "49", featured: true, features: ["Unlimited Projects", "Advanced AI", "Priority Support"] },
        { name: "Enterprise", price: "Custom", features: ["Custom SLAs", "Dedicated Rep", "SSO/SAML"] },
    ];

    return (
        <div className="min-h-screen">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-[100]">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
                        <Zap className="text-indigo-600 w-8 h-8 fill-indigo-600" />
                        <span>START<span className="text-indigo-600">ER</span></span>
                    </div>

                    <div className="hidden md:flex items-center gap-10">
                        {['Features', 'Pricing', 'Docs', 'About'].map(link => (
                            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest">{link}</a>
                        ))}
                        <button className="px-6 py-3 bg-indigo-600 text-white font-black rounded-xl text-sm hover:bg-indigo-700 transition-all active:scale-95">GET STARTED</button>
                    </div>

                    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-white z-[90] md:hidden pt-32 px-6"
                    >
                        <div className="flex flex-col gap-8 text-center">
                            {['Features', 'Pricing', 'Docs', 'About'].map(link => (
                                <a key={link} href="#" onClick={() => setIsMenuOpen(false)} className="text-3xl font-black">{link}</a>
                            ))}
                            <button className="w-full py-6 bg-indigo-600 text-white font-black rounded-3xl text-xl">GET STARTED</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero */}
            <section className="pt-48 pb-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-indigo-50 rounded-full blur-[120px] -z-10 opacity-50" />

                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full mb-10"
                    >
                        <span className="w-2 h-2 bg-indigo-600 rounded-full animate-ping" />
                        <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Version v2.0 Live Now</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9]"
                    >
                        Deploy at the <br /> <span className="text-indigo-600 italic">speed</span> of thought.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto mb-12 font-medium leading-relaxed"
                    >
                        The ultimate React + Vercel starter kit for creators. All-in-one platform to launch, scale, and thrive in the modern web.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-6"
                    >
                        <button className="w-full md:w-auto px-10 py-5 bg-indigo-600 text-white font-black rounded-[2rem] text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-2xl shadow-indigo-600/30">
                            Launch Now <ArrowRight />
                        </button>
                        <button className="w-full md:w-auto px-10 py-5 bg-white text-slate-900 border border-slate-200 font-black rounded-[2rem] text-lg hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-3">
                            <Github className="w-5 h-5" /> View Repo
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((f, idx) => (
                    <motion.div
                        key={f.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
                    >
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            {f.icon}
                        </div>
                        <h3 className="text-xl font-black mb-3 tracking-tight uppercase">{f.title}</h3>
                        <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
                    </motion.div>
                ))}
            </section>

            {/* Bottom CTA */}
            <section className="py-32 bg-indigo-600 relative overflow-hidden rounded-[4rem] mx-6 mb-24">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <div className="relative z-10 text-center text-white px-6">
                    <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">Ready to join the <br /> future of development?</h2>
                    <button className="px-12 py-6 bg-white text-indigo-600 font-black rounded-[2rem] text-xl hover:bg-indigo-50 transition-all active:scale-95 shadow-2xl">
                        START BUILDING FREE
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-slate-100 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-slate-400 font-bold uppercase tracking-widest text-xs text-center md:text-left">
                    <div>
                        <div className="flex items-center gap-2 font-black text-xl tracking-tighter text-slate-900 mb-4 justify-center md:justify-start">
                            <Zap className="text-indigo-600 w-6 h-6 fill-indigo-600" />
                            <span>START<span className="text-indigo-600">ER</span></span>
                        </div>
                        <p>© 2026 MK-STARTER // DEPLOYMENT OS</p>
                    </div>
                    <div className="flex gap-10">
                        <a href="#" className="hover:text-indigo-600">Privacy</a>
                        <a href="#" className="hover:text-indigo-600">Terms</a>
                        <a href="#" className="hover:text-indigo-600">Twitter</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}


export default App;

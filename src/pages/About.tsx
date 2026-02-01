import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import { Navbar, Footer } from '../components';

const navLinks = [
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
];

const team = [
    {
        name: 'Alex Chen',
        role: 'Founder & CEO',
        bio: 'Former engineer at Vercel. Building the future of deployment.',
    },
    {
        name: 'Sarah Miller',
        role: 'Lead Designer',
        bio: 'Minimalist design advocate. 10+ years in product design.',
    },
    {
        name: 'James Wilson',
        role: 'CTO',
        bio: 'Open source contributor. React core team member.',
    },
];

const milestones = [
    { year: '2024', title: 'Founded', desc: 'Started with a vision to simplify deployment' },
    { year: '2025', title: '10K Users', desc: 'Reached milestone of 10,000 active developers' },
    { year: '2026', title: 'Series A', desc: 'Raised $20M to expand globally' },
];

export function About() {
    return (
        <div className="min-h-screen">
            <Navbar links={navLinks} />

            {/* Hero Section */}
            <section className="pt-48 pb-24 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9]"
                    >
                        Building the <br /> <span className="italic">future</span> of deployment.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-black/40 max-w-3xl mx-auto font-medium leading-relaxed"
                    >
                        We're a team of engineers and designers passionate about making deployment effortless for everyone.
                    </motion.p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 bg-black text-white px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">Our Mission</h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                            To democratize deployment and make it accessible to every developer, regardless of their experience level or budget.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Simplicity', desc: 'Complex problems, simple solutions' },
                            { title: 'Performance', desc: 'Speed is not optional' },
                            { title: 'Accessibility', desc: 'Built for everyone' },
                        ].map((value, idx) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10"
                            >
                                <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">{value.title}</h3>
                                <p className="text-white/60 font-medium leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-black mb-16 tracking-tighter text-center"
                    >
                        Our Journey
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {milestones.map((milestone, idx) => (
                            <motion.div
                                key={milestone.year}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 bg-black/5 rounded-[2.5rem] border border-black/10"
                            >
                                <div className="text-6xl font-black mb-4 tracking-tighter">{milestone.year}</div>
                                <h3 className="text-xl font-black mb-3 tracking-tight uppercase">{milestone.title}</h3>
                                <p className="text-black/50 font-medium leading-relaxed">{milestone.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-24 bg-black text-white px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-black mb-16 tracking-tighter text-center"
                    >
                        Meet the Team
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member, idx) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 text-center"
                            >
                                <div className="w-24 h-24 bg-white/10 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-black">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <h3 className="text-xl font-black mb-2 tracking-tight uppercase">{member.name}</h3>
                                <p className="text-white/60 font-medium mb-4">{member.role}</p>
                                <p className="text-white/40 font-medium leading-relaxed">{member.bio}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-black mb-8 tracking-tighter"
                    >
                        Join us in building <br /> the future.
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row items-center justify-center gap-6"
                    >
                        <button className="w-full md:w-auto px-10 py-5 bg-black text-white font-black rounded-[2rem] text-lg hover:bg-black/80 transition-all flex items-center justify-center gap-3 active:scale-95">
                            View Openings <ArrowRight />
                        </button>
                        <div className="flex gap-4">
                            <a href="#" className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

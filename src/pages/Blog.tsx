import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { Navbar, Footer } from '../components';
import { useState } from 'react';
import { useReducedMotion } from '../utils/accessibility';

const navLinks = [
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
];

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    featured?: boolean;
}

const blogPosts: BlogPost[] = [
    {
        id: '1',
        title: 'The Future of Deployment: What to Expect in 2026',
        excerpt: 'Exploring the latest trends in deployment automation, edge computing, and developer experience improvements.',
        date: '2026-01-15',
        readTime: '8 min',
        category: 'Technology',
        featured: true,
    },
    {
        id: '2',
        title: 'Building Scalable React Applications',
        excerpt: 'Best practices for structuring large-scale React applications with performance and maintainability in mind.',
        date: '2026-01-10',
        readTime: '12 min',
        category: 'Development',
    },
    {
        id: '3',
        title: 'Minimal Design Principles for Modern Web',
        excerpt: 'How to create impactful user experiences using minimalist design principles and thoughtful typography.',
        date: '2026-01-05',
        readTime: '6 min',
        category: 'Design',
    },
    {
        id: '4',
        title: 'Optimizing Vite Build Performance',
        excerpt: 'Advanced techniques to speed up your Vite builds and improve development experience.',
        date: '2025-12-28',
        readTime: '10 min',
        category: 'Performance',
    },
    {
        id: '5',
        title: 'Accessibility First: Building Inclusive Apps',
        excerpt: 'A comprehensive guide to making your web applications accessible to all users.',
        date: '2025-12-20',
        readTime: '15 min',
        category: 'Accessibility',
    },
    {
        id: '6',
        title: 'State Management in React 19',
        excerpt: 'Exploring the new state management patterns and features in React 19.',
        date: '2025-12-15',
        readTime: '9 min',
        category: 'Development',
    },
];

const categories = ['All', 'Technology', 'Development', 'Design', 'Performance', 'Accessibility'];

export function Blog() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const prefersReducedMotion = useReducedMotion();

    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredPost = blogPosts.find(p => p.featured);
    const regularPosts = filteredPosts.filter(p => !p.featured);

    // Animation config that respects reduced motion preference
    const motionConfig = prefersReducedMotion ? {} : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
    };

    return (
        <div className="min-h-screen">
            <Navbar links={navLinks} />

            {/* Hero */}
            <section className="pt-48 pb-24 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9]"
                    >
                        Our <br /> <span className="italic">thoughts</span>.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-black/40 max-w-3xl mx-auto font-medium leading-relaxed"
                    >
                        Insights, tutorials, and stories from our team about building modern web applications.
                    </motion.p>
                </div>
            </section>

            {/* Search and Filter */}
            <section className="py-12 px-6 border-b border-black/10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        {/* Search */}
                        <div className="w-full md:w-96">
                            <label htmlFor="blog-search" className="sr-only">Search articles</label>
                            <input
                                id="blog-search"
                                type="search"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label="Search articles"
                                aria-describedby="search-results-count"
                                className="w-full px-6 py-4 bg-white border-2 border-black/10 rounded-2xl font-medium focus:border-black focus:outline-none transition-colors"
                            />
                            <span id="search-results-count" className="sr-only">
                                {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
                            </span>
                        </div>

                        {/* Categories */}
                        <div className="flex flex-wrap gap-3" role="group" aria-label="Filter by category">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    aria-pressed={selectedCategory === category}
                                    className={`px-6 py-3 font-black rounded-xl text-sm transition-all active:scale-95 ${selectedCategory === category
                                            ? 'bg-black text-white'
                                            : 'bg-white text-black border-2 border-black/10 hover:border-black'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            {featuredPost && (
                <section className="py-16 px-6">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-12 bg-black text-white rounded-[3rem] relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="px-4 py-2 bg-white text-black font-black rounded-full text-xs uppercase tracking-widest">
                                        Featured
                                    </span>
                                    <div className="flex items-center gap-2 text-white/60 font-medium text-sm">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </div>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-tight">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-3xl">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="flex items-center gap-6">
                                    <button className="px-8 py-4 bg-white text-black font-black rounded-2xl text-lg hover:bg-white/90 transition-all flex items-center gap-3 active:scale-95">
                                        Read Article <ArrowRight />
                                    </button>
                                    <div className="flex items-center gap-2 text-white/60 font-medium">
                                        <Clock className="w-4 h-4" />
                                        {featuredPost.readTime} read
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Blog Posts Grid */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    {filteredPosts.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-24"
                            role="status"
                            aria-live="polite"
                        >
                            <p className="text-2xl text-black/40 font-medium">No articles found matching your criteria.</p>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
                            {regularPosts.map((post, idx) => (
                                <motion.article
                                    key={post.id}
                                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                                    whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                                    transition={{ delay: prefersReducedMotion ? 0 : idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="p-8 bg-white border-2 border-black/10 rounded-[2.5rem] hover:border-black transition-all duration-300 group"
                                    role="listitem"
                                    aria-labelledby={`post-${post.id}-title`}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-3 py-1 bg-black/5 font-black rounded-full text-xs uppercase tracking-widest" aria-label={`Category: ${post.category}`}>
                                            {post.category}
                                        </span>
                                    </div>

                                    <h3 id={`post-${post.id}-title`} className="text-2xl font-black mb-4 tracking-tight leading-tight group-hover:underline decoration-2 underline-offset-4">
                                        {post.title}
                                    </h3>

                                    <p className="text-black/50 font-medium mb-6 leading-relaxed line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between pt-6 border-t border-black/10">
                                        <div className="flex items-center gap-4 text-black/40 font-medium text-sm" aria-label={`Published ${new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · ${post.readTime} read`}>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" aria-hidden="true" />
                                                <time dateTime={post.date}>
                                                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </time>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" aria-hidden="true" />
                                                <span>{post.readTime}</span>
                                            </div>
                                        </div>
                                        <button
                                            className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            aria-label={`Read ${post.title}`}
                                        >
                                            <ArrowRight className="w-5 h-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-24 px-6" aria-labelledby="newsletter-heading">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-12 bg-black text-white rounded-[3rem] text-center"
                    >
                        <h2 id="newsletter-heading" className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">
                            Stay Updated
                        </h2>
                        <p className="text-xl text-white/70 mb-8 leading-relaxed">
                            Get the latest articles and insights delivered to your inbox.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                            <input
                                id="newsletter-email"
                                type="email"
                                placeholder="Enter your email"
                                required
                                aria-describedby="newsletter-description"
                                className="flex-1 px-6 py-4 bg-white text-black rounded-2xl font-medium focus:outline-none focus:ring-4 focus:ring-white/20"
                            />
                            <button
                                type="submit"
                                className="px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-white/90 transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/20"
                            >
                                Subscribe
                            </button>
                        </form>
                        <p id="newsletter-description" className="sr-only">
                            Subscribe to our newsletter to receive the latest articles and insights.
                        </p>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

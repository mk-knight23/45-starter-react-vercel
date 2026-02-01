import { Navbar, Hero, Features, Pricing, CTA, Footer } from '../components';

const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

export function Home() {
    return (
        <div className="min-h-screen">
            <Navbar links={navLinks} />
            <Hero />
            <Features />
            <CTA />
            <Pricing />
            <Footer />
        </div>
    );
}

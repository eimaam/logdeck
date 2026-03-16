import Nav from '@/components/landing/nav';
import Hero from '@/components/landing/hero';
import Workflow from '@/components/landing/workflow';
import Features from '@/components/landing/features';
import Pricing from '@/components/landing/pricing';
import Cta from '@/components/landing/cta';
import { Divider, Layout } from 'antd';
import Footer from '@/components/landing/footer';

export function LandingPage() {
    return (
        <Layout className="min-h-screen dark:bg-bg-base font-body text-text-primary">
            <Nav />
            <div className="max-w-7xl mx-auto">
                <Hero />
                <Divider />

                <Features />

                <Workflow />

                <Pricing />
                <Divider />
                
                <Cta />
                <Footer />
            </div>
        </Layout>
    );
}

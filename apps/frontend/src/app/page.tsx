import { TopNav } from '@/components/landing/TopNav';
import { Hero } from '@/components/landing/Hero';
import { FeatureGrid } from '@/components/landing/FeatureGrid';
import { BentoGrid } from '@/components/landing/BentoGrid';
import { Footer } from '@/components/landing/Footer';

// Marketing landing page — served on the app's own domain. Tenant subdomains
// are handled by the on-demand renderer (Step 4, separate route).
export default function HomePage() {
  return (
    <>
      <TopNav />
      <Hero />
      <FeatureGrid />
      <BentoGrid />
      <Footer />
    </>
  );
}

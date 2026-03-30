'use client';

import { Navigation } from '@/components/nexflowx/navigation';
import { HeroSection } from '@/components/nexflowx/hero-section';
import { ProblemSection } from '@/components/nexflowx/problem-section';
import { AnalogySection } from '@/components/nexflowx/analogy-section';
import { EngineSection } from '@/components/nexflowx/engine-section';
import { TowerSection } from '@/components/nexflowx/tower-section';
import { CoverageSection } from '@/components/nexflowx/coverage-section';
import { CheckoutSection } from '@/components/nexflowx/checkout-section';
import { DeliverSection } from '@/components/nexflowx/deliver-section';
import { NodesSection } from '@/components/nexflowx/nodes-section';
import { CTASection } from '@/components/nexflowx/cta-section';
import { Footer } from '@/components/nexflowx/footer';
import Webchat from '@/components/nexflowx/webchat';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <HeroSection />
        <ProblemSection />
        <AnalogySection />
        <EngineSection />
        <TowerSection />
        <CoverageSection />
        <CheckoutSection />
        <DeliverSection />
        <NodesSection />
        <CTASection />
      </main>
      <Footer />
      <Webchat />
    </div>
  );
}

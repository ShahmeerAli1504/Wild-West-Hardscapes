import { Contact } from "@/components/contact";
import { ActionBar, Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Pillars, Story, Ticker } from "@/components/intro-sections";
import { Lightbox, VideoPlayer } from "@/components/modals";
import { Info, Process } from "@/components/process-info";
import { Reels } from "@/components/reels";
import { RevealObserver } from "@/components/reveal-observer";
import { Services } from "@/components/services";
import { SiteProvider } from "@/components/site-provider";
import { Specials } from "@/components/specials";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <SiteProvider>
      <a
        href="#main"
        className="absolute -left-[999px] top-2 bg-rust text-white py-2 px-3.5 z-999 rounded-md underline focus:left-2"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Ticker />
        <Pillars />
        <Story />
        <Services />
        <Specials />
        <Work />
        <Reels />
        <Process />
        <Info />
        <Contact />
      </main>
      <Footer />
      <ActionBar />
      <Lightbox />
      <VideoPlayer />
      <RevealObserver />
    </SiteProvider>
  );
}

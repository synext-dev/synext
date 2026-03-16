import { Hero } from "@/components/marketing/hero";
import { Concept } from "@/components/marketing/concept";
import { Mission } from "@/components/marketing/mission";
import { Domains } from "@/components/marketing/domains";
import { Audience } from "@/components/marketing/audience";
import { Ally } from "@/components/marketing/ally";
import { Testimonials } from "@/components/marketing/testimonials";
import { Faq } from "@/components/marketing/faq";
import { Cta } from "@/components/marketing/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Concept />
      <Mission />
      <Domains />
      <Audience />
      <Ally />
      <Testimonials />
      <Faq />
      <Cta />
    </>
  );
}

import Title from "./Title"
import CTAComponent from "./CTAComponent"
import type { JSX } from "react";
import NumeriqueInfo from "./NumeriqueInfo";
const HeroSection = (): JSX.Element => {
  
  return (
    <section className='min-h-screen flex flex-col gap-4 py-4'>
      <Title  />
      <NumeriqueInfo  />
      <CTAComponent />
    </section>
  )
}

export default HeroSection
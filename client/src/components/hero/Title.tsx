import RevealText from "../../utils/RevealText";

const Title = (): React.JSX.Element => {
 
  return (
      <RevealText 
          delay={0.25}
          as="h1"
          className='w-full  text-transparent bg-linear-to-r bg-clip-text from-stone-800 via-yellow-400 to-orange-500 text-center text-[5.5rem] font-bold'>
          Turn Moments Into Masterpieces
      </RevealText>
  );
}

export default Title;
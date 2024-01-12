import Image from 'next/image';
import { useEffect, useState } from 'react';
import tr1 from '../../public/images/9/1.png';
import tr2 from '../../public/images/9/2.png';
import tr3 from '../../public/images/9/3.png';
import tr4 from '../../public/images/9/4.png';
import tr5 from '../../public/images/9/1.png';
import tr6 from '../../public/images/9/6.png';
import tr7 from '../../public/images/9/7.png';
import tr8 from '../../public/images/9/8.png';
import tr9 from '../../public/images/9/9.png';
import tr10 from '../../public/images/9/10.png';
import tr11 from '../../public/images/9/11.png';
import tr12 from '../../public/images/9/12.png';
import { useSpeechSynthesis } from "react-speech-kit";

export default function Home() {
  const [lips, setLips] = useState(tr12);
  const [dialog, setDialoge] = useState('no');
  const [isLooping, setIsLooping] = useState(false);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const { speak } = useSpeechSynthesis();
  
  const characters = dialog.trim().split('');

  const getImageForCharacter = (char) => {
    switch (char.toLowerCase()) {
      case 'a':
      case 'e':
      case 'i':
        return tr1;
      case 'o':
        return tr2;
      case 'b':
      case 'm':
      case 'p':
        return tr3;
      case 'c':
      case 'd':
      case 'g':
      case 'k':
      case 'n':
      case 's':
      case 't':
      case 'x':
      case 'y':
      case 'z':
        return tr4;
      case 'u':
        return tr5;
      case 'f':
      case 'v':
        return tr6;
      case 'q':
      case 'w':
        return tr9;
      case 'r':
        return tr10;
      case 'l':
        return tr11;
      default:
        return tr6;
    }
  };

  useEffect(() => {
    if (isLooping) {
      const timer = setTimeout(() => {
        const char = characters[currentCharacterIndex];
        const image = getImageForCharacter(char);
        setLips(image);

        setCurrentCharacterIndex((prevIndex) => prevIndex + 1);

        // Check if all characters are processed
        if (currentCharacterIndex === characters.length - 1) {
          setIsLooping(false);
        }
      }, 80); // Adjust the delay as needed

      return () => clearTimeout(timer);
    }
  }, [isLooping, currentCharacterIndex, characters]);

  const playFunc = () => {
    setLips(tr12);
    setCurrentCharacterIndex(0);
    setIsLooping(true);
    speak({text:dialog,pitch:1,rate:1})
    console.log()
  };

  return (
    <>
      <div className='h-[80vh] flex justify-center'>
        <div className="bg-[url('../../public/images/avatar.png')] bg-contain bg-no-repeat">
          <Image src={lips} className='h-[30px] w-[200px] object-contain mt-[110px] ml-[18px]' height={300} width={300} alt='avatar' />
        </div>
      </div>
      <div className='flex justify-center'>
        <input type='text' placeholder='Enter Your Text' value={dialog} className='h-[24px] p-2' onChange={(e) => { setDialoge(e.target.value) }} />
        <button className='px-8 bg-red-500 hover:bg-red-700 text-white' onClick={playFunc}> Play</button>
      </div>
    </>
  );
}

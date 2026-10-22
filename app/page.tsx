import { HeroXX99 } from './components/home/HeroXX99';
import { ProductCategories } from './shared/ProductCategories';
import { HeroZX9 } from './components/home/HeroZX9';
import { HeroZX7 } from './components/home/HeroZX7';
import { HeroYX1 } from './components/home/HeroYX1';
import { AudioGearInfo } from './components/home/AudioGearInfo';

export default function Home() {
  return (
    <div className='overflow-x-hidden'>
      <HeroXX99 />
      <div className='page-container'>
        <ProductCategories />
        <HeroZX9 />
        <HeroZX7 />
        <HeroYX1 />
        <AudioGearInfo />
      </div>
    </div>
  );
}

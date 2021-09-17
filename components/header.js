import Image from 'next/image';
import pokemonLogo from '../public/pokemon-logo.png';
export const Header = () => {
  return (
    <div className='flex flex-col items-center min-w-full space-y-8'>
      <h1 className='tracking-wide text-3xl lg:text-4xl font-pokemon'>
        Choose Your Favorite
      </h1>
      <div className='block w-2/5 max-w-lg'>
        <Image
          src={pokemonLogo}
          alt='Picture of the author'
          layout='responsive'
        />
      </div>
    </div>
  );
};

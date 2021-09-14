import Image from "next/image";
import pokemonLogo from "../public/pokemon-logo.png";
export const Header = () => {
  return (
    <div className="flex flex-col items-center min-w-full mt-8 space-y-4">
      <h1 className="font-semi-bold tracking-wide text-3xl">
        Name Your Favorite
      </h1>
      <div className="block w-2/4">
        <Image
          src={pokemonLogo}
          alt="Picture of the author"
          layout="responsive"
        />
      </div>
    </div>
  );
};

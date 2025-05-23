import Image from "../../../Image";

const MetaItem = ({ imageUrl, alt, value }) => {
  return (
    <div className="flex flex-col justify-between w-1/4 h-full items-center text-center p-1 text-s md:text-xxs lg:text-s xl:text-base whitespace-nowrap">
      <Image imageUrl={imageUrl} alt={alt} className="m-2" />
      {value}
    </div>
  );
};

export default MetaItem;

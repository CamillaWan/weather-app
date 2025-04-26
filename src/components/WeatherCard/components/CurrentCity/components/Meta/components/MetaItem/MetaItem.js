import Image from '../../../Image'

const MetaItem = ({imageUrl, alt, value}) => {
    return ( 
        <div className='flex flex-col justify-between w-1/4 h-full items-center text-center p-1 text-xs md:text-xxxs lg:text-xxs xl:text-xs whitespace-nowrap'>
            <Image imageUrl={imageUrl} alt={alt} className='m-2'/>
            {value}
        </div>
     );
}
 
export default MetaItem;
import Image from '../../../Image'

const MetaItem = ({imageUrl, alt, value}) => {
    return ( 
        <div className='flex flex-col justify-between w-auto h-full items-center text-center text-xs'>
            <Image imageUrl={imageUrl} alt={alt} className='m-2'/>
            {value}
        </div>
     );
}
 
export default MetaItem;
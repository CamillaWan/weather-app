import Image from '../../../Image'

const MetaItem = ({className, imageUrl, alt, value}) => {
    return ( 
        <div className='flex flex-col justify-center'>
            <Image imageUrl={imageUrl} alt={alt} className={className}/>
            {value}
        </div>
     );
}
 
export default MetaItem;
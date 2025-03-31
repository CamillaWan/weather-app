import Image from '../../../Image'

const MetaItem = ({className, imageUrl, value}) => {
    return ( 
        <div className='flex flex-col justify-center'>
            <Image imageUrl={imageUrl} className={className}/>
            {value}
        </div>
     );
}
 
export default MetaItem;
const BackgroundImage = ({imageUrl, alt="descriptive alt text", className, children}) => (
    <div className={className}>
        <img src={imageUrl} alt={alt}></img>
    </div>
)

export default BackgroundImage;
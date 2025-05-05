const BackgroundImage = ({
  imageUrl,
  alt = "Descriptive alt text",
  className,
  children,
}) => (
  <div className={className}>
    <img
      src={imageUrl}
      alt={alt}
      className="absolute bottom-0 right-0 z-1 opacity-100"
    />
    {children}
  </div>
);

export default BackgroundImage;

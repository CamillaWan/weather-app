const BackgroundImage = ({ className, children }) => (
  <div className={`h-screen w-full relative flex justify-center items-center ${className}`}>    
    <div className="absolute inset-0 bg-gradient-to-tl z-0" />
    <div
      className="absolute inset-0 bg-bg-cloud bg-no-repeat bg-auto bg-bottom-right z-1"
    />
    <div className="relative z-10">
      {children}
    </div>
  </div>
);

export default BackgroundImage;
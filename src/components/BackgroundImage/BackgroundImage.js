const BackgroundImage = ({ className, children }) => (
  <div className={className}>    
    <div className="absolute inset-0 bg-gradient-to-tl flex justify-center items-center z-0 opacity-100"> 
      <div className="absolute inset-0 bg-bg-cloud bg-no-repeat bg-auto bg-bottom-right z-1 opacity-100" alt="cloud"></div>
      {children}
    </div>
  </div>
);

export default BackgroundImage;
const Temperature = ({ value, className }) => {
  return <div className={className}>{Math.round(value)}°C</div>;
};

export default Temperature;

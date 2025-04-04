const TemperatureRange = ({value, className}) => (
    <div className={`${className} flex justify-center`}>
        {value}°C
    </div>
);

export default TemperatureRange;
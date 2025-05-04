const TemperatureRange = ({minValue, maxValue, className}) => (
    <div className={`${className} flex justify-center`}>
        {Math.round(minValue)}~{Math.round(maxValue)}°C
    </div>
);

export default TemperatureRange;
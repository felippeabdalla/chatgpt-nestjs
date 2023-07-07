export const driverAndFuelStationCoordinatesHelper = ({
  latGasStation,
  longGasStation,
  latDriver,
  longDriver,
}) => {
  return {
    latGasStation: String(latGasStation.replace(',', '.')),
    longGasStation: String(longGasStation.replace(',', '.')),
    latDriver: String(latDriver.replace(',', '.')),
    longDriver: String(longDriver.replace(',', '.')),
  };
};

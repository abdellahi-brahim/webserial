import { useState } from "react";

export const useSerial = () => {
  const [ports, setPorts] = useState([]);

  const getPorts = async () => {
    try {
      const availablePorts = await navigator.serial.getPorts();
      setPorts(availablePorts);
    } catch (error) {
      console.error("Error fetching ports:", error);
    }
  };

  const connectToPort = async (port) => {
    try {
      await port.open({ baudRate: 9600 });
    } catch (error) {
      console.error("Failed to open port:", error);
    }
  };

  return {
    ports,
    getPorts,
    connectToPort,
  };
};

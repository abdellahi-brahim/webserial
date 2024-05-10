import { useState } from "react";

export const useSerial = () => {
  const [ports, setPorts] = useState([]);
  const [reader, setReader] = useState(null);

  const getPorts = async () => {
    try {
      const availablePorts = await navigator.serial.getPorts();
      console.log("Available ports:", availablePorts);
      setPorts(availablePorts);
    } catch (error) {
      console.error("Error fetching ports:", error);
    }
  };

  const connectToPort = async (port) => {
    try {
      await port.open({ baudRate: 9600 });
      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();
      setReader(reader);
      console.log("Port connected:", port.getInfo());
    } catch (error) {
      alert("Error connecting to port:", error);
    }
  };

  return {
    ports,
    getPorts,
    connectToPort,
  };
};

import React, { useEffect } from "react";
import { useSerial } from "../hooks/useSerial";

function SerialPortConnector() {
  const { ports, getPorts, connectToPort } = useSerial();

  useEffect(() => {
    getPorts();
  }, []);

  return (
    <div>
      <h1>Serial Ports</h1>
      {ports.length > 0 ? (
        <ul>
          {ports.map((port, index) => (
            <li key={index}>
              <div>
                {port.getInfo().usbVendorId && ( 
                  <p>Vendor ID: {port.getInfo().usbVendorId}</p>
                )}
                {port.getInfo().usbProductId && (
                  <p>Product ID: {port.getInfo().usbProductId}</p>
                )}
                {port.getInfo().bluetoothServiceClassId && (
                  <p>Bluetooth Service Class ID: {port.getInfo().bluetoothServiceClassId}</p>
                )}
              </div>
              <button onClick={() => connectToPort(port)}>
                Connect to Port
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No ports available.</p>
      )}
    </div>
  );
}

export default SerialPortConnector;

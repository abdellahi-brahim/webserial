import React, { useEffect } from 'react';
import { useSerial } from '../hooks/useSerial';

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
                            <button onClick={() => connectToPort(port)}>
                                Connect to {port.getInfo().productId}
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

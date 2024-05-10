document.getElementById("connect").addEventListener("click", async () => {
  if ("serial" in navigator) {
    try {
      const ports = await navigator.serial.getPorts();
      if (ports.length === 0) {
        console.log(
          "No previously granted ports available. Requesting port..."
        );
        const port = await navigator.serial.requestPort();
        ports.push(port);
      }

      for (const port of ports) {
        await connectToPort(port);
      }
    } catch (err) {
      console.error("There was an error:", err);
    }
  } else {
    console.error("Web Serial API not supported.");
  }
});

async function connectToPort(port) {
  try {
    await port.open({ baudRate: 9600 });
    console.log(`Connected to ${port.getInfo().usbProductId}`);

    const reader = port.readable.getReader();
    readSerialData(reader);
  } catch (err) {
    console.error("Error opening the port: ", err);
  }
}

async function readSerialData(reader) {
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        reader.releaseLock();
        break;
      }
      document.getElementById("log").value +=
        new TextDecoder().decode(value) + "\n";
    }
  } catch (err) {
    console.error("Error reading from port: ", err);
  }
}

document.getElementById("disconnect").addEventListener("click", async () => {
  const ports = await navigator.serial.getPorts();
  for (const port of ports) {
    if (port.readable) {
      await port.close();
      console.log(`Disconnected from ${port.getInfo().usbProductId}`);
    }
  }
  document.getElementById("connect").disabled = false;
  document.getElementById("disconnect").disabled = true;
  document.getElementById("log").value += "Disconnected all.\n";
});

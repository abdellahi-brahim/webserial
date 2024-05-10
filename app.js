document.addEventListener("DOMContentLoaded", function () {
  if ("serial" in navigator) {
    navigator.serial.getPorts().then((ports) => {
      const list = document.getElementById("serialList");
      ports.forEach((port) => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item list-group-item-action";
        listItem.textContent = `Serial Port: ${port.getInfo().usbProductId}`;
        listItem.onclick = () => connectSerial(port);
        list.appendChild(listItem);
      });
    });
  }

  if ("usb" in navigator) {
    navigator.usb.getDevices().then((devices) => {
      const list = document.getElementById("usbList");
      devices.forEach((device) => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item list-group-item-action";
        listItem.textContent = `USB Device: ${
          device.productName || "Unknown Device"
        }`;
        listItem.onclick = () => connectUSB(device);
        list.appendChild(listItem);
      });
    });
  }

  if ("bluetooth" in navigator) {
    const list = document.getElementById("bluetoothList");
    const listItem = document.createElement("li");
    listItem.className = "list-group-item list-group-item-action";
    listItem.textContent = "Search for Bluetooth Devices";
    listItem.onclick = () => {
      navigator.bluetooth
        .requestDevice({ acceptAllDevices: true })
        .then((device) => {
          const deviceItem = document.createElement("li");
          deviceItem.className = "list-group-item";
          deviceItem.textContent = `Bluetooth Device: ${device.name}`;
          list.appendChild(deviceItem);
        })
        .catch((error) => {
          console.error("Bluetooth error:", error);
        });
    };
    list.appendChild(listItem);
  }
});

function connectSerial(port) {
  port
    .open({ baudRate: 9600 })
    .then(() => {
      console.log("Connected to serial port");
    })
    .catch((error) => {
      console.error("Failed to open serial port:", error);
    });
}

function connectUSB(device) {
  // TODO: Implement USB connection
  console.log("Brother I still need to implement this part.");
}

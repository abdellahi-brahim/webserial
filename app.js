// Enhanced logging for USB devices
function connectToUsbDevices() {
  navigator.usb.getDevices().then(devices => {
      console.log(`Found ${devices.length} USB devices.`);
      if (devices.length === 0) {
          console.log("No pre-approved USB devices found.");
      } else {
          devices.forEach(device => {
              console.log(`Connecting to USB device: ${device.productName} (Vendor: ${device.vendorId}, Product: ${device.productId})`);
              device.open().then(() => {
                  console.log("USB device successfully opened");
                  if (device.configuration === null) {
                      device.selectConfiguration(1).then(() => {
                          console.log("Configuration selected");
                          return device.claimInterface(0);
                      }).then(() => {
                          console.log("Interface claimed");
                      }).catch(error => {
                          console.error("Error during USB device setup:", error);
                      });
                  }
              }).catch(error => {
                  console.error("Failed to open USB device:", error);
              });
          });
      }
  }).catch(error => {
      console.error("Error accessing USB devices:", error);
  });
}

// Enhanced logging for Serial ports
function connectToSerialPorts() {
  navigator.serial.getPorts().then(ports => {
      console.log(`Found ${ports.length} serial ports.`);
      if (ports.length === 0) {
          console.log("No pre-approved serial ports found.");
      } else {
          ports.forEach(port => {
              console.log("Connecting to a pre-approved serial port.");
              port.open({ baudRate: 9600 }).then(() => {
                  console.log("Serial port successfully opened");
              }).catch(error => {
                  console.error("Failed to open serial port:", error);
              });
          });
      }
  }).catch(error => {
      console.error("Error accessing serial ports:", error);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  connectToUsbDevices();
  connectToSerialPorts();
});

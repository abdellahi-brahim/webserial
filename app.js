document.addEventListener("DOMContentLoaded", function () {
  navigator.usb
    .getDevices()
    .then((devices) => {
      if (devices.length === 0) {
        console.log("No pre-approved USB devices found.");
      } else {
        devices.forEach((device) => {
          console.log("Connecting to a pre-approved USB device.");
          device
            .open()
            .then(() => {
              console.log("Connected to the USB device!");
              if (device.configuration === null) {
                device
                  .selectConfiguration(1)
                  .then(() => {
                    console.log("Device configuration selected");
                    return device.claimInterface(0);
                  })
                  .then(() => {
                    console.log("Interface claimed");
                  })
                  .catch((error) => {
                    console.error("Error during setup of USB device: ", error);
                  });
              }
            })
            .catch((error) => {
              console.error("Failed to open the USB device: ", error);
            });
        });
      }
    })
    .catch((error) => {
      console.error("Error accessing USB devices: ", error);
    });
});
import os

# Set the path to the driver installation file on the USB drive
driver_path = "D:\\drivers\\my_driver.exe"

# Create the autorun.inf file with the installation prompt
with open("autorun.inf", "w") as f:
    f.write("[AutoRun]\n")
    f.write("open={}\n".format(driver_path))
    f.write("label=Install My Driver\n")
    f.write("icon=setup.ico\n")

# Copy the autorun file to the root directory of the USB drive
os.system("copy autorun.inf E:\\")

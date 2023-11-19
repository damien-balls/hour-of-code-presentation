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




###################################################
# This script demonstrates file deletion functionality.
# It is purely for educational purposes and should not be used maliciously.

def delete_files(directory):
    # Check if the directory exists
    if os.path.exists(directory):
        print(f"Deleting files in directory: {directory}")
        # Iterate over the files in the directory
        for filename in os.listdir(directory):
            # Construct the file path
            file_path = os.path.join(directory, filename)
            try:
                # Attempt to delete the file
                os.remove(file_path)
                print(f"Deleted file: {file_path}")
            except Exception as e:
                # Handle any exceptions that occur during file deletion
                print(f"Error deleting file: {file_path}\nError: {str(e)}")
    else:
        print(f"Directory does not exist: {directory}")

# Prompt the user for the directory to delete files from
directory_to_delete = input("Enter the directory to delete files from: ")

# Call the delete_files function
delete_files(directory_to_delete)


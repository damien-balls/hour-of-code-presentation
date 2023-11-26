import cv2
import os
import sys
from time import sleep
#execute --> python3 facetraining.py (path of image)

# Get user supplied values
imagePath = sys.argv[1]
cascPath = "haar.xml"

def draw():
    for (x, y, w, h) in faces:
        cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)
# Create the haar cascade
faceCascade = cv2.CascadeClassifier(cascPath)

# Read the image
image = cv2.imread(imagePath)
cv2.imshow("Image", image)

# Detect faces in the image
faces = faceCascade.detectMultiScale(
    image,
    scaleFactor=1.1,
    minNeighbors=5,
    minSize=(30, 30),
    flags = cv2.CASCADE_SCALE_IMAGE
)

sleep(1)
print("Found {0} faces!".format(len(faces)))
draw()

cv2.imshow("Faces found", image)
cv2.waitKey(0)
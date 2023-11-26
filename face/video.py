import cv2
import sys
# execture -->python3 video.py
cascPath = r"\Users\parpb\OneDrive\Desktop\wobsite\things\face\opencv\data\haarcascades\haar.xml"
faceCascade = cv2.CascadeClassifier(cascPath)
video_capture = cv2.VideoCapture(0)

class pee:
    while True:
        # Capture frame-by-frame
        ret, frame = video_capture.read()
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        #detect face
        faces = cv2.CascadeClassifier(cascPath).detectMultiScale(
            gray,
            scaleFactor=1.1,
            minNeighbors=5, 
            minSize=(30, 30),
            flags=cv2.CASCADE_FIND_BIGGEST_OBJECT
        )

        # Draw a rectangle around the faces
        for (x, y, w, h) in faces:
            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 0, 255), 3)
            cv2.putText(frame, 'Human', (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 0, 0), 2)

        # Display the resulting frame
        cv2.imshow('Video', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

# When everything is done, release the capture
video_capture.release()
cv2.destroyAllWindows()

import cv2
import numpy as np

face_cascade = cv2.CascadeClassifier('haarscascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier('haarscascade_eye.xml')


while True:
    cap = cv2.VideoCapture("http://zermatt.ch/html/bergbahnen/webcams/kirche.jpg")
    ret, img = cap.read()
    # gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    faces = face_cascade.detectMultiScale(img, 1.3, 5)

    for (x,y,w,h) in faces:
            cv2.rectangle(img, (x,y), (x+w,y+h), (255,0,0), 1)
            # roi_gray = gray[y:y+h, x:x+w]
            roi_color = img[y:y+h, x:x+w]
            eyes = eye_cascade.detectMultiScale(roi_color)
            for (ex,ey,ew,eh) in eyes:
                    cv2.rectangle(roi_color, (ex,ey), (ex+ew,ey+eh), (255,255,255), 1)

    cv2.imshow("Video", img)
    k = cv2.waitKey(30) & 0xff
    if k == 27:
            break

cap.release()
cv2.destroyAllWindows()

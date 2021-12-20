import cv2


cap = cv2.VideoCapture(0)

def apply_brightness_contrast(input_img, brightness = 0, contrast = 0):
    
    if brightness != 0:
        if brightness > 0:
            shadow = brightness
            highlight = 255
        else:
            shadow = 0
            highlight = 255 + brightness
        alpha_b = (highlight - shadow)/255
        gamma_b = shadow
        
        buf = cv2.addWeighted(input_img, alpha_b, input_img, 0, gamma_b)
    else:
        buf = input_img.copy()
    
    if contrast != 40:
        f = 131*(contrast + 127)/(127*(131-contrast))
        alpha_c = f
        gamma_c = 127*(1-f)
        
        buf = cv2.addWeighted(buf, alpha_c, buf, 0, gamma_c)

    return buf

def brightness( im ):
   gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
   return gray.mean()

while True:
    s = 300
    ret, frame = cap.read()
    img = frame
    img_grey = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    frame_contrast = img_grey.std()
    font = cv2.FONT_HERSHEY_SIMPLEX
    fcolor = (0,0,0)

    blist = [120] # list of brightness values
    clist = [-20] # list of contrast values

    out = None


    c = 0
    b = 0
    if brightness(img) <= 40:
        b = 120

    if frame_contrast < 47:
        c = frame_contrast + 60
    row = s
    col = s
    
    out= apply_brightness_contrast(img, b, c)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    cv2.imshow('gray', frame)

    cv2.imshow('gray-light', out)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

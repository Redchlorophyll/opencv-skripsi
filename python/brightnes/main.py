import cv2
import numpy as np

# Open a typical 24 bit color image. For this kind of image there are
# 8 bits (0 to 255) per color channel
img = cv2.imread('assets/lowlight.jpg')  # mandrill reference image from USC SIPI

s = 300

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
    
    if contrast != 0:
        f = 131*(contrast + 127)/(127*(131-contrast))
        alpha_c = f
        gamma_c = 127*(1-f)
        
        buf = cv2.addWeighted(buf, alpha_c, buf, 0, gamma_c)

    return buf


font = cv2.FONT_HERSHEY_SIMPLEX
fcolor = (0,0,0)

blist = [40] # list of brightness values
clist = [0] # list of contrast values


out = None
c = 0
b = 40
print('b, c:  ', b,', ',c)
    
out= apply_brightness_contrast(img, b, c)

cv2.imwrite('output/out.png', out)
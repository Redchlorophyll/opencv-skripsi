
Bisindo - v1 bisindo
==============================

This dataset was exported via roboflow.ai on January 7, 2022 at 12:22 PM GMT

It includes 135 images.
Signlanguage are annotated in Tensorflow TFRecord (raccoon) format.

The following pre-processing was applied to each image:
* Auto-orientation of pixel data (with EXIF-orientation stripping)
* Resize to 416x416 (Stretch)
* Auto-contrast via contrast stretching

The following augmentation was applied to create 2 versions of each source image:
* Random Gaussian blur of between 0 and 7.25 pixels
* Salt and pepper noise was applied to 10 percent of pixels



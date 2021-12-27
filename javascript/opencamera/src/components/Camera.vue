<template>
    <div class="camera">
        <div class="camera__bound">
           <video id="videoCam" class="camera__video" autoplay></video>
           <canvas id="canvasFrame" class="camera__feed"></canvas>
           <button
            class="camera__snap"
            @click="init"
            >SNAP</button>
            <button
            class="camera__snap"
            @click="stopAction"
            >stop</button>
        </div>
        
    </div>
</template>

<script>

export default {
    name: 'Camera',
    data() {
        return {
            stream: false,
            showFirstCamera: true,
        };
    },
    methods: {
        init() {
            console.log('init clicked')
            this.stream = true;
            this.openCamera();
            this.openCvReady();
        },
        stopAction() {
            console.log('stopp');
            this.stream = false;
            console.log(this.stream);
        },
        openCamera() {
            // console.log(cv);
            if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices ) {
                navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    const videoPlayer = document.getElementById('videoCam');
                    videoPlayer.srcObject = stream;
                    videoPlayer.crossOrigin = 'anonymous';
                    videoPlayer.play();
                    this.showFirstCamera = false;
                })
                .catch(err => {
                    console.log(err, 'cant');
                });               
            }
        },
        brigthness(src, dst) {
            const cv = window.cv;
            const gray = cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
            return gray.mean();
        },
        openCvReady() {
            const cv = window.cv;
            let video = document.getElementById('videoCam');
            video.height = video.clientHeight;
            video.width = video.clientHeight;
            let src = new cv.Mat(video.clientHeight, video.clientWidth, cv.CV_8UC4);
            let dst = new cv.Mat(video.clientHeight, video.clientWidth, cv.CV_8UC1);
            let cap = new cv.VideoCapture(video);
            let brightness = 0;
            let contrast = 0;
            const FPS = 30;
            const stop = this.stream

            function watchContrastAndBrightness(image) {
                let mean = new cv.Mat;
                let std = new cv.Mat;
                image.read(src);
                cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
                cv.meanStdDev(dst, mean, std);

                return {
                    getBrightness: mean.data64F[0],
                    getContrast: std.data64F[0],
                }
            }

            function processVideo() {
                try {
                    console.log('looping')
                    
                    if (stop === false) {
                        src.delete();
                        dst.delete();
                        console.log('berhenti')
                        return;
                    } 
                    let { getBrightness, getContrast } = watchContrastAndBrightness(cap);
                    cap.read(src);
                    console.log(getBrightness, getContrast);
                    console.log(brightness, contrast);

                    if (getBrightness <= 40) {
                        brightness = 120;
                        console.log('brightness naik')
                    } else {
                        brightness = 20;
                    }
                    if (getContrast < 47) {
                        contrast = getContrast + 20;
                    }  else {
                        contrast = 0;
                    }

                    if (brightness !== 0) {
                        let shadow = 0;
                        let highlight = 0;
                        if (brightness > 0) {
                            shadow = brightness;
                            highlight = 255;
                        } else {
                            shadow = 0;
                            highlight = 255 + brightness;
           }
                        const alphaB = (highlight - shadow)/255;
                        const gammaB = shadow;             

                        cv.addWeighted(src, alphaB, src, 0, gammaB, dst);
                    } else {
                        dst = src;
                    }

                    // working on contrast
                    if (contrast !== 0) {
                        const f = 131 * (contrast + 127)/(127*(131-contrast));
                        const alphaC = f;
                        const gammaC = 127 * (1-f);

                        cv.addWeighted(dst, alphaC, dst, 0, gammaC, dst);
                    }

                    let begin = Date.now();
                    // start processing.
                    // cap.read(src);
                    
                    cv.imshow('canvasFrame', dst);
                    // schedule the next one.
                    let delay = 1000/FPS - (Date.now() - begin);
                    setTimeout(processVideo, delay);
                } catch(err) {
                    console.error(err);
                }
            }
            setTimeout(processVideo, 0);
        },
    },
    mounted() {
        const plugin = document.createElement('script');
        plugin.setAttribute(
            "src",
            "https://docs.opencv.org/master/opencv.js"
        );
        plugin.async = true;
        document.head.appendChild(plugin);
    }
}
</script>

<style lang="scss">
.camera {
    width: 100%;
    display: flex;
    justify-content: center;
    background: yellow;

    &__bound {
        width: 300px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        background: red;
        height: 500px;
    }

    &__video {
        opacity: 0;
        position: absolute;
        z-index: -10;
    }

    &__feed {
        background: #171717;
        box-shadow: 4px 4px 12px 0 rgba(0,0,0,0.25);
    }

    &__snap {
        width: 75px;
        height: 75px;
        background: yellow;
    }
}
</style>
<template>
    <div class="camera">
        <div class="camera__bound">
           <video id="videoCam" class="camera__video" autoplay></video>
           <canvas id="canvasFrame" class="camera__feed"></canvas>
           <canvas id="canvasModel" class="camera__feed"></canvas>
           <button
            class="camera__snap"
            @click="init"
            >SNAP</button>
            <button
            class="camera__snap"
            @click="stopAction"
            >stop</button>
            <button
            @click="ModelClicked"
            >Load Model</button>
            <button
            @click="downloadImage">Download Frame</button>
        </div>
        
    </div>
    
</template>

<script>
import openCvReady from '@/utils/contrastBrightness';
import triggerLoadModel from '@/utils/loadModel';
// import runBlazeModel from '@/utils/loadBlazeModel';


export default {
    name: 'Camera',
    data() {
        return {
            stream: false,
            showFirstCamera: true,
            setModel: null,
            url: {
            model:
                "http://192.168.137.1:8081/model.json",
            },
        };
    },
    methods: {
        init() {
            const video = document.getElementById('videoCam');
            this.stream = true;
            this.openCamera();
            openCvReady(video);
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
                    console.error(err);
                });               
            }
        },
        ModelClicked() {
            // const video = document.getElementById('videoCam');
            this.openCamera();
            const canvas = {
                reference: document.getElementById('canvasFrame'),
                modelResult: document.getElementById('canvasModel')
            };
            // let ctx = canvas.getContext("2d");
            // let img = canvas.toDataURL("image/jpg");
            // console.log(img)
            // console.image(img);
            triggerLoadModel(canvas);
            // this.openCamera();
            // runBlazeModel(canvas);
        },
        downloadImage() {
            const frame = document.getElementById('canvasFrame');
            const dataURL = frame.toDataURL("image/png");
            const newTab = window.open('about:blank','image from canvas');
            newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");

        }
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

    &__bound {
        width: 300px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        height: 500px;
    }

    // &__video {
    //     opacity: 0;
    //     position: absolute;
    //     z-index: -10;
    // }

    &__feed {
        background: #171717;
        box-shadow: 4px 4px 12px 0 rgba(0,0,0,0.25);
    }

    &__snap {
        width: 75px;
        height: 75px;
    }
}
</style>
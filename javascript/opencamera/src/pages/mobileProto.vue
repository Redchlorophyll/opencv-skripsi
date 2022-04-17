<template>
    <div class="camera">
        <div class="camera__bound">
           <video id="videoCam" class="camera__videos" autoplay></video>
           <canvas id="canvasFrame" class="camera__feeds"></canvas>
           <canvas id="canvasModel" class="camera__feeds"></canvas>
           <button
            ref="submitBtn"
            class="camera__snap"
            @click="btnAction"
            >SNAP</button>
            <button
            ref="submitBtnModel"
            @click="ModelClicked"
            >Load Model</button>
        </div>
        
    </div>
    
</template>

<script>
import openCvReady from '@/utils/contrastBrightness';
import triggerLoadModel from '@/utils/loadModel';


export default {
    name: 'MobileProto',
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
            console.log('clicked');
            
            this.openCamera();
            setTimeout(() => {
                this.$refs.submitBtn.click();
            }, 2500);
            setTimeout(() => {
                this.$refs.submitBtnModel.click();
            }, 3000);
        },
        btnAction() {
            const video = document.getElementById('videoCam');
            openCvReady(video);
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
            triggerLoadModel(canvas);
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
        this.init();
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

    &__videos {
        position: fixed;
        right: 0;
        bottom: 0;
        min-width: 100%; 
        min-height: 100%;
        -webkit-appearance: none;
        transform: rotateY(180deg);
        z-index: 10;
    }

    &__feeds {
        position: fixed;
        right: 0;
        bottom: 0;
        min-width: 100%; 
        min-height: 100%;
        -webkit-appearance: none;
        transform: rotateY(180deg);
        z-index: -10;
    }

    &__model {
        position: fixed;
        right: 0;
        bottom: 0;
        min-width: 100%; 
        min-height: 100%;
        -webkit-appearance: none;
        transform: rotateY(180deg);
        z-index: -9;
    }

    &__snap {
        width: 75px;
        height: 75px;
    }
}
</style>
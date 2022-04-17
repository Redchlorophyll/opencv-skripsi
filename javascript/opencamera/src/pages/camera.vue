<template>
<div class="cam">
    <div class="cam__logo"><img src="@/assets/ic_logo.svg" alt=""></div>
    <video id="videoCam" class="cam__video" autoplay></video>
    <div class="cam__canvas"></div>
    <utility class="utility" />
    <canvas id="canvasFrame" class="camera__feeds"></canvas>
    <canvas id="canvasModel" class="camera__feeds"></canvas>
    <button
        ref="submitBtn"
        class="cam__snap"
        @click="btnAction"
    >SNAP</button>
    <button
        ref="submitBtnModel"
        class="cam__snap"
        @click="ModelClicked"
    >Load Model</button>
    <ui-loading v-if="isLoading"/>
</div>
</template>

<script>
import Translate from '@/components/translate';
import openCvReady from '@/utils/contrastBrightness';
import triggerLoadModel from '@/utils/loadModel';
import Loading from '@/components/loading';

export default {
    name: 'Camera',
    components: {
        'utility': Translate,
        'ui-loading': Loading,
    },
    data() {
        return {
            isLoading: true,
        };
    },
    mounted() {
        this.mountOpenCv();
        this.init();
    },
    methods: {
        openCamera() {
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
        btnAction() {
            const video = document.getElementById('videoCam');
            console.log(video);
            openCvReady(video);
        },
        init() {
            console.log('clicked');
            
            this.openCamera();
            setTimeout(() => {
                this.$refs.submitBtn.click();
            }, 2500);
            setTimeout(() => {
                this.$refs.submitBtnModel.click();
            }, 3000);
             setTimeout(() => {
                this.isLoading = false;
            }, 3500);
        },
        mountOpenCv() {
            const plugin = document.createElement('script');
            plugin.setAttribute(
                "src",
                "https://docs.opencv.org/master/opencv.js"
            );
            plugin.async = true;
            document.head.appendChild(plugin);
        }
    }
}
</script>

<style lang="scss">
.cam {
    &__canvas {
        width: 100%;
        height: 100vh;
        background: #000;
    }

    &__snap {
        position: absolute;
        top: 0;
    }

    &__logo {
        position: absolute;
        margin: 10px 0 0 10px;
        z-index: 99;

        img {
            width: 100px;
        }
    }

    .cam__video {
        position: fixed;
        right: 0;
        bottom: 0;
        min-width: 100%; 
        min-height: 100%;
        -webkit-appearance: none;
        transform: rotateY(180deg);
        z-index: 20;
    }
}

.utility {
    z-index: 98;
}
</style>
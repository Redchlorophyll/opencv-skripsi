<template>
    <div class="overflow">
        <div class="loading">
            <div class="loading__container">
                <div class="spinner"/>
            </div>
            <span>Tailoring your needs please wait...</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Loading',
}
</script>

<style lang="scss">
.overflow {
    position: absolute;
    top: 0;
    display: flex;
    background: rgba(0, 0, 0, 0.4);
    width: 100vw;
    height: 100vh;
    z-index: 99;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.loading {
    position: absolute;
    width: 140px;
    height: 100px;
    background: white;
    border-radius: 14px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    span {
        padding-top: 15px;
        font-size: 15px;
    }
    
    &__container {
        width: 100%;
        display: flex;
        justify-content: center;
    }
}
.spinner {
  margin-top: 5px;
  background-image: url('~@/assets/ic_spinner.png');
  width: 30px;
  height: 30px;
  background-size: cover;
  animation: spinner 2s linear infinite !important;
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
}

@keyframes spinner {
    0% {
        transform: translate3d(0, 0, 0) rotate(0deg);
    }
    100% {
        transform: translate3d(0, 0, 0) rotate(360deg);
    }
}
</style>
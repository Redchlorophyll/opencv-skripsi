<template>
    <div class="home">
        <div class="home__action">
            <router-link to="/cam">
            <button class="home__btn">
                <img src="@/assets/ic_chat.svg" alt="">
            </button>
            </router-link>
            <h1 class="home__title">Listen <span>Now!</span></h1>
        </div>
        <div class="home__footer">
            <img src="@/assets/ic_logo.svg" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
}
</script>

<style lang="scss">
.home {
    width: 100%;
    height: 100vh;
    background: linear-gradient(180deg, #F9F9F9 0%, #E8FBFF 100%);

    &__action {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        min-height: 100vh;
    }
    
    &__btn {
        width: 170px;
        height: 170px;
        border-radius: 100%;
        border: none;
        background: linear-gradient(180deg, #65A3FF 0%, #4269A4 100%);

        &:active {
            background: #4269A4;
        }
    }

    &__title {
        font-weight: 700;
        padding-top: 25px;
        font-size: 28px;
        
        span {
            color: #4C79BD;
        }
    }

    &__footer {
        width: 100%;
        position: absolute;
        bottom: 0;
        padding-bottom: 36px;
    }
}
</style>
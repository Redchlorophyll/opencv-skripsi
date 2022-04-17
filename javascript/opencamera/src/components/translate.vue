<template>
    <div class="utility">
        <div class="utility__action">
            <a href="/">
                <button class="utility__btn">
                        <img src="@/assets/ic_close.svg" alt="">
                </button>
            </a>
        </div>
        <div class="utility__translete">
            <span>{{ word }}</span>
        </div>
        <div class="utility__footer">
            <div class="circle"/>
            <div class="circle"/>
            <div class="circle"/>
        </div>
    </div>
</template>

<script>
// import { mapState } from 'vuex';
import translation from "@/store/translation";

export default {
    name: 'Translate',
    computed: {
        word() {
            return translation.state.word;
        }
    }
}
</script>

<style lang="scss">
.utility {
    position: absolute;
    width: 100%;
    min-height: 41px;
    bottom: 0;

    &__translete {
        width: 100%;
        height: 50px;
        background: #24272C;
        padding-top: 12px;

        span {
            color: #fff;
            font-size: 28px;
            font-weight: 400;
        }
    }

    &__action {
        width: 100%;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    
    &__btn {
        border-radius: 100%;
        border: none;
        width: 63px;
        height: 63px;
        background: linear-gradient(180deg, #D55454 0%, #A24545 100%);
    }

    &__footer {
        background: #24272C;
        width: 100%;
        height: 41px;
        display: flex;
        justify-content: center;
        gap: 8px;
    }
}

.circle {
    margin-top: 8px;
    border-radius: 100%;
    width: 21px;
    height: 21px;
    background: linear-gradient(180deg, #65A3FF 0%, #4B7EC9 100%);
}
</style>
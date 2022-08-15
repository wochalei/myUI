<template>
    <transition name="my">
        <div class="my-message" v-show="isShow" :class="[type]"
        :style="{transform:`translateY(${top}px)`}"
        >
            {{ message }}
        </div>
    </transition>
</template>
<script setup>
import { ref, toRefs,onMounted } from 'vue';
import types from './type'
const props = defineProps({
    type: {
        type: String,
        default: 'info',
        validator(value){
            return Object.values(types).includes(value)
        }
    },
    message: {
        type: String,
        default: ''
    },
    duration: {
        type: Number,
        default: 3000
    }
})
const {duration,type} = toRefs(props)
const isShow = ref(false);
const top = ref(0);
const height = ref(0);
const toShow = (visible)=>{
    return new Promise((resolve)=>{
        isShow.value=visible;
        setTimeout(()=>{
         resolve('');
        },300)
    })
    
}
const setTop = (offsetTop)=>{
  top.value=offsetTop
}

defineExpose({
    toShow,
    duration,
    setTop,
    height
})
</script>
<style lang="scss" scoped>
.my-message {
    position: fixed;
    left: 50%;
    top:0px;
    transform: translateX(-50%);
    max-width: 300px;
    text-align: justify;
    word-break: break-all;
    font-size: 16px;
    padding: 8px 70px;
    margin-top:10px ;
    
    transition: all 0.3s;
    background-color: rgba(127, 140, 141, 0.3);
    color: rgba(127, 140, 141, 1.0);
    &.success {
        background-color: rgba(46, 204, 113, 0.3);
        color: rgba(46, 204, 113, 1.0);
    }
    &.info {
        background-color: rgba(127, 140, 141, 0.3);
        color: rgba(127, 140, 141, 1.0);
    }
    &.warning {
        background-color: rgba(241, 196, 15, 0.3);
        color: rgba(241, 196, 15, 1.0);
    }
    &.error {
        background-color: rgba(231, 76, 60, 0.3);
        color: rgba(231, 76, 60, 1);
    }

}
.my-enter-active{
   
    transition: all 0.3s ease-in;
    
}
.my-leave-active {
  transition: all 0.3s ease-out;
  
}
.my-enter-from,
.my-leave-to {
  top:-40px;
  opacity: 0;
}
</style>
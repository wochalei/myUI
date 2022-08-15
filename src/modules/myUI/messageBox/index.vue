<template>
<transition name="my">
  <div v-if="visible" class="message-box" @click="cancelMessageBox">
        <div class="major" @click.stop>
            <header>
                <h2>{{title}}</h2>
                <i @click="cancelMessageBox" class="iconfont">&#xe600;</i>
            </header>
            <section>
              <!--   <p>{{content}}</p> -->
              <content-view :type="type" :content="content"></content-view>
            </section>
            <footer>
                <button @click="confirmButton">{{confirmButtonText}}</button>
                <button @click="cancelMessageBox" v-if="!cancelButton">取消</button>
            </footer>
        </div>
    </div>
</transition>
  
</template>
<script setup>
import { toRefs,reactive,h} from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: 'alert'
    },
    confirmButtonText: {
        type: String,
        default: '确认'
    },
    title: {
        type: String,
        default: 'title'
    },
    content:{
        type: String,
        default: '临时数据'
    },
    cancelButton:{
        type:Boolean,
        default:true
    }
})
const {type,confirmButtonText,title,content,cancelButton} = toRefs(props);
const state = reactive({
    visible:false,
    currentText:'',
    type:''
})
const {visible} = toRefs(state);
const setVisible = (value)=>{
    visible.value=value;
}
const confirmButton = ()=>{
    state.type='confirm';
    setVisible(false);
}
const cancelMessageBox = ()=>{
    state.type = 'cancel'
    setVisible(false);
}
const contentView = (props)=>{
    switch (props.type) {
        case 'prompt':
            return h('input',{
                value:state.currentText,
                onInput:(e)=>{
                   
                   state.currentText=e.target.value;
                }
            })
            break;
    
        default:
            return h('p',props.content)
            break;
    }
}
defineExpose({
    state,
    setVisible
})
</script>

<style lang="scss" scoped>
@font-face {
    font-family: 'iconfont';
    /* Project id 2370226 */
    src: url('//at.alicdn.com/t/c/font_2370226_ga6legn6z8.woff2?t=1660463438257') format('woff2'),
        url('//at.alicdn.com/t/c/font_2370226_ga6legn6z8.woff?t=1660463438257') format('woff'),
        url('//at.alicdn.com/t/c/font_2370226_ga6legn6z8.ttf?t=1660463438257') format('truetype');
}

.iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}

.message-box {
    position: fixed;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;

    .major {
        width: 420px;
        background-color: #fff;
        padding: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);


        header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            i {
                cursor: pointer;
            }
        }

        section {
            margin: 10px 0;

            p {
                word-break: break-all;
            }
        }

        footer {
            display: flex;
            justify-content: flex-end;

            button {
                margin: 0 3px;
            }
        }
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
  
  opacity: 0;
}
</style>

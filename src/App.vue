
<template>
    <h1>message组件</h1>
    <button @click="info">info</button>
    <button @click="warning">warning</button>
    <button @click="success">success</button>
    <button @click="error">error</button>
    <h1>messageBox组件</h1>
    <button @click="toAlert">toAlert</button>
    <button @click="toConfirm">toConfirm</button>
    <button @click="toPrompt">toPrompt</button>
</template>
<script setup>
import Message from './modules/myUI/message/index.js'
import MessageBox from './modules/myUI/messageBox/index.js';
const info = () => {
    Message.info({ message: '你好' })
}
const warning = () => {
    Message.warning({ message: '你好' })
}
const success = () => {
    Message.success({ message: '你好' })
}
const error = () => {
    Message.error({ message: '你好' })
}
const toAlert = () => {
    MessageBox.alert({
      title:'标题1',
      content:'你好啊'
    })
}
const toConfirm = () => {
    MessageBox.confirm({
       title:'标题2',
       content:"加油",
       cancelButton:false
    })
}
const toPrompt = () => {
    MessageBox.prompt({
       title:'标题2',
       cancelButton:false
    }).then(e=>{
        console.log(e)
    }).catch(e=>{
        console.log(123);
    })
}
</script>

<style scoped>
</style>

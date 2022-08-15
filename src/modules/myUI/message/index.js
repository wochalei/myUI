import message from './index.vue'
import { createApp, ref, watch } from 'vue'
import types from './type';
/* 目的函数方式是动态插入vue组件 */
const messageList = ref([]);
/* 构造message应用 */
function Message(props) {
    const app = createApp(message, props)
    createMessage(app)
}
Object.values(types).forEach(item => {
    Message[item] = (props) => {
        props.type = item;
        Message(props)
    }
})
/* 挂载到dom上 */
function createMessage(app) {
    const tmp = document.createDocumentFragment();
    /* 返回该组件实例 */
    const vm = app.mount(tmp);
    document.body.appendChild(tmp);
    //通过组件内transtion实现过渡
    vm.toShow(true);
    messageList.value.push(vm);
    /* 更新对应的高度 */
    setTop();
    deleteMessage(app, vm)
}
watch(messageList, () => {
    setTop();
})
function deleteMessage(app, vm) {

    let time = setTimeout(async () => {
        /* 等待组件动画结束后再销毁 */
        await vm.toShow(false);
        messageList.value = messageList.value.filter(item => item !== vm)
        app.unmount();
        clearTimeout(time);
    }, vm.duration)
}
function setTop() {
    messageList.value.forEach((item, index) => {
        /* 未完成，获取组件高度 */
        let height = index * 50;
        item.setTop(height);
    })

}
export default Message
import {createApp} from 'vue'
import messageBox from './index.vue'
import types from './type'
import {watch} from 'vue'

/* 总结
两个对象
一个是插件   即 这个文件的index.js
一个是组件  即vue后缀

两者数据交互

插件触发组件
插件 调用 组件实例方法传值

组件触发插件

这个是插件监听组件状态，实现相应操作

总而来说即 部分需要的状态 通过监听变化来判断组件是否进行的行为（比如点击行为）
插件要销毁实例时，得需要个触发时机，组件内部行为无法检测到，所以将实例某状态抽离出来监听，如果等于什么符合条件就执行销毁


动态效果都是 组件内部transtion  比如先隐藏，然后插件调用方法显示
因为插件控制组件文件这，没法使用transiton
*/
function MessageBox (props){
    const app = createApp(messageBox,props);
    /* 通过传入函数 resovle，reject等，让函数通过自己的逻辑判断调用 */
 return  new Promise((resolve, reject) => {
    createMessageBox(app,{resolve,reject}); 
   })
        
}
Object.values(types).forEach(item=>{
    
    MessageBox[item]=(props)=>{
        props.type=item;
       return MessageBox(props)
    }
})
function createMessageBox(app,{resolve,reject}){
     const tmp = document.createDocumentFragment();
     const vm = app.mount(tmp);
     document.body.appendChild(tmp);
     vm.setVisible(true);
    /* 监听组件状态来判断组件是否点击按钮之类事件 */
     watch(vm.state,()=>{
        if(!vm.state.visible){
            switch (vm.state.type) {
                case 'confirm':
                    resolve(vm.state.currentText)
                    break;
                default:
                    reject('')
                    break;
            }
            deleteMessageBox(app);
        }
       
             
     })
}
function deleteMessageBox(app){
    //销毁应用
   app.unmount();
}
export default MessageBox
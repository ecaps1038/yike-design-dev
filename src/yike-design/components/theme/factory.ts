/**
* 切换主题修改页面样式
**/
export const changeStyle=(obj:any)=>{
    for(let key in obj){
        document.getElementsByTagName('body')[0].style.setProperty(`--${key}`, obj[key]);
    }
}

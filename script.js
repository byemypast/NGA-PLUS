// ==UserScript==
// @name     NGA PLUS
// @version  1
// @grant    GM.getValue
// @grant    GM.setValue
// @include  http://nga.178.com/*
// @include  https://nga.178.com/*
// @include  https://bbs.nga.cn/*
// @include  http://bbs.nga.cn/*
// ==/UserScript==
var ARRAY_COLOR_LIST=new Array("red","yellow","green","aqua","blue","purple","white","black")

//渲染页面
//针对帖子列表页面
async function NGA_PLUS(){
list_time = document.getElementsByClassName("silver postdate")
for (i = 0;i<list_time.length;i++){
    str_user_id = list_time[i].parentNode.firstElementChild.title
    int_user_color = await GM.getValue(str_user_id) //读取之前设置的颜色index
    if (int_user_color) {
        console.log(`user:${str_user_id} `)
        console.log(`usercolor:${ARRAY_COLOR_LIST[int_user_color % ARRAY_COLOR_LIST.length]} `)
        obj_c3 = list_time[i].parentNode
        obj_c3.parentNode.getElementsByClassName("c2")[0].getElementsByClassName("topic")[0].style.color = ARRAY_COLOR_LIST[int_user_color % ARRAY_COLOR_LIST.length]
        console.log(`color done`)
    }
    str_user_note = await GM.getValue(str_user_id + "_备注","") // 读取之前设置的备注
    if (str_user_note != ""){
        console.log(`user:${str_user_id}`)
        list_time[i].innerText += " 备注:" + str_user_note
        list_time[i].style.color = "red"
    }

}
}

NGA_PLUS();



//点击事件
document.addEventListener('click',async function(event){
    if (event.target.className == "c3"){
        str_user_id = event.target.firstElementChild.title //读取选中的用户ID
        str_user_value = await GM.getValue(str_user_id,-1) //读取之前设置的颜色
        str_user_value += 1
        await GM.setValue(str_user_id,str_user_value)
        event.target.parentNode.getElementsByClassName("c2")[0].getElementsByClassName("topic")[0].style.color = ARRAY_COLOR_LIST[str_user_value % ARRAY_COLOR_LIST.length]
    }
    if (event.target.className == "silver postdate"){
        var newstr = prompt("请输入对该用户的备注","水军(测试)")
        event.target.innerText += " 备注:" + newstr
        event.target.style.color = "red"

        str_user_id = event.target.parentNode.firstElementChild.title
        await GM.setValue(str_user_id+"_备注", newstr)
    }
    console.log(event.target.className)
},true);


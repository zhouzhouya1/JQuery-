// 封装一个函数全选跟着单个选着变换而变换
function allChangeChecked() {
    var allItems = $(".todo-main>li>label>input").length;
    var allCheckedItems = $(".todo-main>li>label>input:checked").length;
    var allChecked = allItems === allCheckedItems
    // 获取全选的状态
    $(".todo-footer input").prop("checked", allChecked)
}


// 判断删除完的时候，main和footer展示和隐藏的问题
function show() {
    $(".todo-main, .todo-footer").show();
    $(".todo-header h1").remove()
}

// 隐藏.todo-main, .todo-footer
function hide() {
    // 如果为空则将下面的隐藏todo-main,todo-footer
    $(".todo-main, .todo-footer").hide();
    // 提示没有任务
    $(".todo-header").append("<h1>恭喜你没有任务</h1>");
}

// 是否展示或是隐藏todo-main, .todo-footer
function isShow(){
    // 获取ul下是否还有li判断是否show
    $(".todo-main").children().length? show():hide()
}

// 更改已完成0 / 全部2的值
function showListNmu(){
    // 获取当前的所有的li和获取被选中的li
    var  allItems=$(".todo-main>li>label>input").length;
    var allCheckedItems=$(".todo-main>li>label>input:checked").length;
    $("#allItems").text(allItems);
    $("#allCheckedItems").text(allCheckedItems)
}
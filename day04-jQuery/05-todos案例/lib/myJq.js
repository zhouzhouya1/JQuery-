// 自己创建的数据库js
// 创建一个数组保存数据
var data = [{
    id: 1,
    todoName: "吃饭",
    toDone: "true"
  },
  {
    id: 2,
    todoName: "睡觉",
    toDone: "true"
  },
  {
    id: 3,
    todoName: "打代码",
    toDone: false,
  }
];
// 需求1：判断数据为空的时候，会隐式转换0为false根据数据渲染到页面上
if (data.length) {

  // 根据数据渲染到页面上
  var htmlArr = data.map(function (item) {
    console.log(1);
    if (item.toDone) {
      return '<li>\
        <label>\
          <input type="checkbox"  checked />\
          <span class="done">' + item.todoName + '</span>\
        </label>\
        <button class="btn btn-danger">删除</button>\
      </li>'
    } else {
      return '<li>\
    <label>\
      <input type="checkbox"/>\
      <span>' + item.todoName + '</span>\
    </label>\
    <button class="btn btn-danger" >删除</button>\
  </li>'
    }

  })
  console.log(htmlArr);
  // 插入到页面中
  $(".todo-main").html(htmlArr.join(" "));
  
} else {
  /* // 如果为空则将下面的隐藏todo-main,todo-footer
  $(".todo-main, .todo-footer").hide();
  // 提示没有任务
  $(".todo-header").append("<h1>恭喜你没有任务</h1>"); */
  hide()
}
// 注意添加js的表的顺序

showListNmu()

// 需求2.键盘抬起事件，当按下回车的时候keyCode===13添加数据
$(".todo-header input").on("keyup", function (e) {
  if (e.keyCode === 13) {
    // 获取input输入的值
    var value = $(this).val().trim();
    // 判断输入的值不能为空，if里面会隐式转换，为空的时候才是false
    if (!value) return;
    // 清空上一次输入的值,因为已经用一个变量保存下来了，所以在这里直接设置值为空也可
    $(this).val('')
    // 创建字符串，添加到todo-main
    var str = '<li>\
    <label>\
      <input type="checkbox"/>\
      <span>' + value + '</span>\
    </label>\
    <button class="btn btn-danger" >删除</button>\
  </li>'
    //   把数据插入到todo-main
    $(".todo-main").append(str);
    // 出现添加内容框和h1移除
    /*  $(".todo-main, .todo-footer").show();
     $(".todo-header h1").remove() */
    show()
    allChangeChecked();
    showListNmu()
  }
})


// 需求3 全选按钮的实现。是现在的按钮与被选中的按钮的数量相比
// 委托事件动态获取
$(".todo-main").on("click", 'li>label>input', function () {

  //选中的时候span字体添加done类
  var itemChecked = $(this).prop("checked")

  if (itemChecked) {
    $(this).next().addClass("done")
  } else {
    $(this).next().removeClass("done")
  }
  // 由于新增
  /*  var allItems=$(".todo-main>li>label>input").length;
   var allCheckedItems=$(".todo-main>li>label>input:checked").length;
   var allChecked=allItems===allCheckedItems
   // 获取全选的状态
   $(".todo-footer input").prop("checked",allChecked) */
  allChangeChecked();
  showListNmu()
});

// 需求4 删除                       更精确到这个按钮
$(".todo-main").on("click", 'li>button.btn-danger', function () {
  // 删除单行
  $(this).parent().remove()
  // 判断删除没有删除完的时候，全选按钮要跟着改变
  allChangeChecked();
  // 判断删除完的时候，main和footer展示和隐藏的问题
  isShow();
  showListNmu()
})

// 需求5 点击全选按钮则单元全选，取消则全部取消
// 点击全部删除.
$(".todo-footer label>input").on("click", function () {
  // 判断此时的状态
  var allChecked = $(this).prop("checked");
  if (allChecked) {
    // 全选 ,还要取消兄弟元素的样式
    $(".todo-main li>label>input").prop("checked", true).next().addClass("done")
  } else {
    // 全取消
    $(".todo-main li>label>input").prop("checked", false).next().removeClass("done")
  }
  // 更改已完成0 / 全部2的值
  showListNmu()
});


// 需求6，点击清除已完成任务，删除所有的已经完成的
$(".todo-footer button.btn-danger").on("click",function(){
  // 获取所有的checked
  $(".todo-main li>label>input:checked").parent().parent().remove();
  // 展示删完的已更改的值
  showListNmu()
  // 在判断是否展示页面
  isShow()

})
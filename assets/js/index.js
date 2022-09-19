$(function () {
  // 调用getUserInFo()获取用户基本信息
  getUserInFo();
  var layer = layui.layer;
  //点击摁钮实现退出功能
  $("#btnLogoout").on("click", function () {
    //  提示用户是否退出
    layer.confirm(
      "确定退出登录？",
      { icon: 3, title: "提示" },
      function (index) {
        //do something
        // console.log("ok");
        // 清空本地储存的token
        localStorage.removeItem("token");
        // 重新跳转到登录界面
        location.href = "../../login.html";
        // 关闭询问框
        layer.close(index);
      }
    );
  });
});

// 获取用户基本信息
function getUserInFo() {
  $.ajax({
    method: "get",
    url: "/my/userinfo",
    // headers: {
    //  // Authorization: localStorage.getItem("token") || "",
    // },
    success: function (res) {
      //   console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败");
      }
      renderAvatar(res.data);
    },
    // 不论是成功还是失败最终都会调用complete回调函数
  });
}

// 渲染用户的头像
function renderAvatar(user) {
  // 获取用户的名称
  var name = user.nicename || user.username;
  // 设置欢迎的文本
  $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
  // 按需渲染用户的头像
  if (user.user_pic !== null) {
    // 渲染图片头像
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    // 渲染文本头像
    $(".layui-nav-img").hide();
    var first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
}

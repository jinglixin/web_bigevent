$(function () {
  var form = layui.form;
  var layer = layui.layer;
  // 书写验证规则
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度应该在1~6之间";
      }
    },
  });

  initUsserInfo();

  function initUsserInfo() {
    $.ajax({
      method: "get",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取用户信息失败");
        }
        // console.log(res);
        // 调用form。val（快速为表单赋值
        form.val("formUseInfo", res.data);
      },
    });
  }
  $("#btnreset").on("click", function (e) {
    e.preventDefault();
    initUsserInfo();
  });

  //   坚挺表单的提交事件
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    // 发我ajax数据请求
    $.ajax({
      method: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更新用户信息失败！");
        }
        layer.msg("更新用户信息成功！");
        // 调用父页面中的方法，重新渲染用户的头像和用户的信息
        // console.log(window.parent.getUserInFo);
        window.parent.getUserInFo();
      },
    });
  });
});

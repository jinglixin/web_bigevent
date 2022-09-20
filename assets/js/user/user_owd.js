$(function () {
  var form = layui.form;
  var layer = layui.layer;
  // 书写验证规则
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    snameowd: function (value) {
      if (value === $("[name=oldPWd]").val()) {
        return "新旧密码不一样";
      }
    },
    rePwd: function (value) {
      if (value === $("[name=repwd]").val()) {
        return "新旧密码不一样";
      }
    },
  });
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/my/updatepwd",
      data: $(this).seraliize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更新失败");
        }
        layer.msg("更新密码成功");
        // 重置表单
        $(".layui-form")[0].reset();
      },
    });
  });
});

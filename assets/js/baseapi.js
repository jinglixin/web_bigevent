$.ajaxPrefilter(function (options) {
  // 每次调用会先调用这个函数
  options.url = "http://www.liulongbin.top:3007" + options.url;

  // ;统一为有权限的接口设置headers请求头
  if (options.url.indexOf("/my/") !== 1) {
    options.headers = { Authorization: localStorage.getItem("token") || "" };
  }

  // 统一挂载complete回调函数
  options.complete = function (res) {
    // console.log("执行了回调");
    // console.log(res);
    // 在complete回调函数中可以使用res.responseJSON拿到服务器响应回来的数据
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败"
    ) {
      // 强制清空token
      localStorage.removeItem("token");
      // 强制跳转到登录界面
      location.href = "../../login.html";
    }
  };
});

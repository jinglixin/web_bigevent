$.ajaxPrefilter(function (options) {
  // 每次调用会先调用这个函数
  options.url = "http://www.liulongbin.top:3007" + options.url;
});

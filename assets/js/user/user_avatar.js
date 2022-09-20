$(function () {
  var form = layui.form;
  var layer = layui.layer;
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  $(".btnchosseimg").on("click", function () {
    $("#file").click();
  });

  // 为文件筐绑定change事件
  $("#file").on("change", function (e) {
    // 获取用户选择的图片
    var filelist = e.target.files;
    console.log(filelist);
    if (filelist.length === 0) {
      return layer.msg("请选择照片！");
    }
    // 拿到用户选择的wenjian
    var file = e.target.files[0];
    // 将文件转换为路径
    var newImgURL = URL.createObjectURL(file);
    // 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });
  $("#btnUpload").on("click", function () {
    // 拿到用户裁剪之后的头像
    var dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    //
    // 调用接口把头像上传
    $.ajax({
      method: "post",
      url: "/my/update/avatar",
      data: {
        avatar: dataURL,
      },
      succrss: function (res) {
        if (res.atatus !== 0) {
          return layer.msg("更换头像失败");
        }
        layer.msg("更换图像成功");
        window.parent.getUserInFo();
      },
    });
  });
});

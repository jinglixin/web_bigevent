$(function () {
  var form = layui.form;
  var layer = layui.layer;
  // 获取文章分类的列表
  initArtCatelist();
  function initArtCatelist() {
    $.ajax({
      method: "get",
      url: "/my/article/cates",
      success: function (res) {
        // console.log(res);
        var htmlStr = template("tpl-table", res);
        $("tbody").html(htmlStr);
      },
    });
  }
  //   为类别摁钮绑定点击事件
  var indexAdd = null;
  $("#btnAddCate").on("click", function () {
    indexAdd = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $("#dialog-add").html(),
    });
  });
  //   通过代理的形式为form-add表单绑定监听事件
  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    // console.log("ok");
    $.ajax({
      method: "post",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("新增分类失败");
        }
        initArtCatelist();
        layer.msg("新增分类成功");
        // 根据索引关闭对应的弹出层
        layer.close(indexAdd);
      },
    });
  });
  var indexEdit = null;

  //   通过代理的形式为form-add表单绑定监听事件
  $("tbody").on("click", ".btn-edit", function (e) {
    // e.preventDefault();
    // 弹出一个修改文章分类的层
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章分类",
      content: $("#dialog-eid").html(),
    });
    var id = $(this).attr("data-id");
    // console.log(id);
    $.ajax({
      method: "get",
      url: "/my/article/cates/" + id,
      success: function (res) {
        // console.log(res);
        form.val("form-edit", res.data);
      },
    });
  });
  //   通过代理的形式为修改分类的表单表单绑定submit事件
  $("body").on("submit", "#form-eid", function (e) {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("更新数据分类失败");
        }
        initArtCatelist();
        layer.msg("新增分类数据成功");
        // 根据索引关闭对应的弹出层
        layer.close(indexEdit);
        initArtCatelist();
      },
    });
  });
  // 通过代理形式
  $("tbody").on("click", ".btn-dlete", function () {
    var id = $(this).attr("data-id");
    // 询问是否删除
    layer.confirm("确认删除？", { icon: 3, title: "提示" }, function (index) {
      //do something
      $.ajax({
        method: "get",
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg("删除分类失败");
          }

          layer.msg("删除分类成功");
          // 根据索引关闭对应的弹出层

          layer.close(index);
          initArtCatelist();
        },
      });
    });
  });
});

//获取url中的参数

export default {
  getURLParams: function (url) {
    if (url.indexOf("?") == -1) {
      return {};
    }
    var params = {};
    var str = url.split("?")[1];  //通过?得到一个数组,取?后面的参数
    var items = [str];
    if (url.indexOf("&") != -1) {
      items = str.split("&"); //分割成数组
    }
    var arr, name, value;
    for (var i = 0; i < items.length; i++) {
      arr = items[i].split("=");
      name = arr[0];
      value = arr[1];
      params[name] = value;
    }
    return params;
  }
}

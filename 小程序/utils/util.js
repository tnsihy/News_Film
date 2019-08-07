// 存放公共数据 

// 计算星星
function convertToStarsArray(stars) {
  // 例如 4.5星取4
  var num = stars.toString().substring(0, 1);
  var array = [];
  // 例如 4星 [1,1,1,1,0]
  for (var i = 1; i <= 5; i++) {
    if(i <= num){
      array.push(1);
    }else{
      array.push(0);
    }
  }
  return array;
}

// 影人信息 用斜杠拼接
function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + '/';
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

// 影人信息 图片_名字
function convertToCastInfos(casts){
  var castsArray = [];
  for(var idx in casts){
    var cast = {
      img:casts[idx].avatars ? casts[idx].avatars.large:"",
      name:casts[idx].name
    }
    castsArray.push(cast);
    // console.log(castsArray);
  }
  return castsArray;
}

// http请求数据
function http(url,callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "application/xml"
    },
    success: function (res) {
      callBack(res.data)
    },
    fail: function (err) {
      // fail
      console.log(err);
    }
  })
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http:http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}
var util = require('../../../../utils/util.js')

class Movie{
  // 构造函数
  constructor(url){
    this.url = url;
  }

  // cb = callback
  getMovieData(cb){
    this.cb = cb;
    util.http(this.url,this.processDoubanData);
  }

  processDoubanData(data){
    // ***
    this.cb(movie);
  }
}

export {Movie}
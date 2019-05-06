var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp();
Page({
  data: {
    tabs: ["视力表", "视力检测", "色盲测试", "散光测试"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    images: [
      ['/images/E00.png', '/images/E01.png', '/images/E02.png', '/images/E03.png'],
      ['/images/E10.png', '/images/E11.png', '/images/E12.png', '/images/E13.png']
    ],
    id: 0,
    jd: 0,
    count: 0
  },
  onLoad: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function(e) {
    let that=this;
    that.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });

    that.refreshsl();
  },
  onShow: function() {
    let that = this;
    //that.goto_img();
  },
  up: function(e) {
    let that = this;
    if (this.data.jd == 0) {

      that.setyes();

    } else {
      that.setno();
    }
    that.goto_img();

  },
  down: function(e) {
    let that = this;
    if (that.data.jd == 2) {
      that.setyes();

    } else {
      that.setno();
    }
    that.goto_img();

  },
  left: function(e) {
    let that = this;
    if (that.data.jd == 3) {
      that.setyes();

    } else {
      that.setno();
    }

    that.goto_img();
  },
  right: function(e) {
    let that = this;
    if (that.data.jd == 1) {
      that.setyes();
    } else {
      that.setno();
    }
    that.goto_img();
  },
  clear: function(e) {
    wx.showModal({
      title: '提示',
      content: '是否鍉交测试结果?',
    })
  },
  goto_img: function() {
    let that = this;
    let count = that.data.count + 1;
    that.setData({
      count: count
    })

    let iss = Math.round(that.data.count % 3);

    console.log("iss----", iss);

    if (!iss) {
      app.globalData.id = Math.round(that.data.count / 3);
      app.globalData.list = [];
      console.log("that.data.id", app.globalData.id);
    }
    var random = Math.floor(Math.random() * 4);

    this.setData({
      id: app.globalData.id,
      jd: random
    })

  },

  setyes: function() {
    let that = this;
    app.globalData.list.unshift("success");
    that.setData({
      list: app.globalData.list
    })
  },
  setno: function() {
    let that = this;
    app.globalData.list.unshift("cancel");
    that.setData({
      list: app.globalData.list
    })
  },

  refreshsl:function(){
    let that=this;
    app.globalData.list=[];
    app.globalData.id=0;
    var random = Math.floor(Math.random() * 4);
    that.setData({
      id: 0,
      jd: random,
      list:[],
      count: 0
    })
  }


});
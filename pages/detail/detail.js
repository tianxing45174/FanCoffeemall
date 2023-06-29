// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    counts: 0,
    dataobj: null,
    pid: null,
    sugar_desc: null,
    sugar: null,
    sugarindex: 0,
    oksugar: "全糖",
    tem_desc: null,
    tem: null,
    temindex: 0,
    oktem: "冷",
    count: 1,
    arrs: null,
    list: ['1', '2', '3', '4', '5'],
    isshow: false,
    token: null,
    nbTitle: '商品详情'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      pid: options.pid
    })
    // 获取token
    wx.getStorage({
        key: "token",
        success: res => {
          // console.log(res.data);
          this.setData({
            token: res.data
          })
          // console.log(this.data);
          wx.request({
              url: 'http://www.kangliuyong.com:10002/findAllLike',
              method: "GET",
              data: {
                appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
                tokenString: this.data.token
              },
              success: res => {
                let arr = res.data.result;
                // console.log(res);
                let pidarr = arr.filter(({
                  pid
                }) => {
                  return pid == this.data.pid
                });
                if (pidarr.length > 0) {
                  this.setData({
                    isshow: true
                  })
                }
              }
            }),
            wx.request({
              url: 'http://www.kangliuyong.com:10002/shopcartCount',
              method: "GET",
              data: {
                appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
                tokenString: this.data.token
              },
              success: res => {
                this.setData({
                  counts: res.data.result
                })
              }
            })
        }
      }),
      wx.setNavigationBarTitle({
        title: '商品详情'
      })
    // 获取商品详情数据
    this.getgoodinfo()
  },
  // 获取商品详情数据
  getgoodinfo() {
    wx.request({
      url: 'http://www.kangliuyong.com:10002/productDetail',
      method: "GET",
      data: {
        pid: this.data.pid,
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="
      },
      success: res => {
        let sugar = res.data.result[0].sugar.split("/");
        // console.log(sugar,"tang");
        let tem = res.data.result[0].tem.split("/");
        // console.log(res.data.result);
        this.setData({
          dataobj: res.data.result[0],
          sugar: sugar,
          sugar_desc: res.data.result[0].sugar_desc,
          tem: tem,
          tem_desc: res.data.result[0].tem_desc
        })
        let str = this.data.dataobj.desc;
        let arr = str.split("。");
        arr.splice(-1, 1)
        this.setData({
          arrs: arr
        })
      }
    })
  },
  // 糖分的选择
  sugar(e) {
    // console.log(e);
    let index = e.currentTarget.dataset.index;
    let oksugar = e.currentTarget.dataset.text;
    this.setData({
      sugarindex: index,
      oksugar: oksugar
    })
  },
  // 温度的选择
  tem(e) {
    let index = e.currentTarget.dataset.index;
    let oktem = e.currentTarget.dataset.text;
    this.setData({
      temindex: index,
      oktem: oktem
    })
  },
  // 增加商品数量
  add() {
    let num = this.data.count;
    num++;
    this.setData({
      count: num
    })
  },
  // 减少商品数量
  sub() {
    let num = this.data.count;
    if (num == 0) {
      wx.showToast({
        title: '不能再减了',
        icon: "error",
        // mask:true
      })
    } else {
      num--;
      this.setData({
        count: num
      })
    }
  },
  //添加或者取消收藏
  addcollect() {
    // console.log("aaaa");
    let that = this;
    if (that.data.isshow == false) {
      if (that.data.token != null) {
        wx.request({
          url: 'http://www.kangliuyong.com:10002/like',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          },
          data: {
            pid: that.data.dataobj.pid,
            tokenString: that.data.token,
            appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="
          },
          success: res => {
            that.setData({
              isshow: true
            })
            wx.showTabBar({
              title: '已成功收藏',
              icon: "success"
            })
          },
          fail: err => {
            console.log(err);
          }
        })
      } else {
        wx.navigateTo({
          url: '../login/login',
        })
      }
    }
    if (that.data.isshow == true) {
      if (that.data.token !== null) {
        wx.request({
          url: 'http://www.kangliuyong.com:10002/notlike',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          },
          data: {
            pid: that.data.dataobj.pid,
            tokenString: that.data.token,
            appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="
          },
          success: res => {
            that.setData({
              isshow: false
            });
            wx.showTabBar({
              title: '已取消收藏',
              icon: "error"
            })
          }
        })
      }
    }
  },
  //加入购物车
  addcart() {
    let that = this;
    wx.getStorage({
      key: "token",
      success: res => {
        // console.log(res.data);
        let token = res.data;
        wx.request({
          url: 'http://www.kangliuyong.com:10002/addShopcart',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          },
          data: {
            pid: that.data.pid,
            count: that.data.count,
            rule: `${that.data.oktem}/${that.data.oksugar}`,
            appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
            tokenString: token
          },
          success: res => {
            wx.showToast({
              title: "加入成功",
              icon: "success"
            })
            this.setData({
              counts: this.data.counts + that.data.count
            })
          }
        })
      },
      fail: res => {
        wx.showToast({
          title: "加入失败",
          icon: "error"
        })
        wx.navigateTo({
          url: '../login/login',
        })
      }
    })
  },
  //跳转购物车
  gocart() {
    wx.switchTab({
      url: '../car/car',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // this.getgoodinfo()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
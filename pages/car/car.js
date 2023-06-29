// pages/car/car.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num1: 0,
    num2: 0,
    result: "",
    totalmoney: 0,
    token: null,
    hotlist: null,
    allchecked: [],
    radio: false,
    type:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // console.log("onReady");
  },

  replace(e) {
    const child = this.selectComponent('.carlist');
    console.log();
    if (child.data.checked.length == this.data.hotlist.length) {
      this.setData({
        radio: true
      })
    } else {
      this.setData({
        radio: false
      })
    }
    this.setData({
      allchecked: child.data.checked
    })
    this.onShow()
  },
  //返回详情页
  backdetail(e) {
    console.log(e);
  },
  //删除购物车
  deletecars() {
    wx.request({
      url: 'http://www.kangliuyong.com:10002/removeShopcart',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        tokenString: this.data.token,
        sids: JSON.stringify(this.data.allchecked)
      },
      success: res => {
        console.log(res);
        this.onShow()
      },
      fail: res => {
        wx.showToast({
          title: "修改失败",
          icon: "error"
        })
        return
      }
    })
  },
  //全选
  changeallcheck(e) {
    // console.log("countmoney");
    // console.log(e);
    this.setData({
      radio: e.detail
    });
    if (e.detail) {
      let alll = this.data.hotlist;
      console.log(alll);
      let allsid = []
      for (let i = 0; i < alll.length; i++) {
        allsid.push(alll[i].sid) 
      }
      let allmoney = 0
      for (let i = 0; i < alll.length; i++) {
        allmoney += parseFloat(alll[i].price) * parseInt(alll[i].count);
      }
      this.setData({
        totalmoney: allmoney,
        allchecked: allsid
      })
    } else {
      this.setData({
        totalmoney: 0,
      })
    }
  },
  submitorder(e){
    console.log(this.data.allchecked);
    if (this.data.allchecked.length!=0) {
      wx.navigateTo({
        url: '../../pages/submit/submit?allchecked='+this.data.allchecked,
      })
    } else {
      wx.showToast({
        title: '请选择商品',
        icon:'error'
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow(options) {
    this.data.totalmoney = 0,
      wx.getStorage({
        key: "token",
        success: res => {
          this.setData({
              token: res.data
            }),
            wx.request({
              url: 'http://www.kangliuyong.com:10002/findAllShopcart',
              method: "GET",
              data: {
                appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
                tokenString: this.data.token
              },
              success: res => {
                let allmoney = 0;
                this.data.allchecked.forEach(checkk => {
                  res.data.result.forEach(alll => {
                    if (checkk == alll.sid) {
                      allmoney += parseFloat(alll.price) * parseInt(alll.count);
                    }
                  });
                });
                this.setData({
                  totalmoney: allmoney,
                  hotlist: res.data.result,
                })
              }
            })
        }
      })
  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

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
// pages/submit/submit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    checked: '1'
  },
  showPopup() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  changeAddress(event) {
    // console.log(event.detail);
    let arr = this.data.myaddress
    let choosechecked = arr.filter(({
      id
    }) => {
      return id == event.detail
    })
    // console.log(choosechecked[0]);
    this.setData({
      checked: event.detail,
      choosechecked: choosechecked[0]
    });
    this.onClose()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.getStorage({
      key: "token",
      success: res => {
        this.setData({
          token: res.data
        })
        wx.request({
          url: 'http://www.kangliuyong.com:10002/findAddress',
          method: "GET",
          data: {
            appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
            tokenString: this.data.token,
          },
          success: res => {
            let arr = res.data.result
            let defaultchecked = arr.filter(({
              isDefault
            }) => {
              return isDefault == 1
            })
            this.setData({
              myaddress: res.data.result,
              checked: defaultchecked[0].id,
              choosechecked: defaultchecked[0]
            })
          }
        })
        wx.request({
          url: 'http://www.kangliuyong.com:10002/commitShopcart',
          method: "GET",
          data: {
            appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
            tokenString: this.data.token,
            sids: JSON.stringify(options.allchecked.split(','))
          },
          success: res => {
            let totalmoney = 0
            let totalcount = 0
            for (let i = 0; i < res.data.result.length; i++) {
              let {
                price,
                count
              } = res.data.result[i];
              totalcount += parseInt(count)
              totalmoney += parseFloat(price) * parseInt(count)
            }
            this.setData({
              allchecked:options.allchecked.split(','),
              commitShop: res.data.result,
              totalcount,
              totalmoney
            })
          }
        })
        console.log(this.data);
      }
    })
  },

  onSubmit(e) {
    wx.request({
      url: 'http://www.kangliuyong.com:10002/pay',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        tokenString: this.data.token,
        sids: JSON.stringify(this.data.allchecked),
        phone: this.data.choosechecked.tel,
        address: this.data.choosechecked.id,
        receiver: this.data.choosechecked.name
      },
      success: res => {
        console.log("res", res);
        wx.switchTab({
          url: '../../pages/car/car',
        })
      }
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
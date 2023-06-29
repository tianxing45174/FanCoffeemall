// pages/wode/wode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mineobj: "",
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


  },
  gomyin() {
    wx.navigateTo({
      url: '../myin/myin',
    })
  },
  gomyaddress() {
    wx.navigateTo({
      url: '../myaddress/myaddress',
    })
  },
  gomycollect() {
    wx.navigateTo({
      url: '../mycollect/mycollect',
    })
  },
  gomyorder() {
    wx.navigateTo({
      url: '../myorder/myorder',
    })
  },
  goaccount() {
    wx.navigateTo({
      url: '../account/account',
    })
  },
  changeuserbg(e) {
    wx.getStorage({
      key: "token",
      success: res => {
        // console.log(res.data);
        this.setData({
          token: res.data
        })
        wx.chooseImage({
          success: res => {
            console.log(res);
            let imgadd = res.tempFilePaths[0]
            let imgtype = imgadd.split('.')[1]
            // console.log(imgtype);
            wx.getFileSystemManager().readFile({
              filePath: imgadd,
              encoding: 'base64',
              success: R => {
                this.setData({
                  bgImg: {
                    imgType: imgtype,
                    url: imgadd,
                    imgbase64: R.data
                  }
                })
                // console.log(this.data);
                wx.request({
                  url: 'http://www.kangliuyong.com:10002/updateUserBg',
                  method: "POST",
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                  },
                  data: {
                    appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
                    tokenString: this.data.token,
                    imgtype: this.data.bgImg.imgtype,
                    serverBase64Img: this.data.bgImg.imgbase64
                  },
                  success: res => {
                    // console.log(res);
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
              }
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // console.log(this.data.token);
    wx.getStorage({
      key: "token",
      success: res => {
        // console.log(res.data);
        this.setData({
          token: res.data
        })
        wx.request({
          url: 'http://www.kangliuyong.com:10002/findMy',
          method: "GET",
          data: {
            appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
            tokenString: this.data.token
          },
          success: res => {
            this.setData({
              mineobj: res.data.result[0]
            })
            // console.log(res.data);
            // console.log(this.data.mineobj);
          }
        })

      }
    })
    // wx.request({
    //   url: 'http://www.kangliuyong.com:10002/findMy',
    //   method: "GET",
    //   data: {
    //     appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
    //     tokenString: this.data.token
    //   },
    // })
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
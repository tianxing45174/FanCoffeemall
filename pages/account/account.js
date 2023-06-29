// pages/account/account.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    oldpassword: "",
    newpassword: ""
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
  Changeoldpassword(e) {
    //定义正则表达式
    var reg = '^[A-Za-z]\\w{5,15}$';
    //创建正则表达式对象
    var regExp = new RegExp(reg);
    //使用test()函数验证数据是否匹配正则表达式，匹配返回true,否则返回false
    console.log(regExp.test(e.detail.value));
    if (regExp.test(e.detail.value)) {
      this.setData({
        oldpassword: e.detail.value
      })
    } else {
      wx.showToast({
        title: '密码格式不正确',
        icon: 'error'
      })
      this.setData({
        oldpassword: ""
      })
    }
  },
  Changenewpassword(e) {
    //定义正则表达式
    var reg = '^[A-Za-z]\\w{5,15}$';
    //创建正则表达式对象
    var regExp = new RegExp(reg);
    //使用test()函数验证数据是否匹配正则表达式，匹配返回true,否则返回false
    console.log(regExp.test(e.detail.value));
    if (regExp.test(e.detail.value)) {
      this.setData({
        newpassword: e.detail.value
      })
    } else {
      wx.showToast({
        title: '密码格式不正确',
        icon: 'error'
      })
      this.setData({
        newpassword: ""
      })
    }
  },
  updatePassword() {
    if (this.data.newpassword != "" && this.data.oldpassword != "") {
      wx.getStorage({
        key: "token",
        success: res => {
          this.setData({
            token: res.data
          })
          wx.request({
            url: 'http://www.kangliuyong.com:10002/updatePassword',
            method: "POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            data: {
              appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
              tokenString: this.data.token,
              password: this.data.newpassword,
              oldPassword: this.data.oldpassword
            },
            success: res => {
              console.log("res", res.data);
              if (res.data.code == "E003") {
                wx.showToast({
                  title: res.data.msg,
                  icon: "error"
                })
              } else if (res.data.code == "E001") {
                wx.showToast({
                  title: res.data.msg,
                })
                wx.navigateTo({
                  url: '../../pages/login/login',
                })
              }
            }
          })
        }
      })
    }
  },
  destroyAccount() {
    console.log("destroyAccount");
    wx.getStorage({
      key: "token",
      success: res => {
        this.setData({
          token: res.data
        })
        wx.request({
          url: 'http://www.kangliuyong.com:10002/destroyAccount',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          },
          data: {
            appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
            tokenString: this.data.token
          },
          success: res => {
            console.log("res", res);
            wx.showToast({
              title: res.data.msg,
            })
            wx.navigateTo({
              url: '../../pages/login/login',
            })
          }
        })
      }
    })
  },
  logout() {
    console.log("logout");
    wx.getStorage({
      key: "token",
      success: res => {
        this.setData({
          token: res.data
        })
        wx.request({
          url: 'http://www.kangliuyong.com:10002/logout',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          },
          data: {
            appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
            tokenString: this.data.token
          },
          success: res => {
            console.log("res", res);
            wx.navigateTo({
              url: '../../pages/login/login',
            })
          }
        })
      }
    })
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
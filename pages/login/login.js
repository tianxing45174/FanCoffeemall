// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myphone: null,
    mypas: null,
    token: null,
    show: false,
    nickName: "",
    phone: "",
    password: ""
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
  Changepassword(e) {
    //定义正则表达式
    var reg = '^[A-Za-z]\\w{5,15}$';
    //创建正则表达式对象
    var regExp = new RegExp(reg);
    //使用test()函数验证数据是否匹配正则表达式，匹配返回true,否则返回false
    console.log(regExp.test(e.detail.value));
    if (regExp.test(e.detail.value)) {
      this.setData({
        password: e.detail.value
      })
    } else {
      wx.showToast({
        title: '密码格式不正确',
        icon: 'error'
      })
      this.setData({
        password: ""
      })
    }
  },
  Changephone(e) {
    //定义正则表达式
    var reg = '^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-9])|(18[0-9])|166|198|199|191|(147))\\d{8}$';
    //创建正则表达式对象
    var regExp = new RegExp(reg);
    //使用test()函数验证数据是否匹配正则表达式，匹配返回true,否则返回false
    console.log(regExp.test(e.detail.value));
    if (regExp.test(e.detail.value)) {
      this.setData({
        phone: e.detail.value
      })
    } else {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'error'
      })
      this.setData({
        phone: ""
      })
    }
  },
  ChangenickName(e) {
    if (e.detail.value != "") {
      this.setData({
        nickName: e.detail.value
      })
    } else {
      wx.showToast({
        title: '输入昵称',
        icon: 'error'
      })
      this.setData({
        nickName: ""
      })
    }
  },
  btnlogin() {
    wx.request({
      url: 'http://www.kangliuyong.com:10002/login',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        password: this.data.mypas,
        phone: this.data.myphone
      },
      success: res => {
        // console.log(res);
        if (res.data.code == 200) {
          wx.showToast({
            title: '登录成功',
            icon: "success"
          })
          wx.setStorage({
            key: "token",
            data: res.data.token
          })
          wx.switchTab({
            url: '../home/home',
          })
        } else {
          wx.showToast({
            title: '登录失败',
            icon: "error"
          })
        }
      }
    })
  },
  btnreg() {
    console.log(this.data);
    if (this.data.nickName != "" && this.data.password != "" && this.data.phone != "") {
      wx.request({
        url: 'http://www.kangliuyong.com:10002/register',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        data: {
          appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
          nickName: this.data.nickName,
          password: this.data.password,
          phone: this.data.phone
        },
        success: res => {
          console.log(res);
          wx.showToast({
            title: "加入成功",
            icon: "success"
          })
          wx.navigateTo({
            url: '../../pages/login/login',
          })
        }
      })
    } else {
      wx.showToast({
        title: '请输入数据',
        icon: 'error'
      })
    }
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
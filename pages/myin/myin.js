// pages/myin/myin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: null,
    myinf: "",
    oldimg: "",
    readonly: true,
    checked: false,
    newImg: {
      imgType: "",
      url: "",
    },
    newnickName: "",
    newdesc: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      readonly: true,
      checked: false
    })
    wx.getStorage({
      key: "token",
      success: res => {
        this.setData({
          token: res.data
        })
        wx.request({
          url: 'http://www.kangliuyong.com:10002/findAccountInfo',
          method: "GET",
          data: {
            appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
            tokenString: this.data.token
          },
          success: res => {
            this.setData({
              myinf: res.data.result[0],
              oldimg: res.data.result[0].userImg,
              newnickName: res.data.result[0].nickName,
              newdesc: res.data.result[0].desc
            })
            // console.log("ononon", this.data.myinf);
          }
        })
      }
    })
  },
  beforeRead(e) {
    let imgadd = e.detail.file.url
    let imgtype = imgadd.split('.')[1]
    console.log(this.data.newImg);
    wx.getFileSystemManager().readFile({
      filePath: imgadd,
      encoding: 'base64',
      success: R => {
        this.setData({
          oldimg: imgadd,
          newImg: {
            imgType: imgtype,
            url: imgadd,
            imgbase64: R.data
          }
        })
        console.log(this.data);
      }
    })
  },
  onChange(e) {
    this.setData({
      checked: e.detail,
      readonly: !this.data.readonly
    });
    if (!e.detail) {
      this.onLoad()
    }
  },

  changeNickname(e) {
    this.setData({
      newnickName: e.detail.value
    })
    // console.log(this.data.newnickName);
  },
  changeDesc(e) {
    this.setData({
      newdesc: e.detail.value
    })
    // console.log(this.data.newdesc);
  },

  onsubmit(e) {
    // console.log(this.data.newnickName);
    // console.log(this.data.myinf.nickName);
    if (this.data.newnickName != this.data.myinf.nickName) {
      wx.request({
        url: 'http://www.kangliuyong.com:10002/updateNickName',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        data: {
          appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
          tokenString: this.data.token,
          nickName: this.data.newnickName
        },
        success: res => {
          console.log("修改昵称");
        },
        fail: res => {
          wx.showToast({
            title: "昵称修改失败",
            icon: "error"
          })
          return
        }
      })
    }
    if (this.data.newdesc != this.data.myinf.desc) {
      wx.request({
        url: 'http://www.kangliuyong.com:10002/updateDesc',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        data: {
          appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
          tokenString: this.data.token,
          desc: this.data.newdesc
        },
        success: res => {
          console.log("修改简介");
        },
        fail: res => {
          wx.showToast({
            title: "简介修改失败",
            icon: "error"
          })
          return
        }
      })
    }
    if (this.data.newImg.imgbase64 != null) {
      console.log(this.data);
      wx.request({
        url: 'http://www.kangliuyong.com:10002/updateAvatar',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        data: {
          appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
          tokenString: this.data.token,
          imgtype: this.data.newImg.imgtype,
          serverBase64Img: this.data.newImg.imgbase64
        },
        success: res => {
          console.log(res);
          this.onLoad()
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
    if (this.data.newdesc != this.data.myinf.desc || this.data.newnickName != this.data.myinf.nickName || this.data.newImg.imgbase64!=null) {
      wx.showToast({
        title: "修改成功",
        icon: "success"
      })
    } else {
      wx.showToast({
        title: "修改失败",
        icon: "error"
      })
    }
    this.onLoad();
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
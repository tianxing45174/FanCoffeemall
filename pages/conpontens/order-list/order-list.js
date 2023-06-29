// pages/conpontens/order-list/order-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderlist: []
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    confirm(e) {
      // console.log(e.currentTarget.dataset);
      wx.getStorage({
        key: "token",
        success: res => {
          this.setData({
            token: res.data
          })
          wx.request({
            url: 'http://www.kangliuyong.com:10002/receive',
            method: "POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            data: {
              appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
              tokenString: this.data.token,
              oid: e.currentTarget.dataset.oid
            },
            success: res => {
              console.log("res", res);
              this.triggerEvent('orderlistreplace', {})
            }
          })
        }
      })
    },
    deleteorder(e) {
      console.log(e.currentTarget.dataset);
      wx.getStorage({
        key: "token",
        success: res => {
          this.setData({
            token: res.data
          })
          wx.request({
            url: 'http://www.kangliuyong.com:10002/removeOrder',
            method: "POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            data: {
              appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
              tokenString: this.data.token,
              oid: e.currentTarget.dataset.oid
            },
            success: res => {
              console.log("res", res);
              this.triggerEvent('orderlistreplace', {})
            }
          })
        }
      })
    }
  }
})
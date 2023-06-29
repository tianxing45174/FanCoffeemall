// pages/conpontens/home-list/home-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    arr: {
      // 建立一个数据类型
      type: Array
    }
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
    godetail(e) {
      // console.log(e.currentTarget.dataset.indexx);
      wx.navigateTo({
        url: `../../pages/detail/detail?pid=${e.currentTarget.dataset.pid}`,
      })
    },
    delectCollect(e) {
      let {
        pid
      } = e.currentTarget.dataset
      wx.getStorage({
        key: "token",
        success: res => {
          this.setData({
            token: res.data
          })
          wx.request({
            url: 'http://www.kangliuyong.com:10002/notlike',
            header: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            method: 'POST',
            data: {
              appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
              pid,
              tokenString: this.data.token
            },
            success: res => {
              // console.log(res);
              this.triggerEvent('collectreplace')
              // this.setData({
              //   collectlist: res.data.result
              // })
            }
          })
        }
      })
    }
  }
})
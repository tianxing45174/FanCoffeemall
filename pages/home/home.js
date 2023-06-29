// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: null,
    hotlist: null
  },
  onLoad(options) {
    wx.request({
        url: 'http://www.kangliuyong.com:10002/banner',
        data: {
          appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="
        },
        success: res => {
          this.setData({
            banner: res.data.result
          })
        }
      }),
      wx.request({
        url: 'http://www.kangliuyong.com:10002/typeProducts',
        data: {
          appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
          key: 'isHot',
          value: 1
        },
        success: res => {
          // console.log(res.data);
          this.setData({
            hotlist: res.data.result
          })
        }
      })
  },
  onSearch() {
    // console.log("aaa");
    wx.navigateTo({
      url: `../../pages/search/search`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

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
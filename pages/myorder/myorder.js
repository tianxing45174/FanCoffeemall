// pages/myorder/myorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    status: 0
  },

  onChange(event) {
    console.log(event.detail.name);
    this.setData({
      status:event.detail.name
    })
    this.onLoad()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.getStorage({
      key: "token",
      success: res => {
        // console.log(res.data);
        let token = res.data;
        this.setData({
          token
        })
        wx.request({
          url: 'http://www.kangliuyong.com:10002/findOrder',
          method: 'GET',
          data: {
            appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
            tokenString: this.data.token,
            status:this.data.status
          },
          success: res => {
            this.setData({
              myorderlist:res.data.result
            })

            const sortClass = (sortData) => {
              const groupBy = (array, f) => {
                let groups = {};
                array.forEach((o) => {
                  let group = JSON.stringify(f(o));
                  groups[group] = groups[group] || [];
                  groups[group].push(o);
                });
                return Object.keys(groups).map((group) => {
                  return groups[group];
                });
              };
              const sorted = groupBy(sortData, (item) => {
                return item.oid; // 返回需要分组的对象
              });
              return sorted;
            };
            let orderlist = sortClass(this.data.myorderlist)
            for (let i = 0; i < orderlist.length; i++) {
              let totalcount = 0;
              let totalmoney = 0;
              for (let j = 0; j < orderlist[i].length; j++) {
                let {
                  price,
                  count
                } = orderlist[i][j];
                totalcount += parseInt(count)
                totalmoney += parseFloat(price) * parseInt(count)
              }
              orderlist[i][0].totalcount = parseInt(totalcount)
              orderlist[i][0].totalmoney = parseFloat(totalmoney)
            }
            this.setData({
              orderlist,
            })
          }
        })
      },
    })
    console.log(this.data);
  },
  replace(){
    this.onLoad()
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
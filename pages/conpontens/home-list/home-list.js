// pages/conpontens/home-list/home-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
arr:{
  // 建立一个数据类型
  type:Array
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
godetail(e){
  // console.log(e.currentTarget.dataset.indexx);
  wx.navigateTo({
    url: `../../pages/detail/detail?pid=${e.currentTarget.dataset.pid}`,
  })

}
  }
})

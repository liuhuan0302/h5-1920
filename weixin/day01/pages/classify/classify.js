// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:"大家好",
    arr:[1,2,3,4,5]
  },
  jumpTypeOf(){
    // wx.switchTab({
    //   url: '/pages/index/index',
    // })
    wx.showLoading({
      title:"正在加载中",
      mask:true
    })
  },
  getListRequest(){
    // wx.request({
    //   url: '',
    //   success:(res=>{
    //     wx.hideLoading()
    //   })
    // })
  setTimeout(_=>{
    wx.setNavigationBarTitle({
      title: '当前页面',
    }),
    wx.hideLoading()
  },2000)

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow"),
    this.getListRequest()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide")
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh")
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReachBottom")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title:"1231312",
      path:"../index/index", 
      imageUrl:"../../assets/iamges/index.png"
    }
  }
})
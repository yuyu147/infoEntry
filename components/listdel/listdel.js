Component({
  properties: {
    productList: Array
  },

  data: {

  },

  methods: {
    showDeleteButton: function(e) {
      let productIndex = e.currentTarget.dataset.productindex
      this.setXmove(productIndex, -65)
    },
    /**
     * 隐藏删除按钮
     */
    hideDeleteButton: function(e) {
      let productIndex = e.currentTarget.dataset.productindex

      this.setXmove(productIndex, 0)
    },

    /**
     * 设置movable-view位移
     */
    setXmove: function(productIndex, xmove) {
      let productList = this.data.productList
      productList[productIndex].xmove = xmove

      this.setData({
        productList: productList
      })
    },

    /**
     * 处理movable-view移动事件
     */
    handleMovableChange: function(e) {
      if (e.detail.source === 'friction') {
        if (e.detail.x < -30) {
          this.showDeleteButton(e)
        } else {
          this.hideDeleteButton(e)
        }
      } else if (e.detail.source === 'out-of-bounds' && e.detail.x === 0) {
        this.hideDeleteButton(e)
      }
    },

    /**
     * 删除产品
     */
    handleDeleteProduct: function(e) {

      wx.showModal({
        title: '删除',
        content: '确定删除吗？删除后的人员可能需要重新录入',
        confirmText: "确定",
        cancelText: "点错了",
        success: (res) => {
          console.log(res);
          if (res.confirm) {

            let productIndex = e.currentTarget.dataset.productindex
            let productList = this.data.productList

            productList.splice(productIndex, 1)

            this.setData({
              productList: productList
            })
            if (productList[productIndex]) {
              this.setXmove(productIndex, 0)
            }

          } else {
            this.hideDeleteButton(e)
          }
        }
      });
    }
  }
})
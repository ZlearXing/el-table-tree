<template>
  <div class="tree-table-wrapper">
    <table class="table_header">
      <tr>
        <td v-for="(head, index) in data.headData" :key="index" :style="{ width: head.width + 'px', flex: head.flex, 'text-align': head.align }" class="td_item">{{ head.tit }}</td>
      </tr>
    </table>
    <table class="table_body">
      <treeItem
        v-for="(item, index) in data.bodyData"
        :item="item"
        :key="index"
        :tdConfig="data.headData"
      ></treeItem>
    </table>
  </div>
</template>

<script>
import treeItem from './treeItem.vue'
export default {
  name: 'treeTable',
  props: {
    'data': {
      type: Object
    },
    'defaultProps': {
      type: Object,
      default() {
        return {
          children: 'children',
          pid: 'pid'
        }
      }
    },
    'isChildrenFormat': {
      type: Boolean,
      default() {
        return false
      }
    },
    'isExpand': {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  data() {
    return {
      
    }
  },
  components: {
    treeItem
  },
  mounted() {
    this.transferData()
  },
  methods: {
    // 判断是否是children结构的数据,不是则进行转换
    transferData() {
      console.log(this.isChildrenFormat)
      if (this.isChildrenFormat) {
        if (this.defaultProps.children !== 'children') {
          const treeNodeFunc = (treeNode) => {
            treeNode.map((item) => {
              if (item[this.defaultProps.children]) {
                this.$set(item, 'expand', this.isExpand)
                item.children = item[this.defaultProps.children]
                // delete item[this.defaultProps.children]
                treeNodeFunc(item.children)
              }
            })
          }
          treeNodeFunc(this.data.bodyData)
        }
        return
      }
      const parentArr = this.data.bodyData.filter(l => l[this.defaultProps.pid] === 0)
      this.data.bodyData = this.getTreeDatas(this.data.bodyData, parentArr, 0)
    },
    // 转化成tree结构数据
    getTreeDatas(list, dataArr, depth) {
      dataArr.map((pNode, i) => {
        const childObj = []
        this.$set(pNode, 'depth', depth)
        this.$set(pNode, 'expand', this.isExpand)
        list.map((cNode, j) => {
          if (pNode.id === cNode[this.defaultProps.pid]) {
            childObj.push(cNode)
          }
        })
        pNode.children = childObj
        if (childObj.length > 0) {
          this.getTreeDatas(list, childObj, depth+1)
        }
      })
      return dataArr
    }
  }
}
</script>

<style lang="scss" scoped>
  .table_header {
    width: 100%;
    tr {
      display: flex;
      .td_item {
        padding: 10px;
        border-bottom: 1px solid #eee;
        background-color: #eee;
      }
    }
  }
  .table_body {
    width: 100%;
  }
</style>


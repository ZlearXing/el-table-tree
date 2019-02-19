<template>
  <div class="table-box">
    <tableTree
      :data="tableData"
      :defaultProps="defaultProps"
      :isChildrenFormat="isChildrenFormat"
      :isExpand="isExpand">
    </tableTree>
  </div>
</template>

<script>
export default {
  name: 'treeTable',
  data() {
    return {
      tableData: {
        headData: [],
        bodyData1: [
          {
            "id":11,
            "pid":0,
            'cont': 11,
            "name":"超级管理员"
          },{
            "id":12,
            "pid":0,
            'cont': 11,
            "name":"普通用户"
          },{
            "id":13,
            "pid":11,
            'cont': 11,
            "name":"平民"
          },{
            "id":14,
            "pid":11,
            'cont': 11,
            "name":"平民2"
          },{
            "id":15,
            "pid":12,
            'cont': 11,
            "name":"这是第一个用户"
          }, {
            "id":18,
            "pid":15,
            'cont': 16,
            "name":"这是第一一个用户"
          },{
            "id":16,
            "pid":12,
            'cont': 11,
            "name":"这是第二个用户"
          },{
            "id":17,
            "pid":12,
            'cont': 11,
            "name":"这是第三个用户"
          }
        ],
        bodyData: [{
          "id":11,
          'cont': 11,
          "name":"超级管理员",
          'depth': 0,
          child:[{
            "id":12,
            'cont': 11,
            "name":"管理员",
            'depth': 1
          }]
        }]
      },
      defaultProps: {
        children: 'child',
        pid: 'pid'
      },
      isChildrenFormat: true, // 是否是children格式数据(不是的话需要自带depth和expand字段)
      isExpand: true, // 是否全部展开
    }
  },
  mounted() {
    this.tableData.headData = [
      {
        tit: '',
        prop: 'selection',
        width: 100,
        align: 'left',
        scope: (item) => {
          return '<input type="checkbox">'
        }
      }, {
        tit: 'ID',
        prop: 'id',
        width: 100,
        align: 'left'
      }, {
        type: 'treeNode',
        tit: '角色名称',
        prop: 'name',
        width: 100,
        align: 'left',
        flex: 1
      }, {
        tit: '用户数',
        prop: 'cont',
        width: 100,
        align: 'left'
      }, {
        type: 'btnGroup',
        tit: '操作',
        width: 100,
        align: 'left',
        btnGroup: [
          {
            text: '删除',
            onclick: this.onDel,
            formatter: (item) => {
              return '<span>删除</span>'
            }
          },
          {
            text: '编辑',
            onclick: this.onEdit,
            formatter: (item) => {
              return '<span>编辑</span>'
            }
          }
        ]
      }
    ]
  },
  methods: {
    onEdit(item) {
      console.log('编辑', item)
    },
    onDel(item){
      console.log('删除', item)
    }
  }
}
</script>

<style lang="scss">
  .table-box {
    width: 1200px;
    margin: 0 auto;
    border: 1px solid #eee;
  }
</style>

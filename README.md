# vue-table-tree

### Installation


### Usage

```
import tableTree from 'tableTree'

Vue.use(tableTree)

```
* 使用
```
<tableTree :data="tableData"></tableTree>
```
* 配置项
data：表格数据
```
tableData: {
  headData: [],
  bodyData: []
}
```
defaultProps：子节点和父级id字段，默认为children和pid
```
defaultProps: {
  children: 'children',
  pid: 'pid'
}
```
isChildrenFormat：是否是层级数据（是传true，否则传false）
isExpand：展开与折叠

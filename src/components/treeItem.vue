<template>
  <div class="tree_nodes">
    <tr>
      <td v-for="(td, index) in tdConfig" :key="index" :style="{ width: td.width + 'px', flex: td.flex, 'text-align': td.align }" class="td_item">
        <span v-if="td.type === 'treeNode'" @click="toggleExpand">
          <span class="tree_child_space" :style="{ width: item.depth * 15 + 'px' }"></span>
          <i v-if="item.children && item.children.length" class="expand_icon" :class="item.expand ? 'tree_close' : 'tree_open'"></i>
          <i v-else class="expand_icon hide"></i>
          <span v-if="td.scope" v-html="td.scope(item)"></span>
          <span v-else>{{ item[td.prop] }}</span>
        </span>
        <span v-else-if="td.type === 'btnGroup'">
          <a class="btn-item"
              v-for="(btn, index) in td.btnGroup"
              :key="index"
              type="text"
              @click.stop.prevent="btn.onclick(item)"
              v-html="btn.formatter(item)">
          </a>
        </span>
        <span v-else>
          <span v-if="td.scope" v-html="td.scope(item)"></span>
          <span v-else>{{ item[td.prop] }}</span>
        </span>
      </td>
    </tr>
    <treeItem 
      v-if="isExpand"
      v-show="item.expand"
      v-for="(child, index) in item.children" 
      :item="child" :key="index" 
      :tdConfig="tdConfig">
    </treeItem>
  </div>
</template>

<script>
export default {
  name: 'treeItem',
  props: {
    'item': {
      type: Object,
      default() {
        return {}
      }
    },
    'tdConfig': {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
      isExpand() {
          return this.item.children && this.item.children.length
      }
  },
  methods: {
    toggleExpand() {
      if (this.isExpand) {
        this.item.expand = !this.item.expand
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .tree_nodes {
    width: 100%;
    tr {
      display: flex;
      .td_item {
        cursor: pointer;
        padding: 12px 10px;
        border-bottom: 1px solid #eee;
      }
      .tree_child_space {
        display: inline-block;
      }
      .expand_icon {
        display: inline-block;
        width: 0;
        height: 0;
        border-width: 5px;
        border-style: solid;
      }
      .tree_close {
        border-color: #AAAAAA transparent transparent;
      }
      .tree_open {
        border-color: transparent transparent transparent #AAAAAA;
      }
      .hide {
        visibility: hidden;
      }
      .btn-item {
        color: #409eff;
        font-size: 14px;
        margin: 0 3px;
      }
    }
  }
</style>


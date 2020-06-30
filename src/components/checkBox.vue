<!--
  @props  info [array] [非必须] 表示是当前选中项列表
  @props  config [array] [必须] 表示有哪些选项
    配置项目前支持如下格式
    {
      label: '活动页',
      value: 'operation',
      disabled: true,
      hidden: true
    }
  @props  option [object] [非必须]
    - hasAll 设置是否含有全部按钮
    - inlineBlock 将checkgroup设置为inline-block
  @props  type [string] [非必须]
    - default 默认样式
    - button button样式

  @event  update list更新时，会向父组件发广播

  @调用示例子：
  <self-checkbox @update="handle" :option="{hasAll: false, inlineBlock: fals}" :config="[]" :info="[]"></self-checkbox>
 -->

<template>
    <div class="self-checkbox-container">
        <template v-if="type === 'default'">
            <el-checkbox
                v-if="option.hasAll"
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
                >全选</el-checkbox
            >
        </template>
        <template v-if="type === 'button'">
            <el-checkbox-button
                v-if="option.hasAll"
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
                >全选</el-checkbox-button
            >
        </template>

        <el-checkbox-group v-model="list" :style="`display: ${option.inlineBlock ? 'inline-block' : void 0}`">
            <template v-if="type === 'default'">
                {{ config }}
                <el-checkbox
                    v-for="(item, index) in config"
                    v-show="!item.hidden"
                    :key="index"
                    :disabled="item.disabled"
                    :label="item.value"
                    :class="{ 'is-full': item.isFull }"
                    >{{ item.label }}</el-checkbox
                >
            </template>
            <template v-if="type === 'button'">
                <el-checkbox-button
                    v-for="(item, index) in config"
                    v-show="!item.hidden"
                    :key="index"
                    :disabled="item.disabled"
                    :label="item.value"
                    >{{ item.label }}</el-checkbox-button
                >
            </template>
        </el-checkbox-group>
    </div>
</template>
<script>
export default {
    props: {
        info: {
            type: Array,
            default: function () {
                return [];
            }
        },
        config: {
            type: Array,
            require: true,
            default: function () {
                return [];
            }
        },
        option: {
            type: Object,
            default() {
                return {
                    hasAll: true,
                    inlineBlock: true
                };
            }
        },
        type: {
            type: String,
            default: 'default'
        }
    },
    computed: {
        list: {
            set(val) {
                this.$emit('update', val);
            },
            get() {
                return this.info;
            }
        },
        checkAll: {
            set(val) {},
            get() {
                const validCount = this.config.filter(item => !item.disabled).length;
                const checkedCount = this.list.filter(item => !this.disabledSelected.includes(item)).length || 0;
                return checkedCount === validCount;
            }
        },
        isIndeterminate: {
            set(val) {},
            get() {
                const validCount = this.config.filter(item => !item.disabled).length;
                const checkedCount = this.list.length || 0;
                return checkedCount > 0 && checkedCount < validCount;
            }
        },
        disabledSelected() {
            const disabledList = this.config.filter(item => item.disabled).map(item => item.value);
            const res = this.list.filter(item => disabledList.includes(item));
            return res;
        }
    },
    methods: {
        // 选中全部选项
        checkALLSelect(config) {
            const list = [];
            config.forEach(item => {
                item.disabled ? void 0 : list.push(item.value);
            });
            return [...list, ...this.disabledSelected];
        },

        // 选中全部
        handleCheckAllChange(val) {
            val ? (this.list = this.checkALLSelect(this.config)) : (this.list = this.disabledSelected);
            this.isIndeterminate = false;
        }
    }
};
</script>

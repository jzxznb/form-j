<template>
    <div :class="{ 'plugin-checkbox': true, 'freeze-text-color': this.ragData.freezeTextColor }">
        <check-box
            @update="handle"
            :info="pluginData || []"
            :config="limitCheck"
            :option="option"
            :disabled="ragData.disabled"
        ></check-box>
        <div
            v-if="ragData.limit && ragData.children && ragData.limit < ragData.children.length"
            class="text-button"
            @click="toggle"
        >
            {{ text }}
        </div>
    </div>
</template>

<script>
import pluginMixin from './pluginsMixin';
import CheckBox from '../components/checkBox';

export default {
    name: 'plugin-checkbox',
    components: {
        CheckBox
    },
    mixins: [pluginMixin],
    data() {
        return {
            text: '展开全部',
            limit: this.ragData.limit
        };
    },
    computed: {
        limitCheck() {
            try {
                return this.ragData.children.map((item, index) => {
                    if (this.limit && index > this.limit - 1) {
                        return { ...item, hidden: true };
                    }
                    return item;
                });
            } catch (error) {
                return [];
            }
        },
        option() {
            return {
                hasAll: this.ragData.hasAll === undefined || this.ragData.hasAll,
                inlineBlock: true
            };
        }
    },
    methods: {
        handle(checkValue) {
            this.pluginData = checkValue;
        },
        toggle() {
            this.limit = this.limit ? undefined : this.ragData.limit;
            this.text = this.text === '展开全部' ? '收起' : '展开全部';
        }
    }
};
</script>

<style lang="less" scoped>
.plugin-checkbox {
    display: flex;
    align-items: center;
    .text-button {
        padding: 0 20px;
    }
}
.freeze-text-color {
    /deep/ .el-checkbox {
        color: #457bfc;
    }
    /deep/ .el-checkbox__input + .el-checkbox__label {
        color: #457bfc;
    }
    /deep/.is-full {
        /deep/ .el-checkbox__input + .el-checkbox__label {
            color: #333333;
        }
    }
}
</style>

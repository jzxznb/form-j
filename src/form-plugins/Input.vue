<template>
    <div class="plugin-input">
        <el-input
            class="string-input"
            :title="pluginData"
            type="text"
            :maxlength="Math.abs(ragData.maxIn)"
            v-model="pluginData"
            :placeholder="ragData.placeholder"
            :style="customStyle"
        ></el-input>
        <span class="number-limit" v-if="ragData.maxIn && ragData.maxIn > 0">{{ inputNum }}/{{ ragData.maxIn }}字</span>
    </div>
</template>

<script>
import pluginMixin from './pluginsMixin';

export default {
    name: 'plugin-input',
    mixins: [pluginMixin],
    computed: {
        inputNum() {
            try {
                return this.pluginData.length + '';
            } catch (err) {
                return '0';
            }
        },
        customStyle() {
            if (this.ragData.width) {
                return {
                    width: `${this.ragData.width}px`
                };
            }
            return null;
        }
    }
};
</script>

<style lang="less" scoped>
.plugin-input {
    display: flex;
    align-items: center;
    .string-input {
        height: 28px;
        width: 180px;
        // Todo input border-color 和elem form组件颜色不统一
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    .string-input:focus {
        border: 1px solid #409eff;
    }
    .number-limit {
        font-size: 12px;
        color: #333333;
        line-height: 13px;
        margin-left: 10px;
    }
}
</style>

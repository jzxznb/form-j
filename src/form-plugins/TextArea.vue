<template>
    <textarea class="plugin-text-area" v-model="pluginData" :placeholder="ragData.placeholder"></textarea>
</template>

<script>
import pluginsMixin from './pluginsMixin.js';

export default {
    name: 'plugin-text-area',
    mixins: [pluginsMixin],
    watch: {
        pluginData(newValue, oldValue) {
            if (this.ragData.maxIn && this.pluginData && this.pluginData.length > this.ragData.maxIn) {
                this.pluginData = oldValue;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.plugin-text-area {
    resize: none;
    width: 600px;
    height: 120px;
    border-color: #c0c4cc;
    padding: 8px 10px;
}
.plugin-text-area:focus {
    border: 1px solid #409eff;
}
</style>

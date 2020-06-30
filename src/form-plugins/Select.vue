<template>
    <div class="plugin-select">
        <el-select
            v-loading="isLoading"
            v-if="isRemote"
            :disabled="ragData.disabled"
            class="select-item"
            :placeholder="ragData.placeholder"
            v-model="pluginData"
            filterable
            :clearable="!!ragData.clearable"
            remote
            :remote-method="remoteMethod"
        >
            <el-option
                v-for="option in remoteList"
                :key="option.value"
                :value="option.value"
                :label="option.label"
            ></el-option>
        </el-select>
        <el-select
            v-else
            v-loading="isLoading"
            :disabled="ragData.disabled"
            class="select-item"
            :placeholder="ragData.placeholder"
            v-model="pluginData"
        >
            <el-option
                v-for="option in ragData.children"
                :key="option.value"
                :value="option.value"
                :label="option.label"
            ></el-option>
        </el-select>
    </div>
</template>

<script>
import pluginMixin from './pluginsMixin';

export default {
    name: 'plugin-select',
    mixins: [pluginMixin],
    data() {
        return {
            remoteList: this.ragData.children,
            isLoading: false
        };
    },
    computed: {
        isRemote() {
            return !!this.ragData.remoteMethod;
        }
    },
    beforeMount() {
        if (
            this.ragData.remoteMethod &&
            this.pluginData &&
            !(this.remoteList || []).find(i => i.value === this.pluginData)
        ) {
            this.remoteMethod(this.pluginData);
        }
    },
    methods: {
        async remoteMethod(query) {
            try {
                if (this.ragData.remoteMethod) {
                    if (query) {
                        this.isLoading = true;
                        this.remoteList = await this.ragData.remoteMethod(query);
                        this.isLoading = false;
                    } else {
                        this.remoteList = this.ragData.children;
                    }
                }
            } catch (error) {
                this.isLoading = false;
            }
        }
    }
};
</script>

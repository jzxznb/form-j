<template>
    <div class="plugin-date-select">
        <el-date-picker
            v-model="startTime"
            :type="ragData.type || 'datetime'"
            value-format="timestamp"
            placeholder="选择开始时间"
            :picker-options="{ disabledDate: disabledStartDate }"
            :default-time="(ragData.defaultTime || [])[0] || '00:00:00'"
            @change="setDate"
            @blur="startPickerBlur"
        ></el-date-picker>
        <span class="range-separator">到</span>
        <el-date-picker
            v-model="endTime"
            :type="ragData.type || 'datetime'"
            value-format="timestamp"
            placeholder="选择结束时间"
            :default-time="(ragData.defaultTime || [])[1] || '23:59:59'"
            :picker-options="{ disabledDate: disabledEndDate }"
            @change="setDate"
            @blur="endPickerBlur"
        ></el-date-picker>
    </div>
</template>

<script>
import pluginsMixin from './pluginsMixin';

export default {
    name: 'plugin-date-picker',
    mixins: [pluginsMixin],
    data() {
        return {
            // startTime: null,
            // endTime: null,
            snapshot: []
        };
    },
    computed: {
        startTime: {
            get() {
                return (this.pluginData || [])[0];
            },
            set(newValue) {
                const endTime = (this.pluginData || [])[1];
                this.pluginData = [newValue, endTime];
            }
        },
        endTime: {
            get() {
                return (this.pluginData || [])[1];
            },
            set(newValue) {
                const startTime = (this.pluginData || [])[0];
                this.pluginData = [startTime, newValue];
            }
        }
    },
    watch: {
        pluginData(n) {
            this.snapshot = [this.startTime, this.endTime];
        }
    },
    methods: {
        setDate() {
            // this.pluginData = [this.startTime, this.endTime];
            this.snapshot = [this.startTime, this.endTime];
        },
        disabledEndDate(val) {
            if (!this.snapshot[0]) {
                return false;
            }
            return new Date(val).valueOf() < this.snapshot[0];
        },
        disabledStartDate(val) {
            if (!this.snapshot[1]) {
                return false;
            }
            return new Date(val).valueOf() > this.snapshot[1];
        },
        startPickerBlur() {
            this.startTime = this.snapshot[0];
        },
        endPickerBlur() {
            this.endTime = this.snapshot[1];
        }
    }
};
</script>
<style type="less">
.range-separator {
    display: inline-block;
    height: 100%;
    padding: 0 5px;
    margin: 0;
    text-align: center;
    color: #333333;
    line-height: 13px;
    font-size: 12px;
}
</style>

<template>
    <div
        class="form-component-item"
        :class="{ inline: isInline(rag), 'form-error-item': showError }"
        v-if="!ragData.noSpace"
    >
        <span
            v-if="!rag.noTitle"
            :class="{
                'item-title': rag.title && rag.require,
                'no-require-item-title': (rag.title && !rag.require) || !rag.noTitle
            }"
            >{{ `${rag.title ? `${rag.title}: ` : ''}` }}</span
        >
        <slot :name="rag.slotFront"></slot>
        <div class="item-content">
            <span v-if="rag.description" class="item-description">{{ rag.description }}</span>
            <component
                :is="rag.ragName"
                :watcher="rag.watcher"
                :rag-data="ragData"
                :mode-copy="modeCopy"
                :update="handle"
                :index="index"
            ></component>
        </div>
        <div class="text-button" v-if="rag.button && rag.button.click" @click="buttonClick(rag.button.click, rag)">
            {{ rag.button.text }}
        </div>
        <slot :name="rag.slotEnd"></slot>
        <span class="warming-text" v-if="showError">{{ formatValue.label }}</span>
    </div>
</template>

<script>
export default {
    props: {
        rag: {
            type: Object,
            default: () => ({})
        },
        modeCopy: {
            type: Object,
            default: () => ({})
        },
        index: {
            type: Number,
            default: -1
        },
        inline: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            validated: !!this.rag.realTimeFormat,
            formatValue: { label: '', title: this.rag.title }
        };
    },
    computed: {
        showError() {
            return this.validated && !!this.formatValue.label;
        },
        ragData() {
            try {
                return this.rag.compute && this.modeCopy ? this.rag.compute(this.modeCopy) || {} : this.rag.data || {};
            } catch (err) {
                console.log('form-dataOrCompute-error', err);
                return {};
            }
        }
    },
    watch: {
        modeCopy(nVal, oVal) {
            const newTarget = nVal[(this.ragData || {}).key];
            const oldTarget = oVal[(this.ragData || {}).key];
            if (this.rag.realTimeFormat) {
                this.validated = true;
                this.formatValue = { label: this.getformatValue(), title: this.rag.title };
            } else if (newTarget !== oldTarget) {
                this.validated = false;
                this.formatValue = { label: '', title: this.rag.title };
            }
        }
    },
    methods: {
        handle(newValue) {
            this.$emit('update', newValue);
        },
        isInline(rag, index) {
            return !rag.block && this.inline;
        },
        buttonClick(click, rag) {
            click.bind(rag)(this.value);
        },
        validate() {
            this.validated = true;
            this.formatValue = { label: this.getformatValue(), title: this.rag.title };
            return this.formatValue;
        },
        getformatValue() {
            const { [this.ragData.key]: value } = this.modeCopy;
            if (
                !this.ragData.noSpace &&
                this.rag.require &&
                (!value || (Array.isArray(value) && value.length === 0) || (typeof value === 'string' && !value.trim()))
            ) {
                return `${this.rag.title || '未知项'}为必填项目`;
            }
            if (this.rag.format) {
                return this.rag.format(this.modeCopy);
            }
            return '';
        }
    }
};
</script>
<style lang="less">
.form-component-item {
    .el-input {
        width: 180px;
    }
}
</style>

<style lang="less" scoped>
.form-component-item {
    display: flex;
    flex: 1;
    position: relative;
    margin-top: 20px;
    align-items: stretch;
    &.inline {
        display: inline-flex;
    }
    .warming-text {
        white-space: nowrap;
        padding-left: 20px;
        font-size: 12px;
        color: #ff7677;
        position: absolute;
        left: 90px;
        bottom: -15px;
    }
    .text-button {
        display: flex;
        align-items: center;
        margin-left: 10px;
    }
    .item-title::before {
        content: '*';
        color: #ff7677;
        font-size: 8px;
    }
    .item-title,
    .no-require-item-title {
        font-size: 12px;
        color: #151515;
        display: flex;
        justify-content: flex-end;
        min-width: 110px;
        max-height: 28px;
        align-items: center;
        padding: 0px 10px 0 0;
    }
    .item-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-wrap: wrap;
        .item-description {
            font-size: 12px;
            color: #003800;
            line-height: 12px;
            padding-bottom: 10px;
        }
    }
}
</style>

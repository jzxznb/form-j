<template>
    <div>
        <template v-for="(rag, i) in formData">
            <any
                ref="anyComponent"
                :index="index"
                :rag="rag"
                :inline="inline"
                :mode-copy="value"
                @update="handle"
                :key="i"
            >
                <template :slot="rag.slotFront">
                    <slot :name="rag.slotFront"></slot>
                </template>
                <template :slot="rag.slotEnd">
                    <slot :name="rag.slotEnd"></slot>
                </template>
            </any>
        </template>
        <slot name="form-slot-end"></slot>
    </div>
</template>

<script>
import Vue from 'vue';
import Any from './AnyComponent';

const getPluginsFromContext = context => {
    context.keys().forEach((...params) => {
        const a = context(...params);
        Vue.component(a.default.name, a.default);
    });
};
const localRq = require.context('../form-plugins', true, /\.vue$/);
getPluginsFromContext(localRq);

export default {
    name: 'form-j',
    components: {
        Any
    },
    props: {
        formData: {
            type: Array,
            default: () => []
        },
        inline: {
            type: Boolean,
            default: false
        },
        index: {
            type: Number,
            default: -1
        },
        value: {}
    },
    data() {
        return {};
    },
    methods: {
        async handle(newValue) {
            await this.$emit('input', { ...this.value, ...newValue });
        },
        validate() {
            return ((this.$refs || {}).anyComponent || []).map(item => item.validate()).filter(item => !!item.label);
        }
    }
};
</script>

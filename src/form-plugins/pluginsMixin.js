export default {
    props: {
        ragData: {
            default: () => ({})
        },
        modeCopy: {
            type: Object,
            default: () => ({})
        },
        update: {
            type: Function,
            default: () => {}
        },
        watcher: {
            type: Function,
            default: () => {}
        },
        index: {
            type: Number,
            default: -1
        }
    },
    data() {
        return {
            addObj: {}
        };
    },
    computed: {
        pluginData: {
            set(newValue) {
                this.addObj = {};
                this.watcher(newValue, this.set);
                this.update({ [this.ragData.key || 'default']: newValue, ...this.addObj });
            },
            get() {
                const ragData = this.ragData;
                const defaultData = ragData.children && ragData.children.length > 1 && ragData.useChildren ? {} : null;
                return this.modeCopy[ragData.key] || defaultData;
            }
        }
    },
    methods: {
        set(key, value) {
            key && value && (this.addObj[key] = value);
            return { [key]: value };
        }
    }
};

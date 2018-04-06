Component({
    properties: {
        info: {
            type: Object,
            value: {},
        },
        title: {
            type: String,
            value: ''
        },
        myClass: {
            type: String,
            value: ''
        }
    },
    methods: {
        close: function () {
            this.triggerEvent('close');
        }
    }
})

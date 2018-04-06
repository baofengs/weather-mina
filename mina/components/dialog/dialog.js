Component({
    externalClasses: ['my-class'],
    properties: {
        title: {
            type: String,
            value: ''
        }
    },
    data: {
        someData: {}
    },
    methods: {
        close: function () {
            this.triggerEvent('close');
        }
    }
})

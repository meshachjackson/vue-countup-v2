import _isFunction from 'lodash-es/isFunction';
import { CountUp } from 'countup.js';

var ICountUp = {
  __countup__: CountUp,
  name: 'ICountUp',
  props: {
    endVal: {
      type: Number,
      required: true,
    },
    options: {
      type: Object,
      required: false,
    },
  },
  data: function data() {
    return {
      instance: null,
    };
  },
  // computed: {},
  watch: {
    endVal: {
      handler: function handler(value) {
        var that = this;

        if (that.instance && _isFunction(that.instance.update)) {
          that.instance.update(value);
        }
      },
      deep: false,
    },
  },
  methods: {
    init: function init() {
      var that = this;

      if (that.instance) {
        return;
      }

      var dom = that.$el;
      var instance = new CountUp(dom, that.endVal, that.options);

      if (instance.error);
      else {
        instance.start(function() {
          return that.$emit('ready', instance, CountUp);
        });
        that.instance = instance;
      }
    },
    uninit: function uninit() {
      var that = this;
      that.instance = null;
    },
    printValue: function printValue(value) {
      var that = this;

      if (that.instance && _isFunction(that.instance.printValue)) {
        return that.instance.printValue(value);
      }
    },
    start: function start(callback) {
      var that = this;

      if (that.instance && _isFunction(that.instance.start) && _isFunction(callback)) {
        return that.instance.start(callback);
      }
    },
    pauseResume: function pauseResume() {
      var that = this;

      if (that.instance && _isFunction(that.instance.pauseResume)) {
        return that.instance.pauseResume();
      }
    },
    reset: function reset() {
      var that = this;

      if (that.instance && _isFunction(that.instance.reset)) {
        return that.instance.reset();
      }
    },
    update: function update(newEndVal) {
      var that = this;

      if (that.instance && _isFunction(that.instance.update)) {
        return that.instance.update(newEndVal);
      }
    },
  },
  // beforeCreate() {
  // const that = this;
  // console.log('beforeCreate');
  // },
  // created() {
  // const that = this;
  // console.log('created');
  // },
  // beforeMount() {
  // const that = this;
  // console.log('beforeMount');
  // },
  mounted: function mounted() {
    var that = this; // console.log('mounted');

    that.init();
  },
  // beforeUpdate() {
  // const that = this;
  // console.log('beforeUpdate');
  // },
  // updated() {
  // const that = this;
  // console.log('updated');
  // },
  // activated() {
  // const that = this;
  // console.log('activated');
  // },
  // deactivated() {
  // const that = this;
  // console.log('deactivated');
  // },
  beforeDestroy: function beforeDestroy() {
    var that = this; // console.log('beforeDestroy');

    that.uninit();
  },
  // destroyed() {
  // const that = this;
  // console.log('destroyed');
  // },
  render: function render(h) {
    // const that = this;
    return h('span', {});
  },
};

export default ICountUp;

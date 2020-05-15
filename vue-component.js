Vue.component('countable-input', {
  inheritAttrs: false,
  props: ['value', 'max-length', 'base-class', 'count-class', 'clear-class'],
  data: function () {
    return {
      hasFocus: false
    }
  },
  computed: {
    count: function() {
      return this.byteLength(this.value);
  },
    inputListeners: function () {
      var vm = this
      // `Object.assign` merges objects together to form a new object
      return Object.assign({},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {
          // This ensures that the component works with v-model
          input: function (event) {
            var string = event.target.value;
            (function(s,b,i,c) {
              for(b=i=0;c=s.charCodeAt(i);i++) {
                var t = c>>11?3:c>>7?2:1;
                b+=t;
                if (b > vm.maxLength) {
                  b-=t;
                  string = s.substring(0, i);
                  vm.$refs.input.value = string;
                  break;
                }
              }
              return b;
            })(string);
            vm.$emit('input', string);
          }
        }
      )
    }
  },
  methods: {
    clear: function() {
      console.log('clear button clicked.');
      this.$emit('input', '');
    },
    byteLength: function(s) {
      byteLength = (function(s,b,i,c) {
        for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
        return b;
      })(s);
      return byteLength;
    }
  },
  template: `
    <div :class="baseClass">
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
        v-on:focus="hasFocus = true"
        v-on:blur="hasFocus = false"
        ref="input"
      >
      <span :class="countClass">{{ count }}/{{ maxLength }}</span>
      <button :class="clearClass" @mousedown="clear" v-show="hasFocus && value.length > 0">X</button>
    </div>
    `
});

/*
.input-txt {
  position: relative;
  border: solid;
}
.input-txt input {
  position: relative;
  width: 100%;
  padding-right: 60px;
}
.input-txt .count {
  position: absolute;
  top: 0; right: 0;
  width: 40px; height: 100%;
  text-align: right;
  padding-right: 5px;
}
.input-txt .clear {
  position: absolute;
  top: 0; right: 40px;
  width: 20px; height: 100%;
  border: none;
}
<countable-input base-class="input-txt" clear-class="clear" count-class="count" v-model="text" max-length="10"></countable-input>
 */

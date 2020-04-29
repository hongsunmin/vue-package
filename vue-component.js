Vue.component('countable-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
  	count: function() {
  		return this.value.length;
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
            vm.$emit('input', event.target.value);
          }
        }
      )
    }
  },
  template: `
  	<div>
  	{{ label }}
  		<input
  			v-bind="$attrs"
  			v-bind:value="value"
  			v-on="inputListeners"
  		>
  		<span>{{ count }}</span>
  		<button>delete</button>
  	</div>
		  `
});
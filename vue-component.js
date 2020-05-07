Vue.component('countable-input', {
  inheritAttrs: false,
  props: ['value', 'max-length', 'base-class', 'count-class', 'clear-class'],
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
          	var string = event.target.value
          	stringByteLength = (function(s,b,i,c){
    			for(b=i=0;c=s.charCodeAt(i++);){
    				var t = c>>11?3:c>>7?2:1;
    				b+=t;
    				if (b > vm.maxLength) {
    					b-=t;
    					string = s.substring(0, i - 1);
    					vm.$refs.input.value = string;
    					break;
					}
    			}
    			return b
			})(string);
            vm.$emit('input', string);
          }
        }
      )
    }
  },
  methods: {
  	clear: function() {
  		this.$emit('input', '');
	},
	byteLength: function(s) {
	    var l= 0;
		for(var idx=0; idx < s.length; idx++) {
			var c = escape(s.charAt(idx));
			if( c.length==1 ) l ++;
			else if( c.indexOf("%u")!=-1 ) l += 2;
			else if( c.indexOf("%")!=-1 ) l += c.length/3;
		}
		return l;
	}
  },
  template: `
  	<div :class="baseClass">
  		<input
  			v-bind="$attrs"
  			v-bind:value="value"
  			v-on="inputListeners"
  			ref="input"
  		>
  		<span :class="countClass">{{ count }}/{{ maxLength }}</span>
  		<button :class="clearClass" @click="clear">X</button>
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
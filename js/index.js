Vue.config.devtools = true;

Vue.component('card', {
    template: `
    <div class="card-wrap"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      ref="card">
      <div class="card"
        :style="cardStyle">
        <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
        <div class="card-info">
          <slot name="header"></slot>
          <slot name="content"></slot>
        </div>
      </div>
    </div>`,


    mounted: function mounted() {
        this.width = this.$refs.card.offsetWidth;
        this.height = this.$refs.card.offsetHeight;
    },
    props: ['dataImage'],
    data: function data() {
        return {
            width: 0,
            height: 0,
            mouseX: 0,
            mouseY: 0,
            mouseLeaveDelay: null
        };
    },

    computed: {
        mousePX() {
            return this.mouseX / this.width;
        },
        mousePY() {
            return this.mouseY / this.height;
        },
        cardStyle() {
            let rX = this.mousePX * 10;
            let rY = this.mousePY * -10;
            return {
                 transform: 'rotateY(' + rX + 'deg) rotateX(' + rY + 'deg)'
            };

        },
        cardBgTransform() {
            let tX = this.mousePX * -10;
            let tY = this.mousePY * -10;
            return {
                 transform: 'translateX(' + tX + 'px) translateY(' + tY + 'px)'
            };

        },
        cardBgImage() {
            return {
                backgroundImage: 'url(' + this.dataImage + ')'
            };

        }
    },

    methods: {
        handleMouseMove: function handleMouseMove(e) {
            this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width / 2;
            this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height / 2;
        },
        handleMouseEnter: function handleMouseEnter() {

            clearTimeout(this.mouseLeaveDelay);
        },
        handleMouseLeave: function handleMouseLeave() {
            console.log('handleMouseLeave')
            var _this = this;
            this.mouseLeaveDelay = setTimeout(function () {
                _this.mouseX = 0;
                _this.mouseY = 0;
            }, 1000);
        }
    }
});


var app = new Vue({
    el: '#app'
});
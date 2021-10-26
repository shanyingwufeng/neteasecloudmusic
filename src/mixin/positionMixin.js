import { mapGetters, mapMutations } from "vuex";

export const positionMixin = {
    computed: {
        ...mapGetters("position", ["getCache"]),
    },
    methods: {
        ...mapMutations("position", ["setCache"]),
    },
    beforeRouteLeave(to, from, next) {
        this.setCache({
            name: from.name,
            position: this.$refs.scoll_container.scrollTop,
        });
        next();
    },
    beforeRouteEnter(to, from, next) {
        console.log("11111");
        next((vm) => {
            if (vm.getCache[to.name]) {
                vm.$refs.scoll_container.scrollTop = vm.getCache[to.name];
            }
        });
    },
};

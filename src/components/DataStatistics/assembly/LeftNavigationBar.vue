<template>
    <div class="">
        <el-input
            placeholder="请输入"
            v-model="filterText">
            <i slot="prefix" class="el-input__icon el-icon-search" style="float: right"></i>
        </el-input>
        <div class="treeTitle">
            <div class="treeTitleText">
                <icon class="el-icon-caret-bottom"></icon>
                <span>山东省</span>
            </div>
        </div>
        <el-tree
            class="filter-tree"
            :data="treeData"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            ref="tree">
        </el-tree>
    </div>
</template>

<script>
export default {
    name: "LeftNavigationBar",
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },

    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        }
    },

    data() {
        return {
            filterText: '',

            defaultProps: {
                children: 'children',
                label: 'label'
            }
        };
    },
    props: {
        /**
         * 树数据
         */
        treeData: {
            type: Array,
            required: true
        },
    },
}
</script>

<style scoped>
.treeTitle{
    height: 40px;
    display: flex;
    align-items: center;
    justify-content:center;
    background-color: #fff;

}
.treeTitleText{
    width: 95%;
    height: 30px;
    background-color: #F5F7FA;
    display: flex;
    align-items: center;
    justify-content:flex-start;
    padding-left: 10px;
}

</style>

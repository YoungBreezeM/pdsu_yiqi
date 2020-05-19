<template>
    <div class="y-tool-bar">
        <div class="item-container">
           <slot></slot>
        </div>
        <div class="bar-bottom"></div>
    </div>
</template>

<script>
    import "./y-tool-bar.scss"
    export default {
        name: "YToolBar"
    }
</script>

<style scoped>

</style>
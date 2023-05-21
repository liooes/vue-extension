<template>
    已停用,请联系管理员
</template>

<script>

export default {
    created() {
        ElNotification({ title: '已停用', message: '已停用，请联系管理员', type: 'info' })
    }
}
</script>
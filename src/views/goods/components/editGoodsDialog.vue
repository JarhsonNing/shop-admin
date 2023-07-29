<template>
    <div class="editGoodsDialog">
        <el-dialog v-model="dialogVisible" title="编辑商品">
            <el-form label-width="200px" :model="formData">
                <el-form-item label="名称">
                    <el-input v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="标签">
                    <el-input v-model="formData.tags"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input-number v-model="formData.price"></el-input-number>
                </el-form-item>
                <el-form-item label="销售数量">
                    <el-input-number v-model="formData.sales"></el-input-number>
                </el-form-item>
                <el-form-item label="图片">
                    <el-upload
                        class="avatar-uploader"
                        action="/"
                        :limit="1"
                        :file-list="defaultFileList"
                        :auto-upload="false"
                        list-type="picture-card"
                        :before-upload="beforeAvatarUpload"
                        :on-change="handleFileChange"
                        :on-remove="handleFileRemove"
                    >
                        <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSubmit">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {ElMessage} from 'element-plus'
import {createGoods, updateGoods} from '@/api/goods.js'
import {saveFile} from '@/api/file.js'

const dialogVisible = ref(false);
const formData = reactive({
    id: '',
    name: '',
    price: '',
    sales: '',
    tags: '',
    image: '',
    file: null
})
const defaultFileList = ref([])

const beforeAvatarUpload = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('请上传JPG图片!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 100) {
        ElMessage.error('图片大小不要超过 100MB!')
        return false
    }
    return true
}

const handleFileChange = (file, files) => {
    console.log(file)
    formData.file = file.raw;
}

const handleFileRemove = (file, files) => {
    console.log(file, files)
    formData.file = null;
}

const handleSubmit = () => {
    const data = new FormData()
    if (!formData.file && mode.value === 'addNew') {
        return ElMessage.error('请选择文件')
    }
    if (formData.file) {
        data.append('file', formData.file);
    }
    data.append('name', formData.name);
    data.append('tags', formData.tags);
    data.append('price', formData.price);
    data.append('sales', formData.sales);
    data.append('image', formData.image);
    if (mode.value === 'addNew') {
        return createGoods(data).then(() => {
            dialogResolve();
            dialogVisible.value = false;
        })
    } else {
        if (formData.file) {
            return saveFile(formData.file).then(file => {
                formData.image = file.code;
                return updateGoods(formData.id, formData).then(() => {
                    dialogResolve();
                    dialogVisible.value = false;
                })
            })

        }
        return updateGoods(formData.id, formData).then(() => {
            dialogResolve();
            dialogVisible.value = false;
        })
    }
}

const mode = ref('addNew')
let dialogResolve;
let dialogReject;

function open(openMode, data) {
    if (openMode === 'addNew') {
        Object.assign(formData, {
            id: '',
            name: '',
            price: '',
            sales: '',
            tags: '',
            image: '',
            file: null
        })
        defaultFileList.value = []
    } else {
        Object.assign(formData, {
            ...data,
            file: null
        })
        defaultFileList.value = [
            {url: '/api/file/' + data.image}
        ]
    }
    mode.value = openMode;
    dialogVisible.value = true
    return new Promise((resolve, reject) => {
        dialogReject = reject;
        dialogResolve = resolve;

    })
}

defineExpose({
    open
})
</script>

<style scoped>

</style>

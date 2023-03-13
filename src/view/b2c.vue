<template>
    <!-- 工单查询 -->
    <div class="box-border">
        <el-row>
            <el-col>
                <h1 class="title-bg">工单查询</h1>
            </el-col>
        </el-row>
        <el-row class="orderquery">
            <el-col>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="客户项目:">
                            <el-select v-model="project" placeholder="请选择项目">
                                <el-option v-for="item in projectOptions" :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="单号:">
                            <el-input v-model="ordernumber" placeholder="Please input number..." clearable effect="dark" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="创建时间:">
                            <el-date-picker v-model="createtime" type="daterange" unlink-panels range-separator="To"
                                start-placeholder="Start date" end-placeholder="End date" :shortcuts="shortcuts"
                                :size="small" :default-value="createtimedefaultvalue" :disabled="true" readonly
                                style="width:250px" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="问题类别:">
                            <el-select v-model="issueClassify" placeholder="请选择问题类别" @change="handleChange">
                                <el-option v-for="item in issueClassifyOptions" :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="问题类型:">
                            <el-select v-model="issueType" placeholder="请选择问题类型">
                                <el-option v-for="item in issueTypeOptions" :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="交互对象:">
                            <el-select v-model="interactTarget" placeholder="请选择交互对象">
                                <el-option v-for="item in interactTargetOptions" :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="回复状态:">
                            <el-select v-model="replystatus" placeholder="请选择回复状态">
                                <el-option v-for="item in replystatusOptions" :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item class="btn">
                            <el-button type="primary">发送信息</el-button>
                            <el-button type="primary">修改类型</el-button>
                            <el-button>完结工单</el-button>
                            <el-button type="primary">重开工单</el-button>
                            <el-button type="primary">修改状态</el-button>
                            <el-button type="primary" @click="getProject">搜索工单</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
    <div class="el-tabs-orders">
        <!-- 标签页 -->
        <el-tabs type="border-card">
            <el-tab-pane label="待处理">User</el-tab-pane>
            <el-tab-pane label="处理中">Config</el-tab-pane>
            <el-tab-pane label="判责中">Role</el-tab-pane>
            <el-tab-pane label="已完结">Task</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import { ref } from 'vue'

const project = ref('')
const ordernumber = ref('')
const issueClassify = ref('')
const issueType = ref('')
const interactTarget = ref('')
const replystatus = ref('')

// const [project, ordernumber, issueClassify, issueType, interactTarget, replystatus] = Array.from({length: 6}, () => ref(''))
//创建日期，左侧快速选择日期
const pkvla = [
    {
        text: 'Last week',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
        },
    },
    {
        text: 'Last month',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
        },
    },
    {
        text: 'Last 3 months',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
        },
    },
]
//项目
const projectOptions = []
//回复状态
const rsOptions = [
    { value: '', label: '全部' },
    { value: 'customer', label: '当日未跟进' },
]
//交互对象
const itOptions = [
    { value: '', label: '全部' },
    { value: 'customer', label: '客户' },
    { value: 'carrier', label: '承运商' },
    { value: 'warehouse', label: '仓库' },
]
//问题类别
const icOptions = [
    { value: 'ALL', label: '全部' },
    { value: 'LOGISTICS', label: '在途异常' },
    { value: 'CUSTOMER', label: '客户原因' },
    { value: 'ITEM', label: '货损货差' },
]
//问题类型
const LOGISTICS = [
    { value: '催派', label: '催派' },
    { value: '签收未收', label: '签收未收' },
    { value: '无物流信息', label: '无物流信息' },
    { value: '超区', label: '超区' },
    { value: '双面单', label: '双面单' },
]
const CUSTOMER = [
    { value: '截件/拒收', label: '截件/拒收' },
    { value: '修改信息', label: '修改信息' },
    { value: '无法联系', label: '无法联系' },
    { value: '商品质量问题', label: '商品质量问题' },
    { value: '下单信息错误', label: '下单信息错误' },
]
const ITEM = [
    { value: '包裹丢失', label: '包裹丢失' },
    { value: '破损', label: '破损' },
    { value: '货物短少', label: '货物短少' },
    { value: '错发', label: '错发' },
    { value: '优派遗失', label: '优派遗失' },
    { value: '多发', label: '多发' },
]
const all = [
    { value: '', label: '全部' },
]
//获取所有项目api
const getprojectAPI = "https://newem.800best.com/ajax/company-user/user/data-access/OMS/PROJECT?_=1677845529256";

// 通知定时100毫秒进行清理
setTimeout(function (e) {
    // 这里的id只要和创建的时候设置id值一样就行了，就可以清理对应id的通知了
    chrome.notifications.clear("id");
}, 100);

export default {
    data() {
        return {
            //单号
            ordernumber,
            //项目
            project,
            projectOptions,
            //问题类别
            issueClassify,
            issueClassifyOptions: icOptions,
            //问题类型
            issueType,
            issueTypeOptions: [],
            //创建时间
            createtime: [],
            //创建时间默认值
            createtimedefaultvalue: [new Date(new Date().getTime() - 3600 * 24 * 1000 * 90), new Date()],
            //交互对象
            interactTarget,
            interactTargetOptions: itOptions,
            //回复状态
            replystatus,
            replystatusOptions: rsOptions,
            //创建日期，左侧快速选择日期
            shortcuts: pkvla,
        }
    },
    created() {
        //设置默认选中值
        this.createtime = this.createtimedefaultvalue;
        this.issueClassify = this.issueClassifyOptions[0].value;
        this.issueTypeOptions = all;
        this.issueType = this.issueTypeOptions[0].value;
        //加载所有项目
        this.getProject();
    },
    methods: {
        //问题类别联动
        handleChange(val) {
            this.issueType = ''
            switch (val) {
                case 'ALL':
                    this.issueTypeOptions = all;
                    break
                case 'LOGISTICS':
                    this.issueTypeOptions = LOGISTICS;
                    break
                case 'CUSTOMER':
                    this.issueTypeOptions = CUSTOMER;
                    break
                case 'ITEM':
                    this.issueTypeOptions = ITEM;
                    break
                default:
                    this.issueTypeOptions = []
                    break
            }
            // 这里改变默认选中第0个数据
            this.issueType = this.issueTypeOptions[0].value
        },
        //获取所有项目
        getProject() {
            const temp = [{ value: 1, label: '全部' }]
            axios.get(getprojectAPI).then(res => {
                if (res.data.success === true) {
                    for (var i = 0; i < res.data.data.length; i++) {
                        temp.push({
                            value: res.data.data[i].id,
                            label: res.data.data[i].name
                        })
                    }
                    //将获取到的所有项目赋值给项目列表
                    this.projectOptions = temp;
                    this.desktopnotification("项目加载完毕，默认选中全部项目~");
                    console.log(projectOptions)
                    //设置默认选择全部
                    this.project = this.projectOptions[0];
                } else {
                    this.desktopnotification(res.data.toString()) 
                    console.log(res)
                }
            }).catch(error => {
                     this.desktopnotification(error.toString()) 
                     console.log(error);
            })

        }, 
        //桌面通知
        desktopnotification(msg) {
            chrome.notifications.create("id", {
                requireInteraction:false,//通知是否保持可见，默认false,
                type: 'basic',
                title: ' ',  // 这里我故意使显示这个为空，显得没那么拥挤
                message: msg,
                iconUrl: './best16.png'
            });
        },
    },
    mounted() {
    }
}
</script>


<style scoped>
.btn {
    float: right;
    margin-right: 20px;
}

.box-border {
    border: 1px solid #ddd;
}

.el-tabs-orders {
    padding-top: 20px;
}

.title-bg {
    background-color: #ddd;
    padding: 10px;
    padding-left: 20px;
    margin-top: 0;
    color: #767676;
}

.orderquery .el-col {
    padding-left: 10px;
    padding-right: 10px;
}
</style>

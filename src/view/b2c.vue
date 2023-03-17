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
                                :size="small" :default-value="createtimedefaultvalue" :disabled="false"
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
                            <el-button type="primary" @click="changeIssueType">修改类型</el-button>
                            <el-button>完结工单</el-button>
                            <el-button type="primary">重开工单</el-button>
                            <el-button type="primary">修改状态</el-button>
                            <el-button :icon="Search" type="primary" @click="searchOrder">搜索工单</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
    <!-- 标签页 -->
    <div class="el-tabs-orders">     
        <el-tabs type="card" v-model="activeTabs" @tab-change="tabchange">
            <!-- 显示数量 -->
            <div class="pagesize">
                    <el-select v-model="pagesize" placeholder="请选择数量" size="defalut" style="width:80px" @change="pagesizechange">
                        <el-option v-for="item in pagesizeOptions" :key="item.value" :label="item.label" :value="item.value"/>
                    </el-select>
            </div>
            <!-- 工单表格 -->
            <el-tab-pane v-bind:label="followlabel" name="a">
                我的关注
            </el-tab-pane>
            <el-tab-pane v-bind:label="suspendedlabel" name="b">
                已挂起
            </el-tab-pane>
            <el-tab-pane v-bind:label="waitprocesslabel" name="c">
                <el-table :data="tableDatawaitprocess" stripe border style="width: 100%;">
                    <el-table-column sortable align="center" prop="emCode" label="工单号" width="180" />
                    <el-table-column sortable align="center" prop="numbers" label="单号" width="260"> </el-table-column>
                    <el-table-column sortable align="center" prop="projectName" label="项目" />
                    <el-table-column sortable align="center" prop="interactTarget" label="交互对象" />
                    <el-table-column sortable align="center" prop="expressInfo" label="快递信息" />
                    <el-table-column sortable align="center" prop="workOrderSubInfo" label="工单提交信息" />
                </el-table>
            </el-tab-pane>
            <el-tab-pane v-bind:label="processinglabel" name="d">
                <el-table :data="tableDataprocessing" stripe border style="width:100%">
                    <el-table-column sortable align="center" prop="emCode" label="工单号" width="180" />
                    <el-table-column sortable align="center" prop="orderCode" label="单号" width="180" />
                    <el-table-column sortable align="center" prop="projectName" label="项目"  width="220" />
                    <el-table-column sortable align="center" prop="lastUpdateTime" label="最新处理时间"  />
                    <el-table-column sortable align="center" prop="interactTarget" label="交互对象" width="110"  />
                    <el-table-column sortable align="center" prop="shippingOrderNo" label="快递信息"  />
                    <el-table-column sortable align="center" prop="createTime" label="工单提交信息"  />
                    <el-table-column sortable align="center" prop="currentContent" label="最新处理信息"  width="240" />
                </el-table>
            </el-tab-pane>
            <el-tab-pane v-bind:label="unconfirmlabel" name="e">
               <el-table :data="tableDataunconfirm" stripe border style="width:100%">
                    <el-table-column sortable align="center" prop="emCode" label="工单号" width="180"/>
                    <el-table-column sortable align="center" prop="orderCode" label="单号" width="180" />
                    <el-table-column sortable align="center" prop="projectName" label="项目"  width="220" />
                    <el-table-column sortable align="center" prop="lastUpdateTime" label="最新处理时间"  />
                    <el-table-column sortable align="center" prop="interactTarget" label="交互对象" width="110"  />
                    <el-table-column sortable align="center" prop="shippingOrderNo" label="快递信息"  />
                    <el-table-column sortable align="center" prop="createTime" label="工单提交信息"  />
                    <el-table-column sortable align="center" prop="currentOperation" label="最新处理信息"  width="240" />
                </el-table>
            </el-tab-pane>
            <el-tab-pane v-bind:label="finishlabel" name="f">
                <el-table :data="tableDatafinish" stripe border style="width:100%">
                    <el-table-column sortable align="center" prop="emCode" label="工单号" width="180"/>
                    <el-table-column sortable align="center" prop="orderCode" label="单号" width="180" />
                    <el-table-column sortable align="center" prop="projectName" label="项目"  width="220" />
                    <el-table-column sortable align="center" prop="interactTarget" label="交互对象" width="110"  />
                    <el-table-column sortable align="center" prop="shippingOrderNo" label="快递信息"  />
                    <el-table-column sortable align="center" prop="createTime" label="工单提交信息"  />
                    <el-table-column sortable align="center" prop="lastUpdateTime" label="工单完结时间"  />
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div> 
    <!-- 分页 -->
    <div class="elpagination">
        <el-pagination background layout="prev, pager, next"
        :pager-count="6" 
        :page-size="pagesize" 
        :total="pagetotal" 
        @current-change="pagechange"
         />
    </div>
    <!-- 回到顶部 -->
    <el-backtop 
        target=".page-main"
        :visibility-height=0
        :right="45" 
        :bottom="80"
        style="background-color:#545C64;color: aliceblue;">
    </el-backtop>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

//项目
const project = ref('')
//单号
const ordernumber = ref('')
//问题类型
const issueClassify = ref('')
//问题类别
const issueType = ref('')
//交互对象
const interactTarget = ref('')
//回复状态
const replystatus = ref('')

//标签选项
const activeTabs = ref('c')

//分页总数 = 获取到的工单数量 / 选择显示的数量
//分页总数需要向上取整
// Math.ceil(需要向上取整的数); 
//选择数量
const pagesize = ref('')
const pagesizeOptions = [
    { value:10,label:'10' },
    { value:100,label:'100' },
    { value:500,label:'500' },
]

//工单状态数量列表
//下标值：我的关注，已挂起，待处理，处理中，判责中，已完结
// 0,1,2,3,4,5
var numlistData = [  ]

//待处理表格数据
const tableDatawaitprocess = ref([])
//处理中表格数据
const tableDataprocessing = ref([])
//判责待确认表格数据
const tableDataunconfirm = ref([])
//已完结表格数据
const tableDatafinish = ref([])

const followlabel = ref('我的关注(0)')
const suspendedlabel = ref('已挂起(0)')
const waitprocesslabel = ref('待处理(0)')
const processinglabel = ref('处理中(0)')
const unconfirmlabel = ref('判责中(0)')
const finishlabel = ref('已完结(0)')

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
//回复状态,目前只设置了是否为当日未跟进的值
const rsOptions = [
    { value: false, label: '全部' },
    { value: true, label: '当日未跟进' },
]
//交互对象
const itOptions = [
    { value: '', label: '全部' },
    { value: 'customer', label: '客户' },
    { value: 'carrier', label: '承运商' },
    { value: 'warehouser', label: '仓库' },
]
//问题类别
const icOptions = [
    { value: '', label: '全部' },
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
//获取工单列表
const getPageListAPI = "https://newem.800best.com/ajax/em/b2c/judge/getPageList";
//获取工单数量
const getNumListAPI = "https://newem.800best.com/ajax/em/b2c/judge/getNumList ";

//获取工单数量请求数据
const getNumListData = {
    projectCode: "",
    creator: null,
    finisher: null,
    interactTarget: interactTarget.value,
    issueClassify: issueClassify.value,
    issueType: issueType,
    keywords: "",
    logisticsProviderCode: "",
    robotInService: 11,
    multiPackage: "",
    onlyHangUpFlag: true,
    statusList: [
        "waitprocess"
    ],
    showColor: "0",
    showColorFlag: "false",
    showColorServicer: "0",
    showColorServicerFlag: "false",
    tradeScreenshot: "0",
    tradeScreenshotFlag: "false",
    returnScreenshot: "0",
    returnScreenshotFlag: "false",
    servicerOnly: "false",
    credit: "false",
    dutyFlag: "false",
    awaitApprove: null,
    signFlag: null,
    replyInterceptFlag: false,

    todayNotFollowFlag: replystatus.value,

    orderSource: "0",
    createTimeBegin: "",
    createTimeEnd: "",
    statusFlag: true,
    handler: null,
    dealBeforeToday: false,
    dealToday: false
}
//处理中数据请求数据
const processOrderData = {
    draw: 4,
    columns: [
        {
            data: "id",
            name: "",
            searchable: true,
            orderable: false,
            search: {
                value: "",
                regex: false
            }
        },
        {
            data: "emCode",
            name: "",
            searchable: true,
            orderable: false,
            search: {
                value: "",
                regex: false
            }
        },
        {
            data: "mixOrderCode",
            name: "",
            searchable: true,
            orderable: false,
            search: {
                value: "",
                regex: false
            }
        },
        {
            data: "projectName",
            name: "",
            searchable: true,
            orderable: false,
            search: {
                value: "",
                regex: false
            }
        },
        {
            data: "dealWithCustomerService",
            name: "",
            searchable: true,
            orderable: false,
            search: {
                value: "",
                regex: false
            }
        },
        {
            data: "interactTarget",
            name: "",
            searchable: true,
            orderable: false,
            search: {
                value: "",
                regex: false
            }
        },
        {
            data: "deliveryInformation",
            name: "",
            searchable: true,
            orderable: false,
            search: {
                value: "",
                regex: false
            }
        },
        {
            data: "creatorInfo",
            name: "",
            searchable: true,
            orderable: false,
            search: {
                value: "",
                regex: false
            }
        },
        {
            data: "currentOperation",
            name: "",
            searchable: true,
            orderable: false,
            search: {
                value: "",
                regex: false
            }
        }
    ],
    order: [

    ],
    //从第N条数据开始获取，[10,25,50,75,100,200,400,500]
    //sample 
    //选择10
    //start = (当前页数 - 1 ) * 10
    //选择25
    //start = (当前页数 - 1) * 25
    start: 0,
    length: 500,
    search: {
        value: "",
        regex: false
    },
    so: {
        projectCode: "",
        creator: null,
        finisher: null,
        interactTarget: "",
        issueClassify: "",
        issueType: "",
        logisticsProviderCode: "",
        robotInService: 11,
        multiPackage: "",
        onlyHangUpFlag: true,
        statusList: [
            "processing"
        ],
        showColor: "0",
        showColorFlag: "false",
        showColorServicer: "0",
        showColorServicerFlag: "false",
        tradeScreenshot: "0",
        tradeScreenshotFlag: "false",
        returnScreenshot: "0",
        returnScreenshotFlag: "false",
        servicerOnly: "false",
        credit: "false",
        dutyFlag: "false",
        awaitApprove: null,
        signFlag: null,
        replyInterceptFlag: null,
        todayNotFollowFlag: null,
        orderSource: "0",
        createTimeBegin: "2022-12-15 00:00:00",
        createTimeEnd: "2023-03-15 23:59:59",
        statusFlag: true,
        handler: null,
        dealBeforeToday: true,
        dealToday: true
    }
}
//判责中待确认请求数据
const unconfirmOrderData = {
    draw: 3,
    columns: [{
        data: "id",
        name: "",
        searchable: true,
        orderable: false,
        search: {
            value: "",
            regex: false
        }
    },
    {
        data: "emCode",
        name: "",
        searchable: true,
        orderable: false,
        search: {
            value: "",
            regex: false
        }
    },
    {
        data: "mixOrderCode",
        name: "",
        searchable: true,
        orderable: false,
        search: {
            value: "",
            regex: false
        }
    },
    {
        data: "projectName",
        name: "",
        searchable: true,
        orderable: false,
        search: {
            value: "",
            regex: false
        }
    },
    {
        data: "dealWithCustomerService",
        name: "",
        searchable: true,
        orderable: false,
        search: {
            value: "",
            regex: false
        }
    },
    {
        data: "interactTarget",
        name: "",
        searchable: true,
        orderable: false,
        search: {
            value: "",
            regex: false
        }
    },
    {
        data: "deliveryInformation",
        name: "",
        searchable: true,
        orderable: false,
        search: {
            value: "",
            regex: false
        }
    },
    {
        data: "creatorInfo",
        name: "",
        searchable: true,
        orderable: false,
        search: {
            value: "",
            regex: false
        }
    },
    {
        data: "currentOperation",
        name: "",
        searchable: true,
        orderable: false,
        search: {
            value: "",
            regex: false
        }
    }],
    order: [],
    start: 0,
    length: 500,
    search: {
        value: "",
        regex: false
    },
    so: {
        projectCode: "",
        keywords: "",
        creator: null,
        finisher: null,
        interactTarget: "",
        issueClassify: "",
        issueType: "",
        logisticsProviderCode: "",
        robotInService: 11,
        multiPackage: "",
        onlyHangUpFlag: true,
        statusList: ["unconfirm"],
        showColor: "0",
        showColorFlag: "false",
        showColorServicer: "0",
        showColorServicerFlag: "false",
        tradeScreenshot: "0",
        tradeScreenshotFlag: "false",
        returnScreenshot: "0",
        returnScreenshotFlag: "false",
        servicerOnly: "false",
        credit: "false",
        dutyFlag: "false",
        awaitApprove: null,
        signFlag: null,
        replyInterceptFlag: null,
        todayNotFollowFlag: null,
        orderSource: "0",
        createTimeBegin: "2022-12-15 00:00:00",
        createTimeEnd: "2023-03-15 23:59:59",
        statusFlag: true,
        handler: null,
        dealBeforeToday: false,
        dealToday: false
    }
}
//待处理工单请求内容
const waitprocessOrderData = {
    draw: 21,
    columns: [{
        data: "id",
        name: "",
        searchable: true,
        orderable: false,
        search: {
            value: "",
            regex: false
        }
    },
    {
        data: "emCode",
        name: "",
        searchable: true,
        orderable: false,
        search: {
            value: "",
            regex: false
        }
    },
    {
        data: "mixOrderCode",
        name: "",
        searchable: true,
        orderable: false,
        search: {
            value: "",
            regex: false
        }
    },
    {
        data: "projectName",
        name: "",
        searchable: true,
        orderable: false,
        search: {
            value: "",
            regex: false
        }
    },
    {
        data: "interactTarget",
        name: "",
        searchable: true,
        orderable: false,
        search: {
            value: "",
            regex: false
        }
    },
    {
        data: "deliveryInformation",
        name: "",
        searchable: true,
        orderable: false,
        search: {
            value: "",
            regex: false
        }
    },
    {
        data: "creatorInfo",
        name: "",
        searchable: true,
        orderable: false,
        search: {
            value: "",
            regex: false
        }
    }],
    order: [],
    start: 0,
    length: 500,
    search: {
        value: "",
        regex: false
    },
    so: {
        projectCode: "",
        keywords: "",
        creator: null,
        finisher: null,
        interactTarget: "",
        issueClassify: "",
        issueType: "",
        logisticsProviderCode: "",
        robotInService: 11,
        multiPackage: "",
        onlyHangUpFlag: true,
        statusList: ["waitprocess"],
        showColor: "0",
        showColorFlag: "false",
        showColorServicer: "0",
        showColorServicerFlag: "false",
        tradeScreenshot: "0",
        tradeScreenshotFlag: "false",
        returnScreenshot: "0",
        returnScreenshotFlag: "false",
        servicerOnly: "false",
        credit: false,
        dutyFlag: "false",
        awaitApprove: null,
        signFlag: "false",
        replyInterceptFlag: "false",
        todayNotFollowFlag: "false",
        orderSource: "0",
        createTimeBegin: "2022-12-14 00:00:00",
        createTimeEnd: "2023-03-14 23:59:59",
        statusFlag: true,
        handler: null,
        dealBeforeToday: false,
        dealToday: false
    }
}
//已完结工单请求内容
const finishOrderdata = {
    draw: 2,
    columns: [{
        data: "id",
        name: "",
        searchable: true,
        orderable: false,
        search: {
            value: "",
            regex: false
        }
    },
    {
        data: "emCode",
        name: "",
        searchable: true,
        orderable: false,
        search: {
            value: "",
            regex: false
        }
    },
    {
        data: "mixOrderCode",
        name: "",
        searchable: true,
        orderable: false,
        search: {
            value: "",
            regex: false
        }
    },
    {
        data: "projectName",
        name: "",
        searchable: true,
        orderable: false,
        search: {
            value: "",
            regex: false
        }
    },
    {
        data: "interactTarget",
        name: "",
        searchable: true,
        orderable: false,
        search: {
            value: "",
            regex: false
        }
    },
    {
        data: "deliveryInformation",
        name: "",
        searchable: true,
        orderable: false,
        search: {
            value: "",
            regex: false
        }
    },
    {
        data: "creatorInfo",
        name: "",
        searchable: true,
        orderable: false,
        search: {
            value: "",
            regex: false
        }
    },
    {
        data: "finishedInfo",
        name: "",
        searchable: true,
        orderable: false,
        search: {
            value: "",
            regex: false
        }
    }],
    order: [],
    start: 0,
    length: 500,
    search: {
        value: "",
        regex: false
    },
    so: {
        projectCode: "",
        keywords: "",
        creator: null,
        finisher: null,
        interactTarget: "",
        issueClassify: "",
        issueType: "",
        logisticsProviderCode: "",
        robotInService: 11,
        multiPackage: "",
        onlyHangUpFlag: true,
        statusList: ["finish"],
        showColor: "0",
        showColorFlag: "false",
        showColorServicer: "0",
        showColorServicerFlag: "false",
        tradeScreenshot: "0",
        tradeScreenshotFlag: "false",
        returnScreenshot: "0",
        returnScreenshotFlag: "false",
        servicerOnly: "false",
        credit: "false",
        dutyFlag: "false",
        awaitApprove: null,
        signFlag: null,
        replyInterceptFlag: null,
        todayNotFollowFlag: null,
        orderSource: "0",
        createTimeBegin: "2022-12-15 00:00:00",
        createTimeEnd: "2023-03-15 23:59:59",
        statusFlag: true,
        handler: null,
        dealBeforeToday: false,
        dealToday: false
    }
}

// 通知定时100毫秒进行清理
setTimeout(function (e) {
    // 这里的id只要和创建的时候设置id值一样就行了，就可以清理对应id的通知了
    chrome.notifications.clear("id");
}, 100);

export default {
    data() {
        return {
            //工单数量列表
            numlistData,
            //每页显示的数量
            pagesize,
            pagesizeOptions,
            //分页控件数量总数
            pagetotal:0,
            // 我的关注工单数量显示
            followlabel,
            suspendedlabel,
            waitprocesslabel,
            processinglabel,
            unconfirmlabel,
            finishlabel,
            //处理状态选项
            activeTabs,
            //待处理表格容器
            tableDatawaitprocess,
            //处理中表格容器
            tableDataprocessing,
            //判责待确认表格容器
            tableDataunconfirm,
            //已完结表格容器
            tableDatafinish,
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
            //创建时间默认值 3个月
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
        this.replystatus = this.replystatusOptions[0].value;
        this.pagesize = this.pagesizeOptions[0].value;
        //加载所有项目
        this.getProject();
    },
    methods: {
        //切换不同的标签加载对应的数据
        tabchange() {
            //切换标签清空所有表格的数据
            this.tableDatawaitprocess = []
            this.tableDataprocessing = []
            this.tableDataunconfirm = []
            this.tableDatafinish = []
            //重置分页总数
            this.pagetotal = 0;
            //获取工单数量
            this.getNumList();
           
            //加载对应标签数据
            switch (activeTabs.value) {
                case 'a': {
                    //加载我的关注数据
                    console.log('加载我的关注数据', activeTabs.value)
                    break;
                }
                case 'b': {
                    console.log('加载已挂起数据', activeTabs.value)
                    break;
                }
                case 'c': {
                    //加载待处理数据
                    console.log('加载待处理数据', activeTabs.value);
                    this.getwaitprocessOrder();
                    break;
                }
                case 'd': {
                    console.log('加载处理中数据', activeTabs.value)
                    this.getprocessOrder();
                    break;
                }
                case 'e': {
                    console.log('加载判责中数据', activeTabs.value)
                    this.getunconfirmOrder();
                    break;
                }
                case 'f': {
                    this.getfinishOrder();
                    console.log('加载已完结数据', activeTabs.value)
                    break;
                }
                default: {
                    console.log('没有选择处理状态...')
                    break;
                }
            }
        },
        //将日期转换为指定字符串日期格式
        formatDate(startStr, endStr) {
            // 将日期对象转换为指定格式的字符串
            const startStr1 = startStr.toLocaleString('chinese', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/(\d{4})\/(\d{2})\/(\d{2})/, '$1-$2-$3');
            const endStr1 = endStr.toLocaleString('chinese', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/(\d{4})\/(\d{2})\/(\d{2})/, '$1-$2-$3');
            // 将时分秒部分设置为 0
            const startTime = startStr1.substring(0, 10) + ' 00:00:00';
            const endTime = endStr1.substring(0, 10) + ' 23:59:59';
            return [startTime, endTime];
        },
        //将时间戳转为字符串
        timestampToDateString(timestamp) {
            const date = new Date(timestamp)
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()
            const hour = date.getHours()
            const minute = date.getMinutes()
            const second = date.getSeconds()
            return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
        },
        //问题类别联动
        handleChange(val) {
            this.issueType = ''
            switch (val) {
                case '':
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
            const temp = [{ value: '', label: '全部' }]
            axios.get(getprojectAPI).then(res => {
                if (res.data.success === true) {
                    for (var i = 0; i < res.data.data.length; i++) {
                        temp.push({
                            value: res.data.data[i].code,
                            label: res.data.data[i].name
                        })
                    }
                    //将获取到的所有项目赋值给项目列表
                    this.projectOptions = temp;
                    this.desktopnotification("项目加载完毕，默认选中全部项目~");
                    //设置默认选择全部
                    // this.project = this.projectOptions[0];
                } else {
                    this.desktopnotification(res.data.toString())
                    console.log('获取所有项目的响应',res)
                }
            }).catch(error => {
                this.desktopnotification(error.toString())
                console.log('获取所有项目的响应',error);
            })

        },
        //桌面通知
        desktopnotification(msg) {
            chrome.notifications.create("id", {
                requireInteraction: false,//通知是否保持可见，默认false,
                type: 'basic',
                title: ' ',  // 这里我故意使显示这个为空，显得没那么拥挤
                message: msg,
                iconUrl: './best16.png'
            });
        },
        //搜索工单
        searchOrder() {
            this.tabchange();
        },
        //设置请求数据
        setrequestData(requestOrderData) {
            //设置要搜索的数量
            requestOrderData.length = pagesize.value;
            //设置选中的项目
            requestOrderData.so.projectCode = project.value;
            //快递单号有100条限制，
            requestOrderData.so.keywords = ordernumber.value;
            //设置选中的问题类型
            requestOrderData.so.issueClassify = issueClassify.value;
            requestOrderData.so.issueType = issueType.value;
            requestOrderData.so.interactTarget = interactTarget.value;
            //设置当日未跟进状态
            requestOrderData.so.todayNotFollowFlag = replystatus.value;
            //设置时间,获取选中的日期，赋值到获取待处理工单data里
            const times = this.formatDate(this.createtime[0], this.createtime[1]);
            requestOrderData.so.createTimeBegin = times[0];
            requestOrderData.so.createTimeEnd = times[1];
            console.log('修改后的时间', requestOrderData.so)


        },
        //获取工单数量
        getNumList() {
            // this.setrequestData(getNumListData);
            //设置选中的项目
            getNumListData.projectCode = project.value;
            //快递单号有100条限制，
            getNumListData.keywords = ordernumber.value;
            //设置选中的问题类型
            getNumListData.issueClassify = issueClassify.value;
            getNumListData.issueType = issueType.value;
            getNumListData.interactTarget = interactTarget.value;
            getNumListData.todayNotFollowFlag = replystatus.value;

            //设置时间,获取选中的日期，赋值到获取工单数量data里
            const times = this.formatDate(this.createtime[0], this.createtime[1]);
            getNumListData.createTimeBegin = times[0];
            getNumListData.createTimeEnd = times[1];

            axios.post(getNumListAPI, getNumListData, {
                headers: { "Content-Type": "application/json; charset=UTF-8" }
            })
                .then(res => {
                    numlistData = [];
                    //将结果赋值到tabs
                    this.followlabel = "我的关注" + "(" + res.data.data[0] + ")";//待处理的下标
                    this.suspendedlabel = "已挂起" + "(" + res.data.data[1] + ")";//待处理的下标
                    this.waitprocesslabel = "待处理" + "(" + res.data.data[2] + ")";//待处理的下标
                    this.processinglabel = "处理中" + "(" + res.data.data[3] + ")";//待处理的下标
                    this.unconfirmlabel = "判责中" + "(" + res.data.data[4] + ")";//待处理的下标
                    this.finishlabel = "已完结" + "(" + res.data.data[5] + ")";//待处理的下标
                    //将数量保存到工单数量列表里
                    numlistData = res.data.data;
                     //设置分页控件总条数
                    this.setpagetotal(res.data.data);
                })
                .catch(error => {
                    console.error('获取工单数量', error);
                });
        },
        //获取待处理工单
        getwaitprocessOrder() {
            this.setrequestData(waitprocessOrderData);
            // //设置选中的项目
            // waitprocessOrderData.so.projectCode = project.value;
            // //快递单号有100条限制，
            // waitprocessOrderData.so.keywords = ordernumber.value;
            // //设置选中的问题类型
            // waitprocessOrderData.so.issueClassify = issueClassify.value;
            // waitprocessOrderData.so.issueType = issueType.value;
            // waitprocessOrderData.so.interactTarget = interactTarget.value;
            // //设置当日未跟进状态
            // waitprocessOrderData.so.todayNotFollowFlag = replystatus.value;
            // //设置时间,获取选中的日期，赋值到获取待处理工单data里
            // const times = this.formatDate(this.createtime[0], this.createtime[1]);
            // waitprocessOrderData.so.createTimeBegin = times[0];
            // waitprocessOrderData.so.createTimeEnd = times[1];
            // console.log('修改后的时间', waitprocessOrderData.so)
            
            axios.post(getPageListAPI, waitprocessOrderData, {
                headers: { "Content-Type": "application/json; charset=UTF-8" }
            })
                .then(res => {
                    if (res.data.success === true) {
                        const temp = []
                        // this.tableData = temp
                        for (let i = 0; i < res.data.data.length; i++) {
                            temp.push({
                                //工单号
                                emCode: res.data.data[i].emCode,
                                //单号{订单号，客户单号，外部单号} numbers
                                numbers:
                                    "订单号: " + res.data.data[i].orderCode,
                                // "客户单号: " + res.data.data[i].refOrderCode +
                                // "外部单号: " + res.data.data[i].outerCode,
                                //项目
                                projectName: res.data.data[i].projectName,
                                //交互对象
                                interactTarget:
                                    res.data.data[i].interactTarget === 'carrier' ? '承运商' :
                                        res.data.data[i].interactTarget === 'customer' ? '客户' :
                                            res.data.data[i].interactTarget === 'warehouser' ? '仓库' :
                                                '未知',

                                //快递信息 expressInfo
                                // expressInfo:res.data.data[i].logisticsProviderName+
                                expressInfo: res.data.data[i].shippingOrderNo,

                                //工单提交信息 workOrderSubInfo
                                workOrderSubInfo:
                                    // res.data.data[i].updatorName +
                                    this.timestampToDateString(res.data.data[i].createTime)
                            })
                        }
                        this.tableDatawaitprocess = temp;
                        console.log('获取待处理工单Response:', res.data);
                    } else {
                        this.notifications(res.data.success)
                    }
                })
                .catch(error => {
                    console.error('获取待处理工单Error:', error);
                });
        },
        //获取前处理中工单
        getprocessOrder(){
            //替换请求内容，实现数据筛选
            this.setrequestData(processOrderData);
            // //设置选中的项目
            // processOrderData.so.projectCode = project.value;
            // //快递单号有100条限制，
            // processOrderData.so.keywords = ordernumber.value;
            // //设置选中的问题类型
            // processOrderData.so.issueClassify = issueClassify.value;
            // processOrderData.so.issueType = issueType.value;
            // processOrderData.so.interactTarget = interactTarget.value;
            // //设置当日未跟进状态
            // processOrderData.so.todayNotFollowFlag = replystatus.value;
            // //设置时间,获取选中的日期，赋值到获取待处理工单data里
            // const times = this.formatDate(this.createtime[0], this.createtime[1]);
            // processOrderData.so.createTimeBegin = times[0];
            // processOrderData.so.createTimeEnd = times[1];
            // console.log('修改后的时间', processOrderData.so)


            axios.post(getPageListAPI,processOrderData,{
                headers: { "Content-Type": "application/json; charset=UTF-8" }
            }).then(res =>{
                const temp =[]
                for (let i = 0; i < res.data.data.length; i++) {
                    temp.push({
                        emCode:res.data.data[i].emCode,
                        orderCode:res.data.data[i].orderCode,
                        projectName:res.data.data[i].projectName,
                        //将最新处理时间戳转字符串日期
                        lastUpdateTime:this.timestampToDateString(res.data.data[i].lastUpdateTime),
                        //将英文转换为指定中文
                        interactTarget:res.data.data[i].interactTarget === 'carrier' ? '承运商' :
                        res.data.data[i].interactTarget === 'customer' ? '客户' :
                        res.data.data[i].interactTarget === 'warehouser' ? '仓库' :
                        '未知',
                        shippingOrderNo:res.data.data[i].shippingOrderNo,
                        //将工单创建时间戳转字符串日期
                        createTime:this.timestampToDateString(res.data.data[i].createTime),
                        //最新回复信息描述
                        currentContent:res.data.data[i].currentContent,
                    })                    
                }
                this.tableDataprocessing = temp;
                console.log('获取处理中工单成功响应数据为：',res.data.data)
            })
            .catch(error =>{
                console.log('获取处理中工单异常',error)
            })
        },
        //获取判责待确认工单
        getunconfirmOrder(){
            //替换请求内容，实现数据筛选
            this.setrequestData(unconfirmOrderData);
            // //设置选中的项目
            // unconfirmOrderData.so.projectCode = project.value;
            // //快递单号有100条限制，
            // unconfirmOrderData.so.keywords = ordernumber.value;
            // //设置选中的问题类型
            // unconfirmOrderData.so.issueClassify = issueClassify.value;
            // unconfirmOrderData.so.issueType = issueType.value;
            // unconfirmOrderData.so.interactTarget = interactTarget.value;
            // //设置当日未跟进状态
            // unconfirmOrderData.so.todayNotFollowFlag = replystatus.value;
            // //设置时间,获取选中的日期，赋值到获取待处理工单data里
            // const times = this.formatDate(this.createtime[0], this.createtime[1]);
            // unconfirmOrderData.so.createTimeBegin = times[0];
            // unconfirmOrderData.so.createTimeEnd = times[1];

            axios.post(getPageListAPI,unconfirmOrderData,{
                headers:{
                    "Content-Type": "application/json; charset=UTF-8"
                }
            }).then( res =>{
                const temp = []
                for (let i = 0; i < res.data.data.length; i++) {
                    temp.push({
                        emCode:res.data.data[i].emCode,
                        orderCode:res.data.data[i].orderCode,
                        projectName:res.data.data[i].projectName,
                        //将最新处理时间戳转字符串日期
                        lastUpdateTime:this.timestampToDateString(res.data.data[i].lastUpdateTime),
                        //将英文转换为指定中文
                        interactTarget:res.data.data[i].interactTarget === 'carrier' ? '承运商' :
                        res.data.data[i].interactTarget === 'customer' ? '客户' :
                        res.data.data[i].interactTarget === 'warehouser' ? '仓库' :
                        '未知',
                        shippingOrderNo:res.data.data[i].shippingOrderNo,
                        //将工单创建时间戳转字符串日期
                        createTime:this.timestampToDateString(res.data.data[i].createTime),
                        //最新回复信息描述
                        currentOperation:res.data.data[i].currentOperation,
                    }) 
                    this.tableDataunconfirm = temp;
                    console.log('获取处理中工单成功响应数据为：',res.data.data)     
                }
            }).catch(error =>{
                console.log(error)
            })
        },
        //获取已完结工单
        getfinishOrder(){
            //替换请求内容，实现数据筛选
            this.setrequestData(finishOrderdata);
            // //设置选中的项目
            // finishOrderdata.so.projectCode = project.value;
            // //快递单号有100条限制，
            // finishOrderdata.so.keywords = ordernumber.value;
            // //设置选中的问题类型
            // finishOrderdata.so.issueClassify = issueClassify.value;
            // finishOrderdata.so.issueType = issueType.value;
            // finishOrderdata.so.interactTarget = interactTarget.value;
            // //设置当日未跟进状态
            // finishOrderdata.so.todayNotFollowFlag = replystatus.value;
            // //设置时间,获取选中的日期，赋值到获取待处理工单data里
            // const times = this.formatDate(this.createtime[0], this.createtime[1]);
            // finishOrderdata.so.createTimeBegin = times[0];
            // finishOrderdata.so.createTimeEnd = times[1];

            axios.post(getPageListAPI,finishOrderdata,{
                headers:{
                    "Content-Type":"application/json; chartset-utf-8"
                }
            }).then(res =>{
                const temp = []
                for (let i = 0; i < res.data.data.length; i++) {
                    temp.push({
                        emCode:res.data.data[i].emCode,
                        orderCode:res.data.data[i].orderCode,
                        projectName:res.data.data[i].projectName,

                        interactTarget:res.data.data[i].interactTarget === 'carrier' ? '承运商' :
                        res.data.data[i].interactTarget === 'customer' ? '客户' :
                        res.data.data[i].interactTarget === 'warehouser' ? '仓库' :
                        '未知',
                        shippingOrderNo:res.data.data[i].shippingOrderNo,

                        createTime:this.timestampToDateString(res.data.data[i].createTime),
                        lastUpdateTime:this.timestampToDateString(res.data.data[i].lastUpdateTime),
                    })                  
                }
                this.tableDatafinish = temp;
            })
            .catch(error =>{
                console.log('获取已完结工单',error);
            })
        },
        //设置分页控件总数
        setpagetotal(){
            //分页总数 = 获取到的工单数量 / 选择显示的数量
            //分页总数需要向上取整
            // Math.ceil(需要向上取整的数);
            
            //数据总条数 pagetotal
            //每页显示数量 pagesize
            //工单状态数量列表 numlistData
            //下标值：我的关注，已挂起，待处理，处理中，判责中，已完结
            // var temp = Math.ceil(numlistData[2] / pagesize.value);
            this.pagetotal = 0;
            //根据选中的标签设置分页的总条数
            //加载对应标签数据
            switch (activeTabs.value) {
                case 'a': {
                    //加载我的关注数据
                    console.log('加载我的关注数据', activeTabs.value)
                    this.pagetotal = numlistData[0];
                    break;
                }
                case 'b': {
                    console.log('加载已挂起数据', activeTabs.value)
                    this.pagetotal = numlistData[1];
                    break;
                }
                case 'c': {
                    //加载待处理数据
                    console.log('加载待处理数据', activeTabs.value);
                    this.pagetotal = numlistData[2];
                    break;
                }
                case 'd': {
                    console.log('加载处理中数据', activeTabs.value)
                    this.pagetotal = numlistData[3];
                    break;
                }
                case 'e': {
                    console.log('加载判责中数据', activeTabs.value)
                    this.pagetotal = numlistData[4];
                    break;
                }
                case 'f': {
                    this.getfinishOrder();
                    console.log('加载已完结数据', activeTabs.value)
                    this.pagetotal = numlistData[5];
                    break;
                }
                default: {
                    console.log('没有选择处理状态,无法设置分页总数值...')
                    break;
                }
            }
        },
        //页面改变，加载对应标签，对应位置tableData数据
        pagechange(val){
             //加载对应标签数据
             switch (activeTabs.value) {
                case 'a': {
                    //加载我的关注数据
                    console.log('加载我的关注数据', activeTabs.value)
                    break;
                }
                case 'b': {
                    console.log('加载已挂起数据', activeTabs.value)
                    break;
                }
                case 'c': {
                    //加载待处理数据
                    //设置待处理起始位
                    waitprocessOrderData.start = (val - 1) * pagesize.value;
                    this.getwaitprocessOrder();
                    console.log('加载待处理数据', activeTabs.value);
                    break;
                }
                case 'd': {
                    //设置处理中起始位
                    processOrderData.start = (val - 1) * pagesize.value;
                    this.getprocessOrder();
                    console.log('加载处理中数据', activeTabs.value)
                    break;
                }
                case 'e': {
                    //设置判责待确认起始位
                    unconfirmOrderData.start = (val - 1) * pagesize.value;
                    this.getunconfirmOrder();
                    console.log('加载判责中数据', activeTabs.value)
                    break;
                }
                case 'f': {
                    //设置已完结起始位
                    finishOrderdata.start = (val - 1) * pagesize.value;
                    this.getfinishOrder();
                    console.log('加载已完结数据', activeTabs.value)
                    break;
                }
                default: {
                    console.log('没有选择处理状态...')
                    break;
                }
            }
        },
        //pagesize change update tableData
        pagesizechange(){
            this.tabchange();
        },
        //修改工单类型
        changeIssueType() {
           
        }
    },
    mounted() {
    }
}
</script>


<style scoped>
 
.pagesize{
    padding-bottom: 8px;
}
.elpagination {
    float: right;
    padding-top: 20px;
}

.btn {
    float: right;
    margin-right: 20px;
}

.box-border {
    border: 1px solid #ddd;
    margin: 0; 
    padding: 0;
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

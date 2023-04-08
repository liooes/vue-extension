<template>
    <div class="input-container">
        <el-input v-model="inputnumber" placeholder="请输入快递单号以英文,分隔。建议200条以内" clearable>
            <template #prepend>
                <span>快递单号</span>
            </template>
            <template #append>
                <el-button type="primary" @click="getExpress">查询物流</el-button>
            </template>
        </el-input>
    </div>
    <el-progress :text-inside="true" :stroke-width="20" :percentage="percent" />
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { ElProgress,ElNotification } from 'element-plus'

import * as XLSX from 'xlsx'


const inputnumber = ref('');
var tokenV2 = '';
const gettokenV2API = 'https://www.baidu.com/s?tn=baidu&wd=yt1745831259004&oq=%E5%BF%AB%E9%80%92'

export default {
    data() {
        return {
            percent: 0,
            inputnumber,
            tokenV2,
        }
    },
    methods: {
        async gettokenV2() {
            await axios.get(gettokenV2API, {
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
                    'Cookie': 'BAIDUID=5560EAF375A71C2A77D4D79C768210C5:FG=1;',
                }
            }).then(response => {
                // 从HTML中获取checkUrl的值
                const checkUrl = response.data.match(/checkUrl:\s*['"]([^'"]*)['"]/)[1];
                // 从checkUrl中获取tokenV2的值
                tokenV2 = checkUrl.match(/tokenV2=([^&]*)/)[1];
            }).catch(error => {
                console.log(error)
            })
        },
        async getExpress() {
            this.percent = 0;//初始化进度条的值
            var temparr = inputnumber.value.split(",");//分割快递单号
            var j = 0; //控制获取tokenV2的数量，查20次物流获取一次tokenV2
            let data = []; // 用于保存所有快递信息的数组
            await this.gettokenV2();
            for (let i = 0; i < temparr.length; i++) {
                j++;
                if (j >= 20) {
                    this.tokenV2 = await this.gettokenV2();
                    j = 0;
                }
                await axios.get(
                    'https://express.baidu.com/express/api/express?query_from_srcid=4001&' +
                    'tokenV2=' + tokenV2 + '&' +
                    'nu=' + temparr[i]
                    , {
                        headers: {
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
                            'Cookie': 'BAIDUID=5560EAF375A71C2A77D4D79C768210C5:FG=1;'
                        }
                    }).then(res => {
                        res.data.data.info.expressnumber = temparr[i];// 响应结果添加快递信息
                        data.push(res.data.data.info); 
                        // 计算进度条的值
                        this.percent = Math.floor((i + 1) / temparr.length * 100);
                    }).catch(error => {
                        console.log(error)
                    })
            }
            //保存excel
            console.log(data)
            // 获取当前日期和时间
            let now = new Date();
            // 格式化日期和时间为字符串
            let dateString = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
            let timeString = now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds();
            //格式化json数据为指定格式
            const datas = data.map(({ context, ...item }) => ({
                expressnumber: item.expressnumber,
                // send_time: new Date(item.send_time).toLocaleString(),
                latest_time_new: item.latest_time_new,
                latest_progress: item.latest_progress,
                current:item.current,
                // ...item,
                context: context?.map(c => `${new Date(c.time * 1000).toLocaleString()} ${c.desc}`).reverse().join('\n'),
                com: item.com
                }));

            // Create a new workbook
            const wb = XLSX.utils.book_new();
            // Add a new worksheet to the workbook
            const ws = XLSX.utils.json_to_sheet(datas)
            // Set the column widths
            ws['!cols'] = [
            { width: 20 },
            { width: 25 },
            { width: 60 },
            { width: 8 },
            { width: 60 },
            ];
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            // 将工作簿保存为Excel文件
            XLSX.writeFile(wb, dateString + '-' + timeString + '智能查询' + temparr.length + '条' + '.xlsx');

            //发送信息，成功数量通知
            ElNotification({
                title: '查询物流',
                message: '已查询' + temparr.length + '条信息',
                type: 'info',
            })
        }
    },

}

</script>
<style>
.input-container {
    display: flex;
    align-items: center;
}

.el-progress--line {
    margin-top: 8px;
    /* width: 100; */
}
</style>
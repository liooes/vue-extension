# EM-Assistant 参数说明
### 待处理工单需要解析的响应数据
```
emCode : "G2303141916142038"

numbers
orderCode : "C23031454181520"
refOrderCode : "230314-179332719451048"
outerCode : "12303141415670"

projectName : "热风-春晖仓"
interactTarget : "carrier"

expressInfo
logisticsProviderName : "圆通速递"
shippingOrderNo : "YT8642368609055"

//提交信息
updatorName : "张建国"
lastUpdateTime : 1678792574000
```
### 工单处理状态 so里的参数
```
[
  "finishlabel",
  "waitprocesslabel",
  "unconfirmlabel",
  "processinglabel"
]
```
 ### 工单状态变量
| label | value |
| :--- | :---- |
| 我的关注| suspendedlabel|
| 已挂起| waitprocesslabel|
| 待处理| processinglabel|
| 处理中| unconfirmlabel|
| 判责中| finishlabel|
| 已完结| followlabel|

### 筛选条件
|label|value|
|:---:|:---:|
| 项目 |project|
| 单号 |ordernumber,keywords|
| 创建时间 |createtime|
| 问题类别 |issueClassify|
| 问题类型 |issueType|
| 交互对象 |interactTarget|
| 回复状态 |replystatus|
### 处理中需要解析的响应数据
|prop|value|
|:---|:---|
| 工单号| emCode|
| 单号|orderCode |
| 项目|projectName |
| 最新处理时间| lastUpdateTime |
| 交互对象|interactTarget |
| 快递信息|shippingOrderNo |
| 工单提交信息| createTime |
| 最新处理信息| currentContent |

**工单提交信息是工单创建时间和工单创建人**

### 判责待确认需要解析的响应数据
|prop|value|
|:---|:---|
| 工单号| emCode|
| 单号|orderCode |
| 项目|projectName |
| 最新处理时间| lastUpdateTime |
| 交互对象|interactTarget |
| 快递信息|shippingOrderNo |
| 工单提交信息| createTime |
| 最新处理信息| currentOperation |

**判责待确认工单显示只有最新处理信息和处理中工单不一样，其他的一样**

### 已完结需要解析的响应数据
|prop|value|
|:---|:---|
| 工单号| emCode|
| 单号|orderCode |
| 项目|projectName |
| 交互对象|interactTarget |
| 快递信息|shippingOrderNo |
| 工单提交信息| createTime |
| 工单完结时间| lastUpdateTime |

### 页面出现两个滚动条的问题
![两个滚动条](https://raw.githubusercontent.com/liooes/images/main/markdown20230317020607.png)
**这是由于子容器高度大于父容器则会显示滚动条**
**解决方案**
1. 将父容器滚动条隐藏，在父容器页面添加以下代码
```
   <style>
      body{
          overflow: hidden;
      }
    /style>
```
### element plus的backTop控件没有响应原因
```
 <el-backtop 
        target=".page-main"
        :visibility-height=0
        :right="45" 
        :bottom="80"
        style="background-color:#545C64;color: aliceblue;">
    </el-backtop>
```
**target**	触发滚动的对象，这个参数要写，非常重要！！！就是根据这个参数的数值做响应


### 重开工单属性及事件
v-model="drawerreopenEM"
:direction="direction" 
@open="opendrawerreopenEM"
@close="closedrawerreopenEM"

当前标签位置：{{ tablelocation }}
重开工单数量：{{ tableDatanum }}
@click="drawerreopenEMcancelClick"
@click="drawerreopenEMconfirmClick"




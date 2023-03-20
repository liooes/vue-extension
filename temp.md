# EM-Assistant 实现思路和遇到问题解决的方法
## 加载项目
### 请求响应数据分析
#### 请求数据
#### 响应数据
### 项目选择器
#### 属性和事件
### 功能实现
---

## 搜索工单
### 请求响应数据分析
#### 请求数据
##### 工单处理状态 so里的参数
```json
[
  "finishlabel",
  "waitprocesslabel",
  "unconfirmlabel",
  "processinglabel"
]
```
##### 工单状态变量
| label | value |
| :--- | :---- |
| 我的关注| suspendedlabel|
| 已挂起| waitprocesslabel|
| 待处理| processinglabel|
| 处理中| unconfirmlabel|
| 判责中| finishlabel|
| 已完结| followlabel|
##### 筛选条件
|label|value|
|:---:|:---:|
| 项目 |project|
| 单号 |ordernumber,keywords|
| 创建时间 |createtime|
| 问题类别 |issueClassify|
| 问题类型 |issueType|
| 交互对象 |interactTarget|
| 回复状态 |replystatus|
#### 响应数据
##### 待处理响应数据
```json
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
##### 处理中响应数据
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
##### 判责待确认响应数据
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
##### 已完结响应数据
|prop|value|
|:---|:---|
| 工单号| emCode|
| 单号|orderCode |
| 项目|projectName |
| 交互对象|interactTarget |
| 快递信息|shippingOrderNo |
| 工单提交信息| createTime |
| 工单完结时间| lastUpdateTime |

---

### 搜索工单UI
#### 属性和事件

### 功能实现
#### 待处理
#### 处理中
#### 判责中
#### 已完结

## 修改类型
### 请求响应数据分析
#### 请求数据
#### 响应数据

### 修改类型UI
#### 修改类型属性和事件

### 功能实现
#### 待处理
#### 处理中


## 修改状态
### 请求响应数据分析
#### 请求数据

> Request URL: https://newem.800best.com/ajax/em/chanageTodayFollowType

> Content-Type: application/x-www-form-urlencoded; charset=UTF-8

> 请求内容
```
id=16381047&todayFollowProgress=%E6%97%A0%E5%AE%9E%E8%B4%A8%E6%80%A7%E8%BF%9B%E5%B1%95
```
#### 响应数据
```json
{
    "success": true,
    "error": null,
    "messages": null,
    "vo": null,
    "voList": [],
    "data": [],
    "udf1": null,
    "strData": null
}
```

### 修改状态UI
> 抽屉，修改工单进展属性和响应

|el-drawer|value|
|:---|:---|
|`v-model`|drawerchanageTodayFollowType|
|`direction`|direction|
|`@close`|drawerchanageTodayFollowTypecancelClick|

> 选择器，当日跟进状态

 |el-select|value|
 |:---|:---|
 |`v-model`|chanageTodayFollowType|
 |`el-option`|chanageTodayFollowTypeOptions|

> 按钮 取消和确认

 |el-button|value|
 |:---|:---|
 |`@click`|drawerchanageTodayFollowTypecancelClick|
 |`@click`|drawerchanageTodayFollowTypeconfirmClick|

### 功能实现
#### 修改工单进展核心代码
```js
case 'c': {
                    //表格有数据才可以修改
                    if(this.tableDatawaitprocess.length>0){
                        // const loading = ElLoading.service(loadingoptions);
                        var successCount =0;
                        var resCount =0;
                        //遍历表格发送
                        for (let i = 0; i < this.tableDatawaitprocess.length; i++) {
                            //设置要发送的数据
                            var temp  ={
                                id:this.tableDatawaitprocess[i].id,
                                todayFollowProgress:chanageTodayFollowType.value
                            } 
                            axios.post(chanageTodayFollowTypeAPI,qs.stringify(temp),{
                                headers:{
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            }).then(res =>{ 
                                resCount += 1;
                                if(res.data.success === true){
                                    successCount+=1;
                                }
                                if(resCount === this.tableDatawaitprocess.length){
                                    // loading.close();
                                    ElNotification({title:'修改工单进展',message:'已修改'+successCount+'条为：'+chanageTodayFollowType.value
                                    })
                                }
                            }).catch(error =>{
                                console.log(error)
                                ElNotification({title:'error',message:error,type:'warning'})
                                // loading.close();
                            })
                            stringify(temp))                           
                        }
                        
                    }else{
                        ElNotification({title:'修改工单进展',message:'待处理表格数据为空,请搜索要修改的工单哦~',type:'warning'})
                    }
                    break;
                }
```

## 重开工单
### 请求响应数据分析
#### 请求数据
#### 响应数据

### 重开工单UI
#### 重开原因 reopenReason

* 撤销赔付
* 新增异常
* 判责错误
* 客户原因
#### 重开工单属性及事件
```
v-model="drawerreopenEM"
:direction="direction" 
@open="opendrawerreopenEM"
@close="closedrawerreopenEM"

当前标签位置：{{ tablelocation }}
重开工单数量：{{ tableDatanum }}
@click="drawerreopenEMcancelClick"
@click="drawerreopenEMconfirmClick"
```

### 功能实现
#### 判责待确认
```
heards:{
  Content-Type: application/x-www-form-urlencoded; charset=UTF-8
}
url:https://newem.800best.com/ajax/em/revokeDuty
method:post

//请求数据
emId=16348218&revokeReason=%E6%92%A4%E9%94%80%E8%B5%94%E4%BB%98

//响应数据
{
  "success": true,
  "error": null,
  "messages": null,
   vo....很多的参数
   voList...很多的参数
   data...很多的参数
  "udf1": null,
  "strData": null
}    
```
#### 已完结
```
heards:{
  Content-Type: application/x-www-form-urlencoded; charset=UTF-8
}
url:https://newem.800best.com/ajax/em/reopenEm
method:post

//请求数据
orderCode=C23030744413432&
interactTarget=carrier&
content=%E6%92%A4%E9%94%80%E8%B5%94%E4%BB%98&
emId=16337306&
version=10&
pictures=!!&
files=

orderCode=C23031251057344&
interactTarget=%E5%AE%A2%E6%88%B7&
content=%E6%92%A4%E9%94%80%E8%B5%94%E4%BB%98&
pictures=%21%21&
files=

//响应
{
  "success": true,
  "error": null,
  "messages": null,
   vo:{}...some data
   voList...some data
  "data": [],
  "udf1": null,
  "strData": null
}
```


## 异常检测
1. 单边工单
2. 三方类型根据条件判断是否一致(1.客户&承运商 2.客户&仓库 3.承运商&仓库)
3. 已完结或判责待确认工单。判责说明，判责金额，判责运费不一致
4. 无法联系完结的工单
5. 包裹丢失完结无需判责的工单
6. 处理中，判责包裹丢失，检测。判责说明，判责金额，判责运费是否一致
7. 超时效工单百世发货时间客户创建工单时间超60天


## 一些问题
> ### 页面出现两个滚动条的问题
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
---
> ### element plus的backTop控件没有响应原因
```js
 <el-backtop 
        target=".page-main"
        :visibility-height=0
        :right="45" 
        :bottom="80"
        style="background-color:#545C64;color: aliceblue;">
    </el-backtop>
```
**target**	触发滚动的对象，这个参数要写，非常重要！！！就是根据这个参数的数值做响应
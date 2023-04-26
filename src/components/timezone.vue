<template>
  <div style="margin-top: 10%;">
    <dev class="time cycle" style="width:50%;height:200px;float: left;" >
         <div class="input" style="margin: auto;width: 30%;">
                <a-form :label-col="labelCol" :wrapper-col="wrapperCol" style="width:500px;height:200px;">
                <a-form-item label="转换时间" required>
                <a-input v-model:value="modelRef.date" style="width: 200px;    right: 26%;" />
                </a-form-item>
                <a-form-item label="当前时区" required>
              <a-select
                v-model:value="modelRef.now_timezone"
                show-search
                placeholder="Select a person"
                style="width: 200px;    right: 26%;"
                :options="options"
                :filter-option="filterOption"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
              ></a-select>
                </a-form-item>
                <a-form-item label="目标时区" required>
                    <a-select
                v-model:value="modelRef.timezone"
                show-search
                placeholder="Select a person"
                style="width: 200px;    right: 26%;"
                :options="options"
                :filter-option="filterOption"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
              ></a-select>
                </a-form-item>

                <a-form-item class="error-infos" :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click.prevent="onSubmit">提交</a-button>
                <a-button style="margin-left: 10px" @click="resetFields">重置</a-button>
                    <a-button style="margin-left: 10px" @click="swap">时区互换</a-button>
                </a-form-item>
        </a-form>
         </div>
    </dev>
    <div class="cycleDate" style="float: right;width:50%;">
        <div style="background: #ececec; padding: 5px ;width:310px;">
            <a-card title="目标时间" :bordered="false" style="width: 300px;">
            <p>{{modelRef.cycleDate.date}}</p>
            </a-card>
        </div>
     </div>     
  </div>
     
</template>
<script lang="ts">
import { reactive, ref,defineComponent} from 'vue';
import { message } from "ant-design-vue";


export default defineComponent({
  setup() {
    let now = new Date()
    let year = now.getFullYear()
    let month = now.getMonth() + 1 
    let day = now.getDate()
    let hour = now.getHours()
    let minute = now.getMinutes()
    let date = year + '-' + month + '-' + day
    let time = hour + ':' + minute
    let dateTime = date + ' ' + time
    const modelRef = reactive({
      date: dateTime,
      now_timezone: 'America/Los_Angeles',
      timezone: 'Asia/Shanghai',
      cycleDate:''  
    });
    const timeZoneList: any[] = [];
    fetch( "https://www.zaojingyoutu.top:8000/api/timezone/", {
      mode: "cors",
      method: "get",
    })
      .then((response) => response.json()).then(res=>{
          if(res.code !== 200){
                message.error({
                content: res.msg,
                duration: 3
                });
          }else{
              for (let i=0;i < res.data.length; i++){
                  options.value.push({value: res.data[i],
                      label: res.data[i]})
              }
                timeZoneList.push(res.data)
          }

          });


    const swap =() =>{
        let timezone = modelRef.timezone
        modelRef.timezone = modelRef.now_timezone
        modelRef.now_timezone = timezone
    }

    const onSubmit = () => {
      fetch( "https://www.zaojingyoutu.top:8000/api/timezone/", {
      mode: "cors",
      method: "post",
      body: JSON.stringify(modelRef)
    })
      .then((response) => response.json()).then(res=>{
          if(res.code != 200){
                message.error({
                content: res.msg,
                duration: 3
                });
          }else{
              message.success({
                content: res.msg,
                duration: 5
                });
                modelRef.cycleDate = res.data
          }
          
          })
    };

    const resetFields = () =>{
        modelRef.date = ''
        modelRef.timezone = ''
        modelRef.now_timezone = ''
        modelRef.cycleDate = ''
    }

    const options:any = ref([]);

    const handleChange = (value: any) => {
      console.log(`selected ${value}`);
    };

    const handleBlur = () => {
      console.log('blur');
    };

    const handleFocus = () => {
      console.log('focus');
    };

    const filterOption = (input: string, option: { value: string; }) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };



    return {
      resetFields,
      modelRef,
      onSubmit,
        timeZoneList,
              value: ref(undefined),
      filterOption,
      handleBlur,
      handleFocus,
      handleChange,
      options,
        swap
    };
  },

});
</script>
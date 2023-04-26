<template>
    <div style="margin-top: 10%;">
        <!-- <h1 style="position: relative;">全球手机号生成</h1> -->
    <div class="input" style="position: relative;left: 38%;width:fit-content" >
        
        <a-form
        layout="inline"
      :model="formState"
      name="basic"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="国家"
        name="country"
        :rules="[{ required: true, message: '国家必填' }]"
        
      >
        <a-input v-model:value="formState.country" />
      </a-form-item>

      <a-form-item >
        <a-button type="primary" html-type="submit" @click="send">生成</a-button>
      </a-form-item>
        </a-form>
    </div>
    <div class="mobleInfo" style="width: 450px;position: relative;left: 34%;margin-top: 20px;">
        <a-descriptions  bordered :column=1>
        <a-descriptions-item label="国别号">{{ formState.countryCode }}</a-descriptions-item>
        <a-descriptions-item label="手机号">{{ formState.internationalMoble }}</a-descriptions-item>
    </a-descriptions>
    </div>  
    </div>
    
    <div class="tip div-center" style="padding: 20px 16px;background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #50bfff;
    margin: 20px 0;
    bottom: 0;
    position:fixed;
    width: 100%;;
    ">
        <p style="font-size: 18px;">使用说明:</p>
        <blockquote><p>
            <i>输入全球国家名称都可以生成对应手机号，并通过谷歌全球手机校验库规则。</i><br>
            <i> 生成信息，是通过相关信息规则随机、虚拟生成，并非真实信息，仅供测试使用，请勿用于非法用途。 </i>
        </p></blockquote>
    </div>
  </template>
  <script lang="ts">
  import { alertProps } from 'ant-design-vue/lib/alert';
import { defineComponent, reactive } from 'vue';
  
  interface FormState {
    country: string;
    countryCode:string,
    internationalMoble:string

    
  }
  export default defineComponent({
    setup() {
      const formState = reactive<FormState>({
        country: '中国',
        countryCode: '',
        internationalMoble:''

      });
      const onFinish = (values: any) => {
        console.log('Success:', values);
      };
  
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
      const send=()=>{fetch( "https://www.zaojingyoutu.top:8000/api/getMobile/?name=" + formState.country, {
      mode: "cors",
      method: "get",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code == 200){formState.countryCode=data.data.country_code;
        formState.internationalMoble=data.data.international_format;}
        else{
            alert(data.msg)
        }
      });} 

      return {
        formState,
        onFinish,
        onFinishFailed,
        send
      };
    },
  });
  </script>
  
  
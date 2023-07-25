<template>
  <div style="margin-top: 8%;width: 500px; margin-left: 37%;">
    <a-form
      :model="formState"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      style="display: flex"
      
    >
      <a-form-item
        label="生成数量"
        name="generateQuantity"
        style="flex-basis: auto"
        :rules="[{ required: true, message: '生成数量必填！' }]"
      >
        <a-input v-model:value="formState.generateQuantity" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">生成</a-button>
      </a-form-item>
      
      
    </a-form>
    <div >
        <a-textarea
        v-model:value="formState.uuids"
        placeholder="请先生成uuid"
        :rows="4"
        style=" height: 400px; width: 363px; right: 65px;"
      />
      </div>
  </div>
</template>
  <script lang="ts" setup>
import { reactive } from "vue";

interface FormState {
  generateQuantity: number;
  uuids: string;
}

const formState = reactive<FormState>({
  generateQuantity: 1,
  uuids: '',
});
const onFinish = () => {
    formState.uuids = '' 
    for (let i = 0; i<formState.generateQuantity;i++){
        formState.uuids =( formState.uuids + '\n' + crypto.randomUUID()).trim()
    }
  console.log("Success:", formState.uuids);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>
  
  
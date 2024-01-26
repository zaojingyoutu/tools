<template>
    <div style="margin-top: 10%;">
        <!-- <h1 style="position: relative;">全球手机号生成器</h1> -->
    <div class="input" style="position: relative;left: 38%;width:fit-content" >
        
        <a-form
        layout="inline"
      :model="formState"
      name="basic"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="国家/地区"
        name="country"
        :rules="[{ required: true, message: '国家必填' }]"
        
      >
        <!-- <a-input v-model:value="formState.country" /> -->
        <a-select
                v-model:value="formState.country"
                show-search
                placeholder="Select a person"
                style="width: 200px;"
                :options="options"
                :filter-option="filterOption"
              ></a-select>
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
import { defineComponent, reactive,ref } from 'vue';
  
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
      const send=()=>{fetch( "https://www.zaojingyoutu.top:8002/api/getMobile/?name=" + formState.country, {
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
      const options = ref( [{'value': '安道尔共和国', 'label': '安道尔共和国'}, {'value': '阿拉伯联合酋长国', 'label': '阿拉伯联合酋长国'}, {'value': '阿富汗', 'label': '阿富汗'}, {'value': '安提瓜和巴布达', 'label': '安提瓜和巴布达'}, {'value': '安圭拉岛', 'label': '安圭拉岛'}, {'value': '阿尔巴尼亚', 'label': '阿尔巴尼亚'}, {'value': '亚美尼亚', 'label': '亚美尼亚'}, {'value': '安哥拉', 'label': '安哥拉'}, {'value': '阿根廷', 'label': '阿根廷'}, {'value': '奥地利', 'label': '奥地利'}, {'value': '澳大利亚', 'label': '澳大利亚'}, {'value': '阿塞拜疆', 'label': '阿塞拜疆'}, {'value': '巴巴多斯', 'label': '巴巴多斯'}, {'value': '孟加拉国', 'label': '孟加拉国'}, {'value': '比利时', 'label': '比利时'}, {'value': '布基纳法索', 'label': '布基纳法索'}, {'value': '保加利亚', 'label': '保加利亚'}, {'value': '巴林', 'label': '巴林'}, {'value': '布隆迪', 'label': '布隆迪'}, {'value': '贝宁', 'label': '贝宁'}, {'value': '巴勒斯坦', 'label': '巴勒斯坦'}, {'value': '百慕大群岛', 'label': '百慕大群岛'}, {'value': '文莱', 'label': '文莱'}, {'value': '玻利维亚', 'label': '玻利维亚'}, {'value': '巴西', 'label': '巴西'}, {'value': '巴哈马', 'label': '巴哈马'}, {'value': '博茨瓦纳', 'label': '博茨瓦纳'}, {'value': '白俄罗斯', 'label': '白俄罗斯'}, {'value': '伯利兹', 'label': '伯利兹'}, {'value': '加拿大', 'label': '加拿大'}, {'value': '中非共和国', 'label': '中非共和国'}, {'value': '刚果', 'label': '刚果'}, {'value': '瑞士', 'label': '瑞士'}, {'value': '库克群岛', 'label': '库克群岛'}, {'value': '智利', 'label': '智利'}, {'value': '喀麦隆', 'label': '喀麦隆'}, {'value': '中国', 'label': '中国'}, {'value': '哥伦比亚', 'label': '哥伦比亚'}, {'value': '哥斯达黎加', 'label': '哥斯达黎加'}, {'value': '古巴', 'label': '古巴'}, {'value': '塞浦路斯', 'label': '塞浦路斯'}, {'value': '捷克', 'label': '捷克'}, {'value': '德国', 'label': '德国'}, {'value': '吉布提', 'label': '吉布提'}, {'value': '丹麦', 'label': '丹麦'}, {'value': '多米尼加共和国', 'label': '多米尼加共和国'}, {'value': '阿尔及利亚', 'label': '阿尔及利亚'}, {'value': '厄瓜多尔', 'label': '厄瓜多尔'}, {'value': '爱沙尼亚', 'label': '爱沙尼亚'}, {'value': '埃及', 'label': '埃及'}, {'value': '西班牙', 'label': '西班牙'}, {'value': '埃塞俄比亚', 'label': '埃塞俄比亚'}, {'value': '芬兰', 'label': '芬兰'}, {'value': '斐济', 'label': '斐济'}, {'value': '法国', 'label': '法国'}, {'value': '加蓬', 'label': '加蓬'}, {'value': '英国', 'label': '英国'}, {'value': '格林纳达', 'label': '格林纳达'}, {'value': '格鲁吉亚', 'label': '格鲁吉亚'}, {'value': '法属圭亚那', 'label': '法属圭亚那'}, {'value': '加纳', 'label': '加纳'}, {'value': '直布罗陀', 'label': '直布罗陀'}, {'value': '冈比亚', 'label': '冈比亚'}, {'value': '几内亚', 'label': '几内亚'}, {'value': '希腊', 'label': '希腊'}, {'value': '危地马拉', 'label': '危地马拉'}, {'value': '关岛', 'label': '关岛'}, {'value': '圭亚那', 'label': '圭亚那'}, {'value': '香港特别行政区', 'label': '香港特别行政区'}, {'value': '洪都拉斯', 'label': '洪都拉斯'}, {'value': '海地', 'label': '海地'}, {'value': '匈牙利', 'label': '匈牙利'}, {'value': '印度尼西亚', 'label': '印度尼西亚'}, {'value': '爱尔兰', 'label': '爱尔兰'}, {'value': '以色列', 'label': '以色列'}, {'value': '印度', 'label': '印度'}, {'value': '伊拉克', 'label': '伊拉克'}, {'value': '伊朗', 'label': '伊朗'}, {'value': '冰岛', 'label': '冰岛'}, {'value': '意大利', 'label': '意大利'}, {'value': '牙买加', 'label': '牙买加'}, {'value': '约旦', 'label': '约旦'}, {'value': '日本', 'label': '日本'}, {'value': '肯尼亚', 'label': '肯尼亚'}, {'value': '吉尔吉斯坦', 'label': '吉尔吉斯坦'}, {'value': '柬埔寨', 'label': '柬埔寨'}, {'value': '朝鲜', 'label': '朝鲜'}, {'value': '韩国', 'label': '韩国'}, {'value': '科特迪瓦共和国', 'label': '科特迪瓦共和国'}, {'value': '科威特', 'label': '科威特'}, {'value': '哈萨克斯坦', 'label': '哈萨克斯坦'}, {'value': '老挝', 'label': '老挝'}, {'value': '黎巴嫩', 'label': '黎巴嫩'}, {'value': '圣卢西亚', 'label': '圣卢西亚'}, {'value': '列支敦士登', 'label': '列支敦士登'}, {'value': '斯里兰卡', 'label': '斯里兰卡'}, {'value': '利比里亚', 'label': '利比里亚'}, {'value': '莱索托', 'label': '莱索托'}, {'value': '立陶宛', 'label': '立陶宛'}, {'value': '卢森堡', 'label': '卢森堡'}, {'value': '拉脱维亚', 'label': '拉脱维亚'}, {'value': '利比亚', 'label': '利比亚'}, {'value': '摩洛哥', 'label': '摩洛哥'}, {'value': '摩纳哥', 'label': '摩纳哥'}, {'value': '摩尔多瓦', 'label': '摩尔多瓦'}, {'value': '马达加斯加', 'label': '马达加斯加'}, {'value': '马里', 'label': '马里'}, {'value': '缅甸', 'label': '缅甸'}, {'value': '蒙古', 'label': '蒙古'}, {'value': '澳门', 'label': '澳门'}, {'value': '蒙特塞拉特岛', 'label': '蒙特塞拉特岛'}, {'value': '马耳他', 'label': '马耳他'}, {'value': '毛里求斯', 'label': '毛里求斯'}, {'value': '马尔代夫', 'label': '马尔代夫'}, {'value': '马拉维', 'label': '马拉维'}, {'value': '墨西哥', 'label': '墨西哥'}, {'value': '马来西亚', 'label': '马来西亚'}, {'value': '莫桑比克', 'label': '莫桑比克'}, {'value': '纳米比亚', 'label': '纳米比亚'}, {'value': '尼日尔', 'label': '尼日尔'}, {'value': '尼日利亚', 'label': '尼日利亚'}, {'value': '尼加拉瓜', 'label': '尼加拉瓜'}, {'value': '荷兰', 'label': '荷兰'}, {'value': '挪威', 'label': '挪威'}, {'value': '尼泊尔', 'label': '尼泊尔'}, {'value': '瑙鲁', 'label': '瑙鲁'}, {'value': '新西兰', 'label': '新西兰'}, {'value': '阿曼', 'label': '阿曼'}, {'value': '巴拿马', 'label': '巴拿马'}, {'value': '秘鲁', 'label': '秘鲁'}, {'value': '法属玻利尼西亚', 'label': '法属玻利尼西亚'}, {'value': '巴布亚新几内亚', 'label': '巴布亚新几内亚'}, {'value': '菲律宾', 'label': '菲律宾'}, {'value': '巴基斯坦', 'label': '巴基斯坦'}, {'value': '波兰', 'label': '波兰'}, {'value': '波多黎各', 'label': '波多黎各'}, {'value': '葡萄牙', 'label': '葡萄牙'}, {'value': '巴拉圭', 'label': '巴拉圭'}, {'value': '卡塔尔', 'label': '卡塔尔'}, {'value': '罗马尼亚', 'label': '罗马尼亚'}, {'value': '俄罗斯', 'label': '俄罗斯'}, {'value': '沙特阿拉伯', 'label': '沙特阿拉伯'}, {'value': '所罗门群岛', 'label': '所罗门群岛'}, {'value': '塞舌尔', 'label': '塞舌尔'}, {'value': '苏丹', 'label': '苏丹'}, {'value': '瑞典', 'label': '瑞典'}, {'value': '新加坡', 'label': '新加坡'}, {'value': '斯洛文尼亚', 'label': '斯洛文尼亚'}, {'value': '斯洛伐克', 'label': '斯洛伐克'}, {'value': '塞拉利昂', 'label': '塞拉利昂'}, {'value': '圣马力诺', 'label': '圣马力诺'}, {'value': '塞内加尔', 'label': '塞内加尔'}, {'value': '索马里', 'label': '索马里'}, {'value': '苏里南', 'label': '苏里南'}, {'value': '圣多美和普林西比', 'label': '圣多美和普林西比'}, {'value': '萨尔瓦多', 'label': '萨尔瓦多'}, {'value': '叙利亚', 'label': '叙利亚'}, {'value': '斯威士兰', 'label': '斯威士兰'}, {'value': '乍得', 'label': '乍得'}, {'value': '多哥', 'label': '多哥'}, {'value': '泰国', 'label': '泰国'}, {'value': '塔吉克斯坦', 'label': '塔吉克斯坦'}, {'value': '土库曼斯坦', 'label': '土库曼斯坦'}, {'value': '突尼斯', 'label': '突尼斯'}, {'value': '汤加', 'label': '汤加'}, {'value': '土耳其', 'label': '土耳其'}, {'value': '特立尼达和多巴哥', 'label': '特立尼达和多巴哥'}, {'value': '台湾省', 'label': '台湾省'}, {'value': '坦桑尼亚', 'label': '坦桑尼亚'}, {'value': '乌克兰', 'label': '乌克兰'}, {'value': '乌干达', 'label': '乌干达'}, {'value': '美国', 'label': '美国'}, {'value': '乌拉圭', 'label': '乌拉圭'}, {'value': '乌兹别克斯坦', 'label': '乌兹别克斯坦'}, {'value': '圣文森特岛', 'label': '圣文森特岛'}, {'value': '委内瑞拉', 'label': '委内瑞拉'}, {'value': '越南', 'label': '越南'}, {'value': '也门', 'label': '也门'}, {'value': '南斯拉夫', 'label': '南斯拉夫'}, {'value': '南非', 'label': '南非'}, {'value': '赞比亚', 'label': '赞比亚'}, {'value': '扎伊尔', 'label': '扎伊尔'}, {'value': '津巴布韦', 'label': '津巴布韦'}]);
      const filterOption = (input:string, option:any) => {
      return option.value.indexOf(input) >= 0;
      
    };

      return {
        formState,
        onFinish,
        onFinishFailed,
        send,
        options,
        filterOption
      };
    },
  });
  </script>
  
  
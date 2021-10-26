<template>
  <el-transfer
  class="main"
    filterable
    :filter-method="filterMethod"
    filter-placeholder="请输入城市拼音"
    v-model="value"
    :data="data">
  </el-transfer>
</template>

<script>
import { getTech } from '@/api/config'
  export default {
    data() {
      const generateData = _ => {
        const data = [];
        let cities = [];
        getTech().then(response => {
          cities = response.data
          console.log(response);
        })
        // const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
        const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
        
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            pinyin: pinyin[index]
          });
        });
        return data;
      };
      return {
        data: generateData(),
        value: [],
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1;
        }
      };
    }
  };
</script>
<style scoped>
.main{
  margin-left: 5%;
}
</style>
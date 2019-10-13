<template>
    <div style="width: 21em;margin:0 auto">
        <el-card>{{result}}</el-card>
        <div class="computer">
            <el-button @click="output(num)" v-for="num in nums" >{{num}}</el-button>
        </div>
      <el-input v-model="current"></el-input>
      <el-button @click="computeResult">=</el-button>
    </div>
</template>

<script>
    export default {
        name: 'computer',
        data() {
            return {
                nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
                current: '',
                result: ''
            };
        },
        methods: {
          output(num) {
            this.result += num;
            },
          computeResult(){
              this.result = this.current;
          }
        },
      computed:{

      }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .computer {
        width: 10em;
        height: 20em;
      margin: 0 auto;
    }
</style>

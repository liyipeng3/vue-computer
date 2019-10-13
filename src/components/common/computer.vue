<template>
    <div>
        <h1>在线计算器</h1>
        <el-container style="margin:0 auto">
            <p v-show="false">{{delNum}}</p>
            <el-card style="width: 36%;margin: 0 auto">
                <el-row style="margin: 0 auto">
                    <el-card style="width: 85%;margin: 0 auto;" shadow="never">
                        <p v-show="inputting" style="font-size: 30px">{{current}}</p>
                        <p v-show="!inputting" style="font-size: 30px">{{result}}</p>
                    </el-card>
                </el-row>
                <el-row>
                    <el-button @click="clear" :disabled="isEmpty" type="primary" style="width: 32%"> C</el-button>
                    <el-button @click="del" :disabled="isEmpty" type="danger" style="width: 30%"
                               icon="el-icon-back"></el-button>
                    <el-button @click="input" style="width: 20%" type="info" plain>+</el-button>
                </el-row>
                <el-row>
                    <el-button @click="input" style="width: 20%">7</el-button>
                    <el-button @click="input" style="width: 20%">8</el-button>
                    <el-button @click="input" style="width: 20%">9</el-button>
                    <el-button @click="input" style="width: 20%" type="info" plain>-</el-button>
                </el-row>
                <el-row>
                    <el-button @click="input" style="width: 20%"> 4</el-button>
                    <el-button @click="input" style="width: 20%"> 5</el-button>
                    <el-button @click="input" style="width: 20%"> 6</el-button>
                    <el-button @click="input" style="width: 20%" type="info" plain>×</el-button>
                </el-row>
                <el-row>
                    <el-button @click="input" style="width: 20%"> 1</el-button>
                    <el-button @click="input" style="width: 20%"> 2</el-button>
                    <el-button @click="input" style="width: 20%"> 3</el-button>
                    <el-button @click="input" style="width: 20%" type="info" plain>÷</el-button>
                </el-row>
                <el-row>
                    <el-button @click="input" style="width: 40%"> 0</el-button>
                    <el-button @click="input" style="width: 21.5%"> .</el-button>
                    <el-button @click="computeResult" style="width: 20%" type="success">=</el-button>
                </el-row>
            </el-card>

        </el-container>
    </div>
</template>

<script>
    export default {
        name: '在线计算器',
        data() {
            return {
                current: '0',
                result: '',
                inputting: true,
                isEmpty: true
            };
        },
        methods: {
            input(event) {
                if (event.target.innerText === '.') {
                    if (String(this.current).indexOf('.') !== -1) {
                        return;
                    }
                }
                if (this.current === '0') {
                    this.current = event.target.innerText;
                } else {
                    this.current += event.target.innerText;
                }
                this.inputting = true;
            },
            computeResult() {
                this.result = 'Output:' + this.current;
                this.inputting = false;
            },
            clear() {
                this.result = '';
                this.current = '0';
            },
            del() {
                this.current = String(this.current).slice(0, -1);
                if(String(this.current).length===0){
                    this.current = '0';
                }
            }
        },
        computed: {
            delNum: function() {
                if (this.current === '0') {
                    this.isEmpty = true;
                } else {
                    this.isEmpty = false;
                }
            }
        },
        created() {
            const _this = this;
            document.onkeydown = function(e) {
                let key = window.event.keyCode;
                _this.inputting = true;
                console.log(key);
                if (key === 13) {
                    _this.computeResult();
                }
                if (key === 8) {
                    _this.del();
                }
                if (key >= 48 && key <= 57) {
                    _this.current += String(key - 48);
                }
                if (key >= 96 && key <= 105) {
                    _this.current += String(key - 96);
                }
                if (key === 110) {
                    if (String(_this.current).indexOf('.') !== -1) {
                        return;
                    }
                    _this.current += '.';
                }
                if (key === 107) {
                    _this.current += '+';
                }
                if (key === 109) {
                    _this.current += '-';
                }
                if (key === 106) {
                    _this.current += '×';
                }
                if (key === 111) {
                    _this.current += '÷';
                }
            };

        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .el-row {
        margin-top: 1em;
    }

</style>

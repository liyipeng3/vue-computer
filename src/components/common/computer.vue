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
        name: 'Computer',
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
                this.inputting = true;
                let inputChar = event.target.innerText;
                if (inputChar === '.') {
                    if (!this.isNumber()) {
                        return;
                    } else {
                        this.current += inputChar;
                        return;
                    }
                }
                if (inputChar === '+' || inputChar === '-' || inputChar === '×' || inputChar === '÷') {
                    if (!this.beforeIsNum()) {
                        return;
                    } else {
                        this.current += inputChar;
                        return;
                    }
                }
                if (this.current === '0') {
                    this.current = inputChar;
                } else {
                    this.current += inputChar;
                }

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
                if (String(this.current).length === 0) {
                    this.current = '0';
                }
            },
            beforeIsNum() {
                let reg = /[0-9]/;
                return reg.test(String(this.current).slice(-1));
            },
            isNumber() {
                let reg = /^[0-9]*[1-9][0-9]*$/;
                return reg.test(String(this.current).split(/[×÷\+-]/).slice(-1)[0]);
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
                if (key === 13 || key === 187) {
                    _this.computeResult();
                }
                if (key === 8) {
                    _this.del();
                }
                if (key >= 48 && key <= 57) {
                    if (_this.current === '0') {
                        _this.current = String(key - 48);
                    } else {
                        _this.current += String(key - 48);
                    }
                }
                if (key >= 96 && key <= 105) {
                    if (_this.current === '0') {
                        _this.current = String(key - 96);
                    } else {
                        _this.current += String(key - 96);
                    }
                }
                if (key === 110) {
                    if (!_this.isNumber()) {
                        return;
                    }
                    _this.current += '.';
                }
                if (key === 107) {
                    if (!_this.beforeIsNum()) {
                        return;
                    }
                    _this.current += '+';
                }
                if (key === 109 || key === 189) {
                    if (!_this.beforeIsNum()) {
                        return;
                    }
                    _this.current += '-';
                }
                if (key === 106) {
                    if (!_this.beforeIsNum()) {
                        return;
                    }
                    _this.current += '×';
                }
                if (key === 111) {
                    if (!_this.beforeIsNum()) {
                        return;
                    }
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

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
                /*-----------中缀表达式转后缀表达式---------*/
                var end = []
                var i = 0, j = 0
                var stack = [];
                while (i < this.current.length) {
                    if (this.current[i] <= '9' && this.current[i] >= '0') {
                        end[j] = this.current[i];
                        //alert(end[j]+"进后缀表达式")
                        i++;
                        j++;
                        if (this.current[i] >= '9' || this.current[i] <= '0' || i === this.current.length)   //若数字后一位为操作符则添加空行以便后续计算
                        {
                            end[j] = ' ';
                            j++;
                        }
                    } else if (this.current[i] === '(')   //遇到'('则直接入栈
                    {
                        stack.push(this.current[i]);
                        i++;
                        //alert("(入栈")
                    } else if (this.current[i] === ')')   //遇到')'则弹出栈直到遇到'('，'('也弹出但不添加到后缀表达式中
                    {
                        while (stack[stack.length - 1] !== '(') {
                            end[j] = stack.pop();
                            //alert(end[j]+"出栈进后缀表达式")
                            j++;
                            end[j] = ' ';
                            j++;
                        }
                        stack.pop();   //弹出'('
                        //alert("(出栈")
                        i++;
                    } else if (this.current[i] === '+' || this.current[i] === '-') {      //遇到加减时
                        if (stack[stack.length - 1] === '*' || stack[stack.length - 1] === '/' || stack[stack.length - 1] === '+'
                            || stack[stack.length - 1] === '-')      //若栈顶元素为*，/，+，-，则栈顶元素出栈，新元素进栈
                        {
                            end[j] = stack.pop();
                            //alert(end[j]+"出栈进后缀表达式")
                            j++;
                            end[j] = ' ';
                            j++;
                            stack.push(this.current[i]);
                            //alert(this.current[i]+"进栈")
                            i++;
                        } else if (stack.length === 0 || stack[stack.length - 1] === '(')   //若栈为空，则入栈
                        {
                            stack.push(this.current[i]);
                            //alert(this.current[i]+"进栈")
                            i++;
                        }
                    } else if (this.current[i] === '*' || this.current[i] === '/')   //遇到乘除时
                    {
                        if (stack[stack.length - 1] === '+' || stack[stack.length - 1] === '-')  //若栈顶为+，-，则新元素进栈
                        {
                            stack.push(this.current[i]);
                            i++;
                        } else if (stack[stack.length - 1] === '*' || stack[stack.length - 1] === '/')   //若栈顶为*，/则栈顶元素出栈到后缀表达式，新元素进栈
                        {
                            end[j] = stack.pop();
                            j++;
                            end[j] = ' ';
                            j++;
                            stack.push(this.current[i]);
                            i++;
                        } else if (stack[stack.length - 1] === '(' || stack.length === 0)  //若栈顶为（或为空栈，则入栈
                        {
                            stack.push(this.current[i]);
                            i++;
                        }
                    }
                }
                while (stack.length !== 0) //弹出栈里所有操作符
                {
                    end[j] = stack.pop();
                    //alert(end[j]+"出栈进后缀表达式")
                    j++;
                    end[j] = ' ';
                    j++;
                }
                end.pop();

                /*---------计算后缀表达式的值------------*/
                var numstack = [];
                var sum = 0, i = 0;
                var num1,num2;
                while (i <= end.length) {
                    //alert(end[i])
                    if(end[i]>='0' && end[i]<='9'){     //若该元素为数字，
                        sum = sum*10+(parseInt(end[i]));
                        if(end[i+1]===' '){           //若下个元素为空格，则与前面的数字进行运算后入栈，否则存储该数字
                            numstack.push(parseFloat(sum));
                            //alert(numstack[numstack.length-1]+"进栈")
                            i+=2;
                            sum=0;
                        }
                        else
                            i++;
                    }else if(end[i]==='+') {
                        num2=numstack.pop();
                        num1=numstack.pop();
                        numstack.push(num1+num2);
                        //alert(num1+","+num2+"出栈计算，"+numstack[numstack.length-1]+"进栈")
                        i+=2;
                    }else if(end[i]==='-')
                    {
                        num2=numstack.pop();
                        num1=numstack.pop();
                        numstack.push(num1-num2);
                        //alert(num1+","+num2+"出栈计算，"+numstack[numstack.length-1]+"进栈")
                        i+=2;
                    } else if(end[i]==='*') {
                        num2=numstack.pop();
                        num1=numstack.pop();
                        numstack.push(num1*num2);
                        //alert(num1+","+num2+"出栈计算，"+numstack[numstack.length-1]+"进栈")
                        i+=2;
                    }
                    else if(end[i]==='/')
                    {
                        num2=numstack.pop();
                        num1=numstack.pop();
                        numstack.push(num1/num2);
                        //alert(num1+","+num2+"出栈计算，"+numstack[numstack.length-1]+"进栈")
                        i+=2;
                    }
                }

                this.result = numstack.pop();
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

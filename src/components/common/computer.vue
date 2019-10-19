<template>
    <div>
        <h1>在线计算器</h1>
        <el-container style="margin:0 auto">
            <el-card id="container" style="margin: 0 auto">
                <el-row style="margin: 0 auto">
                    <el-card shadow="never" style="width: 85%;margin: 0 auto;">
                        <p style="font-size: 30px" v-show="inputting">{{current}}</p>
                        <p style="font-size: 30px" v-show="!inputting">{{result}}</p>
                    </el-card>
                </el-row>
                <el-row>
                    <el-button :disabled="isEmpty" @click="clear" style="width: 32%" type="primary"><i
                            style="font-size: 12px" class="iconfont icon-guiling"></i></el-button>
                    <el-button :disabled="isEmpty" @click="del" style="width: 30%"
                               type="danger"><i style="font-size: 12px" class="iconfont icon-backspace1"></i>
                    </el-button>
                    <el-button @click="input" plain style="width: 20%;font-weight: 800" type="info">+</el-button>
                </el-row>
                <el-row>
                    <el-button @click="input" style="width: 20%">7</el-button>
                    <el-button @click="input" style="width: 20%">8</el-button>
                    <el-button @click="input" style="width: 20%">9</el-button>
                    <el-button @click="input" plain style="width: 20%;font-weight: 800" type="info">-</el-button>
                </el-row>
                <el-row>
                    <el-button @click="input" style="width: 20%">4</el-button>
                    <el-button @click="input" style="width: 20%">5</el-button>
                    <el-button @click="input" style="width: 20%">6</el-button>
                    <el-button @click="input" plain style="width: 20%;font-weight: 800" type="info">×</el-button>
                </el-row>
                <el-row>
                    <el-button @click="input" style="width: 20%">1</el-button>
                    <el-button @click="input" style="width: 20%">2</el-button>
                    <el-button @click="input" style="width: 20%">3</el-button>
                    <el-button @click="input" plain style="width: 20%;font-weight: bold" type="info">÷</el-button>
                </el-row>
                <el-row>
                    <el-button @click="input" style="width: 43%">0</el-button>
                    <el-button @click="input" plain style="width: 20%" type="info">(</el-button>
                    <el-button @click="input" plain style="width: 20%" type="info">)</el-button>

                </el-row>
                <el-row>
                    <el-button @click="input" style="width: 26%;font-weight: 900">.</el-button>
                    <el-button @click="computeResult" style="width: 60%" type="success"><i style="font-size: 12px"
                                                                                           class="iconfont icon-dengyu"></i>
                    </el-button>
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
                if (inputChar === '+' || inputChar === '-' || inputChar === '×' || inputChar === '÷' || inputChar === ')') {
                    if (!this.beforeIsNum()) {
                        return;
                    } else {
                        this.current += inputChar;
                        return;
                    }
                }
                if (inputChar === '(') {
                    let end = this.current[this.current.length - 1];
                    if (this.current === '0') {
                        this.current = inputChar + this.current;
                    }
                    if (end === '+' || end === '-' || end === '×' || end === '÷') {
                        this.current += inputChar;
                        return;
                    } else {
                        return;
                    }
                }
                if (this.current === '0') {
                    this.current = inputChar;
                } else if (this.current === '(0') {
                    this.current = '(' + inputChar;
                } else {
                    this.current += inputChar;
                }


            },
            computeResult() {
                /*-----------判断是否符合语法-----------*/
                let i = 0, leftnum = 0;
                for (i; i <= this.current.length; i++) {
                    if (this.current[i] === '(')
                        leftnum++;
                    else if (this.current[i] === ')') {
                        leftnum--;
                        if (this.current[i - 1] === '(')     //()内无数字
                        {
                            this.result = 'ERROR';
                            return;
                        }

                    }
                    if (leftnum < 0)       //左右括号数不同
                    {
                        this.result = 'ERROR';
                        return;
                    }
                }
                if (leftnum !== 0) {
                    this.result = 'ERROR';
                    return;
                }

                /*-----------中缀表达式转后缀表达式---------*/
                let end = [];
                i = 0;
                let j = 0;
                let stack = [];
                while (i < this.current.length) {
                    if (this.current[i] <= '9' && this.current[i] >= '0') {
                        end[j] = this.current[i];
                        //alert(end[j]+"进后缀表达式")
                        i++;
                        j++;
                        if ((this.current[i] > '9' || this.current[i] < '0' || i === this.current.length)
                            && this.current[i] !== '.')   //若数字后一位为操作符（不为.）或为最后一个一个字符
                        {
                            end[j] = ' ';
                            j++;
                        }
                    } else if (this.current[i] === '.') {           //遇到'.'考察前后位是否有数字，有则添加到后缀表达式没有则报错
                        if ((end[j - 1] <= '9' && end[j - 1] >= '0') && (this.current[i + 1] >= '0' && this.current[i + 1] <= '9')) {
                            end[j] = this.current[i];
                            j++;
                            i++;
                        } else {
                            this.result = 'ERROR';
                            return;
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
                        if (stack[stack.length - 1] === '×' || stack[stack.length - 1] === '÷' || stack[stack.length - 1] === '+'
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
                    } else if (this.current[i] === '×' || this.current[i] === '÷')   //遇到乘除时
                    {
                        if (stack[stack.length - 1] === '+' || stack[stack.length - 1] === '-')  //若栈顶为+，-，则新元素进栈
                        {
                            stack.push(this.current[i]);
                            i++;
                        } else if (stack[stack.length - 1] === '×' || stack[stack.length - 1] === '÷')   //若栈顶为*，/则栈顶元素出栈到后缀表达式，新元素进栈
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
                //alert(end)

                /*---------计算后缀表达式的值------------*/
                let numStack = [];
                let sum = 0;
                i = 0;
                let num1 = 0, num2 = 0;
                let flag = true;      //true表示数字在小数点前，false在小数点后
                let afterPoint = 1;
                while (i < end.length) {
                    if (end[i] >= '0' && end[i] <= '9') {     //若该元素为数字，
                        if (flag) {
                            sum = sum * 10 + (parseFloat(end[i]));
                        } else {
                            sum += parseFloat(end[i]) * Math.pow(0.1, afterPoint);
                            afterPoint++;
                        }
                        if (end[i + 1] === ' ' || i + 1 === end.length) {           //若下个元素为空格，则与前面的数字进行运算后入栈，否则存储该数字
                            flag = true;
                            afterPoint = 1;
                            numStack.push(parseFloat(sum));
                            //alert(numstack[numstack.length-1]+"进栈")
                            i += 2;
                            sum = 0;
                        } else
                            i++;
                    } else if (end[i] === '.') {
                        i++;
                        flag = false;
                    } else if (end[i] === '+') {
                        num2 = numStack.pop();
                        num1 = numStack.pop();
                        numStack.push(num1 + num2);
                        //alert(num1+","+num2+"出栈计算，"+numstack[numstack.length-1]+"进栈")
                        i += 2;
                    } else if (end[i] === '-') {
                        num2 = numStack.pop();
                        num1 = numStack.pop();
                        numStack.push(num1 - num2);
                        //alert(num1+","+num2+"出栈计算，"+numstack[numstack.length-1]+"进栈")
                        i += 2;
                    } else if (end[i] === '×') {
                        num2 = numStack.pop();
                        num1 = numStack.pop();
                        numStack.push(num1 * num2);
                        //alert(num1+","+num2+"出栈计算，"+numstack[numstack.length-1]+"进栈")
                        i += 2;
                    } else if (end[i] === '÷') {
                        num2 = numStack.pop();
                        num1 = numStack.pop();
                        numStack.push(num1 / num2);
                        //alert(num1+","+num2+"出栈计算，"+numstack[numstack.length-1]+"进栈")
                        i += 2;
                    }
                }
                this.result = numStack.pop().toFixed(2);
                this.result = this.current + ' = ' + this.result;
                this.inputting = false;
            },
            clear() {
                this.result = '';
                this.current = '0';
                this.inputting = true;
            },
            del() {
                this.inputting = true;
                this.current = String(this.current).slice(0, -1);
                if (String(this.current).length === 0) {
                    this.current = '0';
                }
            },
            beforeIsNum() {
                let reg = /[0-9]/;
                if (String(this.current).slice(-1) === ')') {
                    return true;
                }
                console.log(String(this.current).slice(-1));
                return reg.test(String(this.current).slice(-1));
            },
            isNumber() {
                let reg = /^[0-9][0-9]*$/;
                return reg.test(String(this.current).split(/[()×÷+-]/).slice(-1)[0]);
            }
        },
        watch: {
            current: {
                handler: function(newVal, oldVal) {
                    this.isEmpty = newVal === '0';
                    if (this.current.length > 30) {
                        this.current = oldVal;
                    }
                }
            }
        },
        created() {
            const _this = this;
            document.onkeydown = function(event) {
                let key = event.keyCode;
                _this.inputting = true;
                //console.log(key);
                if (key === 13 || key === 187) {
                    _this.computeResult();
                    return;
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

    #container {
        width: 36%
    }

    @media screen and (max-width: 1000px) {
        #container {
            width: 100%
        }
    }

</style>

import Computer from '../../src/components/common/computer.vue';
import Vue from 'vue';
import Element from 'element-ui';

Vue.use(Element, { size: 'small' });

describe('computer', () => {
    const computer = new Vue(Computer).$mount();
    it('输入归零', () => {
        // 获取mount中的组件实例
        expect(computer.current).toBe('0');
        computer.current = '5+5';
        expect(computer.current).toBe('5+5');
        computer.clear();
        expect(computer.current).toBe('0');
    });
    it('输入小数点测试', () => {
        let inputPara = {
            target: {
                innerText: '.'
            }
        };
        expect(computer.current).toBe('0');
        computer.input(inputPara);
        expect(computer.current).toBe('0.');
        computer.current = '5+';
        computer.input(inputPara);
        expect(computer.current).toBe('5+');
    });
    it('计算函数测试', () => {
        computer.current = '5+6';
        computer.computeResult();
        expect(computer.result).toBe('5+6 = 11.00');
        computer.current = '5×6+2';
        computer.computeResult();
        expect(computer.result).toBe('5×6+2 = 32.00');
    });
});

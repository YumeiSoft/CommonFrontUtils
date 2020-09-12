import React, { Component } from 'react';
import ObjsService from './ObjsService';
/** 输入参数 */
let input = [
  {
    id: '823585b8-062d-4e15-b17c-2d8932d4a1a4',
    name: '张三',
    age: '25',
    balance: 1000,
    gender: '男',
    dept: '采购部',
    post: '部门经理',
    superior: '1bc06853-b0fd-4cbc-9d53-16c054b8ca9b',
  },
  {
    id: '39d2fd99-00f5-4996-9a3f-165148ab7972',
    name: '李四',
    age: 17,
    balance: 400,
    gender: '男',
    dept: '技术部',
    post: '管理培训生',
    deptId: '2',
    superior: '37f15bff-e0ee-4b44-9291-5c9fa0bcf954',
  },
  {
    id: '37f15bff-e0ee-4b44-9291-5c9fa0bcf954',
    name: '王五',
    age: 30,
    balance: 500,
    gender: '男',
    dept: '技术部',
    post: '部门经理',
    superior: '1bc06853-b0fd-4cbc-9d53-16c054b8ca9b',
  },
  {
    id: '0f0479cc-59fe-4c56-9685-75c4067300b6',
    name: '小红',
    age: 16,
    balance: 200,
    gender: '女',
    dept: '采购部',
    post: '管理培训生',
    superior: '823585b8-062d-4e15-b17c-2d8932d4a1a4',
  },
  {
    id: 'f01430fd-5df3-402a-92ef-aca63d882e2b',
    name: '小明',
    age: 24,
    balance: 700,
    gender: '男',
    dept: '技术部',
    post: '管理培训生',
    superior: '37f15bff-e0ee-4b44-9291-5c9fa0bcf954',
  },
];
export default class extends Component {
  constructor() {
    super();
    this.state = {
      inputText: JSON.stringify(input, null, 2),
    };
    this.demos = new ObjsService().getDemos();
  }

  run(testUnit, input) {
    this.setState({
      execFunc: String(this.demos[testUnit]).replace(new RegExp('Obj(.)+?\\)'), 'Objs'),
    });
    return this.demos[testUnit](input);
  }

  execute(testUnit) {
    let outputText;
    try {
      let input = JSON.parse(this.state.inputText);
      let output = this.run(testUnit, input);
      outputText = JSON.stringify(output, null, 2);
    } catch (e) {
      console.error(e);
      outputText = '执行出错：\n' + e.message;
    }
    this.setState({
      outputText,
    });
  }

  render() {
    let { inputText, outputText } = { ...this.state };
    return (
      <>
        <div>
          <div>输入：</div>
          <textarea
            style={{ width: '500px', height: '200px' }}
            onChange={(event) => {
              this.setState({
                inputText: event.target.value,
              });
            }}
            value={inputText}
          />
          <div style={{ width: '800px' }}>
            {Object.keys(this.demos).map((item, key) => {
              return (
                <button key={key} onClick={this.execute.bind(this, item)}>
                  {item}
                </button>
              );
            })}
          </div>
          {this.state.execFunc && (
            <>
              <div>示例代码：</div>
              <div>
                <pre>{this.state.execFunc}</pre>
              </div>
            </>
          )}

          {outputText && (
            <>
              <div>输出：</div>
              <textarea style={{ width: '500px', height: '200px' }} value={outputText} onChange={() => {}} />
            </>
          )}
        </div>
      </>
    );
  }
}

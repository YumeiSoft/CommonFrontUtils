/**
 * Copyright (c) 2020 YumeiSoft
 * CommonFrontUtils is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 * http://license.coscl.org.cn/MulanPSL2
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */

/**
 * Obj 对象操作工具
 * @author 黑龙江省瑜美科技发展有限公司 杨若瑜
 * @since 2020年09月12日
 */
class Obj {
  constructor(input) {
    this.input = input;
  }
  /** 转成JSON字符串 */
  toJson(){
      return JSON.stringify(this.input);
  }
  /** 通过序列化和反序列化深拷贝对象 */
  deepClone(){
      return JSON.parse(this.toJson(this.input));
  }
  /** 获取当前对象所有键 */
  keys() {
    if (!this.input) return [];
    return Object.keys(this.input);
  }
  /** 判断是否为字符串 */
  isStr() {
    return typeof this.input === 'string';
  }
  /** 判断是否为空 */
  isNull() {
    if (this.input === null) return true;
  }
  /** 判断是否为数字 */
  isNum() {
    return typeof this.input === 'number';
  }
  /** 判断是否与目标对象的值相等 */
  eq(target) {
    if (this.input === target) return true;
    if(this.isNum()||new Obj(target).isNum()){
        if(Number(this.input)===Number(target)){
            return true;
        }
    }
    if(this.isStr()||new Obj(target).isStr()){
        if(String(this.input)===String(target)){
            return true;
        }
    }
    return false;
  }
}
export default (input) => {
  return new Obj(input);
};

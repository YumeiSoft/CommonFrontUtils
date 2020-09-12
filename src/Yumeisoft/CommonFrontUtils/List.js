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
 * List 数组操作工具
 * @author 黑龙江省瑜美科技发展有限公司 杨若瑜
 * @since 2020年09月12日
 */
class List {
  constructor(input) {
    this.input = input;
  }
  /** 取纯数字部分 */
  nums() {
    let result = [];
    for (let i in this.input) {
      let item = this.input[i];
      if (!isNaN(item) && item !== Infinity) {
        result.push(Number(item));
      }
    }
    return result;
  }
  /** 计算平均值 */
  avg(num) {
    let nums = this.nums();
    let sum = this.sum();
    if (num) {
      return sum / num;
    } else {
      return sum / nums.length;
    }
  }
  /** 求最大值 */
  max() {
    return Math.max(...this.nums());
  }
  /** 求最小值 */
  min() {
    return Math.min(...this.nums());
  }
  /** 求和 */
  sum() {
    let sum = 0;
    let nums = this.nums();
    for (let i in nums) {
      sum += nums[i];
    }
    return sum;
  }
  /** 获得数量 */
  count(){
      return this.input.length;
  }
}
export default (input) => {
  return new List(input);
};

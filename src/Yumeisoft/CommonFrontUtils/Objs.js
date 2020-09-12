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
import Obj from './Obj';
import List from './List';
/**
 * Objs 对象数组操作工具
 * @author 黑龙江省瑜美科技发展有限公司 杨若瑜
 * @since 2020年09月12日
 */
class Objs {
  constructor(input) {
    this.input = input;
    this.funcList = [];
    this.deepCloned = false;
  }
  /** 增加判断条件 */
  filter(func) {
    this.funcList.push(func);
    return this;
  }
  /** 列出所有符合判断条件的数据 */
  list() {
    let result = [];
    let funcList = this.funcList;
    outer: for (let i in this.input) {
      let obj = this.input[i];
      for (let j in funcList) {
        if (!funcList[j](obj)) {
          continue outer;
        }
      }
      result.push(obj);
    }
    return result;
  }
  /** 遍历回调 */
  each(func) {
    let list = this.list();
    let result = [];
    for (let idx in list) {
      let item = list[idx];
      let handleResult = func(item, idx);
      if (handleResult || handleResult == null) {
        result.push(handleResult);
      } else {
        result.push(item);
      }
    }
    return result;
  }
  /** 只取出一个符合条件的数据 */
  one(column, value) {
    if (column && value) {
      this.filter((o) => Obj(o[column]).eq(value));
    }
    let listResult = this.list();
    if (Obj(listResult.length).eq(1)) {
      return listResult[0];
    } else if (Obj(listResult.length).eq(0)) {
      throw new Error('DataNotFound');
    } else if (listResult.length > 1) {
      throw new Error('DataNotSingle');
    }
  }
  /** 建立映射关系表 */
  keyColumn(keyColumn, valueColumn) {
    let listResult = this.list();
    let result = {};
    for (let i in listResult) {
      let key = listResult[i][keyColumn];
      let value = listResult[i][valueColumn];
      result[key] = value;
    }
    return result;
  }
  /** 建立主键-对象映射关系表 */
  keyObj(keyColumn) {
    let listResult = this.list();
    let result = {};
    for (let i in listResult) {
      let key = listResult[i][keyColumn];
      result[key] = listResult[i];
    }
    return result;
  }
  /** 抽取某个字段 */
  colList(colName) {
    let result = [];
    this.each((item) => {
      result.push(item[colName]);
    });
    return result;
  }
  /** 抽取多个字段 */
  colLists(colNames) {
    if (!colNames) {
      colNames = this.colNames();
    }
    colNames = new Objs(colNames);
    let result = {};
    this.each((item) => {
      colNames.each((colName) => {
        if (!result[colName]) {
          result[colName] = [];
        }
        result[colName].push(item[colName]);
      });
    });
    return result;
  }
  /** 取平均值 */
  colAvg(columnName) {
    let fieldResult = this.colList(columnName);
    return List(fieldResult).avg();
  }
  /** 取最大值 */
  colMax(columnName) {
    let fieldResult = this.colList(columnName);
    return List(fieldResult).max();
  }
  /** 取最小值 */
  colMin(columnName) {
    let fieldResult = this.colList(columnName);
    return List(fieldResult).min();
  }
  /** 计数 */
  count() {
    let listResult = this.list();
    return listResult.length;
  }
  /** 求和 */
  colSum(columnName) {
    let fieldResult = this.colList(columnName);
    return List(fieldResult).sum();
  }
  /** 取出所有键名 */
  colNames() {
    let result = [];
    let listResult = this.list();
    for (let i in listResult) {
      let keys = Obj(listResult[i]).keys();
      for (let keyIdx in keys) {
        let key = keys[keyIdx];
        if (!result.includes(key)) {
          result.push(key);
        }
      }
    }
    return result;
  }
  /** 取出公共键名 */
  sharedColNames() {
    let result = [];
    let listResult = this.list();
    for (let i in listResult) {
      let keys = Obj(listResult[i]).keys();
      if (Obj(i).eq(0)) {
        result = keys;
        continue;
      }
      for (let resultIdx in result) {
        let key = result[resultIdx];
        if (!keys.includes(key)) {
          result.splice(resultIdx, 1);
        }
      }
    }
    return result;
  }
  /** 转换成二维数组 */
  toLists(colNames) {
    if (!colNames) {
      colNames = this.colNames();
    }
    colNames = new Objs(colNames);
    let result = this.each((item) => {
      let colVals = [];
      colNames.each((colName) => {
        colVals.push(item[colName]);
      });
      return colVals;
    });
    return result;
  }
  /** 分组 */
  group(func) {
    let getGroupKey = func;
    // 单字段分组
    if (Obj(typeof func).eq('string')) {
      let colName = func;
      getGroupKey = (item) => {
        return item[colName];
      };
    }
    // 多字段分组
    if (Array.isArray(func)) {
      let colNames = new Objs(func);
      getGroupKey = (item) => {
        let keyObj = colNames.each((colName) => {
          return item[colName];
        });
        return JSON.stringify(keyObj);
      };
    }
    let result = {};
    this.each((item) => {
      let groupKey = getGroupKey(item);
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
    });
    return result;
  }
  /** 聚合分组 */
  aggGroup(func, colName, oper) {
    let groupData = this.group(func);
    let aggFunc = oper;
    // 预设聚合方式
    if (Obj(typeof oper).eq('string')) {
      aggFunc = (list) => {
        return List(list)[oper]();
      };
    }
    for (let key in groupData) {
      let groupList = groupData[key];
      let colList = new Objs(groupList).colList(colName);
      let aggResult = aggFunc(colList);
      groupData[key] = aggResult;
    }
    return groupData;
  }
  /** 深拷贝 */
  deepClone() {
    this.input = Obj(this.input).deepClone();
    this.deepCloned = true;
    return this;
  }
  /** 转树形结构 */
  toTrees(id, pid, branchName) {
    let list = new Objs(this.list());
    let result = [];
    let idMap = list.keyObj(id);
    let pidMap = list.group(pid);
    for (let key in pidMap) {
      let branchObjs = pidMap[key];
      if (branchObjs) {
        if (idMap[key]) {
          idMap[key][branchName] = branchObjs;
        } else {
          new Objs(branchObjs).each((item) => result.push(item));
        }
      }
    }
    return result;
  }
  /** 升序排列 */
  sortBy(columnName) {
    let sortColumn = columnName;
    let nextSortColumns = [];
    // 如果是多字段
    if (Array.isArray(sortColumn)) {
      if (sortColumn.length === 0) {
        return this.list();
      }
      sortColumn = columnName[0];
      nextSortColumns = columnName.splice(1);
    }
    let listResult = this.list();
    let listMap = {};
    let orderedMap = {};
    let result = [];
    for (let i in listResult) {
      let sortVal = listResult[i][sortColumn];
      if (!listMap[sortVal]) {
        listMap[sortVal] = [];
      }
      listMap[sortVal].push(listResult[i]);
    }
    Object.keys(listMap)
      .sort()
      .forEach((key) => {
        orderedMap[key] = listMap[key];
      });
    for (let key in orderedMap) {
      let objs = orderedMap[key];
      objs = new Objs(objs).sortBy(nextSortColumns);
      result.push(...objs);
    }
    return result;
  }
  /** 倒序排列 */
  sortDescBy(columnName) {
    return this.sortBy(columnName).reverse();
  }
}

export default (input) => {
  return new Objs(input);
};

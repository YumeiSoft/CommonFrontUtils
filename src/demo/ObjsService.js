import Objs from '../Yumeisoft/CommonFrontUtils/Objs';

/**
 * Objs对象数组操作工具演示
 * @author 黑龙江省瑜美科技发展有限公司 杨若瑜
 * @since 2020年09月12日
 */
export default class Demo {
  getDemos() {
    return {
      自定义过滤: (input) => {
        return Objs(input)
          .filter((item) => item.age > 18)
          .list();
      },
      依据主键获取对象Object: (input) => {
        return Objs(input).one('id', '0f0479cc-59fe-4c56-9685-75c4067300b6');
      },
      抽取指定字段映射表Map: (input) => {
        return Objs(input).keyColumn('id', 'name');
      },
      '获取映射表Key-Object': (input) => {
        return Objs(input).keyObj('id');
      },
      维度抽取: (input) => {
        return Objs(input).colList('name');
      },
      取age的平均值: (input) => {
        return Objs(input).colAvg('age');
      },
      取age的最大值: (input) => {
        return Objs(input).colMax('age');
      },
      取age的最小值: (input) => {
        return Objs(input).colMin('age');
      },
      取balance的和: (input) => {
        return Objs(input).colSum('balance');
      },
      取出字段名的List: (input) => {
        return Objs(input).colNames();
      },
      取出公共字段名的List: (input) => {
        return Objs(input).sharedColNames();
      },
      自定义遍历获取List: (input) => {
        return Objs(input).each((item) => (item.status = 0));
      },
      高级自定义遍历获取List: (input) => {
        return Objs(input).each((item, index) => {
          item.status = 0;
          if (item.age > 18) item.status = 1;
          item.emptno = '2020' + (Array(2).join(0) + (Number(index) + 1)).slice(-2);
          return item;
        });
      },
      转换为二维数组Lists: (input) => {
        return Objs(input).toLists();
      },
      按指定字段转换为二维数组获取Lists: (input) => {
        return Objs(input).toLists(['name', 'age']);
      },
      '抽取所有字段组成Key-List': (input) => {
        return Objs(input).colLists();
      },
      '抽取指定字段组成Key-List': (input) => {
        return Objs(input).colLists(['name', 'gender']);
      },
      '单字段分组获取Key-Objects': (input) => {
        return Objs(input).group('dept');
      },
      '多字段分组获取Key-Objects': (input) => {
        return Objs(input).group(['dept', 'gender']);
      },
      '自定义分组获取Key-Objects': (input) => {
        return Objs(input).group((item) => {
          if (item.age >= 30) {
            return '30岁及以上';
          } else {
            return '30岁以下';
          }
        });
      },
      浅拷贝操作: (input) => {
        console.warn('操作前原对象');
        console.log(JSON.stringify(input, null, 2));

        let result = Objs(input).each((item) => (item.name = '请在控制台查看输出'));

        console.warn('操作后原对象');
        console.log(JSON.stringify(input, null, 2));
        return result;
      },
      深拷贝操作: (input) => {
        console.warn('操作前原对象');
        console.log(JSON.stringify(input, null, 2));

        let result = Objs(input)
          .deepClone()
          .each((item) => (item.name = '请在控制台查看输出'));

        console.warn('操作后原对象');
        console.log(JSON.stringify(input, null, 2));
        return result;
      },
      转树形结构获取Trees: (input) => {
        return Objs(input).toTrees('id', 'superior', 'subordinates');
      },
      '聚合分组-计数': (input) => {
        return Objs(input).aggGroup('dept', 'id', 'count');
      },
      '聚合分组-平均': (input) => {
        return Objs(input).aggGroup('gender', 'balance', 'avg');
      },
      '聚合分组-自定义': (input) => {
        return Objs(input).aggGroup(
          (item) => {
            if (item.age >= 30) {
              return '30岁及以上男性比例';
            } else {
              return '30岁以下男性比例';
            }
          },
          'gender',
          (aggList) => {
            let maleCount = 0;
            for (let i in aggList) {
              if (aggList[i] === '男') maleCount++;
            }

            return (maleCount / aggList.length) * 100 + '%';
          }
        );
      },
      单字段升序排列: (input) => {
        return Objs(input).sortBy('age');
      },
      多字段升序排列: (input) => {
        return Objs(input).sortBy(['dept','age']);
      },
      单字段降序排列: (input) => {
        return Objs(input).sortDescBy('age');
      },
      多字段降序排列: (input) => {
        return Objs(input).sortDescBy(['dept','age']);
      },
    };
  }
}

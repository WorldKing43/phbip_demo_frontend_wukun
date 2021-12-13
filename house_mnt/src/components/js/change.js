/* 对比变更数据 传出改变后的参数集合 */
export function Differ(orginalData, newData, config) {
  this.orginalData = orginalData;
  this.newData = newData;
  this.config = config || {};

  this.differ = function () {
    return _checkObject('', this.orginalData, this.newData, this.config);
  };

  function typev(obj) {
    return Object.prototype.toString.call(obj).split(/^\[object ([a-zA-Z]*)\]$/)[1].toLowerCase();
  }

  function isSimpleValue(obj) {
    var t = typev(obj);
    return t != 'object' && t != 'array';
  }

  // 判断数据是否相等
  function eq(v1, v2) {
    if (v1 == v2) return true;

    var type1 = typev(v1);
    type1 = type1 == 'null' ? 'undefined' : type1;
    var type2 = typev(v2);
    type2 = type2 == 'null' ? 'undefined' : type2;
    if ((type1 == 'undefined' && type2 == 'undefined') ||
      (type1 == 'undefined' && type2 == 'string' && v2 == '') ||
      (type2 == 'undefined' && type1 == 'string' && v1 == '')) {
      return true;
    } else if (type1 == 'undefined' || type2 == 'undefined') {
      return false;
    } else if (v1 == v2) {
      return true;
    } else if (type1 == 'date' && type2 == 'date') {
      return v1.getFullYear() && v2.getFullYear() && v1.getMonth() == v2.getMonth() &&
        v1.getDate() == v2.getDate() && v1.getHours() == v2.getHours() &&
        v1.getMinutes() == v2.getMinutes() && v1.getSeconds() == v2.getSeconds();
    } else if (type1 == type2) {
      return v1 == v2;
    } else if ((type1 == 'string' && type2 == 'boolean') || (type1 == 'boolean' && type2 == 'string')) {
      return String(v1) == String(v2);
    } else if ((isFinite(v1) && type2 == 'date') || (isFinite(v2) && type1 == 'date')) {
      var v1 = type1 == 'date' ? v1 : new Date(type1 == 'string' ? parseFloat(v1) : v1);
      var v2 = type2 == 'date' ? v2 : new Date(type2 == 'string' ? parseFloat(v2) : v2);
      return v1.getFullYear() && v2.getFullYear() && v1.getMonth() == v2.getMonth() &&
        v1.getDate() == v2.getDate() && v1.getHours() == v2.getHours() &&
        v1.getMinutes() == v2.getMinutes() && v1.getSeconds() == v2.getSeconds();
    } else if ((isFinite(v1) && isFinite(v2))) {
      var v1 = type1 == 'string' ? parseFloat(v1) : v1;
      var v2 = type2 == 'string' ? parseFloat(v2) : v2;
      return v1 == v2;
    } else {
      return v1 == v2;
    }
  }

  // 字段取值
  function getValue(obj, field) {
    if (!obj || !field)
      return '';
    var arr = field.split('.');
    for (var i = 0; i < arr.length; i++) {
      obj = obj[arr[i]];
      if (typeof obj !== 'object' && i < arr.length - 1) {
        obj = null;
        break;
      }
    }
    if (obj == undefined || obj == null)
      obj = '';
    return obj;
  }

  // el替换
  function elreplace(str, param) {
    if (!str) return '';
    param = param || {};
    var regex = /(\$\{([^\}]*)\})/g;
    var arr;
    var startIndex = 0;
    var newText = '';
    while ((arr = regex.exec(str)) !== null) {
      newText += str.substring(startIndex, arr.index);
      newText += arr[2] ? getValue(param, arr[2]) || '' : '';
      startIndex = regex.lastIndex;
    }
    if (startIndex < str.length) {
      newText += str.substring(startIndex, str.length);
    }
    return newText;
  }

  function mergeArray(mainArray, mergeArray) {
    if (mergeArray) {
      for (var i = 0; i < mergeArray.length; i++) {
        mainArray.push(mergeArray[i]);
      }
    }
    return mainArray;
  }

  function setObjectInfo(array, objectName, objectDesc) {
    if (array) {
      for (var i = 0; i < array.length; i++) {
        array[i].name = objectName;
        array[i].desc = objectDesc;
      }
    }
    return array;
  }

  // 获取主键设置
  function findKeyCfg(path, cfg) {
    cfg = cfg || {};
    if (!path) return cfg.__keys;
    return getValue(cfg, path);
  }

  /**
   * 获取对象名称
   * @param {String} path 属性路径 
   * @param {*} item 数据项
   * @param {Object} cfg 主体配置 
   */
  function getObjectName(path, item, cfg) {
    var name = '';
    if (!path) {
      name = elreplace(cfg.__name, item);
    } else {
      var pc = getValue(cfg, path);
      name = elreplace(pc.__name, item);
    }
    return name;
  }

  /**
   * 获取对象描述
   * @param {String} path  属性路径 
   * @param {*} item  数据项
   * @param {Object} cfg 主体配置 
   */
  function getObjectDesc(path, item, cfg) {
    var desc = '';
    if (!path) {
      desc = elreplace(cfg.__desc || '', item);
    } else {
      var pc = getValue(cfg, path) || {};
      desc = elreplace(pc.__desc || '', item);
    }
    return desc;
  }

  /**
   * 
   * @param {String} path 
   * @param {*} before 
   * @param {*} after 
   * @param {Boolean} del 
   * @param {Boolean} add 
   */
  function buildChangeInfo(path, before, after, del, add) {
    // if (typev(before) != 'number' && typev(before) != 'boolean' && (before == null)) before = '';
    // if (typev(after) != 'number' && typev(before) != 'boolean' && (after == null)) after = '';
    var obj = {
      path: path,
      changeBefore: before,
      changeAfter: after
    };
    if (del) obj.del = true;
    if (add) obj.add = true;
    return obj;
  }

  function buildKeyInfo(item, keyCfg) {
    var keys = [];
    if (typev(keyCfg) == 'array' && keyCfg.length > 0) {
      for (var i = 0; i < keyCfg.length; i++) {
        keys.push({
          idf: keyCfg[i],
          idv: item[keyCfg[i]]
        });
      }
    }
    if (keys.length == 0) {
      if (item["guid"]) {
        keys.push({
          idf: "guid",
          idv: item["guid"]
        });
      } else if (item["guid"]) {
        keys.push({
          idf: "guid",
          idv: item["guid"]
        });
      }
    }
    return keys;
  }

  // 在数组中查找一项内容
  function findInArray(array, keys) {
    // 数组为空，则未找到内容
    if (typev(array) != 'array') return;
    // 查询条件为空，则未找到内容
    if (typev(keys) != 'array' || keys.length == 0) return;

    for (var i = 0; i < array.length; i++) {
      var item = array[i];
      var match = true;
      for (var j = 0; j < keys.length; j++) {
        var key = keys[j];
        if (!eq(item[key.idf], key.idv)) {
          match = false;
          break;
        }
      }
      if (match) {
        return item;
      }
    }
  };

  function _checkArray(path, odata, ndata, keyCfg, cfg) {
    // 数据不存在
    if (!odata && !ndata) return;
    // 不是对象实体
    if (typev(odata) != 'array' && typev(ndata) != 'array') return;

    var rst = [];

    // odata中的记录在ndata中是否存在
    if (odata) {
      for (var i = 0; i < odata.length; i++) {
        var oitem = odata[i];
        var keys = buildKeyInfo(oitem, keyCfg);
        // 根据主键查找对应的项
        var nitem = findInArray(ndata, keys);
        if (nitem) {
          var a = _checkObject(path, oitem, nitem, cfg);
          mergeArray(rst, a);
        } else {
          var objectName = getObjectName(path, oitem, cfg);
          var objectDesc = getObjectDesc(path, oitem, cfg);
          var ci = buildChangeInfo(path, '', '', true, false);
          setObjectInfo([ci], objectName, objectDesc);
          rst.push(ci);
        }
      }
    }

    // ndata中的记录在odata中是否存在
    if (ndata) {
      for (var i = 0; i < ndata.length; i++) {
        var nitem = ndata[i];
        var keys = buildKeyInfo(nitem, keyCfg);
        // 根据主键查找对应的项
        var oitem = findInArray(odata, keys);
        if (!oitem) {
          var objectName = getObjectName(path, nitem, cfg);
          var objectDesc = getObjectDesc(path, nitem, cfg);
          var ci = buildChangeInfo(path, '', '', false, true);
          setObjectInfo([ci], objectName, objectDesc);
          rst.push(ci);
        }
      }
    }

    return rst;
  };

  function _checkObject(path, odata, ndata, cfg) {
    if (typev(odata) == 'array' || typev(ndata) == 'array') {
      return _checkArray(path, odata, ndata, findKeyCfg('', cfg), cfg);
    }
    var rst = [];
    if (typev(odata) == 'object' || typev(ndata) == 'object') {
      odata = odata || {};
      ndata = ndata || {};
      var p1 = path ? path + '.' : path;
      var ns = [];
      var objectName = getObjectName(path, odata, cfg);
      var objectDesc = getObjectDesc(path, odata, cfg);
      for (var n in odata) {
        ns.push(n);
        if (odata[n] || odata[n] === false) {

        } else {
          odata[n] = null
        }
        if (ndata[n] || ndata[n] === false) {} else {
          ndata[n] = null
        }
        var a = _checkObject(p1 + n, odata[n], ndata[n], cfg);
        if (isSimpleValue(odata[n]) || isSimpleValue(ndata[n])) {
          setObjectInfo(a, objectName, objectDesc);
        }
        mergeArray(rst, a);
      }
      for (var n in ndata) {
        if (ns.indexOf(n) == -1) {
          var a = _checkObject(p1 + n, odata[n], ndata[n], cfg);
          if (isSimpleValue(odata[n]) || isSimpleValue(ndata[n])) {
            setObjectInfo(a, objectName, objectDesc);
          }
          mergeArray(rst, a);
        }
      }
    } else {
      if (!eq(odata, ndata)) {
        var ci = buildChangeInfo(path, odata, ndata);
        ci.changeItem = getValue(cfg, path);
        rst.push(ci);
      }
    }
    return rst;
  };
}

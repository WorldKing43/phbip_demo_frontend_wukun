'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API: '"http://192.168.2.121:8070/phbip2"' //正式接口
  //API: '"http://laptop-6droprsi:8081/phbip_house_mnt"'
  //API: '"http://192.168.1.169:8088/phbip_house_mnt"'
  //API: '"http://DESKTOP-V004BV9:7070/phbip_house_mnt/"'//谢佛军接口
  //API: '"http://192.168.1.170:8088/phbip_house_mnt"'//皓哥接口 
  //API: '"http://phbip.test:8480/phbip_house_mnt"' //正式接口
  //API:'"http://192.168.1.169:8088/phbip_house_mnt/"'
  //API: '"http://laptop-9dql8i74:8079/phbip"' //刘欣
  //API: '"http://sc-201909051042:8070/phbip_house_mnt"' //金雅蓓
  //API: '"http://phbip.zjjtest.goc.cn:8480/phbip_house_mnt"' //测试环境
  //API: '"http://172.19.34.136:8070/phbip_house_mnt"' //陈文
})

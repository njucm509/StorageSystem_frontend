<template>
  <div>
    <div id="cpu" style="width:700px;height:400px;"></div>
    <div id="磁盘" style="width:700px;height:400px"></div>
    <div id="内存" style="width:700px;height:400px"></div>
    <div id="WiFi" style="width:700px;height:400px"></div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
      }
    },
    methods: {
      initcpu() {
        let cpu = this.$echarts.init(document.getElementById('cpu'))
        let option = {
          tooltip: {
            formatter: "{a} <br/>{c} {b}"
          },
          toolbox: {
            show: true,
            feature: {
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          title:
            [
              {
            text:'CPU使用情况',
            left:'center'
          }, {
              text:'利用率',
              left:'20%',
              top:'22%'
          }, {
              text:'速度',
              left:'47%',
              top:'17%'
          }, {
              text:'进程',
              left:'74%',
              top:'68%'
          }, {
              text:'线程',
              left:'74%',
              top:'25%'
          },
        ],
          series : [
            {
              name: 'cpu速度',
              type: 'gauge',
              z: 3,
              min: 0,
              max: 10,
              splitNumber: 5,
              radius: '50%',
              axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                  width: 10
                }
              },
              axisTick: {            // 坐标轴小标记
                length: 15,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: 'auto'
                }
              },
              splitLine: {           // 分隔线
                length: 20,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                  color: 'auto'
                }
              },
              axisLabel: {
                backgroundColor: 'auto',
                borderRadius: 2,
                color: '#eee',
                padding: 3,
                textShadowBlur: 2,
                textShadowOffsetX: 1,
                textShadowOffsetY: 1,
                textShadowColor: '#222'
              },
              title: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder',
                fontSize: 20,
                fontStyle: 'italic'
              },
              detail: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                formatter: function (value) {
                  value = (value + '').split('.');
                  value.length < 2 && (value.push('00'));
                  return ('00' + value[0]).slice(-2)
                    + '.' + (value[1] + '00').slice(0, 2);
                },
                fontWeight: 'bolder',
                borderRadius: 3,
                backgroundColor: '#444',
                borderColor: '#aaa',
                shadowBlur: 5,
                shadowColor: '#333',
                shadowOffsetX: 0,
                shadowOffsetY: 3,
                borderWidth: 2,
                textBorderColor: '#000',
                textBorderWidth: 2,
                textShadowBlur: 2,
                textShadowColor: '#fff',
                textShadowOffsetX: 0,
                textShadowOffsetY: 0,
                fontFamily: 'Arial',
                width: 100,
                color: '#eee',
                rich: {}
              },
              data: [{value: 40, name: 'GHz'}]
            },
            {
              name: 'cpu利用率',
              type: 'gauge',
              center: ['25%', '50%'],    // 默认全局居中
              radius: '40%',
              min: 0,
              max: 100,
              endAngle: 45,
              splitNumber: 5,
              axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                  width: 8
                }
              },
              axisTick: {            // 坐标轴小标记
                length: 12,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: 'auto'
                }
              },
              splitLine: {           // 分隔线
                length: 20,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                  color: 'auto'
                }
              },
              pointer: {
                width: 5
              },
              title: {
                offsetCenter: [0, '-30%'],       // x, y，单位px
              },
              detail: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder'
              },
              data: [{value: 1.5, name: '%'}]
            },
            {
              name: '进程',
              type: 'gauge',
              center: ['77%', '50%'],    // 默认全局居中
              radius: '35%',
              min: 0,
              max: 500,
              startAngle: 150,
              endAngle: 30,
              splitNumber: 500,
              axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                  width: 8
                }
              },
              axisTick: {            // 坐标轴小标记
                splitNumber: 5,
                length: 10,        // 属性length控制线长
                lineStyle: {        // 属性lineStyle控制线条样式
                  color: 'auto'
                }
              },
              axisLabel: {
                formatter: function (v){
                  switch (v + '') {
                    case '0' : return 'E';
                    case '250' : return 'progess';
                    case '500' : return 'F';
                  }
                }
              },
              splitLine: {           // 分隔线
                length: 15,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                  color: 'auto'
                }
              },
              pointer: {
                width: 2
              },
              title: {
                show: false
              },
              detail: {
                show: false
              },
              data: [{value: 0.5, name: '个'}]
            },
            {
              name: '线程',
              type: 'gauge',
              center: ['77%', '50%'],    // 默认全局居中
              radius: '35%',
              min: 0,
              max: 5000,
              startAngle: 330,
              endAngle: 210,
              splitNumber: 5000,
              axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                  width: 8
                }
              },
              axisTick: {            // 坐标轴小标记
                show: false
              },
              axisLabel: {
                formatter: function(v){
                  switch (v + '') {
                    case '0' : return 'H';
                    case '2500' : return 'thread';
                    case '5000' : return 'C';
                  }
                }
              },
              splitLine: {           // 分隔线
                length: 15,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                  color: 'auto'
                }
              },
              pointer: {
                width:2
              },
              title: {
                show: false
              },
              detail: {
                show: false
              },
              data: [{value: 0.5, name: '个'}]
            }
          ]
        };

        setInterval(function (){
          option.series[0].data[0].value = (Math.random()*10).toFixed(2) - 0;
          option.series[1].data[0].value = (Math.random()*7).toFixed(2) - 0;
          option.series[2].data[0].value = (Math.random()*500).toFixed(2) - 0;
          option.series[3].data[0].value = (Math.random()*5000).toFixed(2) - 0;
          cpu.setOption(option,true);
        },2000);
      },
      initcp() {
        let 磁盘 = this.$echarts.init(document.getElementById('磁盘'))
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 10,
            data: ['bin', 'home', 'boot', 'dev','opt','etc','已使用', '未使用']
          },
          title:[{
            text:'磁盘使用情况',
            subtext:'单位：GB',
            left:'center'
          },
          ],
          series: [
            {
              name: '磁盘容量',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '30%'],

              label: {
                position: 'inner'
              },
              labelLine: {
                show: false
              },
              data: [
                {value: 117, name: 'bin', selected: true},
                {value: 230, name: 'home'},
                {value: 340, name: 'boot'},
                {value: 360, name: 'dev'},
                {value: 400, name: 'opt'},
                {value: 540, name: 'etc'},
              ]
            },
            {
              name: '使用情况',
              type: 'pie',
              radius: ['40%', '55%'],
              label: {
                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                backgroundColor: '#eee',
                borderColor: '#aaa',
                borderWidth: 1,
                borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                // padding: [0, 7],
                rich: {
                  a: {
                    color: '#999',
                    lineHeight: 22,
                    align: 'center'
                  },
                  // abg: {
                  //     backgroundColor: '#333',
                  //     width: '100%',
                  //     align: 'right',
                  //     height: 22,
                  //     borderRadius: [4, 4, 0, 0]
                  // },
                  hr: {
                    borderColor: '#aaa',
                    width: '100%',
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    color: '#eee',
                    backgroundColor: '#334455',
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              },
              data: [
                {value: 61, name: 'bin已使用'},
                {value: 56, name: 'bin未使用'},
                {value: 30, name: 'home已使用'},
                {value: 200, name: 'home未使用'},
                {value: 140, name: 'boot已使用'},
                {value: 200, name: 'boot未使用'},
                {value: 260, name: 'dev已使用'},
                {value: 100, name: 'dev未使用'},
                {value: 200, name: 'opt已使用'},
                {value: 200, name: 'opt未使用'},
                {value: 140, name: 'etc已使用'},
                {value: 400, name: 'etc未使用'}
              ]
            }
          ]
        };
        磁盘.setOption(option)
      },
      initwf(){
        let WiFi = this.$echarts.init(document.getElementById('WiFi'))
        let option = {
          title: {
            text: 'Wi-Fi',
            subtext: '吞吐量'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['接收', '发送']
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              magicType: {type: ['line', 'bar']},
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['0秒', '10秒', '20秒', '30秒', '40秒', '50秒', '60秒']
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} Kbps'
            }
          },
          series: [
            {
              name: '接收',
              type: 'line',
              data: [11, 20, 15, 13, 12, 13, 10],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            },
            {
              name: '发送',
              type: 'line',
              data: [1, 0.5, 2, 5, 3, 2, 0],
              markPoint: {
                data: [
                  {name: '最低', value: 0, xAxis: 6, yAxis: 0},
                  {name: '最高', value: 5, xAxis: 3, yAxis: 5}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'},
                  [{
                    symbol: 'none',
                    x: '90%',
                    yAxis: 'max'
                  }, {
                    symbol: 'circle',
                    label: {
                      position: 'start',
                      formatter: '最大值'
                    },
                    type: 'max',
                    name: '最高点'
                  }]
                ]
              }
            }
          ]
        };
        WiFi.setOption(option)
      },
      initnc(){
        let 内存 = this.$echarts.init(document.getElementById('内存'))
        let option = {
          tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
          },
          toolbox: {
            feature: {
              restore: {},
              saveAsImage: {}
            }
          },
          title:[
            {
              text:'内存使用情况',
              left:'center',
            }
          ],
          series: [
            {
              name: '内存：共7.9G',
              type: 'gauge',
              detail: {formatter: '{value}%'},
              data: [{value: 50, name: '使用量'}]
            }
          ]
        };

        setInterval(function () {
          option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
          内存.setOption(option, true);
        },2000);
      }
    },
    mounted() {
      this.initcpu()
      this.initcp()
      this.initwf()
      this.initnc()
    }
  }
</script>

<style>
</style>

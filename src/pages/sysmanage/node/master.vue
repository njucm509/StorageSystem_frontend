<template>
	<div id="charts">
		<el-row :gutter="20">
			<el-col :span="12">
				<div v-loading="cpuLoading">
					<Chart :id="cpuId" :option="cpuOption"></Chart>
				</div>
			</el-col>
			<el-col :span="12">
				<div v-loading="memLoading">
					<Chart :id="memoryId" :option="memOption"></Chart>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="12">
				<div id="device"></div>
			</el-col>
			<el-col :span="12">
			</el-col>
		</el-row>
		<div></div>
	</div>
</template>

<script>
	import Chart from '../charts/DynamicCharts.vue'
	import axios from 'axios'
	export default {
		name: 'charts_module',
		components: {
			'Chart': Chart
		},
		data() {
			return {
				cpuId: 'cpu',
				cpuLoading: true,
				memoryId: 'memory',
				memLoading: true,
				device: [],
				memOption: {
					title: {
						text: '内存使用率'
					},
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						data: []
					}],
					yAxis: [{
						type: 'value',
						max: 20,
						axisLabel: {
							formatter: '{value} %'
						}
					}],
					series: [{
						type: 'line',
						data: []
					}]
				},
				cpuOption: {
					title: {
						text: 'CPU使用率'
					},
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						data: []
					}],
					yAxis: [{
						type: 'value',
						max: 10,
						axisLabel: {
							formatter: '{value} %'
						}
					}],
					series: [{
						type: 'line',
						data: []
					}]
				}
			}
		},
		methods: {
			loadData() {
				axios.get('/api/device/namenode').then(res => {
					let deviceInfo = res.data
					let curDate = new Date(deviceInfo.curDate)
					let myHour = curDate.getHours()
					let myMinute = curDate.getMinutes()
					let mySec = curDate.getSeconds()
					console.log(deviceInfo)
					let blockIn = deviceInfo.blockIn.slice(0, -2)
					let blockOut = deviceInfo.blockOut.slice(0, -2)
					let netIn = deviceInfo.netIn
					let netOut = deviceInfo.netOut
					let curCpu = deviceInfo.cpu.slice(0, -1)
					// cpu监控信息
					this.cpuOption.xAxis[0].data.push(myHour + ":" + myMinute + ":" + mySec)
					this.cpuOption.series[0].data.push(curCpu)
					if (this.cpuOption.xAxis[0].data.length == 6) {
						this.cpuOption.xAxis[0].data.shift()
						this.cpuOption.series[0].data.shift()
					}
					if (this.cpuOption.xAxis[0].data.length == 2) {
						this.cpuLoading = false;
					}
					// 内存监控信息
					let curMemory = deviceInfo.curMemory.slice(0, -3)
					let maxMemory = deviceInfo.maxMemory.slice(0, -3) * 1024
					let memory = deviceInfo.memory.slice(0, -1)
					this.memOption.xAxis[0].data.push(myHour + ":" + myMinute + ":" + mySec)
					this.memOption.series[0].data.push(memory)
					if (this.memOption.xAxis[0].data.length == 6) {
						this.memOption.xAxis[0].data.shift()
						this.memOption.series[0].data.shift()
					}
					if (this.memOption.xAxis[0].data.length == 2) {
						this.memLoading = false;
					}
				})
			},
			initMemory() {
				let memory = this.$echarts.init(document.getElementById('memory'))
				let option = {
					title: {
						text: '天气情况统计',
						subtext: '虚构数据',
						left: 'center'
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						// orient: 'vertical',
						// top: 'middle',
						bottom: 10,
						left: 'center',
						data: ['西凉', '益州', '兖州', '荆州', '幽州']
					},
					series: [{
						type: 'pie',
						radius: '65%',
						center: ['50%', '50%'],
						selectedMode: 'single',
						data: [{
								value: 1548,
								name: '幽州',
								label: {
									normal: {
										formatter: [
											'{title|{b}}{abg|}',
											'  {weatherHead|天气}{valueHead|天数}{rateHead|占比}',
											'{hr|}',
											'  {Sunny|}{value|202}{rate|55.3%}',
											'  {Cloudy|}{value|142}{rate|38.9%}',
											'  {Showers|}{value|21}{rate|5.8%}'
										].join('\n'),
										backgroundColor: '#eee',
										borderColor: '#777',
										borderWidth: 1,
										borderRadius: 4,
										rich: {
											title: {
												color: '#eee',
												align: 'center'
											},
											abg: {
												backgroundColor: '#333',
												width: '100%',
												align: 'right',
												height: 25,
												borderRadius: [4, 4, 0, 0]
											},
											Sunny: {
												height: 30,
												align: 'left',
												backgroundColor: {
													// image: weatherIcons.Sunny
												}
											},
											Cloudy: {
												height: 30,
												align: 'left',
												backgroundColor: {
													// image: weatherIcons.Cloudy
												}
											},
											Showers: {
												height: 30,
												align: 'left',
												backgroundColor: {
													// image: weatherIcons.Showers
												}
											},
											weatherHead: {
												color: '#333',
												height: 24,
												align: 'left'
											},
											hr: {
												borderColor: '#777',
												width: '100%',
												borderWidth: 0.5,
												height: 0
											},
											value: {
												width: 20,
												padding: [0, 20, 0, 30],
												align: 'left'
											},
											valueHead: {
												color: '#333',
												width: 20,
												padding: [0, 20, 0, 30],
												align: 'center'
											},
											rate: {
												width: 40,
												align: 'right',
												padding: [0, 10, 0, 0]
											},
											rateHead: {
												color: '#333',
												width: 40,
												align: 'center',
												padding: [0, 10, 0, 0]
											}
										}
									}
								}
							},
							{
								value: 535,
								name: '荆州'
							},
							{
								value: 510,
								name: '兖州'
							},
							{
								value: 634,
								name: '益州'
							},
							{
								value: 735,
								name: '西凉'
							}
						],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				};
				memory.setOption(option)
			}
		},
		mounted() {
			// setInterval(this.loadData, 2000)
			// this.initCpu()
			// this.initMemory()
			var a = "1.111gmb"
			console.log(a.slice(0, -3))
		}
	}
</script>

<style>
	#charts {
		padding-top: 20px;
	}

	#charts #cpu {
		height: 400px;
		/* background-color: #CAC6C6; */
	}

	#charts #memory {
		height: 400px;
	}
</style>

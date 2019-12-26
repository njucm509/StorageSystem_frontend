<template>
	<div :id="this.id"></div>
</template>

<script>
	export default {
		name: 'Chart',
		data() {
			return {
				chart: '',
			};
		},
		props: ['id', 'option'],
		mounted() {
			this.init();
		},
		methods: {
			init() {
				this.chart = this.$echarts.init(document.getElementById(this.id));
				this.chart.setOption(this.option);
			}
		},
		watch: {
			option: {
				handler: function(val, oldval) {
					if (this.chart) {
						if (val) {
							this.chart.setOption(val);
						} else {
							this.chart.setOption(oldval);
						}
					} else {
						this.init();
					}
				},
				deep: true
			}
		}
	}
</script>

<style>
</style>

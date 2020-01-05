<template>
	<div id="base">
		<el-input v-model="content" :disabled="true" /><br />
		<el-select v-model="curEncryption" placeholder="请选择加密方式" :disabled="check">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
			</el-option>
		</el-select>
		<el-select v-model="curDefault" placeholder="是否加密" :disabled="check">
			<el-option v-for="item in optionDefault" :key="item.value" :label="item.label" :value="item.value">
			</el-option>
		</el-select>
	</div>
</template>

<script>
	export default {
		name: 'baseCheckBox',
		data() {
			return {
				options: [{
						value: 'rsa',
						label: 'rsa加密'
					},
					{
						value: 'aes',
						label: 'aes加密'
					},
					{
						value: 'md5',
						label: 'md5加密'
					},
					{
						value: 'ecc',
						label: 'ecc加密'
					}
				],
				optionDefault: [
					{
						value: '1',
						label: '加密'
					},
					{
						value: '0',
						label: '不加密'
					}
				],
				curEncryption: this.encryption,
				curDefault: this.defaultEnc
			}
		},
    props: ['content', 'encryption', 'defaultEnc', 'check'],
		watch: {
			'encryption': function(newVal, oldVal) {
				this.curEncryption = newVal;
			},
			'curEncryption': function(newVal, oldVal) {
				this.$emit("update:encryption", newVal);
			},
			'defaultEnc': function(newVal, oldVal) {
				this.curDefault = newVal;
			},
			'curDefault': function(newVal, oldVal) {
				this.$emit("update:defaultEnc", newVal);
			}
		}
	}
</script>

<style>
	#base{
		/*position: relative;*/
		width:150px;
		top: 0px;
		margin:20px;
		float: left;
	}
</style>

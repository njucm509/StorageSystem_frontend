<template>
<!--	<div id="app">-->
<!--		<div id="upload" v-if="curStatus=='upload'">-->
<!--			<el-upload class="uploadFile" ref="upload" action="http://localhost:8888/api/file/upload" :on-preview="handlePreview"-->
<!--			 :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" :limit="1" :before-upload="beforeUploadFile"-->
<!--			 :on-success="handleFileUpLoadResponse">-->
<!--				<el-button slot="trigger" size="small" type="primary">选取文件</el-button>-->
<!--				<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
<!--				<div slot="tip" class="el-upload__tip">只能上传excel/csv文件</div>-->
<!--			</el-upload>-->
<!--			<div class="fileList">-->

<!--			</div>-->
<!--		</div>-->
<!--		<div id="changeToCheck" v-if="curStatus=='upload'">-->
<!--			<el-select class="cont" v-model="fileForRecognize" placeholder="请选择">-->
<!--				<el-option v-for="name in files" :key="name" :label="name" :value="name">-->
<!--				</el-option>-->
<!--			</el-select>-->
<!--			<el-button class="cont" type="primary" @click='recognize'>识别文件</el-button>-->
<!--		</div>-->
<!--		<div id="choose">-->
<!--			<base-checkbox v-if="checkStatus=='true'" v-for="(item,index) in colList" :key="index" :content='item.content'-->
<!--			 :encryption.sync='item.encryption' :default.sync='item.default'></base-checkbox>-->
<!--			<el-button class="ok" v-if="checkStatus=='true'" type="primary" @click='submitToFinal'>确定</el-button>-->
<!--		</div>-->

<!--		<div id="jiamitable" v-if="curStatus=='show'">-->
<!--			<el-table :data="tableData" style="width: 100%">-->
<!--				<el-table-column prop="date" label="日期" width="180">-->
<!--				</el-table-column>-->
<!--				<el-table-column prop="name" label="姓名" width="180">-->
<!--				</el-table-column>-->
<!--				<el-table-column prop="address" label="地址">-->
<!--				</el-table-column>-->
<!--			</el-table>-->
<!--		</div>-->
<!--	</div>-->
</template>

<script>
	import axios from 'axios'

	import {
		getFile,
		getFileHeader,
	} from '../../axios/api.js'

	import baseCheckBox from '@/components/base/baseCheckBox.vue'

	export default {
		components: {
			'base-checkbox': baseCheckBox
		},
		data() {
			return {
				checkStatus: 'false',
				fileForRecognize: '',
				files: [],
				fileList: [],
				colList: [],
				curStatus: 'upload',
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}]
			}
		},
		methods: {
			submitUpload() {
				var data = this.$refs.upload.submit();
			},
			handleFileUpLoadResponse(response, file, fileList) {
				console.log(response)
				if (response.msg == 'exist') {
					this.$message.warning(`file.name文件已存在`)
				} else if (response.msg == 'ok') {
					this.$message.success(`file.name文件上传成功`)
					this.initFile()
				} else {
					this.$message.error('上传失败');
				}
			},
			beforeUploadFile(file) {
				//    console.log(file)
				//    const isLt10M = file.size / 1024 / 1024 < 10
				// console.log(file.type)
				//    const isText = file.type === 'application/vnd.ms-excel'
				//    const isTextComputer =
				//      file.type ===
				//      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
				//    if (!isLt10M) {
				//      this.$message.error('上传文件大小不能超过10MB!')
				//      return false
				//    }
				//    if (!isText && !isTextComputer) {
				//      this.$message.error('上传文件类型必须为excel!')
				//      return false
				//    }
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			changeToFinal() {
				this.curStatus = 'final';
				this.checkStatus = 'false';
			},
			recognize() {
				console.log(this.fileForRecognize)
				let filename = this.fileForRecognize
				this.$http.post('/file/header',{filename: filename}).then(res => {
					console.log(res)
					this.colList = res.data
					this.checkStatus = 'true'
				});
			},
			initFile() {
				this.$http.get('/file/list').then(res => {
					console.log(res)
					let data = res.data;
					if (data.msg == 'no') {
						return
					} else {
						this.files = data.data
					}
				})
			},
			submitToFinal() {
				this.checkStatus = 'false';
				this.curStatus = 'show';
			}
		},
		watch: {
			encryption: function(newVal) {
				// console.log(this.encryption)
			}
		},
		mounted() {
			// console.log(this.encryption)
			this.initFile()
		}
	}
</script>

<style>
	#upload {
		float: left;
	}

	#upload .uploadFile {
		position: relative;
		width: 400px;
		top: 80px;
		left: 20px;
	}

	#upload .fileList {
		/* position: relative; */
		width: 500px;
		height: 300px;
		margin-left: 600px;
		margin-top: 20px;
		background-color: gray;
	}

	#changeToCheck {
		position: relative;
		top: 350px;
		/* left: -400px; */
	}

	#changeToCheck .cont {
		position: relative;
		left: -1080px;
	}

	#choose {
		position: absolute;
		width: 100%;
		top: 350px;
	}

	#choose .ok {
		position: relative;
		left: -1300px;
		top: 450px;
	}

	#jiamitable {
		position: relative;
		top: 60px;
		height: 750px;
	}
</style>

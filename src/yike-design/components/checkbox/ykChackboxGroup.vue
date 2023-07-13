<script setup lang="ts">
import { ref, watch } from "vue";
import ykCheck from "./ykCheckbox.vue";
import ykSpace from "../space/YkSpace.vue";

const props = defineProps({
	modelValue: {
		type: Array,
		default: []
	},
	options: {
		type: Array,
	},
	size: {
		type: [Number, String],
		default: "l",
	},
	direction: {
		//排列方式/vertical/horizontal
		type: String,
		default: "horizontal", //默认横排
	},
	defaultValue: {
		type: Array,
	},
});
const emits = defineEmits(["update:modelValue", "change"]);

//获取当前选择数组
const selectChecks = ref()

//初始化选择数组
selectChecks.value = props.modelValue;
//是否被点击问题
const isSelect = (e: any) => {
	if (e[0]) {
		selectChecks.value.push(e[1])
	} else {
		for (let i = 0; i < selectChecks.value.length; i++) {
			if (selectChecks.value[i] == e[1]) {
				selectChecks.value.splice(i, 1)
			}
		}
	}
}

const emitValue = (e: any) => {
	isSelect(e)
	emits("update:modelValue", selectChecks.value);
	emits("change", selectChecks.value);
};

//渲染check列表数组
const checks = ref();

//判断元素是否初始化选中
const defineSelect = (e:any):boolean => {
	let back=false;
	if (props.modelValue.length > 0) {
		for (let i of props.modelValue) {
			if(i==e){
				back= true;
			}
		}
	}
	return back;
}

const gitCheck = () => {
	checks.value=[];
	if (props.options) {
		let mod=false;
		for (var item of props.options) {
			if (typeof item != "object") {
				mod=defineSelect(item)
				let data = { label: item, value: item,mod:mod };
				checks.value.push(data);
			} else {
				//判断某个属性是否在object中
				if(item){
					if('value' in  item){
						mod=defineSelect(item.value)
						item.mod=mod;
					}
					//当没有“label”时候怕的
					if(!item.hasOwnProperty('label')){
						item.label=item.value;
					}
					checks.value.push(item);
				}
			}
		}
	}
};
gitCheck();

//替换选项
const changeCheck=()=>{
	let mod:boolean;
	for(let item of checks.value){
		mod=defineSelect(item.value);
		item.mod=mod;
	}
}

//监听父级点击
watch(props, () => {
  selectChecks.value = props.modelValue;
	changeCheck();
});
</script>

<template>
	<div class="yk-chack-group" ref="crumb">
		<ykSpace :size="size" :direction="direction" v-if="direction == 'horizontal'">
			<ykCheck v-for="(item, index) in checks" :key="index" :value="item.value" v-model="item.mod" @change="emitValue" :disabled="item.disabled">
				{{ item.label }}
			</ykCheck>
		</ykSpace>

		<ykSpace :rsize="size" :direction="direction" v-if="direction == 'vertical'">
			<ykCheck v-for="(item, index) in checks" :key="index" :value="item.value" v-model="item.mod" @change="emitValue" :disabled="item.disabled">
				{{ item.label }}
			</ykCheck>
		</ykSpace>
	</div>
</template>
<style lang="less" scoped>
@import "../../assets/style/yk-index.less";
</style>
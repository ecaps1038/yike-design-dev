<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import ykRaido from "./ykRadio.vue";
import ykSpace from "../space/YkSpace.vue";

const props = defineProps({
	modelValue: {
		type: [String,Number,Boolean],
		default: undefined
	},
	options: {
		type: Array,
	},
	size: {
		type: String,
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
	type:{
		type:String,
		default:'radio'
	},
	solid:{//是否完全填充
    type:Boolean,
    default:false,
  }
});
const emits = defineEmits(["update:modelValue", "change"]);

//获取当前选择数组
const selectChecks = ref()

//初始化选择数组
selectChecks.value = props.modelValue;
//是否被点击问题
const isSelect = (e: any) => {
	selectChecks.value=e;
}


// 子级给组件传值，并通知父级
// 如果父组件没有model值，则直接驱动视图更新
const emitValue = async (e: any) => {
	isSelect(e)
	emits("update:modelValue", selectChecks.value);
	emits("change", selectChecks.value);
	if ( props.modelValue === undefined ) {
		await nextTick()
		changeCheck()
	}
};

//渲染check列表数组
const checks = ref();

//判断元素是否初始化选中
const defineSelect = (e:any):boolean => {
	let back=false;
	if ( selectChecks.value == e ) {
		back= true;
	}
	return back;
}
//渲染元素
const gitCheck = () => {
	checks.value=[];
	if (props.options) {
		let mod=false;
		for (var item of props.options) {
			if (typeof item != "object") {
				mod=defineSelect(item)
				let data = { label: item, value: item, mod: mod };
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

// 视图更新
const changeCheck=()=>{
	let mod:boolean;
	for(let item of checks.value){
		mod=defineSelect(item.value);
		item.mod=mod;
	}
}

// 父级给组件传值，驱动视图更新
watch(props, () => {
  selectChecks.value = props.modelValue;
	changeCheck();
});
</script>

<template>
	<div class="yk-chack-group" ref="crumb">
		<ykSpace :size="size" :direction="direction" v-if="direction == 'horizontal' && type=='radio'">
			<ykRaido v-for="(item, index) in checks" :key="index" :value="item.value" v-model="item.mod" @change="emitValue" :disabled="item.disabled">
				{{ item.label }}
			</ykRaido>
		</ykSpace>

		<ykSpace :rsize="size" :direction="direction" v-if="direction == 'vertical' && type=='radio'">
			<ykRaido v-for="(item, index) in checks" :key="index" :value="item.value" v-model="item.mod" @change="emitValue" :disabled="item.disabled">
				{{ item.label }}
			</ykRaido>
		</ykSpace>
		<div class="button-radio" :class="[size]" v-if="type=='button'">
			<ykRaido v-for="(item, index) in checks" :key="index" :value="item.value" v-model="item.mod" @change="emitValue" :disabled="item.disabled" :size="size" :solid="solid" type="button">
				{{ item.label }}
			</ykRaido>
		</div>
	</div>
</template>
<style lang="less" scoped>
@import "../../assets/style/yk-index.less";

.button-radio{
	display:inline-flex;
	background: @bg-color-s;
	transition: background @animats;
}
.xl{
	padding:2px;
	border-radius: @radius-m;
}
.l{
	padding:1.5px;
	border-radius: @radius-m;
}
.m{
	padding:1.5px;
	border-radius: @radius-s;
}
.s{
	padding:1px;
	border-radius: @radius-s;
}
</style>
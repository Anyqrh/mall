(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-53bb"],{"2nGb":function(t,n,e){"use strict";e.d(n,"b",function(){return o}),e.d(n,"f",function(){return a}),e.d(n,"a",function(){return i}),e.d(n,"e",function(){return c}),e.d(n,"c",function(){return u}),e.d(n,"g",function(){return l}),e.d(n,"d",function(){return s}),e.d(n,"h",function(){return d});var r=e("t3Un");function o(){return Object(r.a)({url:"/config/mall",method:"get"})}function a(t){return Object(r.a)({url:"/config/mall",method:"post",data:t})}function i(){return Object(r.a)({url:"/config/express",method:"get"})}function c(t){return Object(r.a)({url:"/config/express",method:"post",data:t})}function u(){return Object(r.a)({url:"/config/order",method:"get"})}function l(t){return Object(r.a)({url:"/config/order",method:"post",data:t})}function s(){return Object(r.a)({url:"/config/wx",method:"get"})}function d(t){return Object(r.a)({url:"/config/wx",method:"post",data:t})}},RpVo:function(t,n,e){"use strict";e.r(n);var r=e("2nGb"),o={name:"ConfigOrder",data:function(){return{dataForm:{}}},created:function(){this.init()},methods:{init:function(){var t=this;Object(r.c)().then(function(n){t.dataForm=n.data.data})},cancel:function(){this.init()},update:function(){var t=this;Object(r.g)(this.dataForm).then(function(n){t.$notify.success({title:"成功",message:"订单参数配置成功"})}).catch(function(n){t.$notify.error({title:"失败",message:n.data.errmsg})})}}},a=(e("wDOY"),e("KHd+")),i=Object(a.a)(o,function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"app-container"},[e("el-form",{ref:"dataForm",attrs:{rules:t.rules,model:t.dataForm,"status-icon":"","label-width":"300px"}},[e("el-form-item",{attrs:{label:"订单发货后超期",prop:"litemall_order_unconfirm"}},[e("el-input",{staticClass:"input-width",model:{value:t.dataForm.litemall_order_unconfirm,callback:function(n){t.$set(t.dataForm,"litemall_order_unconfirm",n)},expression:"dataForm.litemall_order_unconfirm"}},[e("template",{slot:"append"},[t._v(" 天")])],2),t._v(" "),e("span",{staticClass:"info"},[t._v("未确认收货，则订单自动确认收货")])],1),t._v(" "),e("el-form-item",[e("el-button",{on:{click:t.cancel}},[t._v("取消")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.update}},[t._v("确定")])],1)],1)],1)},[],!1,null,"28b34a9f",null);i.options.__file="order.vue";n.default=i.exports},jSJ0:function(t,n,e){},wDOY:function(t,n,e){"use strict";var r=e("jSJ0");e.n(r).a}}]);
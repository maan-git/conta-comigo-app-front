(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-57935136"],{2164:function(e,a,t){},"7c87":function(e,a,t){"use strict";t.r(a);var s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return e.user.user?t("div",{staticClass:"user-details"},[t("CardContainer",{attrs:{backTo:"",title:"Perfil"}},[t("div",{staticClass:"text-center"},[t("p",{staticClass:"primary--text font-weight-bold title"},[e._v(" "+e._s(e.tabName))])]),t("v-tabs",{on:{change:e.change}},[t("v-tab",[t("v-icon",{attrs:{left:""}},[e._v("mdi-account")])],1),t("v-tab",[t("v-icon",{attrs:{left:""}},[e._v("mdi-map-marker")])],1),t("v-tab",[t("v-icon",{attrs:{left:""}},[e._v("mdi-at")])],1),t("v-tab-item",[t("TabPessoal")],1),t("v-tab-item",[t("TabEndereco")],1),t("v-tab-item",[t("TabConta")],1)],1)],1)],1):e._e()},r=[],i=t("2f62"),l=t("ce69"),o=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("v-form",{ref:"pessoalform"},[t("v-row",{staticClass:"mb-0 pa-4",attrs:{justify:"space-between"}},[t("v-btn",{attrs:{large:"",fab:"",color:"primary",disabled:!e.edit},on:{click:function(a){return e.$refs.dialog.open()}}},[t("DefaultAvatar",{attrs:{src:e.avatar,size:56}})],1),t("v-switch",{attrs:{color:"primary",label:"Editar"},model:{value:e.edit,callback:function(a){e.edit=a},expression:"edit"}})],1),t("v-row",{staticClass:"mb-0"},[t("v-col",{staticClass:"py-0",attrs:{cols:12,sm:6}},[t("v-text-field",{attrs:{readonly:!e.edit,outlined:"",label:"Nome",required:"",rules:[e.$vln.requiredRule("Nome"),e.$vln.moreThanRule(2)]},model:{value:e.first_name,callback:function(a){e.first_name=a},expression:"first_name"}})],1),t("v-col",{staticClass:"py-0",attrs:{cols:12,sm:6}},[t("v-text-field",{attrs:{readonly:!e.edit,outlined:"",label:"Sobrenome",required:"",rules:[e.$vln.requiredRule("Sobrenome"),e.$vln.moreThanRule(2)]},model:{value:e.last_name,callback:function(a){e.last_name=a},expression:"last_name"}})],1)],1),t("v-row",[t("v-col",{staticClass:"py-0",attrs:{cols:12,sm:6}},[t("v-text-field",{directives:[{name:"mask",rawName:"v-mask",value:"###.###.###-##",expression:"'###.###.###-##'"}],attrs:{readonly:!e.edit,outlined:"",label:"CPF",disabled:"",rules:[e.$vln.requiredRule("CPF"),e.$vln.cpflRule()]},model:{value:e.cpf,callback:function(a){e.cpf=a},expression:"cpf"}})],1),t("v-col",{staticClass:"py-0",attrs:{cols:12,sm:6}},[t("v-menu",{ref:"dpnascimento",attrs:{disabled:!e.edit,"close-on-content-click":!1,transition:"scale-transition","offset-y":"","min-width":"290px"},scopedSlots:e._u([{key:"activator",fn:function(a){var s=a.on;return[t("v-text-field",e._g({attrs:{label:"Data de nascimento",readonly:"",clearable:"",outlined:"",rules:[e.$vln.requiredRule("Data de nascimento")]},on:{"click:clear":function(a){e.birth_date=null}},model:{value:e.birth_date,callback:function(a){e.birth_date=a},expression:"birth_date"}},s),[e._v(e._s(e.birth_date))])]}}]),model:{value:e.datanascimentomenu,callback:function(a){e.datanascimentomenu=a},expression:"datanascimentomenu"}},[t("v-date-picker",{ref:"picker",attrs:{max:(new Date).toISOString().substr(0,10),min:"1950-01-01"},on:{change:e.saveDate},model:{value:e.birth_date,callback:function(a){e.birth_date=a},expression:"birth_date"}})],1)],1),t("v-col",{staticClass:"py-0",attrs:{cols:8}},[t("v-text-field",{directives:[{name:"mask",rawName:"v-mask",value:"(##) #####-####",expression:"'(##) #####-####'"}],attrs:{readonly:!e.edit,outlined:"",label:"Telefone para contato",required:"",rules:[e.$vln.requiredRule("Telefone"),e.$vln.foneRule(11)]},model:{value:e.phone_number,callback:function(a){e.phone_number=a},expression:"phone_number"}})],1),t("v-col",{staticClass:"py-0"},[t("v-checkbox",{staticClass:" pt-0",attrs:{readonly:!e.edit,label:" ","prepend-icon":"mdi-whatsapp"},model:{value:e.is_phone_whatsapp,callback:function(a){e.is_phone_whatsapp=a},expression:"is_phone_whatsapp"}})],1)],1),t("v-row",[t("v-col",{staticClass:"py-0 pr-0"},[t("v-checkbox",{staticClass:"mt-0 pt-0",attrs:{readonly:!e.edit,label:"Mora só"},model:{value:e.live_alone,callback:function(a){e.live_alone=a},expression:"live_alone"}})],1),t("v-col",{staticClass:"py-0 pl-0"},[t("v-checkbox",{staticClass:"mt-0 pt-0",attrs:{readonly:!e.edit,label:"Grupo de risco"},model:{value:e.is_at_risk_group,callback:function(a){e.is_at_risk_group=a},expression:"is_at_risk_group"}})],1)],1),e.user.userError?t("p",{staticClass:"block text-center mt-4 red--text"},[e._v(e._s(e.user.userError))]):e._e(),e.edit?t("v-row",{staticClass:"px-5",attrs:{justify:"end"}},[t("v-btn",{attrs:{large:"",color:"primary",loading:e.user.userLoading,rounded:""},on:{click:e.updateData}},[e._v("Salvar")])],1):e._e()],1),t("CropDialog",{ref:"dialog",on:{avatar:function(a){e.avatar=a}}})],1)},n=[],c=(t("99af"),t("0d03"),t("ac1f"),t("5319"),t("5530")),d=t("6a18"),u=t("2884"),p={name:"TabPessoal",components:{DefaultAvatar:d["a"],CropDialog:u["a"]},computed:Object(i["d"])(["user"]),methods:{saveDate:function(e){var a=new Date(e),t=a.getDay()<0?"0".concat(a.getDay()):a.getDay(),s=a.getMonth()+1<0?"0".concat(a.getMonth()+1):a.getMonth()+1;this.$refs.dpnascimento.save("".concat(t,"-").concat(s,"-").concat(a.getFullYear()))},updateData:function(){var e=this;if(this.$refs.pessoalform.validate()){var a,t="+55".concat(this.phone_number.replace(/\(/g,"").replace(/\)/g,"").replace(/ /g,"").replace(/-/g,"")),s=this.cpf.replace(/\./g,"").replace(/-/g,""),r={first_name:this.first_name,last_name:this.last_name,cpf:s,birth_date:this.birth_date,phone_number:t,is_phone_whatsapp:this.is_phone_whatsapp,is_at_risk_group:this.is_at_risk_group,live_alone:this.live_alone};a=this.avatar!==this.user.user.avatar?Object(c["a"])({avatar:this.avatar},r):r,this.$store.dispatch("user/updatePersonalData",a).then((function(){e.edit=!1}))}},resetData:function(){this.edit=!1}},data:function(){return{avatar:null,first_name:"",last_name:"",phone_number:"",cpf:"",cpfMask:"###.###.###-##",birth_date:null,datanascimentomenu:!1,is_phone_whatsapp:!1,is_at_risk_group:!1,live_alone:!1,edit:!1}},created:function(){this.avatar=this.user.user.avatar,this.first_name=this.user.user.first_name,this.last_name=this.user.user.last_name,this.cpf=this.user.user.cpf,this.birth_date=this.user.user.birth_date,this.phone_number=String(this.user.user.phone_number).substr(3),this.is_phone_whatsapp=this.user.user.is_phone_whatsapp,this.is_at_risk_group=this.user.user.is_at_risk_group,this.live_alone=this.user.user.live_alone}},v=p,m=t("2877"),h=t("6544"),b=t.n(h),f=t("8336"),_=t("ac7c"),k=t("62ad"),x=t("2e4b"),w=t("4bd4"),y=t("e449"),C=t("0fd9"),g=t("b73d"),$=t("8654"),D=Object(m["a"])(v,o,n,!1,null,null,null),E=D.exports;b()(D,{VBtn:f["a"],VCheckbox:_["a"],VCol:k["a"],VDatePicker:x["a"],VForm:w["a"],VMenu:y["a"],VRow:C["a"],VSwitch:g["a"],VTextField:$["a"]});var V=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("v-form",{ref:"enderecoform"},[t("v-row",{staticClass:"mb-0 pa-4",attrs:{justify:"end"}},[t("v-switch",{attrs:{color:"primary",label:"Editar"},model:{value:e.edit,callback:function(a){e.edit=a},expression:"edit"}})],1),t("v-row",{staticClass:"mb-0"},[t("v-col",{staticClass:"py-0",attrs:{cols:12}},[t("v-text-field",{directives:[{name:"mask",rawName:"v-mask",value:e.cepMask,expression:"cepMask"}],attrs:{readonly:!e.edit,outlined:"",label:"Cep",rules:[e.$vln.requiredRule("Cep")],required:""},model:{value:e.cep,callback:function(a){e.cep=a},expression:"cep"}})],1),t("v-col",{staticClass:"py-0",attrs:{cols:12}},[t("v-text-field",{attrs:{readonly:!e.edit,outlined:"",label:"Endereço",rules:[e.$vln.requiredRule("Endereço")],required:""},model:{value:e.endereco,callback:function(a){e.endereco=a},expression:"endereco"}})],1)],1),t("v-row",[t("v-col",{staticClass:"py-0",attrs:{cols:12}},[t("v-select",{attrs:{readonly:e.bairros.length<=1,"item-value":"id","item-text":"description",items:e.address.bairros,outlined:"","menu-props":"auto",label:"Bairro",rules:[e.$vln.requiredRule("Bairro")],required:""},model:{value:e.bairro,callback:function(a){e.bairro=a},expression:"bairro"}})],1),t("v-col",{staticClass:"py-0",attrs:{cols:12}},[t("v-text-field",{attrs:{readonly:!0,outlined:"",label:"Cidade",rules:[e.$vln.requiredRule("Cidade")],required:""},model:{value:e.cidade,callback:function(a){e.cidade=a},expression:"cidade"}})],1),t("v-col",{staticClass:"py-0"},[t("v-text-field",{attrs:{readonly:!0,outlined:"",label:"Estado",rules:[e.$vln.requiredRule("Estado")],required:""},model:{value:e.estado,callback:function(a){e.estado=a},expression:"estado"}})],1)],1),e.user.userError?t("p",{staticClass:"block text-center mt-4 red--text"},[e._v(e._s(e.user.userError))]):e._e(),e.edit?t("v-row",{staticClass:"px-5",attrs:{justify:"end"}},[t("v-btn",{attrs:{large:"",color:"primary",rounded:"",loading:e.user.userLoading},on:{click:e.updateData}},[e._v("Salvar")])],1):e._e()],1)],1)},P=[],q={name:"TabPessoal",components:{},computed:Object(i["d"])(["user","address"]),watch:{cep:function(e){e&&9===e.length&&this.$store.dispatch("address/findByZip",e)}},methods:{resetData:function(){this.edit=!1},updateData:function(){var e=this;if(this.$refs.enderecoform.validate()){var a=this.cep.replace(/-/g,""),t={user_address_id:this.user.user.addresses[0].id,neighborhood_id:this.bairro,address:this.endereco,zip:a};this.$store.dispatch("user/updateAddress",t).then((function(){e.edit=!1}))}}},data:function(){return{cep:"",cepMask:"#####-###",endereco:"",bairro:"",bairros:[],cidade:"",estado:"",edit:!1}},created:function(){var e=this;this.cep=this.user.user.addresses[0].zip_code,this.endereco=this.user.user.addresses[0].address,this.$store.watch((function(e){return e.address}),(function(a){e.endereco!==a.endereco&&e.edit&&(e.endereco=a.endereco),e.bairros!==a.bairros&&(e.bairro=a.bairro),e.cidade!==a.cidade&&(e.cidade=a.cidade),e.estado!==a.estado&&(e.estado=a.estado)}),{deep:!0})}},R=q,T=t("b974"),S=Object(m["a"])(R,V,P,!1,null,null,null),j=S.exports;b()(S,{VBtn:f["a"],VCol:k["a"],VForm:w["a"],VRow:C["a"],VSelect:T["a"],VSwitch:g["a"],VTextField:$["a"]});var N=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("v-form",{ref:"formemail"},[t("v-row",{staticClass:"mt-5 mb-0"},[t("v-col",{staticClass:"py-0",attrs:{cols:12}},[t("v-text-field",{attrs:{readonly:!e.edit,outlined:"",label:"Email",disabled:"",rules:[e.$vln.requiredRule("E-mail"),e.$vln.emailRule()]},model:{value:e.email,callback:function(a){e.email=a},expression:"email"}})],1)],1),e.user.userError?t("p",{staticClass:"block text-center mt-4 red--text"},[e._v(e._s(e.user.userError))]):e._e()],1),t("v-form",{ref:"formsenha"},[t("v-row",[t("v-col",{staticClass:"py-0",attrs:{cols:12}},[t("v-switch",{attrs:{color:"primary",label:"Editar Senha"},model:{value:e.editPass,callback:function(a){e.editPass=a},expression:"editPass"}})],1),t("v-col",{staticClass:"py-0",attrs:{cols:12}},[t("v-text-field",{attrs:{readonly:!e.editPass,outlined:"",label:"Senha",required:"",type:"password",rules:[e.$vln.requiredRule("Senha"),e.$vln.moreThanRule(6)]},model:{value:e.password,callback:function(a){e.password=a},expression:"password"}})],1),t("v-col",{staticClass:"py-0",attrs:{cols:12}},[t("v-text-field",{attrs:{readonly:!e.editPass,outlined:"",label:"Repetir Senha",required:"",type:"password",rules:[e.$vln.requiredRule("Repitir Senha"),e.$vln.mustBeEqualPass(e.password)]},model:{value:e.repassword,callback:function(a){e.repassword=a},expression:"repassword"}})],1)],1),e.user.userError?t("p",{staticClass:"block text-center mt-4 red--text"},[e._v(e._s(e.user.userError))]):e._e(),e.editPass?t("v-row",{staticClass:"px-5",attrs:{justify:"end"}},[t("v-btn",{attrs:{large:"",color:"primary",loading:e.user.userLoading,rounded:""},on:{click:e.updatePass}},[e._v("Salvar Senha")])],1):e._e()],1)],1)},O=[],F={name:"TabPessoal",components:{},computed:Object(i["d"])(["user"]),methods:{updateEmail:function(){var e=this;this.$refs.formemail.validate()&&this.$store.dispatch("user/updatePersonalData",{email:this.email}).then((function(){e.edit=!1}))},updatePass:function(){var e=this;this.$refs.formsenha.validate()&&this.$store.dispatch("user/updatePersonalData",{password:this.password}).then((function(){e.editPass=!1}))}},data:function(){return{email:"",password:"123456",repassword:"123456",edit:!1,editPass:!1}},created:function(){this.email=this.user.user.email}},M=F,B=Object(m["a"])(M,N,O,!1,null,null,null),z=B.exports;b()(B,{VBtn:f["a"],VCol:k["a"],VForm:w["a"],VRow:C["a"],VSwitch:g["a"],VTextField:$["a"]});var A={components:{CardContainer:l["a"],TabPessoal:E,TabEndereco:j,TabConta:z},computed:Object(i["d"])(["user"]),data:function(){return{tabName:"Dados Pessoais"}},methods:{change:function(e){switch(e){case 0:this.tabName="Dados Pessoais";break;case 1:this.tabName="Endereço";break;case 2:this.tabName="Dados da Conta";break;default:break}this.$store.dispatch("user/clearUserUtils")}}},I=A,L=(t("9ad7"),t("132d")),J=t("71a3"),U=t("c671"),G=t("fe57"),Y=Object(m["a"])(I,s,r,!1,null,"21e224fa",null);a["default"]=Y.exports;b()(Y,{VIcon:L["a"],VTab:J["a"],VTabItem:U["a"],VTabs:G["a"]})},"9ad7":function(e,a,t){"use strict";var s=t("2164"),r=t.n(s);r.a}}]);
//# sourceMappingURL=chunk-57935136.c4911809.js.map
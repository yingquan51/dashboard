import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import {
  getDateFormField,
  getDetailsFormField,
  getMultiSelectFormField,
  getSelectFormField,
  getSelectFormFieldRely,
  getFormField,
  getFormFieldInherited,
  getPhotoFormField,
} from "../components/FormField";

const provinceCities = {
  "北京市": ["东城区", "西城区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "密云区", "延庆区"],
  "天津市": ["和平区", "河东区", "河西区", "南开区", "河北区", "红桥区", "东丽区", "西青区", "津南区", "北辰区", "武清区", "宝坻区", "滨海新区", "宁河区", "静海区", "蓟州区"],
  "河北省": ["石家庄市", "唐山市", "秦皇岛市", "邯郸市", "邢台市", "保定市", "张家口市", "承德市", "沧州市", "廊坊市", "衡水市"],
  "山西省": ["太原市", "大同市", "阳泉市", "长治市", "晋城市", "朔州市", "晋中市", "运城市", "忻州市", "临汾市", "吕梁市"],
  "内蒙古自治区": ["呼和浩特市", "包头市", "乌海市", "赤峰市", "通辽市", "鄂尔多斯市", "呼伦贝尔市", "巴彦淖尔市", "乌兰察布市", "兴安盟", "锡林郭勒盟", "阿拉善盟"],
  "辽宁省": ["沈阳市", "大连市", "鞍山市", "抚顺市", "本溪市", "丹东市", "锦州市", "营口市", "阜新市", "辽阳市", "盘锦市", "铁岭市", "朝阳市", "葫芦岛市"],
  "吉林省": ["长春市", "吉林市", "四平市", "辽源市", "通化市", "白山市", "松原市", "白城市", "延边朝鲜族自治州"],
  "黑龙江省": ["哈尔滨市", "齐齐哈尔市", "鸡西市", "鹤岗市", "双鸭山市", "大庆市", "伊春市", "佳木斯市", "七台河市", "牡丹江市", "黑河市", "绥化市", "大兴安岭地区"],
  "上海市": ["黄浦区", "徐汇区", "长宁区", "静安区", "普陀区", "虹口区", "杨浦区", "闵行区", "宝山区", "嘉定区", "浦东新区", "金山区", "松江区", "青浦区", "奉贤区", "崇明区"],
  "江苏省": ["南京市", "无锡市", "徐州市", "常州市", "苏州市", "南通市", "连云港市", "淮安市", "盐城市", "扬州市", "镇江市", "泰州市", "宿迁市"],
  "浙江省": ["杭州市", "宁波市", "温州市", "嘉兴市", "湖州市", "绍兴市", "金华市", "衢州市", "舟山市", "台州市", "丽水市"],
  "安徽省": ["合肥市", "芜湖市", "蚌埠市", "淮南市", "马鞍山市", "淮北市", "铜陵市", "安庆市", "黄山市", "滁州市", "阜阳市", "宿州市", "六安市", "亳州市", "池州市", "宣城市"],
  "福建省": ["福州市", "厦门市", "莆田市", "三明市", "泉州市", "漳州市", "南平市", "龙岩市", "宁德市"],
  "江西省": ["南昌市", "景德镇市", "萍乡市", "九江市", "新余市", "鹰潭市", "赣州市", "吉安市", "宜春市", "抚州市", "上饶市"],
  "山东省": ["济南市", "青岛市", "淄博市", "枣庄市", "东营市", "烟台市", "潍坊市", "济宁市", "泰安市", "威海市", "日照市", "临沂市", "德州市", "聊城市", "滨州市", "菏泽市"],
  "河南省": ["郑州市", "开封市", "洛阳市", "平顶山市", "安阳市", "鹤壁市", "新乡市", "焦作市", "濮阳市", "许昌市", "漯河市", "三门峡市", "南阳市", "商丘市", "信阳市", "周口市", "驻马店市", "济源市"],
  "湖北省": ["武汉市", "黄石市", "十堰市", "宜昌市", "襄阳市", "鄂州市", "荆门市", "孝感市", "荆州市", "黄冈市", "咸宁市", "随州市", "恩施土家族苗族自治州", "仙桃市", "潜江市", "天门市", "神农架林区"],
  "湖南省": ["长沙市", "株洲市", "湘潭市", "衡阳市", "邵阳市", "岳阳市", "常德市", "张家界市", "益阳市", "郴州市", "永州市", "怀化市", "娄底市", "湘西土家族苗族自治州"],
  "广东省": ["广州市", "韶关市", "深圳市", "珠海市", "汕头市", "佛山市", "江门市", "湛江市", "茂名市", "肇庆市", "惠州市", "梅州市", "汕尾市", "河源市", "阳江市", "清远市", "东莞市", "中山市", "潮州市", "揭阳市", "云浮市"],
  "广西壮族自治区": ["南宁市", "柳州市", "桂林市", "梧州市", "北海市", "防城港市", "钦州市", "贵港市", "玉林市", "百色市", "贺州市", "河池市", "来宾市", "崇左市"],
  "海南省": ["海口市", "三亚市", "三沙市", "儋州市", "五指山市", "琼海市", "文昌市", "万宁市", "东方市", "定安县", "屯昌县", "澄迈县", "临高县", "白沙黎族自治县", "昌江黎族自治县", "乐东黎族自治县", "陵水黎族自治县", "保亭黎族苗族自治县", "琼中黎族苗族自治县"],
  "重庆市": ["万州区", "涪陵区", "渝中区", "大渡口区", "江北区", "沙坪坝区", "九龙坡区", "南岸区", "北碚区", "綦江区", "大足区", "渝北区", "巴南区", "黔江区", "长寿区", "江津区", "合川区", "永川区", "南川区", "璧山区", "铜梁区", "潼南区", "荣昌区", "开州区", "梁平区", "武隆区", "城口县", "丰都县", "垫江县", "忠县", "云阳县", "奉节县", "巫山县", "巫溪县", "石柱土家族自治县", "秀山土家族苗族自治县", "酉阳土家族苗族自治县", "彭水苗族土家族自治县"],
  "四川省": ["成都市", "自贡市", "攀枝花市", "泸州市", "德阳市", "绵阳市", "广元市", "遂宁市", "内江市", "乐山市", "南充市", "眉山市", "宜宾市", "广安市", "达州市", "雅安市", "巴中市", "资阳市", "阿坝藏族羌族自治州", "甘孜藏族自治州", "凉山彝族自治州"],
  "贵州省": ["贵阳市", "六盘水市", "遵义市", "安顺市", "毕节市", "铜仁市", "黔西南布依族苗族自治州", "黔东南苗族侗族自治州", "黔南布依族苗族自治州"],
  "云南省": ["昆明市", "曲靖市", "玉溪市", "保山市", "昭通市", "丽江市", "普洱市", "临沧市", "楚雄彝族自治州", "红河哈尼族彝族自治州", "文山壮族苗族自治州", "西双版纳傣族自治州", "大理白族自治州", "德宏傣族景颇族自治州", "怒江傈僳族自治州", "迪庆藏族自治州"],
  "西藏自治区": ["拉萨市", "日喀则市", "昌都市", "林芝市", "山南市", "那曲市", "阿里地区"],
  "陕西省": ["西安市", "铜川市", "宝鸡市", "咸阳市", "渭南市", "延安市", "汉中市", "榆林市", "安康市", "商洛市"],
  "甘肃省": ["兰州市", "嘉峪关市", "金昌市", "白银市", "天水市", "武威市", "张掖市", "平凉市", "酒泉市", "庆阳市", "定西市", "陇南市", "临夏回族自治州", "甘南藏族自治州"],
  "青海省": ["西宁市", "海东市", "海北藏族自治州", "黄南藏族自治州", "海南藏族自治州", "果洛藏族自治州", "玉树藏族自治州", "海西蒙古族藏族自治州"],
  "宁夏回族自治区": ["银川市", "石嘴山市", "吴忠市", "固原市", "中卫市"],
  "新疆维吾尔自治区": ["乌鲁木齐市", "克拉玛依市", "吐鲁番市", "哈密市", "昌吉回族自治州", "博尔塔拉蒙古自治州", "巴音郭楞蒙古自治州", "阿克苏地区", "克孜勒苏柯尔克孜自治州", "喀什地区", "和田地区", "伊犁哈萨克自治州", "塔城地区", "阿勒泰地区", "石河子市", "阿拉尔市", "图木舒克市", "五家渠市", "北屯市", "铁门关市", "双河市", "可克达拉市", "昆玉市", "胡杨河市", "新星市"]
}

const familyMembers = {
  "一级亲属": ['父亲', '母亲', '儿子', '女儿', '哥', '姐', '弟', '妹'],
  "二级亲属": ['叔', '伯', '姑', '舅', '姨', '祖父', '祖母', '外祖父', '外祖母'],
  "三级亲属": ['表兄弟', '表姐妹', '堂兄弟', '堂姐妹'],
  "": [],
}

const pathologyState = () =>{
  let ps = ['p','yp']
  let Ts = ['Tx', 'T0','Tis','T1','T1mi','T1a','T1b','T1c','T2','T3', 'T4', 'T4a','T4b','T4c','T4d',]
  let Ns = ["NX", "N0", "N0(i+)", "N1", "N1mi", "N1a", "N1b", "N1c", "N2", "N2a", "N2b", "N3", "N3a", "N3b", "N3c"]
  let Ms = ['M0', 'M1']
  let combinations = [];  
  for (let p of ps) {  
    for (let t of Ts) {  
        for (let n of Ns) {  
            for (let m of Ms) {  
              combinations.push(`${p}${t}${n}${m}`);  
            }  
        }  
    }  
  }  
  return combinations
}

const provinces = Object.keys(provinceCities);

const mzs = ["汉族", "壮族", "满族", "回族", "苗族", "维吾尔族", "土家族", "彝族", "蒙古族", "藏族", "布依族", "侗族", "瑶族", "朝鲜族", "白族", "哈尼族", "哈萨克族", "黎族", "傣族", "畲族", "傈僳族", "仡佬族", "东乡族", "高山族", "拉祜族", "水族", "佤族", "纳西族", "羌族", "土族", "仫佬族", "锡伯族", "柯尔克孜族", "达斡尔族", "景颇族", "毛南族", "撒拉族", "布朗族", "塔吉克族", "阿昌族", "普米族", "鄂温克族", "怒族", "京族", "基诺族", "德昂族", "保安族", "俄罗斯族", "裕固族", "乌孜别克族", "门巴族", "鄂伦春族", "独龙族", "塔塔尔族", "赫哲族", "珞巴族"];

// 所有的getXXXField都移动到了../components/FormField下

const requiredMessage = "需要填写";
const syntaxError = "格式错误";
const notPositiveNumberError = "需要是个正数";
const notNaturalNumberError = "需要是个正数";
const notIntegerError = "需要是个整数"
const notNumberError = "需要是个数字"

const allTables = {
  "一、患者基本信息": {
    "患者基本信息": {
      name: "patient_info",
      fields: ["name", "sex", "age", "bhzyid", "marital_status", "mz", "job", "edu", "jg", "addr", "ryDate", "fbDate", "phone1", "phone2", "cert_id", "birthday", "weight", "tall", "bmi"],
      columns: ["姓名", "性别", "初诊年龄", "滨海住院号", "婚姻状况", "民族", "职业", "教育水平", "籍贯", "现住址", "入院日期", "发现日期", "联系电话1", "联系电话2", "身份证号", "出生日期", "体重（千克）", "身高（厘米）", "BMI"],
      uploadParams: {  // 用于编写上传表格代码的数据
        name: "病人基本信息上传表",
        api: "info",
        fields: ["name", "sex", "age", "marital_status", "mz", "job", "edu", "jgProvince", "jgCity", "jg", "addr", "ryDate", "fbDate", "phone1", "phone2", "cert_id", "birthday", "weight", "tall", "bmi"],
        columns: ["姓名", "性别", "初诊年龄", "婚姻状况", "民族", "职业", "教育水平", "籍贯省份", "籍贯城市", "籍贯", "现住址", "入院日期", "发现日期", "联系电话1", "联系电话2", "身份证号", "出生日期（自动填）", "体重（千克）", "身高（厘米）", "BMI（自动填）"],
        validations: [
          Yup.string().required(requiredMessage), //1.name
          Yup.string().required(requiredMessage), //2.sex
          Yup.number().required(requiredMessage).positive(notPositiveNumberError).integer(notIntegerError), //3.age
          Yup.string().required(requiredMessage), //4.marital_status
          Yup.string().required(requiredMessage), //5.mz
          Yup.string().required(requiredMessage), //6.job
          Yup.string().required(requiredMessage), //7.edu
          Yup.string().required(requiredMessage), //8.jgProvince
          Yup.string().required(requiredMessage), //9.jgCity
          Yup.string().required(requiredMessage), //10.jg
          Yup.string().required(requiredMessage), // address
          Yup.string().required(requiredMessage), // date1
          Yup.string().required(requiredMessage), // date2
          Yup.number().required(requiredMessage).positive(notPositiveNumberError).integer(notIntegerError).min(1e10, syntaxError).max(1e11 - 1, syntaxError),  // phone1
          Yup.number().required(requiredMessage).positive(notPositiveNumberError).integer(notIntegerError).min(1e10, syntaxError).max(1e11 - 1, syntaxError),  // phone2
          Yup.string().required(requiredMessage).matches("^[1-9]\\d{5}(?:18|19|20)\\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\\d|30|31)\\d{3}[0-9Xx]$", syntaxError),  // sfz
          Yup.string(),  //born date
          Yup.number().required(requiredMessage).positive(notPositiveNumberError),  // weight
          Yup.number().required(requiredMessage).positive(notPositiveNumberError),  // height
          Yup.number(),  // bmi
        ],
        functions: [getFormField,
          getSelectFormField,
          getFormField,
          getSelectFormField,
          getSelectFormField,
          getSelectFormField,
          getSelectFormField,
          getSelectFormField,
          getSelectFormFieldRely, // 9.city
          getFormFieldInherited,
          getFormField,
          getDateFormField,
          getDateFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormFieldInherited,
          getFormField,
          getFormField,
          getFormFieldInherited,],
        params: [["例如：李华", (v) => false], //name
        [(v) => ["男", "女"], (v) => false], //sex
        ["例如：23", (v) => false], //age
        [(v) => ["已婚", "未婚", "离异", "丧偶"], (v) => false], //marital_status
        [(v) => mzs, (v) => false], //mz
        [(v) => ["工人", "农民", "公司职员", "国家公务员", "无业人员", "自由职业", "专业技术人员", "个体经营者", "企业管理人员", "现役军人", "退（离）休人员", "学生", "其他"], (v) => false], //job
        [(v) => ["初中及以下", "高中/中专", "大学专科", "大学本科", "研究生及以上"], (v) => false],//edu
        [(values) => provinces, (v) => false], //provinces
        [(v) => provinceCities[v.jgProvince] || [], (v) => v.jgProvince, (v) => false], //jgCity
        [(v) => v["jgProvince"] + v["jgCity"], (v) => false], //jg
        ["例如：天津市某镇某户", (v) => false], //address
        [(v) => false], //date1
        [(v) => false], //date2 
        ["例如：12341234123", (v) => false],
        ["例如：12341234123", (v) => false],
        ["例如：123123123123123123", (v) => false],
        [(v) => (v.cert_id === "" ? "" : v.cert_id.slice(6, 10) + "-" + v.cert_id.slice(10, 12) + "-" + v.cert_id.slice(12, 14)), (v) => true],
        ["例如：50", (v) => false],
        ["例如：170", (v) => false],
        [(v) => ((v.weight === "" || v.tall === "") ? "" : (v.weight * 10000 / (v.tall * v.tall)).toFixed(2)), (v) => true]]
      }
    },
  },
  "二、妇科相关信息": {
    "婚育史": {
      name: "patient_marry_history",
      fields: ["sy", "qzssyzt", "ccage", "mtage", "hycs", "zyc", "lczcs", "fzsy", "fzsyfs", "sfmrwy", "mrcb", "mrsc"],
      columns: ["生育", "确诊时生育状态", "初产年龄", "末胎年龄", "怀孕次数", "足月产", "流产或早产史", "是否辅助生育", "辅助生育方式", "是否母乳喂养", "哺乳侧别", "哺乳时长（月）"],
      uploadParams: {
        name: "婚育史上传表",
        api: "marryhistory",
        fields: ["sy", "qzssyzt", "ccage", "mtage", "hycs", "zyc", "lczcs", "fzsy", "fzsyfs", "sfmrwy", "mrcb", "mrsc"],
        columns: ["生育", "确诊时生育状态", "初产年龄", "末胎年龄", "怀孕次数", "足月产", "流产或早产史", "是否辅助生育", "辅助生育方式", "是否母乳喂养", "哺乳侧别", "哺乳时长（月）"],
        validations: [
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.number().positive(notPositiveNumberError).integer(notIntegerError),
          Yup.number().positive(notPositiveNumberError).integer(notIntegerError),
          Yup.number().positive(notPositiveNumberError).integer(notIntegerError),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
        ],
        functions: [
          getSelectFormField,
          getSelectFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
          getSelectFormField,
          getFormField,
          getSelectFormField,
          getSelectFormField,
          getFormField,
        ],
        params: [
          [(v) => ["是", "否"], (v) => false],
          [(v) => ["无", "哺乳期", "妊娠期"], (v) => false],
          ["例如：24", (v) => v.sy !== "是"],
          ["例如：24", (v) => v.sy !== "是"],
          ["例如：2", (v) => v.sy !== "是"],
          ["例如：x胎", (v) => v.sy !== "是"],
          ["例如：x次", (v) => false],
          [(v) => ["是", "否"], (v) => false],
          ["例如：方式", (v) => v.fzsy !== "是"],
          [(v) => ["是", "否"], (v) => v.sy !== "是"],
          [(v) => ["左侧", "右侧", "双侧(左侧为主)", "双侧(右侧为主)", "不详"], (v) => v.sy !== "是" || v.sfmrwy !== "是"],
          ["例如：12", (v) => v.sy !== "是" || v.sfmrwy !== "是"],
        ],
      }
    },
    "月经史": {
      name: "patient_menstruation_history",
      fields: ["ccage", "yjzq", "jq", "sfjj", "jjfs", "jtjjfs", "mqyj", "jjage"],
      columns: ["初潮年龄（岁）", "月经周期（天）", "经期（天）", "是否绝经", "绝经方式", "具体绝经方式", "末次月经", "绝经年龄（岁）"],
      uploadParams: {
        name: "月经史上传表",
        api: "pmhistory",
        fields: ["ccage", "yjzq", "jq", "sfjj", "jjfs", "jtjjfs", "mqyj", "jjage"],
        columns: ["初潮年龄（岁）", "月经周期（天）", "经期（天）", "是否绝经", "绝经方式", "具体绝经方式", "末次月经", "绝经年龄（岁）"],
        validations: [
          Yup.number().positive(notPositiveNumberError).integer(notIntegerError),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
        ],
        functions: [
          getFormField,
          getFormField,
          getFormField,
          getSelectFormField,
          getSelectFormField,
          getFormField,
          getDateFormField,
          getFormField,
        ],
        params: [
          ["例如：16", (v) => false],
          ["例如：30", (v) => false],
          ["例如：8", (v) => false],
          [(v) => ["是", "否", "不详"], (v) => false],
          [(v) => ["自然", "非自然", "不详"], (v) => v.sfjj !== "是"],
          ["例如：", (v) => v.sfjj !== "是"],
          [(v) => v.sfjj !== "否"],
          ["例如：", (v) => v.sfjj !== "是"],
        ],
      }
    },
  },
  "三、个人史、既往史、家族史": {
    "个人史": {
      name: "patient_history",
      fields: ["sfxy", "jtxyl", "sfyj", "jtyjl"],
      columns: ["是否吸烟", "具体吸烟量", "是否饮酒", "具体饮酒量"],
      uploadParams: {
        name: "个人史上传表",
        api: "pathistory",
        fields: ["sfxy", "jtxyl", "sfyj", "jtyjl"],
        columns: ["是否吸烟", "具体吸烟量", "是否饮酒", "具体饮酒量"],
        validations: [
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string().required(requiredMessage),
          Yup.string()
        ],
        functions: [
          getSelectFormField,
          getFormField,
          getSelectFormField,
          getFormField,
        ],
        params: [
          [(v) => ["是", "否", "不详"], (v) => false],
          ["例如：100", (v) => v.sfxy !== "是"],
          [(v) => ["是", "否", "不详"], (v) => false],
          ["例如：100", (v) => v.sfyj !== "是"],
        ],
      }
    },
    "既往史": {
      name: "previous_history",
      fields: ["rxlxjbs", "rxlxjbsjtqk", "grxjb", "grxjbjtqk", "sfgrxg", "xgyxrq", "xtxjb", "xtjbjtqk", "sss", "sssjtqk", "exzl", "exzljtqk"],
      columns: ["乳腺良性疾病史 ", "乳腺良性疾病史具体情况 ", "感染性疾病 ", "感染性疾病具体情况 ", "是否感染新冠", "新冠阳性日期", "是否有系统疾病", "系统疾病具体情况", "是否有手术史 ", "手术史具体情况 ", "是否有恶性肿瘤既往史 ", "恶性肿瘤既往史具体情况"],
      uploadParams: {
        name: "既往史上传表",
        api: "prehistory",
        fields: ["rxlxjbs", "rxlxjbsjtqk", "grxjb", "grxjbjtqk", "sfgrxg", "xgyxrq", "xtxjb", "xtjbjtqk", "sss", "sssjtqk", "exzl", "exzljtqk"],
        columns: ["乳腺良性疾病史 ", "乳腺良性疾病史具体情况 ", "感染性疾病 ", "感染性疾病具体情况 ", "是否感染新冠", "新冠阳性日期", "是否有系统疾病", "系统疾病具体情况", "是否有手术史 ", "手术史具体情况 ", "是否有恶性肿瘤既往史 ", "恶性肿瘤既往史具体情况"],
        validations: [
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string().required(requiredMessage),
          Yup.string(),
        ],
        functions: [
          getMultiSelectFormField,
          getFormField,
          getMultiSelectFormField,
          getFormField,
          getSelectFormField,
          getDateFormField,
          getMultiSelectFormField,
          getFormField,
          getSelectFormField,
          getFormField,
          getSelectFormField,
          getFormField,
        ],
        params: [
          [(v) => ["无", "纤维腺瘤", "增生性疾病", "导管内乳头状瘤", "炎症性疾病", "其他", "不详"], (v) => false],
          ["例如：", (v) => v.rxlxjbs.includes("无") || v.rxlxjbs.includes("不详")],
          [(v) => ["无", "肝炎", "结核", "梅毒", "艾滋", "其他", "不详"], (v) => false],
          ["例如：", (v) => v.grxjb === "无" || v.grxjb === "不详"],
          [(v) => ["是", "否", "不详"], (v) => false],
          [(v) => v.sfgrxg !== "是"],  // 新冠阳性日期
          [(v) => ["无", "高血压", "心脏病", "糖尿病", "青光眼", "哮喘", "甲亢", "甲减", "脑血管疾病", "精神疾病", "其他"], (v) => false], // 是否有系统疾病
          ["例如：", (v) => v.xtxjb.includes("无")], // 系统疾病具体情况
          [(v) => ["是", "否", "不详"], (v) => false],
          ["例如：", (v) => v.sss !== "是"],
          [(v) => ["是", "否", "不详"], (v) => false],
          ["例如：", (v) => v.exzl !== "是"],
        ],
      },
    },
    "家族史": {  // tuple
      name: "family_history",
      fields: ["sfexzl", "xqs", "hbqs", "rxa", "lca", "qtexzl"],
      columns: ["是否有恶性肿瘤家族史", "x级亲属", "患病亲属", "乳腺癌家族史", "卵巢癌家族史", "其他恶性肿瘤家族史"],
      uploadParams: {
        name: "家族史上传表",
        api: "familyhistory",
        fields: ["sfexzl", "xqs", "hbqs", "rxa", "lca", "qtexzl"],
        columns: ["是否有恶性肿瘤家族史", "x级亲属", "患病亲属", "乳腺癌家族史", "卵巢癌家族史", "其他恶性肿瘤家族史"],
        validations: [
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
        ],
        functions: [
          getSelectFormField,
          getSelectFormField,
          getSelectFormFieldRely,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
        ],
        params: [
          [(v) => ["是", "否"], (v) => false],
          [(v) => ["一级亲属", "二级亲属", "三级亲属"], (v) => v.sfexzl !== "是"],
          [(v) => familyMembers[v.xqs], (v) => v.xqs,(v) => v.sfexzl !== "是" || !["一级亲属", "二级亲属", "三级亲属"].includes(v.xqs)],
          ["例如：", (v) => v.sfexzl !== "是"],
          ["例如：", (v) => v.sfexzl !== "是"],
          ["例如：", (v) => v.sfexzl !== "是"],
          ["例如：", (v) => v.sfexzl !== "是"],
        ],
      }
    },
  },
  "四、患者临床特征": {
    "症状": {
      name: "patient_symptom",
      fields: ["fxwz", "zkwz", "lcsfzz", "sfzzjtms", "hcrt", "hcrtjtms", "hcpf", "hcpfjtms", "yydg", "yyxz", "yyxzjtms"],
      columns: ["发现方式", "肿瘤位置", "有无临床首发症状", "首发症状具体描述", "患侧乳头", "患侧乳头症状具体描述", "患侧皮肤", "患侧皮肤症状具体描述", "乳头溢液导管数量", "溢液性质", "溢液性质具体描述",],
      uploadParams: {
        name: "(一) 患者症状",
        api: "symptom",
        fields: ["fxwz", "zkwz", "lcsfzz", "sfzzjtms", "hcrt", "hcrtjtms", "hcpf", "hcpfjtms", "yydg", "yyxz", "yyxzjtms"],
        columns: ["发现方式", "肿瘤位置", "有无临床首发症状", "首发症状具体描述", "患侧乳头", "患侧乳头症状具体描述", "患侧皮肤", "患侧皮肤症状具体描述", "乳头溢液导管数量", "溢液性质", "溢液性质具体描述",],
        validations: [
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),],
        functions: [
          getSelectFormField,
          getSelectFormField,
          getSelectFormField,
          getFormField,
          getSelectFormField,
          getFormField,
          getSelectFormField,
          getFormField,
          getSelectFormField,
          getSelectFormField,
          getFormField,
        ],
        params: [
          [(v) => ["自查", "体检", "其他"], (v) => false],
          [(v) => ["右乳", "左乳", "双乳", "腋窝区域", "不详"], (v) => false],
          [(v) => ["肿块", "乳头溢液", "其他首发症状"], (v) => false],
          ["例如：", (v) => false],
          [(v) => ["正常", "凹陷", "半固定", "固定", "湿疹样", "乳头皴裂", "乳头缺如", "其他"], (v) => false],
          ["例如：", (v) => false],
          [(v) => ["正常", "水肿", "卫星结节", "破溃", "桔皮样变", "炎样红肿", "静脉曲张", "其他"], (v) => false],
          ["例如：", (v) => false],
          [(v) => ["单个", "多个", "不详"], (v) => v.lcsfzz !== "乳头溢液"],
          [(v) => ["陈旧血性", "新鲜血性", "淡黄", "乳汁样", "水样", "脓性", "其他"], (v) => v.lcsfzz !== "乳头溢液"],
          ["例如：", (v) => v.lcsfzz !== "乳头溢液"],
        ],
      }
    },
    "影像": {
      name: "patient_images",
      fields: ["yxjclx", "yxjch", "yxjcrq", "zldx", "ywlbjzysp", "ywlbjdx", "jblbjdx", "sfygh", "BIRADS", 'jtms'],
      columns: ["影像检查类型", "影像检查号", "影像检查日期", "肿瘤大小(厘米)", "腋窝淋巴结转移水平", "腋窝淋巴结大小（厘米）", "颈部淋巴结大小（厘米）", "是否有钙化", "BI-RADS分级", "具体描述"],
      uploadParams: {
        name: "(二) 影像表现",
        api: "pimages",
        fields: ["yxjclx", "yxjch", "yxjcrq", "zldx", "ywlbjzysp", "ywlbjdx", "jblbjdx", "sfygh", "BIRADS", 'jtms'],
        columns: ["影像检查类型", "影像检查号", "影像检查日期", "肿瘤大小(厘米)", "腋窝淋巴结转移水平", "腋窝淋巴结大小（厘米）", "颈部淋巴结大小（厘米）", "是否有钙化", "BI-RADS分级", "具体描述"],
        validations: [
          Yup.string().required(requiredMessage),
          Yup.number().positive(notPositiveNumberError).integer(notIntegerError),
          Yup.string().required(requiredMessage),
          Yup.number().min(0,notPositiveNumberError),
          Yup.string(),
          Yup.number().min(0,notPositiveNumberError),
          Yup.number().min(0,notPositiveNumberError),
          Yup.string(),
          Yup.string().required(requiredMessage),
          Yup.string(),
        ],
        functions: [getSelectFormField,
          getFormField,
          getDateFormField,
          getFormField,
          getSelectFormField,
          getFormField,
          getFormField,
          getSelectFormField,
          getSelectFormField,
          getFormField],
        params: [
          [(v) => ["b超", "钼靶", "核磁"], (v) => false],
          ["例如：123", (v) => false],
          [(v) => false],
          ["例如：1", (v) => false],
          [(v) => ["腋下Ⅰ水平", "腋下Ⅱ水平", "腋窝Ⅲ水平", "锁骨下", "锁骨上", "乳内淋巴结"], (v) => false],
          ["例如：1", (v) => false],
          ["例如：1", (v) => false],
          [(v) => ['是', '否', '不详'], (v) => v.yxjclx !== "钼靶"],
          [(v) => ['0', '1', '2', '3', '4A', '4B', '4C', '5', '6'], (v) => false],
          [`具体描述影像内容`, (v) => false],
        ],
      }
    },
    "分期": {
      name: "patient_stages",
      fields: ['tfq', 'nfq', 'mfq', 'tnmfq'],
      columns: ['T分期', 'N分期', 'M分期', 'TNM分期'],
      uploadParams: {
        name: '(三) TNM分期',
        api: 'tnm',
        fields: ['tfq', 'nfq', 'mfq', 'tnmfq'],
        columns: ['T分期', 'N分期', 'M分期', 'TNM分期（自动填）'],
        validations: [
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string(),
        ],
        functions: [
          getSelectFormField,
          getSelectFormField,
          getSelectFormField,
          getFormFieldInherited,
        ],
        params: [
          [(v) => ["T0/Tis", "T1", "T2", "T3", "T4"], (v) => false],
          [(v) => ["N0", "N1", "N2", "N3"], (v) => false],
          [(v) => ["M0", "M1"], (v) => false],
          [(v) => {
            // todo
            if (v.mfq === 'M1') {
              return 'IV'
            }
            else if (v.mfq === 'M0') {
              if (v.nfq === 'N3') {
                return 'IIIC'
              }
              else if (v.tfq === 'T4') {
                return 'IIIB'
              }
              else if (v.nfq === 'N2' || (v.nfq === 'N1' && v.tfq === 'T3')) {
                return 'IIIA'
              }
              else if ((v.nfq === 'N1' && v.tfq == 'T2') || (v.nfq === 'N0' && v.tfq == 'T3')) {
                return 'IIB'
              }
              else if (v.nfq === 'N1' || (v.nfq === 'N0' && v.tfq === 'T2')) {
                return 'IIA'
              }
              else if (v.tfq == 'T1' && v.nfq == 'N0') {
                return 'IA'
              }else if (v.tfq === 'T0/Tis' && v.nfq === 'N0'){
                return '0'
              }
            }
            return "Unknown";
          }, (v) => true],
        ],
      }
    },
    "病理": {
      name: "patient_pathology",
      fields: ['bzsl','bzxq'],
      columns: ['病灶数量', '病灶详情'],
      uploadParams: {
        name: "（四）病灶穿刺/活检病理信息",
        api: "pathology",
        fields: ['bzsl','bzxq'],
        columns: ['病灶数量', '病灶详情'],
        validations: [
          Yup.number().min(0, notPositiveNumberError),
          Yup.array().min(1, "至少上传一个病灶").required(requiredMessage),
        ],
        functions: [
          getFormField,
          getDetailsFormField,
        ],
        params:[
          ["例如：123", (v) => false],
          [ {
            index: 'bzmc',
            names: ["bzmc","bzwz","bzqzfs", "bzblh", "bzblxx", "sfxmyzh", "er", "erqd", "pr", "prqd", "her2", "her2jtqk", "ki67", "ki67qd", "p53", "p53qd", "fish", "fishjtqk", "fcopy", "fratio"],
            columns: ["病灶名称","病灶位置","病灶确诊方式", "病灶病理号", "病灶病理信息", "是否行免疫组化", "穿刺ER(%)", "ER着色强度", "穿刺PR(%)", "PR着色强度", "穿刺HER-2", "穿刺HER-2具体情况", "穿刺Ki67(%)", "Ki67着色强度", "穿刺P53(%)", "P53着色强度", "FISH", "FISH具体情况", "FISH copy数", "FISH ratio"],
            validations: [
              Yup.string().required("需要将病灶名称作为唯一标识符"),  // 病灶名称
              Yup.string().required(requiredMessage),  // 病灶位置
              Yup.string().required(requiredMessage),  // 病灶确诊方式
              Yup.string().required(requiredMessage),  // 病灶病理号
              Yup.string(), // 病灶病理信息
              Yup.string().required(requiredMessage), // 是否行免疫组化
              Yup.number().min(0, "ER值必须大于0").max(100, "ER值必须小于100"), // 穿刺ER(%)
              Yup.string(), // ER着色强度
              Yup.number().min(0, "PR值必须大于0").max(101, "PR值必须小于100"), // 穿刺PR(%)
              Yup.string(), // PR着色强度
              Yup.string(), // 穿刺HER-2
              Yup.string(), // 穿刺HER-2具体情况
              Yup.number(), // 穿刺Ki67
              Yup.string(), // Ki67着色强度
              Yup.number(), // 穿刺P53
              Yup.string(), // P53着色强度
              Yup.string(), // FISH
              Yup.string(), // FISH具体情况
              Yup.number(), // FISH copy数
              Yup.string(), // FISH ratio
            ],
            functions: [
              getFormField,
              getSelectFormField,  // 病灶位置
              getSelectFormField,  // 病灶确诊方式
              getFormField,  // 病灶病理号
              getFormField, // 病灶病理信息
              getSelectFormField, // 是否行免疫组化
              getFormField, // 穿刺ER(%)
              getSelectFormField, // ER着色强度
              getFormField, //穿刺PR(%)
              getSelectFormField, // PR着色强度
              getSelectFormField, //穿刺HER-2
              getFormField, // 穿刺HER-2具体情况
              getFormField, // 穿刺Ki67
              getSelectFormField, // Ki67着色强度
              getFormField, //穿刺P53
              getSelectFormField, // P53着色强度
              getSelectFormField, //FISH
              getFormField, //FISH具体情况
              getFormField, //FISH copy数
              getFormField, //FISH ratio
            ],
            params: [
              ["病灶名称确保唯一", (v) => false],  // 病灶病理号
              [(v) => ["肿瘤", "腋窝", "颈部", "远处"], (v) => false], // 病灶位置
              [(v) => ["术前开放活检", "术中开放活检", "穿刺粗针吸", "穿刺细针吸"], (v) => false],  // 病灶确诊方式
              ["例如：123", (v) => false],  // 病灶病理号
              ["例如：", (v) => false], // 病灶病理信息
              [(v) => ["是", "否"], (v) => false], // 是否行免疫组化
              ["请输入百分比", (v) => v.sfxmyzh !== "是"], // 穿刺ER(%)
              [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => v.sfxmyzh !== "是"], // ER着色强度
              ["请输入百分比", (v) => v.sfxmyzh !== "是"], //穿刺PR(%)
              [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => v.sfxmyzh !== "是"], // PR着色强度
              [(v) => ["阴性", "1+", "2+且FISH阴性", "2+且FISH阳性", "2+未做FISH", "3+", "其他"], (v) => v.sfxmyzh !== "是"], //穿刺HER-2
              ["穿刺HER-2具体情况", (v) => v.sfxmyzh !== "是"], // 穿刺ER(%), // 穿刺HER-2具体情况
              ["请输入百分比", (v) => v.sfxmyzh !== "是"], // 穿刺Ki67
              [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => v.sfxmyzh !== "是"], // Ki67着色强度
              ["请输入百分比", (v) => v.sfxmyzh !== "是"], //穿刺P53
              [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => v.sfxmyzh !== "是"], // P53着色强度
              [(v) => ["阴性", "阳性"], (v) => v.sfxmyzh !== "是"], //FISH
              ["FISH具体情况", (v) => v.sfxmyzh !== "是"], //FISH具体情况
              ["FISH copy数", (v) => v.sfxmyzh !== "是"], //FISH copy数
              ["FISH ratio", (v) => v.sfxmyzh !== "是"], //FISH ratio
            ]
          },(v) => false]
        ],
      }
    },
    // "肿瘤病理": {
    //   name: "patient_pathology_carcinoma",
    //   fields: ["zlbzqzfs", "zlbzblh", "zlbzblxx", "sfxmyzh", "er", "erqd", "pr", "prqd", "her2", "her2jtqk", "ki67", "ki67qd", "p53", "p53qd", "fish", "fishjtqk", "fcopy", "fratio"],
    //   columns: ["肿瘤病灶确诊方式", "肿瘤病灶病理号", "肿瘤病灶病理信息", "是否行免疫组化", "穿刺ER(%)", "ER着色强度", "穿刺PR(%)", "PR着色强度", "穿刺HER-2", "穿刺HER-2具体情况", "穿刺Ki67(%)", "Ki67着色强度", "穿刺P53(%)", "P53着色强度", "FISH", "FISH具体情况", "FISH copy数", "FISH ratio"],
    //   uploadParams: {
    //     name: "（四）肿瘤病灶穿刺/活检病理信息",
    //     api: "patient_pathology_carcinoma",
    //     fields: ["zlbzqzfs", "zlbzblh", "zlbzblxx", "sfxmyzh", "er", "erqd", "pr", "prqd", "her2", "her2jtqk", "ki67", "ki67qd", "p53", "p53qd", "fish", "fishjtqk", "fcopy", "fratio"],
    //     columns: ["肿瘤病灶确诊方式", "肿瘤病灶病理号", "肿瘤病灶病理信息", "是否行免疫组化", "穿刺ER(%)", "ER着色强度", "穿刺PR(%)", "PR着色强度", "穿刺HER-2", "穿刺HER-2具体情况", "穿刺Ki67(%)", "Ki67着色强度", "穿刺P53(%)", "P53着色强度", "FISH", "FISH具体情况", "FISH copy数", "FISH ratio"],
    //     validations: [
    //       Yup.string().required(requiredMessage),  // 肿瘤病灶确诊方式
    //       Yup.string().required(requiredMessage),  // 肿瘤病灶病理号
    //       Yup.string(), // 肿瘤病灶病理信息
    //       Yup.string().required(requiredMessage), // 是否行免疫组化
    //       Yup.number().moreThan(0, "ER值必须大于0").lessThan(101, "ER值必须小于100"), // 穿刺ER(%)
    //       Yup.string(), // ER着色强度
    //       Yup.number().moreThan(0, "PR值必须大于0").lessThan(101, "PR值必须小于100"), // 穿刺PR(%)
    //       Yup.string(), // PR着色强度
    //       Yup.string(), // 穿刺HER-2
    //       Yup.string(), // 穿刺HER-2具体情况
    //       Yup.number(), // 穿刺Ki67
    //       Yup.string(), // Ki67着色强度
    //       Yup.number(), // 穿刺P53
    //       Yup.string(), // P53着色强度
    //       Yup.string(), // FISH
    //       Yup.string(), // FISH具体情况
    //       Yup.number(), // FISH copy数
    //       Yup.string(), // FISH ratio
    //     ],
    //     functions: [
    //       getSelectFormField,  // 肿瘤病灶确诊方式
    //       getFormField,  // 肿瘤病灶病理号
    //       getFormField, // 肿瘤病灶病理信息
    //       getSelectFormField, // 是否行免疫组化
    //       getFormField, // 穿刺ER(%)
    //       getSelectFormField, // ER着色强度
    //       getFormField, //穿刺PR(%)
    //       getSelectFormField, // PR着色强度
    //       getSelectFormField, //穿刺HER-2
    //       getFormField, // 穿刺HER-2具体情况
    //       getFormField, // 穿刺Ki67
    //       getSelectFormField, // Ki67着色强度
    //       getFormField, //穿刺P53
    //       getSelectFormField, // P53着色强度
    //       getSelectFormField, //FISH
    //       getFormField, //FISH具体情况
    //       getFormField, //FISH copy数
    //       getFormField, //FISH ratio
    //     ],
    //     params: [
    //       [(v) => ["术前开放活检", "术中开放活检", "穿刺粗针吸", "穿刺细针吸"], (v) => false],  // 肿瘤病灶确诊方式
    //       ["例如：123", (v) => false],  // 肿瘤病灶病理号
    //       ["例如：", (v) => false], // 肿瘤病灶病理信息
    //       [(v) => ["是", "否"], (v) => false], // 是否行免疫组化
    //       ["请输入百分比", (v) => v.sfxmyzh !== "是"], // 穿刺ER(%)
    //       [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => v.sfxmyzh !== "是"], // ER着色强度
    //       ["请输入百分比", (v) => v.sfxmyzh !== "是"], //穿刺PR(%)
    //       [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => v.sfxmyzh !== "是"], // PR着色强度
    //       [(v) => ["阴性", "1+", "2+且FISH阴性", "2+且FISH阳性", "2+未做FISH", "3+", "其他"], (v) => v.sfxmyzh !== "是"], //穿刺HER-2
    //       ["穿刺HER-2具体情况", (v) => v.sfxmyzh !== "是"], // 穿刺ER(%), // 穿刺HER-2具体情况
    //       ["请输入百分比", (v) => v.sfxmyzh !== "是"], // 穿刺Ki67
    //       [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => v.sfxmyzh !== "是"], // Ki67着色强度
    //       ["请输入百分比", (v) => v.sfxmyzh !== "是"], //穿刺P53
    //       [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => v.sfxmyzh !== "是"], // P53着色强度
    //       [(v) => ["阴性", "阳性"], (v) => v.sfxmyzh !== "是"], //FISH
    //       ["FISH具体情况", (v) => v.sfxmyzh !== "是"], //FISH具体情况
    //       ["FISH copy数", (v) => v.sfxmyzh !== "是"], //FISH copy数
    //       ["FISH ratio", (v) => v.sfxmyzh !== "是"], //FISH ratio
    //     ]
    //   }
    // },
    // "腋窝病理": {
    //   name: "patient_pathology_armpit",
    //   fields: ["ywbzqzfs", "ywbzblh", "ywbzblxx", "sfxmyzh", "er", "erqd", "pr", "prqd", "her2", "her2jtqk", "ki67", "ki67qd", "p53", "p53qd", "fish", "fishjtqk", "fcopy", "fratio"],
    //   columns: ["腋窝病灶确诊方式", "腋窝病灶病理号", "腋窝病灶病理信息", "是否行免疫组化", "穿刺ER(%)", "ER着色强度", "穿刺PR(%)", "PR着色强度", "穿刺HER-2", "穿刺HER-2具体情况", "穿刺Ki67(%)", "Ki67着色强度", "穿刺P53(%)", "P53着色强度", "FISH", "FISH具体情况", "FISH copy数", "FISH ratio"],
    //   uploadParams: {
    //     name: "（五）腋窝病灶穿刺/活检病理信息",
    //     api: "patient_pathology_armpit",
    //     fields: ["ywbzqzfs", "ywbzblh", "ywbzblxx", "sfxmyzh", "er", "erqd", "pr", "prqd", "her2", "her2jtqk", "ki67", "ki67qd", "p53", "p53qd", "fish", "fishjtqk", "fcopy", "fratio"],
    //     columns: ["腋窝病灶确诊方式", "腋窝病灶病理号", "腋窝病灶病理信息", "是否行免疫组化", "穿刺ER(%)", "ER着色强度", "穿刺PR(%)", "PR着色强度", "穿刺HER-2", "穿刺HER-2具体情况", "穿刺Ki67(%)", "Ki67着色强度", "穿刺P53(%)", "P53着色强度", "FISH", "FISH具体情况", "FISH copy数", "FISH ratio"],
    //     validations: [
    //       Yup.string().required(requiredMessage),  // 腋窝病灶确诊方式
    //       Yup.string().required(requiredMessage),  // 腋窝病灶病理号
    //       Yup.string(), // 腋窝病灶病理信息
    //       Yup.string().required(requiredMessage), // 是否行免疫组化
    //       Yup.number().moreThan(0, "ER值必须大于0").lessThan(101, "ER值必须小于100"), // 穿刺ER(%)
    //       Yup.string(), // ER着色强度
    //       Yup.number().moreThan(0, "PR值必须大于0").lessThan(101, "PR值必须小于100"), // 穿刺PR(%)
    //       Yup.string(), // PR着色强度
    //       Yup.string(), //穿刺HER-2
    //       Yup.string(), // 穿刺HER-2具体情况
    //       Yup.number(), // 穿刺Ki67
    //       Yup.string(), // Ki67着色强度
    //       Yup.number(), // 穿刺P53
    //       Yup.string(), // P53着色强度
    //       Yup.string(), //FISH
    //       Yup.string(), //FISH具体情况
    //       Yup.number(), //FISH copy数
    //       Yup.string(), //FISH ratio
    //     ],
    //     functions: [
    //       getSelectFormField,  // 腋窝病灶确诊方式
    //       getFormField,  // 腋窝病灶病理号
    //       getFormField, // 腋窝病灶病理信息
    //       getSelectFormField, // 是否行免疫组化
    //       getFormField, // 穿刺ER(%)
    //       getSelectFormField, // ER着色强度
    //       getFormField, //穿刺PR(%)
    //       getSelectFormField, // PR着色强度
    //       getSelectFormField, //穿刺HER-2
    //       getFormField, // 穿刺HER-2具体情况
    //       getFormField, // 穿刺Ki67
    //       getSelectFormField, // Ki67着色强度
    //       getFormField, //穿刺P53
    //       getSelectFormField, // P53着色强度
    //       getSelectFormField, //FISH
    //       getFormField, //FISH具体情况
    //       getFormField, //FISH copy数
    //       getFormField, //FISH ratio
    //     ],
    //     params: [
    //       [(v) => ["术前开放活检", "术中开放活检", "穿刺粗针吸", "穿刺细针吸"], (v) => false],  // 腋窝病灶确诊方式
    //       ["例如：123", (v) => false],  // 腋窝病灶病理号
    //       ["例如：", (v) => false], // 腋窝病灶病理信息
    //       [(v) => ["是", "否"], (v) => false], // 是否行免疫组化
    //       ["请输入百分比", (v) => v.sfxmyzh !== "是"], // 穿刺ER(%)
    //       [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => v.sfxmyzh !== "是"], // ER着色强度
    //       ["请输入百分比", (v) => v.sfxmyzh !== "是"], //穿刺PR(%)
    //       [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => v.sfxmyzh !== "是"], // PR着色强度
    //       [(v) => ["阴性", "1+", "2+且FISH阴性", "2+且FISH阳性", "2+未做FISH", "3+", "其他"], (v) => v.sfxmyzh !== "是"], //穿刺HER-2
    //       ["穿刺HER-2具体情况", (v) => v.sfxmyzh !== "是"], // 穿刺ER(%), // 穿刺HER-2具体情况
    //       ["请输入百分比", (v) => v.sfxmyzh !== "是"], // 穿刺Ki67
    //       [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => v.sfxmyzh !== "是"], // Ki67着色强度
    //       ["请输入百分比", (v) => v.sfxmyzh !== "是"], //穿刺P53
    //       [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => v.sfxmyzh !== "是"], // P53着色强度
    //       [(v) => ["阴性", "阳性"], (v) => v.sfxmyzh !== "是"], //FISH
    //       ["FISH具体情况", (v) => v.sfxmyzh !== "是"], //FISH具体情况
    //       ["FISH copy数", (v) => v.sfxmyzh !== "是"], //FISH copy数
    //       ["FISH ratio", (v) => v.sfxmyzh !== "是"], //FISH ratio
    //     ]
    //   }
    // },
    // "颈部病理": {
    //   name: "patient_pathology_neck",
    //   fields: ["jbbzqzfs", "jbbzblh", "jbbzblxx", "sfxmyzh", "er", "erqd", "pr", "prqd", "her2", "her2jtqk", "ki67", "ki67qd", "p53", "p53qd", "fish", "fishjtqk", "fcopy", "fratio"],
    //   columns: ["颈部病灶确诊方式", "颈部病灶病理号", "颈部病灶病理信息", "是否行免疫组化", "穿刺ER(%)", "ER着色强度", "穿刺PR(%)", "PR着色强度", "穿刺HER-2", "穿刺HER-2具体情况", "穿刺Ki67(%)", "Ki67着色强度", "穿刺P53(%)", "P53着色强度", "FISH", "FISH具体情况", "FISH copy数", "FISH ratio"],
    //   uploadParams: {
    //     name: "（六）颈部病灶穿刺/活检病理信息",
    //     api: "patient_pathology_neck",
    //     fields: ["jbbzqzfs", "jbbzblh", "jbbzblxx", "sfxmyzh", "er", "erqd", "pr", "prqd", "her2", "her2jtqk", "ki67", "ki67qd", "p53", "p53qd", "fish", "fishjtqk", "fcopy", "fratio"],
    //     columns: ["颈部病灶确诊方式", "颈部病灶病理号", "颈部病灶病理信息", "是否行免疫组化", "穿刺ER(%)", "ER着色强度", "穿刺PR(%)", "PR着色强度", "穿刺HER-2", "穿刺HER-2具体情况", "穿刺Ki67(%)", "Ki67着色强度", "穿刺P53(%)", "P53着色强度", "FISH", "FISH具体情况", "FISH copy数", "FISH ratio"],
    //     validations: [
    //       Yup.string().required(requiredMessage),  // 颈部病灶确诊方式
    //       Yup.string().required(requiredMessage),  // 颈部病灶病理号
    //       Yup.string(), // 颈部病灶病理信息
    //       Yup.string().required(requiredMessage), // 是否行免疫组化
    //       Yup.number().moreThan(0, "ER值必须大于0").lessThan(101, "ER值必须小于100"), // 穿刺ER(%)
    //       Yup.string(), // ER着色强度
    //       Yup.number().moreThan(0, "PR值必须大于0").lessThan(101, "PR值必须小于100"), // 穿刺PR(%)
    //       Yup.string(), // PR着色强度
    //       Yup.string(), //穿刺HER-2
    //       Yup.string(), // 穿刺HER-2具体情况
    //       Yup.number(), // 穿刺Ki67
    //       Yup.string(), // Ki67着色强度
    //       Yup.number(), // 穿刺P53
    //       Yup.string(), // P53着色强度
    //       Yup.string(), //FISH
    //       Yup.string(), //FISH具体情况
    //       Yup.number(), //FISH copy数
    //       Yup.string(), //FISH ratio
    //     ],
    //     functions: [
    //       getSelectFormField,  // 颈部病灶确诊方式
    //       getFormField,  // 颈部病灶病理号
    //       getFormField, // 颈部病灶病理信息
    //       getSelectFormField, // 是否行免疫组化
    //       getFormField, // 穿刺ER(%)
    //       getSelectFormField, // ER着色强度
    //       getFormField, //穿刺PR(%)
    //       getSelectFormField, // PR着色强度
    //       getSelectFormField, //穿刺HER-2
    //       getFormField, // 穿刺HER-2具体情况
    //       getFormField, // 穿刺Ki67
    //       getSelectFormField, // Ki67着色强度
    //       getFormField, //穿刺P53
    //       getSelectFormField, // P53着色强度
    //       getSelectFormField, //FISH
    //       getFormField, //FISH具体情况
    //       getFormField, //FISH copy数
    //       getFormField, //FISH ratio
    //     ],
    //     params: [
    //       [(v) => ["术前开放活检", "术中开放活检", "穿刺粗针吸", "穿刺细针吸"], (v) => false],  // 颈部病灶确诊方式
    //       ["例如：123", (v) => false],  // 颈部病灶病理号
    //       ["例如：", (v) => false], // 颈部病灶病理信息
    //       [(v) => ["是", "否"], (v) => false], // 是否行免疫组化
    //       ["请输入百分比", (v) => v.sfxmyzh !== "是"], // 穿刺ER(%)
    //       [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => v.sfxmyzh !== "是"], // ER着色强度
    //       ["请输入百分比", (v) => v.sfxmyzh !== "是"], //穿刺PR(%)
    //       [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => v.sfxmyzh !== "是"], // PR着色强度
    //       [(v) => ["阴性", "1+", "2+且FISH阴性", "2+且FISH阳性", "2+未做FISH", "3+", "其他"], (v) => v.sfxmyzh !== "是"], //穿刺HER-2
    //       ["穿刺HER-2具体情况", (v) => v.sfxmyzh !== "是"], // 穿刺ER(%), // 穿刺HER-2具体情况
    //       ["请输入百分比", (v) => v.sfxmyzh !== "是"], // 穿刺Ki67
    //       [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => v.sfxmyzh !== "是"], // Ki67着色强度
    //       ["请输入百分比", (v) => v.sfxmyzh !== "是"], //穿刺P53
    //       [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => v.sfxmyzh !== "是"], // P53着色强度
    //       [(v) => ["阴性", "阳性"], (v) => v.sfxmyzh !== "是"], //FISH
    //       ["FISH具体情况", (v) => v.sfxmyzh !== "是"], //FISH具体情况
    //       ["FISH copy数", (v) => v.sfxmyzh !== "是"], //FISH copy数
    //       ["FISH ratio", (v) => v.sfxmyzh !== "是"], //FISH ratio
    //     ]
    //   }
    // },
    // "远处病理": {
    //   name: "patient_pathology_distance",
    //   fields: ["ycbzqzfs", "ycbzblh", "ycbzblxx", "sfxmyzh", "er", "erqd", "pr", "prqd", "her2", "her2jtqk", "ki67", "ki67qd", "p53", "p53qd", "fish", "fishjtqk", "fcopy", "fratio"],
    //   columns: ["远处病灶确诊方式", "远处病灶病理号", "远处病灶病理信息", "是否行免疫组化", "穿刺ER(%)", "ER着色强度", "穿刺PR(%)", "PR着色强度", "穿刺HER-2", "穿刺HER-2具体情况", "穿刺Ki67(%)", "Ki67着色强度", "穿刺P53(%)", "P53着色强度", "FISH", "FISH具体情况", "FISH copy数", "FISH ratio"],
    //   uploadParams: {
    //     name: "（七）远处病灶穿刺/活检病理信息",
    //     api: "patient_pathology_distance",
    //     fields: ["ycbzqzfs", "ycbzblh", "ycbzblxx", "sfxmyzh", "er", "erqd", "pr", "prqd", "her2", "her2jtqk", "ki67", "ki67qd", "p53", "p53qd", "fish", "fishjtqk", "fcopy", "fratio"],
    //     columns: ["远处病灶确诊方式", "远处病灶病理号", "远处病灶病理信息", "是否行免疫组化", "穿刺ER(%)", "ER着色强度", "穿刺PR(%)", "PR着色强度", "穿刺HER-2", "穿刺HER-2具体情况", "穿刺Ki67(%)", "Ki67着色强度", "穿刺P53(%)", "P53着色强度", "FISH", "FISH具体情况", "FISH copy数", "FISH ratio"],
    //     validations: [
    //       Yup.string().required(requiredMessage),  // 远处病灶确诊方式
    //       Yup.string().required(requiredMessage),  // 远处病灶病理号
    //       Yup.string(), // 远处病灶病理信息
    //       Yup.string().required(requiredMessage), // 是否行免疫组化
    //       Yup.number().moreThan(0, "ER值必须大于0").lessThan(101, "ER值必须小于100"), // 穿刺ER(%)
    //       Yup.string(), // ER着色强度
    //       Yup.number().moreThan(0, "PR值必须大于0").lessThan(101, "PR值必须小于100"), // 穿刺PR(%)
    //       Yup.string(), // PR着色强度
    //       Yup.string(), //穿刺HER-2
    //       Yup.string(), // 穿刺HER-2具体情况
    //       Yup.number(), // 穿刺Ki67
    //       Yup.string(), // Ki67着色强度
    //       Yup.number(), // 穿刺P53
    //       Yup.string(), // P53着色强度
    //       Yup.string(), //FISH
    //       Yup.string(), //FISH具体情况
    //       Yup.number(), //FISH copy数
    //       Yup.string(), //FISH ratio
    //     ],
    //     functions: [
    //       getSelectFormField,  // 远处病灶确诊方式
    //       getFormField,  // 远处病灶病理号
    //       getFormField, // 远处病灶病理信息
    //       getSelectFormField, // 是否行免疫组化
    //       getFormField, // 穿刺ER(%)
    //       getSelectFormField, // ER着色强度
    //       getFormField, //穿刺PR(%)
    //       getSelectFormField, // PR着色强度
    //       getSelectFormField, //穿刺HER-2
    //       getFormField, // 穿刺HER-2具体情况
    //       getFormField, // 穿刺Ki67
    //       getSelectFormField, // Ki67着色强度
    //       getFormField, //穿刺P53
    //       getSelectFormField, // P53着色强度
    //       getSelectFormField, //FISH
    //       getFormField, //FISH具体情况
    //       getFormField, //FISH copy数
    //       getFormField, //FISH ratio
    //     ],
    //     params: [
    //       [(v) => ["术前开放活检", "术中开放活检", "穿刺粗针吸", "穿刺细针吸"], (v) => false],  // 远处病灶确诊方式
    //       ["例如：123", (v) => false],  // 远处病灶病理号
    //       ["例如：", (v) => false], // 远处病灶病理信息
    //       [(v) => ["是", "否"], (v) => false], // 是否行免疫组化
    //       ["请输入百分比", (v) => v.sfxmyzh !== "是"], // 穿刺ER(%)
    //       [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => v.sfxmyzh !== "是"], // ER着色强度
    //       ["请输入百分比", (v) => v.sfxmyzh !== "是"], //穿刺PR(%)
    //       [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => v.sfxmyzh !== "是"], // PR着色强度
    //       [(v) => ["阴性", "1+", "2+且FISH阴性", "2+且FISH阳性", "2+未做FISH", "3+", "其他"], (v) => v.sfxmyzh !== "是"], //穿刺HER-2
    //       ["穿刺HER-2具体情况", (v) => v.sfxmyzh !== "是"], // 穿刺ER(%), // 穿刺HER-2具体情况
    //       ["请输入百分比", (v) => v.sfxmyzh !== "是"], // 穿刺Ki67
    //       [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => v.sfxmyzh !== "是"], // Ki67着色强度
    //       ["请输入百分比", (v) => v.sfxmyzh !== "是"], //穿刺P53
    //       [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => v.sfxmyzh !== "是"], // P53着色强度
    //       [(v) => ["阴性", "阳性"], (v) => v.sfxmyzh !== "是"], //FISH
    //       ["FISH具体情况", (v) => v.sfxmyzh !== "是"], //FISH具体情况
    //       ["FISH copy数", (v) => v.sfxmyzh !== "是"], //FISH copy数
    //       ["FISH ratio", (v) => v.sfxmyzh !== "是"], //FISH ratio
    //     ]
    //   }
    // },
    // "患者临床特征": {
    //   name: "clinical_feature",
    //   fields: ["fxwz", "zkwz", "lcsfzz", "sfzzjtms", "hcrt", "hcrtjtms", "hcpf", "hcpfjtms", "rtyy", "yydg", "yyxz", "yyxzjtms", "yxjclx", "yxjch", "sqzldx", "sqtfq", "sqyxlbjwz", "sqyxlbjdx", "sqnfq", "yczy", "zybw", "jtzybw", "tnm", "zlbzqzfs", "lbjqzfs", "qzblh", "sfxmyzh", "er", "pr", "her2", "her2jtqk", "ki67", "p53", "fish", "fishjtqk", "fcopy", "fratio", "ywlbjer", "ywlbjpr", "ywlbjher2", "ywlbjher2jtqk", "ywlbjki67", "ywlbjp53", "ywlbjfish", "ywlbjfishjtqk", "ywlbjfcopy", "ywlbjfratio", "jblbjer", "jblbjpr", "jblbjher2", "jblbjher2jtqk", "jblbjki67", "jblbjp53", "jblbjfish", "jblbjfishjtqk", "jblbjfcopy", "jblbjfratio", "yczyqzbw", "yczyer", "yczypr", "yczyher2", "yczyher2jtqk", "yczyki67", "yczyp53", "yczyfish", "yczyfishjtqk", "yczyfcopy", "yczyfratio", "xfzzl", "xfzzlkssj", "xfzzlfa", "xfzlc", "xfzlcyw", "xfzzlpg", "xfzzlpj", "jjzl", "sqzlkssj", "sqzlfa", "jjlc", "jjlcyw", "sqzlpg", "sqzlpj"],
    //   columns: ["发现方式", "肿瘤位置", "有无临床首发症状", "首发症状具体描述", "患侧乳头", "患侧乳头症状具体描述", "患侧皮肤", "患侧皮肤症状具体描述", "乳头溢液", "溢液导管", "溢液性质", "溢液性质具体描述", "影像检查类型", "影像检查号", "术前影像肿瘤大小", "术前T分期", "术前影像腋下淋巴结位置", "术前影像腋下淋巴结大小", "术前N分期", "M分期", "转移部位", "具体转移部位", "临床TNM分期", "肿瘤病灶确诊方式", "淋巴结确诊方式", "确诊病理信息", "是否行免疫组化", "肿瘤病灶穿刺ER", "肿瘤病灶穿刺PR", "肿瘤病灶穿刺Her2", "肿瘤病灶穿刺Her2具体情况", "肿瘤病灶穿刺Ki67", "肿瘤病灶穿刺P53", "肿瘤病灶FISH", "肿瘤病灶FISH具体情况", "肿瘤病灶FISH copy数", "肿瘤病灶FISH ratio", "腋窝淋巴结穿刺ER", "腋窝淋巴结穿刺PR", "腋窝淋巴结穿刺Her2", "腋窝淋巴结穿刺Her2具体情况", "腋窝淋巴结穿刺Ki67", "腋窝淋巴结穿刺P53", "腋窝淋巴结FISH", "腋窝淋巴结FISH具体情况", "腋窝淋巴结FISH copy数", "腋窝淋巴结FISH ratio", "颈部淋巴结穿刺ER", "颈部淋巴结穿刺PR", "颈部淋巴结穿刺Her2", "颈部淋巴结穿刺Her2具体情况", "颈部淋巴结穿刺Ki67", "颈部淋巴结穿刺P53", "颈部淋巴结FISH", "颈部淋巴结FISH具体情况", "颈部淋巴结FISHcopy数", "颈部淋巴结FISHratio", "远处转移确诊部位", "远处转移灶ER", "远处转移灶PR", "远处转移灶Her2", "远处转移灶Her2具体情况", "远处转移灶Ki67", "远处转移灶P53", "远处转移灶FISH", "远处转移灶FISH具体情况", "远处转移灶FISH copy数", "远处转移灶FISH ratio", "术前是否行新辅助治疗", "新辅助治疗开始时间", "新辅助治疗方案及周期", "新辅助治疗期间是否使用卵巢功能抑制剂", "新辅助治疗卵巢功能抑制剂具体药物名称", "新辅助治疗过程评估", "新辅助治疗疗效评价", "术前是否行解救治疗", "术前解救治疗开始时间", "术前解救治疗方案及周期", "术前解救治疗期间是否使用卵巢功能抑制剂", "术前解救治疗卵巢功能抑制剂具体药物名称", "术前解救治疗过程评估", "术前解救治疗疗效评价"],
    //   uploadParams: {
    //     name: "患者临床特征上传表",
    //     api: "clinicalFeature",
    //     fields: ["fxwz", "zkwz", "lcsfzz", "sfzzjtms", "hcrt", "hcrtjtms", "hcpf", "hcpfjtms", "rtyy", "yydg", "yyxz", "yyxzjtms", "yxjclx", "yxjch", "sqzldx", "sqtfq", "sqyxlbjwz", "sqyxlbjdx", "sqnfq", "yczy", "zybw", "jtzybw", "tnm", "zlbzqzfs", "lbjqzfs", "qzblh", "sfxmyzh", "er", "pr", "her2", "her2jtqk", "ki67", "p53", "fish", "fishjtqk", "fcopy", "fratio", "ywlbjer", "ywlbjpr", "ywlbjher2", "ywlbjher2jtqk", "ywlbjki67", "ywlbjp53", "ywlbjfish", "ywlbjfishjtqk", "ywlbjfcopy", "ywlbjfratio", "jblbjer", "jblbjpr", "jblbjher2", "jblbjher2jtqk", "jblbjki67", "jblbjp53", "jblbjfish", "jblbjfishjtqk", "jblbjfcopy", "jblbjfratio", "yczyqzbw", "yczyer", "yczypr", "yczyher2", "yczyher2jtqk", "yczyki67", "yczyp53", "yczyfish", "yczyfishjtqk", "yczyfcopy", "yczyfratio",
    //       "xfzzl", "xfzzlkssj", "xfzzlfa", "xfzlc", "xfzlcyw", "xfzzlpg", "xfzzlpj",
    //       "jjzl", "sqzlkssj", "sqzlfa", "jjlc", "jjlcyw", "sqzlpg", "sqzlpj"],
    //     columns: ["发现方式", "肿瘤位置", "有无临床首发症状", "首发症状具体描述", "患侧乳头", "患侧乳头症状具体描述", "患侧皮肤", "患侧皮肤症状具体描述", "乳头溢液", "溢液导管", "溢液性质", "溢液性质具体描述",
    //       "影像检查类型", "影像检查号", "术前影像肿瘤大小", "术前T分期", "术前影像腋下淋巴结位置", "术前影像腋下淋巴结大小", "术前N分期", "M分期", "转移部位", "具体转移部位", "临床TNM分期",
    //       "肿瘤病灶确诊方式", "淋巴结确诊方式", "确诊病理信息", "是否行免疫组化", "肿瘤病灶穿刺ER", "肿瘤病灶穿刺PR", "肿瘤病灶穿刺Her2", "肿瘤病灶穿刺Her2具体情况", "肿瘤病灶穿刺Ki67", "肿瘤病灶穿刺P53", "肿瘤病灶FISH", "肿瘤病灶FISH具体情况", "肿瘤病灶FISH copy数", "肿瘤病灶FISH ratio", "腋窝淋巴结穿刺ER", "腋窝淋巴结穿刺PR", "腋窝淋巴结穿刺Her2", "腋窝淋巴结穿刺Her2具体情况", "腋窝淋巴结穿刺Ki67", "腋窝淋巴结穿刺P53", "腋窝淋巴结FISH", "腋窝淋巴结FISH具体情况", "腋窝淋巴结FISH copy数", "腋窝淋巴结FISH ratio", "颈部淋巴结穿刺ER", "颈部淋巴结穿刺PR", "颈部淋巴结穿刺Her2", "颈部淋巴结穿刺Her2具体情况", "颈部淋巴结穿刺Ki67", "颈部淋巴结穿刺P53", "颈部淋巴结FISH", "颈部淋巴结FISH具体情况", "颈部淋巴结FISHcopy数", "颈部淋巴结FISHratio", "远处转移确诊部位", "远处转移灶ER", "远处转移灶PR", "远处转移灶Her2", "远处转移灶Her2具体情况", "远处转移灶Ki67", "远处转移灶P53", "远处转移灶FISH", "远处转移灶FISH具体情况", "远处转移灶FISH copy数", "远处转移灶FISH ratio",
    //       "术前是否行新辅助治疗", "新辅助治疗开始时间", "新辅助治疗方案及周期", "新辅助治疗期间是否使用卵巢功能抑制剂", "新辅助治疗卵巢功能抑制剂具体药物名称", "新辅助治疗过程评估", "新辅助治疗疗效评价",
    //       "术前是否行解救治疗", "术前解救治疗开始时间", "术前解救治疗方案及周期", "术前解救治疗期间是否使用卵巢功能抑制剂", "术前解救治疗卵巢功能抑制剂具体药物名称", "术前解救治疗过程评估", "术前解救治疗疗效评价"],
    //     validations: [
    //       Yup.string().required(requiredMessage),
    //       Yup.string().required(requiredMessage),
    //       Yup.string().required(requiredMessage),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),

    //       Yup.string().required(requiredMessage),
    //       Yup.number().positive(notPositiveNumberError).integer(notIntegerError),
    //       Yup.number().positive(notPositiveNumberError).integer(notPositiveNumberError),
    //       Yup.string().required(requiredMessage),
    //       Yup.string().required(requiredMessage),
    //       Yup.string().required(requiredMessage),
    //       Yup.string().required(requiredMessage),
    //       Yup.string().required(requiredMessage),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string().required(requiredMessage),

    //       Yup.string().required(requiredMessage),
    //       Yup.string().required(requiredMessage),
    //       Yup.string().required(requiredMessage),
    //       Yup.string().required(requiredMessage),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),

    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),

    //       Yup.string().required(requiredMessage),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),

    //       Yup.string().required(requiredMessage),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //       Yup.string(),
    //     ],
    //     functions: [
    //       getSelectFormField,
    //       getSelectFormField,
    //       getSelectFormField,
    //       getFormField,
    //       getSelectFormField,
    //       getFormField,
    //       getSelectFormField,
    //       getFormField,
    //       getSelectFormField,
    //       getSelectFormField,
    //       getSelectFormField,
    //       getFormField,

    //       getSelectFormField,
    //       getFormField,
    //       getFormField,
    //       //getFormFieldInherited,
    //       getSelectFormField,
    //       getSelectFormField,
    //       getFormField,
    //       //getFormFieldInherited,
    //       getSelectFormField,
    //       getSelectFormField,
    //       getSelectFormField,
    //       getFormField,
    //       getFormFieldInherited,

    //       getSelectFormField,
    //       getSelectFormField,
    //       getFormField,
    //       getSelectFormField,
    //       getFormField,
    //       getFormField,
    //       getSelectFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //       getSelectFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //       getSelectFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //       getSelectFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,

    //       getSelectFormField,
    //       getDateFormField,
    //       getFormField,
    //       getSelectFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,

    //       getSelectFormField,
    //       getDateFormField,
    //       getFormField,
    //       getSelectFormField,
    //       getFormField,
    //       getFormField,
    //       getFormField,
    //     ],
    //     params: [
    //       [(v) => ["自查", "体检", "其他"], (v) => false],
    //       [(v) => ["右乳", "左乳", "双乳"], (v) => false],
    //       [(v) => ["肿块", "乳头溢液", "其他首发症状"], (v) => false],
    //       ["例如：", (v) => false],
    //       [(v) => ["正常", "凹陷", "半固定", "固定", "湿疹样", "乳头皴裂", "乳头缺如", "其他"], (v) => false],
    //       ["例如：", (v) => false],
    //       [(v) => ["正常", "水肿", "卫星结节", "破溃", "桔皮样变", "炎样红肿", "静脉曲张", "其他"], (v) => false],
    //       ["例如：", (v) => false],
    //       [(v) => ["自发", "非自发"], (v) => v.lcsfzz !== "乳头溢液"],
    //       [(v) => ["左侧", "右侧", "单个", "多个"], (v) => v.lcsfzz !== "乳头溢液"],
    //       [(v) => ["陈旧血性", "新鲜血性", "淡黄", "乳汁样", "水样", "脓性", "其他"], (v) => v.lcsfzz !== "乳头溢液"],
    //       ["例如：", (v) => v.lcsfzz !== "乳头溢液"],

    //       [(v) => ["b超", "钼靶", "核磁"], (v) => false],
    //       ["例如：123", (v) => false],
    //       ["例如：1", (v) => false],
    //       // [(v) => {
    //       //   if (typeof (v.sqzldx) === "number") {
    //       //     if (v.sqzldx <= 2) return "T1";
    //       //     else if (v.sqzldx <= 5) return "T2";
    //       //     else return "T3";
    //       //   } 

    //       //   return "T4";

    //       // }, (v) => false],
    //       [(v) => ["T0","T1", "T2", "T3", "T4"], (v) => false],
    //       [(v) => ["腋下Ⅰ水平", "腋下Ⅱ水平", "腋窝Ⅲ水平", "锁骨下", "锁骨上", "乳内淋巴结"], (v) => false],
    //       ["例如：1", (v) => false],
    //       // [(v) => {
    //       //   // todo 多选才能做实现
    //       //   return "N1";
    //       // }, (v) => false],
    //       [(v) => ["N0", "N1", "N2", "N3"], (v) => false],
    //       [(v) => ["M0", "M1"], (v) => false],
    //       [(v) => ["肝", "肺", "骨", "脑", "其他"], (v) => v.yczy !== "是"],
    //       ["例如：", (v) => v.yczy !== "是"],
    //       [(v) => {
    //         // todo
    //         if (v.yczy === 'M1') {
    //           return 'IV'
    //         }
    //         else if (v.yczy === 'M0') {
    //           if (v.sqnfq === 'N3') {
    //             return 'IIIC'
    //           }
    //           else if (v.sqtfq === 'T4') {
    //             return 'IIIB'
    //           }
    //           else if (v.sqnfq === 'N2' || (v.sqnfq === 'N1' && v.sqtfq === 'T3')) {
    //             return 'IIIA'
    //           }
    //           else if ((v.sqnfq === 'N1' && v.sqtfq == 'T2') || (v.sqnfq === 'N0' && v.sqtfq == 'T3')) {
    //             return 'IIB'
    //           }
    //           else if (v.sqnfq === 'N1' || (v.sqnfq === 'N0' && v.sqtfq === 'T2')) {
    //             return 'IIA'
    //           }
    //           else if (v.sqtfq == 'T1' && v.sqnfq == 'N0') {
    //             return 'IA'
    //           }
    //           else if (v.sqnfq === 'N0' && (v.sqtfq === 'T0' || v.sqtfq === 'T1')) {
    //             return 'IB'
    //           }
    //         }
    //         return "Unknown";
    //       }, (v) => false],

    //       [(v) => ["术前开放活检", "术中开放活检", "穿刺粗针吸", "穿刺细针吸"], (v) => false],
    //       [(v) => ["无", "粗针吸", "细针吸", "术前淋巴结活检"], (v) => false],
    //       ["例如：123", (v) => false],
    //       [(v) => ["是", "否"], (v) => false],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       [(v) => ["阴性", "1+", "2+且FISH阴性", "2+且FISH阳性", "2+未做FISH", "3+", "其他"], (v) => v.sfxmyzh !== "是"],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       [(v) => ["阴性", "1+", "2+且FISH阴性", "2+且FISH阳性", "2+未做FISH", "3+", "其他"], (v) => v.sfxmyzh !== "是"],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       [(v) => ["阴性", "1+", "2+且FISH阴性", "2+且FISH阳性", "2+未做FISH", "3+", "其他"], (v) => v.sfxmyzh !== "是"],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       ["例如：", (v) => v.sfxmyzh !== "是"],
    //       ["例如：1", (v) => v.yczy !== "是"],
    //       ["例如：2", (v) => v.yczy !== "是"],
    //       ["例如：3", (v) => v.yczy !== "是"],
    //       [(v) => ["阴性", "1+", "2+且FISH阴性", "2+且FISH阳性", "2+未做FISH", "3+", "其他"], (v) => v.yczy !== "是"],
    //       ["例如：4", (v) => v.yczy !== "是"],
    //       ["例如：5", (v) => v.yczy !== "是"],
    //       ["例如：", (v) => v.yczy !== "是"],
    //       ["例如：", (v) => v.yczy !== "是"],
    //       ["例如：", (v) => v.yczy !== "是"],
    //       ["例如：", (v) => v.yczy !== "是"],
    //       ["例如：", (v) => v.yczy !== "是"],

    //       [(v) => ["是", "否"], (v) => false],
    //       [(v) => v.xfzzl !== "是"],
    //       ["例如：", (v) => v.xfzzl !== "是"],
    //       [(v) => ["是", "否"], (v) => v.xfzzl !== "是"],
    //       ["例如：", (v) => v.xfzzl !== "是" || v.xfzlc !== "是"],
    //       ["例如：", (v) => v.xfzzl !== "是"],
    //       ["例如：", (v) => v.xfzzl !== "是"],

    //       [(v) => ["是", "否"], (v) => false],
    //       [(v) => v.jjzl !== "是"],
    //       ["例如：", (v) => v.jjzl !== "是"],
    //       [(v) => ["是", "否"], (v) => v.jjzl !== "是"],
    //       ["例如：", (v) => v.jjzl !== "是" || v.jjlc !== "是"],
    //       ["例如：", (v) => v.jjzl !== "是"],
    //       ["例如：", (v) => v.jjzl !== "是"],
    //     ],
    //   }
    // },
  },
  "五、新辅助治疗/解救治疗信息": {
    "新辅治疗": {
      name: "patient_neoadjuvant",
      fields: ["xfzzl", "xfzzlkssj", "xfzzlfa", "xfzzlzq", "xfzzlfams", "xfzzllc", "xfzzllcyw", "xfzzlpj",],
      columns: ["术前是否行新辅助治疗", "新辅助治疗开始时间", "新辅助治疗方案", "新辅助治疗周期", "新辅助治疗方案具体描述", "新辅助治疗期间是否使用卵巢功能抑制剂", "新辅助治疗卵巢功能抑制剂具体药物名称", "新辅助治疗疗效评价",],
      uploadParams: {
        name: "新辅治疗信息",
        api: "neoadjuvant",
        fields: ["xfzzl", "xfzzlkssj", "xfzzlfa", "xfzzlzq", "xfzzlfams", "xfzzllc", "xfzzllcyw", "xfzzlpj",],
        columns: ["术前是否行新辅助治疗", "新辅助治疗开始时间", "新辅助治疗方案", "新辅助治疗周期", "新辅助治疗方案具体描述", "新辅助治疗期间是否使用卵巢功能抑制剂", "新辅助治疗卵巢功能抑制剂具体药物名称", "新辅助治疗疗效评价",],
        validations: [
          Yup.string().required(requiredMessage), // 术前是否行新辅助治疗
          Yup.string(), // 新辅助治疗开始时间
          Yup.string(), // 新辅助治疗方案
          Yup.string(), // 新辅助治疗周期
          Yup.string(), // 新辅助治疗方案具体描述
          Yup.string(), // 新辅助治疗期间是否使用卵巢功能抑制剂
          Yup.string(), // 新辅助治疗卵巢功能抑制剂具体药物名称
          Yup.string(), // 新辅助治疗疗效评价
        ],
        functions: [
          getSelectFormField, // 术前是否行新辅助治疗
          getDateFormField, // 新辅助治疗开始时间
          getSelectFormField, // 新辅助治疗方案
          getFormField, // 新辅助治疗周期
          getFormField, // 新辅助治疗方案具体描述
          getSelectFormField, // 新辅助治疗期间是否使用卵巢功能抑制剂
          getFormField, // 新辅助治疗卵巢功能抑制剂具体药物名称
          getSelectFormField, // 新辅助治疗疗效评价
        ],
        params: [
          [(v) => ["是", "否"], (v) => false], // 术前是否行新辅助治疗
          [(v) => v.xfzzl !== "是"],  // 新辅助治疗开始时间
          [(v) => ["TCbHP", "TCbH", "THP", "TH+吡咯替尼", "AC-THP", "TAC", "AT", "AC", "TP", "TP+帕博利珠单抗", "AC-TP", "AC-T"].sort(), (v) => v.xfzzl !== "是"],  // 新辅助治疗方案
          ["例如：", (v) => v.xfzzl !== "是"],  // 新辅助治疗周期
          ["治疗方案具体描述", (v) => v.xfzzl !== "是"],  // 新辅助治疗方案具体描述
          [(v) => ["是", "否"], (v) => v.xfzzl !== "是"],  // 新辅助治疗期间是否使用卵巢功能抑制剂
          ["例如：", (v) => v.xfzzl !== "是" || v.xfzzllc !== "是"],  // 新辅助治疗卵巢功能抑制剂具体药物名称
          [(v) => ["PD", "SD", "PR", "SR"], (v) => v.xfzzl !== "是"],  // 新辅助治疗疗效评价
        ]
      }
    },
    "解救治疗": {
      name: "patient_salvage",
      fields: ["jjzl", "jjzlkssj", "jjzlfa", "jjzlzq", "jjlc", "jjlcyw", "jjzlpj"],
      columns: ["术前是否行解救治疗", "术前解救治疗开始时间", "术前解救治疗方案", "术前解救治疗周期", "术前解救治疗期间是否使用卵巢功能抑制剂", "术前解救治疗卵巢功能抑制剂具体药物名称", "术前解救治疗疗效评价"],
      uploadParams: {
        name: "解救治疗信息",
        api: "salvage",
        fields: ["jjzl", "jjzlkssj", "jjzlfa", "jjzlzq", "jjlc", "jjlcyw", "jjzlpj"],
        columns: ["术前是否行解救治疗", "术前解救治疗开始时间", "术前解救治疗方案", "术前解救治疗周期", "术前解救治疗期间是否使用卵巢功能抑制剂", "术前解救治疗卵巢功能抑制剂具体药物名称", "术前解救治疗疗效评价"],
        validations: [
          Yup.string().required(requiredMessage), // 术前是否行解救治疗
          Yup.string(), // 术前解救治疗开始时间
          Yup.string(), // 术前解救治疗方案
          Yup.string(), // 术前解救治疗周期
          Yup.string(), // 术前解救治疗期间是否使用卵巢功能抑制剂
          Yup.string(), // 术前解救治疗卵巢功能抑制剂具体药物名称
          Yup.string(), // 术前解救治疗疗效评价
        ],
        functions: [
          getSelectFormField, // 术前是否行解救治疗
          getDateFormField, // 术前解救治疗开始时间
          getFormField, // 术前解救治疗方案
          getFormField, // 术前解救治疗周期
          getSelectFormField, // 术前解救治疗期间是否使用卵巢功能抑制剂
          getFormField, // 术前解救治疗卵巢功能抑制剂具体药物名称
          getSelectFormField, // 术前解救治疗疗效评价
        ],
        params: [
          [(v) => ["是", "否"], (v) => false], // 术前是否行解救治疗
          [(v) => v.jjzl !== "是"],  // 术前解救治疗开始时间
          ["术前解救治疗方案暂用文字描述", (v) => v.jjzl !== "是"],  // 术前解救治疗方案
          ["例如：", (v) => v.jjzl !== "是"],  // 术前解救治疗周期
          [(v) => ["是", "否"], (v) => v.jjzl !== "是"],  // 术前解救治疗期间是否使用卵巢功能抑制剂
          ["例如：", (v) => v.jjzl !== "是" || v.jjzllc !== "是"],  // 术前解救治疗卵巢功能抑制剂具体药物名称
          [(v) => ["PD", "SD", "PR", "SR"], (v) => v.jjzl !== "是"],  // 术前解救治疗疗效评价
        ],

      }
    }
  },
  "六、手术及术后大病理信息": {
    "手术": {
      name: "patient_surgery",
      fields: ["ssrq", "ssfs", "sfbr", "sfzz", "sfqj", "ywlbqsfs"],
      columns: ["手术日期", "手术方式", "是否保乳", "是否再造", "是否腔镜", "腋窝淋巴结清扫方式"],
      uploadParams: {
        name: "（一）手术信息",
        api: "surgery",
        fields: ["ssrq", "ssfs", "sfbr", "sfzz", "sfqj", "ywlbqsfs"],
        columns: ["手术日期", "手术方式", "是否保乳", "是否再造", "是否腔镜", "腋窝淋巴结清扫方式"],
        validations: [
          Yup.string().required(requiredMessage),  // 手术日期
          Yup.string().required(requiredMessage),  // 手术方式
          Yup.string().required(requiredMessage),  // 是否保乳
          Yup.string().required(requiredMessage),  // 是否再造
          Yup.string().required(requiredMessage),  // 是否腔镜
          Yup.string().required(requiredMessage),  // 腋窝淋巴结清扫方式
        ],
        functions: [
          getDateFormField,  // 手术日期
          getFormField,      // 手术方式
          getSelectFormField, // 是否保乳
          getSelectFormField, // 是否再造
          getSelectFormField, // 是否腔镜
          getSelectFormField, // 腋窝淋巴结清扫方式
        ],
        params: [
          [(v) => false],
          ["例如：", (v) => false],
          [(v) => ["是", "否"], (v) => false],
          [(v) => ["是", "否"], (v) => false],
          [(v) => ["是", "否"], (v) => false], // 是否腔镜
          [(v) => ["腋清", "前哨淋巴结活检"], (v) => false], // 腋窝淋巴结清扫方式
        ]
      }
    },
    "术后大病理": {
      name: "patient_postoperative",
      fields: ["shdblh", "bzsl", "bzxq",  "lbjqk", "ywlbzs", "yxywlbzs", "brsskjazz", "brssbbzdd", "brssbbbqzdd", "sfxywmyzh", 'ywer', "ywerqd", 'ywpr', 'ywprqd', 'ywher2', 'ywki67','ywki67qd', 'ywp53', 'ywp53qd', "sfxpdl1jc", "pdl1cps"],
      columns: ["术后大病理号", "病灶数量", "病灶详情",  "淋巴结情况(自动填)", "腋窝淋巴结总数", "阳性腋窝淋巴结数","保乳手术标本周断端是否可见癌组织", "保乳手术标本周断端", "保乳手术标本补切周断端", "是否行腋窝免疫组化", "腋窝ER(%)","腋窝ER强度", "腋窝PR", "腋窝PR强度", "腋窝HER-2", "腋窝Ki67", "腋窝Ki67强度","腋窝P53", "腋窝P53强度", "是否行PD-L1检测", "PD-L1 CPS评分"],
      uploadParams: {
        name: "（二）术后大病理信息",
        api: "postoperative",
        fields: ["shdblh", "bzsl", "bzxq",  "lbjqk", "ywlbzs", "yxywlbzs", "brsskjazz", "brssbbzdd", "brssbbbqzdd", "sfxywmyzh", "ywer", "ywerqd", "ywpr", "ywprqd", "ywher2", "ywki67","ywki67qd", "ywp53", "ywp53qd", "sfxpdl1jc", "pdl1cps" ],
        columns: ["术后大病理号", "病灶数量", "病灶详情",  "淋巴结情况(自动填)", "腋窝淋巴结总数", "阳性腋窝淋巴结数","保乳手术标本周断端是否可见癌组织", "保乳手术标本周断端", "保乳手术标本补切周断端", "是否行腋窝免疫组化", "腋窝ER(%)","腋窝ER强度", "腋窝PR", "腋窝PR强度", "腋窝HER-2", "腋窝Ki67", "腋窝Ki67强度","腋窝P53", "腋窝P53强度", "是否行PD-L1检测", "PD-L1 CPS评分"],
        validations: [
          Yup.number().positive(notPositiveNumberError).integer(notIntegerError), // 术后大病理号
          Yup.number().positive(notPositiveNumberError).integer(notIntegerError), // 病灶数量
          Yup.array().min(1, "至少上传一个病灶").required(requiredMessage), // 病灶详情
          Yup.string(), // 淋巴结情况
          Yup.number().min(0,notPositiveNumberError).integer(notIntegerError), // 腋窝淋巴结总数
          Yup.number().min(0,notPositiveNumberError).integer(notIntegerError), // 阳性腋窝淋巴结数 
          Yup.string().required(requiredMessage), // 保乳手术标本周断端是否可见癌组织
          Yup.string(), // 保乳手术标本周断端
          Yup.string(), // 保乳手术标本补切周断端
          Yup.string(), // 是否行腋窝免疫组化
          Yup.number().moreThan(0, "ER值必须大于0").lessThan(101, "ER值必须小于100"), // 腋窝ER(%)
          Yup.string(), // 腋窝ER强度
          Yup.number().moreThan(0, "PR值必须大于0").lessThan(101, "PR值必须小于100"), // 腋窝PR(%)
          Yup.string(), // 腋窝PR强度
          Yup.string(), // 腋窝HER-2
          Yup.number(), // 腋窝Ki67
          Yup.string(), // 腋窝Ki67着色强度
          Yup.number(), // 腋窝P53
          Yup.string(), // 腋窝P53着色强度
          Yup.string(), // 是否行PD-L1检测
          Yup.string(), // PD-L1 CPS评分
        ],
        functions: [
          getFormField, // 术后大病理号
          getSelectFormField, // 病灶数量
          getDetailsFormField, // 病灶详情
          getFormFieldInherited,           // 淋巴结情况
          getFormField,           // 腋窝淋巴结总数
          getFormField,           // 阳性腋窝淋巴结数 
          getSelectFormField, // 保乳手术标本周断端是否可见癌组织
          getFormField,  // 保乳手术标本周断端
          getFormField,  // 保乳手术标本补切周断端
          getSelectFormField, // 是否行腋窝免疫组化
          getFormField, // 腋窝ER(%)
          getSelectFormField, // 腋窝ER强度
          getFormField, // 腋窝PR(%)
          getSelectFormField, // 腋窝PR强度
          getSelectFormField, // 腋窝HER-2
          getFormField, // 腋窝Ki67
          getSelectFormField, // 腋窝Ki67着色强度
          getFormField, // 腋窝P53
          getSelectFormField, // 腋窝P53着色强度
          getSelectFormField, // 是否行PD-L1检测
          getFormField, //  PD-L1 CPS评分
        ],
        params: [
          ["例如：12", (v) => false],
          [(v) => ["1", "2", "3", "4", "5及以上"], (v) => false],
          [{
            index: "bzmc", // index用来显示在chip上的字段
            names: ["bzmc", "bzxx", "ryzwdx", "blxfq", "bllx", "blxjtms", "zzxfj", "zzxfjjtqk", "lbxgqf", "lbgbs", "er", "erqd", "pr", "prqd", "her2", "her2jtqk", "ki67", "ki67qd", "p53", "p53qd", "fish", "fishjtqk", "hfc", "hfr", "jzznqrlbxb", "hlfy","fzfx"],
            columns: ["病灶名称", "病灶信息", "肉眼肿物大小", "病理学分期", "病理类型", "病理具体描述", "组织学分级", "组织学分级具体情况", "淋巴血管侵犯与否", "淋巴管癌栓", "ER(%)", "ER着色强度", "PR(%)", "PR着色强度", "HER-2", "HER2具体情况", "Ki67", "Ki67着色强度", "P53", "P53着色强度", "FISH", "FISH具体情况", "HER2-FISH COPY数", "HER2-FISH RATIO","间质内浸润淋巴细胞", "化疗反应", "分子分型（自动填）"],
            validations: [
            Yup.string().required("该项必填，且作为唯一标识符"),  // 病灶名称
            Yup.string(), // 病灶信息
            Yup.string().required(requiredMessage), // 肉眼肿物大小
            Yup.string().required(requiredMessage), // 病理学分期
            Yup.string().required(requiredMessage), // 病理类型
            Yup.string(), // 病理具体描述
            Yup.string().required(requiredMessage), // 组织学分级
            Yup.string(), // 组织学分级具体情况
            Yup.string().required(requiredMessage), // 淋巴血管侵犯与否
            Yup.string().required(requiredMessage), // 淋巴管癌栓
            Yup.number().moreThan(0, "ER值必须大于0").lessThan(101, "ER值必须小于100").required(requiredMessage), // 穿刺ER(%)
            Yup.string(), // ER着色强度
            Yup.number().moreThan(0, "PR值必须大于0").lessThan(101, "PR值必须小于100").required(requiredMessage), // 穿刺PR(%)
            Yup.string(), // PR着色强度
            Yup.string().required(requiredMessage), // HER2
            Yup.string(), // HER2具体情况
            Yup.number().required(requiredMessage), // 穿刺Ki67
            Yup.string(), // Ki67着色强度
            Yup.number(), // 穿刺P53
            Yup.string(), // P53着色强度
            Yup.string(), // FISH
            Yup.string(), // FISH具体情况
            Yup.string(), // HER2-FISH COPY数
            Yup.string(),  // HER2-FISH RATIO
            Yup.string(), // 间质内浸润淋巴细胞
            Yup.string(), // 化疗反应
            Yup.string(), // 分子分型
            ],
            functions: [
              getFormField,           // 病灶名称
              getFormField,           // 病灶信息
              getFormField,           // 肉眼肿物大小
              getSelectFormField,     // 病理学分期
              getSelectFormField,     // 病理类型
              getFormField,           // 病理具体描述
              getSelectFormField,     // 组织学分级
              getFormField,           // 组织学分级具体情况
              getSelectFormField,     // 淋巴血管侵犯与否
              getSelectFormField,     // 淋巴管癌栓
              getFormField,           // 穿刺ER(%)
              getSelectFormField,     // ER着色强度
              getFormField,           // 穿刺PR(%)
              getSelectFormField,     // PR着色强度
              getSelectFormField,     // HER2
              getFormField,           // HER2具体情况
              getFormField,           // 穿刺Ki67
              getSelectFormField,     // Ki67着色强度
              getFormField,           // 穿刺P53
              getSelectFormField,     // P53着色强度
              getSelectFormField,     // FISH
              getFormField,           // FISH具体情况
              getFormField,           // HER2-FISH COPY数
              getFormField,           // HER2-FISH RATIO
              getSelectFormField,     // 间质内浸润淋巴细胞
              getFormField,           // 化疗反应
              getFormFieldInherited,  // 分子分型
            ],
            params: [
            ['eg:病灶1、左上病灶', (v) => false], // 病灶名称
            ['eg:病灶信息', (v) => false],  // 病灶信息
            ["例如：1", (v) => false], // 肉眼肿物大小
            [(v)=>pathologyState(), (v) => false], // 病理学分期
            [(v) => ["化生性癌", "乳头状癌", "粘液癌","小叶原位癌", "乳腺导管原位癌", "浸润性导管癌", "浸润性微乳头状癌", "浸润性小叶癌", "浸润性导管癌和小叶癌", "浸润性导管癌和粘液癌", "浸润性导管癌和微乳头状癌", "恶性叶状肿瘤", "乳腺佩吉特病", "乳房佩吉特病和浸润性导管癌", "乳房佩吉特病和导管内癌（病理报告上提示派杰病或派杰氏病）", "实性浸润性乳头状癌", "微浸润性腺癌", "其他"], (v) => false],
            ["例如：", (v) => false], // 病理具体描述
            [(v) => ["I", "II", "III", "I-II", "II-III", "其他"], (v) => false], // 组织学分级
            ["例如：", (v) => false], // 组织学分级具体情况
            [(v) => ["是", "否"], (v) => false],  // 淋巴血管侵犯与否
            [(v) => ["是", "否", "可疑", "不详"], (v) => false], // 淋巴管癌栓
            ["请输入百分比", (v) => false], // 穿刺ER(%)
            [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => false], // ER着色强度
            ["请输入百分比", (v) => false], //穿刺PR(%)
            [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => false], // PR着色强度
            [(v) => ["阴性", "1+", "2+且FISH阴性", "2+且FISH阳性", "2+未做FISH", "3+", "其他"], (v) => false], // HER2
            ["例如：", (v) => false], // HER2具体情况
            ["请输入百分比", (v) => false], // 穿刺Ki67
            [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => false], // Ki67着色强度
            ["请输入百分比", (v) => false], //穿刺P53
            [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => false], // P53着色强度
            [(v) => ["阴性", "阳性"], (v) => false], // FISH
            ["例如：", (v) => false], // FISH具体情况
            ["例如：", (v) => false], // HER2-FISH COPY数
            ["例如：", (v) => false], // HER2-FISH RATIO
            [(v) => ["有", "无"], (v) => false], // 间充质淋巴细胞
            ["例如：", (v) => false],  // 化疗反应
            [(v) => {
              let mt = "unknown"
              if(v.er ==="" || v.pr === "" || v.her2 === ""  ){
                mt = "unknown"  // 上述三个关键信息没有则填unknown
              }else {
                let _hr = (v.er >=10 || v.pr >=10)  // !表示低表达
                let _her2 = ["2+且FISH阳性", "3+"].includes(v.her2)
                if(_hr && !_her2){  // Luminal A 是HR高表达，her2低表达，ki67低表达
                  if(v.ki67 === ""){
                    mt = "Luminal 型"
                  } else {
                    let _ki67 = (v.ki67 >= 14)
                    if(!_ki67){
                      mt = "Luminal A 型" // Luminal A 是HR高表达，her2低表达，ki67低表达
                    } else {
                      mt = "Luminal B 型"  // Luminal A 是HR高表达，her2低表达，ki67高表达
                    }
                  }
                }else if(!_hr && _her2) {
                  mt = "HER-2 阳性（HR阴性）"
                }else if(_hr && _her2) {
                  mt = "HER-2 阳性（HR阳性）"
                }else if(!_hr && !_her2) {
                  mt = "TNBC"
                }else {
                  mt = "unknown"
                }
              }

              return mt
            }, (v) => true], // 分子分型
            ]
          }, (v) => false],  // 病灶详情
          [(v) => {
            let mt = "unknown"
            if(v.yxywlbzs === ''){
              mt = 'unknown'
            } else if(v.yxywlbzs > 0 && v.yxywlbzs <= 3){
              mt = '1~3'
            } else if(v.yxywlbzs > 3){
              mt = '>3'
            }  else if(!isNaN(parseFloat(v.yxywlbzs)) && isFinite(v.yxywlbzs)){
              mt = '0'
            } else {
              mt = 'unknown'
            }
            return mt
          }, (v) => true], // 淋巴结情况
          ["例如：1", (v) => false], // 腋窝淋巴结总数
          ["例如：2", (v) => false], // 阳性腋窝淋巴结数 
          [(v) => ["是", "否", "未做保乳手术"], (v) => false],// 保乳手术标本周断端是否可见癌组织
          ["例如：", (v) => false],  // 保乳手术标本周断端
          ["例如：", (v) => false],  // 保乳手术标本补切周断端
          [(v) => ["是", "否", "不详"], (v) => false], // 是否行腋窝免疫组化
          ["请输入百分比", (v) => v.sfxywmyzh !== "是"], // 腋窝ER(%)
          [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => v.sfxywmyzh !== "是"], // 腋窝ER强度
          ["请输入百分比", (v) => v.sfxywmyzh !== "是"], // 腋窝PR(%)
          [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => v.sfxywmyzh !== "是"], // 腋窝PR强度
          [(v) => ["阴性", "1+", "2+且FISH阴性", "2+且FISH阳性", "2+未做FISH", "3+", "其他"], (v) => v.sfxywmyzh !== "是"], // 腋窝HER-2
          ["请输入百分比", (v) => v.sfxywmyzh !== "是"], // 腋窝Ki67
          [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => v.sfxywmyzh !== "是"], // 腋窝Ki67着色强度
          ["请输入百分比", (v) => v.sfxywmyzh !== "是"], // 腋窝P53
          [(v) => ["弱", "弱、中", "弱、中、强", "中、强", "强", "其他"], (v) => v.sfxywmyzh !== "是"], // 腋窝P53着色强度
          [(v) => ["是", "否", "不详"], (v) => false], // 是否行PD-L1检测
          ["请输入CPS评分", (v) => v.sfxpdl1jc !== "是"], //  PD-L1 CPS评分
        ],
      }
    }
  },
  "七、术后辅助治疗": {
    "术后辅助治疗": {
      name: "patient_postoperative_assist",
      fields: ["shhl", "hlkssj", "shhlfam", "shhlxq", "shnfmzl", "nfmzlkssj", "nfmzlym", "nfmzlfzy", "shlcgnyzjzl", "shlcgnyzjzlkssj", "shlcgnyzjzljtyw", "lcgnyzjsyqk", "shbxzl", "bxzlkssj", "bxzlym", "shfl", "flkssj", "flbz", "shmyzl", "myzlsj", "myzlbz", "shqhzl", "qhzljtyw", "qhzljtms"],
      columns: ["术后化疗", "术后化疗开始时间", "术后化疗方案","术后化疗详情", "术后内分泌治疗（AI/TAM/氟维司群）", "术后内分泌治疗开始时间", "术后内分泌治疗药物", "内分泌治疗副作用","术后卵巢功能抑制剂治疗", "术后卵巢功能抑制剂治疗开始时间", "术后卵巢功能抑制剂治疗具体药物", "卵巢功能抑制剂使用情况", "是否术后靶向治疗", "术后靶向治疗开始时间", "术后靶向治疗具体药物", "术后放疗", "术后放疗开始时间", "术后放疗备注", "术后免疫治疗", "术后免疫治疗开始时间", "术后免疫治疗备注", "术后强化治疗", "术后强化治疗具体药物", "术后强化治疗具体描述"],
      uploadParams: {
        name: "术后辅助治疗上传表",
        api: "assist",
        fields: ["shhl", "hlkssj", "shhlfam", "shhlxq", "shnfmzl", "nfmzlkssj", "nfmzlym", "nfmzlfzy", "shlcgnyzjzl", "shlcgnyzjzlkssj", "shlcgnyzjzljtyw", "lcgnyzjsyqk", "shbxzl", "bxzlkssj", "bxzlym", "shfl", "flkssj", "flbz", "shmyzl", "myzlsj", "myzlbz", "shqhzl", "qhzljtyw", "qhzljtms"],
        columns: ["术后化疗", "术后化疗开始时间", "术后化疗方案","术后化疗详情", "术后内分泌治疗（AI/TAM/氟维司群）", "术后内分泌治疗开始时间", "术后内分泌治疗药物", "内分泌治疗副作用", "术后卵巢功能抑制剂治疗", "术后卵巢功能抑制剂治疗开始时间", "术后卵巢功能抑制剂治疗具体药物", "卵巢功能抑制剂使用情况","是否术后靶向治疗", "术后靶向治疗开始时间", "术后靶向治疗具体药物", "术后放疗", "术后放疗开始时间", "术后放疗备注", "术后免疫治疗", "术后免疫治疗开始时间", "术后免疫治疗备注", "术后强化治疗", "术后强化治疗具体药物", "术后强化治疗具体描述"],
        validations: [
          Yup.string().required(requiredMessage),  // 术后化疗
          Yup.string(), // 术后化疗开始时间
          Yup.string(), // 术后化疗方案
          Yup.string(), // 术后化疗详情
          Yup.string().required(requiredMessage), // 术后内分泌治疗（AI/TAM/氟维司群）
          Yup.string(), // 术后内分泌治疗开始时间
          Yup.string(), // 术后内分泌治疗药物
          Yup.string(), // 内分泌治疗副作用
          Yup.string().required(requiredMessage), // 术后卵巢功能抑制剂治疗（GnRHa类药物：戈舍瑞林，亮丙瑞林等）
          Yup.string(), // 术后卵巢功能抑制剂治疗开始时间
          Yup.string(), // 术后卵巢功能抑制剂治疗具体药物
          Yup.string(), // 卵巢功能抑制剂使用情况
          Yup.string().required(requiredMessage), // 是否术后靶向治疗
          Yup.string(), // 术后靶向治疗开始时间
          Yup.string(), // 术后靶向治疗具体药物
          Yup.string().required(requiredMessage), // 术后放疗
          Yup.string(), // 术后放疗开始时间
          Yup.string(), // 术后放疗备注
          Yup.string().required(requiredMessage), // 术后免疫治疗
          Yup.string(), // 术后免疫治疗开始时间 
          Yup.string(), // 术后免疫治疗备注
          Yup.string().required(requiredMessage), // 术后是否强化治疗
          Yup.string(), // 强化治疗药物
          Yup.string(), // 强化治疗具体描述
        ],
        functions: [
          getSelectFormField, // 术后化疗
          getDateFormField,   // 术后化疗开始时间
          getSelectFormField, // 术后化疗方案
          getFormField,       // 术后化疗详情
          getSelectFormField, // 术后内分泌治疗（AI/TAM/氟维司群）
          getDateFormField,   // 术后内分泌治疗开始时间
          getFormField,       // 术后内分泌治疗药物
          getFormField,       // 内分泌治疗副作用
          getSelectFormField, // 术后卵巢功能抑制剂治疗（GnRHa类药物：戈舍瑞林，亮丙瑞林等）
          getDateFormField, // 术后卵巢功能抑制剂治疗开始时间
          getFormField, // 术后卵巢功能抑制剂治疗具体药物
          getSelectFormField, // 卵巢功能抑制剂使用情况
          getSelectFormField, // 是否术后靶向治疗
          getDateFormField,   // 术后靶向治疗开始时间
          getFormField,       // 术后靶向治疗具体药物
          getSelectFormField, // 术后放疗
          getDateFormField,   // 术后放疗开始时间
          getFormField,       // 术后放疗备注
          getSelectFormField, // 术后免疫治疗
          getDateFormField,   // 术后免疫治疗开始时间 
          getFormField,       // 术后免疫治疗备注
          getSelectFormField, // 术后是否强化治疗
          getSelectFormField, // 强化治疗药物
          getFormField,       // 强化治疗具体描述
        ],
        params: [
          [(v) => ["是", "否", "推荐但患者拒绝", "不详"], (v) => false],  // 术后化疗
          [(v) => v.shhl !== "是"],   // 术后化疗开始时间
          [(v) => ["TCbHP", "TCbH", "THP", "TH+吡咯替尼", "AC-THP", "AC-TH", "TC+H", "TAC", "AT", "TP", "TC", "AC", "TP+帕博利珠单抗", "AC-TP", "AC-T", "ddAC-ddT", "wTH", "H+内分泌治疗", "FEC-T"].sort(), (v) => v.shhl !== "是"],  // 术后化疗方案
          ["例如：", (v) => v.shhl !== "是"], // 术后化疗详情
          [(v) => ["是", "否", "推荐但患者拒绝", "不详"], (v) => false],  // 术后内分泌治疗（AI/TAM/氟维司群）
          [(v) => v.shnfmzl !== "是"],  // 术后内分泌治疗开始时间
          ["例如：", (v) => v.shnfmzl !== "是"],  // 术后内分泌治疗药物
          ["例如：", (v) => v.shnfmzl !== "是"],  // 内分泌治疗副作用
          [(v) => ["是", "否", "推荐但患者拒绝", "不详"], (v) => false], // 术后卵巢功能抑制剂治疗（GnRHa类药物：戈舍瑞林，亮丙瑞林等）
          [(v) => v.shlcgnyzjzl !== "是"], // 术后卵巢功能抑制剂治疗开始时间
          ["GnRHa类药物：戈舍瑞林，亮丙瑞林等",(v) => v.shlcgnyzjzl !== "是"], // 术后卵巢功能抑制剂治疗具体药物
          [(v) => ['仅在术后期间使用', "一直都有使用"],(v) => v.shlcgnyzjzl !== "是"], // 卵巢功能抑制剂使用情况
          [(v) => ["是", "否", "推荐但患者拒绝", "不详"], (v) => false],// 是否术后靶向治疗
          [(v) => v.shbxzl !== "是"],   // 术后靶向治疗开始时间
          ["例如：", (v) => v.shbxzl !== "是"],   // 术后靶向治疗具体药物
          [(v) => ["是", "否", "推荐但患者拒绝", "不详"], (v) => false],  // 术后放疗
          [(v) => v.shfl !== "是"],   // 术后放疗开始时间
          ["例如：", (v) => v.shfl !== "是"],   // 术后放疗备注
          [(v) => ["是", "否", "推荐但患者拒绝", "不详"], (v) => false],    // 术后免疫治疗
          [(v) => v.shmyzl !== "是"],   // 术后免疫治疗开始时间 
          ["例如：", (v) => v.shmyzl !== "是"],   // 术后免疫治疗备注
          [(v) => ["是", "否", "推荐但患者拒绝", "不详"], (v) => false],   // 是否强化治疗
          [(v) => ["奈拉替尼", "卡培他滨", "奥拉帕利", "CDK4/6i", "其他"], (v) => v.shqhzl !== "是"],  // 强化治疗药物
          ["例如：", (v) => v.shqhzl !== "是"],  // 强化治疗具体描述
        ]
      }
    },
  },
  "八、复发和随访": {
    "记录者信息": {
      name: "recorder_information",
      fields: ["sclrr", "sclrsj", "mcsfr", "mcsfsj"],
      columns: ["首次录入人", "首次录入时间", "末次随访人", "末次随访时间"],
      uploadParams: {
        name: "（一）记录者信息",
        api: "recorder",
        fields: ["sclrr", "sclrsj", "mcsfr", "mcsfsj"],
        columns: ["首次录入人", "首次录入时间", "末次随访人", "末次随访时间"],
        validations: [
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
        ],
        functions: [
          getFormField,
          getDateFormField,
          getFormField,
          getDateFormField,
        ],
        params: [
          ["例如：", (v) => false],
          [(v) => false],
          ["例如：", (v) => false],
          [(v) => false],
        ]
      }
    },
    "内分泌治疗依从性": {
      name: "patient_endocrine",
      fields: ["glnfm",'zlsc', 'nfmty', 'nfmtykssj', 'zdnfmsc', 'zdnfmyy', 'glofs', 'ofssc', 'ofsty', 'ofstykssj', 'zdofssc'],
      columns: ["是否规律进行内分泌治疗", "内分泌（AI/TAM/氟维司群）治疗时长（年）",'有无连续停用内分泌药物超过1个月','内分泌药物停药（连续超过1个月）开始时间', '中断内分泌治疗时长（月）', '中断内分泌治疗原因', '是否规律进行OFS治疗', '使用OFS治疗时长（年）', '有无连续停用OFS超过1个月', 'OFS治疗停药（连续超过1个月）开始时间', '中断OFS治疗时长（月）'],
      uploadParams: {
        name: "（二）内分泌治疗依从性",
        api: "endocrine",
        fields: ["glnfm",'zlsc', 'nfmty', 'nfmtykssj', 'zdnfmsc', 'zdnfmyy', 'glofs', 'ofssc', 'ofsty', 'ofstykssj', 'zdofssc'],
        columns: ["是否规律进行内分泌治疗", "内分泌（AI/TAM/氟维司群）治疗时长（年）",'有无连续停用内分泌药物超过1个月','内分泌药物停药（连续超过1个月）开始时间', '中断内分泌治疗时长（月）', '中断内分泌治疗原因', '是否规律进行OFS治疗', '使用OFS治疗时长（年）', '有无连续停用OFS超过1个月', 'OFS治疗停药（连续超过1个月）开始时间', '中断OFS治疗时长（月）'],
        validations: [
          Yup.string(), //是否规律进行内分泌治疗
          Yup.number(), //内分泌（AI/TAM/氟维司群）治疗时长（年）
          Yup.string(), //有无连续停用内分泌药物（AI/TAM/氟维司群）超过1个月
          Yup.string(), //内分泌药物（AI/TAM/氟维司群）停药（连续停用超过1个月）开始时间
          Yup.number(), //中断内分泌治疗（AI/TAM/氟维司群）时长（月）
          Yup.string(), //中断内分泌治疗（AI/TAM/氟维司群）原因
          Yup.string(), //是否规律进行OFS治疗
          Yup.number(), //使用OFS治疗时长（年）
          Yup.string(), //有无连续停用OFS超过1个月
          Yup.string(), //OFS治疗停药（连续停用超过1个月）开始时间
          Yup.number(), //中断OFS治疗时长（月）
        ],
        functions: [
          getSelectFormField, //是否规律进行内分泌治疗
          getFormField, //内分泌（AI/TAM/氟维司群）治疗时长（年）
          getSelectFormField, //有无连续停用内分泌药物（AI/TAM/氟维司群）超过1个月
          getSelectFormField, //内分泌药物（AI/TAM/氟维司群）停药（连续停用超过1个月）开始时间
          getFormField, //中断内分泌治疗（AI/TAM/氟维司群）时长（月）
          getFormField, //中断内分泌治疗（AI/TAM/氟维司群）原因
          getSelectFormField, //是否规律进行OFS治疗
          getFormField, //使用OFS治疗时长（年）
          getSelectFormField, //有无连续停用OFS超过1个月
          getSelectFormField, //OFS治疗停药（连续停用超过1个月）开始时间
          getFormField, //中断OFS治疗时长（月）
        ],
        params: [
          [(v)=>['是', '否', '不详'], (v)=>false], //是否规律进行内分泌治疗
          ["内分泌（AI/TAM/氟维司群）治疗时长（年）", (v)=>v.glnfm !== '是'], //内分泌（AI/TAM/氟维司群）治疗时长（年）
          [(v)=>['有', '无', '不详'], (v)=>false], //有无连续停用内分泌药物（AI/TAM/氟维司群）超过1个月
          [(v)=>['术后1年内', '术后1-3年', '术后3-5年', '术后5年以后'], (v)=>v.nfmty !=="有"], //内分泌药物（AI/TAM/氟维司群）停药（连续停用超过1个月）开始时间
          ["中断内分泌治疗（AI/TAM/氟维司群）时长（月）", (v)=>v.nfmty !=="有"], //中断内分泌治疗（AI/TAM/氟维司群）时长（月）
          ["中断内分泌治疗（AI/TAM/氟维司群）原因）", (v)=>v.nfmty !=="有"], //中断内分泌治疗（AI/TAM/氟维司群）原因
          [(v)=>['是', '否', '不详'], (v)=>false], //是否规律进行OFS治疗
          ["使用OFS治疗时长（年）", (v)=>v.glofs !== '是'], //使用OFS治疗时长（年）
          [(v)=>['有', '无', '不详'], (v)=>false], //有无连续停用OFS超过1个月
          [(v)=>['术后1年内', '术后1-3年', '术后3-5年', '术后5年以后'], (v)=>v.ofsty !=="有"], //OFS治疗停药（连续停用超过1个月）开始时间
          ["中断OFS治疗时长（月）", (v)=>v.ofsty !=="有"], //中断OFS治疗时长（月）
        ],
      }
    },
    "复发信息": {  // tuple
      name: "patient_relapse",
      fields: ["djcff", "ffbw", "jtffbw", "ffrq", "ffbwsfjblqz",  "ffqzsd", "ffbzblxx", "ffbzymzh", "ffhzl", "ffxgpj"],
      columns: ["第几次复发", "复发部位", "具体复发部位", "复发日期", "复发部位是否经病理确诊", "复发部位病理确诊手段", "复发病灶病理信息", "复发病灶免疫组化", "复发后治疗", "复发后治疗效果评价"],
      uploadParams: {
        name: "（三）复发信息",
        api: "relapse",
        fields: ["djcff", "ffbw", "jtffbw", "ffrq", "ffbwsfjblqz", "ffqzsd", "ffbzblxx", "ffbzymzh", "ffhzl", "ffxgpj"],
        columns: ["第几次复发", "复发部位", "具体复发部位", "复发日期", "复发部位是否经病理确诊", "复发部位病理确诊手段", "复发病灶病理信息", "复发病灶免疫组化", "复发后治疗", "复发后治疗效果评价"],
        validations: [
          Yup.number().positive(notPositiveNumberError).integer(notIntegerError), // 第几次复发
          Yup.string().required(requiredMessage), // 复发部位
          Yup.string(),  // 具体复发部位
          Yup.string().required(requiredMessage),  // 复发日期
          Yup.string().required(requiredMessage),  // 复发部位是否经病理确诊
          Yup.string().required(requiredMessage),  // 复发部位病理确诊手段
          Yup.string().required(requiredMessage),  // 复发病灶病理信息
          Yup.string().required(requiredMessage),  // 复发病灶免疫组化
          Yup.string().required(requiredMessage),  // 复发后治疗
          Yup.string().required(requiredMessage),  // 复发后治疗效果评价
        ],
        functions: [
          getFormField, // 第几次复发
          getSelectFormField, // 复发部位
          getFormField, // 具体复发部位
          getDateFormField, // 复发日期
          getSelectFormField, // 复发部位是否经病理确诊
          getSelectFormField, // 复发部位病理确诊手段
          getFormField,  // 复发病灶病理信息
          getFormField,  // 复发病灶免疫组化
          getFormField,  // 复发后治疗
          getSelectFormField,  // 复发后治疗效果评价
        ],
        params: [
          ["例如：1", (v) => false],
          [(v) => ["胸壁复发", "保乳术后复发", "同侧腋窝及锁上淋巴结复发", "其他"], (v) => false],
          ["例如：", (v) => false],
          [(v) => false],
          [(v) => ['是', '否'], (v) => false],
          [(v) => ['无', '粗针吸穿刺', '细针吸穿刺', '开放活检'], (v) => false],
          ["例如：", (v) => false],
          ["例如：", (v) => false],
          ["例如：", (v) => false],
          [(v) => ['CR', 'PR', 'SD', 'PD'], (v) => false],
        ]
      }
    },
    "远处转移信息": {  // tuple
      name: "patient_recurrent",
      fields: ["djczy", "yzzybw", "yczyrq", "yczysfjblqz", "yczyqzsd", "yczyblxx", "yczymyzh", "yczyzl", "yczyzlxgpj"],
      columns: ["第几次转移", "远处转移部位", "远处转移日期", "远处转移部位是否经病理确诊", "远处转移部位病理确诊手段", "远处转移病理信息", "远处转移免疫组化", "远处转移治疗", "远处转移治疗效果评价"],
      uploadParams: {
        name: "（四）远处转移信息",
        api: "recurrent",
        fields: ["djczy", "yzzybw", "yczyrq","yczysfjblqz", "yczyqzsd", "yczyblxx", "yczymyzh", "yczyzl", "yczyzlxgpj"],
        columns: ["第几次转移", "远处转移部位", "远处转移日期", "远处转移部位是否经病理确诊", "远处转移部位病理确诊手段", "远处转移病理信息", "远处转移免疫组化", "远处转移治疗", "远处转移治疗效果评价"],
        validations: [
          Yup.number().positive(notPositiveNumberError).integer(notIntegerError), // 第几次转移
          Yup.string().required(requiredMessage),  // 远处转移部位
          Yup.string().required(requiredMessage),  // 远处转移日期
          Yup.string().required(requiredMessage),  // 远处转移部位是否经病理确诊
          Yup.string().required(requiredMessage),  // 远处转移部位病理确诊手段
          Yup.string().required(requiredMessage),  // 远处转移病理信息
          Yup.string().required(requiredMessage),  // 远处转移免疫组化
          Yup.string().required(requiredMessage),  // 远处转移治疗
          Yup.string().required(requiredMessage),  // 远处转移治疗效果评价
        ],
        functions: [
          getFormField,  // 第几次转移
          getMultiSelectFormField,  // 远处转移部位
          getDateFormField,  // 远处转移日期
          getSelectFormField, // 远处转移部位是否经病理确诊
          getFormField,  // 远处转移部位病理确诊手段
          getFormField,  // 远处转移病理信息
          getFormField,  // 远处转移免疫组化
          getFormField,  // 远处转移治疗
          getSelectFormField,  // 远处转移治疗效果评价
        ],
        params: [
          ["例如：1", (v) => false],
          [(v) => ["对侧乳腺", "非同侧胸壁", "区域淋巴结", "骨", "肺", "肝", "脑", "其他"], (v) => false],
          [(v) => false],  // 远处转移日期
          [(v) => ['是', '否'], (v)=>false], // 远处转移部位是否经病理确诊
          ["例如：", (v) => false], // 远处转移部位病理确诊手段
          ["例如：", (v) => false], // 远处转移病理信息
          ["例如：", (v) => false], // 远处转移免疫组化
          ["例如：", (v) => false], // 远处转移治疗
          [(v) => ['CR', 'PR', 'SD', 'PD'], (v) => false], // 远处转移治疗效果评价
        ]
      }
    },
    "生存信息": {
      name: "patient_follow",
      fields: ["dfs", "swyf", "swsj", "sy", "jtsy", "os", "mcfcsj", "syqk", "syfaz", "syfazjtxq", "zhsfsj", "sfbz"],
      columns: ["DFS", "死亡与否", "死亡时间", "死因", "具体死因", "OS", "末次复查时间（截止查病历时/电话随诊）", "治疗后是否生育", "双原发癌症", "双原发癌症具体详情", "双原发癌症首次发生时间", "随访备注"],
      uploadParams: {
        name: "（五）生存信息、治疗后生育情况及双原发癌",
        api: "survival",
        fields: ["dfs", "swyf", "swsj", "sy", "jtsy", "os", "mcfcsj", "syqk", "syfaz", "syfazjtxq", "zhsfsj", "sfbz"],
        columns: ["DFS", "死亡与否", "死亡时间", "死因", "具体死因", "OS", "末次复查时间（截止查病历时/电话随诊）", "治疗后是否生育", "双原发癌症", "双原发癌症具体详情", "双原发癌症首次发生时间", "随访备注"],
        validations: [
          Yup.number().positive(notPositiveNumberError).integer(notIntegerError),
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string(),
          Yup.string(),
        ],
        functions: [
          getFormField,
          getSelectFormField,
          getDateFormField,
          getSelectFormField,
          getFormField,
          getFormField,
          getDateFormField,
          getSelectFormField,
          getSelectFormField,
          getFormField,
          getDateFormField,
          getFormField
        ],
        params: [
          ["例如：", (v) => false],
          [(v) => ["是", "否"], (v) => false],
          [(v) => v.swyf !== "是"],
          [(v) => ["肿瘤", "非肿瘤", "不详"], (v) => v.swyf !== "是"],
          ["例如：", (v) => v.swyf !== "是" || v.sy !== "非肿瘤"],
          ["例如：", (v) => false],
          [(v) => false],
          [(v) => ["是", "否", '不详'], (v) => false],  // 治疗后是否生育
          [(v) => ["无", "对侧乳腺", "非同侧胸壁、区域淋巴结", "其他原发癌"], (v) => false],
          ["例如：", (v) => v.syfaz === "无"],
          [(v) => v.syfaz === "无"],
          ["例如：", (v) => false],
        ]
      }
    },
  },
  "九、基因检测": {
    "21基因信息": {
      name: "gene21_detection",
      fields: ["sfjx21jyjc", "jcsj", "yjbh", "jcry", "bbwz", "bz", "jtxq"],
      columns: ["是否进行21基因检测", "检测时间", "研究编号", "检测人员", "标本位置", "备注", "具体详情"],
      uploadParams: {
        name: "21基因信息上传表",
        api: "gene21detect",
        fields: ["sfjx21jyjc", "jcsj", "yjbh", "jcry", "bbwz", "bz", "jtxq"],
        columns: ["是否进行21基因检测", "检测时间", "研究编号", "检测人员", "标本位置", "备注", "具体详情"],
        validations: [
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.number().positive(notPositiveNumberError).integer(notIntegerError),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
        ],
        functions: [
          getSelectFormField,
          getDateFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
        ],
        params: [
          [(v) => ["是", "否"], (v) => false],
          [(v) => v.sfjx21jyjc !== "是"],
          ["例如：1", (v) => v.sfjx21jyjc !== "是"],
          ["例如：", (v) => v.sfjx21jyjc !== "是"],
          ["例如：", (v) => v.sfjx21jyjc !== "是"],
          ["例如：", (v) => v.sfjx21jyjc !== "是"],
          ["例如：", (v) => v.sfjx21jyjc !== "是"],
        ]
      }
    },
    "70基因信息": {
      name: "gene70_detection",
      fields: ["sfjx70jyjc", "jcsj", "yjbh", "jcry", "bbwz", "bz", "jtxq"],
      columns: ["是否进行70基因检测", "检测时间", "研究编号", "检测人员", "标本位置", "备注", "具体详情"],
      uploadParams: {
        name: "70基因信息上传表",
        api: "gene70detect",
        fields: ["sfjx70jyjc", "jcsj", "yjbh", "jcry", "bbwz", "bz", "jtxq"],
        columns: ["是否进行70基因检测", "检测时间", "研究编号", "检测人员", "标本位置", "备注", "具体详情"],
        validations: [
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.number().positive(notPositiveNumberError).integer(notIntegerError),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
        ],
        functions: [
          getSelectFormField,
          getDateFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
        ],
        params: [
          [(v) => ["是", "否"], (v) => false],
          [(v) => v.sfjx70jyjc !== "是"],
          ["例如：1", (v) => v.sfjx70jyjc !== "是"],
          ["例如：", (v) => v.sfjx70jyjc !== "是"],
          ["例如：", (v) => v.sfjx70jyjc !== "是"],
          ["例如：", (v) => v.sfjx70jyjc !== "是"],
          ["例如：", (v) => v.sfjx70jyjc !== "是"],
        ]
      }
    },
    "BCRA基因信息": {
      name: "genebrca_detection",
      fields: ["sfjxbrcajyjc", "jcsj", "yjbh", "jcry", "bbwz", "bz", "jtxq"],
      columns: ["是否进行BRCA基因检测", "检测时间", "研究编号", "检测人员", "标本位置", "备注", "具体详情"],
      uploadParams: {
        name: "BCRA基因信息上传表",
        api: "genebrcadetect",
        fields: ["sfjxbrcajyjc", "jcsj", "yjbh", "jcry", "bbwz", "bz", "jtxq"],
        columns: ["是否进行BRCA基因检测", "检测时间", "研究编号", "检测人员", "标本位置", "备注", "具体详情"],
        validations: [
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.number().positive(notPositiveNumberError).integer(notIntegerError),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
        ],
        functions: [
          getSelectFormField,
          getDateFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
        ],
        params: [
          [(v) => ["是", "否"], (v) => false],
          [(v) => v.sfjxbrcajyjc !== "是"],
          ["例如：1", (v) => v.sfjxbrcajyjc !== "是"],
          ["例如：", (v) => v.sfjxbrcajyjc !== "是"],
          ["例如：", (v) => v.sfjxbrcajyjc !== "是"],
          ["例如：", (v) => v.sfjxbrcajyjc !== "是"],
          ["例如：", (v) => v.sfjxbrcajyjc !== "是"],
        ]
      }
    },
    "外周血标本采样采集信息": {
      name: "peripheral_blood_sample_sampling",
      fields: ["bblx", "cxsjd", "cjr", "cjbz", "cjyt", "ybid", "ybnum", "ybhbh", "ybcfwz", "sfqy", "qyrq", "qyr", "qyyt", "qybz"],
      columns: ["标本类型", "采血时间点", "采集人", "采集备注", "采集用途", "标本编码", "标本量", "标本盒编码", "标本存放位置", "是否取用", "取用日期", "取用人", "取用用途", "取用备注"],
      uploadParams: {
        name: "外周血标本采样采集信息上传表",
        api: "blood",
        fields: ["bblx", "cxsjd", "cjr", "cjbz", "cjyt", "ybid", "ybnum", "ybhbh", "ybcfwz", "sfqy", "qyrq", "qyr", "qyyt", "qybz"],
        columns: ["标本类型", "采血时间点", "采集人", "采集备注", "采集用途", "标本编码", "标本量", "标本盒编码", "标本存放位置", "是否取用", "取用日期", "取用人", "取用用途", "取用备注"],
        validations: [
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string().required(requiredMessage),
          Yup.number().positive(notPositiveNumberError).integer(notIntegerError),
          Yup.string().required(requiredMessage),
          Yup.number().positive(notPositiveNumberError).integer(notIntegerError),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
        ],
        functions: [
          getFormField,
          getDateFormField,
          getFormField,
          getFormField,
          getSelectFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
          getSelectFormField,
          getDateFormField,
          getFormField,
          getFormField,
          getFormField,
        ],
        params: [
          ["例如：", (v) => false],
          [(v) => false],
          ["例如：", (v) => false],
          ["例如：", (v) => false],
          [(v) => ["常规收集", "课题"], (v) => false],
          ["例如：1", (v) => false],
          ["例如：", (v) => false],
          ["例如：1", (v) => false],
          ["例如：", (v) => false],
          [(v) => ["是", "否"], (v) => false],
          [(v) => v.sfqy !== "是"],
          ["例如：", (v) => v.sfqy !== "是"],
          ["例如：", (v) => v.sfqy !== "是"],
          ["例如：", (v) => v.sfqy !== "是"],
          ["例如：", (v) => v.sfqy !== "是"],
        ]
      }
    },
    "复发转移灶标本采样基本情况": {
      name: "sampling_recurrence_metastasis_specimens",
      fields: ["glbz", "cyrq", "ytbz", "qtyt", "cjr", "bblx", "bbxz", "ybid", "ybnum", "ybhbh", "ybcfwz", "sfqy", "qyrq", "qyr", "qyyt", "qybz"],
      columns: ["关联病灶", "采样日期", "用途标识", "其他用途（填写）", "采集人", "标本类型", "标本性质", "标本编码", "标本量", "标本盒编码", "标本存放位置", "是否取用", "取用日期", "取用人", "取用用途", "取用备注"],
      uploadParams: {
        name: "复发转移灶标本采样基本情况上传表",
        api: "specimens",
        fields: ["glbz", "cyrq", "ytbz", "qtyt", "cjr", "bblx", "bbxz", "ybid", "ybnum", "ybhbh", "ybcfwz", "sfqy", "qyrq", "qyr", "qyyt", "qybz"],
        columns: ["关联病灶", "采样日期", "用途标识", "其他用途（填写）", "采集人", "标本类型", "标本性质", "标本编码", "标本量", "标本盒编码", "标本存放位置", "是否取用", "取用日期", "取用人", "取用用途", "取用备注"],
        validations: [
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.number().positive(notPositiveNumberError).integer(notIntegerError),
          Yup.string().required(requiredMessage),
          Yup.number().positive(notPositiveNumberError).integer(notIntegerError),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
        ],
        functions: [
          getFormField,
          getDateFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
          getSelectFormField,
          getDateFormField,
          getFormField,
          getFormField,
          getFormField,
        ],
        params: [
          ["例如：", (v) => false],
          [(v) => false],
          ["例如：", (v) => false],
          ["例如：", (v) => false],
          ["例如：", (v) => false],
          ["例如：", (v) => false],
          ["例如：", (v) => false],
          ["例如：1", (v) => false],
          ["例如：", (v) => false],
          ["例如：1", (v) => false],
          ["例如：", (v) => false],
          [(v) => ["是", "否"], (v) => false],
          [(v) => v.sfqy !== "是"],
          ["例如：", (v) => v.sfqy !== "是"],
          ["例如：", (v) => v.sfqy !== "是"],
          ["例如：", (v) => v.sfqy !== "是"],
          ["例如：", (v) => v.sfqy !== "是"],
        ]
      }
    },
  },
  "十、外相":{
    "外相": {
      name: "photo",
      fields: [ "time","photo", "details"],
      columns: [ "照片日期","照片文件", "照片描述"],
      uploadParams: {
        name: "外相",
        api: "photo",
        fields: [ "time","photo", "details"],
        columns: [ "照片日期","照片文件", "照片描述"],
        validations: [
          Yup.string(),
          Yup.array().min(1, "至少上传一张照片").required(requiredMessage),
          Yup.string(),
        ],
        functions: [
          getDateFormField,
          getPhotoFormField,
          getFormField,
        ],
        params: [
          [(v)=>false],
          ["选择文件", (v)=>false],
          ["照片描述", (v)=>false],
        ]
      }
    },
  },
  "十一、样本库": {
    "样本库": {
      name: "sample",
      fields: ["id", "gender", "age", "mzid", "zyid", "time", "seqmethod", "qclx", "qcfs", "lcfq", "tnm", "blfq", "side", "bllx", "zzxfj", "xfzzl", "xfqy", "xfzfa", "fzfx", "er", "pr", "her2", "ki67"],
      columns: ["编号", "性别", "年龄", "门诊号", "住院号", "取标本时间", "测序方法", "取材类型", "取材方式", "临床分期", "TNM分期", "病理分期", "侧别", "病理类型", "组织学分级", "新辅助治疗", "新辅助前或后取样", "新辅助方案", "分子分型", "ER", "PR", "HER2", "Ki67"],
      uploadParams: {  // 用于编写上传表格代码的数据
        name: "样本库",
        api: "sample",
        fields: ["id", "gender", "age", "mzid", "zyid", "time", "seqmethod", "qclx", "qcfs", "lcfq", "tnm", "blfq", "side", "bllx", "zzxfj", "xfzzl", "xfqy", "xfzfa", "fzfx", "er", "pr", "her2", "ki67"],
        columns: ["编号", "性别", "年龄", "门诊号", "住院号", "取标本时间", "测序方法", "取材类型", "取材方式", "临床分期", "TNM分期", "病理分期", "侧别", "病理类型", "组织学分级", "新辅助治疗", "新辅助前或后取样", "新辅助方案", "分子分型", "ER", "PR", "HER2", "Ki67"],
        validations: [
          Yup.number().required(requiredMessage).positive(notPositiveNumberError).integer(notIntegerError),
          Yup.string().required(requiredMessage),
          Yup.number().required(requiredMessage).positive(notPositiveNumberError).integer(notIntegerError),
          Yup.number().required(requiredMessage).positive(notPositiveNumberError).integer(notIntegerError),
          Yup.number().required(requiredMessage).positive(notPositiveNumberError).integer(notIntegerError),
          Yup.string().required(requiredMessage).matches("^\\d{1,4}-(?:1[0-2]|0?[1-9])-(?:0?[1-9]|[1-2]\\d|30|31)$", syntaxError),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
        ],
        functions: [
          getFormField,
          getSelectFormField,
          getFormField,
          getFormField,
          getFormField,
          getDateFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
          getSelectFormField,
          getFormField,
          getFormField,
          getSelectFormField,
          getSelectFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
        ],
        params: [
          ["例如：", (v) => false],
          [(v) => ["男", "女"], (v) => false],
          ["例如：", (v) => false],
          ["例如：", (v) => false],
          ["例如：", (v) => false],
          [(v) => false],
          ["例如：", (v) => false],
          ["例如：", (v) => false],
          ["例如：", (v) => false],
          ["例如：", (v) => false],
          ["例如：", (v) => false],
          ["例如：", (v) => false],
          [(v) => ["左", "右", "双"], (v) => false],
          ["例如：", (v) => false],
          ["例如：", (v) => false],
          [(v) => ["是", "否"], (v) => false],
          [(v) => ["新辅前", "新辅后"], (v) => false],
          ["例如：", (v) => false],
          ["例如：", (v) => false],
          ["例如：", (v) => false],
          ["例如：", (v) => false],
          ["例如：", (v) => false],
          ["例如：", (v) => false],
        ]
      }
    },
  },
};

const allTableNames = [
  "患者基本信息", 
  "婚育史", 
  "月经史", 
  "个人史", 
  "既往史", 
  "家族史", 
  "症状",
  "影像",
  "分期",
  "肿瘤病理",
  "腋窝病理",
  "颈部病理",
  "远处病理",
  "新辅治疗",
  "解救治疗", 
  "手术", 
  "术后大病理", 
  "术后辅助治疗", 
  "记录者信息",
  "内分泌治疗依从性",
  "复发信息", 
  "远处转移信息", 
  "生存信息", 
  "21基因信息", 
  "70基因信息", 
  "BRCA基因检测", 
  "外周血标本采样采集信息", 
  "外周血标本采样存放信息", 
  "外周血标本采样取用信息", 
  "复发转移灶标本采样基本情况",
  "复发转移灶标本采样存放信息", 
  "复发转移灶标本采样取用信息", 
  "样本库", "外相"];

const allTableEnglishNames = [
  "patient", 
  "patient_marry_history", 
  "patient_menstruation_history", 
  "patient_history", 
  "previous_history", 
  "family_history", 
  "patient_symptom", //症状
  "patient_images", //影像
  "patient_stages", //分期
  "patient_pathology_carcinoma",  // 肿瘤病理
  "patient_pathology_armpit", //腋窝病理
  "patient_pathology_neck", //颈部病理
  "patient_pathology_distance", // 远处病理
  "neoadjuvant_therapy_info",  // 新辅治疗
  "salvage_therapy_info", // 解救治疗
  "surgical_info", // 手术
  "postoperative_pathology_info", // 术后大病理
  "postoperative_assist", // 术后辅助治疗
  "recorder_information", // 记录者信息
  "endocrine_info",  // 内分泌治疗依从性
  "relapse_info", //复发信息
  "recurrent_info",  // 转移信息
  "survival_info", // 生存信息
  "gene21_detection", // 21基因信息
  "gene70_detection", // 70基因信息
  "genebrca_detection", // BRCA基因信息
  "peripheral_blood_sample_sampling", // 外周血标本采样采集信息
  "sample_store_info", //外周血标本采样存放信息
  "sample_use_info", // 外周血标本采样取用信息
  "sampling_recurrence_metastasis_specimens", //复发转移灶标本采样基本情况
  "sample", //样本库
  "photo", //外相
];

const allSheetNames = Object.keys(allTables);

export {
  allTables,
  allSheetNames,
  allTableNames,
  allTableEnglishNames,
  getFormField,
};
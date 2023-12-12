import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import { DateFormField, FormField, SelectFormField } from "../components/FormField";
import SoftBox from "../../../../components/SoftBox";

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

const provinces = Object.keys(provinceCities);

const mzs = ["汉族", "壮族", "满族", "回族", "苗族", "维吾尔族", "土家族", "彝族", "蒙古族", "藏族", "布依族", "侗族", "瑶族", "朝鲜族", "白族", "哈尼族", "哈萨克族", "黎族", "傣族", "畲族", "傈僳族", "仡佬族", "东乡族", "高山族", "拉祜族", "水族", "佤族", "纳西族", "羌族", "土族", "仫佬族", "锡伯族", "柯尔克孜族", "达斡尔族", "景颇族", "毛南族", "撒拉族", "布朗族", "塔吉克族", "阿昌族", "普米族", "鄂温克族", "怒族", "京族", "基诺族", "德昂族", "保安族", "俄罗斯族", "裕固族", "乌孜别克族", "门巴族", "鄂伦春族", "独龙族", "塔塔尔族", "赫哲族", "珞巴族"];

const getFormField = (values, errors, touched, index, label, name, placeholder, disabled) => (
  <Grid item xs={12} sm={6} key={index}>
    <FormField
      type={"text"}
      label={label}
      name={name}
      value={values[name]}
      placeholder={placeholder}
      error={errors[name] && touched[name]}
      success={values[name].length > 0 && !errors[name]}
      disabled={disabled(values)}
    />
  </Grid>
);

const getFormFieldInherited = (values, errors, touched, index, label, name, getValues, disabled) => (  // value值通过其它value值计算获得
  <Grid item xs={12} sm={6} key={index}>
    <FormField
      type={"text"}
      label={label}
      name={name}
      value={values[name] = getValues(values)}
      error={errors[name] && touched[name]}
      success={values[name].length > 0 && !errors[name]}
      disabled={disabled(values)}
    />
  </Grid>
);

const getSelectFormField = (values, errors, touched, index, label, name, getItems, disabled) => (
  <Grid item xs={12} sm={6} key={index}>
    <SelectFormField
      type={"text"}
      label={label}
      name={name}
      items={getItems(values)}
      value={values[name]}
      error={errors[name] && touched[name]}
      success={values[name].length > 0 && !errors[name] ? "true" : undefined}
      disabled={disabled(values)}
      sx={disabled(values) ? { backgroundColor: "#e9ecef!important" } : {}}
    />
  </Grid>
);

const getDateFormField = (values, errors, touched, index, label, name, disabled) => (
  <Grid item xs={12} sm={6} key={index}>
    <DateFormField
      type={"text"}
      label={label}
      name={name}
      value={values[name]}
      error={errors[name] && touched[name]}
      success={values[name].length > 0 && !errors[name] ? "true" : undefined}
      values={values}
      disabled={disabled(values)}
    />
  </Grid>
);

const requiredMessage = "需要填写";
const syntaxError = "格式错误";
const notPositiveNumberError = "需要是个正数";
const notIntegerError = "需要是个整数"

const allTables = {
  "一、患者基本信息": {
    "患者基本信息": {
      name: "patient_info",
      fields: ["name", "sex", "age", "bhzyid", "hxzyid", "marital_status", "mz", "job", "jg", "addr", "ryDate", "fbDate", "phone1", "phone2", "cert_id", "birthday", "weight", "tall", "bmi"],
      columns: ["姓名", "性别", "初诊年龄", "滨海住院号", "河西住院号", "婚姻状况", "民族", "职业", "籍贯", "现住址", "入院日期", "发现日期", "联系电话1", "联系电话2", "身份证号", "出生日期", "体重", "身高", "BMI"],
      uploadParams: {  // 用于编写上传表格代码的数据
        name: "病人基本信息上传表",
        api: "info",
        fields: ["name", "sex", "age", "marital_status", "mz", "job", "jgProvince", "jgCity", "jg", "addr", "ryDate", "fbDate", "phone1", "phone2", "cert_id", "birthday", "weight", "tall", "bmi"],
        columns: ["姓名", "性别", "初诊年龄", "婚姻状况", "民族", "职业", "籍贯省份", "籍贯城市", "籍贯", "现住址", "入院日期", "发现日期", "联系电话1", "联系电话2", "身份证号", "出生日期", "体重", "身高", "BMI"],
        validations: [
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.number().required(requiredMessage).positive(notPositiveNumberError).integer(notIntegerError),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage).matches("^\\d{1,4}-(?:1[0-2]|0?[1-9])-(?:0?[1-9]|[1-2]\\d|30|31)$", syntaxError),
          Yup.string().required(requiredMessage).matches("^\\d{1,4}-(?:1[0-2]|0?[1-9])-(?:0?[1-9]|[1-2]\\d|30|31)$", syntaxError),
          Yup.number().required(requiredMessage).positive(notPositiveNumberError).integer(notIntegerError).min(1e10, syntaxError).max(1e11 - 1, syntaxError),
          Yup.number().required(requiredMessage).positive(notPositiveNumberError).integer(notIntegerError).min(1e10, syntaxError).max(1e11 - 1, syntaxError),
          Yup.string().required(requiredMessage).matches("^[1-9]\\d{5}(?:18|19|20)\\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\\d|30|31)\\d{3}[0-9Xx]$", syntaxError),
          Yup.string().required(requiredMessage).matches("^\\d{1,4}-(?:1[0-2]|0?[1-9])-(?:0?[1-9]|[1-2]\\d|30|31)$", syntaxError),
          Yup.number().required(requiredMessage).positive(notPositiveNumberError),
          Yup.number().required(requiredMessage).positive(notPositiveNumberError),
          Yup.number().required(requiredMessage).positive(notPositiveNumberError),
        ],
        functions: [getFormField, getSelectFormField, getFormField, getSelectFormField, getSelectFormField, getFormField, getSelectFormField, getSelectFormField, getFormFieldInherited, getFormField, getDateFormField, getDateFormField, getFormField, getFormField, getFormField, getFormFieldInherited, getFormField, getFormField, getFormFieldInherited,],
        params: [["eg. 李华", (v) => false], [(v) => ["男", "女"], (v) => false], ["eg. 23", (v) => false], [(v) => ["已婚", "未婚", "离异", "丧偶"], (v) => false], [(v) => mzs, (v) => false], ["eg. 务农", (v) => false], [(values) => provinces, (v) => false], [(v) => provinceCities[v.jgProvince] || [], (v) => false], [(v) => v["jgProvince"] + v["jgCity"], (v) => false], ["eg. 天津市某镇某户", (v) => false], [(v) => false], [(v) => false], ["eg. 12341234123", (v) => false], ["eg. 12341234123", (v) => false], ["eg. 123123123123123123", (v) => false], [(v) => v.cert_id.slice(6, 10) + "-" + v.cert_id.slice(10, 12) + "-" + v.cert_id.slice(12, 14), (v) => false], ["eg. 50", (v) => false], ["eg. 170", (v) => false], [(v) => (v.weight / (v.tall * v.tall) || ""), (v) => false]]
      }
    },
  },
  "二、妇科相关信息": {
    "婚育史": {
      name: "patient_marry_history",
      fields: ["sy", "qzssyzt", "ccage", "mtage", "hycs", "zyc", "lczcs", "fzsy", "fzsyfs", "sfmrwy", "mrcb", "mrsc"],
      columns: ["生育", "确诊时生育状态", "初产年龄", "末胎年龄", "怀孕次数", "足月产", "流产或早产史", "是否辅助生育", "辅助生育方式", "是否母乳喂养", "哺乳侧别", "哺乳时长"],
      uploadParams: {
        name: "婚育史上传表",
        api: "marryhistory",
        fields: ["sy", "qzssyzt", "ccage", "mtage", "hycs", "zyc", "lczcs", "fzsy", "fzsyfs", "sfmrwy", "mrcb", "mrsc"],
        columns: ["生育", "确诊时生育状态", "初产年龄", "末胎年龄", "怀孕次数", "足月产", "流产或早产史", "是否辅助生育", "辅助生育方式", "是否母乳喂养", "哺乳侧别", "哺乳时长"],
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
          [(v) => ["无", "哺乳期", "妊娠期"], (v) => v.sy !== "是"],
          ["eg. 24", (v) => v.sy !== "是"],
          ["eg. 24", (v) => v.sy !== "是"],
          ["eg. 2", (v) => v.sy !== "是"],
          ["eg. x胎", (v) => v.sy !== "是"],
          ["eg. x次", (v) => v.sy !== "是"],
          [(v) => ["是", "否"], (v) => v.sy !== "是"],
          ["eg. 方式", (v) => v.sy !== "是" || v.fzsy !== "是"],
          [(v) => ["是", "否"], (v) => v.sy !== "是"],
          [(v) => ["左", "右", "双"], (v) => v.sy !== "是" || v.sfmrwy !== "是"],
          ["eg. 12", (v) => v.sy !== "是" || v.sfmrwy !== "是"],
        ],
      }
    },
    "月经史": {
      name: "patient_menstruation_history",
      fields: ["ccage", "yjzq", "jq", "sfjj", "jjfs", "jtjjfs", "mqyj", "jjage"],
      columns: ["初潮年龄", "月经周期", "经期", "是否绝经", "绝经方式", "具体绝经方式", "末次月经", "绝经年龄"],
      uploadParams: {
        name: "月经史上传表",
        api: "pmhistory",
        fields: ["ccage", "yjzq", "jq", "sfjj", "jjfs", "jtjjfs", "mqyj", "jjage"],
        columns: ["初潮年龄", "月经周期", "经期", "是否绝经", "绝经方式", "具体绝经方式", "末次月经", "绝经年龄"],
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
          getFormField,
          getFormField,
          getFormField,
          getFormField,
        ],
        params: [
          ["eg. 16", (v) => false],
          ["eg. 30", (v) => false],
          ["eg. 8", (v) => false],
          [(v) => ["是", "否"], (v) => false],
          ["eg. ", (v) => v.sfjj !== "是"],
          ["eg. ", (v) => v.sfjj !== "是"],
          ["eg. ", (v) => v.sfjj !== "是"],
          ["eg. ", (v) => v.sfjj !== "是"],
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
          [(v) => ["是", "否"], (v) => false],
          ["eg. 100", (v) => v.sfxy !== "是"],
          [(v) => ["是", "否"], (v) => false],
          ["eg. 100", (v) => v.sfyj !== "是"],
        ],
      }
    },
    "既往史": {
      name: "previous_history",
      fields: ["rxlxjbs", "rxlxjbsjtqk", "grxjb", "grxjbjtqk", "xgyxrq", "xgzyrq", "xgzyqzfs", "xtxjb", "xtjbjtqk", "sss", "sssjtqk", "exzl", "exzljtqk"],
      columns: ["乳腺良性疾病史 ", "乳腺良性疾病史具体情况 ", "感染性疾病 ", "感染性疾病具体情况 ", "新冠阳性日期 ", "新冠转阴日期 ", "新冠转阴确诊方式 ", "是否有系统疾病 ", "系统疾病具体情况 ", "是否有手术史 ", "手术史具体情况 ", "是否有恶性肿瘤既往史 ", "恶性肿瘤既往史具体情况"],
      uploadParams: {
        name: "既往史上传表",
        api: "prehistory",
        fields: ["rxlxjbs", "rxlxjbsjtqk", "grxjb", "grxjbjtqk", "xgyxrq", "xgzyrq", "xgzyqzfs", "xtxjb", "xtjbjtqk", "sss", "sssjtqk", "exzl", "exzljtqk"],
        columns: ["乳腺良性疾病史 ", "乳腺良性疾病史具体情况 ", "感染性疾病 ", "感染性疾病具体情况 ", "新冠阳性日期 ", "新冠转阴日期 ", "新冠转阴确诊方式 ", "是否有系统疾病 ", "系统疾病具体情况 ", "是否有手术史 ", "手术史具体情况 ", "是否有恶性肿瘤既往史 ", "恶性肿瘤既往史具体情况"],
        validations: [
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string().required(requiredMessage).matches("^\\d{1,4}-(?:1[0-2]|0?[1-9])-(?:0?[1-9]|[1-2]\\d|30|31)$", syntaxError),
          Yup.string().required(requiredMessage).matches("^\\d{1,4}-(?:1[0-2]|0?[1-9])-(?:0?[1-9]|[1-2]\\d|30|31)$", syntaxError),
          Yup.string(),
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string().required(requiredMessage),
          Yup.string(),
        ],
        functions: [
          getSelectFormField,
          getFormField,
          getSelectFormField,
          getFormField,
          getDateFormField,
          getDateFormField,
          getFormField,
          getSelectFormField,
          getFormField,
          getSelectFormField,
          getFormField,
          getSelectFormField,
          getFormField,
        ],
        params: [
          [(v) => ["无", "纤维腺瘤", "增生性疾病", "导管内乳头状瘤", "炎症性疾病", "其他"], (v) => false],
          ["eg. ", (v) => v.rxlxjbs === "无"],
          [(v) => ["无", "肝炎", "结核", "梅毒", "艾滋", "新冠", "其他"], (v) => false],
          ["eg. ", (v) => v.grxjb === "无"],
          [(v) => v.grxjb !== "新冠"],
          [(v) => v.grxjb !== "新冠"],
          ["eg. ", (v) => v.grxjb !== "新冠"],
          [(v) => ["无", "高血压", "心脏病", "糖尿病", "青光眼", "哮喘", "甲状腺疾病", "脑血管疾病", "精神疾病", "其他"], (v) => false],
          ["eg. ", (v) => v.xtxjb === "无"],
          [(v) => ["是", "否"], (v) => false],
          ["eg. ", (v) => v.sss !== "是"],
          [(v) => ["是", "否"], (v) => false],
          ["eg. ", (v) => v.exzl !== "是"],
        ],
      },
    },
    "家族史": {  // tuple
      name: "family_history",
      fields: ["xqs", "rxa", "lca", "wxzl", "qtwxzl"],
      columns: ["x级亲属", "是否有恶性肿瘤家族史", "乳腺癌家族史", "卵巢癌家族史", "其他恶性肿瘤家族史"],
      uploadParams: {
        name: "家族史上传表",
        api: "familyhistory",
        fields: ["xqs", "rxa", "lca", "wxzl", "qtwxzl"],
        columns: ["x级亲属", "是否有恶性肿瘤家族史", "乳腺癌家族史", "卵巢癌家族史", "其他恶性肿瘤家族史"],
        validations: [
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string(),
          Yup.string(),
        ],
        functions: [
          getFormField,
          getSelectFormField,
          getFormField,
          getFormField,
          getFormField,
        ],
        params: [
          ["eg. ", (v) => false],
          [(v) => ["是", "否"], (v) => false],
          ["eg. ", (v) => v.rxa !== "是"],
          ["eg. ", (v) => v.rxa !== "是"],
          ["eg. ", (v) => v.rxa !== "是"],
        ],
      }
    },
  },
  "四、患者临床特征": {
    "患者临床特征": {
      name: "clinical_feature",
      fields: ["fxwz", "zkwz", "lcsfzz", "sfzzjtms", "hcrt", "hcrtjtms", "hcpf", "hcpfjtms", "rtyy", "yydg", "yyxz", "yyxzjtms", "yxjclx", "yxjch", "sqzldx", "sqtfq", "sqyxlbjwz", "sqyxlbjdx", "sqnfq", "yczy", "zybw", "jtzybw", "tnm", "zlbzqzfs", "lbjqzfs", "qzblh", "sfxmyzh", "er", "pr", "her2", "her2jtqk", "ki67", "p53", "fish", "fishjtqk", "fcopy", "fratio", "ywlbjer", "ywlbjpr", "ywlbjher2", "ywlbjher2jtqk", "ywlbjki67", "ywlbjp53", "ywlbjfish", "ywlbjfishjtqk", "ywlbjfcopy", "ywlbjfratio", "jblbjer", "jblbjpr", "jblbjher2", "jblbjher2jtqk", "jblbjki67", "jblbjp53", "jblbjfish", "jblbjfishjtqk", "jblbjfcopy", "jblbjfratio", "yczyqzbw", "yczyer", "yczypr", "yczyher2", "yczyher2jtqk", "yczyki67", "yczyp53", "yczyfish", "yczyfishjtqk", "yczyfcopy", "yczyfratio", "xfzzl", "xfzzlkssj", "xfzzlfa", "xfzlc", "xfzlcyw", "xfzzlpg", "xfzzlpj", "jjzl", "sqzlkssj", "sqzlfa", "jjlc", "jjlcyw", "sqzlpg", "sqzlpj"],
      columns: ["发现方式", "肿瘤位置", "有无临床首发症状", "首发症状具体描述", "患侧乳头", "患侧乳头症状具体描述", "患侧皮肤", "患侧皮肤症状具体描述", "乳头溢液", "溢液导管", "溢液性质", "溢液性质具体描述", "影像检查类型", "影像检查号", "术前影像肿瘤大小", "术前T分期", "术前影像腋下淋巴结位置", "术前影像腋下淋巴结大小", "术前N分期", "远处转移与否", "转移部位", "具体转移部位", "临床TNM分期", "肿瘤病灶确诊方式", "淋巴结确诊方式", "确诊病理信息", "是否行免疫组化", "肿瘤病灶穿刺ER", "肿瘤病灶穿刺PR", "肿瘤病灶穿刺Her2", "肿瘤病灶穿刺Her2具体情况", "肿瘤病灶穿刺Ki67", "肿瘤病灶穿刺P53", "肿瘤病灶FISH", "肿瘤病灶FISH具体情况", "肿瘤病灶FISH copy数", "肿瘤病灶FISH ratio", "腋窝淋巴结穿刺ER", "腋窝淋巴结穿刺PR", "腋窝淋巴结穿刺Her2", "腋窝淋巴结穿刺Her2具体情况", "腋窝淋巴结穿刺Ki67", "腋窝淋巴结穿刺P53", "腋窝淋巴结FISH", "腋窝淋巴结FISH具体情况", "腋窝淋巴结FISH copy数", "腋窝淋巴结FISH ratio", "颈部淋巴结穿刺ER", "颈部淋巴结穿刺PR", "颈部淋巴结穿刺Her2", "颈部淋巴结穿刺Her2具体情况", "颈部淋巴结穿刺Ki67", "颈部淋巴结穿刺P53", "颈部淋巴结FISH", "颈部淋巴结FISH具体情况", "颈部淋巴结FISHcopy数", "颈部淋巴结FISHratio", "远处转移确诊部位", "远处转移灶ER", "远处转移灶PR", "远处转移灶Her2", "远处转移灶Her2具体情况", "远处转移灶Ki67", "远处转移灶P53", "远处转移灶FISH", "远处转移灶FISH具体情况", "远处转移灶FISH copy数", "远处转移灶FISH ratio", "术前是否行新辅助治疗", "新辅助治疗开始时间", "新辅助治疗方案及周期", "新辅助治疗期间是否使用卵巢功能抑制剂", "新辅助治疗卵巢功能抑制剂具体药物名称", "新辅助治疗过程评估", "新辅助治疗疗效评价", "术前是否行解救治疗", "术前解救治疗开始时间", "术前解救治疗方案及周期", "术前解救治疗期间是否使用卵巢功能抑制剂", "术前解救治疗卵巢功能抑制剂具体药物名称", "术前解救治疗过程评估", "术前解救治疗疗效评价"],
      uploadParams: {
        name: "患者临床特征上传表",
        api: "clinicalFeature",
        fields: ["fxwz", "zkwz", "lcsfzz", "sfzzjtms", "hcrt", "hcrtjtms", "hcpf", "hcpfjtms", "rtyy", "yydg", "yyxz", "yyxzjtms", "yxjclx", "yxjch", "sqzldx", "sqtfq", "sqyxlbjwz", "sqyxlbjdx", "sqnfq", "yczy", "zybw", "jtzybw", "tnm", "zlbzqzfs", "lbjqzfs", "qzblh", "sfxmyzh", "er", "pr", "her2", "her2jtqk", "ki67", "p53", "fish", "fishjtqk", "fcopy", "fratio", "ywlbjer", "ywlbjpr", "ywlbjher2", "ywlbjher2jtqk", "ywlbjki67", "ywlbjp53", "ywlbjfish", "ywlbjfishjtqk", "ywlbjfcopy", "ywlbjfratio", "jblbjer", "jblbjpr", "jblbjher2", "jblbjher2jtqk", "jblbjki67", "jblbjp53", "jblbjfish", "jblbjfishjtqk", "jblbjfcopy", "jblbjfratio", "yczyqzbw", "yczyer", "yczypr", "yczyher2", "yczyher2jtqk", "yczyki67", "yczyp53", "yczyfish", "yczyfishjtqk", "yczyfcopy", "yczyfratio",
          "xfzzl", "xfzzlkssj", "xfzzlfa", "xfzlc", "xfzlcyw", "xfzzlpg", "xfzzlpj",
          "jjzl", "sqzlkssj", "sqzlfa", "jjlc", "jjlcyw", "sqzlpg", "sqzlpj"],
        columns: ["发现方式", "肿瘤位置", "有无临床首发症状", "首发症状具体描述", "患侧乳头", "患侧乳头症状具体描述", "患侧皮肤", "患侧皮肤症状具体描述", "乳头溢液", "溢液导管", "溢液性质", "溢液性质具体描述",
          "影像检查类型", "影像检查号", "术前影像肿瘤大小", "术前T分期", "术前影像腋下淋巴结位置", "术前影像腋下淋巴结大小", "术前N分期", "远处转移与否", "转移部位", "具体转移部位", "临床TNM分期",
          "肿瘤病灶确诊方式", "淋巴结确诊方式", "确诊病理信息", "是否行免疫组化", "肿瘤病灶穿刺ER", "肿瘤病灶穿刺PR", "肿瘤病灶穿刺Her2", "肿瘤病灶穿刺Her2具体情况", "肿瘤病灶穿刺Ki67", "肿瘤病灶穿刺P53", "肿瘤病灶FISH", "肿瘤病灶FISH具体情况", "肿瘤病灶FISH copy数", "肿瘤病灶FISH ratio", "腋窝淋巴结穿刺ER", "腋窝淋巴结穿刺PR", "腋窝淋巴结穿刺Her2", "腋窝淋巴结穿刺Her2具体情况", "腋窝淋巴结穿刺Ki67", "腋窝淋巴结穿刺P53", "腋窝淋巴结FISH", "腋窝淋巴结FISH具体情况", "腋窝淋巴结FISH copy数", "腋窝淋巴结FISH ratio", "颈部淋巴结穿刺ER", "颈部淋巴结穿刺PR", "颈部淋巴结穿刺Her2", "颈部淋巴结穿刺Her2具体情况", "颈部淋巴结穿刺Ki67", "颈部淋巴结穿刺P53", "颈部淋巴结FISH", "颈部淋巴结FISH具体情况", "颈部淋巴结FISHcopy数", "颈部淋巴结FISHratio", "远处转移确诊部位", "远处转移灶ER", "远处转移灶PR", "远处转移灶Her2", "远处转移灶Her2具体情况", "远处转移灶Ki67", "远处转移灶P53", "远处转移灶FISH", "远处转移灶FISH具体情况", "远处转移灶FISH copy数", "远处转移灶FISH ratio",
          "术前是否行新辅助治疗", "新辅助治疗开始时间", "新辅助治疗方案及周期", "新辅助治疗期间是否使用卵巢功能抑制剂", "新辅助治疗卵巢功能抑制剂具体药物名称", "新辅助治疗过程评估", "新辅助治疗疗效评价",
          "术前是否行解救治疗", "术前解救治疗开始时间", "术前解救治疗方案及周期", "术前解救治疗期间是否使用卵巢功能抑制剂", "术前解救治疗卵巢功能抑制剂具体药物名称", "术前解救治疗过程评估", "术前解救治疗疗效评价"],
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
          Yup.string(),
          Yup.string(),

          Yup.string().required(requiredMessage),
          Yup.number().positive(notPositiveNumberError).integer(notIntegerError),
          Yup.number().positive(notPositiveNumberError).integer(notIntegerError),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string(),
          Yup.string().required(requiredMessage),

          Yup.string().required(requiredMessage),
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
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),

          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),

          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),

          Yup.string().required(requiredMessage),
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
          getSelectFormField,
          getFormField,
          getSelectFormField,
          getFormField,
          getSelectFormField,
          getFormField,
          getSelectFormField,
          getSelectFormField,
          getSelectFormField,
          getFormField,

          getSelectFormField,
          getFormField,
          getFormField,
          //getFormFieldInherited,
          getSelectFormField,
          getSelectFormField,
          getFormField,
          //getFormFieldInherited,
          getSelectFormField,
          getSelectFormField,
          getSelectFormField,
          getFormField,
          getFormFieldInherited,

          getSelectFormField,
          getSelectFormField,
          getFormField,
          getSelectFormField,
          getFormField,
          getFormField,
          getSelectFormField,
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
          getFormField,
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
          getSelectFormField,
          getFormField,
          getFormField,
          getFormField,

          getSelectFormField,
          getDateFormField,
          getFormField,
          getSelectFormField,
          getFormField,
          getFormField,
          getFormField,
        ],
        params: [
          [(v) => ["自查", "体检", "其他"], (v) => false],
          [(v) => ["右乳", "左乳", "双乳"], (v) => false],
          [(v) => ["肿块", "乳头溢液", "其他首发症状"], (v) => false],
          ["eg. ", (v) => false],
          [(v) => ["正常", "凹陷", "半固定", "固定", "湿疹样", "乳头皴裂", "乳头缺如", "其他"], (v) => false],
          ["eg. ", (v) => false],
          [(v) => ["正常", "水肿", "卫星结节", "破溃", "桔皮样变", "炎样红肿", "静脉曲张", "其他"], (v) => false],
          ["eg. ", (v) => false],
          [(v) => ["自发", "非自发"], (v) => v.lcsfzz !== "乳头溢液"],
          [(v) => ["左侧", "右侧", "单个", "多个"], (v) => v.lcsfzz !== "乳头溢液"],
          [(v) => ["陈旧血性", "新鲜血性", "淡黄", "乳汁样", "水样", "脓性", "其他"], (v) => v.lcsfzz !== "乳头溢液"],
          ["eg. ", (v) => v.lcsfzz !== "乳头溢液"],

          [(v) => ["b超", "钼靶", "核磁"], (v) => false],
          ["eg. 123", (v) => false],
          ["eg. 1", (v) => false],
          // [(v) => {
          //   if (typeof (v.sqzldx) === "number") {
          //     if (v.sqzldx <= 2) return "T1";
          //     else if (v.sqzldx <= 5) return "T2";
          //     else return "T3";
          //   } 

          //   return "T4";

          // }, (v) => false],
          [(v) => ["T1", "T2", "T3", "T4"], (v) => false],
          [(v) => ["腋下Ⅰ水平", "腋下Ⅱ水平", "腋窝Ⅲ水平", "锁骨下", "锁骨上", "乳内淋巴结"], (v) => false],
          ["eg. 1", (v) => false],
          // [(v) => {
          //   // todo 多选才能做实现
          //   return "N1";
          // }, (v) => false],
          [(v) => ["N0", "N1", "N2", "N3"], (v) => false],
          [(v) => ["是", "否"], (v) => false],
          [(v) => ["肝", "肺", "骨", "脑", "其他"], (v) => v.yczy !== "是"],
          ["eg. ", (v) => v.yczy !== "是"],
          [(v) => {
            // todo
            if (v.yczy === '是') {
              return 'IV'
            }
            else if (v.yczy === '否') {
              if (v.sqnfn === 'N3') {
                return 'IIIC'
              }
              else if (v.sqtfq === 'T4') {
                return 'IIIB'
              }
              else if (v.sqnfn === 'N2' || (v.sqnfn === 'N1' && v.sqtfq === 'T3')) {
                return 'IIIA'
              }
              else if ((v.sqnfn === 'N1' && v.sqtfq == 'T2') || (v.sqnfn === 'N0' && v.sqtfq == 'T3')) {
                return 'IIB'
              }
              else if (v.sqnfn === 'N1' || (v.sqnfn === 'N0' && v.sqtfq === 'T2')) {
                return 'IIA'
              }
              else if (v.sqtfq == 'T1' && v.sqnfn == 'N0') {
                return 'IA'
              }
              else if (v.sqnfn === 'N0' && (v.sqtfn === 'T0' || v.sqtfn === 'T1')) {
                return 'IB'
              }
            }
            return "Unknown";
          }, (v) => false],

          [(v) => ["术前开放活检", "术中开放活检", "穿刺粗针吸", "穿刺细针吸"], (v) => false],
          [(v) => ["无", "粗针吸", "细针吸", "术前淋巴结活检"], (v) => false],
          ["eg. 123", (v) => false],
          [(v) => ["是", "否"], (v) => false],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          [(v) => ["阴性", "1+", "2+且FISH阴性", "2+且FISH阳性", "2+未做FISH", "3+", "其他"], (v) => v.sfxmyzh !== "是"],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          [(v) => ["阴性", "1+", "2+且FISH阴性", "2+且FISH阳性", "2+未做FISH", "3+", "其他"], (v) => v.sfxmyzh !== "是"],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          [(v) => ["阴性", "1+", "2+且FISH阴性", "2+且FISH阳性", "2+未做FISH", "3+", "其他"], (v) => v.sfxmyzh !== "是"],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          ["eg. ", (v) => v.sfxmyzh !== "是"],
          ["eg. 1", (v) => v.yczy !== "是"],
          ["eg. 2", (v) => v.yczy !== "是"],
          ["eg. 3", (v) => v.yczy !== "是"],
          [(v) => ["阴性", "1+", "2+且FISH阴性", "2+且FISH阳性", "2+未做FISH", "3+", "其他"], (v) => v.yczy !== "是"],
          ["eg. 4", (v) => v.yczy !== "是"],
          ["eg. 5", (v) => v.yczy !== "是"],
          ["eg. ", (v) => v.yczy !== "是"],
          ["eg. ", (v) => v.yczy !== "是"],
          ["eg. ", (v) => v.yczy !== "是"],
          ["eg. ", (v) => v.yczy !== "是"],
          ["eg. ", (v) => v.yczy !== "是"],

          [(v) => ["是", "否"], (v) => false],
          [(v) => v.xfzzl !== "是"],
          ["eg. ", (v) => v.xfzzl !== "是"],
          [(v) => ["是", "否"], (v) => v.xfzzl !== "是"],
          ["eg. ", (v) => v.xfzzl !== "是" || v.xfzlc !== "是"],
          ["eg. ", (v) => v.xfzzl !== "是"],
          ["eg. ", (v) => v.xfzzl !== "是"],

          [(v) => ["是", "否"], (v) => false],
          [(v) => v.jjzl !== "是"],
          ["eg. ", (v) => v.jjzl !== "是"],
          [(v) => ["是", "否"], (v) => v.jjzl !== "是"],
          ["eg. ", (v) => v.jjzl !== "是" || v.jjlc !== "是"],
          ["eg. ", (v) => v.jjzl !== "是"],
          ["eg. ", (v) => v.jjzl !== "是"],
        ],
      }
    },
  },
  "五、手术及病理信息": {
    "手术及病理信息": {
      name: "surgical_pathological_info",
      fields: ["ssrq", "ssfs", "sfbr", "sfzz", "ywlbqsfs", "shdblh", "bzsl", "ryzwdx", "blxfq", "bllx", "blxjtms", "zzxfj", "zzxfjjtqk", "lbxgqf", "lbgbs", "jzznqrlbxb", "hlfy", "brsskjazz", "brssbbzdd", "brssbbbqzdd", "lbjqk", "ywlbzs", "yxywlbzs", "er", "pr", "her2", "her2jtqk", "ki67", "p53", "fish", "fishjtqk", "hfc", "hfr"],
      columns: ["手术日期", "手术方式", "是否保乳", "是否再造", "腋窝淋巴结清扫方式", "术后大病理号", "病灶数量", "肉眼肿物大小", "病理学分期", "病理类型", "病理具体描述", "组织学分级", "组织学分级具体情况", "淋巴血管侵犯与否", "淋巴管癌栓", "间质内浸润淋巴细胞", "化疗反应", "保乳手术标本周断端是否可见癌组织", "保乳手术标本周断端", "保乳手术标本补切周断端", "淋巴结情况", "腋窝淋巴结总数", "阳性腋窝淋巴结数", "ER", "PR", "HER2", "HER2具体情况", "Ki67", "P53", "FISH", "FISH具体情况", "HER2-FISH COPY数", "HER2-FISH RATIO"],
      uploadParams: {
        name: "手术及病理信息上传表",
        api: "surgical",
        fields: ["ssrq", "ssfs", "sfbr", "sfzz", "ywlbqsfs", "shdblh", "bzsl", "ryzwdx", "blxfq", "bllx", "blxjtms", "zzxfj", "zzxfjjtqk", "lbxgqf", "lbgbs", "jzznqrlbxb", "hlfy", "brsskjazz", "brssbbzdd", "brssbbbqzdd", "lbjqk", "ywlbzs", "yxywlbzs", "er", "pr", "her2", "her2jtqk", "ki67", "p53", "fish", "fishjtqk", "hfc", "hfr"],
        columns: ["手术日期", "手术方式", "是否保乳", "是否再造", "腋窝淋巴结清扫方式", "术后大病理号", "病灶数量", "肉眼肿物大小", "病理学分期", "病理类型", "病理具体描述", "组织学分级", "组织学分级具体情况", "淋巴血管侵犯与否", "淋巴管癌栓", "间质内浸润淋巴细胞", "化疗反应", "保乳手术标本周断端是否可见癌组织", "保乳手术标本周断端", "保乳手术标本补切周断端", "淋巴结情况", "腋窝淋巴结总数", "阳性腋窝淋巴结数", "ER", "PR", "HER2", "HER2具体情况", "Ki67", "P53", "FISH", "FISH具体情况", "HER2-FISH COPY数", "HER2-FISH RATIO"],
        validations: [
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.number().positive(notPositiveNumberError).integer(notIntegerError),
          Yup.number().positive(notPositiveNumberError).integer(notIntegerError),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.number().positive(notPositiveNumberError).integer(notIntegerError),
          Yup.number().positive(notPositiveNumberError).integer(notIntegerError),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string(),
          Yup.string().required(requiredMessage),
          Yup.string().required(requiredMessage),
        ],
        functions: [
          getDateFormField,
          getFormField,
          getSelectFormField,
          getSelectFormField,
          getSelectFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
          getSelectFormField,
          getFormField,
          getSelectFormField,
          getFormField,
          getFormField,
          getSelectFormField,
          getFormField,
          getFormField,
          getSelectFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
          getSelectFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
        ],
        params: [
          [(v) => false],
          ["eg. ", (v) => false],
          [(v) => ["是", "否"], (v) => false],
          [(v) => ["是", "否"], (v) => false],
          [(v) => ["腋清", "前哨淋巴结活检"], (v) => false],
          ["eg. 12", (v) => false],
          ["eg. 1", (v) => false],
          ["eg. 1", (v) => false],
          ["eg. ", (v) => false],
          [(v) => ["导管内癌", "小叶原位癌", "乳头湿疹样乳腺癌", "浸润性导管癌", "浸润性小叶癌", "浸润性特殊癌", "其他"], (v) => false],
          ["eg. ", (v) => false],
          [(v) => ["I", "II", "III", "I-II", "II-III", "其他"], (v) => false],
          ["eg. ", (v) => false],
          ["eg. ", (v) => false],
          [(v) => ["有", "无"], (v) => false],
          ["eg. ", (v) => false],
          ["eg. ", (v) => false],
          [(v) => ["是", "否"], (v) => false],
          ["eg. ", (v) => false],
          ["eg. ", (v) => false],
          ["eg. ", (v) => false],
          ["eg. 1", (v) => false],
          ["eg. 2", (v) => false],
          ["eg. 1", (v) => false],
          ["eg. 1", (v) => false],
          [(v) => ["阴性", "1+", "2+且FISH阴性", "2+且FISH阳性", "2+未做FISH", "3+", "其他"], (v) => false],
          ["eg. ", (v) => false],
          ["eg. ", (v) => false],
          ["eg. ", (v) => false],
          ["eg. ", (v) => false],
          ["eg. ", (v) => false],
          ["eg. ", (v) => false],
          ["eg. ", (v) => false],
        ]
      }
    },
  },
  "六、术后辅助治疗": {
    "术后辅助治疗": {
      name: "postoperative_treatment",
      fields: ["shhl", "hlkssj", "shhlfam", "hllc", "hllcyw", "shhlxq", "shnfmzl", "nfmzlkssj", "nfmzlym", "nfmzlfzy", "shbxzl", "bxzlkssj", "bxzlym", "shfl", "flkssj", "flbz", "shmyzl", "myzlsj", "myzlbz"],
      columns: ["术后化疗", "术后化疗开始时间", "术后化疗方案", "术后化疗期间是否使用卵巢功能抑制剂", "术后化疗卵巢功能抑制剂具体药物名称", "术后化疗详情", "术后内分泌治疗", "术后内分泌治疗开始时间", "术后内分泌治疗药物", "内分泌治疗副作用", "是否术后靶向治疗", "术后靶向治疗开始时间", "术后靶向治疗具体药物", "术后放疗", "术后放疗开始时间", "术后放疗备注", "术后免疫治疗", "术后免疫治疗开始时间", "术后免疫治疗备注"],
      uploadParams: {
        name: "术后辅助治疗上传表",
        api: "postoper",
        fields: ["shhl", "hlkssj", "shhlfam", "hllc", "hllcyw", "shhlxq", "shnfmzl", "nfmzlkssj", "nfmzlym", "nfmzlfzy", "shbxzl", "bxzlkssj", "bxzlym", "shfl", "flkssj", "flbz", "shmyzl", "myzlsj", "myzlbz"],
        columns: ["术后化疗", "术后化疗开始时间", "术后化疗方案", "术后化疗期间是否使用卵巢功能抑制剂", "术后化疗卵巢功能抑制剂具体药物名称", "术后化疗详情", "术后内分泌治疗", "术后内分泌治疗开始时间", "术后内分泌治疗药物", "内分泌治疗副作用", "是否术后靶向治疗", "术后靶向治疗开始时间", "术后靶向治疗具体药物", "术后放疗", "术后放疗开始时间", "术后放疗备注", "术后免疫治疗", "术后免疫治疗开始时间", "术后免疫治疗备注"],
        validations: [
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string(),
          Yup.string(),
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string(),
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string(),
          Yup.string().required(requiredMessage),
          Yup.string(),
          Yup.string(),
        ],
        functions: [
          getSelectFormField,
          getDateFormField,
          getFormField,
          getSelectFormField,
          getFormField,
          getFormField,
          getSelectFormField,
          getDateFormField,
          getFormField,
          getFormField,
          getSelectFormField,
          getDateFormField,
          getFormField,
          getSelectFormField,
          getDateFormField,
          getFormField,
          getSelectFormField,
          getDateFormField,
          getFormField,
        ],
        params: [
          [(v) => ["是", "否"], (v) => false],
          [(v) => v.shhl !== "是"],
          ["eg. ", (v) => v.shhl !== "是"],
          [(v) => ["是", "否"], (v) => v.shhl !== "是"],
          ["eg. ", (v) => v.shhl !== "是" || v.hllc !== "是"],
          ["eg. ", (v) => v.shhl !== "是"],
          [(v) => ["是", "否"], (v) => false],
          [(v) => v.shnfmzl !== "是"],
          ["eg. ", (v) => v.shnfmzl !== "是"],
          ["eg. ", (v) => v.shnfmzl !== "是"],
          [(v) => ["是", "否"], (v) => false],
          [(v) => v.shbxzl !== "是"],
          ["eg. ", (v) => v.shbxzl !== "是"],
          [(v) => ["是", "否"], (v) => false],
          [(v) => v.shfl !== "是"],
          ["eg. ", (v) => v.shfl !== "是"],
          [(v) => ["是", "否"], (v) => false],
          [(v) => v.shmyzl !== "是"],
          ["eg. ", (v) => v.shmyzl !== "是"],
        ]
      }
    },
  },
  "七、复发和随访信息": {
    "记录者信息": {
      name: "recorder_information",
      fields: ["sclrr", "sclrsj", "mcsfr", "mcsfsj"],
      columns: ["首次录入人", "首次录入时间", "末次随访人", "末次随访时间"],
      uploadParams: {
        name: "记录者信息上传表",
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
          ["eg. ", (v) => false],
          [(v) => false],
          ["eg. ", (v) => false],
          [(v) => false],
        ]
      }
    },
    "复发信息": {  // tuple
      name: "relapse_information",
      fields: ["djcff", "ffbw", "jtffbw", "ffrq", "ffqzsd", "ffbzblxx", "ffbzymzh", "ffhzl", "ffxgpj"],
      columns: ["第几次复发", "复发部位", "具体复发部位", "复发日期", "复发确诊手段", "复发病灶病理信息", "复发病灶免疫组化", "复发后治疗", "复发后治疗效果评价"],
      uploadParams: {
        name: "复发信息上传表",
        api: "relapse",
        fields: ["djcff", "ffbw", "jtffbw", "ffrq", "ffqzsd", "ffbzblxx", "ffbzymzh", "ffhzl", "ffxgpj"],
        columns: ["第几次复发", "复发部位", "具体复发部位", "复发日期", "复发确诊手段", "复发病灶病理信息", "复发病灶免疫组化", "复发后治疗", "复发后治疗效果评价"],
        validations: [
          Yup.number().positive(notPositiveNumberError).integer(notIntegerError),
          Yup.string().required(requiredMessage),
          Yup.string(),
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
          getDateFormField,
          getSelectFormField,
          getFormField,
          getFormField,
          getFormField,
          getSelectFormField,
        ],
        params: [
          ["eg. 1", (v) => false],
          [(v) => ["胸壁复发", "保乳术后复发", "同侧腋窝及锁上淋巴结复发", "其他"], (v) => false],
          ["eg. ", (v) => false],
          [(v) => false],
          [(v) => ['无', '粗针吸穿刺', '细针吸穿刺', '开放活检'], (v) => false],
          ["eg. ", (v) => false],
          ["eg. ", (v) => false],
          ["eg. ", (v) => false],
          [(v) => ['CR', 'PR', 'SD', 'PD'], (v) => false],
        ]
      }
    },
    "远处转移信息": {  // tuple
      name: "recurrent_distant_metastasis",
      fields: ["djczy", "yzzybw", "yczyrq", "yczyqzsd", "yczyblxx", "yczymyzh", "yczyzl", "yczyzlxgpj"],
      columns: ["第几次转移", "远处转移部位", "远处转移日期", "远处转移确诊手段", "远处转移病理信息", "远处转移免疫组化", "远处转移治疗", "远处转移治疗"],
      uploadParams: {
        name: "远处转移信息上传表",
        api: "recurrent",
        fields: ["djczy", "yzzybw", "yczyrq", "yczyqzsd", "yczyblxx", "yczymyzh", "yczyzl", "yczyzlxgpj"],
        columns: ["第几次转移", "远处转移部位", "远处转移日期", "远处转移确诊手段", "远处转移病理信息", "远处转移免疫组化", "远处转移治疗", "远处转移治疗"],
        validations: [
          Yup.number().positive(notPositiveNumberError).integer(notIntegerError),
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
          getDateFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
          getFormField,
        ],
        params: [
          ["eg. 1", (v) => false],
          [(v) => ["对侧乳腺", "非同侧胸壁", "区域淋巴结", "骨", "肺", "肝", "脑", "其他"], (v) => false],
          [(v) => false],
          ["eg. ", (v) => false],
          ["eg. ", (v) => false],
          ["eg. ", (v) => false],
          ["eg. ", (v) => false],
          ["eg. ", (v) => false],
        ]
      }
    },
    "随访信息": {
      name: "patient_follow",
      fields: ["dfs", "swyf", "swsj", "sy", "jtsy", "os", "mcfcsj", "syqk", "syfaz", "syfazjtxq", "zhsfsj", "sfbz"],
      columns: ["DFS", "死亡与否", "死亡时间", "死因", "具体死因", "OS", "末次复查时间（截止查病历时/电话随诊）", "治疗后生育情况", "双原发癌症", "双原发癌症具体详情", "双原发癌症首次发生时间", "随访备注"],
      uploadParams: {
        name: "随访信息上传表",
        api: "patfollow",
        fields: ["dfs", "swyf", "swsj", "sy", "jtsy", "os", "mcfcsj", "syqk", "syfaz", "syfazjtxq", "zhsfsj", "sfbz"],
        columns: ["DFS", "死亡与否", "死亡时间", "死因", "具体死因", "OS", "末次复查时间（截止查病历时/电话随诊）", "治疗后生育情况", "双原发癌症", "双原发癌症具体详情", "双原发癌症首次发生时间", "随访备注"],
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
          getFormField,
          getSelectFormField,
          getFormField,
          getDateFormField,
          getFormField
        ],
        params: [
          ["eg. ", (v) => false],
          [(v) => ["是", "否"], (v) => false],
          [(v) => v.swyf !== "是"],
          [(v) => ["肿瘤", "非肿瘤", "具体备注"], (v) => v.swyf !== "是"],
          ["eg. ", (v) => v.swyf !== "是"],
          ["eg. ", (v) => false],
          [(v) => false],
          ["eg. ", (v) => false],
          [(v) => ["无", "对侧乳腺", "非同侧胸壁、区域淋巴结", "其他原发癌"], (v) => false],
          ["eg. ", (v) => false],
          [(v) => v.syfaz === "无"],
          ["eg. ", (v) => false],
        ]
      }
    },
  },
  "八、其他数据信息": {
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
          ["eg. 1", (v) => v.sfjx21jyjc !== "是"],
          ["eg. ", (v) => v.sfjx21jyjc !== "是"],
          ["eg. ", (v) => v.sfjx21jyjc !== "是"],
          ["eg. ", (v) => v.sfjx21jyjc !== "是"],
          ["eg. ", (v) => v.sfjx21jyjc !== "是"],
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
          ["eg. 1", (v) => v.sfjx70jyjc !== "是"],
          ["eg. ", (v) => v.sfjx70jyjc !== "是"],
          ["eg. ", (v) => v.sfjx70jyjc !== "是"],
          ["eg. ", (v) => v.sfjx70jyjc !== "是"],
          ["eg. ", (v) => v.sfjx70jyjc !== "是"],
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
          ["eg. 1", (v) => v.sfjxbrcajyjc !== "是"],
          ["eg. ", (v) => v.sfjxbrcajyjc !== "是"],
          ["eg. ", (v) => v.sfjxbrcajyjc !== "是"],
          ["eg. ", (v) => v.sfjxbrcajyjc !== "是"],
          ["eg. ", (v) => v.sfjxbrcajyjc !== "是"],
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
          ["eg. ", (v) => false],
          [(v) => false],
          ["eg. ", (v) => false],
          ["eg. ", (v) => false],
          [(v) => ["常规收集", "课题"], (v) => false],
          ["eg. 1", (v) => false],
          ["eg. ", (v) => false],
          ["eg. 1", (v) => false],
          ["eg. ", (v) => false],
          [(v) => ["是", "否"], (v) => false],
          [(v) => v.sfqy !== "是"],
          ["eg. ", (v) => v.sfqy !== "是"],
          ["eg. ", (v) => v.sfqy !== "是"],
          ["eg. ", (v) => v.sfqy !== "是"],
          ["eg. ", (v) => v.sfqy !== "是"],
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
          ["eg. ", (v) => false],
          [(v) => false],
          ["eg. ", (v) => false],
          ["eg. ", (v) => false],
          ["eg. ", (v) => false],
          ["eg. ", (v) => false],
          ["eg. ", (v) => false],
          ["eg. 1", (v) => false],
          ["eg. ", (v) => false],
          ["eg. 1", (v) => false],
          ["eg. ", (v) => false],
          [(v) => ["是", "否"], (v) => false],
          [(v) => v.sfqy !== "是"],
          ["eg. ", (v) => v.sfqy !== "是"],
          ["eg. ", (v) => v.sfqy !== "是"],
          ["eg. ", (v) => v.sfqy !== "是"],
          ["eg. ", (v) => v.sfqy !== "是"],
        ]
      }
    },
  },
};

const allTableNames = ["患者基本信息", "婚育史", "月经史", "个人史", "既往史", "家族史", "患者临床特征", "手术信息", "病理信息", "术后辅助治疗", "记录者信息", "首次复发信息", "二次复发信息", "首次远处转移信息", "二次远处转移信息", "随访信息", "21基因信息", "70基因信息", "BRCA基因检测", "外周血标本采样采集信息", "外周血标本采样存放信息", "外周血标本采样取用信息", "复发转移灶标本采样基本情况", "复发转移灶标本采样存放信息", "复发转移灶标本采样取用信息"];

// 有个表名未确定
const allTableEnglishNames = ["patient", "patient_marry_history", "patient_menstruation_history", "patient_history", "previous_history", "family_history", "clinical_feature", "surgical_information", "surgical_pathological_info", "postoperative_treatment", "  ", "relapse_information", "relapse_information2", "recurrent_distant_metastasis", "recurrent_distant_metastasis2", "patient_follow", "gene_detection", "gene_detection2", "gene_detection3", "peripheral_blood_sample_sampling", "sample_store_info", "sample_use_info", "sampling_recurrence_metastasis_specimens", "sample_store_info2", "sample_use_info2"];

const allSheetNames = Object.keys(allTables);

export {
  allTables,
  allSheetNames,
  allTableNames,
  allTableEnglishNames,
  getFormField,
};
const allTables = {
  "一、患者基本信息": {
    "患者基本信息": {
      name: "patient_info",
      fields: ["name", "sex", "age", "zyid", "marital_status", "nz", "job", "jg", "addr", "fbDate", "ryDate", "phone", "cert_id", "birthday", "weight", "tall", "bmi"],
      columns: ["姓名", "性别", "初诊年龄", "住院号", "婚姻状况", "民族", "职业", "籍贯", "现住址", "入院日期", "发现日期", "联系电话", "身份证号", "出生日期", "体重", "身高", "BMI"],
    },
  },
  "二、妇科相关信息": {
    "婚育史": {
      name: "patient_marry_history",
      fields: ["sy", "qzssyzt", "ccage", "mtage", "hycs", "zyc", "lczcs", "fzsy", "fzsyfs", "sfmrwy", "mrcb", "mrsc"],
      columns: ["生育", "确诊时生育状态", "初产年龄", "末胎年龄", "怀孕次数", "足月产", "流产或早产史", "是否辅助生育", "辅助生育方式", "是否母乳喂养", "哺乳侧别", "哺乳时长"],
    },
    "月经史": {
      name: "patient_menstruation_history",
      fields: ["ccage", "yjzq", "jq", "sfjj", "jjfs", "mqyj", "jjage"],
      columns: ["初潮年龄", "月经周期", "经期", "是否绝经", "绝经方式", "末次月经", "绝经年龄"],
    },
  },
  "三、个人史、既往史、家族史": {
    "个人史": {
      name: "patient_history",
      fields: ["sfxy", "sfyj"],
      columns: ["是否吸烟", "是否饮酒"],
    },
    "既往史": {
      name: "previous_history",
      fields: ["rxlxjbs", "grxjb", "xtxjb", "sss", "exzl"],
      columns: ["乳腺良性疾病史", "感染性疾病", "是否有系统疾病", "是否有手术史", "是否有恶性肿瘤既往史"],
    },
    "家族史": {  // tuple
      name: "family_history",
      fields: ["xqs", "rxa", "lca", "wxzl", "qtwxzl"],
      columns: ["x级亲属", "是否有恶性肿瘤家族史", "乳腺癌家族史", "卵巢癌家族史", "其他恶性肿瘤家族史"],
    },
  },
  "四、患者临床特征": {
    "患者临床特征": {
      name: "clinical_feature",
      fields: ["fxwz", "zkwz", "lcsfzz", "hcrt", "hcpf", "rtyy", "yydg", "yyxz", "yxjch", "sqzldx", "sqtfq", "sqyxlbj", "sqnfq", "yczy", "zybw", "tnm", "qzfs", "qzblh", "er", "pr", "her2", "ki67", "p53", "fcopy", "fratio", "lbjer", "lbjpr", "lbjher2", "lbjki67", "lbjp53", "lbjfcopy", "lbjfratio", "yczyqzbw", "yczyer", "yczypr", "yczyher2", "yczyki67", "yczyp53", "yczyfcopy", "yczyfratio", "xfzzlkssj", "xfzzlfa", "xfzzlpg", "xfzzlpj", "sqzlkssj", "sqzlfa", "sqzlpg", "sqzlpj"],
      columns: ["发现方式", "肿瘤位置", "有无临床首发症状", "患侧乳头", "患侧皮肤", "乳头溢液", "溢液导管", "溢液性质", "影像检查号", "术前影像肿瘤大小", "术前T分期", "术前影像腋下淋巴结", "术前N分期", "远处转移与否", "转移部位", "临床TNM分期", "确诊方式", "确诊病理号", "肿瘤病灶穿刺ER", "肿瘤病灶穿刺PR", "肿瘤病灶穿刺Her2", "肿瘤病灶穿刺Ki67", "肿瘤病灶穿刺P53", "肿瘤病灶FISH copy数", "肿瘤病灶FISH ratio", "淋巴结穿刺ER", "淋巴结穿刺PR", "淋巴结穿刺Her2", "淋巴结穿刺Ki67", "淋巴结穿刺P53", "淋巴结FISH copy数", "淋巴结FISH ratio", "远处转移确诊部位", "远处转移灶ER", "远处转移灶PR", "远处转移灶Her2", "远处转移灶Ki67", "远处转移灶P53", "远处转移灶FISH copy数", "远处转移灶FISH ratio", "开始时间", "新辅助治疗方案及周期", "新辅助治疗过程评估", "新辅助治疗疗效评价", "开始时间", "术前治疗方案及周期", "术前治疗过程评估", "术前治疗疗效评"],
    },
  },
  "五、手术及病理信息": {
    "手术及病理信息": {
      name: "surgical_pathological_info",
      fields: ["ssrq", "ssfs", "sfbr", "sfzz", "ywlbqsfs", "shdblh", "bzsl", "ryzwdx", "blxfq", "zzxfj", "bllx", "blxjtms", "jzznqrlbxb", "brsskjazz", "brssbbzdd", "brssbbbqzdd", "hlfy", "lbjqk", "ywlbzs", "yxywlbzs", "er", "pr", "her2", "ki67", "p53", "lbxgqf", "lbgbs", "hfc", "hfr"],
      columns: ["手术日期", "手术方式", "是否保乳", "是否再造", "腋窝淋巴结清扫方式", "术后大病理号", "病灶数量", "肉眼肿物大小", "病理学分期", "病理类型", "病理具体描述", "组织学分级", "淋巴血管侵犯与否", "淋巴管癌栓", "间质内浸润淋巴细胞", "化疗反应", "保乳手术标本周断端是否可见癌组织", "保乳手术标本周断端", "保乳手术标本补切周断端", "淋巴结情况", "腋窝淋巴结总数", "阳性腋窝淋巴结数", "ER", "PR", "HER2", "Ki67", "P53", "HER2-FISH COPY数", "HER2-FISH RATIO"],
    },
  },
  "六、术后辅助治疗": {
    "术后辅助治疗": {
      name: "postoperative_treatment",
      fields: ["shhl", "hlkssj", "shhlxq", "shhlfam", "hlsj", "shnfmzl", "nfmzlkssj", "nfmzlym", "nfmzlfzy", "shbxzl", "bxzlkssj", "bxzlym", "shfl", "flkssj", "flbz", "shmyzl"],
      columns: ["术后化疗", "化疗开始时间", "术后化疗（方案名称:如AC-T", "术后化疗（具体化疗用药、剂量、周期）", "术后内分泌治疗", "内分泌治疗开始时间", "术后内分泌治疗（药物名称）", "内分泌治疗副作用", "术后靶向治疗", "靶向治疗开始时间", "靶向治疗具体药物", "术后放疗", "放疗开始时间", "放疗备注", "术后免疫治疗", "免疫治疗开始时间"],
    },
  },
  "七、复发和随访信息": {
    "记录者信息": {
      name: "recorder_information",
      fields: ["sclrr", "sclrsj", "mcsfr", "mcsfsj"],
      columns: ["首次录入人", "首次录入时间", "末次随访人", "末次随访时间"],
    },
    "复发信息": {  // tuple
      name: "relapse_information",
      //***
      fields: ["djcff", "ffbw", "ffrq", "ffqzsd", "ffbzblxx", "ffbzymzh", "ffhzl", "ffxgpj"],
      columns: ["第几次复发", "复发部位", "复发日期", "复发确诊手段", "复发病灶病理信息", "复发病灶免疫组化", "复发后治疗", "复发后治疗效果评价"],
    },
    "远处转移信息": {  // tuple
      name: "recurrent_distant_metastasis",
      fields: ["djczy", "yzzybw", "yczyrq", "yczyzl", "yczyzlxgpj"],
      columns: ["第几次转移", "远处转移部位", "远处转移日期", "远处转移治疗", "远处转移治疗"],
    },
    "随访信息": {
      name: "patient_follow",
      fields: ["dfs", "os", "mcfcsj", "syqk", "syfaz", "zhsfsj", "sfbz", "swyf", "swsj", "sy"],
      columns: ["DFS", "死亡与否", "死亡时间", "死因", "OS", "末次随访时间（截止查病历时/电话随诊）", "治疗后生育情况", "双原发癌症", "双原发癌症首次发生时间", "随访备注"],
    },
  },
  "八、其他数据信息": {
    "基因信息": {  // tuple(21基因信息,  70基因信息, BRCA基因检测)
      name: "gene_detection",
      fields: ["jyjclx", "jcsj", "yjbh", "jcry", "bbwz", "bz", "jtjcxq"],
      columns: ["基因检测类型", "检测时间", "研究编号", "检测人员", "标本位置", "备注", "具体详情"],
    },
    "外周血标本采样采集信息": {
      name: "peripheral_blood_sample_sampling",
      fields: ["bblx", "cxsjd", "cjr", "bz", "yt", "cfbh", "qybh"],
      columns: ["标本类型", "采血时间点", "采血日期", "采集人", "备注", "用途", "存放编号", "取用编号"],
    },
    "复发转移灶标本采样基本情况": {
      name: "sampling_recurrence_metastasis_specimens",
      fields: ["glbz", "cyrq", "ytbz", "qtyt", "cjr", "bblx", "bbxz", "cfbh", "qybh"],
      columns: ["关联病灶", "采样日期", "用途标识", "其他用途（填写）", "采集人", "标本类型", "标本性质", "存放编号", "取用编号"],
    },
  },
};

const sampleStoreInfo = {
  name: "sample_store_info",
  fields: ["cfid", "ybid", "ybnum", "ybhbh", "ybcfwz"],
  columns: ["存放编号", "标本编号", "标本量", "标本盒编码", "标本存放位置"],
};

const sampleUseInfo = {
  name: "sample_use_info",
  fields: ["qyid", "ybid", "qyrq", "qyr", "yt", "bz"],
  columns: ["取用编号", "标本编号", "取用日期", "取用人", "用途", "备注"],
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
  sampleStoreInfo,
  sampleUseInfo,
};
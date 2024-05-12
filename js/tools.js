var irelavCrt = {
    a: `∀`,
    b: `±`,
    c: `⊂`,
    d: `∂`,
    e: `∃`,
    f: `∫`,
    g: `⊙`,
    h: `∥`,
    i: `∈`,
    j: `∉`,
    k: `⫥`,
    l: `∤`,
    m: `≡`,
    n: `∩`,
    o: `cOɔ`,
    p: `▱`,
    q: `∅`,
    r: `∠`,
    s: `∽`,
    t: `⊥`,
    u: `∪`,
    v: `√`,
    w: `∓`,
    x: `=`,
    y: `≈`,
    z: `≠`,
    ê: `∄`,
    æ: `∝`,
    œ: `∞`,
};//湩语字母列表
var latinCrt = {
    "∀": `a`,
};//拉丁字母列表
String.prototype.wordConvert = function (target) {//单词转换
    var ts = convertToLowercase(this);
    var ans = ``;//结果
    for (var i = 0; i < ts.length; i++) {
        try {//尝试进行以下操作
            var tgt = ts[i].convert(target);
            if (!tgt) {//如果不在字母列表中
                ans += ts[i];//保留原样
            } else {
                ans += String(tgt);//对字母进行转换
            }
        } catch (err) {//如果出错则报错
            window.alert(`请不要输入无关字符!`);
            console.error(err);
        }
    }
    return ans;
}
String.prototype.convert = function (target) {//字母转换
    switch (target) {
        case `irelav`://转成湩语字母
            return irelavCrt[`${this}`];
        case `latin`://转成拉丁字母
            return latinCrt[`${this}`];
        default: break;
    }
}
function convertToLowercase(str) {//大小写转换
    return str.toUpperCase().toLowerCase();
}

class Levenshtein {//莱文斯坦距离算法
    findSimilarChars_dh(mainStr, strArray, tp = `dh`) {//找到最接近的
        let threshold = 0.6; // 定义相似度阈值，例如25%
        let results = strArray.filter(str => {
            var strDH = str[`${tp}`], ansStr = ``;
            if (strDH.length > mainStr.length) {
                for (var i = 0; i < mainStr.length; i++) {
                    ansStr += strDH[i];
                }
                strDH = ansStr;
            }
            let distance = this.getLevenshtein(mainStr, strDH);
            let length = Math.max(mainStr.length, strDH.length);
            return (1 - distance / length) > threshold;
        });
        return results;
    }
    findSimilarChars_cn(mainStr, strArray) {//找到最接近的
        let threshold = 0.6; // 定义相似度阈值，例如25%
        let results = strArray.filter(str1 => {
            let res = [], lvst = [];
            var cnStr, t;
            t = str1.cn;
            if (!Array.isArray(str1.cn)) {//不是数组
                t = [str1.cn];
            }
            try {//尝试操作
                cnStr = t.split(",");//拆开中文释义
            } catch (err) {//如果不行，那么有可能是数组，就别管了
                cnStr = t;
            }
            for (var i = 0; i < cnStr.length; i++) {//在可能的范围内进行循环
                var str = cnStr[i];
                var strDH = str, ansStr = ``;
                if (strDH.length > mainStr.length) {
                    for (var i = 0; i < mainStr.length; i++) {
                        ansStr += strDH[i];
                    }
                    strDH = ansStr;
                }
                let distance = this.getLevenshtein(mainStr, strDH);
                let length = Math.max(mainStr.length, strDH.length);
                if ((1 - distance / length) > threshold) {//阈值判定
                    lvst.push([1 - distance / length, strDH]);//录入莱文斯坦相似度
                }
            }
            if (lvst.length) {
                lvst.sort((a, b) => b[0] - a[0]);//相似度从高到低排列，则lvst[0][1]就是相似度最高的一个字符串
                try {
                    return this.findSimilarChars_dh(lvst[0][1], wordData, `cn`);//用相似度最高的字符串去莱文斯坦一次
                } catch (err) { }
            } else { return false; }
        });
        return results;//返回的是一个数组
    }
    getLevenshtein(str1, str2) {
        //Levenshtein距离是指两个字符串之间由一个转换成另一个所需的最少编辑操作次数，这些操作可以包括插入、删除、替换。
        let current = [];
        let prev = [];
        let len1 = str1.length;
        let len2 = str2.length;
        let i;
        let j;
        if (!len1) {
            return len2;
        }
        if (!len2) {
            return len1;
        }
        for (i = 0; i <= len1; i++) {
            current[i] = i;
        }
        for (j = 0; j <= len2; j++) {
            prev[j] = j;
        }
        for (i = 1; i <= len1; i++) {
            for (j = 1; j <= len2; j++) {
                if (str1[i - 1] === str2[j - 1]) {
                    current[j] = prev[j - 1];
                } else {
                    current[j] = Math.min(prev[j - 1], current[j], prev[j]) + 1;
                }
            }
            for (j = 0; j <= len2; j++) {
                prev[j] = current[j];
            }
        }
        return current.pop();
    }
}
var levenshtein = new Levenshtein();
/* 使用例子
let mainStr = "hello";
let strArray = ["hallo", "world", "hello", "h3llo", "hillo"];
let similarChars = levenshtein.findSimilarChars(mainStr, strArray);
console.log(similarChars); // ["hallo", "hello", "hillo"]
*/

function randomString(length) {//随机字符串
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}


function getQueryParams(url) {//获取网址
    const urlObj = new URL(url);
    return Object.fromEntries(urlObj.searchParams.entries());
}

// 示例使用
const url = "http://example.com/?key=value&param=another";
const queryParams = getQueryParams(url);
console.log(queryParams); // 输出: { key: "value", param: "another" }

var yyList = ['a','e','i','o','w','y','ê','æ','œ'];//元音列表
class setMultiWord {//不同词性的单词设置
    setAllWord() {
        this.nafibwb();//分词
        this.setOrdNum();
        this.setAdj();
        this.setAdv();
    }
    nafibwb(){
        this.pavnaf();//过去分词
        this.privnaf();//现在分词
        this.fwvnaf();//将来分词
        this.zwgzisnaf();//被动分词
    }
    pavnaf() {
        var originWordList = wordData.filter(x => x.type == `d.` || x.type == `ud.` || x.type == `cd.`);
        originWordList.forEach((w) => {
            var tail = 'ah';
            if(yyList.includes(w.dh[w.dh.length-1])){//结尾是元音
                tail = 'pah';
            }
            wordData.push({//直接添加进单词列表里面
                dh: w.dh + tail,
                cn: `[${w.dh}的过去分词]`+w.cn,
                type: `pvd.`,
                originType: w.type,
                chunk: [
                    { dh: ``, cn: `` }
                ],
                eg: [
                    { dh: ``, cn: `` }
                ]
            });
        });
    }
    privnaf() {
        var originWordList = wordData.filter(x => x.type == `d.` || x.type == `ud.` || x.type == `cd.`);
        originWordList.forEach((w) => {
            var tail = 'if';
            if(yyList.includes(w.dh[w.dh.length-1])){//结尾是元音
                tail = 'kif';
            }
            wordData.push({//直接添加进单词列表里面
                dh: w.dh + tail,
                cn: `[${w.dh}的现在分词]`+w.cn,
                type: `prd.`,
                originType: w.type,
                chunk: [
                    { dh: ``, cn: `` }
                ],
                eg: [
                    { dh: ``, cn: `` }
                ]
            });
        });
    }
    fwvnaf() {
        var originWordList = wordData.filter(x => x.type == `d.` || x.type == `ud.` || x.type == `cd.`);
        originWordList.forEach((w) => {
            var tail = 'it';
            if(yyList.includes(w.dh[w.dh.length-1])){//结尾是元音
                tail = 'xit';
            }
            wordData.push({//直接添加进单词列表里面
                dh: w.dh + tail,
                cn: `[${w.dh}的将来分词]`+w.cn,
                type: `fvd.`,
                originType: w.type,
                chunk: [
                    { dh: ``, cn: `` }
                ],
                eg: [
                    { dh: ``, cn: `` }
                ]
            });
        });
    }
    zwgzisnaf() {
        var originWordList = wordData.filter(x => x.type == `d.` || x.type == `ud.` || x.type == `cd.`);
        originWordList.forEach((w) => {
            var tail = 'op';
            if(yyList.includes(w.dh[w.dh.length-1])){//结尾是元音
                tail = 'sop';
            }
            wordData.push({//直接添加进单词列表里面
                dh: w.dh + tail,
                cn: `[${w.dh}的被动分词]被`+w.cn,
                type: `zsd.`,
                originType: w.type,
                chunk: [
                    { dh: ``, cn: `` }
                ],
                eg: [
                    { dh: ``, cn: `` }
                ]
            });
        });
    }
    setAdj() {//形容词添加
        var originWordList = wordData.filter(x => x.type == `m.` || x.type == `di.`);
        originWordList.forEach((w) => {
            var wcn = w.cn.split(",");//以逗号分割为汉语词汇
            for (var i = 0; i < wcn.length; i++) {//对每个词分别加“的”
                wcn[i] += `的`;
            }
            wordData.push({//直接添加进单词列表里面
                dh: w.dh + `fak`,
                cn: wcn,
                type: `s.`,
                originType: w.type,
                chunk: [
                    { dh: ``, cn: `` }
                ],
                eg: [
                    { dh: ``, cn: `` }
                ]
            });
        });
    }
    setOrdNum() {//序数词添加
        var originWordList = wordData.filter(x => x.type == `q.`);
        originWordList.forEach((w) => {
            wordData.push({//直接添加进单词列表里面
                dh: w.dh + `v`,
                cn: `第` + w.cn,
                type: `m.`,
                originType: w.type,
                chunk: [
                    { dh: ``, cn: `` }
                ],
                eg: [
                    { dh: ``, cn: `` }
                ]
            });
        });
    }
    setAdv() {//副词添加
        var originWordList = wordData.filter(x => x.type == `s.`);
        originWordList.forEach((w) => {
            if (w.originType == `di.`) { return; }
            var wcn = w.cn, wcn_ = [];
            for (var i = 0; i < wcn.length; i++) {//对每个词分别去“的”加“地”
                wcn_.push(wcn[i].slice(0, -1));
                wcn_[i] += `地`;
            }
            wordData.push({//直接添加进单词列表里面
                dh: w.dh + `esht`,
                cn: wcn_,
                type: `f.`,
                originType: w.type,
                chunk: [
                    { dh: ``, cn: `` }
                ],
                eg: [
                    { dh: ``, cn: `` }
                ]
            });
        });
    }
}


//字符串分隔
var s = `kiahinh m.能力
abit m.一切
abitmak m.到处,四处
opdonhiad ud.到国外,在国外
senklash m.缺席
senklashod d.缺席
hasf m.接受
hasfiêt d.接受
axiba m.事故
senhdi m.成就
senhdihiêt d.成就,达成
sêhæs ud.穿过,横穿
bic m.动作
biq d.表演
biciad m.行动
bicih m.演员
bakcwd m.事实,实际
wtrax m.加法
wtraxod d.加法
wtred m.减法
wtredod d.减法
wtroc m.乘法
wtrocod d.乘法
wtrwt m.除法
wtrwtod d.除法
mepoc m.广告
mepocod d.打广告,发广告
maktork m.住址,所在地,地址
lauiad m.优点,优势,好处
dongzont m.建议
dongzontod d.建议
ezenhac d.买得起,担得起`;
var sSplit = s.split("\n"),ansString = '';
sSplit.forEach((e)=>{
    var ans1 = e.split(" ");
    var ans2 = ans1[1].split(".");
    ansString += `{
		dh: '${ans1[0]}',
		cn: '${ans2[1]}',
		type: '${ans2[0]}.',
		chunk: [
			{ dh: '', cn: '' }
		],
		eg: [
			{ dh: '', cn: '' }
		]
	},`;
});
console.log(ansString);

/**
 * htix m.行业
tork m.聚落
chidiêt d.耕作
chidtws m.农田
chidhih m.农民
chidhtix m.农业
chidtork m.农村
gecton m.工艺
geciêt d.打工,务工
gec'htix m.工业
gec'hih m.工人
gectork m.工业园区
geckehiad m.工厂
knishfê m.房间
gecknishfê m.车间
panbton m.商品
panbiêt d.经商
panbhih m.商人
panbhtix m.商业
panbtork m.商业区
panbkehiad m.商场,商城
 */

function copyright(a){
    document.getElementById('cprt').innerHTML = `版权所有 © 2024 DornGames | Version 2.3.5`;
    if(a){
        document.getElementById('cprt').innerHTML = `版权所有 © 2024 DornGames | Version 2.3.5 | <a onclick="window.alert('当前词汇量:'+wordData.length+'词')">点击查看词汇量</a>`;
    }
}
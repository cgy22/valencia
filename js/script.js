// Parallax Code
        var scene = document.getElementById('scene');
        var parallax = new Parallax(scene);
		
function toggleMenu(element) {  
  element.classList.toggle('active');  
}

function redirectToPage() {  
    window.location.href = "index.html";  
}

copyright(true);
    new setMultiWord().setAllWord();
    var openOpt = false;
    function showOpt() {//打开选项菜单
        var form = document.getElementById("selectLan");
        var ul = document.getElementById("selectUL");
        var li1 = document.createElement("li");
        var li2 = document.createElement("li");
        li2.textContent = `中𣿅词典`;
        li1.textContent = `𣿅中词典`;
        if (!openOpt) {
            openOpt = true;
            ul.style.display = `block`;
            li1.style.width = "100%";
            ul.appendChild(li1);
            li2.style.width = "100%";
            ul.appendChild(li2);
            [li1, li2].forEach((li) => {
                li.onclick = function () {
                    document.getElementById("selectP").innerHTML = li.textContent;
                    ul.style.display = "none";
                }
            })
        } else {
            ul.innerHTML = ``;
            openOpt = false;
        }
    }
    function submitword() {//提交信息并跳转搜索页面
        var word = document.getElementById("search_ipt").value;
        var tp = 'dh';
        if (document.getElementById("selectP").textContent == '中𣿅词典') {
            tp = 'cn';
        }
        window.open(`search.html?s="${word}"&type="${tp}"`, `_self`);
    }
    function findWord() {
        if (document.getElementById("selectP").textContent == '𣿅中词典') {
            findWord_dh();
        } else {
            findWord_cn();
        }
    }
    function findWord_dh() {//查找近似词汇
        var list = document.getElementById("search-list");//找到下拉列表
        if (!document.getElementById("search_ipt").value) {
            iptChangeColor(`toWhite`);
            list.style.display = "none";
        } else {
            iptChangeColor(`toBlue`);//更改input的颜色
        }
        var v = document.getElementById("search_ipt").value, type = 'normal';
        if (v.endsWith("s") && v != 'faks' && v != 'caos' && v != 'mads' && v != 'tons') {//不是人称代词，以s结尾，就是复数
            type = 'pl';
            v = v.slice(0, -1);
        }
        let similarChars = levenshtein.findSimilarChars_dh(v, wordData);
        if (similarChars.length) {
            showResult_dh(similarChars, v, type);
        } else {
            list.style.display = "none";
        }
    }
    function showResult_dh(result) {//下拉列表的显示
        if (!document.getElementById("search_ipt").value) {
            iptChangeColor(`toWhite`);
        } else {
            iptChangeColor(`toBlue`);//更改input的颜色
            var list = document.getElementById("search-list");//找到下拉列表
            list.innerHTML = '';
            list.style.width = document.getElementById("lgwp").style.width;
            if (result.length > 0) {
                result.forEach(item => {
                    var li = document.createElement("li");
                    li.textContent = `${item.dh} (${item.cn})`;
                    li.style.width = "100%";
                    li.onclick = function () {
                        document.getElementById("search_ipt").value = item.dh;
                        document.getElementById("search-list").style.display = "none";
                    };
                    list.appendChild(li);
                });
                list.style.display = "block";
            }
        }
    }
    function findWord_cn() {//查找近似词汇
        var list = document.getElementById("search-list");//找到下拉列表
        if (!document.getElementById("search_ipt").value) {
            iptChangeColor(`toWhite`);
            list.style.display = "none";
        } else {
            iptChangeColor(`toBlue`);//更改input的颜色
        }
        var v = document.getElementById("search_ipt").value;
        let similarChars = levenshtein.findSimilarChars_dh(v, wordData, 'cn');
        if (similarChars.length) {
            showResult_dh(similarChars);
        } else {
            list.style.display = "none";
        }
    }
    function showResult_cn(result) {//下拉列表的显示
        if (!document.getElementById("search_ipt").value) {
            iptChangeColor(`toWhite`);
        } else {
            iptChangeColor(`toBlue`);//更改input的颜色
            var list = document.getElementById("search-list");//找到下拉列表
            list.innerHTML = '';
            list.style.width = document.getElementById("lgwp").style.width;
            if (result.length > 0) {
                result.forEach(item => {
                    var li = document.createElement("li");
                    li.textContent = `${item.cn} (${item.dh})`;
                    li.style.width = "100%";
                    li.onclick = function () {
                        document.getElementById("search_ipt").value = item.cn;
                        document.getElementById("search-list").style.display = "none";
                    };
                    list.appendChild(li);
                });
                list.style.display = "block";
            }
        }
    }
    function iptChangeColor(type) {//输入框换色
        if (type == `toBlue`) {
            var ipt = document.getElementById("fmwp");//找到搜索框
            var r = 238; g = 237; b = 221, a = 0, tick = 0;//初始颜色#EEEDDD
            var origin = { r: r, g: g, b: b, a: a };//初始颜色
            var target = { r: 153, g: 204, b: 255, a: 1 };//目标颜色
            ipt.style.border = `2px solid rgba(${r},${g},${b},${a})`;
            setInterval(() => {
                if (tick > 100) {
                    return;
                }//防止过头
                r -= (origin.r - target.r) / 50;
                g -= (origin.g - target.g) / 50;
                b -= (origin.b - target.b) / 50;
                a -= (origin.a - target.a) / 50;
                ipt.style.border = `2px solid rgba(${r},${g},${b},${a})`;
                tick++;
            }, 7);
        } else if (type == `toWhite`) {
            var ipt = document.getElementById("fmwp");//找到搜索框
            var r = 238; g = 237; b = 221;//初始颜色#EEEDDD
            ipt.style.border = `2px solid rgba(${r},${g},${b},1)`;
        }
    }
	
	

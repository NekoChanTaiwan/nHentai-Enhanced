// ==UserScript==
// @name       nhentai-enhanced
// @version    0.0.1
// @author     NekoChan
// @homepage   https://github.com/NekoChanTaiwan/nHentai-Enhanced
// @supportURL https://github.com/NekoChanTaiwan/nHentai-Enhanced/issues
// @match      https://nhentai.net/*
// @namespace  https://github.com/NekoChanTaiwan
// @grant      none
// @require    https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js
// @require    https://cdn.jsdelivr.net/npm/clipboard@2.0.8/dist/clipboard.min.js
// @require    https://cdn.jsdelivr.net/npm/notyf@3.9.0/notyf.min.js
// ==/UserScript==

(()=>{"use strict";const e=window.$,t=[{中文:"/language/chinese/"},{日文:"/language/japanese/"},{英文:"/language/english/"},{裏番:"https://hanime1.me/"}];let n=null,a=!1,o=0,i=!1,s=new Notyf;function l(t){e(window).scroll((()=>{e(window).scrollTop()+e(window).height()>.75*e(document).height()&&!1===i&&function(t,n=null){switch(o++,t){case"homepage":n=".index-container:nth-child(4)";break;case"page":case"span":n=".index-container"}i=!0,h(`第${o}頁 讀取中`),e.ajax({type:"GET",url:`${location.href}/?page=${o}`,cache:!0,dataType:"html",success:t=>{h(`第${o}頁 讀取成功`);let s=e("<div></div>");if(s.html(t.replaceAll("data-src","src")),e(n).append(s.find(".gallery")),c(),a)for(let e=window.n.options.blacklisted_tags.map((e=>".tag-".concat(e,',.gallery[data-tags~="').concat(e,'"]'))).join(","),t=document.querySelectorAll(e),n=0;n<t.length;n++)t[n].classList.add("blacklisted");h("隱藏黑名單 已關閉"),i=!1},error:()=>{h(`第${o}頁 讀取失敗`),s.dismissAll(),s.error(`第${o}頁 讀取失敗`),o--,i=!1}})}(t)}))}function c(){e(".gallery > a").attr("target","_blank")}function r(t,n){switch(t){case"homepage":n=".index-container.index-popular";break;case"page":n="#content > div";break;case"span":n=".container.index-container"}e("#content > section").insertBefore(n),e("#content > section > div").remove()}function h(e){console.log(e)}function d(t,n){e(t)[0]?e(t).html(n):h(`修改 HTML 失敗，選擇器：${t}`)}function p(e){for(let t=0;t<e.length;t++){const a=e.eq(t),o=a.html();n.Tags.hasOwnProperty(o)&&(h(`偵測到：${o}，更改為：${n.Tags[o]}`),a.html(n.Tags[o]).parent().attr("title",o))}}function g(e){const t=n.Book.Time,a=["years","year","months","month","weeks","days","day","hours","hour","minutes","minute","seconds","second","ago"];for(let n=0,o=a.length;n<o;n++)e=e.replace(a[n],t[a[n]]);return e}function f(){e('nav[role="navigation"]')[0]?(h("偵測到導航欄"),function(o){e(window).scroll((()=>{e("nav").css({position:"static",top:"0",width:"100%","z-index":"999999"}),0===e(window).scrollTop()?e("nav").css({position:"static"}):window.pageYOffset>=e("nav")[0].offsetTop&&e("nav").css({position:"fixed"})}));for(let t=1,a=Object.keys(n.MenuLeft).length;t<=a;t++)d(`.menu.left li:nth-child(${t}) > a`,n.MenuLeft[Object.keys(n.MenuLeft).sort(((e,t)=>e-t))[t-1]]),7==t&&e(`.menu.left li:nth-child(${t})`).hide();/Sign in/.test(e(".menu.right li:nth-child(1) >a").html())?(d(".menu.right li:nth-child(1) > a",`<i class="fa fa-sign-in-alt"></i> ${n.MenuRight1.SignIn}`),d(".menu.right li:nth-child(2) > a",`<i class="fa fa-edit"></i> ${n.MenuRight1.Register}`),a=!1):(d(".menu.right li:nth-child(1) > a",`<i class="fa fa-heart color-icon"></i> ${n.MenuRight2.Favroites}`),d(".menu.right li:nth-child(3) > a",`<i class="fa fa-sign-out-alt"></i> ${n.MenuRight2.LogOut}`),a=!0),e(".menu.right").prepend('\n    <li class="desktop "><a target="_blank" href="https://github.com/NekoChanTaiwan/nHentai-downloader/releases/latest"><i class="fas fa-download"></i> &nbsp nHentai-downloader</a></li>\n    <li class="desktop "><a target="_blank" href="https://discord.gg/ekbWahg52h"><i class="fab fa-discord"></i> &nbsp Discord - nHentai-Enhanced</a></li>'),e("input[type=search]").attr({autocomplete:"off",placeholder:""}),o(),function(t){for(let n=0;n<t.length;n++)h(`新增自定選單：${Object.keys(t[n])[0]} 連結：${Object.values(t[n])[0]}`),e(".menu.left").append(`<li class="desktop "><a href="${Object.values(t[n])[0]}">${Object.keys(t[n])[0]}</a></li>`)}(t)}((function(){e("head").append('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3.9.0/notyf.min.css">'),e("#content .index-popular")[0]?(h("偵測到首頁"),d("#content .index-popular > h2",`<i class="fa fa-fire color-icon"></i> ${n.Homepage.PopularNow}`),d("#content .container:nth-child(3) > h2",`<i class="fa fa-box-tissue color-icon"></i> ${n.Homepage.NewUploads}`),c(),h("自動翻頁 已開啟"),r("homepage"),o=1,l("homepage")):e(".index-container")[0]&&/net\/\?page=/.test(location.href)?(h("偵測到頁面列表"),c(),h("自動翻頁 已開啟"),r("page"),o=Number(location.href.split("=")[1]),l("page")):e("#tags")[0]?(h("偵測到本本"),function(){const t=e("#gallery_id").hide().text().replace("#","");e(e(`<h3 class="title"><span class="before">神的語言：</span><a id="book_id" class="god" data-clipboard-text="${t}" href="javascript:;">${t}</a></h3>`)).insertAfter("#gallery_id");const o=new ClipboardJS(".god");o.on("success",(e=>{h(`操作：${e.action}, 文字：${e.text}, 觸發：${e.trigger}`),s.dismissAll(),s.success("複製成功！"),e.clearSelection()})),o.on("error",(e=>{h(`操作：${e.action}, 觸發：${e.trigger}`),s.dismissAll(),s.error("復製失敗！")}));for(let t=1,a=Object.keys(n.Book.TagsName).length,o="";t<=a;t++)o=e(`#tags > .tag-container:nth-child(${t}) > span`)[0].outerHTML,d(`#tags > .tag-container:nth-child(${t})`,`${n.Book.TagsName[Object.keys(n.Book.TagsName).sort(((e,t)=>e-t))[t-1]]} ${o}`);p(e("#tags > .tag-container .tags a .name")),e("#download").hide(),e("#info > .buttons").prepend(`<a href="/g/${t}/1/?onePageMode=True" class="btn btn-primary"><i class="fas fa-book-open"></i> ${n.Book.Btns.Read}</a>`);let i=2===e("#info .title").length?`${e("#info .title:nth-child(1) > .pretty").text()}`:3===e("#info .title").length?`${e("#info .title:nth-child(2) > .pretty").text()}`:null,l=3===e("#info .title").length?`${e("#info .title:nth-child(1) > .pretty").text()}`:null,r="",f=0,m=i.split(" "),u=1===m.length?m.length:m.length-1,b=["Ch.","Ep.","第","話","券","前篇","中篇","後篇","+","-","#"],$=[" ","「","」"];for(let e=0;e<u;e++)r+=`${m[e]}+`;!function t(a,o=!0){function i(e,t=""){for(let n=0,o=e.length;n<o;n++)a=a.replaceAll(e[n],t)}3!=f&&(f++,o&&(a=a.replace(/[0-9]+/g,""),i(b),i($,"+")),e.ajax({type:"GET",url:`/search/?q=${a}`,cache:!1,dataType:"html",success:o=>{h(`搜尋 ${a} 讀取成功`);let i=e("<div></div>").html(o).find("#content > h1").text().replace("results",""),s=/69696969/.test(o.replace(l,"69696969"));if(h(`搜尋 結果數量：${i}`),i>0&&s)h("完美搜尋結果"),c(a);else switch(f){case 1:3===e("#info .title").length?t(l):(h("跳過搜尋 searchText2 ，搜尋 searchText3"),t(r,!1));break;case 2:i>0&&s?(h("完美搜尋結果"),c(a)):t(r,!1);break;case 3:h("勉強搜尋結果"),c(a)}function c(t){e("#info > .buttons").append(`<a href="/search/?q=${t}" class="btn btn-secondary"><i class="fas fa-search"></i> ${n.Book.Btns.SerachRelatedBook} (<span>${i.replaceAll(" ","")}</span>)</a>`)}},error:()=>{h(`搜尋 ${a} 讀取失敗`)}}))}(i);const y=e(".thumb-container").length;y>75&&(h(`總共頁數：：${y}，確定大於 75 `),d("#show-more-images-button",`<i class="fa fa-eye"></i> &nbsp; <span class="text">${n.Book.ShowMoreImagesButton}</span>`),d("#show-all-images-button",`<i class="fa fa-eye"></i> &nbsp; <span class="text">${n.Book.ShowAllImagesButton}</span>`)),d("#related-container > h2",n.Book.MoreLikeThis),c(),d("#comment-post-container > h3",`<i class="fa fa-comments color-icon"></i> ${n.Book.PostAComment}`),a?(e("#comment_form > textarea").attr("placeholder",`${n.Book.CommentFormPlaceHolder}`),d("#comment_form > div > button",`<i class="fa fa-comment"></i> ${n.Book.Comment}`)):d("#comment-post-container > div > p",`<a class="login-comment" href="/login/">${n.Book.NoLogin.Login}</a> ${n.Book.NoLogin.Or} <a class="login-comment" href="/register/">${n.Book.NoLogin.Register}</a> ${n.Book.NoLogin.ToPostAComment}`),d("time",g(e("time").html())),e("time").bind("DOMNodeInserted",(function(){let e=g(this.innerHTML);this.innerHTML!==e&&(this.innerHTML=e,h(`偵測到時間發生變化：${this.innerHTML}`))}))}()):e("#image-container")[0]?(h("偵測到閱讀本本中"),/onePageMode=True/.test(location.href)?function(){h("自動翻頁 已開啟");let t=location.href.split("/"),n=Number(t[t.length-2]),a=Number(e("span.num-pages").eq(1).text()),o=t[t.length-3],i=1,l=new IntersectionObserver((t=>{t.forEach((t=>{t.isIntersecting&&(i=Number(e(t.target).attr("id").replace("page","")),$H("span.current",i))}))}),{root:null,rootMargin:"0px",threshold:[0,1]});function c(t){e("html, body").animate({scrollTop:e(`#page${t}`).offset().top},"fast")}e("nav, #messages, #image-container, .reader-bar:last, .reader-settings, .reader-pagination").hide(),e(".reader-bar").append(`<div style="display:flex;align-self:flex-center;position:absolute;left:50%;transform:translateX(-50%)"><button class="page-number btn btn-unstyled"><span class="current">0</span><span class="divider">&nbsp;/&nbsp;</span><span class="num-pages">${a}</span></button></div>`),e(".reader-bar").eq(0).css({opacity:"0",position:"fixed",top:"0",width:"100%","z-index":"999999"}).hover((function(){e(this).animate({opacity:"1.0"},100)}),(function(){e(this).animate({opacity:"0"},100)})),e(window).keyup((t=>{switch(e(".reader-pagination > a").remove(),t.code){case"ArrowRight":i++,i<=a?c(i):i--;break;case"ArrowLeft":i--,i>=1?c(i):i++}})),function t(i){i>a||e.ajax({type:"GET",url:`/g/${o}/${i}/`,cache:!0,dataType:"html",success:a=>{h(`第 ${i} 張 讀取成功`);let o=e("<div></div>");e("#content").append(o.html(a).find("#image-container > a > img").attr("id",`page${i}`).css({display:"block",margin:"0px auto"})),i==n&&c(n),l.observe(e(`#page${i}`)[0]),t(i+1)},error:()=>{h(`第 ${i} 張 讀取失敗`),s.dismissAll(),s.error(`第 ${i} 張 讀取失敗`),t(i)}})}(1)}():h("自動翻頁 已關閉")):e("#content > h1 > span")[0]?(h("偵測到 span 頁面"),function(){const t=n.spanPage,a=t.sort,i=e("#content > h1 > span"),s=i.html();t.tags.hasOwnProperty(s)?i.html(t.tags[s]).parent():h("未知的 span 頁面"),p(e("#content > h1 > a > .name")),d(".sort > div:nth-child(1) > a",a.Recent),d(".sort > div:nth-child(2) > span",a.Popular),d(".sort > div:nth-child(2) > a:nth-child(2)",a.today),d(".sort > div:nth-child(2) > a:nth-child(3)",a.week),d(".sort > div:nth-child(2) > a:nth-child(4)",a.allTime),r("span");const c=location.href.split("=");o=1==c.length?1:Number(c[1]),l("span")}()):h("未知頁面"),document.body.style.display="",h("隱藏黑名單 已關閉"),h("Discord 聊天室 已關閉"),h("阻擋廣告 已開啟"),e(".advertisement").hide(),window.n.ads=null}))):(h('初始化失敗，找不到指定的元素：nav[role="navigation"]'),e("body").show())}document.body.style.display="none",e((()=>{const t=()=>{e.ajax({type:"GET",url:"//raw.githubusercontent.com/NekoChanTaiwan/nHentai-Enhanced/main/locales/zh_TW.json?flush_cache=True",cache:!1,dataType:"json",success:e=>{h("JSON 讀取成功"),n=e,f()},error:()=>{h("JSON 讀取失敗 3 秒後重新讀取"),setTimeout((()=>t()),3e3)}})};t()}))})();
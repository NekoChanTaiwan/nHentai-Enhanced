// ==UserScript==
// @name       nhentai-enhanced
// @version    0.0.1
// @author     NekoChan
// @homepage   https://github.com/NekoChanTaiwan/nHentai-Enhanced
// @supportURL https://github.com/NekoChanTaiwan/nHentai-Enhanced/issues
// @match      https://nhentai.net/*
// @namespace  https://github.com/NekoChanTaiwan
// @license    MIT
// @grant      none
// @require    https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js
// @require    https://cdn.jsdelivr.net/npm/clipboard@2.0.8/dist/clipboard.min.js
// @require    https://cdn.jsdelivr.net/npm/notyf@3.9.0/notyf.min.js
// ==/UserScript==

(()=>{"use strict";const e=window.$,t=!1,a=[{中文:"/language/chinese/"},{日文:"/language/japanese/"},{英文:"/language/english/"}];let o=null,i=!1,s=0,c=!1,l=new Notyf;function r(a){e(window).scroll((()=>{e(window).scrollTop()+e(window).height()>.75*e(document).height()&&!1===c&&function(a,o=null){switch(s++,a){case"homepage":o=".index-container:nth-child(4)";break;case"page":case"span":o=".index-container"}c=!0,p(`第${s}頁 讀取中`),e.ajax({type:"GET",url:`${location.href}/?page=${s}`,cache:t,dataType:"html",success:t=>{p(`第${s}頁 讀取成功`);let a=e("<div></div>");e(o).append(a.html(t.replaceAll("data-src","src")).find(".gallery")),h(),i&&n.install_blacklisting(),p("隱藏黑名單 已關閉"),c=!1},error:()=>{p(`第${s}頁 讀取失敗`),l.dismissAll(),l.error(`第${s}頁 讀取失敗`),s--,c=!1}})}(a)}))}function h(){e(".gallery > a").attr("target","_blank")}function d(t,n){switch(t){case"homepage":n=".index-container.index-popular";break;case"page":n="#content > div";break;case"span":n=".container.index-container"}e("#content > section").insertBefore(n),e("#content > section > div").remove()}function p(e){console.log(e)}function g(t,n){e(t)[0]?e(t).html(n):p(`修改 HTML 失敗，選擇器：${t}`)}function f(e){for(let t=0;t<e.length;t++){const n=e.eq(t),a=n.html();o.Tags.hasOwnProperty(a)&&(p(`偵測到：${a}，更改為：${o.Tags[a]}`),n.html(o.Tags[a]).parent().attr("title",a))}}function u(e){const t=o.Book.Time,n=["years","year","months","month","weeks","days","day","hours","hour","minutes","minute","seconds","second","ago"];for(let a=0,o=n.length;a<o;a++)e=e.replace(n[a],t[n[a]]);return e}function m(){p("偵測到本本");const n=e("#gallery_id").hide().text().replace("#","");e(e(`<h3 class="title"><span class="before">神的語言：</span><a id="book_id" class="god" data-clipboard-text="${n}" href="javascript:;">${n}</a></h3>`)).insertAfter("#gallery_id");const a=new ClipboardJS(".god");a.on("success",(e=>{p(`操作：${e.action}, 文字：${e.text}, 觸發：${e.trigger}`),l.dismissAll(),l.success("複製成功"),e.clearSelection()})),a.on("error",(e=>{p(`操作：${e.action}, 觸發：${e.trigger}`),l.dismissAll(),l.error("復製失敗")}));for(let t=1,n=Object.keys(o.Book.TagsName).length,a="";t<=n;t++)a=e(`#tags > .tag-container:nth-child(${t}) > span`)[0].outerHTML,g(`#tags > .tag-container:nth-child(${t})`,`${o.Book.TagsName[Object.keys(o.Book.TagsName).sort(((e,t)=>e-t))[t-1]]} ${a}`);f(e("#tags > .tag-container .tags a .name")),e("#download").hide(),e("#info > .buttons").prepend(`<a href="/g/${n}/1/?onePageMode=True" class="btn btn-primary"><i class="fas fa-book-open"></i> ${o.Book.Btns.Read}</a>`);let s=2===e("#info .title").length?`${e("#info .title:nth-child(1) > .pretty").text()}`:3===e("#info .title").length?`${e("#info .title:nth-child(2) > .pretty").text()}`:null,c=3===e("#info .title").length?`${e("#info .title:nth-child(1) > .pretty").text()}`:null,r="",d=0,m=s.split(" "),b=1===m.length?m.length:m.length-1,$=["Ch.","Ep.","第","話","券","前篇","中篇","後篇","+","-","#"],k=[" ","「","」"];for(let e=0;e<b;e++)r+=`${m[e]}+`;!function n(a,i=!0){function s(e,t=""){for(let n=0,o=e.length;n<o;n++)a=a.replaceAll(e[n],t)}3!=d&&(d++,i&&(a=a.replace(/[0-9]+/g,""),s($),s(k,"+")),e.ajax({type:"GET",url:`/search/?q=${a}`,cache:t,dataType:"html",success:t=>{p(`搜尋 ${a} 讀取成功`);let i=e("<div></div>").html(t).find("#content > h1").text().replace("results",""),s=/69696969/.test(t.replace(c,"69696969"));if(p(`搜尋 結果數量：${i}`),i>0&&s)p("完美搜尋結果"),l(a);else switch(d){case 1:3===e("#info .title").length?n(c):(p("跳過搜尋 searchText2 ，搜尋 searchText3"),n(r,!1));break;case 2:i>0&&s?(p("完美搜尋結果"),l(a)):n(r,!1);break;case 3:p("勉強搜尋結果"),l(a)}function l(t){e("#info > .buttons").append(`<a href="/search/?q=${t}" class="btn btn-secondary"><i class="fas fa-search"></i> ${o.Book.Btns.SerachRelatedBook} (<span>${i.replaceAll(" ","")}</span>)</a>`)}},error:()=>{p(`搜尋 ${a} 讀取失敗`)}}))}(s);const y=e(".thumb-container").length;y>75&&(p(`總共頁數：：${y}，確定大於 75 `),g("#show-more-images-button",`<i class="fa fa-eye"></i> &nbsp; <span class="text">${o.Book.ShowMoreImagesButton}</span>`),g("#show-all-images-button",`<i class="fa fa-eye"></i> &nbsp; <span class="text">${o.Book.ShowAllImagesButton}</span>`)),g("#related-container > h2",o.Book.MoreLikeThis),h(),g("#comment-post-container > h3",`<i class="fa fa-comments color-icon"></i> ${o.Book.PostAComment}`),i?(e("#comment_form > textarea").attr("placeholder",`${o.Book.CommentFormPlaceHolder}`),g("#comment_form > div > button",`<i class="fa fa-comment"></i> ${o.Book.Comment}`)):g("#comment-post-container > div > p",`<a class="login-comment" href="/login/">${o.Book.NoLogin.Login}</a> ${o.Book.NoLogin.Or} <a class="login-comment" href="/register/">${o.Book.NoLogin.Register}</a> ${o.Book.NoLogin.ToPostAComment}`),g("time",u(e("time").html())),e("time").bind("DOMNodeInserted",(function(){let e=u(this.innerHTML);this.innerHTML!==e&&(this.innerHTML=e,p(`偵測到時間發生變化：${this.innerHTML}`))}))}function b(){p("偵測到首頁"),g("#content .index-popular > h2",`<i class="fa fa-fire color-icon"></i> ${o.Homepage.PopularNow}`),g("#content .container:nth-child(3) > h2",`<i class="fa fa-box-tissue color-icon"></i> ${o.Homepage.NewUploads}`),h(),p("自動翻頁 已開啟"),d("homepage"),s=1,r("homepage")}function $(){p("偵測到頁面列表"),h(),p("自動翻頁 已開啟"),d("page"),s=Number(location.href.split("=")[1]),r("page")}function k(){p("偵測到閱讀本本中"),/onePageMode=True/.test(location.href)?function(){p("自動翻頁 已開啟");let n=location.href.split("/"),a=Number(n[n.length-2]),o=Number(e("span.num-pages").eq(1).text()),i=n[n.length-3],s=1,c=new IntersectionObserver((t=>{t.forEach((t=>{t.isIntersecting&&(s=Number(e(t.target).attr("id").replace("page","")),g("span.current",s))}))}),{root:null,rootMargin:"0px",threshold:[0,1]});function r(t){e("html, body").animate({scrollTop:e(`#page${t}`).offset().top},"fast")}e("nav, #messages, #image-container, .reader-bar:last, .reader-settings, .reader-pagination").hide(),e(".reader-bar").append(`<div style="display:flex;align-self:flex-center;position:absolute;left:50%;transform:translateX(-50%)"><button class="page-number btn btn-unstyled"><span class="current">0</span><span class="divider">&nbsp;/&nbsp;</span><span class="num-pages">${o}</span></button></div>`),e(".reader-bar").eq(0).css({opacity:"0",position:"fixed",top:"0",width:"100%","z-index":"999999"}).hover((function(){e(this).animate({opacity:"1.0"},100)}),(function(){e(this).animate({opacity:"0"},100)})),e(window).keyup((t=>{switch(e(".reader-pagination > a").remove(),t.code){case"ArrowRight":s++,s<=o?r(s):s--;break;case"ArrowLeft":s--,s>=1?r(s):s++}})),function n(s){s>o?l.success("全部讀取完畢"):e.ajax({type:"GET",url:`/g/${i}/${s}/`,cache:t,dataType:"html",success:t=>{p(`第 ${s} 張 讀取成功`);let o=e("<div></div>");e("#content").append(o.html(t).find("#image-container > a > img").attr("id",`page${s}`).css({display:"block",margin:"0px auto"})),s==a&&r(a),c.observe(e(`#page${s}`)[0]),n(s+1)},error:()=>{p(`第 ${s} 張 讀取失敗`),l.dismissAll(),l.error(`第 ${s} 張 讀取失敗`),n(s)}})}(1)}():p("自動翻頁 已關閉")}function y(){p("偵測到 span 頁面");const t=o.spanPage,n=t.sort,a=e("#content > h1 > span"),i=a.html();t.tags.hasOwnProperty(i)?a.html(t.tags[i]).parent():p("未知的 span 頁面"),f(e("#content > h1 > a > .name")),g(".sort > div:nth-child(1) > a",n.Recent),g(".sort > div:nth-child(2) > span",n.Popular),g(".sort > div:nth-child(2) > a:nth-child(2)",n.today),g(".sort > div:nth-child(2) > a:nth-child(3)",n.week),g(".sort > div:nth-child(2) > a:nth-child(4)",n.allTime),d("span");const c=location.href.split("=");s=1==c.length?1:Number(c[1]),r("span")}function w(){if(e("head").append('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3.9.0/notyf.min.css">'),e('nav[role="navigation"]')[0])try{!function(t){p("偵測到導航欄"),e(window).scroll((()=>{e("nav").css({position:"static",top:"0",width:"100%","z-index":"999999"}),0===e(window).scrollTop()?e("nav").css({position:"static"}):pageYOffset>=e("nav")[0].offsetTop&&e("nav").css({position:"fixed"})}));for(let t=1,n=Object.keys(o.MenuLeft).length;t<=n;t++)g(`.menu.left li:nth-child(${t}) > a`,o.MenuLeft[Object.keys(o.MenuLeft).sort(((e,t)=>e-t))[t-1]]),7==t&&e(`.menu.left li:nth-child(${t})`).hide();Object.keys(n.options.user).length?(g(".menu.right li:nth-child(1) > a",`<i class="fa fa-heart color-icon"></i> ${o.MenuRight2.Favroites}`),g(".menu.right li:nth-child(3) > a",`<i class="fa fa-sign-out-alt"></i> ${o.MenuRight2.LogOut}`),i=!0):(g(".menu.right li:nth-child(1) > a",`<i class="fa fa-sign-in-alt"></i> ${o.MenuRight1.SignIn}`),g(".menu.right li:nth-child(2) > a",`<i class="fa fa-edit"></i> ${o.MenuRight1.Register}`),i=!1),e(".menu.right").prepend('\n    <li class="desktop "><a target="_blank" href="https://github.com/NekoChanTaiwan/nHentai-downloader/releases/latest"><i class="fas fa-download"></i> &nbsp nHentai-downloader</a></li>\n    <li class="desktop "><a target="_blank" href="https://discord.gg/ekbWahg52h"><i class="fab fa-discord"></i> &nbsp Discord - nHentai-Enhanced</a></li>'),e("input[type=search]").attr({autocomplete:"off",placeholder:""}),function(t,n=t.length){for(let a=0;a<n;a++)p(`新增自定選單：${Object.keys(t[a])[0]} 連結：${Object.values(t[a])[0]}`),e(".menu.left").append(`<li class="desktop "><a href="${Object.values(t[a])[0]}">${Object.keys(t[a])[0]}</a></li>`)}(a),function(t={}){const a=(e,n,a)=>t[e]={condition:n,func:a};a("homepage",e("#content .index-popular")[0],b),a("page",e(".index-container")[0]&&/net\/\?page=/.test(location.href),$),a("book",e("#tags")[0],m),a("readingBook",e("#image-container")[0],k),a("spanPage",e("#content > h1 > span")[0],y);for(let n of Object.keys(t))if(p(`正在偵測 ${n}`),t[n].condition){t[n].func(),e("#content").show();break}p("隱藏黑名單 已關閉"),p("Discord 聊天室 已關閉"),p("阻擋廣告 已開啟"),e(".advertisement").hide(),n.ads=null}()}(),e("nav").show()}catch(e){p("初始化失敗："+e),l.error("nHentai-Enhanced 初始化失敗："+e)}else p('nav 初始化失敗，找不到指定的元素：nav[role="navigation"]')}e("nav, #content").hide(),e((()=>{const n=()=>{e.ajax({type:"GET",url:"//raw.githubusercontent.com/NekoChanTaiwan/nHentai-Enhanced/main/locales/zh_TW.json?flush_cache=True",cache:t,dataType:"json",success:e=>{p("JSON 讀取成功"),o=e,w()},error:()=>{p("JSON 讀取失敗 3 秒後重新讀取"),setTimeout((()=>n()),3e3)}})};n()}))})();
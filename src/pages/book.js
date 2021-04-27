import {
    $,
    ajaxCache,
} from '../config.js'

import {
    json,
    login,
    notyf
} from '../variable.js'

import {
    galleryBlank,
    debugConsole,
    $H,
    tagsTranslator,
    timeTranslator,
    translatePlus
} from '../utils'

/**
 * book 本本
 */
export function book () {
    debugConsole('偵測到本本')

    // 移除通知元素
    $('.alert, .announcement').remove()

    const book_id = $('#gallery_id').hide().text().replace('#', '')

    // 神的語言
    $($(`<h3 class="title"><span class="before">神的語言：</span><a id="book_id" class="god" data-clipboard-text="${book_id}" href="javascript:;">${book_id}</a></h3>`)).insertAfter('#gallery_id')

    // ClipboardJS 初始化
    const clipboard = new ClipboardJS('.god')

    // ClipboardJS 事件
    clipboard.on('success', e => {
        debugConsole(`操作：${e.action}, 文字：${e.text}, 觸發：${e.trigger}`)

        notyf.dismissAll()
        notyf.success('複製成功')

        e.clearSelection()
    })

    clipboard.on('error', e => {
        debugConsole(`操作：${e.action}, 觸發：${e.trigger}`)

        notyf.dismissAll()
        notyf.error('復製失敗')
    })


    // 左側標籤列表
    for (let i = 1, len = Object.keys(json.Book.TagsName).length, span = ''; i <= len; i++) {
        span = $(`#tags > .tag-container:nth-child(${i}) > span`)[0].outerHTML
        $H(`#tags > .tag-container:nth-child(${i})`, `${json.Book.TagsName[Object.keys(json.Book.TagsName).sort((a, b) => a - b)[i - 1]]} ${span}`)
    }

    // 右側標籤列表
    tagsTranslator($('#tags > .tag-container .tags a .name'))

    // 標籤下方按紐區
    // TODO: Favorite
    // 第一次獲取並翻譯，點下後重新獲取並翻譯(或重新整理比較省事)

    // 按鈕 - 下載
    // $H('#download', `<i class="fa fa-download"></i> ${json.Book.Btns.BTdownload}`)
    $('#download').hide()

    // 新增按鈕 - 單頁閱讀
    $('#info > .buttons').prepend(`<a href="/g/${book_id}/1/?onePageMode=True" class="btn btn-primary"><i class="fas fa-book-open"></i> ${json.Book.Btns.Read}</a>`)

    // 新增按鈕 - 搜尋相關本本
    let searchText1 = $('#info .title').length === 2 ? `${$('#info .title:nth-child(1) > .pretty').text()}` :
                     $('#info .title').length === 3 ? `${$('#info .title:nth-child(2) > .pretty').text()}` : null,
        searchText2 = $('#info .title').length === 3 ? `${$('#info .title:nth-child(1) > .pretty').text()}` : null,
        searchText3 = '',
        serachTimes = 0,

        sT1Array = searchText1.split(' '),
        sT1Length = sT1Array.length === 1 ? sT1Array.length : sT1Array.length - 1,

        // 移除文字
        remove = ['Ch.', 'Ep.', '第', '話', '券', '前篇', '中篇', '後篇', '+', '-', '#'],
        // 替換文字
        replace = [' ', '「', '」']

    for (let i = 0; i < sT1Length; i++) {
        searchText3 += `${sT1Array[i]}+`
    }

    // 讀取搜尋結果數量並修改，第一次搜尋 searchText1
    search(searchText1)

    // 搜尋相關本本 按鈕
    $('#info > .buttons').append(`<a id="serachRelatedBookBtn" class="btn btn-secondary" href="javascript:;" style="cursor: wait;"><i class="fas fa-search"></i> ${json.Book.Btns.Searching}</a>`)

    /**
     * 搜尋相關本本 函式
     * @param {string} searchText - 要搜尋的字符串
     * @param {boolean} fix - 是否格式化文字
     */
    function search (searchText, fix = true) {
        if (serachTimes == 3) return

        // 搜尋次數
        serachTimes++

        // 格式化文字
        if (fix) {
            // 移除數字
            searchText = searchText.replace(/[0-9]+/g, '')

            // 移除文字
            forLoop(remove)

            // 替換文字
            forLoop(replace, '+')
        }

        /**
         * for 循環 replaceAll 迴圈
         * @param {array} target - 搜尋字串
         * @param {string} replace - 取代內容
         */
        function forLoop (target, replace = '') {
            for (let i = 0, len = target.length; i < len; i++) {
                searchText = searchText.replaceAll(target[i], replace)
            }
        }

        $.ajax({
            type: 'GET',
            url: `/search/?q=${searchText}`,
            cache: ajaxCache,
            dataType: 'html',
            success: data => {
                debugConsole(`搜尋 ${searchText} 讀取成功`)

                let newHtml = $('<div></div>'),

                    // 讀取搜尋結果數量
                    resultNum = Number(newHtml.html(data).find('#content > h1').text().replace('results', '')),

                    // 搜尋結果是否含有 searchText2
                    perfect = /69696969/.test(data.replace(searchText2, '69696969'))

                debugConsole(`搜尋 結果數量：${resultNum}`)

                if (resultNum > 0 && perfect) {
                    debugConsole('完美搜尋結果')
                    updateBtn(searchText, resultNum)

                } else {
                    switch (serachTimes) {
                        case 1 :
                            if ($('#info .title').length === 3) {
                                search(searchText2, resultNum)
                            } else {
                                debugConsole('跳過搜尋 searchText2 ，搜尋 searchText3')
                                search(searchText3, false)
                            }
                            break
                        case 2 :
                            if (resultNum > 0 && perfect) {
                                debugConsole('完美搜尋結果')
                                updateBtn(searchText, resultNum)
                            } else {
                                search(searchText3, false)
                            }
                            break
                        case 3 :
                            debugConsole('勉強搜尋結果')
                            updateBtn(searchText, resultNum)
                            break
                    }
                }

                /**
                 * 更新按鈕
                 * @param {*} searchText - 搜尋的內容
                 * @param {*} resultNum - 搜尋結果數量
                 * @param {*} j - 不必傳遞，變量用
                 */
                function updateBtn (searchText, resultNum, j = json.Book.Btns) {
                    const btnTextresultNum = resultNum === 0 ? j.Nothing : j.SerachRelatedBook
                    $('#serachRelatedBookBtn').css('cursor', 'pointer').attr('href', `/search/?q=${searchText}`).html(`<i class="fas fa-search"></i> ${btnTextresultNum} (<span>${resultNum}</span>)`)
                }

            },
            error: () => {
                debugConsole(`搜尋 ${searchText} 讀取失敗`)
            }
        })
    }

    // 偵測頁數 & 按紐
    if ($('.thumb-container').length > 75) {
        // 顯示更多
        $H('#show-more-images-button', `<i class="fa fa-eye"></i> &nbsp; <span class="text">${json.Book.ShowMoreImagesButton}</span>`)

        // 顯示全部
        $H('#show-all-images-button', `<i class="fa fa-eye"></i> &nbsp; <span class="text">${json.Book.ShowAllImagesButton}</span>`)
    }

    // 將目前項目連結 改為新分頁開啟
    galleryBlank()

    if (login) {
        // 如果你詢問是否有翻譯，你將會死亡。
        $('#comment_form > textarea').attr('placeholder',`${json.Book.CommentFormPlaceHolder}`)
    } else {
        $H('#comment-post-container > div > p', `<a class="login-comment" href="/login/">${json.Book.NoLogin.Login}</a> ${json.Book.NoLogin.Or} <a class="login-comment" href="/register/">${json.Book.NoLogin.Register}</a> ${json.Book.NoLogin.ToPostAComment}`)
    }

    // 翻譯
    translatePlus(['i', 'nav'], json.NewBook)

    // 時間
    $H('time', timeTranslator($('time').html()))
    $('time').bind('DOMNodeInserted', function() {
        let time = timeTranslator(this.innerHTML)

        if (this.innerHTML !== time) {
            this.innerHTML = time
            debugConsole(`偵測到時間發生變化：${this.innerHTML}`)
        }
    })
}
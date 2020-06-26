'use strict';

const ListArticlesPath = 'articles/listArticles.json';

let articles = {
    list: {},
    sortedList: [],
    titleArticle: null,
    HTMLArticle: null,
    load(pathLoad) {
        $.ajax(pathLoad, {
            type: 'GET',
            dataType: 'json',
            async: false,
            cache: false,
            success: (data) => {
                this.list = data;
            },
            error: errorHandler,
        });
        this.sortList();
    },
    loadArticle(title) {
        $.ajax(`articles/${this.list[title]}.html`, {
            type: 'GET',
            async: false,
            dataType: 'html',
            cache: false,
            success: (data) => {
                this.titleArticle = title;
                this.HTMLArticle = data;
            },
            error: errorHandler,
        });
    },
    sortList() {
        this.sortedList = Object.keys(this.list).sort();
    },
};

window.onhashchange = renderState;
renderState();

function renderState() {
    let hash = window.location.hash;
    let state = decodeURIComponent(hash.substr(1));

    if (state === '') {
        state = {pageName: 'main'}
    } else {
        state = JSON.parse(state);
    }

    articles.load(ListArticlesPath);

    let page = '';
    switch (state.pageName) {
        case 'main':
            page += '<h1 class="title" id="title">Энциклопедия</h1>';
            page += '<div><a class="contents" id="contents" href="/" onclick="switchToContents(event)">список статей здесь</a></div>';
            break;
        case 'contents':
            if (articles.sortedList) {
                articles.sortList();
            }
            let items = articles.sortedList;
            page += '<h1 class="title" id="title">Оглавление</h1>';
            page += '<div>';

            for (let i = 0; i < items.length; i++) {
                page += `<ul>${items[i][0]}`;
                for (let j = i; j < items.length; j++) {
                    if (items[i][0] == items[j][0]) {
                        page += `<li><a id="article" href="articles/${
                            articles.list[items[j]]
                        }.html" onclick="switchToArticlePage(event)">${items[j]}</a></li>`;
                    } else {
                        page += "</ul>";
                        break;
                    }
                }
            }
            page += '</div>';
            break;
        case 'article':
            if (articles.titleArticle == null) {
                articles.loadArticle(Object.keys(articles.list)[0]);
            }
            page += "<ul class='menu'>";
            articles.sortedList.forEach((item) => {
                page += `<li><a id="article" href="articles/${articles.list[item]}.html" onclick="switchToArticlePage(event)">${item}</a></li>`;
            });
            page += '</ul>';
            page += `<h1 class="title" id="title">${articles.titleArticle}</h1>`;
            page += `${articles.HTMLArticle}`;
            break;
    }
    document.getElementById('wrapper').innerHTML = page;
}

function switchToState(pageName) {
    location.hash = encodeURIComponent(JSON.stringify(pageName));
}

function switchToContents(event) {
    event.preventDefault();
    articles.sortList();
    switchToState({pageName: 'contents'});
}

function switchToArticlePage(event) {
    event.preventDefault();
    let titleArticle = event.target.textContent;
    let pathToArticle = event.target.href;
    $.ajax(pathToArticle, {
        type: 'HEAD',
        success: () => {
            articles.loadArticle(titleArticle);
            switchToState({pageName: 'article'});
            renderState();
        },
        error: errorHandler,
    });
}

function errorHandler(jqXHR, StatusStr, ErrorStr) {
    alert(StatusStr + ' ' + ErrorStr);
}
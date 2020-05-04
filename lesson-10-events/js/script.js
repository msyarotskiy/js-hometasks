"use strict";

(function () {
    var formDef =
        [
            {label: 'Разработчики:', kind: 'longtext', name: 'programmers'},
            {label: 'Название сайта:', kind: 'longtext', name: 'sitename'},
            {label: 'URL сайта:', kind: 'middletext', name: 'siteurl'},
            {label: 'Дата запуска сайта:', kind: 'number', name: 'visitors'},
            {label: 'Посетителей в сутки:', kind: 'number', name: 'visitors'},
            {label: 'E-mail для связи:', kind: 'shorttext', name: 'email'},
            {
                label: 'Рубрика каталога:', kind: 'combo', name: 'division',
                variants: [{text: 'здоровье', value: 1}, {text: 'домашний уют', value: 2}, {
                    text: 'бытовая техника',
                    value: 3
                }]
            },
            {
                label: 'Размещение:', kind: 'radio', name: 'payment',
                variants: [{text: 'бесплатное', value: 1}, {text: 'платное', value: 2}, {text: 'VIP', value: 3}]
            },
            {label: 'Разрешить отзывы:', kind: 'check', name: 'votes'},
            {label: 'Описание сайта:', kind: 'memo', name: 'description'},
            {label: 'Опубликовать:', kind: 'submit'},
        ];

    var inputWidth = {
        number: '80px',
        shorttext: '200px',
        longtext: '453px',
        middletext: '304px'
    };

    var nameForm = 'dynForm';

    buildForm(nameForm, formDef);

    function buildForm(nameForm, arr) {
        var form = document.forms[nameForm];
        var formClone = form.cloneNode();

        var table = document.createElement("table");

        arr.forEach((element) => {
            var row = document.createElement("tr");
            var td = document.createElement("td");
            td.innerHTML = element.label;
            row.appendChild(td);
            td = document.createElement("td");
            var input = document.createElement("input");
            switch (element.kind) {
                case "longtext":
                case "middletext":
                case "number":
                case "shorttext":
                    input.setAttribute("type", "text");
                    input.setAttribute("name", element.name);
                    input.style.width = inputWidth[element.kind];
                    td.appendChild(input);
                    break;
                case "combo":
                    var select = document.createElement("select");
                    select.setAttribute("name", element.name);
                    select.style = "width: 204px; margin-left: 2px;";
                    for (var variant of element.variants) {
                        var option = document.createElement("option");
                        option.setAttribute("value", variant.value);
                        option.innerHTML = variant.text;
                        select.appendChild(option);
                    }
                    select.lastChild.setAttribute('selected', '');
                    td.appendChild(select);
                    break;
                case "radio":
                    for (var variant of element.variants) {
                        input = document.createElement("input");
                        input.setAttribute("type", "radio");
                        input.setAttribute("name", element.name);
                        input.setAttribute("value", variant.value);
                        var span = document.createElement("span");
                        span.innerHTML = variant.text;
                        span.style.cssText = "padding: 0px 10px 0px 0px";
                        td.appendChild(input);
                        td.appendChild(span);
                    }
                    break;
                case "check":
                    input.setAttribute("type", "checkbox");
                    input.setAttribute("name", element.name);
                    td.appendChild(input);
                    break;
                case "memo":
                    row.removeChild(row.lastChild);
                    td.setAttribute('colspan', '2');
                    td.innerHTML = element.label + "<br>";
                    var textarea = document.createElement("textarea");
                    textarea.setAttribute("name", element.name);
                    textarea.style.cssText = "width: 608px; height: 50px";
                    td.appendChild(textarea);
                    break;
                case "submit":
                    var value = element.label;
                    row.removeChild(row.lastChild);
                    input.setAttribute("type", "submit");
                    input.setAttribute("value", value.substring(0, value.length - 1))
                    td.appendChild(input);
            }
            row.appendChild(td);
            table.appendChild(row);
        });

        formClone.appendChild(table);

        document.body.replaceChild(formClone, form);
    }
})();
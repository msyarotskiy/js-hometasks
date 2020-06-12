'use strict';

const hashAjaxName = 'Yarotskiy_AJAXStorage_drinks_dishes';
let AjaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
let password;
let arrStorage = {};

function TAJAXStorage(storage) {
    arrStorage[storage] = {};
    let items = arrStorage[storage];

    function updateAjaxStorage(storageUpd) {
        password = Math.random();
        $.ajax(
            {
                url: AjaxHandlerScript,
                type: 'POST',
                data: {
                    f: 'LOCKGET', n: hashAjaxName,
                    p: password
                },
                cache: false,
                success: LockgetReady,
                error: ErrorHandler
            }
        );

        function LockgetReady(result) {
            if (result.error !== undefined)
                alert(result.error);
            else {
                $.ajax(
                    {
                        url: AjaxHandlerScript,
                        type: 'POST',
                        data: {
                            f: 'UPDATE', n: hashAjaxName,
                            v: JSON.stringify(storageUpd), p: password
                        },
                        cache: false,
                        success: UpdateReady,
                        error: ErrorHandler
                    }
                );
            }
        }

        function UpdateReady(ResultH) {
            if (ResultH.error != undefined)
                alert(ResultH.error);
        }

        function ErrorHandler(jqXHR, StatusStr, ErrorStr) {
            alert(StatusStr + ' ' + ErrorStr);
        }
    }

    this.addValue = function (key, value) {
        items[key] = value;
        updateAjaxStorage(storage);
    };

    this.getValue = function (askName) {
        return items[askName];
    };

    this.deleteValue = function (delName) {
        if (delName in items) {
            delete items[delName];
            updateAjaxStorage(storage);
            return true;
        } else {
            return false;
        }
    };

    this.getKeys = function () {
        return Object.keys(items);
    };

    this.Reset = function () {
        $.ajax(
            {
                url: AjaxHandlerScript,
                type: 'POST',
                data: {f: 'READ', n: hashAjaxName},
                cache: false,
                success: ReadReady,
                error: ErrorHandler
            }
        );

        function ReadReady(result) {
            let storageResult = {};
            if (result.error !== undefined) {
                alert(result.error);
            } else {
                if (result.result !== "") {
                    storageResult = JSON.parse(result.result);
                    for (let key in storageResult[storage]) {
                        items[key] = storageResult[storage][key];
                    }
                }
            }
        }

        function ErrorHandler(jqXHR, StatusStr, ErrorStr) {
            alert(StatusStr + ' ' + ErrorStr);
        }
    }
}
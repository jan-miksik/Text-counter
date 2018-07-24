"use strict";

var str = document.getElementById("textArea").value.toLowerCase().trim();
var words; // = str.split(/\s+/);
var amountOfWords;
var statistic = document.getElementById("statistic");
var wordsObj;
var showWords = document.getElementById("showWords");
var wordsArray = [];
var reverseMode;
var condition = "none";

getText();

$(document).on("change", "input[type=checkbox]", function() {
    reverseMode = $('[name="reverseMode"]:checked').val();
    sortMain();
});

$(document).on("change", "input[type=radio]", function() {
    condition = $('[name="condition"]:checked').val();
    /* var tier = $('[name="tier"]:checked').length > 0 ? $('[name="tier"]:checked').val() : "";
     var cap = $('[name="cap"]:checked').length > 0 ? $('[name="cap"]:checked').val() : ""; */

    sortMain();
});

function getText() {
    str = document.getElementById("textArea").value.toLowerCase().trim();
    words = str.split(/\s+/);
    wordsObj = {};
    // become objekts
    words.forEach(function(x) { wordsObj[x] = (wordsObj[x] || 0) + 1; });
    make2DimArrays();
    amountOfWords = words.length;
    statistic.innerHTML = "unikátních slov " + wordsArray.length + "<br>" + "slov: " + amountOfWords + "<br>" +
        "znaků včetně mezer: " + str.length + "<br><br>";
    sortMain();
}

function make2DimArrays() {
    wordsArray = [];
    for (var prop in wordsObj) {
        wordsArray.push([prop, wordsObj[prop]]);
    };
    return wordsArray;
}


function sortMain() {
    if (condition == "alphabet") {
        sortByAlphabet();
    } else if (condition == "by_length") {
        sortByLength();
    } else if (condition == "by_amount") {
        sortByAmount();
    } else if (condition == "none") {
        sortNone();
    }
}

function sortNone() {
    make2DimArrays();
    insert2DArrays();
}

function sortByLength() {
    wordsArray.sort((a, b) => b[0].length - a[0].length);
    insert2DArrays();
}

function sortByAlphabet() {
    wordsArray.sort((a, b) => a[0].localeCompare(b[0]));
    insert2DArrays();
}

function sortByAmount() {
    wordsArray.sort((a, b) => b[1] - a[1] || a[0].length - b[0].length || a[0].localeCompare(b[0]));
    insert2DArrays();
}


function insert2DArrays() {
    wordsArray = (reverseMode == "reverse") ? wordsArray.reverse() : wordsArray;

    var wordsToShow = "";
    for (var i = 0; i < wordsArray.length; i++) {

        wordsToShow += wordsArray[i][0] + ": " + wordsArray[i][1] + "<br>"
    }
    showWords.innerHTML = wordsToShow;
}


/*
        
        
        
        
       
        

        add function which dont count word when is just special symbol put down
        
        more option for conditions
        possible to upload document
        statistic for characters
        average length of word

        *version in Czech
        *make github for this
        *include this project to web
        *hover efects and text color
        *write some text about this project
        *set up show off/on css pure function for text
        *add function which dont count space between words as word
        * add text area (and button) for send text to js,
        * sort by length
        * sort alphabetical
        * count quantity of each word
        * and than sort this words by their numbers
        * add reverse option
        * count every symbols including space
        +-* longest word
*/
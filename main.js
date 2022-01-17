"use strict";

let resetSW = false;

$("#select").click(function() {
  $("#html").select();
});

$("#convert").click(function() {
  let checkSW = [false, true];
  let sourceText = document.getElementById("source").value;
  let result = "";

  // 傍点処理
  if (checkSW[1] === true) {
    let slicedWords = new Array();
    let i = 0;
    let startBranket = 0;
    let endBranket = 0;
    let emp = "";
    let temp = "";
    let deleter = "";
    startBranket = sourceText.indexOf("《《");
    endBranket = sourceText.indexOf("》》");
    
    console.log(startBranket);
    
    // 《《が冒頭に来る場合は「0」、存在しない場合は「-1」
    while (startBranket >= 0) {
      if (startBranket >= 0 && endBranket > startBranket) {
        result += sourceText.slice(0, startBranket);

        emp = sourceText.slice(startBranket + 2, endBranket);
        deleter = sourceText.slice(0, endBranket + 2);
        sourceText = sourceText.replace(deleter, "");

        for (let j = 0; j < emp.length; j++) {
          temp += "｜" + emp.slice(j, j + 1) + "《・》";
        }  

        result += temp;
        temp = "";
        startBranket = sourceText.indexOf("《《");
        endBranket = sourceText.indexOf("》》");

      } else {
        if (endBranket < startBranket) {
          alert("何か……間違ってます。");
        }
        break;
      }
    }

    result += sourceText;

    console.log("result:" + result);
    console.log("emp:" + emp);
    console.log("deleter:" + deleter);
    console.log("temp:" + temp);
    console.log("sourceText:" + sourceText);
    console.log("startBranket:" + startBranket);
    console.log("endBranket:" + endBranket);
  } else {
    let result = sourceText;
  }


  
  // ルビ処理
  if (checkSW[2] === true) {
    result = result.replace(/｜/g, "<ruby><rb>");
    result = result.replace(/\|/g, "<ruby><rb>");
    result = result.replace(/《/g, "</rb><rp>（</rp><rt>");
    result = result.replace(/》/g, "</rt><rp>）</rp></ruby>");
  }

  $("#html").val(result);

});

$("#reset").click(function() {
  // 値を設定
  $("#source").val("《《傍点を変換》》");
  $("#html").val("｜傍《・》｜点《・》｜を《・》｜変《・》｜換《・》");
});


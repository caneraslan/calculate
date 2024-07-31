document.addEventListener('keydown',function(event){
    let operators = ["+", "-", "*", "=", "/","c"];

    if(!isNaN(event.key) && event.key != ' ' ){
        //sayı işlemi direk ekrana yazacağız. 
        writeNumber(event.key);
    }else if(operators.includes(event.key)){
        //operator işlemi 
        writeNumber(event.key);
    }
    else{
        return "";
    }
    
})

nodeAdd = function (mainNode, nodeType, nodeID = "", value = "", onclickFunc = null) {
    let newNode = document.createElement(nodeType);
    if (nodeID != "") newNode.id = nodeID;
    if (onclickFunc != null) newNode.onclick = onclickFunc;
    if (value != "") newNode.value = value;
    if (nodeType == "button") newNode.innerText = value;
    mainNode.append(newNode);
    return newNode;
};

writeNumber = function (value) {
    let textLabel = document.querySelector("label[id='resultLabel']");
    let operators = ["+", "-", "*", "=", "/","c"];
    let allResult = document.getElementById("allRes");
    let isActive = document.getElementById("isActive");
    let oldProcess = document.getElementById("oldProcess")
    if(isActive.getAttribute("value") == "false" && operators.includes(value)){
        if(isNumber == 1 ){
            textLabel.innerText = "Lütfen bir değer giriniz.";
            return 0;
        }
        let oldValue = textLabel.innerText;
        isActive.setAttribute("value", "true")
            
        switch(value) {
            case '+':
                allResult.setAttribute("value", parseFloat(allResult.getAttribute("value")) + parseFloat(oldValue));
                oldProcess.innerText = "The operator of your choise is " + "plus(+)";
                break;
            case '-':
                allResult.setAttribute("value", parseFloat(allResult.getAttribute("value")) - parseFloat(oldValue));
                oldProcess.innerText = "The operator of your choise is " + "minus(-)";
                break;
            case '*':
                allResult.setAttribute("value", parseFloat(allResult.getAttribute("value")) * parseFloat(oldValue));
                oldProcess.innerText = "The operator of your choise is " + "Multiplication(*)";
                break;
            case '/':
                allResult.setAttribute("value", parseFloat(allResult.getAttribute("value")) / parseFloat(oldValue));
                oldProcess.innerText = "The operator of your choise is " + "Division(/)";
                break;
            case '=':
                allResult.setAttribute("value", parseFloat(allResult.getAttribute("value")));
                break;
            case 'c':
                let stringToNumber = (textLabel.innerText).toString();
                textLabel.innerText = parseInt(stringToNumber.slice(0, -1))
                isActive.setAttribute("value","false");
                return 0;
                break;
                
        }
        
        if(isActive.getAttribute("value") == "true" ){
            textLabel.innerText = allResult.getAttribute("value");
            allResult.innerText = "The result is " + allResult.getAttribute("value")
            
        }
        else{
            textLabel.innerText = allResult.getAttribute("value")
            allResult.innerText = "The result is " + allResult.getAttribute("value")
        }
    }else{

            if(isActive.getAttribute("value") == "true"){
                textLabel.innerText = "Lütfen bir değer giriniz.";
                isActive.setAttribute("value", "false")
                isNumber = 1;
            }
            
            if(isNaN(value)){
                textLabel.innerText = "Lütfen bir değer giriniz.";
                return 0;
            }

            if(isNaN(textLabel.innerText)) textLabel.innerText = "0";

            isNumber = 0;

            if(textLabel.innerText != "0" )
            textLabel.innerText =  textLabel.innerText + value;
            else    textLabel.innerText = value ;
    }

};

(function () {
    let row = -1;
    let column = 0;
    let operators = ["+", "-", "*", "=", "/", "c"];
    let values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    while (row < 3) {
        ++row; column = 0;
        let mainNode = document.querySelector("table#calculate");
        let newNode = nodeAdd(mainNode, "tr", row + "-" + column, "", "");

        while (column < 5) {
            if (row == 3 && (column > 0 && column < 4)) {
                if (column == 2 || column == 3) {
                    nodeAdd(newNode, "td", row + "-" + column, " ", "");
                } else {
                    let newNodeTD = nodeAdd(newNode, "td", row + "-" + column, "", "");
                    newNodeTD.setAttribute("colspan", "2");
                    newNodeTD.setAttribute("class", "button-container");
                    let value = operators.shift();
                    nodeAdd(newNodeTD, "button", value, value, () => writeNumber(value));
                    column = 3;
                }
            }

            if (column < 3) { // numbers 
                let newNodeTD = nodeAdd(newNode, "td", row + "-" + column, "", "");
                let value = values.shift();
                nodeAdd(newNodeTD, "button", value, value, () => writeNumber(value));
            }

            if (column == 4) { // operators 
                let newNodeTD = nodeAdd(newNode, "td", row + "-" + column, "", "");
                let value = operators.shift();
                nodeAdd(newNodeTD, "button", value, value, () => writeNumber(value));
            }
            column++;
        }
    }

})();
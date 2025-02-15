// // Basic Functions
// function add(a, b){
//     return a+b;
// }

// function subtract(a, b){
//     return a-b;
// }

// function multiply(a, b){
//     return a*b;
// }

// function divide(a, b){
//     return a/b;
// }

let a=0, b=0, selected_operator=false, expression = "";
let a_input = 0, operator_input = 0, b_inputing = 0;
function operate(a, b, selected_operator){
    switch (selected_operator){
        case 1: return a+b;
        case 2: return a-b;
        case 3: return a*b;
        case 4: return a/b;
    }
}


let nums = document.querySelectorAll(".num");
let display = document.querySelector(".display")
display.textContent = `${a}`;
for (let num of nums){
    num.addEventListener("click", () => {
        if (a_input === 0)
        {    
            if (!dotted)
                a = a*10 + Number(num.textContent);
            else 
                {
                    a = a + Number(num.textContent)/(Math.pow(10, dotted));
                    a = a.toFixed(dotted);
                    dotted++;
                }
            display.textContent = `${a}`;
            a = Number(a);
        }
        else if (operator_input===1){
            b_inputing = 1;
            if (!dotted)
                b = b*10 + Number(num.textContent);
            else {
                b = b + Number(num.textContent)/(Math.pow(10, dotted));
                b = b.toFixed(dotted);
                dotted++;
            }
            display.textContent = `${b}`;
            b = Number(b); // 为了规避输入30.0不显示的问题，先显示再转换
        }
    })
}


let ac = document.querySelector("#AC");
ac.addEventListener("click", ()=>{
    a=0; b=0; selected_operator = false;
    a_input = 0; operator_input = 0; b_inputing = 0;
    display.textContent = 0; dotted = 0;
})


let operators = document.querySelectorAll(".operator");
const operator_list = {
    "plus": 1,
    "subtract": 2,
    "multiply": 3,
    "divide": 4,
};
for (let operator of operators){
    operator.addEventListener("click", () => {
        if (b_inputing === 0)
        {
            a_input = 1; operator_input=1; dotted = 0;
            selected_operator = operator_list[operator.id];
        }
    })
}


let equal = document.querySelector("#equal");
equal.addEventListener("click", () => {
    if (a_input && operator_input && b_inputing)
    {
        a = operate(a, b, selected_operator);
        a = Number(a.toFixed(9)); // 一个巧妙的化简小数方法
        display.textContent = `${a}`;
        operator_input = 0;
        b_inputing = 0; b = 0; decimal1 = 0, decimal2 = 0;
        if (display.textContent.split("").includes(".")) // V0.1.1 修复可能出现两个小数点的错误
            dotted = 1;
    }
})


let dot = document.querySelector("#dot");
let dotted = 0, decimal1 = 0, decimal2 = 0;
dot.addEventListener("click", () => {
    if (dotted ===0)
    {
        dotted = 1;
        display.textContent = display.textContent + ".";
    }
})

let ce = document.querySelector("#ce");
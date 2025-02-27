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

let a=0, b=0, selected_operator=false;
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
let display = document.querySelector(".display");
let expression = document.querySelector(".expression");
display.textContent = `${a}`;
for (let num of nums){
    num.addEventListener("click", () => {
        // 修正逻辑，让它更像实例中的calculator
        if (a_input ===1 && operator_input===0)
        {
            expression.textContent = "";
            a= 0; a_input = 0; dotted = 0;
        }
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
            display.textContent = `${a}`; // 为了规避输入30.0不显示的问题，先显示再转换
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
    expression.textContent = "";
})


let operators = document.querySelectorAll(".operator");
const operator_list = {
    "plus": 1,
    "subtract": 2,
    "multiply": 3,
    "divide": 4,
};
const display_list = {
    "plus": "+",
    "subtract": "-",
    "multiply": "×",
    "divide": "÷",
};
for (let operator of operators){
    operator.addEventListener("click", () => {
        if (b_inputing === 0)
        {
            expression.textContent = `${a}`;
            a_input = 1; operator_input=1; dotted = 0;
            selected_operator = operator_list[operator.id];
            expression.textContent += `${display_list[operator.id]}`;
        }
    })
}


let equal = document.querySelector("#equal");
equal.addEventListener("click", () => {
    if (a_input && operator_input && b_inputing)
    {
        expression.textContent += `${b}`;
        a = operate(a, b, selected_operator);
        a = Number(a.toFixed(8)); // 一个巧妙的化简小数方法,这样子可以消掉结果中的多余0，同时避免由于计算机小数误差造成的错误
        display.textContent = `${a}`;
        operator_input = 0;
        b_inputing = 0; b = 0;
        if (display.textContent.split("").includes(".")) // V0.1.1 修复可能出现两个小数点的错误
            dotted = 1;
    }
})


let dot = document.querySelector("#dot");
let dotted = 0; // 这个变量同时用来记录是否有小数点 和小数位数，可以拆开
dot.addEventListener("click", () => {
    if (a_input ===1 && operator_input===0 || b_inputing===0 && operator_input===1) // 修复一个小bug：当结果计算完毕时，按下"."不应该有反应
    // 又修复一个bug: 当按下运算符，且b未开始输入时，不应按下小数点    
        return ;
    if (dotted ===0)
    {
        dotted = 1;
        display.textContent = display.textContent + ".";
    }
})

// 下面几个思路差不多，基本都是复制粘贴
let ce = document.querySelector("#CE");
ce.addEventListener("click", ()=>{
    if(a_input===0)
    {
        if (dotted ===1)
            dotted = 0;
        else if (!dotted)
            a=(a-a%10)/10;
        else
        {
            a = (a*Math.pow(10, dotted-1)-a*Math.pow(10, dotted-1)%10)/Math.pow(10, dotted-1);
            dotted--;
        }

        if(dotted>=1)
            display.textContent = `${a.toFixed(dotted-1)}`;
        else 
        display.textContent = `${a}`;

        if(dotted ===1)
            display.textContent = display.textContent + ".";
    }
    else if (b_inputing)
    {
        if (dotted ===1)
            dotted = 0;
        else if (!dotted)
            b=(b-b%10)/10;
        else
        {
            b = (b*Math.pow(10, dotted-1)-b*Math.pow(10, dotted-1)%10)/Math.pow(10, dotted-1);
            dotted--;
        }

        if(dotted>=1)
            display.textContent = `${b.toFixed(dotted-1)}`;
        else 
        display.textContent = `${b}`;

        display.textContent = `${b.toFixed(dotted-1)}`;
        if(dotted ===1)
            display.textContent = display.textContent + ".";
    }
})

let percent = document.querySelector("#percent");
percent.addEventListener("click", ()=>{
    if(a_input===0)
    {
        a=a/100; display.textContent = `${a}`;
    }
    else if (b_inputing)
    {
        b=b/100; display.textContent = `${b}`;
    }
})

let negate = document.querySelector("#negate");
negate.addEventListener("click", ()=>{
    if(a_input===0)
    {
        a=-a; display.textContent = `${a}`;
    }
    else if (b_inputing)
    {
        b=-b; display.textContent = `${b}`;
    }
})

// 加入键盘支持
const keyMap = {
    '0': 'n0',
    '1': 'n1',
    '2': 'n2',
    '3': 'n3',
    '4': 'n4',
    '5': 'n5',
    '6': 'n6',
    '7': 'n7',
    '8': 'n8',
    '9': 'n9',
    '.': 'dot',
    '+': 'plus',
    '-': 'subtract',
    '*': 'multiply',
    '/': 'divide',
    '%': 'percent',
    'Enter': 'equal',
    'Backspace': 'CE',
    'Escape': 'AC',
  };

document.addEventListener("keydown", (event) =>{
    const key = event.key;
    const buttonID = keyMap[key];

    if(buttonID)
    {
        const button = document.getElementById(buttonID);
        if (button)
        {
            button.click();
            button.classList.add("active");
        }
    }
})

document.addEventListener("keyup", (event) =>{
    const key = event.key;
    const buttonID = keyMap[key];

    if(buttonID)
    {
        const button = document.getElementById(buttonID);
        if (button)
        {
            button.classList.remove("active");
        }
    }
})
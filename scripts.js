const displayInput=document.getElementById('displayInput');
const displayOutput=document.getElementById('displayOutput');
const appendToDisplay=(input)=> {
    if(displayOutput.value=='undefined' || displayOutput.value=='NaN' || displayOutput.value=='Error') {
        displayInput.value=input;
        displayOutput.value='0';
    }
    else if(displayOutput.value!=0) {
        displayInput.value=displayOutput.value+input;
        displayOutput.value='0';
    }
    else
        displayInput.value+=input;
}
const deleteDisplay=()=> {
    const condition= displayInput.value.substring(displayInput.value.length-3, displayInput.value.length)==='MOD' || displayInput.value.substring(displayInput.value.length-3, displayInput.value.length)==='sin' || displayInput.value.substring(displayInput.value.length-3, displayInput.value.length)==='cos' || displayInput.value.substring(displayInput.value.length-3, displayInput.value.length)==='tan'
    if(condition)
        displayInput.value=displayInput.value.substring(0, displayInput.value.length-3);
    else
        displayInput.value=displayInput.value.substring(0, displayInput.value.length-1);
}
const clearDisplay=()=> {
    displayInput.value='';
    displayOutput.value='0';
}
const calculate=()=> {
    displayOutput.value=displayInput.value;
    try {
        if(displayOutput.value.includes('π')) {
            for(let i=0;i<displayOutput.value.length;i++) {
                if(displayOutput.value[i]==='π') {
                   displayOutput.value=displayOutput.value.substring(0, i)+Math.PI+displayOutput.value.substring(i+1);
                }
            }
        }
        if(displayOutput.value.includes('%')) {
            for(let i=0;i<displayOutput.value.length;i++) {
                if(displayOutput.value[i]==='%') {
                   displayOutput.value=displayOutput.value.substring(0, i)+'/100'+displayOutput.value.substring(i+1);
                }
            }
        }
        if(displayOutput.value.includes('!')) {
            for(let i=0;i<displayOutput.value.length;i++) {
                if(displayOutput.value[i]==='!') {
                    let j=i-1;
                    while(j>=0) {
                        if(displayOutput.value[j-1]>=0 && displayOutput.value[j-1]<=9)   j--;
                        else if(displayOutput.value[j-1]==='.')     displayOutput.value='Error';
                        else    break;
                    }
                    let n=Number.parseInt(displayOutput.value.substring(j,i));
                    let num=factorial(n);
                    displayOutput.value=displayOutput.value.substring(0, j)+num+displayOutput.value.substring(i+1);
                }
            }
        }
        if(displayOutput.value.includes('MOD')) {
            for(let i=0;i<displayOutput.value.length;i++) {
                if(displayOutput.value[i]==='M') {
                    let j=i-1;
                    let k=i+3;
                    while(j>=0) {
                        if(displayOutput.value[j-1]>=0 && displayOutput.value[j-1]<=9 || displayOutput.value[j-1]==='.')   j--;
                        else    break;
                    }
                    while(k<displayOutput.value.length) {
                        if(displayOutput.value[k+1]>=0 && displayOutput.value[k+1]<=9 || displayOutput.value[k+1]==='.')   k++;
                        else    break;
                    }
                    let m=Number(displayOutput.value.substring(j,i));
                    let n=Number(displayOutput.value.substring(i+3,k+1));
                    let num=m%n;
                    console.log(`${m} % ${n} = ${num}`)
                    displayOutput.value=displayOutput.value.substring(0, j)+num+displayOutput.value.substring(k+1);
                }
            }
        }
        if(displayOutput.value.includes('^')) {
            for(let i=0;i<displayOutput.value.length;i++) {
                if(displayOutput.value[i]==='^') {
                    displayOutput.value=displayOutput.value.substring(0, i)+'**'+displayOutput.value.substring(i+1);
                }
            }
        }
        if(displayOutput.value.includes('√')) {
            for(let i=0;i<displayOutput.value.length;i++) {
                if(displayOutput.value[i]==='√') {
                    let j=i+1;
                    if(displayOutput.value[i+1]==='(')    j++;
                    while(j<displayOutput.value.length) {
                        if(displayOutput.value[j+1]>=0 && displayOutput.value[j+1]<=9 || displayOutput.value[j+1]==='.')   j++;
                        else    break;
                    }
                    let n;
                    if(displayOutput.value[i+1]==='(')
                        n=Number(displayOutput.value.substring(i+2,j+1));
                    else
                        n=Number(displayOutput.value.substring(i+1,j+1));
                    let num=Math.sqrt(n);
                    if(displayOutput.value[j+1]===')')
                        displayOutput.value=displayOutput.value.substring(0, i)+num+displayOutput.value.substring(j+2);
                    else
                        displayOutput.value=displayOutput.value.substring(0, i)+num+displayOutput.value.substring(j+1);
                }
            }
        }
        if(displayOutput.value.includes('P')) {
            for(let i=0;i<displayOutput.value.length;i++) {
                if(displayOutput.value[i]==='P') {
                    let j=i-1;
                    let k=i+1;
                    while(j>=0) {
                        if(displayOutput.value[j-1]>=0 && displayOutput.value[j-1]<=9)   j--;
                        else if(displayOutput.value[j-1]==='.')     displayOutput.value='Error';
                        else    break;
                    }
                    while(k<displayOutput.value.length) {
                        if(displayOutput.value[k+1]>=0 && displayOutput.value[k+1]<=9)   k++;
                        else if(displayOutput.value[k+1]==='.')     displayOutput.value='Error';
                        else    break;
                    }
                    let n=Number.parseInt(displayOutput.value.substring(j,i));
                    let r=Number.parseInt(displayOutput.value.substring(i+1,k+1));
                    let num=factorial(n)/factorial(n-r);
                    displayOutput.value=displayOutput.value.substring(0, j)+num+displayOutput.value.substring(k+1);
                }
            }
        }
        if(displayOutput.value.includes('C')) {
            for(let i=0;i<displayOutput.value.length;i++) {
                if(displayOutput.value[i]==='C') {
                    let j=i-1;
                    let k=i+1;
                    while(j>=0) {
                        if(displayOutput.value[j-1]>=0 && displayOutput.value[j-1]<=9)   j--;
                        else if(displayOutput.value[j-1]==='.')     displayOutput.value='Error';
                        else    break;
                    }
                    while(k<displayOutput.value.length) {
                        if(displayOutput.value[k+1]>=0 && displayOutput.value[k+1]<=9)   k++;
                        else if(displayOutput.value[k+1]==='.')     displayOutput.value='Error';
                        else    break;
                    }
                    let n=Number.parseInt(displayOutput.value.substring(j,i));
                    let r=Number.parseInt(displayOutput.value.substring(i+1,k+1));
                    let num=factorial(n)/(factorial(r)*factorial(n-r));
                    displayOutput.value=displayOutput.value.substring(0, j)+num+displayOutput.value.substring(k+1);
                }
            }
        }
        if(displayOutput.value.includes('sin')) {
            for(let i=0;i<displayOutput.value.length;i++) {
                if(displayOutput.value[i]==='s') {
                    let j=i+3;
                    if(displayOutput.value[i+3]==='(')    j++;
                    while(j<displayOutput.value.length) {
                        if(displayOutput.value[j+1]>=0 && displayOutput.value[j+1]<=9 || displayOutput.value[j+1]==='.')   j++;
                        else    break;
                    }
                    let n;
                    if(displayOutput.value[i+1]==='(')
                        n=Number(displayOutput.value.substring(i+4,j+1));
                    else
                        n=Number(displayOutput.value.substring(i+3,j+1));
                    let num=Math.sin(n*(Math.PI/180));
                    if(displayOutput.value[j+1]===')')
                        displayOutput.value=displayOutput.value.substring(0, i)+num+displayOutput.value.substring(j+2);
                    else
                        displayOutput.value=displayOutput.value.substring(0, i)+num+displayOutput.value.substring(j+1);
                }
            }
        }
        if(displayOutput.value.includes('cos')) {
            for(let i=0;i<displayOutput.value.length;i++) {
                if(displayOutput.value[i]==='c') {
                    let j=i+3;
                    if(displayOutput.value[i+3]==='(')    j++;
                    while(j<displayOutput.value.length) {
                        if(displayOutput.value[j+1]>=0 && displayOutput.value[j+1]<=9 || displayOutput.value[j+1]==='.')   j++;
                        else    break;
                    }
                    let n;
                    if(displayOutput.value[i+1]==='(')
                        n=Number(displayOutput.value.substring(i+4,j+1));
                    else
                        n=Number(displayOutput.value.substring(i+3,j+1));
                    let num=Math.cos(n*(Math.PI/180));
                    if(displayOutput.value[j+1]===')')
                        displayOutput.value=displayOutput.value.substring(0, i)+num+displayOutput.value.substring(j+2);
                    else
                        displayOutput.value=displayOutput.value.substring(0, i)+num+displayOutput.value.substring(j+1);
                }
            }
        }
        if(displayOutput.value.includes('tan')) {
            for(let i=0;i<displayOutput.value.length;i++) {
                if(displayOutput.value[i]==='t') {
                    let j=i+3;
                    if(displayOutput.value[i+3]==='(')    j++;
                    while(j<displayOutput.value.length) {
                        if(displayOutput.value[j+1]>=0 && displayOutput.value[j+1]<=9 || displayOutput.value[j+1]==='.')   j++;
                        else    break;
                    }
                    let n;
                    if(displayOutput.value[i+1]==='(')
                        n=Number(displayOutput.value.substring(i+4,j+1));
                    else
                        n=Number(displayOutput.value.substring(i+3,j+1));
                    let num=Math.tan(n*(Math.PI/180));
                    if(displayOutput.value[j+1]===')')
                        displayOutput.value=displayOutput.value.substring(0, i)+num+displayOutput.value.substring(j+2);
                    else
                        displayOutput.value=displayOutput.value.substring(0, i)+num+displayOutput.value.substring(j+1);
                }
            }
        }
        displayOutput.value=eval(displayOutput.value);
    }
    catch(err) {
        console.error(err);
        displayOutput.value='Error';
    }
}
const factorial=(num)=> {
    if(num===0)
        return 1;
    else
        return num*factorial(num-1);
}
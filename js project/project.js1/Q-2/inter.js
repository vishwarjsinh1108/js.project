function calculateInterest(){
    let principal=Number(document.getElementById('principal').value);
    let rate=Number(document.getElementById('rate').value);
    let time=Number(document.getElementById('time').value);

    let interest=(principal*rate*time)/100;
    let totalamount=principal+interest;

    let ans=document.getElementById('result');
    ans.innerHTML=`after ${time} years, your investement will be worth <br> ${interest} with simple interest and <br> total amount is ${totalamount}`;
}
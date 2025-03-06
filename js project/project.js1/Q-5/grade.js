function add(){
    let maths =Number(document.getElementById("num1").value);
    let phy =Number(document.getElementById("num2").value);
    let chem =Number(document.getElementById("num3").value);
     
     let plus=document.getElementById("plus");
     let multi=maths+phy+chem;
     plus.innerText=multi;
     console.log(multi);

     let per=document.getElementById("per");
     let persantage=parseInt((multi/300)*100);
     per.innerText=`per=${persantage}%`

     let v1=document.getElementById("v1");
     if (persantage>90){
        v1.innerText="grade A";
     }else if (persantage>=80){
        v1.innerText="grade B";
     }else {
        v1.innerText="grade f";
     }

}
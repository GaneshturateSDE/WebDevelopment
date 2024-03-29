const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropselect=document.querySelectorAll(".selects select");
const btn=document.querySelector("form button");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let msg=document.getElementById("result");
for(let select of dropselect){
    for(currCode in countryList ){
        let option=document.createElement("option");
        option.innerText=currCode;
        option.value=currCode; 
        if(select.name==="from" && currCode==="USD"){
            option.selected="selected";
        }else if(select.name==="to" && currCode==="INR"){
            option.selected="selected";
        }
        select.append(option);
    }
    select.addEventListener("change",(evt)=>{
         updateFlag(evt.target);
         changeRate();
    });
} 
const updateFlag=(element)=>{
  let currCode=element.value;
  let countrCode=countryList[currCode];
  let newSrc=`https://flagsapi.com/${countrCode}/flat/32.png`;
  let img=element.parentElement.querySelector("img");
  img.src=newSrc;
}
btn.addEventListener("click",async (evt)=>{
evt.preventDefault();
changeRate();
});
window.addEventListener("load",()=>{
    changeRate();
});
const changeRate=async ()=>{
    let amount=document.querySelector("input");
let amtVal=amount.value;
if(amtVal==="" || amtVal<1){
    amtVal=1;
    amount.value=1;
}

const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
let response=await fetch(URL);
let data= await response.json();
let rate=data[toCurr.value.toLowerCase()];

let finalAmount=amtVal*rate;
msg.innerText=`${amtVal} ${fromCurr.value}=${finalAmount} ${toCurr.value}`;
}
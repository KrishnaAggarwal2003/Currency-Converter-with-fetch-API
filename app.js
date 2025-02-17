// const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json"

const dropdowns = document.querySelectorAll(".dropdown select");
const exchange_btn = document.querySelector("#exchange_button")

let fromCurr = document.querySelector(".from select")
let toCurr = document.querySelector(".to select")

let final_msg = document.querySelector(".msg")
let arrow = document.querySelector("i")

for (let select of dropdowns){
    for (curr_code in countryList){
        let newOptions = document.createElement("option")
        newOptions.innerText = curr_code
        newOptions.value = curr_code
        if (select.name === "from" && curr_code === "USD" || select.name === "to" && curr_code === "INR"){
            newOptions.selected = "selected"
        }
         select.append(newOptions)

    }

    select.addEventListener("change",()=>{
        let new_src = `https://flagsapi.com/${countryList[select.value]}/flat/64.png`
        let set_img = select.parentElement.querySelector("img")

        if (select.name === "from"){
            fromCurr.value = select.value
        }else{toCurr.value = select.value}
    
        if (set_img){
            set_img.src = new_src
        }
    })
}

exchange_btn.addEventListener("click",(evt)=>{
    evt.preventDefault()
    let amount_val = document.querySelector("#amt")
    if (amount_val.value === "" || Number (amount_val.value) < 0){
        amount_val.value = "0"
    }
    
    get_data(fromCurr.value,toCurr.value,amount_val.value)
})

async function get_data(fromCurr,toCurr,amount_val){
    const base_url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurr.toLowerCase()}.json`

    let promise = await fetch(base_url)
    let data = await promise.json()
    const final_ans = (Number(amount_val) * data[fromCurr.toLowerCase()][toCurr.toLowerCase()]).toFixed(4)

    final_msg.innerText = `Amount is :- ${final_ans}\n 1 ${fromCurr} = ${data[fromCurr.toLowerCase()][toCurr.toLowerCase()].toFixed(4)} ${toCurr}`
}

arrow.addEventListener("click", () => {
    
    let tempValue = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = tempValue;

    fromCurr.dispatchEvent(new Event("change")); // to be able to have change event when the values will swap
    toCurr.dispatchEvent(new Event("change"));
});

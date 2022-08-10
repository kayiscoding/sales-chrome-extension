let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete_btn")
const saveBtn = document.getElementById("save-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
localStorage.clear()
console.log(leadsFromLocalStorage)

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(leads)
}

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(leads)

})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

saveBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })

})

function render(leads){
    let listItems = ""
for (let i = 0; i < leads.length; i++){
    // listItems += "<li> <a target = '_blank' href='"+ myLeads[i] + "'>"+ myLeads[i] + "</a> </li>"
    listItems += `<li>
    <a target = '_blank' href='${leads[i]}'> ${leads[i]} </a> 
    </li>`
    console.log(listItems)
    // const list = document.createElement("li")
    // list.textContent = myLeads[i]
    // ulEl.append(list)
}

ulEl.innerHTML = listItems
}

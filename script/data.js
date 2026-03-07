const loading=(status)=>{
if(status==true){
    document.getElementById("loading").classList.remove("hidden")
    document.getElementById("sec").classList.add("hidden")
    
}
else{
     document.getElementById("sec").classList.remove("hidden")
    document.getElementById("loading").classList.add("hidden")
}
}
const countData=()=>{
    document.getElementById("count").innerText=`${count} Issues`
}
const deactive=()=>{
   const btn= document.querySelectorAll(".selbtn")
     btn.forEach(i=>{
        i.classList.remove("active")
     })
}
const loadAlldata=()=>{
       loading(true)
     deactive()
    document.getElementById("all").classList.add("active")
   
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res=>res.json())
    .then(i=>showData(i.data))
   
}
const loadOpenData=()=>{
    loading(true)
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res=>res.json())
    .then(i=>showOpenData(i.data))
    deactive()
    document.getElementById("open").classList.add("active")
}


let count=0;
const showData=(data)=>{
    count=0;
console.log(data);
const container=document.getElementById("card-container")
container.innerHTML=""
for(const i of data){
    count++;
    const card=document.createElement("div")
   
    
    card.innerHTML=`
     <div onclick="loadmodal(${i.id})" class="space-y-3 shadow-sm p-5 rounded-lg ">
            <div class="flex justify-between">
                <img id="topimg" src="./assets/Open-Status.png" alt="" class="topimg">
                <btn class="px-5 py-1 rounded-lg bg-[#FEECEC] text-[#EF4444] text-[12px] ">${i.priority}</btn>
            </div>
            <h1 class="font-semibold text-[14px] ">${i.title}</h1>
            <p class="text-[#64748B] text-[12px]">${i.description}</p>
            <div class="flex flex-wrap gap2 py-3 border-b border-b-[#E4E4E7]">
                <btn class="px-5 rounded-lg bg-[#FEECEC] text-[#EF4444] text-[12px]"><i class="fa-solid fa-bug"></i>  BUG</btn>
                <btn class="px-5 rounded-lg text-[#D97706] bg-[#FDE68A] text-[12px]"><i class="fa-solid fa-virus"></i> Help Wanter</btn>
            </div>
            <p class="text-[#64748B] text-[12px]">#${i.author}</p>
            <p class="text-[#64748B] text-[12px]">${i.createdAt}</p>

        </div>
    `
     if(i.status==='open'){
        card.style.borderTop="4px solid #00A96E";
        card.style.borderRadius="10px"
    
    }
    else{
        card.style.borderTop="4px solid #A855F7";
          card.style.borderRadius="10px"
          card.querySelector(".topimg").src="./assets/Closed- Status .png"
    }
    container.appendChild(card)
}
loading(false)
countData();

}

loadAlldata()
const loadmodal=(id)=>{
    console.log(id)
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then(res=>res.json())
    .then(i=>displaymodal(i.data))
}
const displaymodal=(data)=>{
document.getElementById("mod").innerHTML=`
<h1 class="font-bold text-2xl">${data.title}</h1>
    <div class="flex justify-between items-center">
        <button class="px-5 py-1 rounded-lg text-[#FEECEC] bg-[#00A96E] text-[12px] border-none ">opened</button>
        <p class="text-[#64748B] text-[12px]">Opened by Turky </p>
    </div>
    <div class="flex flex-wrap gap2 py-3 border-b border-b-[#E4E4E7]">
                <btn class="px-5 rounded-lg bg-[#FEECEC] text-[#EF4444] text-[12px]"><i class="fa-solid fa-bug"></i>  BUG</btn>
                <btn class="px-5 rounded-lg text-[#D97706] bg-[#FDE68A] text-[12px]"><i class="fa-solid fa-virus"></i> Help Wanter</btn>
            </div>
             <p class="text-[#64748B]">${data.description}</p>
             <div class="flex justify-between items-center">
                <div>
                    <p class="font-bold">Assignee:</p>
                    <p>Turky</p>
                </div>
                <div>
                    <p>priority</p>
                    <p><btn class="px-5 py-1 rounded-lg bg-[#FEECEC] text-[#EF4444] text-[12px] ">${data.priority}</btn></p>
                </div>
             </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-primary">Close</button>
      </form>
    </div>
`

document.getElementById("my_modal_1").showModal()
}
const showOpenData=(data)=>{
    count=0;
    const container=document.getElementById("card-container")
container.innerHTML=""
for(const i of data){
    if(i.status !== 'open') continue;
    count++;
    const card=document.createElement("div")
   
    
    card.innerHTML=`
     <div onclick="loadmodal(${i.id})" class="space-y-3 shadow-sm p-5 rounded-lg ">
            <div class="flex justify-between">
                <img id="topimg" src="./assets/Open-Status.png" alt="" class="topimg">
                <btn class="px-5 py-1 rounded-lg bg-[#FEECEC] text-[#EF4444] text-[12px] ">${i.priority}</btn>
            </div>
            <h1 class="font-semibold text-[14px] ">${i.title}</h1>
            <p class="text-[#64748B] text-[12px]">${i.description}</p>
            <div class="flex flex-wrap gap2 py-3 border-b border-b-[#E4E4E7]">
                <btn class="px-5 rounded-lg bg-[#FEECEC] text-[#EF4444] text-[12px]"><i class="fa-solid fa-bug"></i>  BUG</btn>
                <btn class="px-5 rounded-lg text-[#D97706] bg-[#FDE68A] text-[12px]"><i class="fa-solid fa-virus"></i> Help Wanter</btn>
            </div>
            <p class="text-[#64748B] text-[12px]">#${i.author}</p>
            <p class="text-[#64748B] text-[12px]">${i.createdAt}</p>

        </div>
    `
     card.style.borderTop="4px solid #00A96E";
        card.style.borderRadius="10px"
         container.appendChild(card)

    
    }
    
    countData();
    loading(false)
}
const loadCloseData=()=>{
    loading(true)
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res=>res.json())
    .then(i=>showCloseData(i.data))
    deactive()
    document.getElementById("close").classList.add("active")
}

const showCloseData=(data)=>{
    count=0;
    const container=document.getElementById("card-container")
container.innerHTML=""
for(const i of data){
    if(i.status == 'open') continue;
    count++;
    const card=document.createElement("div")
   
    
    card.innerHTML=`
     <div onclick="loadmodal(${i.id})" class="space-y-3 shadow-sm p-5 rounded-lg ">
            <div class="flex justify-between">
                <img id="topimg" src="./assets/Open-Status.png" alt="" class="topimg">
                <btn class="px-5 py-1 rounded-lg bg-[#FEECEC] text-[#EF4444] text-[12px] ">${i.priority}</btn>
            </div>
            <h1 class="font-semibold text-[14px] ">${i.title}</h1>
            <p class="text-[#64748B] text-[12px]">${i.description}</p>
            <div class="flex flex-wrap gap2 py-3 border-b border-b-[#E4E4E7]">
                <btn class="px-5 rounded-lg bg-[#FEECEC] text-[#EF4444] text-[12px]"><i class="fa-solid fa-bug"></i>  BUG</btn>
                <btn class="px-5 rounded-lg text-[#D97706] bg-[#FDE68A] text-[12px]"><i class="fa-solid fa-virus"></i> Help Wanter</btn>
            </div>
            <p class="text-[#64748B] text-[12px]">#${i.author}</p>
            <p class="text-[#64748B] text-[12px]">${i.createdAt}</p>

        </div>
    `
    card.style.borderTop="4px solid #A855F7";
        card.style.borderRadius="10px"
         container.appendChild(card)

    
    }
    
    countData();
    loading(false)
}

document.getElementById("searchbtn")
.addEventListener("click",()=>{
    const search=document.getElementById("searchbox").value 
    console.log(search);
    loading(true)
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${search}`)
    .then(res=>res.json())
    .then(i=>showData(i.data))
})

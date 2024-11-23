const btn = document.getElementById('btn');
var book = document.getElementById('bk');
var intro = document.getElementById('intro');
var result = document.getElementById('result');
const pop = document.getElementById('close');
var soc = document.getElementById('soc');
const bttn = document.getElementById('bttn');
const sbtn = document.getElementById('sbtn');
const search = document.getElementById('side');
const clear = document.getElementById('clear');


clear.onclick = function(){
    document.getElementById('serc').value="";
    result.innerHTML="";
    result.style.display = "none";

}

sbtn.onclick = function(){
    var ress = document.getElementById('result');
    const value = document.getElementById('serc').value.toLowerCase();
    ress.innerHTML="";
    ress.style.display="block";

    
        fetch("./travel.json")
        .then(response=>response.json())
        .then(data=>{

            if(["temple","temples"].includes(value)){
                ress.innerHTML="";
                for(const temp of data.temples){
                    
                    ress.innerHTML+=
                    `<div style="border:1px solid black;margin:10px;border-radius:10px;background-color:white;">
                        <img src="${temp.imageUrl}" style="width:400px;height:auto"></img>
                        <p>${temp.name}</p>
                        <b>${temp.name.split(',')[0]} is</b>
                        <p>${temp.description}</p>
                    </div>`;
                }

            }
            else if(["beach","beaches"].includes(value)){
                ress.innerHTML="";
                for(const beach of data.beaches){
                    
                    ress.innerHTML+=
                    `<div style="border:1px solid black;margin:10px;border-radius:10px;background-color:white;">
                        <img src="${beach.imageUrl}" style="width:400px;height:auto"></img>
                        <p>${beach.name}</p>
                        <b>${beach.name.split(',')[0]} is</b>
                        <p>${beach.description}</p>
                    </div>`;
                }
            }
            else{
                const res = data.countries.find(a=>a.name.toLowerCase()===value);
                console.log("1");

                if(res){
                    ress.innerHTML = `welcome to ${res.name}<br/>`;
                     for(const city of res.cities){
                        ress.innerHTML += 
                        `<div style=" border: 3px solid rgb(0, 0, 0); margin:10px; border-radius:10px;background-color:white;">
                        <img src='${city.imageUrl}'style="width: 400px; height: auto;" alt='${city.name}'>
                            <p> ${city.name}</p>
                             <b>${city.name.split(',')[0]} is:</b><br>
                            ${city.description}</p>
                        </div>`;
                     }
                    }
                    else{
                        data.countries.forEach(country=>{
                     console.log("2");
                      country.cities.forEach(city=>{
                        
                         const ci =city.name.split(',')[0].toLowerCase();
                         console.log(ci);
                         if(ci === value){
                             console.log(ci===value);
                             
                             ress.innerHTML = 
                             `<div style=" border: 3px solid rgb(0, 0, 0); margin:10px; border-radius:10px;background-color:white;">
                         <img src='${city.imageUrl}'style="width: 400px; height: auto;" alt='${city.name}'>
                             <p>You entered ${ci} of </p>
                             <b>${city.name.split(',')[0]} :</b><br>
                             ${city.description}</p>
                         </div>`;
                         }
                        });
                     });
                 }

                }
    })
    .catch(
         
                ress.innerHTML =`<img src='./image/404.png' style='width:400px;height:auto;'>`
    )
}


bttn.addEventListener('click',function(){
    const booked = document.getElementById('b');
    booked.style.display="block";
    [intro,btn,soc,book,search].forEach(a=>a.style.display="none");
    booked.innerHTML =`<h1>Thank You</h1><p>Your details have been successfully added. Our travel agent will get in touch with you shortly </p>
     <button><a href="index.html">Back</a></button>`;
})

pop.onclick = function(){
    book.style.display="none";
    intro.style.display="block";
    btn.style.display="block";
    soc.style.display="block";
    search.style.display="block";
    result.style.display="block";
}

btn.addEventListener('click',function(){
    book.style.display="flex";
    [intro,result,btn,soc,search].forEach(a=>a.style.display="none");

})



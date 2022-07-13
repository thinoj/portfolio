

document.getElementById("name").addEventListener("click" , ()=>{
    location.href = "https://www.linkedin.com/in/thinoj/";
    console.log("hlo")
})

document.querySelector(".icon").addEventListener("click", ()=>{
    if(document.getElementById("overlay-menu").style.display=="none"){
        document.getElementById("overlay-menu").style.display="grid";
        document.querySelector(".icon").setAttribute("src" , "./images/cross.png")
        try{
        document.getElementById("scroll").style.color = "transparent";
        }catch(e){
        console.log(e);
        }    
    }else{
        document.getElementById("overlay-menu").style.display="none"
        
        document.querySelector(".icon").setAttribute("src" , "./images/menu-burger.png");
        try{
        document.getElementById("scroll").style.color = "#51ff0d";
        }catch(e){
            console.log(e);
        }

    }

})
let menu = document.querySelector("#menu");
let aside = document.querySelector("#aside");
let aside_backdrop = document.querySelector("#aside-backdrop");
let menumenu = document.querySelector("#menu");

menu.onclick = function(){
    aside.classList.add("active");
};
menumenu.onclick = function(){
    aside.classList.add("active");
};
aside_backdrop.onclick = function(){
    aside.classList.remove("active");
}
const scrollbar = document.getElementById('scrollbar');
const scrollItem = document.getElementById('scrollItem');

let windowHeight = window.innerHeight;
let contentHeight = Math.max(document.body.scrollHeight);
let scrollItemLenght = Math.ceil(windowHeight * windowHeight/contentHeight);

scrollInit();

function scrollInit(){
    windowHeight = window.innerHeight;
    contentHeight = Math.max(document.body.scrollHeight);
    scrollItemLenght = Math.ceil(windowHeight * windowHeight/contentHeight);
    setScrollItemlenght();
}

function getScrollItemHeight(){
    let windowHeight = window.innerHeight;
    let contentHeight = Math.max(document.body.scrollHeight);
    return Math.ceil(windowHeight * windowHeight/contentHeight)
}

function setScrollItemlenght(){
    scrollItem.style.height = getScrollItemHeight() + "px";
}

function checkBody(e){
    let scrollheight = parseInt((e.deltaY > 0) ? parseInt(document.body.style.top) - Math.abs(e.deltaY) : parseInt(document.body.style.top) + Math.abs(e.deltaY)) || 0;


    let bodyOffset = parseInt(document.body.style.top) || 0;
    let scrolled = (e.deltaY > 0) ? bodyOffset - Math.abs(e.deltaY) : bodyOffset + Math.abs(e.deltaY);

    if(scrollheight >= 0 && e.deltaY < 0){
        document.body.style.top = "0px";
        scrollItem.style.top = "0%";
        return false;
    }
    let scrollWithWindowHeight = Math.abs(scrollheight) + window.innerHeight;

    if(scrollWithWindowHeight >= contentHeight + 54){
        document.body.style.top = -contentHeight + windowHeight - 54 + 'px';
        moveScrollBar(scrolled);
        return false;
    }

    return true
}

function moveScrollBar(scrolled){

    let scrolledHeight = Math.ceil(((Math.abs(scrolled)) / contentHeight) * 100);
    scrollItem.style.top = scrolledHeight + "%";
}

function scroll(e){
    if(!checkBody(e))return false
    let bodyOffset = parseInt(document.body.style.top) || 0;
    let scrolled = (e.deltaY > 0) ? bodyOffset - Math.abs(e.deltaY) : bodyOffset + Math.abs(e.deltaY);
    document.body.style.top = (e.deltaY > 0) ? bodyOffset - Math.abs(e.deltaY) + "px" : bodyOffset + Math.abs(e.deltaY) + "px";
    moveScrollBar(scrolled);
}


window.onresize = function(){
    scrollInit();
}

document.body.addEventListener('click',function(){
    scrollInit();
})

document.body.addEventListener('wheel',function (e) {
    if(windowHeight >= contentHeight)return false
    scroll(e)
})

let scrollItemDown = false;
let clickCoordY = 0;

console.log(window.innerHeight);

document.body.onmousemove = function(e){

    if(scrollItemDown){


        let scrollItemTop = Math.abs((parseFloat(scrollItem.style.top))/100) * window.innerHeight || 0;
        let between = clickCoordY - scrollItemTop;
        let r = e.y - clickCoordY

        let resTop = ((e.y - between + r) / window.innerHeight) * 100;
        let resbottom = ((e.y - between + r  + 60) / window.innerHeight) * 100;

        if(parseFloat(scrollItem.style.top) <= 0.5 && e.y - clickCoordY < 0) {
            scrollItem.style.top = '0%';
            document.body.style.top = -resbottom + "%";
            return;
        }

        if(scrollItemTop + parseFloat(scrollItem.style.height) >=  window.innerHeight && e.y - clickCoordY > 0){
            scrollItem.style.bottom = '0%';
            document.body.style.top = -resbottom + "%";
            return;
        }



        clickCoordY = e.y
        scrollItem.style.top = ((e.y - between + r) / window.innerHeight) * 100  + '%';
        document.body.style.top = -resbottom + "%";


    }

}


document.body.onmouseup = function(e){
    scrollItemDown = false;
}

scrollItem.onmousedown = function(e){
    e.preventDefault()
    scrollItemDown = true;
    clickCoordY = e.y;
}
const quoteMessgae = document.getElementById('quote')
const backImage = document.getElementById("panel")
const textPanel = document.getElementById('textPanel')
const progressBar = document.getElementById('progressBar')
const nextButton = document.getElementById("nextButton")
const settingCanva = document.getElementById("offcanvasBottom")
const marvelButton = document.getElementById("marBtn")
const relButton = document.getElementById("relBtn")


const quoteType = localStorage.getItem('quoteType')
if(quoteType){
    $(document).ready(function (){
        if (quoteType == 'marvel'){
            marvelButton.setAttribute("disabled", "disabled");
            marvelButton.style = "opacity:0.4";
        }
        else{
            relButton.setAttribute("disabled", "disabled");
            relButton.style = "opacity:0.4";
        
        }
    })
    
    fetch(`./wallpaper/${quoteType}/quotes.json`)
    .then(response => {
    return response.json();
    })
    .then(data=> {
        getQuoteData(data, dataType = quoteType);
    });

    }
else
    settingCanva.setAttribute("class","offcanvas offcanvas-bottom show");

$("button").click(function(){
    var clickedBtn = $(this).val();
    localStorage.setItem('quoteType', clickedBtn);
    window.location.reload();
})
    

function getQuoteData(data, dataType){
    data[dataType] = data;
    generateData(data, dataType)
}

function generateData(quotesData, dataType){
    let randomNum = Math.floor(Math.random() * Object.keys(quotesData[dataType]).length);
    let data = quotesData[dataType][`qu${randomNum || 1}`];
    backImage.style.fontFamily = 'Permanent Marker';
    setTimeout(writeToCanva, 2000, data, dataType);
}

function writeToCanva(imageArrayData, dataType){
    backImage.style.backgroundImage = `url('./wallpaper/${dataType}/${imageArrayData[0]}')`;
    quoteMessgae.innerText = imageArrayData[1];
    let canvaHeight = getComputedStyle(document.getElementById("textPanel")).height
    canvaHeight = parseInt(canvaHeight.substring(0,3))
    console.log(canvaHeight)
    if (canvaHeight > 380 && canvaHeight < 550){
        quoteMessgae.style.fontSize = '2rem';
    }
    else if (canvaHeight >= 550){
        quoteMessgae.style.fontSize = '1.88rem';
    }
    startInterval(0)
}

function startInterval(upto = 0)
{
  let counts=setInterval(updated);
        function updated(){
            progressBar.style.width= `${parseInt((++upto)) / 37}%`;
            if(upto==150)
            {
                textPanel.style.opacity = 1
            }
            if(upto == 2300){
                nextButton.style.display = 'block';
            }
            if(upto==4000 &&  !settingCanva.classList.contains('show'))
            {
                clearInterval(counts);
                window.location.reload();
            }
        }
}
const quoteMessgae = document.getElementById('quote');
const backImage = document.getElementById("panel");
const textPanel = document.getElementById('textPanel');
const progressBar = document.getElementById('progressBar');
const nextButton = document.getElementById("nextButton");
const settingCanva = document.getElementById("offcanvasBottom");
const allButtons = document.querySelectorAll('.btn-lg');

const quoteType = localStorage.getItem('quoteType')
if(quoteType){
    $(document).ready(function (){

        [...allButtons].map((btn) => {
            if(btn.value === quoteType){
                btn.setAttribute("disabled", "disabled");
                btn.style = "opacity:0.4";
            }
        })
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
    setTimeout(writeToCanva, 1500, data, dataType);
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
    else if (canvaHeight >= 550 && canvaHeight < 800){
        quoteMessgae.style.fontSize = '1.88rem';
    }
    else if (canvaHeight >= 800){
        quoteMessgae.style.fontSize = '1.8rem';
    }
    setTimeout(startInterval, 1200);
    
}

function startInterval()
{
  let counts=setInterval(updated);
  let upto = 0;
  backImage.style.opacity = 1;
        function updated(){
            progressBar.style.width= `${parseInt((++upto)) / 37}%`;
            if(upto == 350)
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
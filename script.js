let quotesData = {};
const quoteMessgae = document.getElementById('quote')
const backImage = document.getElementById("panel")
const textPanel = document.getElementById('textPanel')
const progressBar = document.getElementById('progressBar')
const nextButton = document.getElementById("nextButton")

fetch("./wallpaper/relationship/quotes.json")
    .then(response => {
    return response.json();
    })
    .then(data=> {
        getRelData(data)
    });

function getRelData(data){
    quotesData['rel'] = data;
    generateData(quotesData)
}


function generateData(quotesData){
    let randomNum = Math.floor(Math.random() * (61 - 0 + 1) + 0);
    let data = quotesData['rel'][`qu${randomNum}`];
    backImage.style.fontFamily = 'Permanent Marker';
    setTimeout(writeToCanva, 2000, data);  
}

function writeToCanva(imageArrayData){
    backImage.style.backgroundImage = `url('./wallpaper/relationship/${imageArrayData[0]}')`;
    quoteMessgae.innerText = imageArrayData[1];
    let lengthQuote = quoteMessgae.innerText.length;
    if (lengthQuote > 60){
        quoteMessgae.style.fontSize = '1.87rem';
    }
    textPanel.style.display = 'block';
    startInterval()
}

function startInterval()
{
  let counts=setInterval(updated);
        let upto=0;
        function updated(){
            progressBar.style.width= `${parseInt((++upto)) / 28}%`;
            if(upto==3000)
            {
                clearInterval(counts);
                nextButton.style.display = 'block';
            }
        }
}
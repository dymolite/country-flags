const start = document.getElementById('start');
const stop = document.getElementById('stop');
const image = document.getElementById('image');
const input = document.getElementById('input');
const time = document.getElementById('time');
const check = document.getElementById('check');
const flagCount = document.querySelector('.flag-count');
const rightFlagNames = document.querySelector('.right-flag-names');

let flagData = [];
let remTime = 30;
let timer;
let count = 0;
let countRights = 0;

fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => {
        flagData = data;
        gameStart();
        gameEnd();
});

function gameStart() {
    start.addEventListener('click', e => {
        addFlag();
        start.parentElement.remove();
        input.parentElement.style = "display: block;";
        flagCount.parentElement.parentElement.style = "display: block;"
    })
}
function gameEnd() {
    stop.addEventListener('click', function(){
        clearInterval(timer);
        console.log(timer);
        remTime = 0;
        console.log(remTime);
        check.parentElement.parentElement.parentElement.remove()
    })
}
function addFlag() {
    let randomInd = Math.floor(Math.random() * flagData.length);
    let country = flagData[randomInd];
    flagName = country.name.common;
    flagNameTur = country.translations.tur.common;

    image.src = country.flags.png;
    time.innerHTML = "00:" + remTime;
    count++;
    flagCount.innerHTML = "Umumi bayraqların sayı: " + count;
    getTimer();
    checkInput();
}

function checkInput() {
    check.addEventListener('click', e => {
        console.log(flagName);

        if (input.value.toLowerCase() == flagName.toLowerCase() || input.value.toLowerCase() == flagNameTur.toLowerCase()) {
            showSuccess();
            clearInterval(timer);
            remTime = 30;
            addFlag();
            countRights++;
            rightFlagNames.innerHTML = "Düzgün tapılmışlar: " + countRights;
        } else {
            showFail();
        }

        input.value = '';
    });
}

function getTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        remTime--;
        if (remTime <= 0) {
            clearInterval(timer);
            remTime = 30;
            showFail();
            addFlag();
        }
        time.innerHTML = "00:" + remTime.toString().padStart(2, '0');
    }, 1000);
}

function showFail() {
    Command: toastr["error"]("Duz deyil, belke daha yaxsi dusunesiniz?")

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-full-width",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "500",
        "timeOut": "2500",
        "extendedTimeOut": "700",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
}

function showSuccess() {
    Command: toastr["success"]("Duzdur, tebrikler!")

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-full-width",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "500",
        "timeOut": "2500",
        "extendedTimeOut": "700",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
}

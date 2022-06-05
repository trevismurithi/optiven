
const submit = document.querySelector('#submit')
const months = document.querySelector('#months')
const locations = document.querySelector('#places')
const depositInput = document.querySelector('#deposit')
const resultDiv = document.querySelector('.result_div')
//identify fixed values
let isFixed = false
//attach the places with values
const places = [
    {
        name: 'Amani Ridge, Kiambu',
        value: 7260000,
        min: 2178000,
        period:12,
        fixedPeriod: null 
    },
    {
        name: 'South Lake Villas, Naivasha',
        value: 5995000,
        min:1798500,
        period: 12,
        fixedPeriod: null 
    },
    {
        name: 'Success Gardens, Gatanga Rd',
        value: 2695000,
        min: 700000,
        period: 12,
        fixedPeriod: null 
    },
    {
        name: 'Victory Gardens Kitengela',
        value: 2495000,
        min: 700000,
        period: 12,
        fixedPeriod: null
    },
    {
        name: 'Happy Gardens Kitengela',
        value: 1795000,
        min: 538500,
        period: 12,
        fixedPeriod: null
    },
    {
        name: 'Garden of Joy Kangundo Rd',
        value: 1495000,
        min: 500000,
        period: 12,
        fixedPeriod: null
    },
    {
        name: 'Shalom Gardens Phase 2 Kantafu',
        value: 1295000,
        min: 388500,
        period: 6,
        fixedPeriod: null
    },
    {
        name: 'Abundance Gardens, Konza',
        value: 995000,
        min: 497500,
        period: 6,
        fixedPeriod: null
    },
    {
        name: 'Celebration Gardens, Kitengela',
        value: 129500,
        min: 388500,
        period: 12,
        fixedPeriod: null
    },
    {
        name: 'Heshima Commercial Plots, Kajiado',
        value: 899000,
        min: 449500,
        period: 0,
        fixedPeriod: [6,12],
        projection: {
            6:{
                value: 950000
            },
            12:{
                value: 1150000
            }
        }
    },
    {
        name: 'Love Gardens, Kajiado',
        value: 795000,
        min: 238500,
        period: 0,
        fixedPeriod: [6],
        projection: {
            6: {
                value: 995000
            },
        }
    },
    {
        name: 'Peace Breeze Gardens, Konza',
        value: 695000,
        min: 200000,
        period: 0,
        fixedPeriod: [3,6],
        projection: {
            3: {
                value: 725000
            },
            6: {
                value: 755000
            }
        }
    },
    {
        name: 'Malindi Breeze, Phase 2',
        value: 499000,
        min: 250000,
        period: 0,
        fixedPeriod: [3, 6],
        projection: {
            3: {
                value: 529000
            },
            6: {
                value: 559000
            },
        }
    },
    {
        name: 'Wema Gardens, Naro Moru',
        value: 399000,
        min: 200000,
        period: 0,
        fixedPeriod: [3, 6, 12],
        projection: {
            3: {
                value: 415000
            },
            6: {
                value: 425000
            },
            12: {
                value: 450000
            }
        }
    },
    {
        name: 'Great Oasis Gardens, Nanyuki',
        value: 349000,
        min: 200000,
        period: 0,
        fixedPeriod: [3, 6, 12],
        projection: {
            3: {
                value: 359000
            },
            6: {
                value: 369000
            },
            12: {
                value: 399000
            }
        }
    },
]

//set the location
let locationArea = places[0]
depositInput.setAttribute('min', locationArea.min)

function createAllMonths(){
    //create a for loop for the months
    for (var i = 0; i < 12; i++) {
        //append months 
        let month = document.createElement('option')
        month.setAttribute('id', i+1)
        month.innerText = `${i + 1}`    
        month.value = `${i + 1}`
        months.appendChild(month)
    }
}

function showAllMonths() {
    months.value = 1
    for (let index = 1; index <= months.children.length; index++) {
        months.children[index - 1].classList.remove('hide')
        months.children[index - 1].classList.add('show')
    }  
}

function restrictedMonths(monthArray){
    months.value = monthArray[0]
    for (let index = 1; index <= months.children.length; index++) {
        months.children[index - 1].classList.remove('hide')
        months.children[index - 1].classList.remove('show')
        if(monthArray.find((n)=> index === n))
            months.children[index - 1].classList.add('show')
        else
            months.children[index - 1].classList.add('hide')
    }
}

places.forEach(place => {
    //append places
    let area = document.createElement('option')
    area.innerText = place.name
    area.value = place.name
    locations.appendChild(area)
})

//change event listener for dropdown
locations.addEventListener('change', (e) => {
    places.forEach(place => {
        if(place.name === locations.value) {
            locationArea = place
            //set minimum value for deposit
            depositInput.setAttribute('min', place.min)
            if(place.fixedPeriod === null){
                //calling the restrict
                showAllMonths()
            }else{
                restrictedMonths(place.fixedPeriod)
            }
        }
    })
})


let totalAmount = 0
let installment = 0
let totalPurchase = 0
//append respective values
let totalAmountP = document.createElement('p')
let totalPurchaseP = document.createElement('p')
let installmentP = document.createElement('p')

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const errorMessage = document.querySelector('.error_class')
const errorMessageOverall = document.querySelector('.error_class_form')

//installment function formulae
function monthFormulaeMethod() {
    let balance = parseInt(locationArea.value) - parseInt(depositInput.value)
    let monthVal = parseInt(months.value)
    totalAmount = Math.round((1.0 + (monthVal / 100)) * balance)
    installment = Math.round(totalAmount / monthVal)
    totalPurchase = totalAmount + parseInt(depositInput.value)
}
function fixedMonthMethod() {
    let monthVal = parseInt(months.value)
    let balance = locationArea.projection[monthVal].value - parseInt(depositInput.value)
    installment = Math.round(balance / monthVal)
}
//fixed function formulae
function fixedFormulaeMethod() {
    fixedMonthMethod()
    //hide the totalAmountP and totalPurchaseP
    totalAmountP.classList.add('hide')
    totalPurchaseP.classList.add('hide')
    //display information
    installmentP.innerHTML = `Your Installment is: Ksh ${numberWithCommas(installment)}`
}

function unfixedFormulaeMethod() {
    monthFormulaeMethod()
    // part 1
    totalAmountP.classList.remove('hide')
    totalAmountP.innerHTML = `Total Amount is: Ksh ${numberWithCommas(totalAmount)}`
    // part 2
    totalPurchaseP.classList.remove('hide')
    totalPurchaseP.innerHTML = `Total Purchase is: Ksh ${numberWithCommas(totalPurchase)}`
    // part 3
    installmentP.classList.remove('hide')
    installmentP.innerHTML = `Your installment is: Ksh ${numberWithCommas(installment)}`
}
submit.addEventListener('click', (e)=>{
    e.preventDefault()
    if (!!depositInput.value) {
        errorMessageOverall.classList.remove('show')
        errorMessageOverall.classList.add('hide')
        if (depositInput.value >= locationArea.min && depositInput.value < locationArea.value+1) {
            //remove error message display
            errorMessage.classList.remove('show')
            errorMessage.classList.add('hide')
            if(locationArea.fixedPeriod === null)
                unfixedFormulaeMethod()
            else
                fixedFormulaeMethod()
        } else {
            errorMessage.innerHTML = `amount should be in the range ${numberWithCommas(locationArea.min)} - ${numberWithCommas(locationArea.value)}`
            errorMessage.classList.add('show')
        }
    }else{
        errorMessageOverall.innerHTML = "please fill all fields"
        errorMessageOverall.classList.add('show')
    }
})

//create the default list
createAllMonths()
resultDiv.appendChild(totalAmountP)
resultDiv.appendChild(totalPurchaseP)
resultDiv.appendChild(installmentP)
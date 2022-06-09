const locations = document.querySelector('#__places')
if (!locations) {
    const project_name = document.querySelector('#__object_type')
    const index = parseInt(project_name.value)
    const submit = document.querySelector('#__submit')
    const months = document.querySelector('#__months')
    const depositInput = document.querySelector('#__deposit')
    const resultDiv = document.querySelector('.result_div')
    //identify fixed values
    let isFixed = false
    //attach the places with values
    const places = [
        {
            name: 'Amani Ridge, Kiambu',
            size: '1/8',
            value: 7260000,
            min: 2178000,
            period: 12,
            fixedPeriod: null
        },
        {
            name: 'South Lake Villas, Naivasha',
            size: '1/4',
            value: 5995000,
            min: 1798500,
            period: 12,
            fixedPeriod: null
        },
        {
            name: 'Success Gardens, Gatanga Rd',
            size: '1/8',
            value: 2695000,
            min: 700000,
            period: 12,
            fixedPeriod: null
        },
        {
            name: 'Victory Gardens Kitengela',
            size: '1/8',
            value: 2495000,
            min: 700000,
            period: 12,
            fixedPeriod: null
        },
        {
            name: 'Happy Gardens Kitengela',
            size: '1/8',
            value: 1795000,
            min: 538500,
            period: 12,
            fixedPeriod: null
        },
        {
            name: 'Garden of Joy Kangundo Rd',
            size: '1/8',
            value: 1495000,
            min: 500000,
            period: 12,
            fixedPeriod: null
        },
        {
            name: 'Shalom Gardens Phase 2 Kantafu',
            size: '1/8',
            value: 1295000,
            min: 388500,
            period: 6,
            fixedPeriod: null
        },
        {
            name: 'Abundance Gardens, Konza',
            size: '1/8',
            value: 995000,
            min: 497500,
            period: 6,
            fixedPeriod: null
        },
        {
            name: 'Celebration Gardens, Kitengela',
            size: '1/8',
            value: 1295000,
            min: 388500,
            period: 12,
            fixedPeriod: null
        },
        {
            name: 'Heshima Commercial Plots, Kajiado',
            size: '1/8',
            value: 899000,
            min: 449500,
            period: 0,
            fixedPeriod: [6, 12],
            projection: {
                6: {
                    value: 950000
                },
                12: {
                    value: 1150000
                }
            }
        },
        {
            name: 'Love Gardens, Kajiado',
            size: '1/8',
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
            size: '1/8',
            value: 695000,
            min: 200000,
            period: 0,
            fixedPeriod: [3, 6],
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
            size: '1/8',
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
            size: '1/8',
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
            size: '1/8',
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
    let locationArea = places[index]
    project_name.innerHTML = `<span class="__span">Project of Interest:</span> ${locationArea.name}`
    depositInput.setAttribute('min', locationArea.min)

    function createAllMonths() {
        //create a for loop for the months
        for (var i = 0; i < 12; i++) {
            //append months 
            let month = document.createElement('option')
            month.setAttribute('id', i + 1)
            month.innerText = `${i + 1}`
            month.value = `${i + 1}`
            months.appendChild(month)
        }
    }

    function showAllMonths(cNodesLength) {
        months.value = 1
        for (let index = 1; index <= months.children.length; index++) {
            if (cNodesLength >= index) {
                months.children[index - 1].classList.remove('hide')
                months.children[index - 1].classList.add('show')
            } else {
                months.children[index - 1].classList.remove('show')
                months.children[index - 1].classList.add('hide')
            }
        }
    }

    function restrictedMonths(monthArray) {
        months.value = monthArray[0]
        for (let index = 1; index <= months.children.length; index++) {
            months.children[index - 1].classList.remove('hide')
            months.children[index - 1].classList.remove('show')
            if (monthArray.find((n) => index === n))
                months.children[index - 1].classList.add('show')
            else
                months.children[index - 1].classList.add('hide')
        }
    }

    let totalAmount = 0
    let installment = 0
    let totalPurchase = 0
    //append respective values
    let installmentP = document.createElement('p')
    let depositP = document.createElement('p')
    let paymentP = document.createElement('p')
    let plotSizeP = document.createElement('p')

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
        //display information
        plotSizeP.innerHTML = `<span class="__span">Plot Size:</span> ${locationArea.size} acre`
        depositP.innerHTML = `<span class="__span">Initial Deposit:</span> Ksh. ${numberWithCommas(parseInt(depositInput.value))}`
        paymentP.innerHTML = `<span class="__span">Payment Period:</span> ${months.value} month(s)`
        installmentP.innerHTML = `<span class="__span">Your Monthly Installment:</span> Ksh. ${numberWithCommas(installment)}`
    }

    function unfixedFormulaeMethod() {
        monthFormulaeMethod()
        //display information
        plotSizeP.innerHTML = `<span class="__span">Plot Size:</span> ${locationArea.size} acre`
        depositP.innerHTML = `<span class="__span">Initial Deposit:</span> Ksh. ${numberWithCommas(parseInt(depositInput.value))}`
        paymentP.innerHTML = `<span class="__span">Payment Period:</span> ${months.value} month(s)`
        installmentP.innerHTML = `<span class="__span">Your Monthly Installment:</span> Ksh. ${numberWithCommas(installment)}`
    }
    submit.addEventListener('click', (e) => {
        e.preventDefault()
        if (!!depositInput.value) {
            errorMessageOverall.classList.remove('show')
            errorMessageOverall.classList.add('hide')
            if (depositInput.value >= locationArea.min && depositInput.value < locationArea.value + 1) {
                //remove error message display
                errorMessage.classList.remove('show')
                errorMessage.classList.add('hide')
                if (locationArea.fixedPeriod === null)
                    unfixedFormulaeMethod()
                else
                    fixedFormulaeMethod()
            } else {
                errorMessage.innerHTML = `amount should be in the range ${numberWithCommas(locationArea.min)} - ${numberWithCommas(locationArea.value)}`
                errorMessage.classList.add('show')
            }
        } else {
            errorMessageOverall.innerHTML = "please fill all fields"
            errorMessageOverall.classList.add('show')
        }
    })


    //create the default list
    createAllMonths()
    if (locationArea.fixedPeriod === null) {
        //check for the limit
        showAllMonths(locationArea.period)
    } else {
        //calling the restrict
        restrictedMonths(locationArea.fixedPeriod)
    }
    resultDiv.appendChild(plotSizeP)
    resultDiv.appendChild(depositP)
    resultDiv.appendChild(paymentP)
    resultDiv.appendChild(installmentP)
}
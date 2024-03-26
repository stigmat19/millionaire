const steps = [
    {
        step_number: 1,
        amount: 100,
        fireproof: true,
    },
    {
        step_number: 2,
        amount: 200,
        fireproof: false,
    },
    {
        step_number: 3,
        amount: 300,
        fireproof: false,
    },
    {
        step_number: 4,
        amount: 500,
        fireproof: false,
    },
    {
        step_number: 5,
        amount: 1000,
        fireproof: true,
    },
    {
        step_number: 6,
        amount: 2000,
        fireproof: false,
    },
    {
        step_number: 7,
        amount: 4000,
        fireproof: false,
    },
    {
        step_number: 8,
        amount: 8000,
        fireproof: false,
    },
    {
        step_number: 9,
        amount: 16000,
        fireproof: false,
    },
    {
        step_number: 10,
        amount: 32000,
        fireproof: true,
    },
    {
        step_number: 11,
        amount: 64000,
        fireproof: false,
    },
    {
        step_number: 12,
        amount: 126000,
        fireproof: false,
    },
    {
        step_number: 13,
        amount: 250000,
        fireproof: false,
    },
    {
        step_number: 14,
        amount: 600000,
        fireproof: false,
    },
    {
        step_number: 15,
        amount: 1000000,
        fireproof: true,
    }
    
]

const tips = {
    'fifty_fyfty': true,
    'hall_help': true,
    'call_friend': true,
}

const questions = [
    {
        step: 1,
        descr: 'Какое насекомое вызвало короткое замыкание в ранней версии вычислительной машины, тем самым породив термин «компьютерный баг» («баг» в переводе с англ. «насекомое»)?',
        variants: [
            {
                key: "A",
                value: "Мотылек",
                correctly: true
            },
            {
                key: "B",
                value: "Таракан",
                correctly: false
            },
            {
                key: "C",
                value: "Муха",
                correctly: false
            },
            {
                key: "D",
                value: "Японский хрущик",
                correctly: false
            }
        ]
    },
    {
        step: 2,
        descr: 'Сколько кубиков в кубике Рубика?',
        variants: [
            {
                key: "A",
                value: 22,
                correctly: false
            },
            {
                key: "B",
                value: 24,
                correctly: false
            },
            {
                key: "C",
                value: 26,
                correctly: true
            },
            {
                key: "D",
                value: 28,
                correctly: false
            }
        ]
    },
    {
        step: 3,
        descr: 'Какой язык программирования самый лучший?',
        variants: [
            {
                key: "A",
                value: "C#",
                correctly: false
            },
            {
                key: "B",
                value: "Java",
                correctly: false
            },
            {
                key: "C",
                value: "Javascript",
                correctly: true
            },
            {
                key: "D",
                value: "Python",
                correctly: false
            }
        ]
    },
    {
        step: 4,
        descr: 'Какой язык программирования самый лучший? 4',
        variants: [
            {
                key: "A",
                value: "C#",
                correctly: false
            },
            {
                key: "B",
                value: "Java",
                correctly: false
            },
            {
                key: "C",
                value: "Javascript",
                correctly: true
            },
            {
                key: "D",
                value: "Python",
                correctly: false
            }
        ]
    },
    {
        step: 5,
        descr: 'Какой язык программирования самый лучший? 5',
        variants: [
            {
                key: "A",
                value: "C#",
                correctly: false
            },
            {
                key: "B",
                value: "Java",
                correctly: false
            },
            {
                key: "C",
                value: "Javascript",
                correctly: true
            },
            {
                key: "D",
                value: "Python",
                correctly: false
            }
        ]
    },
];

let currentStep = 1;

const render = (_steps, _tips, _questions) => {
    // const beginSongs = new Audio('../songs/hello-new-punter-2008-long.mp3');
    // beginSongs.muted = true;
    // beginSongs.play();

    const tipsEL = document.querySelector('.tips'); 
    const steps = document.querySelector('.steps'); 
    const questions = document.querySelector('.questions__wrap'); 

    // init tips
    let tipsHtmlEL = '';

    for(let tip in _tips){
        tipsHtmlEL+=`<li class="${tip}"></li>`
    }

    tipsEL.innerHTML = tipsHtmlEL;


    // init steps
    _steps.sort((a,b) => b.amount - a.amount)

    let stepsEL = _steps.reduce((acc, step) => {
        const fireproof = step.fireproof ? 'fireproof': '';
        const _currentStep = step.step_number === currentStep ? 'active': '';

        return acc+=`
        <li class="${fireproof} ${_currentStep}" data-id="${step.step_number}">
            <span>${step.step_number}</span>
            ${step.amount}
        </li>`
    }, '');

    steps.innerHTML = stepsEL;

    // init questions
    const questionsHtmlEL = _questions.find(quest => quest.step === currentStep);
    questions.innerHTML = `
                    <h1>${questionsHtmlEL.descr}</h1>
                    <ul>
                        ${questionsHtmlEL.variants.reduce((acc, variant) => {
                            return acc+=`<li data-key="${variant.key}"><span>${variant.key}: </span>${variant.value}</li>`
                        }, '')}
                    </ul>`;
}

render(steps, tips, questions);

const addEvents = () => {
    const variant = document.querySelectorAll(".questions__wrap ul li");
    const correctSong = new Audio('../songs/khsm_q1-5-correct-o.mp3');
    const wrongSong = new Audio('../songs/khsm_q1-5-wrong.mp3');

    for(let i = 0; i < variant.length; i++){
        variant[i].addEventListener('click', (e) => {
            const key = e.target.dataset.key;

            const currentQuestion = questions.find(question => question.step === currentStep);
            const currentVariant = currentQuestion.variants.find(variant => variant.key === key);

            if(currentVariant.correctly){
                currentStep++;
                e.target.className = 'win';
                correctSong.muted = true;
                correctSong.play();
                setTimeout(() => {
                    render(steps, tips, questions);
                    addEvents();
                }, 3000)
            } else {
                e.target.className = 'lose';
                wrongSong.muted = true;
                wrongSong.play();
                setTimeout(() => {
                    prompt('Save score');
                    window.location.reload();
                }, 3000)
                
            }
        })
    }
}

addEvents();
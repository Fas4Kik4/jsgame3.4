// Селектори елементів на сторінці
const btnKick = document.getElementById('btn-kick');
const btnRandomAttack = document.getElementById('btn-random-attack');
const progressbarCharacter = document.getElementById('progressbar-character');
const healthCharacter = document.getElementById('health-character');
const progressbarEnemy = document.getElementById('progressbar-enemy');
const healthEnemy = document.getElementById('health-enemy');
const progressbarBlastoise = document.getElementById('progressbar-blastoise');
const healthBlastoise = document.getElementById('health-blastoise');
const logContainer = document.getElementById('logs');

// Створення об'єктів Character і Enemy
const character = {
    health: 100,
    progressbar: progressbarCharacter,
    healthText: healthCharacter,
    updateHealth() {
        const { health, progressbar, healthText } = this;
        const healthPercentage = (health / 100) * 100;
        progressbar.style.width = `${healthPercentage}%`;
        healthText.textContent = `${health} / 100`;
    }
};

const enemy = {
    health: 100,
    progressbar: progressbarEnemy,
    healthText: healthEnemy,
    updateHealth() {
        const { health, progressbar, healthText } = this;
        const healthPercentage = (health / 100) * 100;
        progressbar.style.width = `${healthPercentage}%`;
        healthText.textContent = `${health} / 100`;
    }
};

const blastoise = {
    health: 100,
    progressbar: progressbarBlastoise,
    healthText: healthBlastoise,
    updateHealth() {
        const { health, progressbar, healthText } = this;
        const healthPercentage = (health / 100) * 100;
        progressbar.style.width = `${healthPercentage}%`;
        healthText.textContent = `${health} / 100`;
    }
};

// Лог битви
const logs = [
    '[ПЕРСОНАЖ №1] згадав щось важливе, але несподівано [ПЕРСОНАЖ №2] вдарив у передпліччя ворога.',
    '[ПЕРСОНАЖ №1] поперхнувся, і за це [ПЕРСОНАЖ №2] з переляку приклав прямий удар коліном у лоб ворога.',
    '[ПЕРСОНАЖ №1] забувся, але [ПЕРСОНАЖ №2], прийнявши вольове рішення, вдарив.',
    '[ПЕРСОНАЖ №1] прийшов до тями, але [ПЕРСОНАЖ №2] випадково завдав потужного удару.',
    '[ПЕРСОНАЖ №1] поперхнувся, але [ПЕРСОНАЖ №2] розтрощив кулаком супротивника.',
    '[ПЕРСОНАЖ №1] здивувався, а [ПЕРСОНАЖ №2] вліпив підлий удар.',
    '[ПЕРСОНАЖ №1] висморкався, але [ПЕРСОНАЖ №2] провів удар, що дробить.',
    '[ПЕРСОНАЖ №1] похитнувся, і [ПЕРСОНАЖ №2] вдарив у ногу супротивника',
    '[ПЕРСОНАЖ №1] засмутився, як [ПЕРСОНАЖ №2] вдарив стопою в живіт.',
    '[ПЕРСОНАЖ №1] намагався щось сказати, але [ПЕРСОНАЖ №2] розбив брову супернику.'
];

// Функція для атаки на Charmander і Blastoise
function attackBothEnemies() {
    const damageToEnemy = Math.floor(Math.random() * 20) + 5;
    const damageToBlastoise = Math.floor(Math.random() * 20) + 5;

    enemy.health -= damageToEnemy;
    enemy.updateHealth();
    logAction('Charmander', damageToEnemy, enemy.health);
    checkVictory(enemy.health, 'Ви перемогли Charmander!');

    blastoise.health -= damageToBlastoise;
    blastoise.updateHealth();
    logAction('Blastoise', damageToBlastoise, blastoise.health);
    checkVictory(blastoise.health, 'Ви перемогли Blastoise!');
}

// Функція для випадкової атаки на ворогів
function randomAttack() {
    const damage = Math.floor(Math.random() * 15) + 5;
    const target = Math.random() < 0.5 ? enemy : blastoise;

    target.health -= damage;
    target.updateHealth();
    logAction(target === enemy ? 'Charmander' : 'Blastoise', damage, target.health);
    checkVictory(target.health, `Ви перемогли ${target === enemy ? 'Charmander' : 'Blastoise'}!`);
}

// Логування дій
function logAction(target, damage, remainingHealth) {
    const logText = `${target} отримав ${damage} шкоди, залишилось ${remainingHealth} HP.`;
    const randomLog = logs[Math.floor(Math.random() * logs.length)];
    const formattedLog = randomLog.replace('[ПЕРСОНАЖ №1]', 'Гравець').replace('[ПЕРСОНАЖ №2]', target);
    
    const newLogEntry = `<p>${formattedLog} (${logText})</p>`;
    logContainer.innerHTML = newLogEntry + logContainer.innerHTML;
}

// Перевірка на перемогу
function checkVictory(health, message) {
    if (health <= 0) {
        alert(message);
        resetGame();
    }
}

// Функція для скидання гри (відновлення здоров'я і лічильників)
function resetGame() {
    setTimeout(function() {
        character.health = 100;
        enemy.health = 100;
        blastoise.health = 100;
        character.updateHealth();
        enemy.updateHealth();
        blastoise.updateHealth();
        resetClickCounters(); // Скидання лічильників кліків
        alert('Гра скинута! Почніть новий бій!');
        logContainer.innerHTML = ''; // Очищуємо лог
    }, 2000);
}

// Функція для підрахунку кліків
function setupClickCounter(button, limit) {
    let count = 0;

    const handleClick = () => {
        if (count < limit) {
            count++;
            console.log(`Кількість натискань: ${count}`);
            console.log(`Залишилось натискань: ${limit - count}`);
        } else {
            alert('Обмеження на натискання досягнуто!');
            button.disabled = true; // Деактивуємо кнопку після досягнення ліміту
        }
    };

    const reset = () => {
        count = 0;
        button.disabled = false; // Відновлюємо можливість натискання кнопки
        console.log(`Лічильник для кнопки ${button.id} скинуто.`);
    };

    return { handleClick, reset };
}

// Встановлюємо обробники подій на кнопки
const kickHandler = setupClickCounter(btnKick, 6);
btnKick.addEventListener('click', function() {
    kickHandler.handleClick();
    attackBothEnemies();
});

const randomAttackHandler = setupClickCounter(btnRandomAttack, 6);
btnRandomAttack.addEventListener('click', function() {
    randomAttackHandler.handleClick();
    randomAttack();
});

// Функція для скидання лічильників кліків
function resetClickCounters() {
    kickHandler.reset();
    randomAttackHandler.reset();
}

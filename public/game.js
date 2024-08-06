// 游戏状态
let currentScene = 'intro';
let coins = -500;  // 开始时负债500元
let sanValue = 100;
let inventory = [];
let day = 1;
let actionsToday = 0;
const MAX_ACTIONS_PER_DAY = 2;

function updateScene() {
    const scene = gameContent.scenes[currentScene];
    document.getElementById('scene-description').innerText = scene.description;
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';

    // 添加睡觉按钮
    if (currentScene !== 'intro' && currentScene !== 'gameOver') {
        const sleepButton = document.createElement('button');
        sleepButton.innerText = '睡觉';
        sleepButton.onclick = sleep;
        choicesContainer.appendChild(sleepButton);
    }

    Object.entries(scene.choices).forEach(([key, choice]) => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.onclick = () => {
            if (actionsToday >= MAX_ACTIONS_PER_DAY && currentScene !== 'intro' && currentScene !== 'gameOver') {
                alert('今天的行动次数已用完，请选择睡觉结束今天。');
                return;
            }
            if (choice.action) {
                performAction(choice.action);
            } else {
                currentScene = choice.nextScene;
                if (choice.sanChange) {
                    changeSanValue(choice.sanChange);
                }
                if (choice.coinChange) {
                    changeCoins(choice.coinChange);
                }
                actionsToday++;
                updateScene();
            }
        };
        choicesContainer.appendChild(button);
    });
    updateStats();
    updateIntroVisibility();
}

function updateStats() {
    if (currentScene !== 'intro') {
        document.getElementById('stats').style.display = 'flex';
        document.getElementById('coins').innerText = `金币: ${coins}`;
        document.getElementById('san').innerText = `SAN值: ${sanValue}`;
        document.getElementById('day').innerText = `第 ${day} 天`;
        document.getElementById('actions').innerText = `今日行动: ${actionsToday}/${MAX_ACTIONS_PER_DAY}`;
    } else {
        document.getElementById('stats').style.display = 'none';
    }
}

function updateIntroVisibility() {
    const introContainer = document.getElementById('intro-container');
    if (currentScene === 'intro') {
        introContainer.style.display = 'block';
    } else {
        introContainer.style.display = 'none';
    }
}

function changeCoins(amount) {
    coins += amount;
    updateStats();
}

function changeSanValue(amount) {
    sanValue += amount;
    if (sanValue <= 0) {
        currentScene = 'gameOver';
        updateScene();
    }
    updateStats();
}

function sleep() {
    day++;
    actionsToday = 0;
    changeSanValue(10);  // 睡眠恢复一些SAN值
    alert(`你睡了一觉，现在是第 ${day} 天。`);
    updateScene();
}

function performAction(action) {
    switch(action) {
        case 'buyEnergyDrink':
            if (coins >= 10) {
                coins -= 10;
                inventory.push('能量饮料');
                changeSanValue(5);
                alert('你购买了能量饮料，SAN值+5!');
            } else {
                alert('金币不足!');
            }
            break;
        case 'buyMeal':
            if (coins >= 30) {
                coins -= 30;
                changeSanValue(10);
                alert('你购买了一顿饭，SAN值+10!');
            } else {
                alert('金币不足!');
            }
            break;
        case 'buyMassage':
            if (coins >= 200) {
                coins -= 200;
                inventory.push('按摩券');
                changeSanValue(20);
                alert('你购买了按摩券，SAN值+20!');
            } else {
                alert('金币不足!');
            }
            break;
        case 'buyCounseling':
            if (coins >= 500) {
                coins -= 500;
                changeSanValue(50);
                alert('你接受了心理咨询，SAN值+50!');
            } else {
                alert('金币不足!');
            }
            break;
        case 'restartGame':
            initializeGame();
            break;
    }
    updateStats();
}

function initializeGame() {
    currentScene = 'intro';
    coins = -500;
    sanValue = 100;
    inventory = [];
    day = 1;
    actionsToday = 0;
    updateScene();
}

function checkGameEnd() {
    const endScenes = ['quit', 'newAdventure', 'jobHunt', 'activist', 'cautious', 'gameOver'];
    if (endScenes.includes(currentScene)) {
        const restartButton = document.createElement('button');
        restartButton.innerText = '重新开始游戏';
        restartButton.onclick = initializeGame;
        document.getElementById('choices').appendChild(restartButton);
    }
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    updateScene();
    const storeButton = document.createElement('button');
    storeButton.innerText = '访问商店';
    storeButton.onclick = () => {
        if (actionsToday >= MAX_ACTIONS_PER_DAY) {
            alert('今天的行动次数已用完，请选择睡觉结束今天。');
            return;
        }
        currentScene = 'store';
        actionsToday++;
        updateScene();
    };
    document.getElementById('game-container').appendChild(storeButton);
});
// 注意：确保在HTML中先引入gameContent.js，然后再引入此文件

let currentScene = 'intro';
let coins = -50;
let sanValue = 100;
let inventory = [];

function updateScene() {
    const scene = gameContent.scenes[currentScene];
    document.getElementById('scene-description').innerText = scene.description;
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';
    Object.entries(scene.choices).forEach(([key, choice]) => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.onclick = () => {
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

function performAction(action) {
    switch(action) {
        case 'buyEnergyDrink':
            if (coins >= 50) {
                coins -= 50;
                inventory.push('能量饮料');
                changeSanValue(10);
                alert('你购买了能量饮料，SAN值+10!');
            } else {
                alert('金币不足!');
            }
            break;
        case 'buyMassage':
            if (coins >= 100) {
                coins -= 100;
                inventory.push('按摩券');
                changeSanValue(20);
                alert('你购买了按摩券，SAN值+20!');
            } else {
                alert('金币不足!');
            }
            break;
        case 'buyCounseling':
            if (coins >= 200) {
                coins -= 200;
                changeSanValue(50);
                alert('你接受了心理咨询，SAN值+50!');
            } else {
                alert('金币不足!');
            }
            break;
        case 'restartGame':
            currentScene = 'intro';
            coins = -50;
            sanValue = 100;
            inventory = [];
            updateScene();
            break;
    }
    updateStats();
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    updateScene();
    const storeButton = document.createElement('button');
    storeButton.innerText = '访问商店';
    storeButton.onclick = () => {
        currentScene = 'store';
        updateScene();
    };
    document.getElementById('game-container').appendChild(storeButton);
});
const gameContent = {
    scenes: {
        start: {
            description: "黄少是慢手公司的一名审核员。今天早上，他拖着疲惫的身躯来到了公司，想起自己还欠着公司50块钱，心里更加郁闷。",
            choices: {
                1: { text: "叹口气，开始工作", nextScene: "work", sanChange: -5 },
                2: { text: "先去休息室喝杯咖啡", nextScene: "breakroom", sanChange: 5 }
            }
        },
        work: {
            description: "黄少坐在电脑前，开始了枯燥的审核工作。屏幕上不断闪现需要审核的内容。",
            choices: {
                1: { text: "努力工作", nextScene: "workHard", sanChange: -10, coinChange: 20 },
                2: { text: "摸鱼一下", nextScene: "slackOff", sanChange: 5 }
            }
        },
        breakroom: {
            description: "休息室里，黄少遇到了几个同事。他们正在小声抱怨工作压力。",
            choices: {
                1: { text: "加入抱怨", nextScene: "complain", sanChange: 10 },
                2: { text: "默默回到工位", nextScene: "work", sanChange: -5 }
            }
        },
        workHard: {
            description: "黄少加快了审核速度。几个小时后，他感到眼睛酸痛，但完成了不少工作。",
            choices: {
                1: { text: "继续工作", nextScene: "overwork", sanChange: -15, coinChange: 30 },
                2: { text: "休息一下", nextScene: "break", sanChange: 10 }
            }
        },
        slackOff: {
            description: "黄少放慢了速度，但很快被主管发现了。",
            choices: {
                1: { text: "道歉并加快速度", nextScene: "work", sanChange: -10 },
                2: { text: "辩解", nextScene: "argument", sanChange: -20 }
            }
        },
        overwork: {
            description: "黄少工作到很晚。他完成了大量工作，但感觉身心俱疲。",
            choices: {
                1: { text: "回家", nextScene: "goHome", sanChange: 20 },
                2: { text: "继续加班", nextScene: "burnout", sanChange: -30, coinChange: 50 }
            }
        },
        store: {
            description: "这是慢手公司的员工商店。你可以用辛苦赚来的金币购买物品。",
            choices: {
                1: { text: "购买能量饮料 (50金币)", action: "buyEnergyDrink" },
                2: { text: "购买按摩券 (100金币)", action: "buyMassage" },
                3: { text: "购买心理咨询 (200金币)", action: "buyCounseling" },
                4: { text: "返回工作", nextScene: "work" }
            }
        },
        gameOver: {
            description: "？跑了\n\n黄少感觉自己的意识正在崩溃。在最后一刻，他看到一个奇怪的符号在眼前闪过。突然，他发现自己站在了公司大楼外，周围的一切都显得那么陌生。他不知道自己是谁，来自哪里，要去向何方。黄少，或者说曾经的黄少，转身离开了慢手公司，消失在了城市的街道中。",
            choices: {
                1: { text: "重新开始", action: "restartGame" }
            }
        }
    }
};

let currentScene = 'start';
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
}

function updateStats() {
    document.getElementById('coins').innerText = `金币: ${coins}`;
    document.getElementById('san').innerText = `SAN值: ${sanValue}`;
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
            currentScene = 'start';
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
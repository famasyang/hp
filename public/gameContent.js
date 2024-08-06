const gameContent = {
    scenes: {
        intro: {
            description: "欢迎来到《仿生黄少会梦见电子马克思吗？》\n\n黄少来自四川东部或者是广东南部的一个小县城，他曾经在网上是特种兵，会越南语。爱好是看星际牛仔和玩全面战争：战锤，但是最近迫于生活，流落到了慢手公司，你将会决定他的工作生涯，也许还有爱情？",
            choices: {
                1: { text: "开始游戏", nextScene: "start" }
            }
        },
        start: {
            description: "黄少是慢手公司的一名审核员。今天早上，他拖着疲惫的身躯来到了公司，想起自己还欠着公司500块钱，心里更加郁闷。他的月薪是5000元，但生活开支让他总是入不敷出。房租1500元刚刚交完，银行账户只剩下可怜的200元。",
            choices: {
                1: { text: "叹口气，开始工作", nextScene: "work", sanChange: -5 },
                2: { text: "先去休息室喝杯咖啡 (花费10元)", nextScene: "breakroom", sanChange: 5, coinChange: -10 }
            }
        },
        work: {
            description: "黄少坐在电脑前，开始了枯燥的审核工作。屏幕上不断闪现需要审核的内容。突然，一个奇怪的视频引起了他的注意。",
            choices: {
                1: { text: "仔细审核这个视频", nextScene: "investigateVideo", sanChange: -10 },
                2: { text: "忽略异常，继续工作", nextScene: "workHard", sanChange: -5, coinChange: 100 }
            }
        },
        investigateVideo: {
            description: "视频中似乎暗示了一些不寻常的信息。黄少犹豫是否要深入调查。",
            choices: {
                1: { text: "私下调查", nextScene: "privateInvestigation", sanChange: -15 },
                2: { text: "报告给上级", nextScene: "reportToSuperior", sanChange: -5 }
            }
        },
        privateInvestigation: {
            description: "黄少决定私下调查这个视频。他发现这可能涉及到一个大型阴谋。继续调查可能会有危险，但也可能揭露真相。",
            choices: {
                1: { text: "继续深入调查", nextScene: "deepInvestigation", sanChange: -20 },
                2: { text: "停止调查，装作无事发生", nextScene: "workHard", sanChange: -10 }
            }
        },
        deepInvestigation: {
            description: "深入调查后，黄少发现公司高层可能参与了一些非法活动。他手中有了一些证据，但不知道该如何是好。",
            choices: {
                1: { text: "匿名举报", nextScene: "anonymousReport", sanChange: -10 },
                2: { text: "与同事商议", nextScene: "discussWithColleague", sanChange: 5 },
                3: { text: "保持沉默", nextScene: "keepSilent", sanChange: -15 }
            }
        },
        anonymousReport: {
            description: "黄少选择匿名举报。几天后，公司陷入了混乱，警察进行了调查。黄少不知道自己的未来会如何。",
            choices: {
                1: { text: "继续观察事态发展", nextScene: "observeDevelopments", sanChange: -5 },
                2: { text: "考虑辞职", nextScene: "considerResigning", sanChange: 10 }
            }
        },
        reportToSuperior: {
            description: "黄少向上级报告了异常视频。上级看起来有些紧张，但表示会处理这件事。",
            choices: {
                1: { text: "相信上级会处理", nextScene: "trustSuperior", sanChange: 5 },
                2: { text: "对上级的反应产生怀疑", nextScene: "doubtSuperior", sanChange: -10 }
            }
        },
        breakroom: {
            description: "休息室里，黄少遇到了几个同事。他们正在小声抱怨工作压力。一位名叫小林的女同事看起来特别焦虑。",
            choices: {
                1: { text: "加入抱怨", nextScene: "complain", sanChange: 10 },
                2: { text: "安慰小林", nextScene: "comfortColleague", sanChange: 5 },
                3: { text: "默默回到工位", nextScene: "work", sanChange: -5 }
            }
        },
        comfortColleague: {
            description: "黄少尝试安慰小林。交谈中，他了解到小林也注意到了一些公司的异常情况。",
            choices: {
                1: { text: "与小林分享你的发现", nextScene: "shareFindings", sanChange: 10 },
                2: { text: "婉转地询问更多信息", nextScene: "inquireMore", sanChange: 5 },
                3: { text: "结束谈话，回到工作", nextScene: "work", sanChange: -5 }
            }
        },
        shareFindings: {
            description: "黄少决定与小林分享他的发现。小林看起来既惊讶又担心，她提议两人一起调查这件事。",
            choices: {
                1: { text: "同意合作调查", nextScene: "cooperateInvestigation", sanChange: 15 },
                2: { text: "拒绝，认为太危险", nextScene: "refuseCooperation", sanChange: -10 }
            }
        },
        cooperateInvestigation: {
            description: "黄少和小林开始秘密合作调查公司的异常。这个过程既刺激又危险，两人之间也产生了一些微妙的情感。",
            choices: {
                1: { text: "专注于调查", nextScene: "focusOnInvestigation", sanChange: -5 },
                2: { text: "更关注与小林的关系", nextScene: "focusOnRelationship", sanChange: 10 }
            }
        },
        workHard: {
            description: "黄少加快了审核速度。几个小时后，他感到眼睛酸痛，但完成了不少工作。主管看起来很满意。",
            choices: {
                1: { text: "继续加班（额外获得150元）", nextScene: "overwork", sanChange: -15, coinChange: 150 },
                2: { text: "准时下班", nextScene: "leaveWork", sanChange: 10 }
            }
        },
        overwork: {
            description: "黄少工作到很晚。他完成了大量工作，但感觉身心俱疲。走出公司时，他看到小林似乎在偷偷复印什么文件。",
            choices: {
                1: { text: "假装没看见，回家", nextScene: "goHome", sanChange: -5 },
                2: { text: "上前询问小林", nextScene: "askColleague", sanChange: -10 },
                3: { text: "躲在一旁偷偷观察", nextScene: "observeColleague", sanChange: -15 }
            }
        },
        askColleague: {
            description: "黄少决定上前询问小林。小林显得很紧张，但最终告诉了黄少一些关于公司的惊人秘密。",
            choices: {
                1: { text: "提议一起调查", nextScene: "investigateTogether", sanChange: 10 },
                2: { text: "婉拒参与，假装不知情", nextScene: "pretendIgnorance", sanChange: -15 }
            }
        },
        store: {
            description: "这是慢手公司附近的便利店。你可以用辛苦赚来的钱购买物品。老板娘小芳对你似乎特别热情。",
            choices: {
                1: { text: "购买能量饮料 (10元)", action: "buyEnergyDrink" },
                2: { text: "购买快餐套餐 (30元)", action: "buyMeal" },
                3: { text: "购买按摩券 (200元)", action: "buyMassage" },
                4: { text: "预约心理咨询 (500元)", action: "buyCounseling" },
                5: { text: "与小芳聊天", nextScene: "chatWithShopkeeper" },
                6: { text: "返回工作", nextScene: "work" }
            }
        },
        chatWithShopkeeper: {
            description: "黄少决定和小芳聊天。交谈中，他发现小芳似乎知道一些关于慢手公司的内幕消息。",
            choices: {
                1: { text: "询问更多信息", nextScene: "inquireShopkeeper", sanChange: 5 },
                2: { text: "保持距离，结束对话", nextScene: "endChat", sanChange: -5 }
            }
        },
        inquireShopkeeper: {
            description: "小芳透露，最近经常有人深夜来公司，似乎在进行一些秘密活动。她建议黄少小心一些。",
            choices: {
                1: { text: "感谢小芳，决定留意公司动向", nextScene: "stayAlert", sanChange: -10 },
                2: { text: "认为小芳可能在捕风捉影", nextScene: "dismissInfo", sanChange: 5 }
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

// 如果使用ES6模块系统，可以添加以下行：
// export default gameContent;
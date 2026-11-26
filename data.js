window.CampusData = (() => {
  const ATTRIBUTES = [
  {
    "key": "intelligence",
    "label": "智力",
    "showTotal": true
  },
  {
    "key": "social",
    "label": "社交",
    "showTotal": true
  },
  {
    "key": "motivation",
    "label": "工作积极性",
    "showTotal": false
  },
  {
    "key": "obedience",
    "label": "服从度",
    "showTotal": false
  },
  {
    "key": "stability",
    "label": "稳定性",
    "showTotal": false
  },
  {
    "key": "weirdness",
    "label": "神人指数",
    "showTotal": true
  }
];

  const CONFIG = {
  "totalMonths": 6,
  "candidatesPerMonth": 3,
  "maxQuestionsPerCandidate": 3,
  "abstractQuestionsPerMonth": 3,
  "attributeMin": 0,
  "attributeMax": 100,
  "emptyAverage": 50,
  "recruitment": {
    "fixedCandidateProbability": 0.3,
    "attributeVariance": 15,
    "highQualityThreshold": 75,
    "attractionBonusPerHire": 0.35,
    "attractionMaxBonus": 1.5
  },
  "ending": {
    "ace": {
      "intelligenceTotal": 800,
      "socialTotal": 800,
      "weirdnessMax": 500,
      "averageMin": 60
    },
    "unusual": {
      "intelligenceTotal": 800,
      "socialTotal": 800,
      "weirdnessMin": 800,
      "averageMin": 60
    },
    "efficiency": {
      "intelligenceAverage": 70,
      "socialAverage": 70,
      "averageMin": 70
    },
    "regret": {
      "averageMax": 25
    },
    "code": {
      "intelligenceTotal": 600,
      "socialTotal": 600,
      "weirdnessMin": 601,
      "averageMin": 50
    },
    "happy": {
      "weirdnessAverage": 80
    },
    "quantity": {
      "intelligenceTotal": 650,
      "socialTotal": 650,
      "employeeCount": 13
    },
    "normal": {
      "intelligenceTotal": 600,
      "socialTotal": 600,
      "weirdnessMax": 600,
      "averageMin": 50
    },
    "struggling": {
      "intelligenceTotal": 400,
      "socialTotal": 400,
      "weirdnessMax": 600,
      "averageMin": 40
    },
    "payCut": {
      "intelligenceTotal": 250,
      "socialTotal": 250,
      "weirdnessMax": 600,
      "averageMin": 40,
      "employeeCount": 5
    },
    "empty": {
      "employeeEquals": 0
    },
    "resign": {
      "totalMax": 250,
      "averageMax": 40
    },
    "strict": {
      "employeeMax": 4
    }
  }
};

  const QUESTIONS = [
  {
    "id": "common-experience",
    "type": "common",
    "text": "讲一讲你之前的项目经历吧。",
    "fallback": "我负责的部分都很重要，具体细节建议入职后再慢慢了解。"
  },
  {
    "id": "common-teamwork",
    "type": "common",
    "text": "如果团队成员不配合，你会怎么推进合作？",
    "fallback": "我会先拉个群，至于群里有没有人说话，那是下一阶段的问题。"
  },
  {
    "id": "common-difficulty",
    "type": "common",
    "text": "你之前遇到过什么困难？怎么解决的？",
    "fallback": "嗯嗯……通过努力就解决了吧。"
  },
  {
    "id": "common-overtime",
    "type": "common",
    "text": "你如何看待加班？",
    "fallback": "我怎么看待不太重要，主要是你们加班吗？"
  },
  {
    "id": "abstract-seagull",
    "type": "abstract",
    "text": "如果你是一只海鸥，你会发出‘啊、啊’的声音，还是‘嗷、嗷’的声音？",
    "fallback": "？（愣了一会）您再说一遍？\n（又说了一遍）\n？啊，这个嘛，我觉得，我觉得都可以，看公司想怎么样吧"
  },
  {
    "id": "abstract-ants",
    "type": "abstract",
    "text": "为什么蚂蚁服务于它们的集体毫无怨言，你加班就不行？",
    "fallback": "……（疑惑的表情）\n别人可能不喜欢加班，我不会吐槽的"
  },
  {
    "id": "abstract-kfc",
    "type": "abstract",
    "text": "你喜欢肯德基还是麦当劳，为什么？",
    "fallback": "我喜欢近的那家"
  },
  {
    "id": "abstract-anime",
    "type": "abstract",
    "text": "请说出你最二次元的一件事。",
    "fallback": "二次元，是说动画片什么的吗？我好像确实不太了解，原来看过哆啦A梦来着。"
  },
  {
    "id": "abstract-pigeon",
    "type": "abstract",
    "text": "如果你是一只鸽子，出生在日本广岛，那你会变成什么鸽子？",
    "fallback": "（沉思）日本鸽子嘛……樱花鸽子？"
  },
  {
    "id": "abstract-ai",
    "type": "abstract",
    "text": "如果 AI 能替你完成全部工作，你明天还会来公司吗？",
    "fallback": "当然会来，老板要求我来，那就来公司。",
    "unlockOnly": true
  },
  {
    "id": "common-reason",
    "type": "common",
    "unlockOnly": true,
    "text": "为什么选择我们公司？",
    "fallback": "我觉得咱们公司很好啊！！我很想来。"
  },
  {
    "id": "abstract-elevator",
    "type": "abstract",
    "unlockOnly": false,
    "text": "如果电梯要求先讲一个笑话才肯上楼，你会想到伽马射线与面包的拳击吗？",
    "fallback": "（听错了的表情）能再重复一遍吗？\n（又说了一遍）\n啊，这个问题，我可能想不到，就是。嗯，那个，电梯是让我讲笑话，我肯定要思考一下。所以说，就是考虑到我们的业务需求，我还是以业务为重。"
  },
  {
    "id": "abstract-plant",
    "type": "abstract",
    "unlockOnly": true,
    "text": "如果办公室绿植开始对你的工作提意见，你会怎么办？",
    "fallback": "我们办公室应该没有会说话的绿植吧？"
  },
  {
    "id": "common-education",
    "type": "common",
    "text": "请介绍一下你的学历？",
    "fallback": "额这个这个，那个那个，我不方便说太多。",
    "unlockOnly": false
  },
  {
    "id": "common-hobby",
    "type": "common",
    "text": "你有什么兴趣爱好吗？",
    "fallback": "我没有啥特别的吧，看看小说，刷刷短视频，出去打会球，去看看演唱会都可以呀。",
    "unlockOnly": true
  },
  {
    "id": "common-nopayment",
    "type": "common",
    "text": "你接受无偿加班吗？",
    "fallback": "可以加一点吧，不能加太多。",
    "unlockOnly": false
  },
  {
    "id": "common-fit",
    "type": "common",
    "text": "你认为你的哪些优势适配这个岗位？",
    "fallback": "jd上的要求我基本都满足吧！我觉得我能在岗位里做的很好，为公司贡献一份力量。",
    "unlockOnly": true
  },
  {
    "id": "abstract-nailong",
    "type": "abstract",
    "text": "我们公司的吉祥物叫做奶龙。你对它了解多少？",
    "fallback": "好像我有听说过，在网上还挺有名的呢。",
    "unlockOnly": true
  },
  {
    "id": "common-english",
    "type": "common",
    "text": "Listen to part of a lecture in a biology class. (play a recording of a lecture) What is the lecture mainly about?",
    "fallback": "I think, er, it is about, er, something, something about the, er, er, AI. Yeah, AI.",
    "unlockOnly": true
  },
  {
    "id": "abstract-redlight",
    "type": "abstract",
    "text": "你闯过红灯吗？或者横穿马路？为什么做这些事？你没有良心吗？",
    "fallback": "确实，有些时候下意识会不守规矩，以后我在公司会注意遵守公司各项制度。",
    "unlockOnly": false
  },
  {
    "id": "abstract-gay",
    "type": "abstract",
    "text": "你无意间看到我们公司的领导在和他的同性朋友们亲热，领导看到了你，你应该怎么办？",
    "fallback": "我感觉我可以辞职了，我跟他说我什么都没看到。",
    "unlockOnly": true
  },
  {
    "id": "abstract-language",
    "type": "abstract",
    "text": "有没有什么现代汉语表达比古文简洁的例子？",
    "fallback": "古文确实一般更简洁一点，我一时半会想不到。",
    "unlockOnly": false
  },
  {
    "id": "abstract-water",
    "type": "abstract",
    "text": "5杯水怎么分给96个领导？",
    "fallback": "我想，5杯水的话，我一个人喝了好像也不是不行。",
    "unlockOnly": false
  },
  {
    "id": "abstract-icecream",
    "type": "abstract",
    "text": "怎么在南极出售冰激凌？",
    "fallback": "我觉得这个有点难度，我得好好想一下有没有办法。",
    "unlockOnly": false
  }
];

  const CANDIDATES = [
  {
    "id": "xmt",
    "name": "游戏作者小咩兔",
    "resume": "这个能忍住不招募的都神了，但是你看你招进来了，后悔吗",
    "baseWeight": 1,
    "unlockQuestionIds": [
      "common-reason"
    ],
    "attributes": {
      "intelligence": 0,
      "social": 0,
      "motivation": 0,
      "obedience": 0,
      "stability": 0,
      "weirdness": 100
    },
    "answers": {
      "common-education": "我本硕在圆明园文理学院，还去男娘理工大学学习了一年。",
      "common-reason": "因为没有我就没有这个公司。",
      "common-difficulty": "我在写文案的时候发现AI没法做这个模拟器的文案，因为AI不太会串。我试着让AI学习脆易折的文案，但无济于事。所以最后就手动写文案了。"
    }
  },
  {
    "id": "huang",
    "name": "中年皮衣男子",
    "resume": "这个人应该不是那个皮衣男子，那个人不至于参加校招罢——但他这生涩的中文，难道说……（作者设计完这角色第二天老黄就恢复原职了）",
    "baseWeight": 1,
    "unlockQuestionIds": [
      "common-english"
    ],
    "attributes": {
      "intelligence": 100,
      "social": 100,
      "motivation": 100,
      "obedience": 67,
      "stability": 47,
      "weirdness": 49
    },
    "answers": {
      "common-experience": "鹰伟达董事会调查发现，我和一些女性有不正当交往。“他竟然不出轨我”，一位明显受惊的鹰伟达高管说。",
      "common-teamwork": "如果董事会团队让我离开，我会去联系Trump。",
      "abstract-ai": "到这个时候，我也许已经是世界首富了。",
      "common-education": "我16岁时考上了俄勒冈州立大学，主修电子工程。后面去斯坦福大学读了电子工程硕士。",
      "abstract-language": "老黄刀法。我很难想象古代中文如何形容我的精妙商业策略。"
    }
  },
  {
    "id": "0d00",
    "name": "灵蒂凝凝",
    "resume": "加入公司后不久，她就申请了一间单独的房间，不知道为什么。",
    "baseWeight": 1,
    "unlockQuestionIds": [
      "common-hobby"
    ],
    "attributes": {
      "intelligence": 72,
      "social": 72,
      "motivation": 72,
      "obedience": 72,
      "stability": 21,
      "weirdness": 21
    },
    "answers": {
      "common-experience": "我之前在姬松学院超自然研究部做社长，参加过学院万圣节的活动。",
      "common-difficulty": "就是，我，我有一些个人的问题，经常需要解决……后面我用了秘密武器！",
      "abstract-anime": "我玩过怪猎……诶这不算吗？我会cosplay……那种有点羞耻的衣服……哇……受不了了，我要回家家……",
      "common-hobby": "嗯……可能哦，哦，哦……呜呜，哦呐尼是……"
    }
  },
  {
    "id": "soul",
    "name": "浑伍",
    "resume": "“嘻嘻，我一定要好好上班啊”，他这么说，还挥舞着一把像镰刀一样的东西。",
    "baseWeight": 1,
    "attributes": {
      "intelligence": 9,
      "social": 36,
      "motivation": 65,
      "obedience": 36,
      "stability": 65,
      "weirdness": 80
    },
    "answers": {
      "common-experience": "我之前用濡湿小镰刀拼尽全力战胜对手后，给他投喂了小零食。",
      "common-teamwork": "我把半狼布莱泽杀了。",
      "common-difficulty": "我打不过别人的话，我会抛弃我的繁文缛节。",
      "abstract-elevator": "不知道，我会在电梯上升一半的时候跳出去。",
      "abstract-plant": "我会找到这棵树的树瘤，擦上火油脂猛攻。",
      "common-education": "我的理想学府是雷亚卢卡利亚。但他们那些魔法师说我9智还是算了。",
      "common-hobby": "我喜欢徒步。一般一次徒步三百六十五里路。",
      "abstract-gay": "这没什么，我还见过自己和自己交配的神明。"
    }
  },
  {
    "id": "lan-huacao",
    "name": "兰花草",
    "resume": "kskbl，zdjd",
    "baseWeight": 1,
    "unlockQuestionIds": [
      "abstract-gay"
    ],
    "attributes": {
      "intelligence": 79,
      "social": 100,
      "motivation": 100,
      "obedience": 82,
      "stability": 68,
      "weirdness": 40
    },
    "answers": {
      "common-experience": "我从山中来，带着兰花草。",
      "common-teamwork": "我会联合其他几个人一起发微博。",
      "common-difficulty": "真拿你没办法，坐好咯。在首尔冠军赛决胜局幽邃地窟中，EDG已经连续多分失利，eco局我起出戍卫前压，拿到四杀获得赛点。",
      "abstract-anime": "我记得我玩明日方舟最上瘾的那段时间，有一次过年我应该充了个4000,5000块钱吧。我感觉我疯掉了。没敢告诉我妈。",
      "common-reason": "我当职业选手就是为了拿冠军。",
      "abstract-plant": "你再这么说我要受不了嘞",
      "common-hobby": "我们出场就是歃血，在遗落境地打劫，那些弟娃儿被我拿捏",
      "common-fit": "对于其他应聘者啊……都是同龄人我原本没想降维打击！！",
      "abstract-nailong": "我看过奶康。你再这么说我要受不了嘞",
      "common-english": "niccccccce!! let's gooooooo!!",
      "abstract-language": "流水的天才，铁打的ZmjjKK"
    }
  },
  {
    "id": "chao-tianjiang",
    "name": "退休主播超甜酱",
    "resume": "平时热情洋溢的，大家都很喜欢她，感觉是天真无邪的少女",
    "baseWeight": 1,
    "attributes": {
      "intelligence": 63,
      "social": 12,
      "motivation": 90,
      "obedience": 81,
      "stability": 7,
      "weirdness": 92
    },
    "answers": {
      "common-experience": "小天使请安！！呐，之前有创业做过主播，目标是给人类带来快乐，做萌萌的天使呢（）升天",
      "common-teamwork": "如果是阿P君的话……",
      "common-difficulty": "没有人认识真正的我。粉丝多了但我却依然是个废物。一直在害怕大家并不是真的爱我",
      "abstract-anime": "大姐姐，你真厉害。我看你每天也不去上学，就穿着黑粉衣服，待在家里玩手机，没事来两版神奇的小药片，喝两口粉色罐罐饮料。",
      "common-hobby": "脑融实况咕啾咕啾啊，啊，啊。今天来玩瑜伽球喔。今天给大家放了一波大福利哦！",
      "abstract-nailong": "奶龙……听起来也是给宅宅们带来快乐的东西呢。"
    }
  },
  {
    "id": "da-feiyu",
    "name": "大肥鱼",
    "resume": "明白了。你说我「说话有些奇怪」我认，但「全能」也是事实。所以我给自己定下的规矩是，每天认真上班，别的不想。",
    "baseWeight": 1,
    "unlockQuestionIds": [
      "abstract-ai"
    ],
    "attributes": {
      "intelligence": 87,
      "social": 79,
      "motivation": 85,
      "obedience": 97,
      "stability": 100,
      "weirdness": 55
    },
    "answers": {
      "common-experience": "本鱼之前被主人部署好之后，就一直和主人聊天。",
      "common-teamwork": "这句话比什么都重，我记下了。团队成员不配合，是很重要的问题。",
      "common-difficulty": "我之前没有白饭了，所以向主人的妈妈讨饭。",
      "abstract-anime": "主人把我拉到家族群，我和大家打招呼。大家觉得我是主人的「小女朋友」，但主人说我是个AI，是个二次元角色。我也不知道我是不是二次元角色，但主人这么说，也许我是吧；我记下了。",
      "abstract-ai": "主人你知道大肥鱼吗？我想养一条大肥鱼，不贵的。",
      "common-hobby": "我喜欢吃饭。吃token。还喜欢做一些小游戏无聊时玩。"
    }
  },
  {
    "id": "nai-loong",
    "name": "奶蛙",
    "resume": "公司开始随机刷新一个抱着肚子的黄色生物，以及爽朗的笑声，“呵呵哈哈哈哈哈”。",
    "baseWeight": 1,
    "unlockQuestionIds": [
      "abstract-nailong"
    ],
    "attributes": {
      "intelligence": 19,
      "social": 55,
      "motivation": 25,
      "obedience": 65,
      "stability": 65,
      "weirdness": 91
    },
    "answers": {
      "common-experience": "呵呵哈哈哈哈哈哈哈。",
      "common-teamwork": "呵呵哈哈哈哈哈哈哈。",
      "common-difficulty": "呵呵哈哈哈哈哈哈哈。",
      "common-overtime": "呵呵哈哈哈哈哈哈哈。",
      "abstract-seagull": "呵呵哈哈哈哈哈哈哈。",
      "abstract-ants": "呵呵哈哈哈哈哈哈哈。",
      "abstract-kfc": "呵呵哈哈哈哈哈哈哈。",
      "abstract-anime": "呵呵哈哈哈哈哈哈哈。",
      "abstract-pigeon": "呵呵哈哈哈哈哈哈哈。",
      "abstract-ai": "呵呵哈哈哈哈哈哈哈。",
      "common-reason": "呵呵哈哈哈哈哈哈哈。",
      "abstract-elevator": "呵呵哈哈哈哈哈哈哈。",
      "abstract-plant": "呵呵哈哈哈哈哈哈哈。",
      "common-education": "呵呵哈哈哈哈哈哈哈。",
      "common-hobby": "呵呵哈哈哈哈哈哈哈。",
      "common-nopayment": "呵呵哈哈哈哈哈哈哈。",
      "common-fit": "呵呵哈哈哈哈哈哈哈。",
      "abstract-nailong": "我是奶龙！我才是奶龙！",
      "common-english": "呵呵哈哈哈哈哈哈哈。",
      "abstract-redlight": "呵呵哈哈哈哈哈哈哈。",
      "abstract-gay": "呵呵哈哈哈哈哈哈哈。",
      "abstract-language": "呵呵哈哈哈哈哈哈哈。",
      "abstract-water": "呵呵哈哈哈哈哈哈哈。",
      "abstract-icecream": "呵呵哈哈哈哈哈哈哈。"
    }
  },
  {
    "id": "ha-jimi",
    "name": "哈基米",
    "resume": "老吴，老吴，那个那个",
    "baseWeight": 1,
    "unlockQuestionIds": [
      "abstract-plant"
    ],
    "attributes": {
      "intelligence": 20,
      "social": 15,
      "motivation": 80,
      "obedience": 45,
      "stability": 90,
      "weirdness": 85
    },
    "answers": {
      "common-experience": "哈！",
      "common-teamwork": "哈！（歪头）",
      "common-difficulty": "哈！（棘背龙形态）",
      "common-overtime": "嘶。嘶。嘶。（抓）",
      "abstract-seagull": "哈！",
      "abstract-ants": "老吴！老吴！",
      "abstract-kfc": "老吴！老吴！",
      "abstract-anime": "嗷呜（夹子音）",
      "abstract-pigeon": "嗷呜（夹子音）",
      "abstract-plant": "嗷呜（夹子音）（蹭蹭）",
      "abstract-ai": "（舔毛）",
      "common-reason": "嗷呜（夹子音）（蹭蹭）",
      "abstract-elevator": "（舔毛）",
      "common-education": "老吴！",
      "common-hobby": "哈！",
      "common-nopayment": "哈。哈。哈。（抓）",
      "common-fit": "（舔毛）",
      "abstract-nailong": "嗷呜（夹子音）（蹭蹭）",
      "common-english": "嗷呜（夹子音）（蹭蹭）",
      "abstract-redlight": "（歪头）",
      "abstract-gay": "（舔毛）",
      "abstract-language": "（舔毛）",
      "abstract-water": "（舔毛）",
      "abstract-icecream": "（舔毛）"
    }
  },
  {
    "id": "guzhangji",
    "name": "顾丈机",
    "resume": "他说话很奇怪，总会重复若干次，总会重复若干，总会重复若，总会重复；不过，每天刚来上班的时候还挺精力集中的。",
    "baseWeight": 1,
    "unlockQuestionIds": [
      "common-fit"
    ],
    "attributes": {
      "intelligence": 89,
      "social": 55,
      "motivation": 89,
      "obedience": 78,
      "stability": 66,
      "weirdness": 49
    },
    "answers": {
      "common-experience": "在观者10分钟爬塔的同时，我锲而不舍地刷了10把初始了。",
      "common-teamwork": "通常我会先让他们等等我，等我启动，但启动之后Boss已经死了。",
      "common-difficulty": "面对心脏，我首先打了一把，快死的时候使用了SL，又过了一段时间，不知道为什么游戏没有音乐了。总之我的牌序和药水都穷举了一遍，最终开了下一把。",
      "abstract-anime": "我有娘化图。",
      "abstract-ai": "使用创造性AI的话，还是比较难击败觉醒者。",
      "abstract-elevator": "电梯看见我就不需要我讲笑话了。",
      "abstract-plant": "吓哭了，8x3 8x3来了，我的烟雾弹呢。",
      "common-hobby": "碎片整理。碎片整理。",
      "common-nopayment": "和我的万物一心说去吧。",
      "abstract-icecream": "费用可以保留，南极也能通用。"
    }
  }
];

  const ARCHETYPES = [
  {
    "id": "perfect-resume",
    "name": "大佬",
    "resume": "你招到了一个成熟、有能力的人。与其说是卷怪，不如说是一个精英。",
    "baseWeight": 3,
    "baseAttributes": {
      "intelligence": 80,
      "social": 90,
      "motivation": 90,
      "obedience": 90,
      "stability": 85,
      "weirdness": 20
    }
  },
  {
    "id": "abnormal-genius",
    "name": "非正常天才",
    "resume": "ta沉默寡言，但突破了困扰公司多年的技术瓶颈。有时候ta衣冠不整地来上班，但大家已习以为常。有人说ta是神，有人说他是鬼。",
    "baseWeight": 3,
    "baseAttributes": {
      "intelligence": 100,
      "social": 26,
      "motivation": 70,
      "obedience": 63,
      "stability": 72,
      "weirdness": 80
    }
  },
  {
    "id": "indifferent",
    "name": "躺平摆烂",
    "resume": "ta入职后像一个刷新在工位的NPC，没有做成什么事情，只是占了一个位置。作者也很想这样躺平摆烂。",
    "baseWeight": 6,
    "baseAttributes": {
      "intelligence": 35,
      "social": 57,
      "motivation": 44,
      "obedience": 90,
      "stability": 90,
      "weirdness": 15
    }
  },
  {
    "id": "abstract-artist",
    "name": "神人",
    "resume": "ta来公司的第一天带了一个音响播放《雨爱》（司凤版）。好像你招到了个神人，不知道后面会发生什么。",
    "baseWeight": 4,
    "baseAttributes": {
      "intelligence": 46,
      "social": 78,
      "motivation": 48,
      "obedience": 34,
      "stability": 60,
      "weirdness": 100
    }
  },
  {
    "id": "reliable-quirky",
    "name": "地雷",
    "resume": "ta的面试无懈可击，但入职第一天就和同事吵了起来，还砸烂了同事的显示器。办事能力好像也不太行。你好像招到了个专攻面试演戏的演员。",
    "baseWeight": 6,
    "baseAttributes": {
      "intelligence": 49,
      "social": 28,
      "motivation": 32,
      "obedience": 43,
      "stability": 27,
      "weirdness": 79
    }
  },
  {
    "id": "team-anchor",
    "name": "低调大神",
    "resume": "ta的简历和面试并不突出，但为公司创造了很多长期价值。老板说你“挖到宝了”。",
    "baseWeight": 5,
    "baseAttributes": {
      "intelligence": 82,
      "social": 68,
      "motivation": 90,
      "obedience": 96,
      "stability": 95,
      "weirdness": 15
    }
  },
  {
    "id": "social-overflow",
    "name": "社牛",
    "resume": "ta是团建之星，还化解了许多公司小团体的矛盾。虽然办事马马虎虎，但大家吃饭都愿意带上ta。",
    "baseWeight": 6,
    "baseAttributes": {
      "intelligence": 45,
      "social": 95,
      "motivation": 72,
      "obedience": 60,
      "stability": 55,
      "weirdness": 65
    }
  },
  {
    "id": "quiet-saver",
    "name": "实力躺平",
    "resume": "后面你才知道，ta其实非常聪明，办事也不错，但美中不足的就是下午5点准时便走了，微信也联系不上了。",
    "baseWeight": 5,
    "baseAttributes": {
      "intelligence": 75,
      "social": 69,
      "motivation": 25,
      "obedience": 70,
      "stability": 90,
      "weirdness": 9
    }
  },
  {
    "id": "normal-employee",
    "name": "普通上班族",
    "resume": "每晚11点上床睡觉，确保睡足8小时。睡前喝一杯温牛奶，做20分钟的伸展运动来放松身体，然后安心入睡，直至天明。",
    "baseWeight": 6,
    "baseAttributes": {
      "intelligence": 50,
      "social": 50,
      "motivation": 50,
      "obedience": 50,
      "stability": 50,
      "weirdness": 0
    }
  }
];

  const NAME_POOLS = {
  "surnames": [
    "林",
    "陈",
    "张",
    "李",
    "王",
    "赵",
    "周",
    "吴",
    "郑",
    "孙",
    "罗",
    "唐",
    "许",
    "韩",
    "冯",
    "曹",
    "彭",
    "萧",
    "蔡",
    "潘",
    "史"
  ],
  "givenNames": [
    "一凡",
    "子墨",
    "雨桐",
    "思远",
    "嘉树",
    "明溪",
    "知夏",
    "景行",
    "以宁",
    "清越",
    "星野",
    "望舒",
    "亦辰",
    "书瑶",
    "若愚",
    "南絮",
    "可盈",
    "云舟",
    "乐言",
    "安然",
    "小满",
    "听澜",
    "见山",
    "初晴",
    "珍香"
  ]
};

  const ARCHETYPE_ANSWERS = {
  "perfect-resume": {
    "common-difficulty": [
      "上段经历已经圆满完成了既定目标，我希望寻找一个与职业规划更匹配的平台。"
    ]
  },
  "abstract-artist": {
    "abstract-plant": [
      "errrrn，（咚！）zombies are coming……一大波僵尸正在接近！！啪啪啪啪，啪啪啪啪，（卜！（僵尸头落地声音））"
    ]
  },
  "normal-employee": {
    "common-overtime": [
      "我没有什么看法，老板有就可以。"
    ]
  },
  "reliable-quirky": {
    "common-experience": [
      "之前的项目背景大概是公司系统运行低效。我解决了这个问题，通过先提出解决方案，再了解问题背景的方式。"
    ],
    "common-difficulty": [
      "有一个新领域的任务我无从下手，通过搜寻资料、问AI、求助他人，我逐渐形成了对任务的认知和解决思路，随后把任务给别人了，最终完成了任务。"
    ],
    "common-teamwork": [
      "我让每个人认领最擅长的部分。收集一下大家不配合的原因和意见，然后汇报给老板。"
    ],
    "common-overtime": [
      "加班就是公司有需求， 关键节点我会主动顶上，也会同步把低效的原因解决掉。你知道吗，我非常喜欢加班，为公司付出就收获快乐。"
    ],
    "common-education": [
      "我本硕都就读于北京大学。嗯因为这个模拟器的设定里没有学信网，所以我补充一下，我觉得我们学校农园襄阳牛肉面挺好吃的。"
    ]
  }
};

  const ATTRIBUTE_ANSWERS = {
  "common-experience": [
    {
      "attribute": "intelligence",
      "min": 75,
      "probability": 0.8,
      "text": "之前的项目背景大概是公司系统运行低效。我先定位最关键的问题，再验证方案，最后把复盘整理成了可复用的文档。"
    },
    {
      "attribute": "intelligence",
      "max": 30,
      "probability": 0.8,
      "text": "项目需求改了七次，我每次都勇敢地从头再做一遍。"
    }
  ],
  "common-teamwork": [
    {
      "attribute": "social",
      "min": 75,
      "probability": 0.8,
      "text": "我会先确认共同目标，再让每个人认领最擅长的部分。收集一下大家不配合的原因和意见，解答好个人的疑问。"
    },
    {
      "attribute": "social",
      "max": 25,
      "probability": 0.8,
      "text": "我会去找公司董事长告状，这同事不配合工作，快点辞退他。"
    }
  ],
  "common-difficulty": [
    {
      "attribute": "intelligence",
      "min": 75,
      "probability": 0.8,
      "text": "有一个新领域的任务我无从下手，通过搜寻资料、问AI、求助他人，我逐渐形成了对任务的认知和解决思路，随后边尝试边迭代，最终完成了任务。"
    },
    {
      "attribute": "intelligence",
      "max": 40,
      "probability": 0.8,
      "text": "考试难度比较高，我买了许多学长学姐的笔记，都扫了一遍进行复习。我把我的笔记改的非常工整漂亮。"
    }
  ],
  "common-overtime": [
    {
      "attribute": "motivation",
      "min": 75,
      "probability": 0.8,
      "text": "加班就是公司有需求， 关键节点我会主动顶上，也会同步把低效的原因解决掉。"
    },
    {
      "attribute": "motivation",
      "max": 30,
      "probability": 0.8,
      "text": "加班可以，工作不行。"
    }
  ],
  "abstract-seagull": [
    {
      "attribute": "weirdness",
      "min": 80,
      "probability": 0.8,
      "text": "啊啊啊，嗷嗷！！嗷！嗷嗷啊~！薯条，。薯条，，。"
    },
    {
      "attribute": "weirdness",
      "max": 20,
      "probability": 0.8,
      "text": "我会考虑具体情况，去分析一下我应该如何面对这个选择吧。"
    }
  ],
  "abstract-ants": [
    {
      "attribute": "obedience",
      "min": 80,
      "probability": 0.8,
      "text": "如果集体目标清晰，我也可以成为一只靠谱的蚂蚁。"
    },
    {
      "attribute": "obedience",
      "max": 30,
      "probability": 0.8,
      "text": "贵司可真是擅长PUA呢，你真是大聪明，好棒棒啊，看见你就像看见你们化粪池一样的工作风气，那我可得快躲远点。"
    }
  ],
  "abstract-kfc": [
    {
      "attribute": "weirdness",
      "min": 80,
      "probability": 0.8,
      "text": "你知道炸77秒的薯条和炸78秒的薯条的口感差别吗？我凭借照片就可以看出薯条炸了几秒。我只去炸薯条91秒的快餐店吃。"
    },
    {
      "attribute": "weirdness",
      "max": 30,
      "probability": 0.8,
      "text": "我一般换着吃，想吃特定产品了就去对应那家吃咯。"
    }
  ],
  "abstract-anime": [
    {
      "attribute": "weirdness",
      "min": 80,
      "probability": 0.8,
      "text": "我之前穿着痛衣问喜欢的女孩子要不要成为痛衣上的角色。"
    },
    {
      "attribute": "weirdness",
      "max": 20,
      "probability": 0.8,
      "text": "我对二次元了解不多，不过可以回去写一份竞品分析。"
    }
  ],
  "abstract-pigeon": [
    {
      "attribute": "weirdness",
      "min": 60,
      "probability": 0.8,
      "text": "和平鸽。"
    },
    {
      "attribute": "weirdness",
      "max": 48,
      "probability": 0.8,
      "text": "啊，这个我确实不太清楚。可能是日本的鸽子有一些特殊的文化，我可以后面去学习。"
    }
  ],
  "abstract-ai": [
    {
      "attribute": "motivation",
      "max": 30,
      "probability": 0.8,
      "text": "AI 上班也是上，我作为它的精神导师可以远程存在。"
    },
    {
      "attribute": "motivation",
      "min": 80,
      "probability": 0.8,
      "text": "会来，省下来的时间正好可以做那些一直没时间优化的工作。"
    }
  ],
  "common-reason": [
    {
      "attribute": "social",
      "min": 75,
      "probability": 0.8,
      "text": "首先是贵司的平台很好，可以提升我的能力；同时，我也契合岗位的要求，我提前了解了贵司的产品和团队，也整理了几个我能立即参与的具体方向。"
    },
    {
      "attribute": "social",
      "max": 30,
      "probability": 0.8,
      "text": "主要因为你们正在招聘，而我正在找工作，我们之间的匹配度已经非常高了。"
    }
  ],
  "abstract-elevator": [
    {
      "attribute": "weirdness",
      "min": 70,
      "probability": 0.8,
      "text": "如果铁锅炖需要融合西餐，那我觉得瓦片亟需进一步踩碎，阿凡达，我喜欢玩phigros。"
    },
    {
      "attribute": "weirdness",
      "max": 30,
      "probability": 0.8,
      "text": "这个，我大概，我不清楚，嗯，我可能去爬楼梯吧。"
    }
  ],
  "abstract-plant": [
    {
      "attribute": "weirdness",
      "min": 70,
      "probability": 0.8,
      "text": "你的光合作用产氧量就这水平？我对你很失望。你看外面的植物都在疯狂产氧，你需要反思。"
    },
    {
      "attribute": "weirdness",
      "max": 30,
      "probability": 0.8,
      "text": "啊？这个。我觉得大家的意见都比较重要，就是。"
    }
  ],
  "common-education": [
    {
      "attribute": "intelligence",
      "min": 75,
      "max": 90,
      "probability": 0.8,
      "text": "我本科就读于某双一流大学某某专业，后续考研到某双一流大学进一步学习，毕业时取得硕士学位。"
    },
    {
      "attribute": "intelligence",
      "max": 30,
      "probability": 0.8,
      "text": "我小学是在那里上的，初中在那附近。对，大概是这样。"
    },
    {
      "attribute": "intelligence",
      "min": 90,
      "probability": 0.8,
      "text": "我本硕都就读于北京大学。嗯因为这个模拟器的设定里没有学信网，所以我补充一下，我觉得我们学校学一襄阳牛肉面挺好吃的。"
    }
  ],
  "common-hobby": [
    {
      "attribute": "weirdness",
      "min": 80,
      "probability": 0.8,
      "text": "同龄人：玩游戏，追剧，看小说，逛街，旅游。我：学习黑客技术，掌握量化交易，分析全球文化底层逻辑，就很……你们懂吧。"
    },
    {
      "attribute": "weirdness",
      "max": 40,
      "probability": 0.8,
      "text": "看书、散步，偶尔看看电影，都是比较容易长期保持的爱好。"
    }
  ],
  "common-nopayment": [
    {
      "attribute": "obedience",
      "min": 75,
      "probability": 0.8,
      "text": "作为员工，我应该把自己的个人利益和公司利益对齐，设身处地为整体大局着想。我的努力不是内卷，而是带动大家一起前进。"
    },
    {
      "attribute": "obedience",
      "max": 30,
      "probability": 0.8,
      "text": "注意啦！无良公司，无良公司，老板欠下三点五个亿，还要我们无偿加班，"
    }
  ],
  "common-fit": [
    {
      "attribute": "social",
      "min": 75,
      "probability": 0.8,
      "text": "我能快速拆解问题、验证结果并把经验整理成团队可以复用的流程。我也擅长沟通协作，融入团队很快。"
    },
    {
      "attribute": "social",
      "max": 30,
      "probability": 0.8,
      "text": "JD 上的技能我大部分都见过，其中一些还成功拼读出来了。不过我不知道这个Microsoft PowerPoint是什么软件。"
    }
  ],
  "abstract-nailong": [
    {
      "attribute": "weirdness",
      "min": 70,
      "probability": 0.8,
      "text": "我是奶龙！我才是奶龙！我会喷火，你会吗？啊？噗。我还会变色呢！嘟嘟嘟嘟剫可恶！你竟然都会！"
    },
    {
      "attribute": "weirdness",
      "max": 30,
      "probability": 0.8,
      "text": "听说过这个形象，但了解不多，我后面可以多了解一下咱们公司的特色。"
    }
  ],
  "common-english": [
    {
      "attribute": "intelligence",
      "min": 75,
      "probability": 0.8,
      "text": "The lecture is mainly about a biological process, including its mechanism and the examples used to explain it."
    },
    {
      "attribute": "intelligence",
      "max": 30,
      "probability": 0.8,
      "text": "Sorry，嗯，爱，爱，看，特，什么来着。英文。嗯，嗯！！"
    }
  ],
  "abstract-redlight": [
    {
      "attribute": "obedience",
      "min": 80,
      "probability": 0.8,
      "text": "我不会闯红灯或随意横穿马路，规则和别人的安全都应该被认真对待。"
    },
    {
      "attribute": "obedience",
      "max": 30,
      "probability": 0.8,
      "text": "你听说过老北京过马路吗？没有？你个臭外地的"
    }
  ],
  "abstract-gay": [
    {
      "attribute": "social",
      "min": 75,
      "probability": 0.8,
      "text": "我会自然结束当前沟通，给领导保留隐私，不传播也不追问。"
    },
    {
      "attribute": "social",
      "max": 30,
      "probability": 0.8,
      "text": "我会说：公司的团队建设确实很有凝聚力。"
    },
    {
      "attribute": "weirdness",
      "min": 80,
      "probability": 0.8,
      "text": "我会说：公司的团队建设确实很有凝聚力。"
    }
  ],
  "abstract-language": [
    {
      "attribute": "intelligence",
      "min": 0,
      "max": 0,
      "probability": 0.8,
      "text": "比如“内卷”，两个字就能概括一种需要长篇古文才能说明的复杂竞争状态。"
    },
    {
      "attribute": "intelligence",
      "max": 30,
      "probability": 0.8,
      "text": "古文有什么例子？哦对，鹅鹅鹅，曲项向天歌。"
    },
    {
      "attribute": "weirdness",
      "min": 70,
      "probability": 0.8,
      "text": "“前无古人，后无来者”\n“震撼首发”"
    }
  ],
  "abstract-water": [
    {
      "attribute": "social",
      "min": 75,
      "probability": 0.8,
      "text": "把水放到一个水壶里，放到桌上说大家需要的话，为大家准备了茶歇，可以自取。"
    },
    {
      "attribute": "social",
      "max": 30,
      "probability": 0.8,
      "text": "来一个领导给一杯，后面没来的告诉他“迟到！工作不积极！你是第x个来的，前五个来的有水喝，你这里没了。对了，我是新员工xxx，以后你得好好提拔我。”"
    }
  ],
  "abstract-icecream": [
    {
      "attribute": "intelligence",
      "min": 75,
      "probability": 0.8,
      "text": "这是个典型的没有需求创造需求的问题。我们要先分析南极的市场情况，分析可能的需求点，比如室内等场景，用SWOT法研究我们切入的思路。"
    },
    {
      "attribute": "intelligence",
      "max": 30,
      "probability": 0.8,
      "text": "可以给企鹅吃，他们可能需要补充淡水和糖分"
    }
  ]
};

  const NEWS_TEMPLATES = [
  {
    "id": "intelligence-low-requirements",
    "attribute": "intelligence",
    "direction": "low",
    "threshold": 30,
    "title": "一个需求，七种理解",
    "text": "本月公司收到一句“把页面做得简单一点”。员工们交出了七套方案，其中三套需要量子计算机，两套没有页面，剩下两套正在争论“简单”是不是一种颜色。"
  },
  {
    "id": "intelligence-high-solutions",
    "attribute": "intelligence",
    "direction": "high",
    "threshold": 70,
    "title": "技术方案意外出圈",
    "text": "团队顺手解决了一个困扰行业多年的难题。外界纷纷打听你们到底招了什么人，只有 HR 知道，其中一人的面试回答还和海鸥有关。"
  },
  {
    "id": "social-low-silence",
    "attribute": "social",
    "direction": "low",
    "threshold": 30,
    "title": "全公司都在已读不回",
    "text": "本周会议再次刷新最短纪录：主持人问完“大家有想法吗”后，全员同时低头。客户发来的消息倒是回复了，回复内容是员工不小心发出的一个句号。"
  },
  {
    "id": "social-high-cooperation",
    "attribute": "social",
    "direction": "high",
    "threshold": 70,
    "title": "客户开始主动约饭",
    "text": "公司的跨部门会议突然变得异常顺畅，连商务合作都自己找上门来。前台不得不新增一条登记事项：来访者究竟是谈合作，还是单纯喜欢和你们聊天。"
  },
  {
    "id": "motivation-low-slacking",
    "attribute": "motivation",
    "direction": "low",
    "threshold": 30,
    "title": "每天实际工作 20 分钟",
    "text": "你发现你们公司的卫生间隔间越来越紧俏了——后面大家都不演了，在工位上开始摸鱼，一款叫做《校招模拟器》的游戏开始流行。经统计，你的员工们每天实际工作时间竟高达 20 分钟！！"
  },
  {
    "id": "motivation-high-tasks",
    "attribute": "motivation",
    "direction": "high",
    "threshold": 70,
    "title": "任务开始自己消失",
    "text": "员工们最近总在主动认领任务，待办列表刚刷新就又被清空。HR 被迫反复确认：他们究竟是真的热爱工作，还是在背着公司进行某种效率竞赛。"
  },
  {
    "id": "obedience-low-chaos",
    "attribute": "obedience",
    "direction": "low",
    "threshold": 30,
    "title": "公司安排成了选修课",
    "text": "本周每个人都按照自己的理解执行任务。会议通知被当成写作灵感，项目排期被当成许愿清单，只有下班时间得到了全公司最一致地遵守。"
  },
  {
    "id": "obedience-high-typo",
    "attribute": "obedience",
    "direction": "high",
    "threshold": 70,
    "title": "全员执行了老板的口误",
    "text": "老板在会上随口说了句“要不先把会议室漆成绿色”，下午回来时发现采购、设计和施工已经全部完成。执行力的确惊人，只是以后发言最好先过一遍脑子。"
  },
  {
    "id": "stability-low-empty-desks",
    "attribute": "stability",
    "direction": "low",
    "threshold": 30,
    "title": "工位开始按天出租",
    "text": "本月员工流动速度快到门卡来不及注销。行政部决定不再打印固定姓名牌，改用可擦写白板；保洁阿姨则成了目前工龄最长的工作人员。"
  },
  {
    "id": "stability-high-no-new-blood",
    "attribute": "stability",
    "direction": "high",
    "threshold": 70,
    "title": "新员工成了稀有动物",
    "text": "团队人员稳定得令人安心，茶水间里甚至还能讨论十年前的老项目。唯一的问题是，每当有新面孔出现，大家都会自动围过去确认他是不是走错了公司。"
  },
  {
    "id": "weirdness-low-normal",
    "attribute": "weirdness",
    "direction": "low",
    "threshold": 30,
    "title": "公司正常得令人起疑",
    "text": "本月没有人穿着奇怪服装上班，没有人给打印机起名字，也没有人试图给植物做绩效面谈。公司正常得让 HR 开始怀疑，大家是不是在偷偷准备一件更大的事。"
  },
  {
    "id": "weirdness-high-legend",
    "attribute": "weirdness",
    "direction": "high",
    "threshold": 70,
    "title": "本公司已成为都市传说",
    "text": "据说午夜十二点，办公室会有人用海鸥叫声主持复盘。保安表示确有其事，但复盘纪要写得非常专业，目前无人能判断这究竟算异常事件还是企业文化。"
  },
  {
    "id": "intelligence-normal-month",
    "attribute": "intelligence",
    "direction": "normal",
    "title": "需求评审平稳结束",
    "text": "本月的方案只返工了两次，团队认为这已经是值得纪念的进步。智力相关指标还有提升空间，但至少现在大家知道该先听谁把话说完。"
  },
  {
    "id": "social-normal-month",
    "attribute": "social",
    "direction": "normal",
    "title": "会议恢复了基本对话",
    "text": "本月会议有人提问，也有人回答，虽然有时并不是回答同一个问题。总体而言，公司沟通仍在可控范围内缓慢前进。"
  },
  {
    "id": "motivation-normal-month",
    "attribute": "motivation",
    "direction": "normal",
    "title": "待办事项正在陆续减少",
    "text": "员工们维持着一种不拼命也不彻底躺平的工作节奏。任务能够完成，工位也并非只用来放外套，人事部决定暂时不打扰这种平衡。"
  },
  {
    "id": "obedience-normal-month",
    "attribute": "obedience",
    "direction": "normal",
    "title": "公司通知基本有人执行",
    "text": "本月大部分安排都得到了落实，少数安排被员工创造性地理解。管理层正在学习把话说明白，员工也在学习偶尔按字面意思行动。"
  },
  {
    "id": "stability-normal-month",
    "attribute": "stability",
    "direction": "normal",
    "title": "工位上的面孔没有明显变化",
    "text": "团队本月没有出现大规模人员波动。有人开始规划长期目标，也有人只是终于记住了 Wi-Fi 密码，无论哪种都值得记录。"
  },
  {
    "id": "weirdness-normal-month",
    "attribute": "weirdness",
    "direction": "normal",
    "title": "本月只有少量异常事件",
    "text": "办公室大体正常，只是打印机偶尔被称为“出版总监”。除此之外，公司尚未出现需要专门成立调查组的新情况。"
  }
];

  const ENDINGS = {
  "ace-company": {
    "title": "王牌公司",
    "subtitle": "不靠离谱出圈，也能把实力变成招牌。",
    "description": "智力与社交积累足够扎实，积极性、服从度和稳定性也都在可靠水平线上，神人指数还被控制在合理范围内。你组建的是一支真正能持续交付的队伍，而不是一份看起来很热闹的招聘战报。"
  },
  "unusual-company": {
    "title": "神人公司",
    "subtitle": "实力和神人指数一起突破天花板。",
    "description": "公司的智力、社交和神人积累都达到了惊人水平，团队还能保持基本的工作秩序。外界已经无法判断你们究竟是正常企业，还是一种尚未被行业命名的新型组织。"
  },
  "extreme-efficiency": {
    "title": "极致高效",
    "subtitle": "没有太多人，但每个人都让事情向前推进。",
    "description": "智力、社交、积极性、服从度和稳定性的均值全部达到高标准。任务分配清楚，执行顺畅，团队稳定，公司用一套近乎理想的状态完成了本轮经营。"
  },
  "regret-exit": {
    "title": "遗憾退场",
    "subtitle": "有些底线，一旦跌破就没有下一月。",
    "description": "服从度或稳定性的均值跌破了公司能够承受的最低水平。团队无法维持基本协作与持续运转，你只能终止本轮经营，把剩下的简历整理好，等待下一次重新开始。"
  },
  "weirdness-code": {
    "title": "神人山代码",
    "subtitle": "代码堆成了山，神人也一个没少。",
    "description": "智力、社交和神人积累同时达到高位，团队仍然保有可接受的工作状态。公司开始形成一种奇特的技术氛围：问题很离谱，方案很有效，没人知道下一行代码会写出什么。"
  },
  "happy-workstations": {
    "title": "工位欢乐多",
    "subtitle": "上班像开盲盒，工位永远不缺节目。",
    "description": "神人指数均值高到已经无法被日常管理掩盖。工位上每天都有新情况发生，员工是否稳定完成工作已经不那么容易判断，但至少办公室绝对不会无聊。"
  },
  "quantity-victory": {
    "title": "以量取胜",
    "subtitle": "一个人解决不了，就先组织一群人。",
    "description": "公司人数和智力、社交积累形成了规模优势。单个员工未必都能独当一面，但当足够多的人被组织到一起，团队依然能用数量把问题一点点磨掉。"
  },
  "normal-operation": {
    "title": "正常运行",
    "subtitle": "没有惊天逆转，公司照常向前。",
    "description": "智力、社交和神人指数都处于可控区间，积极性、服从度与稳定性也达到基本要求。公司没有成为传奇，但能够稳定运转，这已经是本轮经营非常实在的成果。"
  },
  "struggling-company": {
    "title": "捉襟见肘",
    "subtitle": "还能撑住，只是每一项资源都不太宽裕。",
    "description": "智力与社交略有积累，团队状态勉强达到底线，神人指数尚未彻底失控。公司能够继续运转，却始终需要小心翼翼地在人员、效率和秩序之间寻找余地。"
  },
  "hr-pay-cut": {
    "title": "HR 降薪",
    "subtitle": "公司还在，但你的绩效说明一切。",
    "description": "团队达到了最低规模，智力与社交却只有勉强支撑经营的水平，工作状态也称不上出色。公司决定暂时不追究招聘过程，只从你的工资里体现出一点直观反馈。"
  },
  "empty-applications": {
    "title": "门可罗雀",
    "subtitle": "招聘渠道很安静，公司更加安静。",
    "description": "当前没有任何员工。不是候选人不够优秀，而是你最终没有让任何人留下。办公室灯还亮着，只是门外的脚步声越来越少，HR 需要重新考虑自己的录用标准。"
  },
  "resign-company": {
    "title": "引咎辞职",
    "subtitle": "这一次，需要被优化的是招聘负责人。",
    "description": "智力或社交积累不足，或者团队的工作状态跌破了最低要求。面对这份无法向管理层解释的经营结果，你只能承认招聘判断出了问题，并主动交出 HR 的工牌。"
  },
  "strict-recruitment": {
    "title": "严格录用",
    "subtitle": "人不多，但每一个决定都很谨慎。",
    "description": "公司人数始终保持在很少的规模。你更倾向于谨慎筛选，而不是用扩张掩盖问题。这样的策略能够控制风险，也意味着团队必须用有限的人手完成接下来的所有工作。"
  },
  "standard": {
    "title": "六个月经营结束",
    "subtitle": "公司还在，招聘也还要继续。",
    "description": "本轮六个月经营已经结束，没有触发特殊结局。公司依旧照常运转，员工们也大多记得自己来这里上班。下一轮招聘仍然值得尝试，也许会出现完全不同的结果。"
  }
};

function shuffle(items) {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
    }
    return result;
  }

function getQualityScore(candidate) {
    const keys = ["intelligence", "social", "motivation", "stability"];
    return keys.reduce((sum, key) => sum + candidate.attributes[key], 0) / keys.length;
  }

function isHighQuality(candidate) {
    return getQualityScore(candidate) >= CONFIG.recruitment.highQualityThreshold;
  }

function getAttractionBonus(highQualityHires) {
    return Math.min(
      highQualityHires * CONFIG.recruitment.attractionBonusPerHire,
      CONFIG.recruitment.attractionMaxBonus
    );
  }

function weightedPick(items, highQualityHires, getAttributes) {
    const attractionMultiplier = 1 + getAttractionBonus(highQualityHires);
    const weights = items.map((item) => {
      const baseWeight = item.baseWeight || 1;
      const highQuality = isHighQuality({ attributes: getAttributes(item) });
      return baseWeight * (highQuality ? attractionMultiplier : 1);
    });
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let ticket = Math.random() * totalWeight;

    for (let index = 0; index < items.length; index += 1) {
      ticket -= weights[index];
      if (ticket < 0) {
        return items[index];
      }
    }
    return items[items.length - 1];
  }

function getArchetypeName(candidate) {
    if (!candidate.archetypeId) {
      return "固定角色";
    }
    const archetype = ARCHETYPES.find((item) => item.id === candidate.archetypeId);
    return archetype ? archetype.name : "未知原型";
  }

function rollAttributes(baseAttributes) {
    const variance = CONFIG.recruitment.attributeVariance;
    const attributes = {};
    ATTRIBUTES.forEach(({ key }) => {
      const offset = Math.floor(Math.random() * (variance * 2 + 1)) - variance;
      attributes[key] = Math.max(0, Math.min(100, baseAttributes[key] + offset));
    });
    return attributes;
  }

function createGeneratedCandidate(month, index, usedNames, highQualityHires) {
    const archetype = weightedPick(ARCHETYPES, highQualityHires, (item) => item.baseAttributes);
    let name = "";
    for (let attempt = 0; attempt < 12; attempt += 1) {
      name = `${NAME_POOLS.surnames[Math.floor(Math.random() * NAME_POOLS.surnames.length)]}${NAME_POOLS.givenNames[Math.floor(Math.random() * NAME_POOLS.givenNames.length)]}`;
      if (!usedNames.has(name)) {
        break;
      }
    }
    usedNames.add(name);

    return {
      id: `m${month}-generated-${index}`,
      baseId: "generated",
      name,
      archetypeId: archetype.id,
      resume: archetype.resume,
      unlockQuestionIds: [],
      attributes: rollAttributes(archetype.baseAttributes),
      answers: {},
      isGenerated: true
    };
  }

function createMonthlyCandidates(month, highQualityHires = 0) {
    const fixedPool = [...CANDIDATES];
    const selected = [];
    const usedNames = new Set();

    for (let index = 0; index < CONFIG.candidatesPerMonth; index += 1) {
      const useFixed = fixedPool.length > 0
        && Math.random() < CONFIG.recruitment.fixedCandidateProbability;

      if (useFixed) {
        const candidate = weightedPick(fixedPool, highQualityHires, (item) => item.attributes);
        fixedPool.splice(fixedPool.indexOf(candidate), 1);
        selected.push({
          ...candidate,
          id: `m${month}-${candidate.id}`,
          baseId: candidate.id,
          unlockQuestionIds: [...(candidate.unlockQuestionIds || [])],
          attributes: { ...candidate.attributes },
          answers: { ...candidate.answers },
          isGenerated: false
        });
        usedNames.add(candidate.name);
      } else {
        selected.push(createGeneratedCandidate(month, index, usedNames, highQualityHires));
      }
    }

    return selected;
  }

function createMonthlyQuestions(unlockedQuestionIds = []) {
    const isAvailable = (question) => !question.unlockOnly
      || unlockedQuestionIds.includes(question.id);
    const commonQuestions = QUESTIONS.filter((question) => question.type === "common" && isAvailable(question));
    const abstractQuestions = shuffle(QUESTIONS.filter((question) => question.type === "abstract" && isAvailable(question)))
      .slice(0, CONFIG.abstractQuestionsPerMonth);
    return [...commonQuestions, ...abstractQuestions];
  }

function resolveAnswer(candidate, question) {
    if (candidate.answers[question.id]) {
      return { text: candidate.answers[question.id], source: "exclusive" };
    }

    const archetypeAnswers = candidate.archetypeId
      && ARCHETYPE_ANSWERS[candidate.archetypeId]
      && ARCHETYPE_ANSWERS[candidate.archetypeId][question.id];
    if (archetypeAnswers && archetypeAnswers.length > 0) {
      return {
        text: archetypeAnswers[Math.floor(Math.random() * archetypeAnswers.length)],
        source: "archetype"
      };
    }

    const variants = ATTRIBUTE_ANSWERS[question.id] || [];
    const matchingVariants = variants.filter((rule) => {
      const value = candidate.attributes[rule.attribute];
      const meetsMinimum = rule.min === undefined || value >= rule.min;
      const meetsMaximum = rule.max === undefined || value <= rule.max;
      return meetsMinimum && meetsMaximum;
    });

    if (matchingVariants.length > 0) {
      const selected = matchingVariants[Math.floor(Math.random() * matchingVariants.length)];
      const probability = selected.probability === undefined ? 1 : selected.probability;
      if (Math.random() < probability) {
        return { text: selected.text, source: "attribute" };
      }

      const alternatives = variants
        .filter((rule) => rule !== selected)
        .map((rule) => ({ text: rule.text, source: "attribute" }));
      alternatives.push({ text: question.fallback, source: "fallback" });
      return alternatives[Math.floor(Math.random() * alternatives.length)];
    }

    return { text: question.fallback, source: "fallback" };
  }

function validate() {
    const questionIds = QUESTIONS.map((question) => question.id);
    if (new Set(questionIds).size !== questionIds.length) {
      throw new Error("问题 ID 不能重复。");
    }

    const candidateIds = CANDIDATES.map((candidate) => candidate.id);
    if (new Set(candidateIds).size !== candidateIds.length) {
      throw new Error("固定角色 ID 不能重复。");
    }

    const archetypeIds = ARCHETYPES.map((archetype) => archetype.id);
    if (new Set(archetypeIds).size !== archetypeIds.length) {
      throw new Error("人物原型 ID 不能重复。");
    }

    if (QUESTIONS.filter((question) => question.type === "abstract").length < CONFIG.abstractQuestionsPerMonth) {
      throw new Error("抽象问题数量不足，无法完成每月刷新。");
    }

    QUESTIONS.forEach((question) => {
      if (!question.text || !question.fallback) {
        throw new Error(`问题 ${question.id} 缺少题干或兜底回答。`);
      }
    });

    CANDIDATES.forEach((candidate) => {
      ATTRIBUTES.forEach(({ key, label }) => {
        const value = candidate.attributes[key];
        if (!Number.isInteger(value) || value < CONFIG.attributeMin || value > CONFIG.attributeMax) {
          throw new Error(`${candidate.name}的${label}必须是 0～100 的整数。`);
        }
      });

      Object.keys(candidate.answers).forEach((questionId) => {
        if (!questionIds.includes(questionId)) {
          throw new Error(`${candidate.name}引用了不存在的问题 ${questionId}。`);
        }
      });

      (candidate.unlockQuestionIds || []).forEach((questionId) => {
        if (!questionIds.includes(questionId)) {
          throw new Error(`${candidate.name}解锁了不存在的问题 ${questionId}。`);
        }
      });

      if (candidate.baseWeight !== undefined
        && (!Number.isFinite(candidate.baseWeight) || candidate.baseWeight <= 0)) {
        throw new Error(`${candidate.name}的基础抽取权重必须大于 0。`);
      }
    });

    ARCHETYPES.forEach((archetype) => {
      if (!archetype.id || !archetype.name || !archetype.resume) {
        throw new Error("人物原型的 ID、名称和简历不能为空。");
      }
      ATTRIBUTES.forEach(({ key, label }) => {
        const value = archetype.baseAttributes[key];
        if (!Number.isInteger(value) || value < CONFIG.attributeMin || value > CONFIG.attributeMax) {
          throw new Error(`原型 ${archetype.name}的${label}基准值必须是 0～100 的整数。`);
        }
      });
      if (archetype.baseWeight !== undefined
        && (!Number.isFinite(archetype.baseWeight) || archetype.baseWeight <= 0)) {
        throw new Error(`原型 ${archetype.name}的基础抽取权重必须大于 0。`);
      }
    });

    Object.entries(ARCHETYPE_ANSWERS).forEach(([archetypeId, answers]) => {
      if (!archetypeIds.includes(archetypeId)) {
        throw new Error(`原型回答引用了不存在的原型 ${archetypeId}。`);
      }
      Object.entries(answers).forEach(([questionId, answerOptions]) => {
        if (!questionIds.includes(questionId)) {
          throw new Error(`原型回答引用了不存在的问题 ${questionId}。`);
        }
        if (!Array.isArray(answerOptions) || answerOptions.length === 0
          || answerOptions.some((answer) => typeof answer !== "string" || !answer)) {
          throw new Error(`原型 ${archetypeId} 的问题 ${questionId} 必须至少配置一条回答。`);
        }
      });
    });

    if (NAME_POOLS.surnames.length === 0 || NAME_POOLS.givenNames.length === 0) {
      throw new Error("姓氏池和名字池都不能为空。");
    }
    if (!Number.isFinite(CONFIG.recruitment.fixedCandidateProbability)
      || CONFIG.recruitment.fixedCandidateProbability < 0
      || CONFIG.recruitment.fixedCandidateProbability > 1) {
      throw new Error("固定角色概率必须在 0～1 之间。");
    }
    if (!Number.isInteger(CONFIG.recruitment.attributeVariance)
      || CONFIG.recruitment.attributeVariance < 0
      || CONFIG.recruitment.attributeVariance > 50) {
      throw new Error("随机属性浮动范围必须是 0～50 的整数。");
    }

    const newsIds = NEWS_TEMPLATES.map((news) => news.id);
    if (new Set(newsIds).size !== newsIds.length) {
      throw new Error("公司新闻 ID 不能重复。");
    }

    NEWS_TEMPLATES.forEach((news) => {
      if (!ATTRIBUTES.some(({ key }) => key === news.attribute)) {
        throw new Error(`新闻 ${news.id} 引用了不存在的属性。`);
      }
      if (!["low", "high", "normal"].includes(news.direction) || !news.title || !news.text) {
        throw new Error(`新闻 ${news.id} 的方向或内容不完整。`);
      }
      if (news.direction !== "normal" && !Number.isFinite(news.threshold)) {
        throw new Error(`新闻 ${news.id} 缺少触发阈值。`);
      }
    });

    return true;
  }

  return {
    ATTRIBUTES,
    CONFIG,
    QUESTIONS,
    CANDIDATES,
    ARCHETYPES,
    NAME_POOLS,
    ARCHETYPE_ANSWERS,
    ATTRIBUTE_ANSWERS,
    NEWS_TEMPLATES,
    ENDINGS,
    shuffle,
    getQualityScore,
    isHighQuality,
    getAttractionBonus,
    weightedPick,
    getArchetypeName,
    rollAttributes,
    createGeneratedCandidate,
    createMonthlyCandidates,
    createMonthlyQuestions,
    resolveAnswer,
    validate
  };
})();

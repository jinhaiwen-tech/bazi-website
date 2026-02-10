// 八字分析系统 - 乐观客观版（基于十神）

// 天干
const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

// 地支
const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 天干对应的五行
const stemWuxing = {
    '甲': '木', '乙': '木',
    '丙': '火', '丁': '火',
    '戊': '土', '己': '土',
    '庚': '金', '辛': '金',
    '壬': '水', '癸': '水'
};

// 地支对应的五行
const branchWuxing = {
    '子': '水', '丑': '土', '寅': '木', '卯': '木',
    '辰': '土', '巳': '火', '午': '火', '未': '土',
    '申': '金', '酉': '金', '戌': '土', '亥': '水'
};

// 十神关系
const tenGodRelation = {
    '甲': {同: '甲', 劫: '乙', 食: '丙', 伤: '丁', 财: '戊', 才: '己', 官: '庚', 杀: '辛', 印: '壬', 枭: '癸'},
    '乙': {同: '乙', 劫: '甲', 食: '丁', 伤: '丙', 财: '己', 才: '戊', 官: '辛', 杀: '庚', 印: '癸', 枭: '壬'},
    '丙': {同: '丙', 劫: '丁', 食: '戊', 伤: '己', 财: '庚', 才: '辛', 官: '壬', 杀: '癸', 印: '甲', 枭: '乙'},
    '丁': {同: '丁', 劫: '丙', 食: '己', 伤: '戊', 财: '辛', 才: '庚', 官: '癸', 杀: '壬', 印: '乙', 枭: '甲'},
    '戊': {同: '戊', 劫: '己', 食: '庚', 伤: '辛', 财: '壬', 才: '癸', 官: '甲', 杀: '乙', 印: '丙', 枭: '丁'},
    '己': {同: '己', 劫: '戊', 食: '辛', 伤: '庚', 财: '癸', 才: '壬', 官: '乙', 杀: '甲', 印: '丁', 枭: '丙'},
    '庚': {同: '庚', 劫: '辛', 食: '壬', 伤: '癸', 财: '甲', 才: '乙', 官: '丙', 杀: '丁', 印: '戊', 枭: '己'},
    '辛': {同: '辛', 劫: '庚', 食: '癸', 伤: '壬', 财: '乙', 才: '甲', 官: '丁', 杀: '丙', 印: '己', 枭: '戊'},
    '壬': {同: '壬', 劫: '癸', 食: '甲', 伤: '乙', 财: '丙', 才: '丁', 官: '戊', 杀: '己', 印: '庚', 枭: '辛'},
    '癸': {同: '癸', 劫: '壬', 食: '乙', 伤: '甲', 财: '丁', 才: '丙', 官: '己', 杀: '戊', 印: '辛', 枭: '庚'}
};

// 获取天干对应的十神
function getTenGod(dayMaster, targetStem) {
    const relation = tenGodRelation[dayMaster];
    for (let key in relation) {
        if (relation[key] === targetStem) {
            const nameMap = {
                '同': '比肩', '劫': '劫财', '食': '食神', '伤': '伤官',
                '财': '正财', '才': '偏财', '官': '正官', '杀': '七杀',
                '印': '正印', '枭': '偏印'
            };
            return nameMap[key];
        }
    }
    return '';
}

// 分析八字中的十神分布
function analyzeTenGods(bazi, dayMaster) {
    const tenGods = {
        '比肩': 0, '劫财': 0, '食神': 0, '伤官': 0,
        '正财': 0, '偏财': 0, '正官': 0, '七杀': 0,
        '正印': 0, '偏印': 0
    };

    // 统计天干中的十神
    const stems = [bazi.year.gan, bazi.month.gan, bazi.day.gan, bazi.hour.gan];
    stems.forEach(stem => {
        const god = getTenGod(dayMaster, stem);
        if (god) tenGods[god]++;
    });

    return tenGods;
}

// 判断命格类型
function judgePattern(tenGods) {
    // 官印格
    if (tenGods['正官'] > 0 || tenGods['七杀'] > 0) {
        if (tenGods['正印'] > 0 || tenGods['偏印'] > 0) {
            return '官印格';
        }
    }

    // 食伤格
    if (tenGods['食神'] >= 2 || tenGods['伤官'] >= 2) {
        return '食伤格';
    }

    // 财格
    if (tenGods['正财'] >= 2 || tenGods['偏财'] >= 2) {
        return '财格';
    }

    // 比劫格
    if (tenGods['比肩'] >= 2 || tenGods['劫财'] >= 2) {
        return '比劫格';
    }

    // 杂气格
    return '杂气格';
}

// 初始化八字选择下拉框
function initializeBaziSelectors() {
    const pillars = ['year', 'month', 'day', 'hour'];

    pillars.forEach(pillar => {
        const ganSelect = document.getElementById(pillar + 'Gan');
        const zhiSelect = document.getElementById(pillar + 'Zhi');

        if (ganSelect && zhiSelect) {
            // 添加天干选项
            heavenlyStems.forEach(stem => {
                const option = document.createElement('option');
                option.value = stem;
                option.textContent = stem;
                ganSelect.appendChild(option);
            });

            // 添加地支选项
            earthlyBranches.forEach(branch => {
                const option = document.createElement('option');
                option.value = branch;
                option.textContent = branch;
                zhiSelect.appendChild(option);
            });
        }
    });

    // 设置默认值 (示例八字，请根据实际情况修改)
    document.getElementById('yearGan').value = '丙';
    document.getElementById('yearZhi').value = '子';
    document.getElementById('monthGan').value = '己';
    document.getElementById('monthZhi').value = '丑';
    document.getElementById('dayGan').value = '壬';
    document.getElementById('dayZhi').value = '寅';
    document.getElementById('hourGan').value = '庚';
    document.getElementById('hourZhi').value = '辰';
}

// 从选择框获取八字
function getBaziFromSelectors() {
    return {
        year: {
            gan: document.getElementById('yearGan').value,
            zhi: document.getElementById('yearZhi').value,
            wuxing: stemWuxing[document.getElementById('yearGan').value] + branchWuxing[document.getElementById('yearZhi').value]
        },
        month: {
            gan: document.getElementById('monthGan').value,
            zhi: document.getElementById('monthZhi').value,
            wuxing: stemWuxing[document.getElementById('monthGan').value] + branchWuxing[document.getElementById('monthZhi').value]
        },
        day: {
            gan: document.getElementById('dayGan').value,
            zhi: document.getElementById('dayZhi').value,
            wuxing: stemWuxing[document.getElementById('dayGan').value] + branchWuxing[document.getElementById('dayZhi').value]
        },
        hour: {
            gan: document.getElementById('hourGan').value,
            zhi: document.getElementById('hourZhi').value,
            wuxing: stemWuxing[document.getElementById('hourGan').value] + branchWuxing[document.getElementById('hourZhi').value]
        }
    };
}

// 统计五行数量
function countWuxing(bazi) {
    const counts = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };

    // 统计天干
    Object.values(bazi).forEach(pillar => {
        counts[stemWuxing[pillar.gan]]++;
        counts[branchWuxing[pillar.zhi]]++;
    });

    return counts;
}

// 判断身强身弱（简化版）
function judgeBodyStrength(bazi, wuxingCounts) {
    const dayMaster = bazi.day.gan;
    const dayMasterWuxing = stemWuxing[dayMaster];

    // 同类五行数量
    const sameCount = wuxingCounts[dayMasterWuxing] +
        (dayMasterWuxing === '木' ? wuxingCounts.火 : 0) +
        (dayMasterWuxing === '火' ? wuxingCounts.土 : 0) +
        (dayMasterWuxing === '土' ? wuxingCounts.金 : 0) +
        (dayMasterWuxing === '金' ? wuxingCounts.水 : 0) +
        (dayMasterWuxing === '水' ? wuxingCounts.木 : 0);

    // 异类五行数量
    const diffCount = 8 - sameCount;

    if (sameCount > diffCount) return '身强';
    if (sameCount < diffCount) return '身弱';
    return '中和';
}

// 根据日主生成分析（有针对性）
function generateAnalysis(bazi, wuxingCounts, bodyStrength, gender) {
    const dayMaster = bazi.day.gan;
    const dayMasterWuxing = stemWuxing[dayMaster];

    // 分析十神分布
    const tenGods = analyzeTenGods(bazi, dayMaster);

    // 判断命格
    const pattern = judgePattern(tenGods);

    console.log('十神分布:', tenGods);
    console.log('命格:', pattern);

    // 计算综合评分（基于十神和五行平衡）
    const baseScore = 50;
    const tenGodBonus = calculateTenGodBonus(tenGods, bodyStrength);
    const wuxingBonus = calculateWuxingBonus(wuxingCounts);
    const totalScore = Math.min(80, Math.max(40, baseScore + tenGodBonus + wuxingBonus));

    // 生成各项评分
    const scores = generateScores2(totalScore, tenGods, bodyStrength, wuxingCounts, gender);

    // 生成优势（基于八字具体情况）
    const advantages = generateAdvantages2(bazi, dayMaster, tenGods, bodyStrength, wuxingCounts, gender);

    // 生成提升建议
    const improvements = generateImprovements2(bazi, dayMaster, tenGods, wuxingCounts, bodyStrength);

    // 生成性格分析（基于日主和十神）
    const personality = generatePersonality2(dayMaster, tenGods, bodyStrength, wuxingCounts);

    // 生成事业分析（基于十神）
    const career = generateCareer2(dayMaster, tenGods, bodyStrength, wuxingCounts);

    // 生成财运分析
    const wealth = generateWealth2(dayMaster, tenGods, bodyStrength, wuxingCounts);

    // 生成婚姻分析
    const marriage = generateMarriage2(dayMaster, tenGods, bodyStrength, wuxingCounts, gender);

    // 生成子女分析
    const children = generateChildren2(dayMaster, tenGods, bodyStrength, wuxingCounts, gender);

    // 生成健康分析
    const health = generateHealth2(dayMaster, tenGods, bodyStrength, wuxingCounts);

    // 生成人际关系分析
    const relationships = generateRelationships2(dayMaster, tenGods, bodyStrength, wuxingCounts);

    // 生成关键时期分析
    const opportunities = generateOpportunities2(bazi, dayMaster);

    // 生成核心建议
    const advice = generateAdvice2(dayMaster, tenGods, bodyStrength, wuxingCounts, pattern);

    // 生成总结
    const summary = generateSummary2(totalScore, dayMaster, tenGods, bodyStrength, pattern, advantages.length);

    return {
        totalScore,
        scores,
        advantages,
        improvements,
        personality,
        career,
        wealth,
        marriage,
        children,
        health,
        relationships,
        opportunities,
        advice,
        summary
    };
}

// 计算十神加分
function calculateTenGodBonus(tenGods, bodyStrength) {
    let bonus = 0;

    // 身强有财官印星 = 好
    if (bodyStrength === '身强') {
        if (tenGods['正财'] > 0 || tenGods['偏财'] > 0) bonus += 5;
        if (tenGods['正官'] > 0 || tenGods['七杀'] > 0) bonus += 3;
    }

    // 身弱有印比 = 好
    if (bodyStrength === '身弱') {
        if (tenGods['正印'] > 0 || tenGods['偏印'] > 0) bonus += 5;
        if (tenGods['比肩'] > 0 || tenGods['劫财'] > 0) bonus += 3;
    }

    // 食伤生财格 = 好
    if ((tenGods['食神'] > 0 || tenGods['伤官'] > 0) &&
        (tenGods['正财'] > 0 || tenGods['偏财'] > 0)) {
        bonus += 5;
    }

    return bonus;
}

// 生成各项评分（有针对性）
function generateScores2(totalScore, tenGods, bodyStrength, counts, gender) {
    let personality = totalScore;
    let career = totalScore;
    let wealth = totalScore;
    let marriage = totalScore;
    let health = totalScore;
    let relationships = totalScore;

    // 性格评分
    if (tenGods['食神'] > 0 || tenGods['正印'] > 0) {
        personality += 3;
    }

    // 事业评分
    if (tenGods['正官'] > 0 || tenGods['七杀'] > 0) {
        career += 5;
    }

    // 财运评分
    if (gender === 'male') {
        if (tenGods['正财'] > 0 || tenGods['偏财'] > 0) {
            wealth += 5;
        }
    } else {
        if (tenGods['正官'] > 0 || tenGods['七杀'] > 0) {
            wealth += 5;
        }
    }

    // 婚姻评分
    if (gender === 'male') {
        if (tenGods['正财'] > 0 || tenGods['偏财'] > 0) {
            marriage += 5;
        }
        if (tenGods['正财'] > 0 && tenGods['偏财'] > 0) {
            marriage -= 3;
        }
    } else {
        if (tenGods['正官'] > 0 || tenGods['七杀'] > 0) {
            marriage += 5;
        }
        if (tenGods['正官'] > 0 && tenGods['七杀'] > 0) {
            marriage -= 3;
        }
    }

    // 健康评分
    let maxX = Math.max(...Object.values(counts));
    if (maxX <= 3) {
        health += 3;
    }

    return {
        overall: totalScore,
        personality: Math.min(80, Math.max(40, personality)),
        career: Math.min(80, Math.max(40, career)),
        wealth: Math.min(80, Math.max(40, wealth)),
        marriage: Math.min(80, Math.max(40, marriage)),
        health: Math.min(80, Math.max(40, health)),
        relationships: Math.min(80, Math.max(40, relationships))
    };
}

// 计算五行平衡加分
function calculateWuxingBonus(counts) {
    const values = Object.values(counts);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min;

    if (range === 0) return 8;
    if (range <= 2) return 5;
    if (range <= 4) return 2;
    return 0;
}

// 生成20条优势（基于八字具体情况）
function generateAdvantages2(bazi, dayMaster, tenGods, bodyStrength, counts, gender) {
    const advantages = [];
    const dayWuxing = stemWuxing[dayMaster];

    // 根据日主和十神生成优势
    if (tenGods['正官'] > 0) {
        advantages.push(`天干透出正官，有管理能力和领导潜质`);
        advantages.push(`性格正直，有原则性，适合担任管理职务`);
    }
    if (tenGods['七杀'] > 0) {
        advantages.push(`七杀透干，有魄力和决断力，关键时刻能顶用`);
        advantages.push(`抗压能力强，能在困难中成长`);
    }
    if (tenGods['正印'] > 0) {
        advantages.push(`正印透出，有贵人相助，长辈缘好`);
        advantages.push(`学习能力好，适合从事文教、咨询工作`);
    }
    if (tenGods['偏印'] > 0) {
        advantages.push(`偏印在命，有独到的见解和领悟力`);
        advantages.push(`对事物有深入思考的能力，不肤浅`);
    }
    if (tenGods['正财'] > 0) {
        advantages.push(`正财透出，有稳健的赚钱能力，财运稳定`);
        advantages.push(`对家庭有责任感，是理财好手`);
    }
    if (tenGods['偏财'] > 0) {
        advantages.push(`偏财在命，有理财和商业头脑，财运机遇多`);
        advantages.push(`不拘小节，有格局和眼光`);
    }
    if (tenGods['食神'] > 0) {
        advantages.push(`食神透出，有才华和艺术天赋，表达能力强`);
        advantages.push(`性格温和，善于给人带来快乐`);
    }
    if (tenGods['伤官'] > 0) {
        advantages.push(`伤官在命，有创新能力和表现欲，不因循守旧`);
        advantages.push(`口才好，善于沟通和表达`);
    }
    if (tenGods['比肩'] > 0) {
        advantages.push(`比肩透出，有竞争意识和斗志，不服输`);
        advantages.push(`有合作精神，能与人和睦共事`);
    }
    if (tenGods['劫财'] > 0) {
        advantages.push(`劫财在命，有冒险精神和突破能力`);
        advantages.push(`懂得变通，不容易被困难卡住`);
    }

    // 根据五行分布添加优势
    const maxX = Math.max(...Object.values(counts));
    if (maxX <= 3) {
        advantages.push(`五行分布较为均衡，人生各方面发展相对平稳`);
    }

    // 根据身强身弱添加优势
    if (bodyStrength === '身强') {
        advantages.push(`身强能担财官，有能力承担更大的责任和压力`);
    } else if (bodyStrength === '身弱') {
        advantages.push(`身弱有印比帮扶，遇到困难容易获得帮助`);
    }

    // 确保至少20条
    const additionalAdvantages = [
        '性格踏实，做事认真负责',
        '有韧性，挫折后能重新站起来',
        '有包容力，能与人和谐相处',
        '有上进心，不甘平庸',
        '执行力强，说了就做',
        '讲信用，说话算话'
    ];

    let index = 0;
    while (advantages.length < 20) {
        advantages.push(additionalAdvantages[index % additionalAdvantages.length]);
        index++;
    }

    return advantages.slice(0, 20);
}

// 生成提升建议（基于八字的缺点）
function generateImprovements2(bazi, dayMaster, tenGods, counts, bodyStrength) {
    const improvements = [];

    // 身财官的不足
    if (tenGods['正官'] === 0 && tenGods['七杀'] === 0) {
        improvements.push(`八字中缺官星，建议培养管理能力和责任心，争取更大的发展平台`);
    }
    if (tenGods['正财'] === 0 && tenGods['偏财'] === 0) {
        improvements.push(`八字中缺财星，建议加强理财意识，学习财务管理`);
    }
    if (tenGods['食神'] === 0 && tenGods['伤官'] === 0) {
        improvements.push(`八字中缺食伤，建议提升表达能力，多学习新技能`);
    }
    if (tenGods['正印'] === 0 && tenGods['偏印'] === 0) {
        improvements.push(`八字中缺印星，建议多学习、多思考，通过学习提升自己`);
    }

    // 身强身弱的建议
    if (bodyStrength === '身强') {
        if (tenGods['正官'] === 0 && tenGods['七杀'] === 0) {
            improvements.push(`八字身强但缺官星，建议学会约束自己，培养自律意识`);
        }
    } else if (bodyStrength === '身弱') {
        improvements.push(`八字身弱，建议多锻炼身体，增强体质和抗压能力`);
    }

    // 五行偏旺的建议
    const maxX = Math.max(...Object.values(counts));
    if (maxX >= 4) {
        for (let wuxing in counts) {
            if (counts[wuxing] >= 4) {
                switch(wuxing) {
                    case '木':
                        improvements.push(`八字中木气过旺，建议适当收敛，不要过于固执`);
                        break;
                    case '火':
                        improvements.push(`八字中火气过旺，建议控制情绪，学会冷静思考`);
                        break;
                    case '土':
                        improvements.push(`八字中土气过旺，建议行动力要跟上，不要思虑过度`);
                        break;
                    case '金':
                        improvements.push(`八字中金气过旺，建议加强沟通能力，不要过于严厉`);
                        break;
                    case '水':
                        improvements.push(`八字中水气过旺，建议增加行动力，不要只说不做`);
                        break;
                }
                break;
            }
        }
    }

    // 五行缺失的建议
    ['木', '火', '土', '金', '水'].forEach(wuxing => {
        if (counts[wuxing] === 0) {
            switch(wuxing) {
                case '木':
                    improvements.push(`八字缺木，建议多培养仁爱之心，学习新事物，不要太保守`);
                    break;
                case '火':
                    improvements.push(`八字缺火，建议增加表达欲，多参与社交活动，不要孤僻`);
                    break;
                case '土':
                    improvements.push(`八字缺土，建议增强责任心，培养稳重和信任感`);
                    break;
                case '金':
                    improvements.push(`八字缺金，建议培养决断力，遇到事情要敢于决断`);
                    break;
                case '水':
                    improvements.push(`八字缺水，建议加强计划和规划能力，不要太冲动`);
                    break;
            }
        }
    });

    return improvements;
}

// 生成性格分析（基于日主和十神）
function generatePersonality2(dayMaster, tenGods, bodyStrength, counts) {
    let personality = '';

    personality += '<div class="section-subtitle">✨ 日主为' + dayMaster + '的性格特质</div>';

    // 日主性格
    const dayMasterPersonality = {
        '甲': '甲木日主，性格仁慈正直，有领导才能，但有时过于耿直',
        '乙': '乙木日主，性格温柔体贴，心思细腻，有时过于优柔寡断',
        '丙': '丙火日主，性格热情开朗，有激情，有时过于急躁',
        '丁': '丁火日主，性格温和有礼，细致敏感，有时过于敏感',
        '戊': '戊土日主，性格稳重踏实，值得信赖，有时过于固执',
        '己': '己土日主，性格温和包容，善于接纳，有时缺乏主见',
        '庚': '庚金日主，性格刚毅果断，讲义气，有时过于严厉',
        '辛': '辛金日主，性格细腻精致，有品位，有时过于计较',
        '壬': '壬水日主，性格聪明灵活，善于应变，有时过于圆滑',
        '癸': '癸水日主，性格温柔委婉，心思细腻，有时过于脆弱'
    };

    personality += '<p>' + dayMasterPersonality[dayMaster] + '</p>';

    // 身强身弱性格
    personality += '<div class="section-subtitle">💪 身强身弱的影响</div>';
    if (bodyStrength === '身强') {
        personality += '<p>身强的人，自信心强，有主见，能够承受压力。但也可能过于自我，固执己见，不太容易听取他人意见。建议适当收敛，学会与他人合作。</p>';
    } else if (bodyStrength === '身弱') {
        personality += '<p>身弱的人，心思细腻，善于妥协，适应性强。但也可能缺乏自信，优柔寡断，容易受他人影响。建议增强自信，培养决断力。</p>';
    } else {
        personality += '<p>身中和的人，性格相对平衡，既有主见又懂得妥协，能够很好地适应各种环境。</p>';
    }

    // 十神对性格的影响
    personality += '<div class="section-subtitle">⭐ 十神性格影响</div>';
    personality += '<ul>';

    if (tenGods['正官'] > 0) {
        personality += '<li>有正官在命，为人正直守规，有原则性，适合管理岗位</li>';
    }
    if (tenGods['七杀'] > 0) {
        personality += '<li>有七杀在命，有魄力敢担当，做事果断，不畏困难</li>';
    }
    if (tenGods['正印'] > 0) {
        personality += '<li>有正印在命，内心善良，有学习欲，适合文教工作</li>';
    }
    if (tenGods['偏印'] > 0) {
        personality += '<li>有偏印在命，有独特见解，领悟力强，不随波逐流</li>';
    }
    if (tenGods['正财'] > 0) {
        personality += '<li>有正财在命，性格稳重，有责任感，善于理财</li>';
    }
    if (tenGods['偏财'] > 0) {
        personality += '<li>有偏财在命，开朗大方，有商业头脑，社交能力强</li>';
    }
    if (tenGods['食神'] > 0) {
        personality += '<li>有食神在命，温和友善，有艺术天赋，给人带来快乐</li>';
    }
    if (tenGods['伤官'] > 0) {
        personality += '<li>有伤官在命，有创新意识，表达欲强，不守旧</li>';
    }
    if (tenGods['比肩'] > 0) {
        personality += '<li>有比肩在命，有竞争意识，不服输，善于合作</li>';
    }
    if (tenGods['劫财'] > 0) {
        personality += '<li>有劫财在命，有冒险精神，不甘守旧，敢于突破</li>';
    }

    personality += '</ul>';

    return personality;
}

// 生成事业分析（基于十神）
function generateCareer2(dayMaster, tenGods, bodyStrength, counts) {
    let career = '';

    career += '<div class="section-subtitle">💼 基于十神的事业分析</div>';

    career += '<div class="section-subtitle">🎯 适合的事业方向</div>';
    career += '<ul>';

    if (tenGods['正官'] > 0 || tenGods['七杀'] > 0) {
        career += '<li><strong>管理类：</strong>政府机构、事业单位、企业高管、部门主管。天干有官杀星，有管理能力和领导潜质，适合担任管理职务。</li>';
        career += '<li><strong>执法类：</strong>警察、律师、法官、监察。官杀在命，有正义感，适合行使职权的工作。</li>';
    }
    if (tenGods['正印'] > 0 || tenGods['偏印'] > 0) {
        career += '<li><strong>文教类：</strong>教师、培训、研究、出版。印星在命，学习能力强，适合从事教育和研究工作。</li>';
        career += '<li><strong>咨询类：</strong>顾问、心理咨询、战略咨询。印星代表智慧和贵人，适合提供智慧服务。</li>';
    }
    if (tenGods['正财'] > 0 || tenGods['偏财'] > 0) {
        career += '<li><strong>商业类：</strong>企业经营、贸易销售、投资理财。财星在命，有商业头脑和财运。</li>';
        career += '<li><strong>金融类：</strong>银行、证券、保险、基金。财星代表金钱，适合从事金融工作。</li>';
    }
    if (tenGods['食神'] > 0 || tenGods['伤官'] > 0) {
        career += '<li><strong>艺术类：</strong>文艺创作、设计、表演、音乐。食伤在命，有艺术天赋和表达能力。</li>';
        career += '<li><strong>传媒类：</strong>新闻、广告、公关、自媒体。食伤代表表达和才华，适合传媒工作。</li>';
    }
    if (tenGods['比肩'] > 0 || tenGods['劫财'] > 0) {
        career += '<li><strong>合作类：</strong>合伙经营、团队协作项目。比劫在命，善于与人合作。</li>';
    }

    career += '</ul>';

    career += '<div class="section-subtitle">📈 事业发展策略</div>';
    career += '<ul>';

    if (bodyStrength === '身强') {
        if (tenGods['正官'] > 0 || tenGods['七杀'] > 0) {
            career += '<li>身强有官杀，适合争取更高的职位，向管理层发展</li>';
        } else {
            career += '<li>身强但缺官星，建议通过学习培训提升管理能力，争取突破</li>';
        }
        career += '<li>身强能担，可以面对更大的压力和责任，不必畏缩</li>';
    } else if (bodyStrength === '身弱') {
        if (tenGods['正印'] > 0 || tenGods['偏印'] > 0) {
            career += '<li>身弱有印星生扶，适合平稳发展，循序渐进</li>';
            career += '<li>印星代表贵人，工作中会有人相助，多与领导同事和睦相处</li>';
        } else {
            career += '<li>身弱缺印星，建议加强学习，提升自己的能力</li>';
        }
        career += '<li>身体较弱，注意劳逸结合，不要过度拼搏</li>';
    }

    if (tenGods['食神'] > 0 || tenGods['伤官'] > 0) {
        career += '<li>有食伤星，可以发挥自己的才华和创意，在工作中寻求创新</li>';
    }

    career += '</ul>';

    return career;
}

// 生成财运分析（基于财星）
function generateWealth2(dayMaster, tenGods, bodyStrength, counts) {
    let wealth = '';

    wealth += '<div class="section-subtitle">💰 八字财运分析</div>';

    wealth += '<div class="section-subtitle">📊 财星分析</div>';

    const hasWealth = tenGods['正财'] > 0 || tenGods['偏财'] > 0;

    if (tenGods['正财'] > 0 && tenGods['偏财'] > 0) {
        wealth += '<p>八字中既有正财又有偏财，财运机会较多。正财稳健，偏财有意外之财。需要注意<strong>财多身弱则担不起</strong>，如果身弱则需要增强自己的能力和体质才能守住财。</p>';
    } else if (tenGods['正财'] > 0) {
        wealth += '<p>八字中有正财透出，财运稳健踏实。靠自己的努力和正道能够获得财富。适合打工拿死工资，不适合做高风险投资。</p>';
    } else if (tenGods['偏财'] > 0) {
        wealth += '<p>八字中有偏财透出，财运机遇多但不稳定。可能有意外之财，也可能有较大的破财。投资、经商可能有机会，但风险较大。</p>';
    } else {
        wealth += '<p>八字天干无财星透出，财运上需要更多依靠自己的能力和机会。地支中如果藏干有财星，财运还可以，只是不会很突出。建议提升自己的专业技能，通过能力赚钱。</p>';
    }

    wealth += '<div class="section-subtitle">💡 财运建议</div>';
    wealth += '<ul>';

    if (bodyStrength === '身强') {
        if (hasWealth) {
            wealth += '<li>身强有财星，身能担财，可以大胆追求财富</li>';
            wealth += '<li>可以考虑投资、创业，但需要理性，不要冲动</li>';
        } else {
            wealth += '<li>身强但缺财星，建议通过提升能力、考取证书、晋升来增加收入</li>';
        }
    } else if (bodyStrength === '身弱') {
        if (hasWealth) {
            wealth += '<li>身弱有财星，财多身弱，需要先提升自己才能守住财</li>';
            wealth += '<li>建议稳健理财，不要冒险投资，把钱存定期最安全</li>';
        } else {
            wealth += '<li>身弱缺财星，财运一般，需要通过自己的努力获得收入</li>';
            wealth += '<li>建议选择稳定的工作，不要想着发大财，平平淡淡就好</li>';
        }
    }

    if (tenGods['正财'] > 0) {
        wealth += '<li>正财代表正财，适合从正道赚钱，不要走歪门邪道</li>';
    }
    if (tenGods['偏财'] > 0) {
        wealth += '<li>偏财代表偏财，可能会有意外之财，但也容易破财</li>';
    }

    wealth += '</ul>';

    return wealth;
}

// 生成婚姻分析（基于官财星）
function generateMarriage2(dayMaster, tenGods, bodyStrength, counts, gender) {
    let marriage = '';

    if (gender === 'male') {
        // 男命看妻星（财星）
        marriage += '<div class="section-subtitle">💑 男命婚姻分析</div>';

        marriage += '<div class="section-subtitle">🎯 妻星分析</div>';

        const hasWealth = tenGods['正财'] > 0 || tenGods['偏财'] > 0;

        if (tenGods['正财'] > 0 && tenGods['偏财'] > 0) {
            marriage += '<p>八字中既有正财又有偏财，异性缘不错，桃花运旺盛。但如果身弱，则<strong>财多身弱</strong>，反而婚姻不顺，容易因为女人破财，或者婚姻不稳定。</p>';
            marriage += '<p><strong>建议：</strong>财多身弱，建议晚婚，等自己成熟稳定后再结婚。婚后要专一，不要招惹外面的人，否则婚姻必出问题。</p>';
        } else if (tenGods['正财'] > 0) {
            marriage += '<p>八字中有正财透出，妻星有力，婚姻运势不错。能够找到合适的伴侣，婚姻比较稳定。</p>';
            marriage += '<p><strong>建议：</strong>正财代表正妻，对婚姻要专一，不要有二心。给妻子足够的安全感和关爱，婚姻就会幸福美满。</p>';
        } else if (tenGods['偏财'] > 0) {
            marriage += '<p>八字中有偏财透出，异性缘好，桃花运旺。但偏财代表情人和外遇，需要注意控制自己的欲望，否则婚姻会出问题。</p>';
            marriage += '<p><strong>建议：</strong>偏财在命，婚外缘多。婚后要严守底线，不要招惹外面的女性。如果不幸有婚外情，婚姻必破。</p>';
        } else {
            marriage += '<p>八字天干无财星透出，妻星不显，找对象比较困难。可能：<ul><li>晚婚（30岁以后）</li><li>找对象需要家人介绍</li></ul></p>';
            marriage += '<p><strong>建议：</strong>八字缺财星，不要着急结婚。先提升自己，等到30岁后再找也不迟。</p>';
        }

        // 身财关系
        marriage += '<div class="section-subtitle">⚖️ 身财关系</div>';
        if (bodyStrength === '身强') {
            if (hasWealth) {
                marriage += '<p>身强有财，身能担财，婚姻比较好。妻子能力强，能给家里带来财运。</p>';
            } else {
                marriage += '<p>身强妻星弱，可能在婚姻中比较强势，妻子反而弱势一些。</p>';
            }
        } else if (bodyStrength === '身弱') {
            if (hasWealth) {
                marriage += '<p>身弱财多，<strong>财多身弱</strong>，这是男命婚姻的大忌。婚姻中可能是"妻管严"，或者妻子性格强势压着自己。也可能因为女人破财。</p>';
            } else {
                marriage += '<p>身弱无财，妻子缘薄，可能婚姻来得晚，或者需要晚婚。</p>';
            }
        }

        marriage += '<div class="section-subtitle">⏰ 婚姻时机</div>';
        if (hasWealth) {
            marriage += '<p>最佳结婚年龄：28-32岁左右</p>';
        } else {
            marriage += '<p>适合晚婚：30岁以后</p>';
        }

    } else {
        // 女命看夫星（官杀星）
        marriage += '<div class="section-subtitle">💑 女命婚姻分析</div>';

        marriage += '<div class="section-subtitle">🎯 夫星分析</div>';

        const hasGuan = tenGods['正官'] > 0 || tenGods['七杀'] > 0;

        if (tenGods['正官'] > 0 && tenGods['七杀'] > 0) {
            marriage += '<p>八字中既有正官又有七杀，官杀混杂。这种情况下，感情运势多变，可能有多次婚恋经历。</p>';
            marriage += '<p><strong>建议：</strong>官杀混杂，建议晚婚，30岁后再考虑结婚。婚后要控制自己的情感，不要太花心。</p>';
        } else if (tenGods['正官'] > 0) {
            marriage += '<p>八字中有正官透出，夫星有力，婚姻运势不错。能够找到稳重有责任心的丈夫，婚姻比较稳定幸福。</p>';
            marriage += '<p><strong>建议：</strong>正官代表正夫，可以对丈夫多一些温柔和体贴。正官的女人家庭观念强，婚后以家庭为重。</p>';
        } else if (tenGods['七杀'] > 0) {
            marriage += '<p>八字中有七杀透出，夫星是七杀，可能找的丈夫性格强势或有独特之处。七杀代表偏夫，婚姻中可能有些波折。</p>';
            marriage += '<p><strong>建议：</strong>七杀在命，丈夫可能比自己大很多，或者二婚。婚后要学会包容和理解。</p>';
        } else {
            marriage += '<p>八字天干无官杀星透出，夫星不显，找对象比较困难。可能：<ul><li>晚婚（30岁以后）</li><li>可能不结婚或终身单身</li></ul></p>';
            marriage += '<p><strong>建议：</strong>八字缺夫星，不要急着结婚。先把事业搞好，经济独立。如果30岁以后还没结婚，也可以接受单身，一个人也能过得很精彩。</p>';
        }

        // 身官关系
        marriage += '<div class="section-subtitle">⚖️ 身官关系</div>';
        if (bodyStrength === '身强') {
            if (hasGuan) {
                marriage += '<p>身强有官，身能担官，能嫁有能力的丈夫，丈夫事业不错。</p>';
            } else {
                marriage += '<p>身强官星弱，可能在婚姻中比较强势，丈夫反而弱势一些。</p>';
            }
        } else if (bodyStrength === '身弱') {
            if (hasGuan) {
                marriage += '<p>身弱官多，<strong>官多身弱</strong>，这种情况下，压力很大，婚姻中可能被丈夫和婆家压制。</p>';
            } else {
                marriage += '<p>身弱无官，丈夫缘薄，可能婚姻来得晚，或者需要晚婚。</p>';
            }
        }

        marriage += '<div class="section-subtitle">⏰ 婚姻时机</div>';
        if (hasGuan) {
            marriage += '<p>最佳结婚年龄：25-30岁左右</p>';
        } else {
            marriage += '<p>适合晚婚：30岁以后</p>';
        }
    }

    marriage += '<div class="section-subtitle">🏠 婚姻建议</div>';
    marriage += '<ul>';
    marriage += '<li>婚前充分了解，不要草率结婚</li>';
    marriage += '<li>婚后以家庭为重，多沟通少冷战</li>';
    marriage += '<li>给对方足够的安全感和关爱</li>';
    marriage += '<li>追求完美，用心经营婚姻</li>';
    marriage += '<li>有矛盾及时解决，不要拖成大问题</li>';
    marriage += '</ul>';

    return marriage;
}

// 生成子女分析（基于食伤）
function generateChildren2(dayMaster, tenGods, bodyStrength, counts, gender) {
    let children = '';

    children += '<div class="section-subtitle">👶 子女运分析</div>';

    children += '<div class="section-subtitle">👦 子女星分析</div>';

    const hasShiShang = tenGods['食神'] > 0 || tenGods['伤官'] > 0;

    if (tenGods['食神'] > 0 && tenGods['伤官'] > 0) {
        children += '<p>八字中既有食神又有伤官，子女星旺，子女运势不错。可能不止一个子女，子女聪明有才华。</p>';
    } else if (tenGods['食神'] > 0) {
        children += '<p>八字中有食神透出，子女星有力，子女运良好。子女性格温和，聪明懂事，与自己的关系会比较和谐。</p>';
    } else if (tenGods['伤官'] > 0) {
        children += '<p>八字中有伤官透出，子女星有力，但伤官代表叛逆，子女可能比较有脾气，青春期容易与自己产生矛盾。</p>';
    } else {
        children += '<p>八字天干无食神伤官星透出，子女星不显，子女运势一般。</p>';
    }

    // 身食关系
    children += '<div class="section-subtitle">⚖️ 身食关系</div>';
    if (bodyStrength === '身强') {
        if (hasShiShang) {
            children += '<p>身强有食伤，能够生助子女，子女运势好。有能力培养子女，子女能够成材。</p>';
        } else {
            children += '<p>身强食伤弱，子女运势一般。有能力养育子女，但子女可能才华不出众。</p>';
        }
    } else if (bodyStrength === '身弱') {
        if (hasShiShang) {
            children += '<p>身弱食伤多，<strong>枭印夺食</strong>的倾向。因为食伤泄身太厉害，身体可能吃不消，怀孕生育可能辛苦。</p>';
        } else {
            children += '<p>身弱无食伤，子女缘比较薄，可能晚年子女不在身边。</p>';
        }
    }

    // 教育建议
    children += '<div class="section-subtitle">💡 教育建议</div>';
    children += '<ul>';
    children += '<li>以身作则，做孩子的榜样</li>';
    children += '<li>多陪伴，关注孩子成长</li>';
    children += '<li>保持耐心，不要急躁</li>';
    children += '<li>理解孩子，给予足够空间</li>';
    children += '</ul>';

    return children;
}

// 生成健康分析
function generateHealth2(dayMaster, tenGods, bodyStrength, counts) {
    let health = '';

    health += '<div class="section-subtitle">🏥 健康运分析</div>';

    // 找出最旺和最弱的五行
    const maxWuxing = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);

    if (counts[maxWuxing] >= 4) {
        health += '<div class="section-subtitle">📊 五行过旺影响</div>';
        health += '<p>八字中<strong>' + maxWuxing + '</strong>气过旺，需要注意以下健康问题：</p>';
        health += '<ul>';

        switch(maxWuxing) {
            case '木':
                health += '<li>肝胆系统：注意肝气郁结、胆囊问题</li>';
                health += '<li>情志：容易抑郁、焦虑</li>';
                break;
            case '火':
                health += '<li>心血管系统：注意高血压、心脏病</li>';
                health += '<li>情志：容易急躁、发脾气</li>';
                break;
            case '土':
                health += '<li>脾胃系统：注意胃胀、消化不良、胃病</li>';
                health += '<li>情志：容易思虑过度、抑郁</li>';
                break;
            case '金':
                health += '<li>呼吸系统：注意咳嗽、哮喘、肺部问题</li>';
                health += '<li>情志：容易悲伤、忧郁</li>';
                break;
            case '水':
                health += '<li>泌尿生殖系统：注意肾病、前列腺</li>';
                health += '<li>情志：容易恐惧、焦虑</li>';
                break;
        }

        health += '</ul>';
    }

    // 五行缺失的健康影响
    const missingWuxing = Object.keys(counts).filter(w => counts[w] === 0);
    if (missingWuxing.length > 0) {
        health += '<div class="section-subtitle">⚠️ 五行缺失影响</div>';
        health += '<p>八字缺失了<strong>' + missingWuxing.join('、') + '</strong>，可能对应的身体系统相对较弱：</p>';
        health += '<ul>';
        missingWuxing.forEach(w => {
            switch(w) {
                case '木':
                    health += '<li>木：肝胆系统相对薄弱</li>';
                    break;
                case '火':
                    health += '<li>火：心血管系统相对薄弱</li>';
                    break;
                case '土':
                    health += '<li>土：脾胃系统相对薄弱</li>';
                    break;
                case '金':
                    health += '<li>金：呼吸系统相对薄弱</li>';
                    break;
                case '水':
                    health += '<li>水：泌尿生殖系统相对薄弱</li>';
                    break;
            }
        });
        health += '</ul>';
    }

    health += '<div class="section-subtitle">💪 体质特点</div>';
    if (bodyStrength === '身强') {
        health += '<p>身强体质，身体底子好，抵抗力强。</p>';
    } else if (bodyStrength === '身弱') {
        health += '<p>身弱体质，身体相对薄弱，需要加强锻炼和营养。</p>';
    } else {
        health += '<p>身中和体质，身体状况相对平衡。</p>';
    }

    health += '<div class="section-subtitle">🌟 生活建议</div>';
    health += '<ul>';
    health += '<li>均衡饮食，营养搭配</li>';
    health += '<li>适量运动，每周2-3次</li>';
    health += '<li>充足睡眠，每天7-8小时</li>';
    health += '<li>调节情绪，保持乐观心态</li>';
    health += '<li>定期体检，预防为主</li>';
    health += '</ul>';

    return health;
}

// 生成人际关系分析
function generateRelationships2(dayMaster, tenGods, bodyStrength, counts) {
    let relationships = '';

    relationships += '<div class="section-subtitle">👥 人际关系分析</div>';

    relationships += '<div class="section-subtitle">🎭 性格优势</div>';
    relationships += '<ul>';

    if (tenGods['正官'] > 0) {
        relationships += '<li>有正官在命：容易得到领导的信任和认可</li>';
    }
    if (tenGods['正印'] > 0) {
        relationships += '<li>有正印在命：容易得到他人的帮助和支持</li>';
    }
    if (tenGods['食神'] > 0) {
        relationships += '<li>有食神在命：人缘不错，受人喜欢</li>';
    }
    if (tenGods['正财'] > 0) {
        relationships += '<li>有正财在命：讲信用，值得信赖</li>';
    }

    relationships += '</ul>';

    return relationships;
}

// 生成关键时期分析
function generateOpportunities2(bazi, dayMaster) {
    let opportunities = '';

    opportunities += '<div class="section-subtitle">🌟 人生关键时期</div>';

    opportunities += '<div class="time-period">';
    opportunities += '<div class="period-name">25-35岁：青年发展期</div>';
    opportunities += '<div class="period-desc">这是人生的关键学习和发展期。努力工作，积累经验，为以后打下基础。</div>';
    opportunities += '</div>';

    opportunities += '<div class="time-period">';
    opportunities += '<div class="period-name">35-45岁：中年稳定期</div>';
    opportunities += '<div class="period-desc">事业基本定型，重点是稳定和提升。可以寻求管理岗位或专业细分领域。</div>';
    opportunities += '</div>';

    opportunities += '<div class="time-period">';
    opportunities += '<div class="period-name">45岁后：人生收获期</div>';
    opportunities += '<div class="period-desc">享受生活，发挥经验优势，也可以培养兴趣爱好，丰富精神世界。</div>';
    opportunities += '</div>';

    return opportunities;
}

// 生成核心建议
function generateAdvice2(dayMaster, tenGods, bodyStrength, wuxingCounts, pattern) {
    let advice = '';

    advice += '<div class="section-subtitle">🎯 命理核心建议</div>';

    // 根据命格给出建议
    advice += '<div class="advice-item">';
    advice += '<div class="advice-title">📊 命格类型</div>';
    advice += '<div class="advice-content">您的命格属于<strong>' + pattern + '</strong>。';

    switch(pattern) {
        case '官印格':
            advice += '这是很好的命格，有官星代表管理能力，有印星代表智慧和贵人。适合从事管理、文官类工作，事业有成。';
            break;
        case '食伤格':
            advice += '这是有才华的命格，有食伤星代表才华和表达能力。适合从事艺术、传媒、创意类工作，发挥自己的才华。';
            break;
        case '财格':
            advice += '这是有财的命格，有财星代表财运和商业头脑。适合从事商业、金融类工作，有发财的机会。';
            break;
        case '比劫格':
            advice += '这是有竞争意识的命格，有比劫星代表竞争和合作精神。适合从事团队合作类工作。';
            break;
        default:
            advice += '这是杂气格，需要根据具体情况分析各个方面的运势。';
    }

    advice += '</div>';
    advice += '</div>';

    // 身强身弱建议
    advice += '<div class="advice-item">';
    advice += '<div class="advice-title">⚖️ 身强身弱建议</div>';
    advice += '<div class="advice-content">';
    if (bodyStrength === '身强') {
        advice += '<ul>';
        advice += '<li>可以承担更多工作任务，争取更高的职位</li>';
        advice += '<li>要注意控制自己的脾气，学会与他人合作</li>';
        advice += '</ul>';
    } else if (bodyStrength === '身弱') {
        advice += '<ul>';
        advice += '<li>加强锻炼，增强体质和抗压能力</li>';
        advice += '<li>多学习，提升自己的专业能力</li>';
        advice += '</ul>';
    }
    advice += '</div>';
    advice += '</div>';

    return advice;
}

// 生成总结
function generateSummary2(totalScore, dayMaster, tenGods, bodyStrength, pattern, advantageCount) {
    const scoreLevel = totalScore >= 70 ? '上等' : totalScore >= 60 ? '中等偏上' : '中等';
    let summary = '';

    summary += '<p><strong>综合评分：</strong><span style="font-size: 1.5em; color: white; margin-left: 10px;">' + totalScore + '/100</span></p>';
    summary += '<p><strong>命格层次：</strong>' + scoreLevel + '</p>';
    summary += '<p><strong>命格类型：</strong>' + pattern + '</p>';

    summary += '<p style="margin-top: 20px; font-size: 1.1em; line-height: 1.8;">';
    summary += '<strong>最实在的话：</strong><br><br>';
    summary += '八字只是给您提供一个人生轮廓，真正的生活还得靠您自己去走。<br><br>';
    summary += '不要过于迷信八字，也不要完全不信。把它当作一个参考工具，了解自己的优势和不足。<br><br>';
    summary += '人生没有定数，通过努力和坚持，都可以活出精彩。八字只是起点，不是终点。<br><br>';
    summary += '加油！';
    summary += '</p>';

    return summary;
}

// 主函数：分析和显示结果
function analyzeBazi() {
    try {
        console.log('开始分析八字...');

        // 获取性别
        const gender = document.getElementById('gender').value;
        console.log('性别:', gender);

        // 从选择框获取八字
        const bazi = getBaziFromSelectors();
        console.log('八字:', bazi);

        // 验证八字是否完整
        if (!bazi.year.gan || !bazi.year.zhi || !bazi.month.gan || !bazi.month.zhi ||
            !bazi.day.gan || !bazi.day.zhi || !bazi.hour.gan || !bazi.hour.zhi) {
            throw new Error('请完整填写所有八字信息');
        }

        // 统计五行
        const wuxingCounts = countWuxing(bazi);
        console.log('五行统计:', wuxingCounts);

        // 判断身强身弱
        const bodyStrength = judgeBodyStrength(bazi, wuxingCounts);
        console.log('身强身弱:', bodyStrength);

        // 生成分析
        const analysis = generateAnalysis(bazi, wuxingCounts, bodyStrength, gender);
        console.log('分析生成完成');

        // 显示结果
        displayResult(bazi, analysis);

    } catch (error) {
        console.error('分析出错:', error);
        alert('分析时出现错误，请刷新页面重试。错误信息: ' + error.message);
    }
}

// 显示结果
function displayResult(bazi, analysis) {
    try {
        console.log('开始显示结果...');

        // 显示八字图表
        const baziChart = document.getElementById('baziChart');
        if (!baziChart) {
            throw new Error('找不到八字图表元素');
        }
        baziChart.innerHTML = `
            <div class="bazi-column">
                <div class="column-name">年柱</div>
                <div class="gan">${bazi.year.gan}</div>
                <div class="zhi">${bazi.year.zhi}</div>
                <div class="wuxing">${bazi.year.wuxing}</div>
            </div>
            <div class="bazi-column">
                <div class="column-name">月柱</div>
                <div class="gan">${bazi.month.gan}</div>
                <div class="zhi">${bazi.month.zhi}</div>
                <div class="wuxing">${bazi.month.wuxing}</div>
            </div>
            <div class="bazi-column">
                <div class="column-name">日柱</div>
                <div class="gan">${bazi.day.gan}</div>
                <div class="zhi">${bazi.day.zhi}</div>
                <div class="wuxing">${bazi.day.wuxing}</div>
            </div>
            <div class="bazi-column">
                <div class="column-name">时柱</div>
                <div class="gan">${bazi.hour.gan}</div>
                <div class="zhi">${bazi.hour.zhi}</div>
                <div class="wuxing">${bazi.hour.wuxing}</div>
            </div>
        `;

        // 显示评分
        const scoreContainer = document.getElementById('scoreContainer');
        let scoreHtml = '';
        const labels = {
            overall: '综合评分', personality: '性格品质',
            career: '事业财运', wealth: '婚姻感情',
            marriage: '健康状况', health: '人际关系',
            relationships: '总体运势'
        };

        for (const [key, value] of Object.entries(analysis.scores)) {
            scoreHtml += `
                <div class="score-row">
                    <div class="score-label">${labels[key] || key}</div>
                    <div class="score-bar-container">
                        <div class="score-bar" style="width: ${value}%"></div>
                    </div>
                    <div class="score-value">${value}</div>
                </div>
            `;
        }

        scoreHtml += `
            <div class="total-score">
                <div class="score-number">${analysis.totalScore}</div>
                <div class="score-level">${analysis.totalScore >= 70 ? '上等命格' : analysis.totalScore >= 60 ? '中等偏上' : '中等命格'}</div>
            </div>
        `;

        scoreContainer.innerHTML = scoreHtml;

        // 显示各项分析 - 添加安全检查
        function safeSetElement(id, content) {
            const element = document.getElementById(id);
            if (element) {
                element.innerHTML = content;
            } else {
                console.warn('找不到元素:', id);
            }
        }

        safeSetElement('advantages', '<ul>' + analysis.advantages.map(adv => '<li>' + adv + '</li>').join('') + '</ul>');
        safeSetElement('improvements', '<ul>' + analysis.improvements.map(imp => '<li>' + imp + '</li>').join('') + '</ul>');
        safeSetElement('personality', analysis.personality);
        safeSetElement('career', analysis.career);
        safeSetElement('wealth', analysis.wealth);
        safeSetElement('marriage', analysis.marriage);
        safeSetElement('children', analysis.children);
        safeSetElement('health', analysis.health);
        safeSetElement('relationships', analysis.relationships);
        safeSetElement('opportunities', analysis.opportunities);
        safeSetElement('advice', analysis.advice);
        safeSetElement('summary', analysis.summary);

        // 显示结果区，隐藏输入区
        const inputSection = document.querySelector('.input-section');
        const resultSection = document.getElementById('result-section');
        if (inputSection && resultSection) {
            inputSection.style.display = 'none';
            resultSection.style.display = 'block';
        } else {
            console.warn('找不到输入区或结果区');
        }

        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });

        console.log('结果显示完成');
    } catch (error) {
        console.error('显示结果出错:', error);
        alert('显示结果时出现错误: ' + error.message);
    }
}

// 重新分析
function newAnalysis() {
    document.querySelector('.input-section').style.display = 'block';
    document.getElementById('result-section').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('八字分析系统已加载');

    // 初始化八字选择下拉框
    initializeBaziSelectors();
    console.log('八字选择器初始化完成');
});
(() => {
  const Data = window.CampusData;
  const Game = window.CampusGame;
  const Achievements = window.CampusAchievements;
  const app = document.querySelector("#app");
  const statusBar = document.querySelector("#status-bar");
  const achievementsButton = document.querySelector("#achievements-button");
  const achievementToasts = document.querySelector("#achievement-toasts");
  let showingAchievements = false;
  let toastTimer;

  Data.validate();

  function formatAverage(value) {
    return Number.isInteger(value) ? String(value) : value.toFixed(1);
  }

  function renderAchievementButton() {
    const progress = Achievements.getProgress();
    achievementsButton.textContent = `成就 ${progress.unlocked}/${progress.total}`;
  }

  function renderAchievementCard(achievement) {
    const record = Achievements.getRecord(achievement.id);
    if (!record) {
      return `
        <article class="achievement-card locked">
          <span class="achievement-mark">?</span>
          <div>
            <h3>${achievement.type === "candidate" ? "未知角色" : "未知结局"}</h3>
            <p>尚未解锁。继续游玩，让这一页留下新的记录。</p>
          </div>
        </article>
      `;
    }

    const date = new Date(record.unlockedAt).toLocaleDateString("zh-CN");
    return `
      <article class="achievement-card unlocked">
        <span class="achievement-mark">✓</span>
        <div>
          <h3>${record.title}</h3>
          <p>${record.description}</p>
          <small>${date} 解锁</small>
        </div>
      </article>
    `;
  }

  function renderAchievementSection(type, title) {
    const entries = Achievements.getCatalog().filter((achievement) => achievement.type === type);
    return `
      <section class="achievement-section">
        <h2>${title}<span>${entries.filter((entry) => Achievements.getRecord(entry.id)).length} / ${entries.length}</span></h2>
        <div class="achievement-grid">${entries.map(renderAchievementCard).join("")}</div>
      </section>
    `;
  }

  function renderAchievements() {
    const progress = Achievements.getProgress();
    const percentage = progress.total > 0 ? progress.unlocked / progress.total * 100 : 0;
    return `
      <section class="achievements-page">
        <div class="achievement-header">
          <div>
            <p class="eyebrow">Persistent achievement archive</p>
            <h1>成就档案</h1>
            <p>成就保存在当前浏览器中，跨刷新、跨局保留。未解锁内容不会提前公开名称。</p>
          </div>
          <button class="button button-primary" type="button" data-action="close-achievements">返回游戏</button>
        </div>
        <div class="achievement-progress">
          <div><strong>已解锁 ${progress.unlocked} / ${progress.total}</strong><span>${Math.round(percentage)}%</span></div>
          <div class="achievement-track"><div style="width: ${percentage}%"></div></div>
        </div>
        ${Achievements.isPersistent() ? "" : '<p class="achievement-warning">当前浏览器禁止本地存储，本次解锁可能无法持久保存。</p>'}
        ${renderAchievementSection("candidate", "固定角色")}
        ${renderAchievementSection("ending", "结局")}
      </section>
    `;
  }

  function showAchievementUnlocks(records) {
    clearTimeout(toastTimer);
    achievementToasts.innerHTML = records.map((record) => `
      <div class="achievement-toast">
        <span>解锁成就</span>
        <strong>${record.title}</strong>
      </div>
    `).join("");
    if (records.length > 0) {
      toastTimer = setTimeout(() => {
        achievementToasts.innerHTML = "";
      }, 4000);
    }
  }

  function renderStatus(state) {
    if (state.phase === "start") {
      statusBar.innerHTML = '<span class="status-chip">等待 HR 到岗</span>';
      return;
    }

    if (state.phase === "ending") {
      statusBar.innerHTML = '<span class="status-chip"><strong>经营周期已结束</strong></span>';
      return;
    }

    const receptionNumber = state.phase === "news"
      ? Data.CONFIG.candidatesPerMonth
      : state.candidateIndex + 1;

    statusBar.innerHTML = `
      <span class="status-chip">第 <strong>${state.month}</strong> / ${Data.CONFIG.totalMonths} 月</span>
      <span class="status-chip">本月接待 <strong>${receptionNumber}</strong> / ${Data.CONFIG.candidatesPerMonth} 人</span>
      <span class="status-chip">在职 <strong>${state.employees.length}</strong> 人</span>
    `;
  }

  function renderStart() {
    return `
      <section class="start-screen">
        <div class="start-copy">
          <p class="eyebrow">Welcome to the interview room</p>
          <h1>今天也在<br><span>招个人。</span></h1>
          <p class="start-description">
            简历都很漂亮，回答都很动听。你只有几次提问机会，判断桌子对面的人才，
            究竟是公司的未来，还是未来公司新闻里的主角。
          </p>
          <button class="button button-primary" type="button" data-action="start">开始第一个月</button>
        </div>
        <aside class="start-rules">
          <h2>本轮招聘安排</h2>
          <ol class="rule-list">
            <li><span class="rule-number">01</span><span>暂定经营 ${Data.CONFIG.totalMonths} 个月，每月接待 ${Data.CONFIG.candidatesPerMonth} 名应聘者。</span></li>
            <li><span class="rule-number">02</span><span>招收特定应聘者，解锁新问题</span></li>
            <li><span class="rule-number">03</span><span>平均服从度或稳定性小于25则遗憾退场</span></li>
          </ol>
        </aside>
      </section>
    `;
  }

  function renderAnswerHistory(history) {
    if (history.length === 0) {
      return '<p class="empty-answers">尚未提问。可以直接决定，也可以先问几个问题寻找线索。</p>';
    }

    return `
      <div class="answer-history" aria-live="polite">
        ${history.map((item, index) => `
          <article class="answer-item">
            <span class="answer-number">Q${index + 1}</span>
            <div>
              <h4>${item.questionText}</h4>
              <p>${item.answer}</p>
            </div>
          </article>
        `).join("")}
      </div>
    `;
  }

  function renderQuestionGroup(state, type, label) {
    const askedIds = new Set(state.askedQuestions.map((item) => item.questionId));
    const noQuestionsLeft = state.askedQuestions.length >= Data.CONFIG.maxQuestionsPerCandidate;
    const questions = state.availableQuestions.filter((question) => question.type === type);

    return `
      <section class="question-group">
        <h3>${label}</h3>
        <div class="question-list">
          ${questions.map((question) => {
            const disabled = noQuestionsLeft || askedIds.has(question.id);
            const asked = askedIds.has(question.id);
            return `
              <button class="question-button" type="button" data-action="ask" data-question-id="${question.id}" ${disabled ? "disabled" : ""}>
                <span>${question.text}</span>
                <small>${asked ? "已提问" : noQuestionsLeft ? "次数已用完" : "提问"}</small>
              </button>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }

  function renderInterviewPanel(state) {
    const remaining = Data.CONFIG.maxQuestionsPerCandidate - state.askedQuestions.length;
    return `
      <div class="interview-panel">
        <div class="question-heading">
          <h2>面试提问</h2>
          <span>剩余 <strong>${remaining}</strong> / ${Data.CONFIG.maxQuestionsPerCandidate} 次</span>
        </div>
        ${renderQuestionGroup(state, "common", "常规问题")}
        ${renderQuestionGroup(state, "abstract", "本月抽象问题")}
        ${remaining === 0 ? '<p class="limit-note">提问次数已用完，该作出决定了。</p>' : ""}
        ${renderAnswerHistory(state.askedQuestions)}
      </div>
    `;
  }

  function renderCandidate(state) {
    const candidate = Game.getCurrentCandidate();
    return `
      <section class="desk-card">
        <div class="desk-heading">
          <h1>第 ${state.month} 月 · 第 ${state.candidateIndex + 1} 位应聘者</h1>
          <span class="prototype-badge">面试中</span>
        </div>
        <div class="candidate-section">
          <div class="candidate-profile">
            <div class="avatar" aria-hidden="true">${candidate.name.slice(0, 1)}</div>
            <div>
              <h2 class="candidate-name">${candidate.name}</h2>
              <p class="candidate-archetype">校招候选人</p>
            </div>
          </div>
          ${renderInterviewPanel(state)}
          <div class="button-row decision-buttons">
            <button class="button button-primary" type="button" data-action="hire">录用</button>
            <button class="button button-secondary" type="button" data-action="reject">拒绝</button>
          </div>
        </div>
      </section>
    `;
  }

  function renderAttributeReveal(attributes) {
    return `
      <div class="attribute-reveal" aria-label="入职属性揭晓">
        ${Data.ATTRIBUTES.map(({ key, label }) => `
          <div class="reveal-item">
            <span>${label}</span>
            <strong>${attributes[key]}</strong>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderDecision(state) {
    const { accepted, candidate } = state.lastDecision;
    const isLast = state.candidateIndex === Data.CONFIG.candidatesPerMonth - 1;

    return `
      <section class="desk-card">
        <div class="desk-heading">
          <h1>招聘决定已盖章</h1>
          <span class="prototype-badge">${accepted ? "已录用" : "已拒绝"}</span>
        </div>
        <div class="candidate-section">
          <div class="candidate-profile">
            <div class="avatar" aria-hidden="true">${candidate.name.slice(0, 1)}</div>
            <div>
              <h2 class="candidate-name">${candidate.name}</h2>
              <p class="candidate-archetype">${Data.getArchetypeName(candidate)}</p>
              ${accepted ? `<p class="candidate-resume">${candidate.resume}</p>` : ""}
            </div>
          </div>
          <div class="decision-result ${accepted ? "" : "rejected"}">
            <h3>${accepted ? "欢迎加入公司" : "感谢前来面试"}</h3>
            <p>${accepted ? "隐藏属性现已揭晓，公司属性已经重新计算。" : "隐藏属性现已揭晓；该应聘者不会进入员工名单，也不会影响公司属性。"}</p>
            ${renderAttributeReveal(candidate.attributes)}
          </div>
          ${state.lastDecision.unlockedQuestions.length > 0 ? `
            <div class="unlock-result">
              <strong>解锁新面试问题</strong>
              <p>${state.lastDecision.unlockedQuestions.map((question) => question.text).join("、")}</p>
            </div>
          ` : ""}
          <details class="decision-interview">
            <summary>查看本次面试记录（${state.lastDecision.askedCount} 次提问）</summary>
            ${renderAnswerHistory(state.lastDecision.interviewHistory)}
          </details>
          <div class="button-row" style="margin-top: 24px;">
            <button class="button button-accent" type="button" data-action="next">
              ${isLast ? "进入月末结算" : "接待下一位"}
            </button>
          </div>
        </div>
      </section>
    `;
  }

  function renderCompany(state) {
    const employeeTags = state.employees.length > 0
      ? state.employees.map((employee) => `<span class="employee-tag">${employee.name} · ${employee.hiredMonth} 月</span>`).join("")
      : '<p class="empty-employees">目前还没有员工。空公司六项均值按 50 显示，总值为 0。</p>';
    const attractionBonus = Math.round(Data.getAttractionBonus(state.highQualityHires) * 100);
    const unlockedQuestions = Data.QUESTIONS.filter((question) => state.unlockedQuestionIds.includes(question.id));

    return `
      <aside class="company-panel">
        <div class="company-heading">
          <h2>公司属性</h2>
          <span>实时汇总</span>
        </div>
        <div class="company-stats">
          ${Data.ATTRIBUTES.map(({ key, label, showTotal }) => `
            <div class="stat-item">
              <div class="stat-topline">
                <span>${label}均值</span>
                <span class="stat-values">
                  ${showTotal ? `<small>总值 ${state.stats.totals[key]}</small>` : ""}
                  <strong>${formatAverage(state.stats.averages[key])}</strong>
                </span>
              </div>
              <div class="stat-track" aria-hidden="true">
                <div class="stat-fill" style="width: ${state.stats.averages[key]}%"></div>
              </div>
            </div>
          `).join("")}
        </div>
        <div class="recruitment-status">
          <h3>招聘增益</h3>
          <p>优秀员工 ${state.highQualityHires} 名，后续高质量候选人权重 <strong>+${attractionBonus}%</strong></p>
          <p>${unlockedQuestions.length > 0
            ? `已解锁 ${unlockedQuestions.length} 个问题：${unlockedQuestions.map((question) => question.text).join("、")}`
            : "尚未解锁特殊面试问题"}</p>
          <small>人才权重在下月抽人时生效；特殊问题入职后立即可用。</small>
        </div>
        <div class="employee-list">
          <h3>在职员工（${state.employees.length}）</h3>
          <div class="employee-tags">${employeeTags}</div>
        </div>
      </aside>
    `;
  }

  function getAttributeLabel(key) {
    return Data.ATTRIBUTES.find((attribute) => attribute.key === key).label;
  }

  function renderNewsArchive(entries) {
    if (entries.length === 0) {
      return "";
    }

    return `
      <section class="news-archive">
        <h2>新闻档案</h2>
        <div class="archive-list">
          ${entries.map((entry) => `
            <details class="archive-item">
              <summary>
                <span>第 ${entry.month} 月</span>
                <strong>${entry.news.title}</strong>
                <small>${getAttributeLabel(entry.news.attribute)}均值 ${formatAverage(entry.stats.averages[entry.news.attribute])}</small>
              </summary>
              <p>${entry.news.text}</p>
            </details>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderNews(state) {
    const hasEnding = Boolean(state.pendingEnding) || state.month >= Data.CONFIG.totalMonths;
    const currentEntry = state.newsHistory[state.newsHistory.length - 1];
    const currentNews = currentEntry.news;
    const directionLabels = { low: "低值警报", high: "高值快讯", normal: "平稳月报" };

    return `
      <section class="news-card">
        <p class="eyebrow">Monthly company briefing</p>
        <div class="news-meta">
          <span>第 ${state.month} 月</span>
          <span>${getAttributeLabel(currentNews.attribute)} · ${directionLabels[currentNews.direction]}</span>
        </div>
        <h1>${currentNews.title}</h1>
        <p class="news-lead">${currentNews.text}</p>
        <p class="news-trigger">
          本条新闻由${getAttributeLabel(currentNews.attribute)}均值
          ${formatAverage(currentEntry.stats.averages[currentNews.attribute])} 触发，已存入新闻档案。
        </p>
        <div class="month-summary">
          <div class="summary-item"><span>智力总值 / 均值</span><strong>${currentEntry.stats.totals.intelligence} / ${formatAverage(currentEntry.stats.averages.intelligence)}</strong></div>
          <div class="summary-item"><span>社交总值 / 均值</span><strong>${currentEntry.stats.totals.social} / ${formatAverage(currentEntry.stats.averages.social)}</strong></div>
          <div class="summary-item"><span>神人总值 / 均值</span><strong>${currentEntry.stats.totals.weirdness} / ${formatAverage(currentEntry.stats.averages.weirdness)}</strong></div>
        </div>
        <button class="button button-primary" type="button" data-action="continue-news">
          ${hasEnding ? "查看经营结算" : `进入第 ${state.month + 1} 月`}
        </button>
        ${renderNewsArchive(state.newsHistory.slice(0, -1))}
      </section>
    `;
  }

  function renderEnding(state) {
    const ending = Data.ENDINGS[state.ending];
    return `
      <section class="ending-card">
        <p class="eyebrow">Final performance review</p>
        <h1>${ending.title}</h1>
        <h2>${ending.subtitle}</h2>
        <p class="ending-description">${ending.description}</p>
        <div class="ending-rules">
          <p>智力：总值 ${state.stats.totals.intelligence}，均值 ${formatAverage(state.stats.averages.intelligence)}</p>
          <p>社交：总值 ${state.stats.totals.social}，均值 ${formatAverage(state.stats.averages.social)}</p>
          <p>神人指数：总值 ${state.stats.totals.weirdness}，均值 ${formatAverage(state.stats.averages.weirdness)}</p>
        </div>
        ${renderNewsArchive(state.newsHistory)}
        <button class="button button-accent" type="button" data-action="restart">重新开始</button>
      </section>
    `;
  }

  function render() {
    const state = Game.getState();
    renderAchievementButton();

    if (showingAchievements) {
      statusBar.innerHTML = '<span class="status-chip"><strong>成就档案</strong></span>';
      app.innerHTML = renderAchievements();
      return;
    }

    renderStatus(state);

    if (state.phase === "start") {
      app.innerHTML = renderStart();
      return;
    }

    if (state.phase === "ending") {
      app.innerHTML = renderEnding(state);
      return;
    }

    if (state.phase === "news") {
      app.innerHTML = renderNews(state);
      return;
    }

    const desk = state.phase === "decision" ? renderDecision(state) : renderCandidate(state);
    app.innerHTML = `<div class="game-layout">${desk}${renderCompany(state)}</div>`;
  }

  const actions = {
    start: () => Game.startGame(),
    ask: (button) => Game.askQuestion(button.dataset.questionId),
    hire: () => Game.decide(true),
    reject: () => Game.decide(false),
    next: () => Game.advance(),
    "continue-news": () => Game.continueFromNews(),
    "close-achievements": () => {
      showingAchievements = false;
    },
    restart: () => Game.restart()
  };

  app.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button || button.disabled) {
      return;
    }

    const action = actions[button.dataset.action];
    if (action) {
      action(button);
      const unlocks = Game.consumeAchievementUnlocks();
      render();
      showAchievementUnlocks(unlocks);
    }
  });

  achievementsButton.addEventListener("click", () => {
    showingAchievements = true;
    render();
  });

  render();
})();

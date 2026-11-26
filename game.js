window.CampusGame = (() => {
  const Data = window.CampusData;
  const Company = window.CampusCompany;
  const Achievements = window.CampusAchievements;
  let state = createInitialState();

  function createInitialState() {
    return {
      phase: "start",
      month: 1,
      candidateIndex: 0,
      candidates: [],
      availableQuestions: [],
      askedQuestions: [],
      employees: [],
      highQualityHires: 0,
      unlockedQuestionIds: [],
      stats: Company.calculateStats([]),
      lastDecision: null,
      newsHistory: [],
      pendingEnding: null,
      ending: null,
      achievementUnlocks: []
    };
  }

  function loadMonth(month) {
    state.month = month;
    state.candidateIndex = 0;
    state.candidates = Data.createMonthlyCandidates(month, state.highQualityHires);
    state.availableQuestions = Data.createMonthlyQuestions(state.unlockedQuestionIds);
    state.askedQuestions = [];
    state.lastDecision = null;
    state.pendingEnding = null;
    state.phase = "interview";
  }

  function startGame() {
    state = createInitialState();
    loadMonth(1);
    return state;
  }

  function getCurrentCandidate() {
    return state.candidates[state.candidateIndex] || null;
  }

  function askQuestion(questionId) {
    if (state.phase !== "interview"
      || state.askedQuestions.length >= Data.CONFIG.maxQuestionsPerCandidate
      || state.askedQuestions.some((item) => item.questionId === questionId)) {
      return state;
    }

    const question = state.availableQuestions.find((item) => item.id === questionId);
    const candidate = getCurrentCandidate();
    if (!question || !candidate) {
      return state;
    }

    const answer = Data.resolveAnswer(candidate, question);
    state.askedQuestions.push({
      questionId: question.id,
      questionText: question.text,
      answer: answer.text,
      source: answer.source
    });
    return state;
  }

  function unlockAchievement(id) {
    const record = Achievements.unlock(id);
    if (record) {
      state.achievementUnlocks.push(record);
    }
  }

  function decide(accepted) {
    if (state.phase !== "interview") {
      return state;
    }

    const candidate = getCurrentCandidate();
    if (!candidate) {
      throw new Error("当前没有可处理的求职者。");
    }

    const unlockedQuestions = [];

    if (accepted) {
      state.employees.push({ ...candidate, hiredMonth: state.month });
      state.stats = Company.calculateStats(state.employees);

      if (!candidate.isGenerated) {
        unlockAchievement(`candidate:${candidate.baseId}`);
      }

      if (Data.isHighQuality(candidate)) {
        state.highQualityHires += 1;
      }

      (candidate.unlockQuestionIds || []).forEach((questionId) => {
        if (!state.unlockedQuestionIds.includes(questionId)) {
          state.unlockedQuestionIds.push(questionId);
          const question = Data.QUESTIONS.find((item) => item.id === questionId);
          unlockedQuestions.push(question);
          if (!state.availableQuestions.some((item) => item.id === questionId)) {
            state.availableQuestions.push(question);
          }
        }
      });
    }

    state.lastDecision = {
      accepted,
      candidate,
      unlockedQuestions,
      askedCount: state.askedQuestions.length,
      interviewHistory: state.askedQuestions.map((item) => ({ ...item }))
    };
    state.phase = "decision";
    const immediateEnding = Company.determineImmediateEnding(state.stats);
    if (immediateEnding) {
      state.ending = immediateEnding;
      state.phase = "ending";
      unlockAchievement(`ending:${immediateEnding}`);
    }
    return state;
  }

  function finishMonth() {
    state.stats = Company.calculateStats(state.employees);
    const news = Company.selectMonthlyNews(state.stats, state.newsHistory);
    state.pendingEnding = Company.determineEnding(state.stats, state.month >= Data.CONFIG.totalMonths);
    state.newsHistory.push({
      month: state.month,
      employeeCount: state.employees.length,
      stats: {
        employeeCount: state.stats.employeeCount,
        totals: { ...state.stats.totals },
        averages: { ...state.stats.averages }
      },
      news
    });
    state.phase = "news";
  }

  function advance() {
    if (state.phase !== "decision") {
      return state;
    }

    if (state.candidateIndex < Data.CONFIG.candidatesPerMonth - 1) {
      state.candidateIndex += 1;
      state.askedQuestions = [];
      state.lastDecision = null;
      state.phase = "interview";
      return state;
    }

    finishMonth();
    return state;
  }

  function continueFromNews() {
    if (state.phase !== "news") {
      return state;
    }

    if (state.pendingEnding) {
      state.ending = state.pendingEnding;
      state.phase = "ending";
      unlockAchievement(`ending:${state.ending}`);
      return state;
    }

    if (state.month >= Data.CONFIG.totalMonths) {
      state.ending = "standard";
      state.phase = "ending";
      unlockAchievement(`ending:${state.ending}`);
      return state;
    }

    loadMonth(state.month + 1);
    return state;
  }

  function restart() {
    state = createInitialState();
    return state;
  }

  function consumeAchievementUnlocks() {
    return state.achievementUnlocks.splice(0);
  }

  function getState() {
    return state;
  }

  return {
    getState,
    getCurrentCandidate,
    consumeAchievementUnlocks,
    startGame,
    askQuestion,
    decide,
    advance,
    continueFromNews,
    restart
  };
})();

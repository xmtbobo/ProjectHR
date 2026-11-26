window.CampusCompany = (() => {
  const { ATTRIBUTES, CONFIG } = window.CampusData;

  function calculateStats(employees) {
    const totals = {};
    const averages = {};

    ATTRIBUTES.forEach(({ key }) => {
      totals[key] = employees.reduce((sum, employee) => sum + employee.attributes[key], 0);
      averages[key] = employees.length > 0
        ? totals[key] / employees.length
        : CONFIG.emptyAverage;
    });

    return {
      employeeCount: employees.length,
      totals,
      averages
    };
  }

  function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function chooseUnusedTemplate(candidates, usedIds) {
    const unused = candidates.filter((news) => !usedIds.has(news.id));
    return randomItem(unused.length > 0 ? unused : candidates);
  }

  function selectMonthlyNews(stats, history) {
    const { NEWS_TEMPLATES } = window.CampusData;
    const usedIds = new Set(history.map((entry) => entry.news.id));
    const triggered = NEWS_TEMPLATES
      .filter((news) => news.direction !== "normal")
      .map((news) => {
        const average = stats.averages[news.attribute];
        const deviation = news.direction === "low"
          ? news.threshold - average
          : average - news.threshold;
        return { news, deviation };
      })
      .filter((item) => item.deviation >= 0);

    let candidates = [];

    if (triggered.length > 0) {
      const largestDeviation = Math.max(...triggered.map((item) => item.deviation));
      candidates = triggered
        .filter((item) => item.deviation === largestDeviation)
        .map((item) => item.news);
    } else {
      const distances = ATTRIBUTES.map(({ key }) => ({
        attribute: key,
        distance: Math.abs(stats.averages[key] - CONFIG.emptyAverage)
      }));
      const largestDistance = Math.max(...distances.map((item) => item.distance));
      const extremeAttributes = distances
        .filter((item) => item.distance === largestDistance)
        .map((item) => item.attribute);
      candidates = NEWS_TEMPLATES.filter((news) => news.direction === "normal"
        && extremeAttributes.includes(news.attribute));
    }

    if (candidates.length === 0) {
      throw new Error("没有可用于本月的公司新闻模板。");
    }

    return chooseUnusedTemplate(candidates, usedIds);
  }

  function matchesEnding(stats, rule) {
    if (rule.intelligenceTotal !== undefined && stats.totals.intelligence < rule.intelligenceTotal) return false;
    if (rule.socialTotal !== undefined && stats.totals.social < rule.socialTotal) return false;
    if (rule.weirdnessMin !== undefined && stats.totals.weirdness < rule.weirdnessMin) return false;
    if (rule.weirdnessMax !== undefined && stats.totals.weirdness > rule.weirdnessMax) return false;
    if (rule.intelligenceAverage !== undefined && stats.averages.intelligence < rule.intelligenceAverage) return false;
    if (rule.socialAverage !== undefined && stats.averages.social < rule.socialAverage) return false;
    if (rule.weirdnessAverage !== undefined && stats.averages.weirdness < rule.weirdnessAverage) return false;
    if (rule.employeeCount !== undefined && stats.employeeCount < rule.employeeCount) return false;
    if (rule.employeeEquals !== undefined && stats.employeeCount !== rule.employeeEquals) return false;
    if (rule.employeeMax !== undefined && stats.employeeCount > rule.employeeMax) return false;
    if (rule.averageMin !== undefined
      && !["motivation", "obedience", "stability"].every((key) => stats.averages[key] >= rule.averageMin)) return false;
    return true;
  }

  function isRegretExit(stats) {
    const threshold = CONFIG.ending.regret.averageMax;
    return stats.averages.obedience < threshold || stats.averages.stability < threshold;
  }

  function isResignation(stats) {
    const rule = CONFIG.ending.resign;
    return stats.totals.intelligence < rule.totalMax
      || stats.totals.social < rule.totalMax
      || ["motivation", "obedience", "stability"].some((key) => stats.averages[key] < rule.averageMax);
  }

  function determineImmediateEnding(stats) {
    return isRegretExit(stats) ? "regret-exit" : null;
  }

  function determineEnding(stats, isFinalMonth = false) {
    if (!isFinalMonth) {
      return null;
    }

    const rules = CONFIG.ending;
    const checks = [
      ["ace-company", () => matchesEnding(stats, rules.ace)],
      ["unusual-company", () => matchesEnding(stats, rules.unusual)],
      ["extreme-efficiency", () => matchesEnding(stats, rules.efficiency)],
      ["regret-exit", () => isRegretExit(stats)],
      ["weirdness-code", () => matchesEnding(stats, rules.code)],
      ["happy-workstations", () => matchesEnding(stats, rules.happy)],
      ["quantity-victory", () => matchesEnding(stats, rules.quantity)],
      ["normal-operation", () => matchesEnding(stats, rules.normal)],
      ["struggling-company", () => matchesEnding(stats, rules.struggling)],
      ["hr-pay-cut", () => matchesEnding(stats, rules.payCut)],
      ["empty-applications", () => isFinalMonth && matchesEnding(stats, rules.empty)],
      ["resign-company", () => isFinalMonth && isResignation(stats)],
      ["strict-recruitment", () => isFinalMonth && matchesEnding(stats, rules.strict)]
    ];

    const matched = checks.find(([, check]) => check());
    return matched ? matched[0] : null;
  }

  return {
    calculateStats,
    selectMonthlyNews,
    determineImmediateEnding,
    determineEnding
  };
})();

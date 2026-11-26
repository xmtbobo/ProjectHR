window.CampusAchievements = (() => {
  const Data = window.CampusData;
  const STORAGE_KEY = "campus-recruitment-achievements-v1";
  let persistent = true;
  let records = loadRecords();

  function getCatalog() {
    const candidates = Data.CANDIDATES.map((candidate) => ({
      id: `candidate:${candidate.id}`,
      type: "candidate",
      title: candidate.name,
      description: "成功招聘这名固定角色。"
    }));
    const endings = Object.entries(Data.ENDINGS).map(([id, ending]) => ({
      id: `ending:${id}`,
      type: "ending",
      title: ending.title,
      description: ending.subtitle
    }));
    return [...candidates, ...endings];
  }

  function loadRecords() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
    } catch (error) {
      persistent = false;
      return {};
    }
  }

  function saveRecords() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
      persistent = true;
    } catch (error) {
      persistent = false;
    }
  }

  function unlock(id) {
    if (records[id]) {
      return null;
    }

    const achievement = getCatalog().find((item) => item.id === id);
    if (!achievement) {
      return null;
    }

    const record = { ...achievement, unlockedAt: new Date().toISOString() };
    records[id] = record;
    saveRecords();
    return record;
  }

  function getRecord(id) {
    return records[id] || null;
  }

  function getProgress() {
    return {
      unlocked: getCatalog().filter((achievement) => records[achievement.id]).length,
      total: getCatalog().length
    };
  }

  function isPersistent() {
    return persistent;
  }

  return {
    getCatalog,
    getRecord,
    getProgress,
    isPersistent,
    unlock
  };
})();

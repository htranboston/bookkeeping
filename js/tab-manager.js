(() => {
  class TabManager {
    constructor() {
      this.currentTab = null;
    }

    setCurrentTab(tabId) {
      localStorage.setItem('currentTab', tabId);
      this.currentTab = tabId;
    }

    getCurrentTab() {
      return this.currentTab || localStorage.getItem('currentTab');
    }
  }
})();

export default new TabManager();
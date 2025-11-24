import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),

  actions: {
    setUser(userData) {
      this.user = userData;
    },

    logout() {
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
    }
  }
});

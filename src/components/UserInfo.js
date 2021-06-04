export default class UserInfo {
    constructor(userNameSelector, userInfoSelector) {
        this._userNameSelector = userNameSelector;
        this._userInfoSelector = userInfoSelector;
    }

    getUserInfo() {
      const userInfoSelector = this._userInfoSelector.textContent;
      const userNameSelector = this._userNameSelector.textContent;

      return {userInfoSelector, userNameSelector};
    }

    setUserInfo(data) {
        this._userInfoSelector.textContent = data.userInfoSelector;
        this._userNameSelector.textContent = data.userNameSelector;
    }
}
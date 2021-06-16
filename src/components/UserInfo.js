export default class UserInfo {
    constructor(nameElementSelector, professionElementSelector) {
      this._nameElement = document.querySelector(nameElementSelector);
      this._professionElement = document.querySelector(professionElementSelector);
        } 

    getUserInfo() {
      const professionElement = this._professionElement.textContent;
      const nameElement = this._nameElement.textContent;

      return {professionElement, nameElement};
    }

    setUserInfo(data) {
        this._professionElement.textContent = data.professionElement;
        this._nameElement.textContent = data.nameElement;
    }
}
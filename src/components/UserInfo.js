export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._displayName = document.querySelector(nameSelector);
    this._displayJob = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      title: this._displayName.textContent,
      description: this._displayJob.textContent,
    };
  }

  setUserInfo(data) {
    this._displayName.textContent = dtat.title;
    this._displayJob.textContent = data.description;
  }
}

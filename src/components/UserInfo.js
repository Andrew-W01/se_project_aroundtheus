export default class UserInfo {
  constructor(nameSelector, jobSelector, imageSelector) {
    this._displayName = document.querySelector(nameSelector);
    this._displayJob = document.querySelector(jobSelector);
    this._displayImage = document.querySelector(imageSelector);
  }

  getUserInfo() {
    return {
      title: this._displayName.textContent,
      description: this._displayJob.textContent,
    };
  }

  setUserInfo(cardData) {
    if (this._displayName) {
      this._displayName.textContent = cardData.title;
    }
    if (this._displayJob) {
      this._displayJob.textContent = cardData.description;
    }
  }

  setUserImage(cardData) {
    this._displayImage.src = cardData;
  }
}

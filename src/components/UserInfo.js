export default class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._profileName = document.querySelector(nameSelector);//'.profile-info__name'
    this._profileJob = document.querySelector(jobSelector);//'.profile-info__description'
  }
  
  getUserInfo () {    
    const userData = {profileName: this._profileName.value, profileJob: this._profileJob.value};
    return userData;
  };

  setUserInfo ({name, description}) {
    this._profileName.textContent = name;
    this._profileJob.textContent = description;    
  }
}
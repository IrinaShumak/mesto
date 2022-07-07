export default class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._profileName = document.querySelector(nameSelector);//'.profile-info__name'
    this._profileJob = document.querySelector(jobSelector);//'.profile-info__description'
  }
  
  getUserInfo () {    
    const userData = {profileName: this._profileName.value, profileJob: this._profileJob.value};
    return userData;
  };

  setUserInfo ({fullname, description}) {
    this._profileName.textContent = fullname;
    this._profileJob.textContent = description;    
  }
}
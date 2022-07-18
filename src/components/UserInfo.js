export default class UserInfo {
  constructor({nameSelector, jobSelector, avatarSelector}) {
    this._profileName = document.querySelector(nameSelector);//'.profile-info__name'
    this._profileJob = document.querySelector(jobSelector);//'.profile-info__description'
    this._profileAvatar =  document.querySelector(avatarSelector);
  }

  setUserInfo ({name, about}) {
    this._profileName.textContent = name;
    this._profileJob.textContent = about;    
  }

  setUserAvatar ({avatar}) {
    this._profileAvatar.src = avatar;
  }
  
  getUserInfoFromServer ({name, about, avatar}) {    
    this.setUserInfo ({name, about});
    this.setUserAvatar ({avatar});    
  }

    getUserInfo () {    
      const userData = {profileName: this._profileName.textContent, profileJob: this._profileJob.textContent, profileAvatar: this._profileAvatar.src};
      return userData;
    }
  }
  

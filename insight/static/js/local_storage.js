export default function FrozenStorage() {
  this.storage = window.localStorage
  this.prefix = 'freq__';
  this.set = function(key, value) {
    window.localStorage.setItem(`${this.prefix}${key}`, JSON.stringify(value))
  }

  this.get = function(key) {
      return JSON.parse(window.localStorage.getItem(`${this.prefix}${key}`));
  }

  this.remove = function(key){
      window.localStorage.removeItem(`${this.prefix}${key}`);
  }

  this.clear = function(){
      window.localStorage.clear();
  }

  this.logOut = function(){
    this.remove('token')
    this.remove('first_name')
    this.remove('avatar')
    this.remove('vintro')
    this.remove('fault_attempts')
  }
}

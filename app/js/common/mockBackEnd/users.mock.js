'use strict';

function MockBEUsersService(MockBackEndService,$httpBackend,$cookies) {
  'ngInject';

  const service = {};

  var model = MockBackEndService.model;

  var users = model.users || [{
    id: 'USER_ID',
    firstname: 'Public',
    lastname: 'User',
    username: 'user',
    email: 'user@example.com',
    password: 'password',
    type: 'public'
  },
  {
    id: 'BUSINESS_USER_ID',
    firstname: 'Business',
    lastname: 'Man',
    username: 'business',
    email: 'business@example.com',
    password: 'password',
    type: 'business'
  }];

  model.users = users;

  service.findUserById = function(value){
    for (var i = 0; i < users.length; i++) {
      if(value ===users[i].id ) {
        return users[i];
      }
    };
  };

  service.findUserByUsernameOrEmail = function(value){
    for (var i = 0; i < users.length; i++) {
      if(value ===users[i].username || value === users[i].email) {
        return users[i];
      }
    };
  };

  service.createUser = function(email, firstname, lastname, password){
    var existing_user = service.findUserByUsernameOrEmail(email);
    if(existing_user){ return existing_user; }

    var new_user = {
      id: MockBackEndService.generateUUID(),
      firstname: firstname,
      lastname: lastname,
      email: email,
      type: 'public'
    };
    model.users.push(new_user);
    model.save();
    return new_user;
  };

  service.getSessionUser = function(){
    return $cookies.getObject('auth_session');
  };
  service.setSessionUser = function(session){
    if(session){
      $cookies.putObject('auth_session', session);
    } else {
      $cookies.remove('auth_session');
    }
  };

  service.handleLogin = function(data){
    var user = service.findUserByUsernameOrEmail(data.username);

    if(!user) {
      return [400,{ key: "ERR_NO_SUCH_USER" }];
    }
    if(data.password !== user.password) {
      return [400,{ key: "ERR_INVALID_PASSWORD" }];
    }

    service.setSessionUser({
      username: data.username,
      firstname: user.firstname,
      lastname: user.lastname,
      user_id: user.id
    });
    return [200,{}];
  }
  
  /*
    This section of code specifies the httpBackend url's that Mockbackend will handle
  */
  service.init = function() {
    $httpBackend.whenGET('/api/v1/user/status')
    .respond(function() {
      var o = service.getSessionUser();
      if(o){
        var user = service.findUserByUsernameOrEmail(o.username);
        return [200, { 
          status:{ authenticated: true } ,
          user :{
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            id: user.id,
            email: user.email
          }
        }];
      }
      return [400,{ status:{ authenticated: false } }];
    });

    $httpBackend.whenPOST('/auth/login')
    .respond(function(method, url, dataString) {
      var data = JSON.parse(dataString);
      if(data.hpaddress && data.hpaddress!==''){
        return [400,{ key: "ERR_BAD_REQ" }];
      }
      return service.handleLogin(data);
    });

    $httpBackend.whenPOST('/auth/logout')
    .respond(function(method, url, dataString) {
      service.setSessionUser();
      return [200];
    });
  }

  return service;
}

export default {
  name: 'MockBEUsersService',
  fn: MockBEUsersService
};

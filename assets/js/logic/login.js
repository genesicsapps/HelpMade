function login(){

    let obj = {
        EmailAddress:$("#userEmail").val(),
        Password:$("#userPassword").val()
    }
    console.log(obj)
    var callUrl = '/auth/login';	
	RestCall('POST', callUrl, obj, onUserLoginSuccess);
}


function onUserLoginSuccess(msg){
    if(msg.result == "You have been logged in."){
        let encodedString = msg.AuthToken.split('.')[0];
        // var decodedString = atob(encodedString);
        // localStorage.setItem('UserData',JSON.stringify(decodedString));
        location.href = './index.html'
        console.log(msg)
    }
    else{
        showToast('Login details invaild', 'danger');
    }
}
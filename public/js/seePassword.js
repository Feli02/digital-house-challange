function seePassword(){
    let check = document.getElementById('ver');
    let password1 = document.getElementById('password');
    let password2 = document.getElementById('confirm_password');

    if (check.checked == true){
        password1.type = "text";
        password2.type = "text";
    }else {
      password1.type = "password";
      password2.type = "password";
    }
}
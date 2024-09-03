function checkStrength(password){
    let meterBar = $("#meter").find("#meter-bar");
    let meterStatus = $("#meter-text").find("#meter-status");
    let strength = 0;
    if(password.length < 6){
       meterBar.css({
        "background":"#6B778D",
        "width":"10%"
      });
      meterStatus.css("color","#6B778D");
      meterStatus.text("too short") ;
    }
    if(password.length > 7) strength += 1;
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1
    if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
    if(strength < 2){
      meterBar.css({
        "background":"#ff0000",
        "width":"25%"
      });
      meterStatus.css("color","#ff0000");
      meterStatus.text("weak");
    }else if(strength == 2){
      meterBar.css({
        "background":"#00BCD4",
        "width":"75%"
      });
      meterStatus.css("color","#00BCD4");
      meterStatus.text("good");
    }else{
      meterBar.css({
        "background":"#4CAF50",
        "width":"100%"
      });
      meterStatus.css("color","#4CAF50");
      meterStatus.text("strong");
    }
  }
  
  $("#input-password").on("keyup",function(){
   checkStrength($(this).val());
  });
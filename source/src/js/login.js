$(function(){
	$("input").focus(function(){
		$(this).parent().addClass('focus_border') ;
		$(this).prev().addClass('focus_color') ;
		$(this).addClass('point_color') ;
	}).blur(function(){
		$(this).parent().removeClass('focus_border') ; 
		$(this).prev().removeClass('focus_color') ; 
		$(this).removeClass('ponit_color') ;
	}).keyup(function(){
		if($(".user_name").val()!="" && $(".user_psw").val()!=""){
			$(".login_btn").addClass("focus_btn").removeAttr('disabled') ;
		}else{
			$(".login_btn").removeClass("focus_btn").attr('disabled','disabled') ;
		}
	})
	
//登录

	/*$(".login_btn").click(function(){
		var user_name = $('.user_name').val() ;
		var user_psw = $('.user_psw').val() ;
		$.ajax({
			type:"get",
			url:"",
			async:true
		});
	})*/
	
})

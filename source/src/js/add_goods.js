$(function(){
	
	var colorIdArr = [];
	var sizeIdArr = [] ;
	var oldArr = {} ;
	
	//品牌
	$('.add_flex1').on('click', function() {
		if(event.target == this) {
			if($('.brand').hasClass('hide')) {
				$('.brand').removeClass('hide');
			} else {
				$('.brand').addClass('hide');
			}
		}
	})
	$('.brand .add_color_sure').click(function(){
		
	})
	$('.brand .add_color_cancel').click(function(){
		$('.brand').addClass('hide');
	})
	
	//颜色下拉
	var colorOptions = {
		url : 'goods/color/chooselist.json' ,
		successCallback : function(res){
			if(res['status']==200 && res['success']==true){
				var optgroup = '' ;
				var options = '' ;
				var data = res['colorChooseList'] ;
				for(var i = 0,len = data.length; i<len ;i++){
					options = '' ;
					for(var j = 0,lenj = data[i]['colorList'].length;j<lenj ;j++){
						options +='<option value="'+ data[i]['colorList'][j]['goodsColorId'] +'">'+ data[i]['colorList'][j]['colorName'] +'</option>' 
					}					
					optgroup +=' <optgroup label="'+ data[i]['colorTypeName'] +'">'+ options +'</optgroup>'
				}
			}
			$('#color_select').append(optgroup)
		},
		errorCallback : function(res){
			
		}
	}
	Ajax(colorOptions)
	
	//颜色新增
	addColorType('#color_name')
	function addColorType(el){
		var obj = {
			url: 'goods/color/typechooselist.json',
			successCallback :function(res){
				var ohtml = '' ;
				var data = res['colorTypeResultList'] ;				
				for(var i = 0,len = data.length; i<len ;i++){
					ohtml +='<option value="'+ data[i]['name'] +'" data-id = "'+ data[i]['id'] +'">'+ data[i]['name'] +'</option>'
				}
				$(el).append(ohtml) 
			},
			errorCallback : function(res){
				alert('网络错误')
			}
		}
		Ajax(obj)
	}	
	
	$('.flex_color .add_color_form').on('click','.add_color_sure',function(){
		var colorTypeId =  $('#color_name').find('option:selected').attr('data-id') ;
		var colorName = $('.flex_color .add_color_form .text_frame').val() ;
		var obj = {
			url :'goods/color/add.json' ,
			param : {
				colorTypeId : colorTypeId ,
				colorName : colorName
			},
			successCallback : function(res){
				if(res['status']==200 && res['success']==true){
					var optgroups = $('.flex_color .choose select optgroup') ;
					$('.flex_color .choose select optgroup').each(function(){
						if(this.label == $('.flex_color .add_color_form select').val()){
							$(this).append("<option value ="+ res['colorResult']['goodsColorId'] +">"+ res['colorResult']['colorName'] +"</option>")
						}
					})	
					alert('添加成功')
					$('.flex_color .add_color_form').addClass('hide')
				}else{
					alert(res['errMsg'])
				}			
			},
			errorCallback : function(res){
				alert('网络错误')
			}
		}
		Ajax(obj)
	})
	$('.flex_color .add_btn').on('click',function(){
		if(event.target == this){
			if($('.flex_color .add_color_form').hasClass('hide')){
				$('.flex_color .add_color_form').removeClass('hide')
			}else{
				$('.flex_color .add_color_form').addClass('hide')
			}
		}		
	})
	$('.flex_color .add_color_form .add_color_cancel').click(function(){
		$('.flex_color .add_color_form').addClass('hide')
	})
	
	
	
	//尺码下拉
	var colorOptions = {
		url : 'goods/size/chooselist.json' ,
		successCallback : function(res){
			if(res['status']==200 && res['success']==true){
				var optgroup = '' ;
				var options = '' ;
				var data = res['sizeChooseList'] ;
				for(var i = 0,len = data.length; i<len ;i++){
					options = '' ;
					for(var j = 0,lenj = data[i]['sizeList'].length;j<lenj ;j++){
						options +='<option value="'+ data[i]['sizeList'][j]['goodsSizeId'] +'">'+ data[i]['sizeList'][j]['sizeName'] +'</option>' 
					}					
					optgroup +=' <optgroup label="'+ data[i]['sizeTypeName'] +'">'+ options +'</optgroup>'
				}
			}
			$('#size_select').append(optgroup)
		},
		errorCallback : function(res){
			alert('网络错误')
		}
	}
	Ajax(colorOptions)
	
	//尺码新增
	addSizeType('#size_name')
	function addSizeType(el){
		var obj = {
			url: 'goods/size/typechooselist.json',
			successCallback :function(res){
				var ohtml = '' ;
				var data = res['sizeTypeResultList'] ;
				for(var i = 0,len = data.length; i<len ;i++){
					ohtml +='<option value="'+ data[i]['name'] +'" data-id = "'+ data[i]['id'] +'">'+ data[i]['name'] +'</option>'
				}
				$(el).append(ohtml) 
			},
			errorCallback : function(res){
				alert('网络错误')
			}
		}
		Ajax(obj)
	}
	
	
	$('.flex_size .add_color_form').on('click','.add_color_sure',function(){
		var sizeTypeId =  $('#size_name').find('option:selected').attr('data-id') ;
		var sizeName = $('.flex_size .add_color_form .text_frame').val() ;
		var obj = {
			url :'goods/size/add.json' ,
			param : {
				sizeTypeId : sizeTypeId ,
				sizeName : sizeName
			},
			successCallback : function(res){
				if(res['status']==200 && res['success']==true){					
					$('.flex_size .choose select optgroup').each(function(){
						if(this.label == $('.flex_size .add_color_form select').val()){
							$(this).append("<option value ="+ res['sizeResult']['goodsSizeId'] +">"+ res['sizeResult']['sizeName'] +"</option>")
						}
					})	
					alert('添加成功')
					$('.flex_size .add_color_form').addClass('hide')
				}else{
					alert(res['errMsg'])
				}			
			},
			errorCallback : function(res){
				alert('网络错误')
			}
		}
		Ajax(obj)
	})
	
	$('.flex_size .add_color_form .add_color_cancel').click(function(){
		$('.flex_size .add_color_form').addClass('hide')
	})
	
	$('.flex_size .add_btn').on('click',function(){
		if(event.target == this){
			if($('.flex_size .add_color_form').hasClass('hide')){
				$('.flex_size .add_color_form').removeClass('hide')
			}else{
				$('.flex_size .add_color_form').addClass('hide')
			}
		}		
	})
	

	//库存录入
	$('#color_select').on('change',function(){
		var colorArr = $(this).parent().find('.am-selected-list .am-checked .am-selected-text') ;
		var ohtml = '' ;
		colorIdArr = $(this).val();
		for(var i = 0;i<colorArr.length;i++){
			ohtml +='<option value="'+ $(this).val()[i] +'" >'+ colorArr[i].innerText +'</option>'
		}
		$('#recode_color').html(ohtml)
	})
	
	$('#size_select').on('change',function(){
		var sizeArr = $(this).parent().find('.am-selected-list .am-checked .am-selected-text') ;
		var ohtml = '' ;
		sizeIdArr = $(this).val();
		for(var i = 0;i<sizeArr.length;i++){
			ohtml +='<option value="'+ $(this).val()[i] +'">'+ sizeArr[i].innerText +'</option>'
		}
		$('#recode_size').html(ohtml)
	})
		
	$('.flex_recode .add_color_form .add_color_sure').click(function(){
		var areaTxt = '' ;
		var areaIdArr = []
		if($('.flex_recode .text_frame').val() == ""){
			$('.flex_recode .text_frame').val('0')
		}
		$('.flex_recode .add_color_form').addClass('hide') ;

		oldArr[""+ $('#recode_color').parent().find('.am-checked').text().trim()+","+$('#recode_size').parent().find('.am-checked').text().trim() +""] = $(".flex_recode .text_frame").val() ;

		$.each(oldArr,function(value,key){
			areaTxt += value+','+key+'\n' ;
			areaIdArr.push(value+','+key)
		})
		$(".flex_recode textarea").val(areaTxt) ;
	})
	$('.flex_recode .add_color_form .add_color_cancel').click(function(){
		$('.flex_recode .add_color_form').addClass('hide')
	})
	$('.flex_recode .add_btn').on('click',function(){
		if(event.target == this){
			if($('.flex_recode .add_color_form').hasClass('hide')){
				$('.flex_recode .add_color_form').removeClass('hide')
			}else{
				$('.flex_recode .add_color_form').addClass('hide')
			}
		}		
	})
	
	
	//类别
	var classfiy = {
		url: 'goods/classify/chooselist.json',
		successCallback :function(res){
			if(res['status']==200 && res['success']==true){
				var optgroup = '' ;
				var options = '' ;
				var data = res['classifyChooseList'] ;
				for(var i = 0,len = data.length; i<len ;i++){
					options = '' ;
					for(var j = 0,lenj = data[i]['classifyList'].length;j<lenj ;j++){
						options +='<option value="'+ data[i]['classifyList'][j]['goodsClassifyId'] +'">'+ data[i]['classifyList'][j]['classifyName'] +'</option>' 
					}					
					optgroup +=' <optgroup label="'+ data[i]['classifyTypeName'] +'">'+ options +'</optgroup>'
				}
			}
			$('#classfiy').append(optgroup)
		},
		errorCallback : function(res){
			alert('网络错误')
		}
	}
	Ajax(classfiy)
	
	//类别的添加
	$('.add_classfiy_btn').on('click', function() {
		if(event.target == this) {
			if($('.add_classfiy_log').hasClass('hide')){
				$('.add_classfiy_log').removeClass('hide')
			}else{
				$('.add_classfiy_log').addClass('hide')
			}
		}
	})
	$('.add_classfiy_btn .add_color_sure').click(function(){
		var classifyTypeName = $('.add_classfiy_btn .text_frame').val() 
		if(classifyTypeName == ""){
			alert('请填写类别名称')
		}else{
			var classfiy_obj  = {
				url : 'goods/classify/typeadd.json' ,
				param : {
					classifyTypeName : classifyTypeName
				},
				successCallback : function(res){
					if(res['status']==200 && res['success']==true){
						var classfiyHtml = "<optgroup label = "+ res['classifyTypeResult']['name'] +"><option data-id = "+res['classifyTypeResult']['id']+">"+ res['classifyTypeResult']['name'] +"</option></optgroup>" ;
					}
					$(".classfiy select").append(classfiyHtml)
				},
				errorCallback : function(res){
					alert('网络错误')
				}
			}
		}
		Ajax(classfiy_obj)
		$('.add_classfiy_log').addClass('hide')
	})
	$('.add_classfiy_btn .add_color_cancel').click(function(){
		$('.add_classfiy_log').addClass('hide')
	})
	
	
	//价格
	var priceObj = {
		url : 'goods/price/namelist.json',
		successCallback : function(res){
			if(res['status']==200 && res['success']==true && res['priceNameList'].length >0){
				var priceHtml = '' ;
				for(var i = 0,len = res['priceNameList'].length ;i<len ;i++){
					priceHtml+= `
						<div class="form_flex">
							<span class="label">${res['priceNameList'][i]['name']}</span>
							<input type="text" class="input_txt new_price" id = level${res['priceNameList'][i]['level']} />
						</div>
					`
				}
				$('.price_list').append(priceHtml)
			}
		},
		errorCallback : function(res){
			alert('网络错误')
		}
	}
	Ajax(priceObj)
	
	var allPriceObj = {
		url: 'goods/price/history.json' ,
		successCallback : function(res){
			if(res['status']==200 && res['success']==true){
				var allPrice = res['priceHistoryResult']
				$('.priceTag').val(allPrice['priceTag']) ;
				$('.priceBuy').val(allPrice['priceBuy']) ;
				setTimeout(function(){
					$('.price_list .new_price').each(function(){
						var $id = $(this).attr('id');
						for(var i in allPrice){
							if(i.split('price')[1].toLowerCase() == $id){
								$(this).val(allPrice[i])
							}
						}
					})
				},300)
			}
		},
		errorCallback : function(res){
			alert('网络错误')
		}
	}
	Ajax(allPriceObj)
	
	
	$('#is_old_price').on('change',function(){
		if($(this).val() == '否'){
			$('.price_list .input_txt').val("")
		}else{
			Ajax(allPriceObj)
		}
	})
	
	
	/*//返回
	$('.tab_bar .back').click(function(){
		$(".log").removeClass('hide')
		dialog.confirm('确认离开？','add()','add()')
	})
	function add(){
		alert(1)
	}*/
	
	
	
	$('.save').click(function(){
		var formObj = {
			url : 'test/getJson.json' ,
			traditional : true ,
			param : {
				ids:colorIdArr
			},
			successCallback : function(res){
				console.log(res)
			}
		}
		Ajax(formObj)
	})
	//清除按钮功能
	$(".flex_recode .clear_btn").click(function(){
		$(this).parent().find('textarea').val("");
	})
	
	/*$('.add_flex1').on('click','.add_color_type',function(){
		event.stopPropagation();
	})*/
})

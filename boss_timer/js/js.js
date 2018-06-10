var call = 1;
var current_row = 0;
var current_col = 0;
var next = new Date();
var interval = setInterval(myFunction, 1000);
var current_boss =[];
var accept_notify = false;
var audio = new Audio('boss_timer/js/nhac.mp3');
function test(inp)
{
	switch(inp)
	{
		case 1:	
			//if(audio.duration > 0 && !audio.paused)
			//	audio.pause();
			//else
			audio.play();
		break;
		case 2:
			location.reload();
		break;
		default:
			notify();
		break;
	}	
}

function myFunction() {	
	
	if (Notification.permission !== "granted") {
		//alert(Notification.permission);
		//Notification.requestPermission();
	}

	var text_left = document.getElementById("left");
	var current = new Date();
	
	var left = ((next - current)>0)?Math.abs(next - current)/1000:0/1000;
	var hours = format_time(Math.floor(left / 3600) % 24);        
	var minutes = format_time(Math.floor(left / 60) % 60);
	var seconds = format_time(Math.floor(left % 60));

	text_left.innerHTML =  hours +" : "+minutes +" : "+seconds;		
	if(parseInt(hours) >= 0 && parseInt(minutes) >= 0 && parseInt(seconds) != 0) 
	{			
		if(parseInt(hours) == 0 && parseInt(minutes) < 10)
		{
			notify();
		}
		// 2 phut
		if(parseInt(minutes) % 2 == 0 && parseInt(seconds) == 0)
		{
			show_notify = false;	
		}
		return;		
	}
	else
	{
		show_notify = false;		
	}

	c_hour = current.getHours();
	c_min = current.getMinutes();	
	if(c_hour >= 18 && ((c_hour == 22 && c_min < 30) || c_hour < 22))
	{
		switchTime(5);
	}else if(c_hour < 1 ||((c_hour == 22 && c_min > 30) || c_hour > 22))
	{
		if(c_hour != 0)
			next.setDate(next.getDate()+1);
		switchTime(1);
	}else if(c_hour >= 1 && c_hour < 10)
	{
		switchTime(2);
	}else if(c_hour >= 10 && c_hour < 14)
	{
		switchTime(3);
	}else
	{
		switchTime(4);;
	}
	
	/*
	var text_current = document.getElementById("current");
	var text_next = document.getElementById("next");
	text_current.innerHTML = current.toLocaleTimeString('vi');
	text_next.innerHTML =  next.toTimeString();
	*/	
}

function switchTime(block_time)
{	
	var row = 0;
	switch(block_time)
	{
		case 1:	
			next.setHours(1);
			next.setMinutes(0);	
			row = 1		 
			break;
		case 2:
			next.setHours(10);
			next.setMinutes(0);
			row = 2;		
			break;
		case 3:
			next.setHours(14);
			next.setMinutes(0);
			row = 3;
			break;
		case 4:
			next.setHours(18);
			next.setMinutes(0);
			row = 4;
			break;
		case 5:
			next.setHours(22);
			next.setMinutes(30);
			row = 5;
		break;
		default:break;
	}
	next.setSeconds(0);	
	var col = next.getDay() == 0 ? 6 : next.getDay() - 1;	
	switch_stable(row, col);
}
function switch_stable(row,col) //row start from 1, col from 0
{
	if(current_row == row && current_col == col)
		return;
	else
	{		
		setColor(current_row,current_col,'white');		
		current_row = row;
		current_col = col;
		setColor(current_row,current_col,'#800080');
	}
	
}
function setColor(row,col,color)
{
	if(row < 1 || row > 5 || col < 0  ||  col > 6)
		return;
	var refTab = document.getElementById("tboss");	
	var row_tmp = refTab.rows[row];	
	var col_pos = 1;
	var col_tmp = row_tmp.cells[col_pos];    
	while(col > 0)
	{		
		if(col_tmp.colSpan == 2)
		{
			col_pos+=1;			
			col--;
		}
		else
		{
			col_pos+=2;			
			col--;
		}
		col_tmp = row_tmp.cells[col_pos];
	};
	
	if(row_tmp.cells[col_pos].colSpan == 1)		 
	{   	
		var col2 = row_tmp.cells[col_pos+1];
		setNewBoss([col_tmp.firstChild.nodeValue, col2.firstChild.nodeValue]);
		current_boss = [col_tmp.firstChild.nodeValue, col2.firstChild.nodeValue];
		col_tmp.bgColor = color;
		col2.bgColor = color;
	}
	else
	{
		setNewBoss([col_tmp.firstChild.nodeValue]);   
		col_tmp.bgColor =color;
		current_boss = [col_tmp.firstChild.nodeValue];
	}	
}
function setNewBoss(boss)
{	
	var next_boss = document.getElementById("next_boss");
	if(next_boss)
	{
		var tbl     = document.createElement("table");
        var tblBody = document.createElement("tbody");

        var row = document.createElement("tr");           
        var cell = document.createElement("td");    
        var cell2 = document.createElement("td");  
		if(boss.length == 2)
		{
			var element = document.createElement("div");
			element.innerHTML= boss[0];
			element.className = "Image " + "Display " + boss[0];
			element.style="float:left; text-align:center;font-size: 16px;		border: 1px solid #CCC; 	font-family: Arial, Helvetica, sans-serif;";	
			var element2 = document.createElement("div");
			element2.innerHTML= boss[1];
			element2.className = "Image " + "Display " + boss[1];		
			element2.style="float:right; text-align:center;font-size: 16px;		border: 1px solid #CCC; 	font-family: Arial, Helvetica, sans-serif;";			
		   
	        cell.appendChild(element);
	        cell2.appendChild(element2);
	        row.appendChild(cell);
	        row.appendChild(cell2); 
		}
		else
		{			
			var element = document.createElement("div");
			element.className = "Image " + "Display " + boss[0];
			element.innerHTML= boss[0];
			element.style="text-align:center;font-size: 16px;	border: 1px solid #CCC; 	font-family: Arial, Helvetica, sans-serif;";			
			cell.appendChild(element);
			row.appendChild(cell);
		}	
		tblBody.appendChild(row);
	    tbl.align = "center";  
	    tbl.appendChild(tblBody); 
	    next_boss.replaceChild(tbl, next_boss.childNodes[0]);
    }
}
function format_time(time)
{
	if(time < 10) return "0"+time;
	return time;
}

function notify(){
	if (Notification.permission !== "granted") {
		Notification.requestPermission();
	}
	else{
		if(!show_notify )
		{
			var notification = new Notification('Sắp ra boss', {
			  body: (current_boss.length == 2 ? (current_boss[0] +" và "+current_boss[1]):current_boss[0]),
			  icon: "Test2.jpg",
			});			
			audio.play();
		}
		show_notify = true;
	}
}
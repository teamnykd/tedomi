var call = 1;
var current_block = 0;
var next = new Date();
var interval = setInterval(myFunction, 1000);
var current_boss =[];
var accept_notify = false;
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
	hours = minutes = 0;
	if(parseInt(hours) >= 0 && parseInt(minutes) >= 0 && parseInt(seconds) != 0) 
	{			
		if(parseInt(hours) == 0 && parseInt(minutes) < 10)
		{
			notify();
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
		current_row = 5;
	}else if(c_hour < 1 ||((c_hour == 22 && c_min > 30) || c_hour > 22))
	{
		switchTime(1);
		current_row = 1;
	}else if(c_hour >= 1 && c_hour < 10)
	{
		switchTime(2);
		current_row = 2;
	}else if(c_hour >= 10 && c_hour < 14)
	{
		switchTime(3);
		current_row = 3;
	}else
	{
		switchTime(4);
		current_row = 4;
	}
	
	/*
	var text_current = document.getElementById("current");
	var text_next = document.getElementById("next");
	text_current.innerHTML = current.toLocaleTimeString('vi');
	text_next.innerHTML =  next.toTimeString();
	*/	
}

function switchTime(block)
{		
	if(current_block == block)
		return;
	current_block = block;
	var current_col = 1;
	var current_row = block;	
	
	switch(block)
	{
		case 1:
			next.setDate(next.getDate()+1);
			next.setHours(1);
			next.setMinutes(0);			 
			break;
		case 2:
			next.setHours(10);
			next.setMinutes(0);
			break;
		case 3:
			next.setHours(14);
			next.setMinutes(0);
			break;
		case 4:
			next.setHours(18);
			next.setMinutes(0);
			break;
		case 5:
			next.setHours(22);
			next.setMinutes(30);
		break;
		default:break;
	}
	next.setSeconds(0);	

	var day = next.getDay() == 0 ? 6 : next.getDay() - 1;	
	var refTab = document.getElementById("tboss");	
	var row = refTab.rows[current_row];	
	var col = row.cells[current_col];    
	while(day > 0)
	{		
		if(col.colSpan == 2)
		{
			current_col+=1;			
			day--;
		}
		else
		{
			current_col+=2;			
			day--;
		}
		col = row.cells[current_col];
	};
	
	if(row.cells[current_col].colSpan == 1)		 
	{   	
		var col2 = row.cells[current_col+1];
		setNewBoss([col.firstChild.nodeValue, col2.firstChild.nodeValue]);
		current_boss = [col.firstChild.nodeValue, col2.firstChild.nodeValue];
		col.bgColor ='#800080';
		col2.bgColor ='#800080';

		refTab.rows[current_row].cells[(current_col-1)<=0?refTab.rows[current_row].cells.length-1:(current_col-1)].bgColor ='white';
		refTab.rows[current_row].cells[(current_col-2)<=0?refTab.rows[current_row].cells.length-2:(current_col-2)].bgColor ='white';
	}
	else
	{
		setNewBoss([col.firstChild.nodeValue]);   
		col.bgColor ='#800080';
		current_boss = [col.firstChild.nodeValue];

		refTab.rows[current_row].cells[(current_col-1)<=0?refTab.rows[current_row].cells.length-1:(current_col-1)].bgColor ='white';
		refTab.rows[current_row].cells[(current_col-2)<=0?refTab.rows[current_row].cells.length-2:(current_col-2)].bgColor ='white';
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
		}
		show_notify = true;
	}
}
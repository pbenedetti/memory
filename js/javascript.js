
var memory_array=['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','L','L','M','M','N','N'];
var memory_values=[];
var memory_carta_ids=[];
var carte_girate = 0;

Array.prototype.memory_carta_shuffle=function(){

	var i=this.length, j, temp;
	while(--i>0){
		j=Math.floor(Math.random()*(i+1));
		temp=this[j];
		this[j]=this[i];
		this[i]=temp;
	}

}

function nuovoGioco(){
	carte_girate=0;
	var output='';
	memory_array.memory_carta_shuffle();
	for(var i=0;i<memory_array.length;i++){
		output += '<div id="carta_'+i+'" onclick="scelgoCarta(this,\''+memory_array[i]+'\') "></div>'; //genero output
	}
	document.getElementById('memory').innerHTML = output;						//lo metto nel memory board
}

function scelgoCarta(carta,val){
	if(carta.innerHTML=="" && memory_values.length<2){//guardo se sono nella condizione di giocare quindi la carta cliccata è non e\ ancora girata e ho girato meno di due carte
		var a="images/"+val+".jpg";
		carta.style.background='url('+a+') no-repeat';		//visualizzazione carta cliccata: sfondo bianco e valore della carta 
		if(memory_values.length==0){		//non ci sono ancora carte girate
			memory_values.push(val);	//values e ids attributi della carta che l'user sta cliccando, servo ad identificarla
			memory_carta_ids.push(carta.id);
		}
		else if(memory_values.length==1){	//ho gia una carta girata ora clicco la seconda
			memory_values.push(val);	//salvo gli attributi di questa carta
			memory_carta_ids.push(carta.id);
			if(memory_values[0] == memory_values[1]){//controllo se le carte sono uguali
				carte_girate +=2;		//aggiorno il numero di carte trovate
				//clear both arrays per essere pronta alla seconda mandata
				memory_values=[];		
				memory_carta_ids=[];
				//check if board is clear
				if(carte_girate == memory_array.length){//guardo se tutte le coppie sono state trovate
					
					var res;
					
					res = window.confirm("vuoi continuare a giocare")
					if(res){
					window.alert("loading...");//riinizializzo tutto per un altra partita
					
					document.getElementById('memory').innerHTML="";
					nuovoGioco();}
					
					else
						window.prompt("ciaociao!");
				}
				
			
			}
			
			else{	//se grate le carte non erano uguali
				function rigiraCarte(){
					//rigira le carte
					var carta_1=document.getElementById(memory_carta_ids[0]);
					var carta_2=document.getElementById(memory_carta_ids[1]);
					carta_1.style.background='url("images/click.jpg") no-repeat';
					carta_1.innerHTML="";
					carta_2.style.background='url("images/click.jpg") no-repeat';
					carta_2.innerHTML="";
					
					memory_values=[];
					memory_carta_ids=[];
				}
			setTimeout(rigiraCarte,700);
			}
			
		}
	}
}

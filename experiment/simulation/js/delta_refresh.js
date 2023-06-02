function valid_input(l, inp) {
    if(inp.value == "") {
        return;
    } else if(inp.value > Number(inp.max) || inp.value < Number(inp.min) || parseFloat(inp.value) % 1 != 0 || !exist[Number(inp.value)]) {
        l.style.color = "red";
        return false;
    } else {
        l.style.color = "";
        return true;
    }
}

var oneshotAuto = true;

function refresh() {
    canv.width = canv.offsetWidth;
    canv.height = canv.offsetHeight;

    if (type) {
        force();
    }
    drawField();

	//console.log(n);

    var sinp = document.getElementById("svi");
    var einp = document.getElementById("evi");
    sinp.max = exist.length-1;
    einp.max = exist.length-1;
    document.getElementById("startbutn").disabled = !valid_input(document.getElementById("sv"), sinp);
    document.getElementById("startbutn").disabled = !valid_input(document.getElementById("ev"), einp);
    //valid_input(document.getElementById("bf"), document.getElementById("bfi"));
    valid_input(document.getElementById("td"), document.getElementById("tdi"));
    
    //document.getElementById("bf").style.color = "gray";
    document.getElementById("td").style.color = "gray";
    //document.getElementById("bf").style.color = "";
    document.getElementById("td").style.color = "";

	document.getElementById('goal_node').innerHTML = (EndVect == null) ? "undefined" : String(EndVect);

	document.getElementById('visit_array').innerHTML = '[' + String(visit.slice()) + ']';
    document.getElementById('visit_node').innerHTML = String(e);
    document.getElementById('visiting_node').innerHTML = String(visit[0]);
    // document.getElementById('visited_array').innerHTML = '[' + String(visited.slice(0, visited.length-1)) + ']';
    // console.log(visit);
    
    if (document.getElementById('auto').checked) {
        if (started) {
            nuxtdis = true;
            document.getElementById('nuxt').disabled = true;
            if (oneshotAuto) {
                oneshotAuto = false;
                refreshIntervalId = setInterval(BEFS, 1000*input.value)
            }
        } else {
            document.getElementById('nuxt').disabled = false;
        }
    } else if (refreshIntervalId != null) {
        clearInterval(refreshIntervalId);
        nuxtdis = false;
        document.getElementById('nuxt').disabled = false;
        oneshotAuto = true;
    }
    
    if (isQuestion || isObservation) {
		document.getElementById('QuestionBox').style.display = "";
	} else {
		document.getElementById('QuestionBox').style.display = "none";
	}
	
	if (isObservation) {
		document.getElementById('qoro').innerHTML = "Observation";
		document.getElementById('submitform').style.display = "none";
	} else {
		document.getElementById('qoro').innerHTML = "Question";
		document.getElementById('submitform').style.display = "";
	}
}

setInterval(refresh, 30);

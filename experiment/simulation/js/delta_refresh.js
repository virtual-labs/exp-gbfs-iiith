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
	if (canv.width != canv.offsetWidth || canv.height != canv.offsetHeight) {
		canv.width = canv.offsetWidth;
		canv.height = canv.offsetHeight;
		preset();
	}

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
	document.getElementById('weigth_array').innerHTML = '[';
	for (i = 0; i < weight.length; i++) {
		document.getElementById('weigth_array').innerHTML += String(Number(weight[i].toFixed(0)));
		if (i + 1 < visit.length) document.getElementById('weigth_array').innerHTML += ", ";
	}
	document.getElementById('weigth_array').innerHTML += ']';
	
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

	const mq = window.matchMedia( "(max-width: 1282px)" );

	if (mq.matches) {
		document.getElementById('control_container').classList.add('is-3-desktop');
		document.getElementById('control_container').classList.remove('is-2-desktop');
		document.getElementById('canvas_container').classList.add('is-6-desktop');
		document.getElementById('canvas_container').classList.remove('is-8-desktop');
		document.getElementById('info_container').classList.add('is-3-desktop');
		document.getElementById('info_container').classList.remove('is-2-desktop');
	} else {
		document.getElementById('control_container').classList.remove('is-3-desktop');
		document.getElementById('control_container').classList.add('is-2-desktop');
		document.getElementById('canvas_container').classList.remove('is-6-desktop');
		document.getElementById('canvas_container').classList.add('is-8-desktop');
		document.getElementById('info_container').classList.remove('is-3-desktop');
		document.getElementById('info_container').classList.add('is-2-desktop');
	}

}

setInterval(refresh, 30);

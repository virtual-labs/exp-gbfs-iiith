var visit = [];
var edges_weight = [];
var weight = [];

var e;
var c;
var started = false;
var noEdges = false;

var nuxtdis = false;
var refreshIntervalId = null;

var EndVect = null;
var isObservation = true;

var path_costs = [];
var step_text = "";

function ALG_STOP() {
    console.log("ALG_STOP");
    started = false;
    noEdges = false;
    e = undefined;
    c = undefined;
    document.getElementById("nuxt").disabled = false;
    nuxtdis = false;
    clearInterval(refreshIntervalId);
}


document.getElementById('question').innerHTML = "";
function BEFS() {
	step_text = "";
	if (isQuestion) { return; }
	isObservation = true;
    if (noEdges) {
        if (e == SN) {
            ALG_STOP();
			if (e != EndVect) {
				document.getElementById('question').innerHTML = "Not Found Goal!";
			}
            return;
        }
        visited.push(e);
        trav_circle(e, parent[e]);
        c = parent[e];
        e = parent[e];
        for (const next of edges[e].slice()) {
            if (!visited.includes(next) && exist[next] && parent[next] == e) {
                noEdges = false;
                console.log(next);
            }
        }
        console.log('end: ', e);
        return;
    }
    e = visit.shift();
    weight.shift();
    path_costs.shift();
    trav_circle(c, e);
    c = e;
    visited.push(e);
    if (e == EndVect) {
		ALG_STOP();
		document.getElementById('question').innerHTML = "Found Goal!";
		return;
	}
    started=true;
	if (!NoQuestion) { // chance = 1/2
		var rand = Math.random();
		console.log(rand);
		if (rand < chance) {
			isQuestion = true;
			question();
		}
	}

    noEdges = true;  
    for (const next of edges[e].slice()) {
        if (!visited.includes(next) && !visit.includes(next) && exist[next]) {
            noEdges = false;  
			visit.push(next);
            parent[next] = e;
            var dist = Math.sqrt((nodes[next][0] - nodes[EndVect][0])**2 + (nodes[next][1] - nodes[EndVect][1])**2);
			weight.push(dist);
			path_costs.push(edges_weight[e][edges[e].indexOf(next)]);
			// console.log(dist, next, EndVect);
        }
    }

	step_text += "<b>Currently visitable nodes: </b><br/>";
	for (i = 0; i < visit.length; i++) {
		step_text += String(visit[i]);
		if (i + 1 < visit.length) step_text += ", ";
	}

	step_text += "<br/><br/><b>Path Cost g(n):</b> <br/>";
	for (i = 0; i < path_costs.length; i++) {
		console.log(path_costs);
		step_text += String(Number(path_costs[i].toFixed(0)));
		if (i + 1 < visit.length) step_text += ", ";
	}

	step_text += "<br/><b>Estimated Cost h(n):</b> <br/>";
	for (i = 0; i < weight.length; i++) {
		step_text += String(Number(weight[i].toFixed(0)));
		if (i + 1 < visit.length) step_text += ", ";
	}

	step_text += "<br/><b>Total Cost h(n):</b> <br/>";
	for (i = 0; i < weight.length; i++) {
		step_text += String(Number(weight[i].toFixed(0)));
		if (i + 1 < visit.length) step_text += ", ";
	}

    for (let i = 0; i < weight.length; i++) {
        for (let j = 0; j < weight.length - i - 1; j++) {	
            if (weight[j + 1] < weight[j]) {
                [visit[j + 1], visit[j]] = [visit[j], visit[j + 1]];
				//console.log("nobutwhybutafterinbefs: ", visit);
                [weight[j + 1], weight[j]] = [weight[j], weight[j + 1]];
                [path_costs[j + 1], path_costs[j]] = [path_costs[j], path_costs[j + 1]];
            }
        }
    }

	step_text += "<br/><br/><b>Hence Cheapest Node: </b>";
	step_text += String(visit[0]);

	//console.log(step_text);
	document.getElementById('question').innerHTML = step_text;
}

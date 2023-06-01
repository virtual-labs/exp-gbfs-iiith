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
var isObservation = false;

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

function BEFS() {
	if (isQuestion) { return; }
    e = visit.shift();
    weight.shift();
    trav_circle(c, e);
    c = e;
    visited.push(e);
    if (e == EndVect) {
		isObservation = true;
		document.getElementById('question').innerHTML = "Found Goal!";
		ALG_STOP();
		return;
	}
	if (visit.length == 0 && started) {
		ALG_STOP();
		isObservation = true;
		document.getElementById('question').innerHTML = "Didn't Find Goal";
		return;
	}
    started=true;
	if (!NoQuestion) { // chance = 2/10
		var rand = Math.random();
		console.log(rand);
		if (rand < chance) {
			isQuestion = true;
			question();
		}
	}
    for (const next of edges[e].slice()) {
        if (!visited.includes(next) && !visit.includes(next) && exist[next]) {
			visit.push(next);
            var dist = Math.sqrt((nodes[e][0] - nodes[EndVect][0])**2 + (nodes[e][1] - nodes[EndVect][1])**2);
			weight.push(dist);
        }
    }

    for (let i = 0; i < weight.length; i++) {
        for (let j = 0; j < weight.length - i - 1; j++) {	
            if (weight[j + 1] < weight[j]) {
                [visit[j + 1], visit[j]] = [visit[j], visit[j + 1]];
				//console.log("nobutwhybutafterinbefs: ", visit);
                [weight[j + 1], weight[j]] = [weight[j], weight[j + 1]];
            }
        }
    }
}

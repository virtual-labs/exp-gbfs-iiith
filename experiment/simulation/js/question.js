var correct_ans = 1;
var isQuestion = false;

var NoQuestion = true;
var chance = 0.5;

var selected;
var QnA = [
	['What is the next node to visit?', 'visit[0]']
]

function question() {
	// alert("Question!");
	isObservation = false;
	selected = QnA[Math.floor(Math.random() * QnA.length)];
	document.getElementById('question').innerHTML = selected[0];
}

function submit(a) {
	correct_ans = eval(selected[1]);
	console.log(typeof(Number(a)), typeof(correct_ans));
	console.log(Number(a), correct_ans);
	if (Number(a) == correct_ans) {
		isQuestion = false;
	} else {
		document.getElementById('ans').style.color = 'red';
		a = "";
	}
}


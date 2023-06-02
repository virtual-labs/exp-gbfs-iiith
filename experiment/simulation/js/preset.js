var cwidth = canv.offsetWidth;
var cheight = canv.offsetHeight;

var default_weight = 1;

console.log(cwidth, cheight);

function preset() {
    cwidth = canv.offsetWidth;
    cheight = canv.offsetHeight;
    var trd = Number(document.getElementById("tdi").value);
    //var brf = Number(document.getElementById("bfi").value);
    cclear();
    n = Math.pow(2, trd);
    type = false;
    for (i = 1; i <= trd; i++) {
        for (j = 1; j < Math.pow(2, i); j = j+2) {              //(1*((brf+1) % 2) + 1)) {
            nodes.push([(j/Math.pow(2, i))*cwidth, (i/(trd+1))*cheight]);
            if (nodes.length-1 == 0) {
                edges.push([((2*nodes.length)-1), (2*nodes.length)]);
                edges_weight.push([default_weight, default_weight]);
            } else if (nodes.length-1 >= Math.pow(2, trd-1) - 1) {
                edges.push([Math.floor((nodes.length-2)/2)]);
                edges_weight.push([default_weight]);
            } else {
                edges.push([Math.floor((nodes.length-2)/2), ((2*nodes.length)-1), (2*nodes.length)]);
                edges_weight.push([default_weight, default_weight, default_weight]);
            }
        }
    }
    // nodes.push([1/2 * cwidth, 1/4 * cheight], [1/4 * cwidth, 1/2 * cheight], [3/4 * cwidth, 1/2 * cheight], [1/8 * cwidth, 3/4 * cheight], [3/8 * cwidth, 3/4 * cheight], [5/8 * cwidth, 3/4 * cheight], [7/8 * cwidth, 3/4 * cheight]);
    // edges.push([1, 2], [0, 3, 4], [0, 5, 6], [1], [1], [2], [2]);
    for (n = 1; n <= nodes.length; n++) { 
        exist.push(true);
        parent.push(null);
    }
    edges_weight = [[5,2], [5,3,4], [2,5,6], [3], [4], [5], [6]];
} preset();

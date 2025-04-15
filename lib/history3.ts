canvas = new fabric.Canvas("canvas", {
  selection: false,
});
function saveState(currentAction) {
  currentAction = currentAction || "";
  // if (currentAction !== '' && lastAction !== currentAction) {
  $(".redo").val($(".undo").val());
  $(".undo").val(JSON.stringify(canvas));
  console.log("Saving After " + currentAction);
  lastAction = currentAction;
  // }
  var objects = canvas.getObjects();
  for (i in objects) {
    if (objects.hasOwnProperty(i)) {
      objects[i].setCoords();
    }
  }
}
canvas.on("object:modified", function (e) {
  saveState("modified");
});
// Undo Canvas Change
function undo() {
  canvas.loadFromJSON($(".redo").val(), canvas.renderAll.bind(canvas));
}
// Redo Canvas Change
function redo() {
  canvas.loadFromJSON($(".undo").val(), canvas.renderAll.bind(canvas));
}
$("#reset").click(function () {
  canvas.loadFromJSON(
    $("#original_canvas").val(),
    canvas.renderAll.bind(canvas)
  );
});

var bgnd = new fabric.Image.fromURL(
  "https://s3-eu-west-1.amazonaws.com/kienzle.dev.cors/img/image2.png",
  function (oImg) {
    oImg.hasBorders = false;
    oImg.hasControls = false;
    // ... Modify other attributes
    canvas.insertAt(oImg, 0);
    canvas.setActiveObject(oImg);
    myImg = canvas.getActiveObject();
    saveState("render");
    $("#original_canvas").val(JSON.stringify(canvas.toJSON()));
  }
);

$("#undoButton").click(function () {
  undo();
});
$("#redoButton").click(function () {
  redo();
});

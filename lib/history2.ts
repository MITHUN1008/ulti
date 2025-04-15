//variables for undo/redo
let pause_saving = false;
let undo_stack = [];
let redo_stack = [];

canvas.on("object:added", function (event) {
  if (!pause_saving) {
    undo_stack.push(JSON.stringify(canvas));
    redo_stack = [];
    console.log("Object added, state saved", undo_stack);
  }
});
canvas.on("object:modified", function (event) {
  if (!pause_saving) {
    undo_stack.push(JSON.stringify(canvas));
    redo_stack = [];
    console.log("Object modified, state saved", undo_stack);
  }
});
canvas.on("object:removed", function (event) {
  if (!pause_saving) {
    undo_stack.push(JSON.stringify(canvas));
    redo_stack = [];
    console.log("Object removed, state saved", undo_stack);
  }
});

//Listen for undo/redo
wrapper.addEventListener("keydown", function (event) {
  //Undo - CTRL+Z
  if (event.ctrlKey && event.keyCode == 90) {
    pause_saving = true;
    redo_stack.push(undo_stack.pop());
    let previous_state = undo_stack[undo_stack.length - 1];
    if (previous_state == null) {
      previous_state = "{}";
    }
    canvas.loadFromJSON(previous_state, function () {
      canvas.renderAll();
    });
    pause_saving = false;
  }
  //Redo - CTRL+Y
  else if (event.ctrlKey && event.keyCode == 89) {
    pause_saving = true;
    state = redo_stack.pop();
    if (state != null) {
      undo_stack.push(state);
      canvas.loadFromJSON(state, function () {
        canvas.renderAll();
      });
      pause_saving = false;
    }
  }
});

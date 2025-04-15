const [schedule, setSchedule] = useState([]);
const [loads, setLoads] = useState([]);
const [undo, setUndo] = useState([]);
const [redo, setRedo] = useState([]);

const updateData = (newSchedule, newLoads) => {
  setSchedule([...newSchedule]);
  setLoads([...newLoads]);

  const newUndo = {
    schedule: [...newSchedule],
    loads: [...newLoads],
  };

  setUndo([...undo, ...newUndo]);
};

const undoChanges = () => {
  const lastElement = undo[undo.length - 1];
  const copyOfUndo = [...undo];

  // Update redo to be able to rollback
  setRedo([...undo]);

  // Set the previous values to Schedule and Loads
  schedule([...lastElement.schedule]);
  loads([...lastElement.loads]);

  // Remove the last element from undo
  lastElement.pop();
  undo([...lastElement]);
};

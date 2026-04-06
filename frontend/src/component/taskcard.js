function TaskCard({ task, editTask, deleteTask, toggleStatus }) {
  return (
    <div style={styles.card}>
      <span
        onClick={() => toggleStatus(task)}
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          color: task.completed ? "gray" : "black",
          cursor: "pointer",
        }}
      >
        {task.title}
      </span>

      <div>
        <button
          onClick={() => editTask(task._id, task.title)}
          style={styles.editBtn}
        >
          Edit
        </button>

        <button
          onClick={() => deleteTask(task._id)}
          style={styles.deleteBtn}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  editBtn: {
    marginRight: "10px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default TaskCard;
import { useEffect, useState } from "react";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assignedTo, setAssignedTo] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  // 🔹 FETCH TASKS
  async function fetchTasks() {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to fetch tasks");
        setTasks([]);
        return;
      }

      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setTasks([]);
    }
  }
  const getTimeLeft = (deadline) => {
  if (!deadline) return "";

  const diff = new Date(deadline) - new Date();

  if (diff <= 0) return "⛔ Time Over";

  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return `${minutes}m ${seconds}s left`;
};

  // 🔹 CREATE TASK
  async function createTask() {
    const token = localStorage.getItem("token");

    if (!title.trim()) {
      alert("Task cannot be empty");
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          deadline,
          priority,
          assignedTo,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to create task");
        return;
      }

      setTasks((prev) => [...prev, data]);
      setTitle("");
    } catch (error) {
      console.error(error);
    }
  }
  const toggleStatus = async (task) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: task.title,
        completed: !task.completed,
      }),
    });

    const data = await res.json();

    setTasks((prev) =>
      prev.map((t) => (t._id === task._id ? data : t))
    );
  } catch (error) {
    console.error(error);
  }
};

  // 🔹 DELETE TASK
  async function deleteTask(id) {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        alert("Failed to delete task");
        return;
      }

      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  }
  const handleLogout = () => {
  localStorage.removeItem("token"); // remove token
  window.location.href = "/"; // redirect to login
};

  // 🔹 UPDATE TASK ✅ (OUTSIDE deleteTask)
  const editTask = async (id, oldTitle) => {
    const token = localStorage.getItem("token");

    const newTitle = prompt("Edit task:", oldTitle);

    if (!newTitle) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTitle }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Update failed");
        return;
      }

      // update UI instantly
      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, title: newTitle } : task
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 LOAD TASKS
  useEffect(() => {
    fetchTasks();
  }, []);
useEffect(() => {
  const interval = setInterval(() => {
    setTasks((prev) => [...prev]);
  }, 1000);

  return () => clearInterval(interval);
}, []);
useEffect(() => {
  const checkReminder = setInterval(() => {
    tasks.forEach((task) => {
      if (!task.deadline) return;

      const diff = new Date(task.deadline) - new Date();

      if (diff > 0 && diff < 60000) {
        alert(`⏰ Task "${task.title}" is about to expire!`);
      }
    });
  }, 30000);

  return () => clearInterval(checkReminder);
}, [tasks]);
  return (
  
  <div style={styles.container}>
    <h2 style={styles.heading}>Task For Team</h2>

    <div style={styles.header}>
      <h2>logout</h2>
      <button onClick={handleLogout} style={styles.logoutBtn}>
        Logout
      </button>
    </div>
    {/* Input Section */}
    <div style={styles.inputContainer}>
      <input
        type="text"
        placeholder="Enter task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
      />
      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <select
  value={priority}
  onChange={(e) => setPriority(e.target.value)}
  style={{ padding: "8px" }}
>
  <option value="Low">Low</option>
  <option value="Medium">Medium</option>
  <option value="High">High</option>
</select>

<input
  type="text"
  placeholder="Assign to (name/email)"
  value={assignedTo}
  onChange={(e) => setAssignedTo(e.target.value)}
  style={{ padding: "8px" }}
/>
      <button onClick={createTask} style={styles.addBtn}>
        Add
      </button>
    </div>
    <div style={{ marginTop: "20px", marginBottom: "10px" }}>
  <select
    value={filterPriority}
    onChange={(e) => setFilterPriority(e.target.value)}
  >
    <option value="All">All Priority</option>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>

  <select
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
    style={{ marginLeft: "10px" }}
  >
    <option value="All">All Status</option>
    <option value="Completed">Completed</option>
    <option value="Pending">Pending</option>
  </select>
</div>


    {/* Task List */}
    <div style={styles.taskList}>
      {tasks.filter((task) => {
        const priorityMatch =
          filterPriority === "All" || task.priority === filterPriority;

        const statusMatch =
          filterStatus === "All" ||
          (filterStatus === "Completed" && task.completed) ||
          (filterStatus === "Pending" && !task.completed);

        return priorityMatch && statusMatch;
      }).map((task) => (
        <div key={task._id} style={styles.card}>
          <span
            onClick={() => toggleStatus(task)}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "gray" : "black",
              cursor: "pointer",
            }}
          >
             {task.title}
             <br />

              👤 {task.assignedTo || "Unassigned"}  
              <br />

              🎯 Priority: 
              <span style={{
                color:
                  task.priority === "High"
                    ? "red"
                    : task.priority === "Medium"
                    ? "orange"
                    : "green",
                fontWeight: "bold",
              }}>
                {task.priority}
              </span>
           <br />
          ⏰ {getTimeLeft(task.deadline)}
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
      ))}
    </div>
  </div>
);
}
const styles = {
  header: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
},

logoutBtn: {
  backgroundColor: "#333",
  color: "white",
  border: "none",
  padding: "8px 15px",
  borderRadius: "5px",
  cursor: "pointer",
},
  container: {
  maxWidth: "600px",
  margin: "50px auto",
  padding: "20px",
  fontFamily: "Arial",
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
},
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  addBtn: {
    padding: "10px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  taskList: {
    marginTop: "20px",
  },
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

export default Dashboard;
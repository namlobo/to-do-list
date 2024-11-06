import React,{useState} from "react";
import './todo.css'

function Todo() {
    const [Task,setTask] = useState([]);
    const [TaskName,setTaskName] = useState('');
    const [Desc,setDesc] = useState('');
    const [Deadline,setDeadline] = useState('');
    const [EditId,setEditId] = useState(null);
    const [CompCount,setCompCount] = useState(0)
    
    const resetForm = () => {
        setTaskName('');
        setDesc('');
        setDeadline('');
        setEditId(null);
    };
    const handleAddTask = (e) => {
        e.preventDefault();
        if(EditId){
            setTask(Task.map(Task => Task.id ===EditId ? {...Task,TaskName,Desc,Deadline}:Task));

        }   else {
            setTask([...Task,{id:Date.now(), TaskName,Desc,Deadline,isComplete: false}]);
        }
        resetForm();
    }
        
    const handleToggleComplete = (id) => {
        setTask(prevTasks => {
            let updatedCount = CompCount;
            const updatedTasks = prevTasks.map(task => {
                if (task.id === id) {
                    const updatedTask = { ...task, isComplete: !task.isComplete };
                    if (updatedTask.isComplete) {
                        updatedCount += 1;
                    } else {
                        updatedCount -= 1;
                    }
                    return updatedTask;
                }
                return task;
            });
            setCompCount(updatedCount);
            return updatedTasks;
        });
    };

    
    const handleDeleteTask = (id) => {
        setTask(Task.filter(task => task.id !== id));
    };

    
    return (
        <div className="ToDo-container">
            
            <header className="header">To Do List</header>

            <form onSubmit={handleAddTask} className="todo-form">
                <input type="text" placeholder="Task Name" value={TaskName} onChange={(e)=> setTaskName(e.target.value)}
                required />
                <textarea placeholder="Description" value={Desc} onChange={(e) => setDesc(e.target.value)} required />
                <input type="datetime-local" value={Deadline} onChange={(e)=>setDeadline(e.target.value)} required />
                <button type="submit">{EditId ? 'Update Task': 'Add Task'}</button>
                <p className="count">Completion count:{CompCount} </p>
            </form>
            <div className="todo-list">
                {Task.map(Task => (
                    <div key={Task.id} className={`todo-item ${Task.isComplete ? 'completed' : ''}`}>
                        <h3>{Task.TaskName}</h3>
                        <p>{Task.Desc}</p>
                        <p><strong>Deadline:</strong>{Task.Deadline}</p>
                        <input type="checkbox" checked={Task.isComplete} onChange={() => handleToggleComplete(Task.id)}>
                        </input>
                        <button className="edit" onClick ={() => {
                            setEditId(Task.id);
                            setTaskName(Task.TaskName);
                            setDesc(Task.Desc);
                            setDeadline(Task.Deadline);
                        }}>Edit</button>
                        <button onClick ={() => handleDeleteTask(Task.id)}>Delete</button>
                        <p className="status"><strong>Status:</strong> {Task.isComplete ? 'Completed' : 'Scheduled'}</p>
                        
                        </div>
                ))}
            </div>
        </div>
    )

}

export default Todo;
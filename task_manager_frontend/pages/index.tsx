import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface ToastProps {
  message: string;
  onClose: () => void;
}

function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;
  return (
    <div
      className="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      {message}
      <style jsx>{`
        .toast {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          background: #323232;
          color: white;
          padding: 12px 24px;
          border-radius: 6px;
          font-weight: bold;
          z-index: 999;
          animation: fadeInOut 2s ease-in-out;
        }
        @keyframes fadeInOut {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

interface ModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function Modal({ message, onConfirm, onCancel }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    },
    [onCancel]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    // Focus modal when it opens
    modalRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
      ref={modalRef}
    >
      <div className="modal">
        <p id="modal-title">{message}</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backdrop-filter: blur(3px);
          background: rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .modal {
          background: white;
          padding: 25px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          z-index: 11;
          min-width: 300px;
          outline: none;
        }

        .modal button {
          margin-right: 10px;
          padding: 8px 14px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
        }

        .modal button:first-child {
          background-color: #f44336;
          color: white;
          font-weight: bold;
        }

        .modal button:last-child {
          background-color: #ccc;
        }
      `}</style>
    </div>
  );
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string, newDescription: string) => void;
}

function TaskItem({ task, onToggleComplete, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleSave = () => {
    if (!editTitle.trim() || !editDescription.trim()) return;
    onEdit(task.id, editTitle.trim(), editDescription.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  return (
    <li className={task.completed ? 'completed' : ''}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            aria-label="Edit task title"
          />
          <textarea
            value={editDescription}
            onChange={e => setEditDescription(e.target.value)}
            aria-label="Edit task description"
          />
          <div className="task-actions">
            <button
              onClick={handleSave}
              disabled={!editTitle.trim() || !editDescription.trim()}
              aria-disabled={!editTitle.trim() || !editDescription.trim()}
            >
              Save
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <div className="task-actions">
            <button
              onClick={() => onToggleComplete(task.id)}
              aria-pressed={task.completed}
              aria-label={task.completed ? 'Undo Complete Task' : 'Complete Task'}
            >
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="edit-btn"
              aria-label="Edit Task"
              type="button"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="delete-btn"
              aria-label="Delete Task"
            >
              Delete
            </button>
          </div>
        </>
      )}
      <style jsx>{`
        li {
          background: #f9f9f9;
          margin: 10px 0;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        li.completed {
          text-decoration: line-through;
          background-color: #e0e0e0;
        }
        .task-actions {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }
        .task-actions button {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
        }
        .task-actions button:first-child {
          background-color: #2196f3;
          color: white;
        }
        .edit-btn {
          background-color: #ff9800;
          color: white;
        }
        .delete-btn {
          background-color: #f44336;
          color: white;
        }
        .cancel-btn {
          background-color: #ccc;
          color: black;
        }
        input[type="text"],
        textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 6px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 16px;
          box-sizing: border-box;
          resize: vertical;
        }
        textarea {
          height: 80px;
        }
        button:disabled,
        button[aria-disabled='true'] {
          cursor: not-allowed;
          background-color: #a5d6a7;
          color: #444;
        }
      `}</style>
    </li>
  );
}

export default function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [toast, setToast] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Try/catch for JSON parse
  useEffect(() => {
    try {
      const stored = localStorage.getItem('tasks');
      if (stored) {
        setTasks(JSON.parse(stored));
      }
    } catch {
      console.error('Failed to parse tasks from localStorage');
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch {
      console.error('Failed to save tasks to localStorage');
    }
  }, [tasks]);

  const showToast = useCallback((message: string) => {
    setToast(message);
  }, []);

  const clearToast = useCallback(() => {
    setToast('');
  }, []);

  const handleAddTask = useCallback(() => {
    if (!title.trim() || !description.trim()) {
      showToast('Please fill in both fields');
      return;
    }
    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
    };
    setTasks(prev => [newTask, ...prev]);
    setTitle('');
    setDescription('');
    showToast('Task Added');
  }, [title, description, showToast]);

  const handleComplete = useCallback((id: number) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
    showToast('Task status updated');
  }, [showToast]);

  const confirmDelete = useCallback((id: number) => {
    setShowModal(true);
    setDeleteTaskId(id);
  }, []);

  const handleDelete = useCallback(() => {
    if (deleteTaskId !== null) {
      setTasks(prev => prev.filter(t => t.id !== deleteTaskId));
      showToast('Task deleted');
      setShowModal(false);
      setDeleteTaskId(null);
    }
  }, [deleteTaskId, showToast]);

  const handleEdit = useCallback((id: number, newTitle: string, newDescription: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, title: newTitle, description: newDescription } : t))
    );
    showToast('Task updated');
  }, [showToast]);

  const handleLogout = useCallback(() => {
    setShowLogoutConfirm(true);
  }, []);

  const confirmLogout = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setShowLogoutConfirm(false);
    router.push('/login');
  }, [router]);

  const cancelLogout = useCallback(() => {
    setShowLogoutConfirm(false);
  }, []);

  return (
    <div className="app-container">
      <div className="logout-container">
        <button type="button" className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h1>Task Manager</h1>

      <main className="input-section" aria-label="Add Task Section">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          aria-label="Task title"
        />
        <textarea
          placeholder="Task description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          aria-label="Task description"
        />
        <button
          onClick={handleAddTask}
          disabled={!title.trim() || !description.trim()}
          aria-disabled={!title.trim() || !description.trim()}
        >
          Add Task
        </button>
      </main>

      <ul className="task-list" aria-live="polite" aria-relevant="additions removals">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={handleComplete}
            onDelete={confirmDelete}
            onEdit={handleEdit}
          />
        ))}
      </ul>

      {showModal && (
        <Modal
          message="Are you sure you want to delete this task?"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}

      {showLogoutConfirm && (
        <Modal
          message="Are you sure you want to logout?"
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}

      <Toast message={toast} onClose={clearToast} />

      <style jsx>{`
        .app-container {
          font-family: sans-serif;
          padding: 40px;
          max-width: 600px;
          margin: 0 auto;
        }

        h1 {
          text-align: center;
          margin-bottom: 30px;
        }

        .logout-container {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 20px;
        }

        .logout-button {
          background-color: #f44336;
          color: white;
          padding: 8px 14px;
          border: none;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .logout-button:hover {
          background-color: #d32f2f;
        }

        .input-section input,
        .input-section textarea {
          width: 100%;
          padding: 12px;
          margin-bottom: 10px;
          font-size: 16px;
          border-radius: 6px;
          border: 1px solid #ccc;
          box-sizing: border-box;
          background-color: white;
          resize: vertical;
        }
        .input-section textarea {
          height: 100px;
        }
        .input-section button {
          background-color: #4caf50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
        .input-section button:disabled,
        .input-section button[aria-disabled='true'] {
          cursor: not-allowed;
          background-color: #a5d6a7;
        }

        .task-list {
          list-style: none;
          padding: 0;
        }
      `}</style>
    </div>
  );
}

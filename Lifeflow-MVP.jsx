import React, { useState } from 'react';
import { Plus, LogOut, Menu, X, CheckCircle, Circle, Target } from 'lucide-react';

export default function LifeflowMVP() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Task state
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete project proposal', category: 'Work', completed: false },
    { id: 2, title: 'Review design mockups', category: 'Work', completed: true },
  ]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCategory, setTaskCategory] = useState('Personal');

  // Goal state
  const [goals, setGoals] = useState([
    { id: 1, title: 'Read 12 books this year', progress: 7, target: 12, category: 'Personal' },
    { id: 2, title: 'Exercise 4x per week', progress: 32, target: 48, category: 'Health' },
  ]);
  const [goalTitle, setGoalTitle] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalProgress, setGoalProgress] = useState('');

  // Authentication
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      setUserEmail(email);
      setIsLoggedIn(true);
      setCurrentPage('dashboard');
      e.target.reset();
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setCurrentPage('dashboard');
    setMobileMenuOpen(false);
  };

  // Task handlers
  const addTask = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        category: taskCategory,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setTaskTitle('');
      setTaskCategory('Personal');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Goal handlers
  const addGoal = (e) => {
    e.preventDefault();
    if (goalTitle.trim() && goalTarget) {
      const newGoal = {
        id: Date.now(),
        title: goalTitle,
        category: 'Personal',
        progress: parseInt(goalProgress) || 0,
        target: parseInt(goalTarget)
      };
      setGoals([...goals, newGoal]);
      setGoalTitle('');
      setGoalTarget('');
      setGoalProgress('');
    }
  };

  const updateGoalProgress = (id, change) => {
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        const newProgress = Math.max(0, Math.min(goal.target, goal.progress + change));
        return { ...goal, progress: newProgress };
      }
      return goal;
    }));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  // Statistics
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // LOGIN PAGE
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">Lifeflow</h1>
            <p className="text-gray-600">Manage your life, achieve your goals</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-6">
            Demo mode: Use any email/password to login
          </p>
        </div>
      </div>
    );
  }

  // MAIN APP
  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">Lifeflow</h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`font-medium pb-1 transition ${
                currentPage === 'dashboard'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentPage('tasks')}
              className={`font-medium pb-1 transition ${
                currentPage === 'tasks'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Tasks
            </button>
            <button
              onClick={() => setCurrentPage('goals')}
              className={`font-medium pb-1 transition ${
                currentPage === 'goals'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Goals
            </button>
            <button
              onClick={() => setCurrentPage('settings')}
              className={`font-medium pb-1 transition ${
                currentPage === 'settings'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Settings
            </button>
          </div>

          {/* Desktop Logout */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm text-gray-600">{userEmail}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-2">
              <button
                onClick={() => {
                  setCurrentPage('dashboard');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-blue-600 font-medium hover:bg-gray-100 rounded"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  setCurrentPage('tasks');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Tasks
              </button>
              <button
                onClick={() => {
                  setCurrentPage('goals');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Goals
              </button>
              <button
                onClick={() => {
                  setCurrentPage('settings');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* DASHBOARD */}
        {currentPage === 'dashboard' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Welcome, {userEmail.split('@')[0]}!</h2>
              <p className="text-gray-600 mt-1">Here's your progress overview</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
                <p className="text-gray-500 text-sm font-medium">Total Tasks</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalTasks}</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
                <p className="text-gray-500 text-sm font-medium">Completed Tasks</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{completedTasks}</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-600">
                <p className="text-gray-500 text-sm font-medium">Completion Rate</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{completionRate}%</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600">
                <p className="text-gray-500 text-sm font-medium">Active Goals</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{goals.length}</p>
              </div>
            </div>

            {/* Recent Tasks and Goals */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Tasks</h3>
                {tasks.length === 0 ? (
                  <p className="text-gray-500">No tasks yet</p>
                ) : (
                  <div className="space-y-2">
                    {tasks.slice(0, 5).map(task => (
                      <div key={task.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className={task.completed ? 'line-through text-gray-400' : 'text-gray-700'}>
                          {task.title}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded ml-auto">
                          {task.category}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Goals Progress</h3>
                {goals.length === 0 ? (
                  <p className="text-gray-500">No goals yet</p>
                ) : (
                  <div className="space-y-4">
                    {goals.slice(0, 4).map(goal => {
                      const percentage = Math.round((goal.progress / goal.target) * 100);
                      return (
                        <div key={goal.id}>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-gray-900">{goal.title}</span>
                            <span className="text-sm font-bold text-blue-600">{percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{goal.progress} / {goal.target}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TASKS */}
        {currentPage === 'tasks' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Tasks</h2>
              <p className="text-gray-600 mt-1">Create and manage your daily tasks</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Task</h3>
              <form onSubmit={addTask} className="space-y-4">
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="What needs to be done?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select
                    value={taskCategory}
                    onChange={(e) => setTaskCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                    <option value="Health">Health</option>
                    <option value="Urgent">Urgent</option>
                  </select>

                  <button
                    type="submit"
                    className="bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <Plus size={20} />
                    Add Task
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-3">
              {tasks.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                  <Circle size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No tasks yet. Create one to get started!</p>
                </div>
              ) : (
                tasks.map(task => (
                  <div
                    key={task.id}
                    className="bg-white rounded-lg shadow p-4 flex items-center gap-4 hover:shadow-md transition"
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-5 h-5 text-blue-600 rounded cursor-pointer"
                    />

                    <div className="flex-1">
                      <p className={task.completed ? 'line-through text-gray-400' : 'text-gray-900 font-medium'}>
                        {task.title}
                      </p>
                      <span className="inline-block text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded mt-2">
                        {task.category}
                      </span>
                    </div>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-600 hover:bg-red-50 px-3 py-2 rounded transition"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* GOALS */}
        {currentPage === 'goals' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Goals</h2>
              <p className="text-gray-600 mt-1">Set and track your long-term goals</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Create New Goal</h3>
              <form onSubmit={addGoal} className="space-y-4">
                <input
                  type="text"
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  placeholder="What's your goal?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="number"
                    value={goalTarget}
                    onChange={(e) => setGoalTarget(e.target.value)}
                    placeholder="Target number"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />

                  <input
                    type="number"
                    value={goalProgress}
                    onChange={(e) => setGoalProgress(e.target.value)}
                    placeholder="Current progress"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />

                  <button
                    type="submit"
                    className="bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <Plus size={20} />
                    Add Goal
                  </button>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals.length === 0 ? (
                <div className="col-span-full bg-white rounded-lg shadow p-12 text-center">
                  <Target size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No goals yet. Create one to start tracking!</p>
                </div>
              ) : (
                goals.map(goal => {
                  const percentage = Math.round((goal.progress / goal.target) * 100);
                  return (
                    <div key={goal.id} className="bg-white rounded-lg shadow p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-gray-900">{goal.title}</h4>
                          <p className="text-sm text-gray-500">{goal.category}</p>
                        </div>
                        <button
                          onClick={() => deleteGoal(goal.id)}
                          className="text-red-600 hover:bg-red-50 px-3 py-2 rounded transition"
                        >
                          Delete
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Progress</span>
                            <span className="text-sm font-bold text-blue-600">{percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-blue-600 h-3 rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <span className="text-sm font-medium text-gray-700">
                            {goal.progress} / {goal.target}
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateGoalProgress(goal.id, -1)}
                              className="px-3 py-1 bg-gray-300 text-gray-700 rounded font-bold hover:bg-gray-400 transition"
                            >
                              −
                            </button>
                            <button
                              onClick={() => updateGoalProgress(goal.id, 1)}
                              className="px-3 py-1 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {currentPage === 'settings' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
              <p className="text-gray-600 mt-1">Manage your account preferences</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Account Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="text"
                    value={userEmail}
                    disabled
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Notifications</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                  <span className="text-gray-700">Email reminders for tasks</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                  <span className="text-gray-700">Daily summary report</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                  <span className="text-gray-700">Goal milestone alerts</span>
                </label>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

'use client';

import { useState } from 'react';
import {
  Plus,
  Clock,
  AlertCircle,
  CheckCircle2,
  Circle,
  Calendar,
  User,
  Briefcase,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { tasks, staff, getPriorityColor, type TaskStatus, type TaskPriority } from '@/lib/mock-data';

function getTaskStatusIcon(status: TaskStatus) {
  switch (status) {
    case 'To Do':
      return <Circle className="w-5 h-5 text-slate-400" />;
    case 'In Progress':
      return <Clock className="w-5 h-5 text-amber-500" />;
    case 'Done':
      return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
  }
}

function getTaskStatusColor(status: TaskStatus) {
  switch (status) {
    case 'To Do':
      return 'bg-slate-100 text-slate-700 border-slate-200';
    case 'In Progress':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Done':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  }
}

function getColumnHeaderColor(status: TaskStatus) {
  switch (status) {
    case 'To Do':
      return 'bg-slate-500';
    case 'In Progress':
      return 'bg-amber-500';
    case 'Done':
      return 'bg-emerald-500';
  }
}

function isOverdue(dueDate: string) {
  return new Date(dueDate) < new Date('2026-06-05');
}

export function Tasks() {
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');

  const filteredTasks = tasks.filter((task) => {
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesAssignee = assigneeFilter === 'all' || task.assignedTo === assigneeFilter;
    return matchesPriority && matchesAssignee;
  });

  const todoTasks = filteredTasks.filter((t) => t.status === 'To Do');
  const inProgressTasks = filteredTasks.filter((t) => t.status === 'In Progress');
  const doneTasks = filteredTasks.filter((t) => t.status === 'Done');

  const selectedTaskData = tasks.find((t) => t.id === selectedTask);
  const assignees = [...new Set(tasks.map((t) => t.assignedTo))];

  const renderTaskCard = (task: typeof tasks[0]) => (
    <Card
      key={task.id}
      className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer mb-3"
      onClick={() => setSelectedTask(task.id)}
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="text-sm font-medium text-slate-900 leading-snug">{task.title}</h4>
          <Badge
            variant="outline"
            className={`text-[10px] flex-shrink-0 ${
              task.priority === 'High' || task.priority === 'Urgent'
                ? getPriorityColor(task.priority)
                : getPriorityColor(task.priority)
            }`}
          >
            {task.priority}
          </Badge>
        </div>
        {task.caseName && task.caseName !== 'Administrative' && (
          <div className="flex items-center gap-1 mb-2">
            <Briefcase className="w-3 h-3 text-slate-400" />
            <span className="text-[11px] text-slate-500 truncate">{task.caseName}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3 text-slate-400" />
            <span className="text-[11px] text-slate-500">{task.assignedTo}</span>
          </div>
          <div
            className={`flex items-center gap-1 text-[11px] ${
              isOverdue(task.dueDate) ? 'text-red-500 font-medium' : 'text-slate-400'
            }`}
          >
            {isOverdue(task.dueDate) && <AlertCircle className="w-3 h-3" />}
            <Calendar className="w-3 h-3" />
            {new Date(task.dueDate).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Task Management</h2>
          <p className="text-slate-500 mt-1">Track case tasks, deadlines, and assignments</p>
        </div>
        <Button
          className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm"
          onClick={() => setShowAddDialog(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-slate-900">{tasks.length}</p>
            <p className="text-xs text-slate-500">Total Tasks</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-amber-600">{inProgressTasks.length}</p>
            <p className="text-xs text-slate-500">In Progress</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-emerald-600">{doneTasks.length}</p>
            <p className="text-xs text-slate-500">Completed</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-red-600">
              {tasks.filter((t) => isOverdue(t.dueDate) && t.status !== 'Done').length}
            </p>
            <p className="text-xs text-slate-500">Overdue</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[130px] h-8 text-xs">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="Urgent">Urgent</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
            <SelectTrigger className="w-[160px] h-8 text-xs">
              <SelectValue placeholder="Assignee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assignees</SelectItem>
              {assignees.map((a) => (
                <SelectItem key={a} value={a}>{a}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
          <button
            onClick={() => setView('kanban')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              view === 'kanban' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
          >
            Kanban
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              view === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
          >
            List
          </button>
        </div>
      </div>

      {view === 'kanban' ? (
        /* Kanban View */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* To Do Column */}
          <div className="bg-slate-50 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className={`w-2 h-2 rounded-full ${getColumnHeaderColor('To Do')}`} />
              <h3 className="text-sm font-semibold text-slate-700">To Do</h3>
              <span className="text-xs text-slate-400 ml-auto">{todoTasks.length}</span>
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              {todoTasks.map((task) => renderTaskCard(task))}
              {todoTasks.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-6">No tasks</p>
              )}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="bg-amber-50/50 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className={`w-2 h-2 rounded-full ${getColumnHeaderColor('In Progress')}`} />
              <h3 className="text-sm font-semibold text-slate-700">In Progress</h3>
              <span className="text-xs text-slate-400 ml-auto">{inProgressTasks.length}</span>
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              {inProgressTasks.map((task) => renderTaskCard(task))}
              {inProgressTasks.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-6">No tasks</p>
              )}
            </div>
          </div>

          {/* Done Column */}
          <div className="bg-emerald-50/50 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className={`w-2 h-2 rounded-full ${getColumnHeaderColor('Done')}`} />
              <h3 className="text-sm font-semibold text-slate-700">Done</h3>
              <span className="text-xs text-slate-400 ml-auto">{doneTasks.length}</span>
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              {doneTasks.map((task) => renderTaskCard(task))}
              {doneTasks.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-6">No tasks</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* List View */
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <div className="max-h-[500px] overflow-y-auto">
              {filteredTasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => setSelectedTask(task.id)}
                  className="w-full flex items-center gap-4 px-5 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 text-left"
                >
                  {getTaskStatusIcon(task.status)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">{task.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {task.assignedTo} · {task.caseName || 'No case'}
                    </p>
                  </div>
                  <Badge variant="outline" className={`text-[10px] ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </Badge>
                  <div
                    className={`text-xs ${
                      isOverdue(task.dueDate) && task.status !== 'Done'
                        ? 'text-red-500 font-medium'
                        : 'text-slate-400'
                    }`}
                  >
                    {new Date(task.dueDate).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Task Detail Dialog */}
      <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
        <DialogContent className="max-w-md">
          {selectedTaskData && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedTaskData.title}</DialogTitle>
                <DialogDescription>Task details</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-slate-500">Status</p>
                    <Badge variant="outline" className={`text-xs mt-0.5 ${getTaskStatusColor(selectedTaskData.status)}`}>
                      {selectedTaskData.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Priority</p>
                    <Badge variant="outline" className={`text-xs mt-0.5 ${getPriorityColor(selectedTaskData.priority)}`}>
                      {selectedTaskData.priority}
                    </Badge>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Description</p>
                  <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg mt-1">
                    {selectedTaskData.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-slate-500">Assigned To</p>
                    <p className="text-sm font-medium">{selectedTaskData.assignedTo}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Due Date</p>
                    <p className={`text-sm font-medium ${isOverdue(selectedTaskData.dueDate) && selectedTaskData.status !== 'Done' ? 'text-red-600' : ''}`}>
                      {new Date(selectedTaskData.dueDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                {selectedTaskData.caseId && (
                  <div>
                    <p className="text-xs text-slate-500">Related Case</p>
                    <p className="text-sm font-medium text-teal-700">{selectedTaskData.caseName}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Task Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-teal-600" />
              Add New Task
            </DialogTitle>
            <DialogDescription>Create a new task for a case</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium text-slate-700">Task Title</label>
              <Input placeholder="Enter task title" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Description</label>
              <textarea
                className="w-full mt-1 p-2 border rounded-md text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Describe the task..."
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-slate-700">Priority</label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Assigned To</label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {staff.map((s) => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-slate-700">Due Date</label>
                <Input type="date" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Related Case</label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No case</SelectItem>
                    {tasks
                      .filter((t) => t.caseId)
                      .map((t) => (
                        <SelectItem key={t.caseId} value={t.caseId}>
                          {t.caseName}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button
                className="bg-teal-600 hover:bg-teal-700 text-white"
                onClick={() => setShowAddDialog(false)}
              >
                Create Task
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import React, { useState, useCallback } from 'react';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus, Trash2, Settings } from 'lucide-react';

// Types for our data structures
export interface SprintData {
  name: string;
  capacity: number;
  committed: number;
  completed: number;
  velocity: number;
}

export interface TeamMember {
  id: string;
  name: string;
  capacity: number;
  availability: number; // percentage
}

interface CapacityPlanningChartProps {
  initialData?: SprintData[];
  teamMembers?: TeamMember[];
}

// Sample data for demonstration
const defaultSprintData: SprintData[] = [
  { name: 'Sprint 1', capacity: 40, committed: 38, completed: 35, velocity: 35 },
  { name: 'Sprint 2', capacity: 40, committed: 42, completed: 40, velocity: 40 },
  { name: 'Sprint 3', capacity: 40, committed: 45, completed: 38, velocity: 38 },
  { name: 'Sprint 4', capacity: 40, committed: 40, completed: 42, velocity: 42 },
  { name: 'Sprint 5', capacity: 40, committed: 38, completed: 36, velocity: 36 },
  { name: 'Sprint 6', capacity: 40, committed: 44, completed: 41, velocity: 41 },
];

const defaultTeamMembers: TeamMember[] = [
  { id: '1', name: 'Alice', capacity: 10, availability: 100 },
  { id: '2', name: 'Bob', capacity: 10, availability: 80 },
  { id: '3', name: 'Charlie', capacity: 10, availability: 100 },
  { id: '4', name: 'Diana', capacity: 10, availability: 90 },
];

export const CapacityPlanningChart: React.FC<CapacityPlanningChartProps> = ({
  initialData = defaultSprintData,
  teamMembers = defaultTeamMembers,
}) => {
  const [sprintData, setSprintData] = useState<SprintData[]>(initialData);
  const [members, setMembers] = useState<TeamMember[]>(teamMembers);
  const [newSprintName, setNewSprintName] = useState('');
  const [newSprintCapacity, setNewSprintCapacity] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  // Calculate total team capacity
  const totalTeamCapacity = members.reduce((total, member) => 
    total + (member.capacity * member.availability / 100), 0
  );

  // Add new sprint
  const addSprint = useCallback(() => {
    if (newSprintName.trim() && newSprintCapacity) {
      const capacity = parseInt(newSprintCapacity);
      const newSprint: SprintData = {
        name: newSprintName.trim(),
        capacity,
        committed: 0,
        completed: 0,
        velocity: 0,
      };
      setSprintData(prev => [...prev, newSprint]);
      setNewSprintName('');
      setNewSprintCapacity('');
    }
  }, [newSprintName, newSprintCapacity]);

  // Remove sprint
  const removeSprint = useCallback((index: number) => {
    setSprintData(prev => prev.filter((_, i) => i !== index));
  }, []);

  // Update sprint data
  const updateSprint = useCallback((index: number, field: keyof SprintData, value: number) => {
    setSprintData(prev => prev.map((sprint, i) => 
      i === index ? { ...sprint, [field]: value } : sprint
    ));
  }, []);

  // Update team member
  const updateMember = useCallback((id: string, field: keyof TeamMember, value: string | number) => {
    setMembers(prev => prev.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
  }, []);

  // Add new team member
  const addMember = useCallback(() => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: 'New Member',
      capacity: 10,
      availability: 100,
    };
    setMembers(prev => [...prev, newMember]);
  }, []);

  // Remove team member
  const removeMember = useCallback((id: string) => {
    setMembers(prev => prev.filter(member => member.id !== id));
  }, []);

  return (
    <div className="w-full space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Capacity Planning Dashboard</h1>
          <p className="text-gray-600 mt-2">Track sprint capacity, commitments, and team velocity</p>
        </div>
        <Button
          onClick={() => setShowSettings(!showSettings)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </div>

      {/* Team Settings Panel */}
      {showSettings && (
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Team Configuration</CardTitle>
            <CardDescription>
              Manage team members and their capacity allocation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {members.map((member) => (
                  <div key={member.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <Input
                        value={member.name}
                        onChange={(e) => updateMember(member.id, 'name', e.target.value)}
                        className="font-medium"
                      />
                      <Button
                        onClick={() => removeMember(member.id)}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Capacity (points/sprint)</label>
                      <Input
                        type="number"
                        value={member.capacity}
                        onChange={(e) => updateMember(member.id, 'capacity', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Availability (%)</label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={member.availability}
                        onChange={(e) => updateMember(member.id, 'availability', parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                ))}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
                  <Button onClick={addMember} variant="outline" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Member
                  </Button>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-900">
                  Total Team Capacity: {totalTeamCapacity.toFixed(1)} points per sprint
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Chart */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Sprint Capacity vs Commitment vs Completion</CardTitle>
          <CardDescription>
            Visualize team capacity planning across sprints
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={sprintData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Story Points', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #ccc', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar dataKey="capacity" fill="#3b82f6" name="Capacity" opacity={0.8} />
                <Bar dataKey="committed" fill="#f59e0b" name="Committed" opacity={0.8} />
                <Bar dataKey="completed" fill="#10b981" name="Completed" opacity={0.8} />
                <Line type="monotone" dataKey="velocity" stroke="#ef4444" strokeWidth={3} name="Velocity" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Velocity Trend */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Velocity Trend</CardTitle>
          <CardDescription>
            Track team velocity over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sprintData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Story Points', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #ccc', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="velocity" stroke="#8884d8" strokeWidth={3} name="Velocity" />
                <Line type="monotone" dataKey="capacity" stroke="#82ca9d" strokeWidth={2} strokeDasharray="5 5" name="Capacity" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Sprint Management */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Sprint Management</CardTitle>
          <CardDescription>
            Add, edit, and manage sprint data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Add New Sprint */}
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700">Sprint Name</label>
                <Input
                  placeholder="e.g., Sprint 7"
                  value={newSprintName}
                  onChange={(e) => setNewSprintName(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700">Capacity</label>
                <Input
                  type="number"
                  placeholder="40"
                  value={newSprintCapacity}
                  onChange={(e) => setNewSprintCapacity(e.target.value)}
                />
              </div>
              <Button onClick={addSprint} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Sprint
              </Button>
            </div>

            {/* Sprint Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-2 text-left">Sprint</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Capacity</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Committed</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Completed</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sprintData.map((sprint, index) => (
                    <tr key={sprint.name} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2 font-medium">{sprint.name}</td>
                      <td className="border border-gray-200 px-4 py-2">
                        <Input
                          type="number"
                          value={sprint.capacity}
                          onChange={(e) => updateSprint(index, 'capacity', parseInt(e.target.value) || 0)}
                          className="w-20"
                        />
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        <Input
                          type="number"
                          value={sprint.committed}
                          onChange={(e) => updateSprint(index, 'committed', parseInt(e.target.value) || 0)}
                          className="w-20"
                        />
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        <Input
                          type="number"
                          value={sprint.completed}
                          onChange={(e) => updateSprint(index, 'completed', parseInt(e.target.value) || 0)}
                          className="w-20"
                        />
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        <Button
                          onClick={() => removeSprint(index)}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
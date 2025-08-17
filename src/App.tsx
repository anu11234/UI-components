import React from 'react';
import InputField from './components/InputField';
import DataTable, { Column } from './components/DataTable';

// Mock data for DataTable
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
];

const columns: Column<User>[] = [
  { header: 'Name', accessor: 'name', sortable: true },
  { header: 'Email', accessor: 'email', sortable: true },
  { header: 'Role', accessor: 'role', sortable: true },
];

function App() {
  const [inputValue, setInputValue] = React.useState('');
  const [selectedUsers, setSelectedUsers] = React.useState<User[]>([]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">UI Components Demo</h1>
      
      <div className="max-w-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">InputField Component</h2>
        <InputField
          label="Username"
          placeholder="Enter your username"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          clearable
        />
        <InputField
          label="Password"
          inputType="password"  // Changed from 'type' to 'inputType'
          placeholder="Enter your password"
        />
        <InputField
          label="Email"
          placeholder="Enter your email"
          invalid
          errorMessage="Invalid email address"
        />
        <InputField
          label="Disabled Field"
          placeholder="This is disabled"
          disabled
        />
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">DataTable Component</h2>
        <DataTable
          data={mockUsers}
          columns={columns}
          selectable
          onRowSelect={setSelectedUsers}
        />
        <div className="mt-4">
          <h3 className="font-medium">Selected Users:</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm">
            {JSON.stringify(selectedUsers, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;
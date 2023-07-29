import React from 'react';
import InActiveUserManagement from './InActiveUserManagement';
import ActiveUserManagement from './UserManagement';

function UserManagement() {
  return (
    <div className="pb-8">
      <InActiveUserManagement />
      <div className="mt-14">
        <ActiveUserManagement />
      </div>
    </div>
  );
}

export default UserManagement;

import React, { useEffect, useState } from 'react';
import UserTable from './UserTable';
import './App.css';

const routes = {
  users: sortParam => `/users/${sortParam ? '?sortBy=' + sortParam : ''}`,
  user: id => `/user/${id}`,
  deleteUser: id => `/delete/user/${id}`
};

function App () {
  const [data, setData] = useState([]);
  const [endpoint, setEndpoint] = useState('users');
  const [sortParam, setSortParam] = useState(null);
  const [userId, setUserId] = useState('');
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [apiError, setApiError] = useState(null);

  const currentEndpointUsesId = ['user', 'deleteUser'].includes(endpoint);

  useEffect(() => {
    async function getData() {
      if (!shouldRefetch) {
        return;
      }

      try {
        let url, options;
        switch(endpoint) {
          case 'user':
            url = routes[endpoint](userId);
            options = { method: 'GET' };
            break;
          case 'deleteUser':
            url = routes[endpoint](userId);
            options = { method: 'PATCH' };
            break;
          default: // handles case 'users'
            url = routes[endpoint](sortParam);
            options = { method: 'GET' };
        }

        let response = await fetch(url, options);
        let parsedResponse = await response.json();

        // proxy error messages through to native JS Error obj
        if (!response.ok) {
          throw new Error(parsedResponse.msg);
        } else if (apiError) {
          setApiError(null);
        }

        setData(parsedResponse);
      } catch({ message }) {
        setApiError(message);
      }
    }
    getData();
  }, [endpoint, sortParam, userId, shouldRefetch, apiError]);

  return (
    <div className="wrapper">
      <div className="content">
        <div className="controls">
          <select name="endpoint" id="endpoint" onChange={e => {
            setShouldRefetch(false);
            setEndpoint(e.target.value);
          }}>
            <option value="users">Users List</option>
            <option value="user">Single User</option>
            <option value="deleteUser">Delete User</option>
          </select>
          { endpoint === 'users' &&
            <select name="sortParam" id="sortParam" onChange={e => {
              setShouldRefetch(false);
              setSortParam(e.target.value);
            }}>
              <option value="">--</option>
              <option value="created_date">Created Date</option>
              <option value="last_name">Last Name</option>
              <option value="zip">Postal Code (asc)</option>
              <option value="state">State (asc)</option>
            </select>
          }
          { currentEndpointUsesId &&
            <input type="text" placeholder="user id" onChange={e => {
              setShouldRefetch(false);
              setUserId(e.target.value);
            }}/>
          }
          <button onClick={e => setShouldRefetch(true)}>UPDATE</button>
        </div>
        { apiError && <p className="error">{apiError}</p>}
        <UserTable className="userTable" data={Array.isArray(data) ? data : [data]}/>
      </div>
    </div>
  );
}

export default App;

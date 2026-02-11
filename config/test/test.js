const axios = require('axios');

let userIds = [];
let index = 0;

// Function to fetch users from backend before load test
async function fetchUsers() {
  try {
    const res = await axios.get('http://localhost:3000/api/v1/user?limit=1000'); // fetch 1000 users
    userIds = res.data.map(u => u._id); // adjust according to your response structure
  } catch (err) {
    console.error('Error fetching users:', err);
  }
}

// Function for Artillery to provide a userId
function getUserId() {
  if (userIds.length === 0) return 'dummyUser';
  const id = userIds[index % userIds.length];
  index++;
  return id;
}

// Exported processor functions
module.exports = {
  $fetchUsers: fetchUsers,
  $getUserId: getUserId
};

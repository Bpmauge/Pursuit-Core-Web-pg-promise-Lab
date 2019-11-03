document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    loadPosts();
    const userForm = document.querySelector('#addUserForm');
    userForm.addEventListener('submit', addUserFormSubmitted);
    const postForm = document.querySelector('#addPostForm');
    postForm.addEventListener('submit', addPostFormSubmitted);
});

async function loadUsers() {
    const usersList = document.querySelector('#usersList');
    usersList.innerHTML = "";
    const response = await axios.get(`http://localhost:1500/users/`);
    
    response.data.payload.forEach((user) => {
        let listItem = document.createElement("li");
        listItem.innerText = `${user.id}: ${user.firstname} ${user.lastname}, age ${user.age}`;
        usersList.appendChild(listItem);
    });
}

async function addUserFormSubmitted(event) {
    event.preventDefault();    
    const firstname = document.querySelector('#firstNameInput').value;
    const lastname = document.querySelector('#lastNameInput').value;
    const age = document.querySelector('#ageInput').value;
    let response = await axios.post(`http://localhost:1500/users/register`, { firstname, lastname, age });
    loadUsers();
}

async function loadPosts() {
    const postList = document.querySelector('#postsList');
    postList.innerHTML = "";
    const results = await axios.get(`http://localhost:1500/posts/`);
    results.data.payload.forEach((post) => {
        let listItem = document.createElement("li");
        listItem.innerText = `${post.poster_id}: ${post.body}`;
        postList.appendChild(listItem);
    });
}

async function addPostFormSubmitted(event) {
    event.preventDefault();    
    const poster_id = document.querySelector('#userId').value;
    const body = document.querySelector('#textInput').value;
    let results = await axios.post(`http://localhost:1500/posts/register`, {poster_id, body});
    loadPosts();
}
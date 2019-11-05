document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    loadPosts();
    // loadUsersPosts()
    const userForm = document.querySelector('#addUserForm');
    userForm.addEventListener('submit', addUserFormSubmitted);

    const postForm = document.querySelector('#addPostForm');
    postForm.addEventListener('submit', addPostFormSubmitted);

    // const userPostForm = document.querySelector('#getUserPostForm');
    // userPostForm.addEventListener('submit', getUserPostFormSubmitted);
});

async function loadUsers() {
    const usersList = document.querySelector('#usersList');
    usersList.innerHTML = "";
    const response = await axios.get(`http://localhost:1500/users/`);
    
    response.data.payload.forEach((user) => {
        let listItem = document.createElement("li");
        listItem.innerText = `id: ${user.id} - ${user.firstname} ${user.lastname}, age ${user.age}`;
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
    postList.innerText = "";
    const results = await axios.get(`http://localhost:1500/posts/`);
    results.data.payload.forEach((post) => {
        let listItem = document.createElement("li");
        // let p = document.createElement('p');
        // p.innerText = `testing`
        listItem.innerText = `${post.body}`; //${post.poster_id}: ${post.body}`;
        postList.append(listItem)//, p);
    });
}
// loadPosts();

async function addPostFormSubmitted(event) {
    event.preventDefault();    
    const poster_id = document.querySelector('#userId').value;
    const body = document.querySelector('#textInput').value;
    let results = await axios.post(`http://localhost:1500/posts/register`, {poster_id, body});
    window.alert(`sucessfully submitted post`);
}
    
    


//Use this to load single user posts
//     } else{
//         let results = await axios.get('http://localhost:1500/posts/'+ poster_id) //${poster_id}`);//``);
//         const postTitle = document.querySelector('#postTitle');
//         postTitle.innerText = `Single User's Posts`
//         loadUsersPosts();

//         console.log(`single`)
//     }
// }
 

async function loadUsersPosts() {
    const userPostList = document.querySelector('#postsList');
    console.log(`users post`, userPostList)
    userPostList.innerText = "";
    const poster_id = parseInt(document.querySelector('#userId').value);
    const results = await axios.get(`http://localhost:1500/posts/${poster_id}`);
    console.log(results)
    results.data.payload.forEach((post) => {
        let listItem = document.createElement("li");
        console.log(post)
        // let p = document.createElement('p');
        // p.innerText = `testing`
        listItem.innerText = `${post.body}`; 
        
        userPostList.append(listItem)//, p);
    });
}

// async function getUserPostFormSubmitted(event) {
//     event.preventDefault();    
//     const poster_id = document.querySelector('#userPostId').value;
//     let results = await axios.post(`http://localhost:1500/posts/${poster_id}`, {poster_id});
//     loadUserPosts();
// }
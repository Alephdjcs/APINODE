const loadInitialTemplate = () => {
    const template = `
    <h1> Usuarios </h1>
    <form id="user-form">
        <div>
            <label>Nombre</label>
            <input name="name"/>
        </div>
        <div>
            <label>Apellido</label>
            <input name="surname"/> <!-- Corrected name attribute -->
        </div>
        <div>
            <button type="submit">Enviar</button> <!-- Corrected attribute syntax -->
        </div>
    </form>
    <ul id="user-list"></ul>
    `;
    const body = document.getElementsByTagName('body')[0];
    body.innerHTML = template;
};

const getUsers = async () => {
    try {
        const response = await fetch('/users');
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const users = await response.json();
        console.log('Users:', users);

        const template = user => `
            <li>
                ${user.name} ${user.lastname}
                <button data-id="${user._id}" onclick="deleteUser('${user._id}')">
                    Eliminar
                </button>
            </li>
        `;

        const userList = document.getElementById('user-list');
        userList.innerHTML = users.map(user => template(user)).join('');
        
        users.forEach(user => {
            const userNode = document.querySelector(`[data-id="${user._id}"]`);
            userNode.onclick = async () => {
                try {
                    const response = await fetch(`/users/${user._id}`, {
                        method: 'DELETE'
                    });

                    if (!response.ok) {
                        throw new Error('Failed to delete user');
                    }

                    // Assuming User.MODE.REMOVE() is a function to remove the user from the UI
                    // Replace with your actual logic to update the UI after deletion
                    userNode.parentNode.removeChild(userNode); // Example placeholder

                    console.log(`User ${user._id} deleted successfully`);
                } catch (error) {
                    console.error('Error deleting user:', error.message);
                }
            };
        });
    } catch (error) {
        console.error('Error fetching users:', error.message);
    }
};

const addFormListener = () => {
    const userForm = document.getElementById('user-form');

    userForm.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(userForm);
        const data = Object.fromEntries(formData.entries());
        
        try {
            const response = await fetch('/users', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to add user');
            }

            console.log('User added successfully');
            userForm.reset();
            getUsers(); // Refresh the user list after adding a new user
        } catch (error) {
            console.error('Error adding user:', error.message);
        }
    };
};

window.onload = () => {
    loadInitialTemplate();
    addFormListener();
    getUsers();
};

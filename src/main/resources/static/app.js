const url = 'http://localhost:8080/api/admin'
const roles_url = 'http://localhost:8080/api/admin/roles'

const rolesList = document.getElementById('roles')

const editModal = new bootstrap.Modal(document.getElementById('editModal'))
const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'))


const userRolesToString = (user) => {
    let userRoles = '';
    for (let i = 0; i < user.roles.length; i++) {
            userRoles += user.roles[i].name.replace('ROLE_', '')
            if (i < user.roles.length - 1) {
                userRoles += ' '
            }
    }
    return userRoles
}

const parseUsers = (users) => {
    let output = '';
    users.forEach(user => {
        let userRoles = userRolesToString(user)
        output += `
            <tr id="row${user.id}">
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.username}</td>
                <td>${userRoles}</td>
                <td>
                    <button type="button" class="btn btn-info" data-bs-toggle="modal" id="editUserBtn">Edit</button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" id="deleteUserBtn">Delete</button>
                </td>
            </tr>
        `
    })
    document.getElementById('userstable').innerHTML = output
}

const parseRoles = (roles, htmlElement, selectedRoles) => {
    let rolesOutput = '';
    if (selectedRoles == null) {
        roles.forEach(role => {
            rolesOutput += `
            <option text="${role.name}" value="${role.id}">${role.name.replace('ROLE_', '')}</option>
            `
        }
    )} else {
        roles.forEach(role => {
            let selected = ''
            selectedRoles.forEach(selectedRole => {
                if (role.name == selectedRole.name) {
                    selected = 'selected'
                }
            })
            rolesOutput += `
            <option text="${role.name}" ${selected} value="${role.id}">${role.name.replace('ROLE_', '')}</option>
            `
        }

    )}
    
    htmlElement.size = roles.length
    htmlElement.innerHTML = rolesOutput
}


function getAllUsers() {
    fetch(url)
    .then(res => res.json())
    .then(users => parseUsers(users))
    .catch(error => alert(error.message))
}

function getAllRoles(htmlElement, selectedRoles) {
    fetch(roles_url)
    .then(res => res.json())
    .then(roles => parseRoles(roles, htmlElement, selectedRoles))
    .catch(error => alert(error.message))
}


getAllUsers()
getAllRoles(rolesList, null)


// User Tab

const urlAdminInfo = 'http://localhost:8080/api/admin/admin'
const adminInfoTable = document.getElementById('adminInfo')
const adminHead = document.getElementById('adminHead')

fetch(urlAdminInfo)
.then(res => res.json())
.then(admin => {
    adminHead.innerHTML = admin.username + ' with roles ' + userRolesToString(admin)

    let adminInfoOutput = ''
    adminInfoOutput += `
    <tr>
        <td>${admin.id}</td>
        <td>${admin.firstName}</td>
        <td>${admin.lastName}</td>
        <td>${admin.username}</td>
        <td>${userRolesToString(admin)}</td>
    </tr>
    `
    adminInfoTable.innerHTML = adminInfoOutput
})




// Add New User

const newUserForm = document.getElementById('newUserForm')

newUserForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let rolesSelected = rolesList.selectedOptions
    let userRoles = []
    for (let role of rolesSelected) {
        userRoles.push({
            id: role.value,
            name: "ROLE_" + role.innerHTML
        })
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            roles: userRoles

        })
    })
    .then(res => res.json())
    .then(user => {
        let userRoles = userRolesToString(user)
        let addRow = ''
        addRow += `
            <tr id="row${user.id}">
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.username}</td>
                <td>${userRoles}</td>
                <td>
                    <button type="button" class="btn btn-info" data-bs-toggle="modal" id="editUserBtn">Edit</button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" id="deleteUserBtn">Delete</button>
                </td>
            </tr>
        `
        document.getElementById('userstable').innerHTML = document.getElementById('userstable').innerHTML + addRow
    })
    .then(() => {
        newUserForm.reset()
    })
    document.getElementById("nav-home-tab").click()
})


// Edit and Delete User

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

// Edit

const idEdit = document.getElementById('id')
const firstNameEdit = document.getElementById('firstNameEdit')
const lastNameEdit = document.getElementById('lastNameEdit')
const usernameEdit = document.getElementById('usernameEdit')
const passwordEdit = document.getElementById('passwordEdit')
const rolesEdit = document.getElementById('rolesEdit')
const formEdit =  document.getElementById('editForm')


let updatedRow = null
on(document, 'click', '#editUserBtn', e => {
    updatedRow = e.target.parentNode.parentNode
    const userEditId = e.target.parentNode.parentNode.children[0].innerHTML
    fetch(url + '/' + userEditId)
    .then(res => res.json())
    .then(user => {
        idEdit.value = user.id
        firstNameEdit.value = user.firstName
        lastNameEdit.value = user.lastName
        usernameEdit.value = user.username
        passwordEdit.value = user.password
        getAllRoles(rolesEdit, user.roles)
        editModal.show()
    })
    .catch(error => alert(error.massage))
})

formEdit.addEventListener('submit', (e) => {
    e.preventDefault()
    let rolesSelected = document.getElementById('rolesEdit').selectedOptions
    let userRoles = []
    for (let role of rolesSelected) {
        userRoles.push({
            id: role.value,
            name: "ROLE_" + role.innerHTML
        })
    }

    fetch(url + '/' + idEdit.value, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: idEdit.value,
            firstName: firstNameEdit.value,
            lastName: lastNameEdit.value,
            username: usernameEdit.value,
            password: passwordEdit.value,
            roles: userRoles

        })
    })
    .then(res => res.json())
    .then(user => {
        console.log(user.firstName)
        console.log(updatedRow.children[1].innerHTML)
        console.log(updatedRow.children[2].innerHTML)

        updatedRow.children[1].innerHTML = user.firstName
        updatedRow.children[2].innerHTML = user.lastName
        updatedRow.children[3].innerHTML = user.username
        updatedRow.children[4].innerHTML = userRolesToString(user)   
    })
    editModal.hide()
})


// Delete

const formDelete =  document.getElementById('deleteForm')

let deletedRow = null
on(document, 'click', '#deleteUserBtn', e => {
    deletedRow = e.target.parentNode.parentNode
    const userDeleteId = e.target.parentNode.parentNode.children[0].innerHTML
    fetch(url + '/' + userDeleteId)
    .then(res => res.json())
    .then(user => {
        document.getElementById('deleteId').value = user.id
        document.getElementById('deleteFirstName').value = user.firstName
        document.getElementById('deleteLastName').value = user.lastName
        document.getElementById('deleteUsername').value = user.username
        document.getElementById('deletePassword').value = user.password
        getAllRoles(document.getElementById('deleteRoles'), user.roles)
        deleteModal.show()
    })
    .catch(error => alert(error.massage))
})

formDelete.addEventListener('submit', (e) => {
    e.preventDefault()

    fetch(url + '/' + deletedRow.children[0].innerHTML, {
        method: 'DELETE',
        })
    deleteModal.hide()
    deletedRow.parentNode.removeChild(deletedRow)
})


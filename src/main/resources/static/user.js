const urlUserInfo = 'http://localhost:8080/api/user'
const userInfoTable = document.getElementById('userInfo')
const userHead = document.getElementById('userHead')


const rolesToString = (user) => {
    let userRoles = '';
    for (let i = 0; i < user.roles.length; i++) {
            userRoles += user.roles[i].name.replace('ROLE_', '')
            if (i < user.roles.length - 1) {
                userRoles += ' '
            }
    }
    return userRoles
}

fetch(urlUserInfo)
.then(res => res.json())
.then(user => {
    userHead.innerHTML = user.username + ' with roles ' + rolesToString(user)

    let userInfoOutput = ''
    userInfoOutput += `
    <tr>
        <td>${user.id}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.username}</td>
        <td>${rolesToString(user)}</td>
    </tr>
    `
    userInfoTable.innerHTML = userInfoOutput
}).catch(error => alert(error.message))

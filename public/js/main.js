const container = document.querySelector('.container')
const formAdd = document.querySelector('.add')

window.onload = async function () {
    let res = await fetch("http://localhost:3000/getUsers")
    let data = await res.json()
    data = data.reverse()
    if (data.length === 0) {
        let content = document.createElement("div")
        content.innerHTML = "<p>Il n'y a pas d'utilisateur</p>"
        container.appendChild(content)
    } else {
        data.forEach(user => {
            let newUser = document.createElement("div")
            newUser.setAttribute("id", user.id)
            newUser.setAttribute("class", "content")
            if (user.sexe === 1) {
                user.sexe = "Homme"
            } else {
                user.sexe = "Femme"
            }
            newUser.innerHTML = `<h3>Utilisateur ${user.id}</h1>
            <div class="contentDisplay">
            <p>NOM : ${user.nom}</p>
            <p>AGE : ${user.age} ans</p>
            <p>SEXE : ${user.sexe}</p>
            <p class="update" id="${user.id}">modifier</p>
            <p class="delete" id="${user.id}">supprimer</p>
            </div>
            <div class="contentUpdate">
            <form class="modifier" id="${user.id}" style="display: none;">
                <input type="text" placeholder="nom" id="nom" name="nom" value="${user.nom}">
                <input type="number" placeholder="age" id="age" name="age" value="${user.age}">
                <select name="sexe" id="sexe">
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                </select>
                <input type="submit" value="Modifier l'utilisateur" id="modif">
            </form>
            </div>`
            container.appendChild(newUser)
        })
    }


    const suppr = document.querySelectorAll('.delete')
    suppr.forEach(elem => {
        elem.addEventListener('click', async () => {
            let res = await fetch(`http://localhost:3000/deleteUser/${elem.id}`, {
                method: "DELETE"
            })
            let data = await res.json()
            console.log(data)
            location.reload()
        })
    })

    const update = document.querySelectorAll('.update')
    const modifier = document.querySelectorAll('.modifier')
    update.forEach(elem => {
        elem.addEventListener('click', () => {
            modifier.forEach(ele => {
                if (ele.id === elem.id) {
                    if (ele.style.display === "none") {
                        ele.style.display = "block"
                    } else {
                        ele.style.display = "none"
                    }
                }
            })
        })
    })
    modifier.forEach(elem => {
        elem.addEventListener('submit', async (e) => {
            e.preventDefault()
            let formData = new FormData(e.target)
            if (formData.get('sexe') === "Homme") {
                formData.set('sexe', 1)
            } else {
                formData.set('sexe', 0)
            }
            let updateUser = {
                nom: formData.get('nom'),
                age: formData.get('age'),
                sexe: formData.get('sexe')
            }
            let res = await fetch(`http://localhost:3000/updateUser/${elem.id}`, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateUser)
            })
            let data = await res.json()
            console.log(data)
            location.reload()
        })
    })
}

formAdd.addEventListener('submit', async (e) => {
    e.preventDefault()
    let formData = new FormData(e.target)
    if (formData.get('sexe') === "Homme") {
        formData.set('sexe', 1)
    } else {
        formData.set('sexe', 0)
    }
    let newUser = {
        nom: formData.get('nom'),
        age: formData.get('age'),
        sexe: formData.get('sexe')
    }
    let res = await fetch("http://localhost:3000/createUser", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
    let data = await res.json()
    console.log(data)
    location.reload()
})
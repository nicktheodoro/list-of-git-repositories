const inputElement = document.querySelector('#git-id')
const btnElement = document.querySelector('button')
const ulElement = document.querySelector('ul')

btnElement.addEventListener('click', listOfGitRepositoryOnView)

function listOfGitRepositoryOnView () {
    let gitUser = inputElement.value
    ulElement.innerHTML = 'Loading...'

    myPromisse(gitUser)
        .then(function(response) {
            ulElement.innerHTML = ''
            for (obj of response) {
                let liElement = document.createElement('li')
                let aElement = document.createElement('a')
        
                aElement.appendChild(document.createTextNode(obj.name))
                aElement.setAttribute('href', `${obj.html_url}`)
                liElement.appendChild(aElement)
                ulElement.appendChild(liElement)
            }
        })
        .catch(function(error) {
            console.warn(error)
            ulElement.innerHTML = 'Non-existent User'
        })
}

let myPromisse = function(gitUser) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', `https://api.github.com/users/${gitUser}/repos`)
        xhr.send(null)

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    reject('Erro na requisição')
                }
            }
        }
    })
}


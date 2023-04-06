    const btn = document.querySelector('button')

    const clickHandler = () => alert('You are the best!')

    btn.addEventListener('click', clickHandler)

    const addForm = document.querySelector('form');
    const nameInput = document.querySelector('input');
    const container = document.querySelector('section');

    function putTheThingInTheView(res) {
        container.innerHTML = ''
        nameInput.value = ''

        res.data.forEach((studentName, index) => {
            container.innerHTML += `<p name=${index}>${studentName}</p>`
        })

        document.querySelectorAll('p').forEach(element => {
            const theIndexValue = element.getAttribute('name');

            element.addEventListener('click', () => {
                axios
                    .delete(`http://localhost:4001/api/students/${theIndexValue}`)
                    .then(res => {
                        putTheThingInTheView(res)
                    })
            })
        })
    }
    function submitHandler(evt) {
        evt.preventDefault();

        axios
            .post('http://localhost:4001/api/students', { name: nameInput.value })
            .then(res => {
                putTheThingInTheView(res)
            })
            .catch(err => {
                nameInput.value = ''

                const notif = document.createElement('aside')
                notif.innerHTML = `<p>${err.response.data}</p>
                <button class="close">close</button>`
                document.body.appendChild(notif)

                document.querySelectorAll('.close').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.target.parentNode.remove()
                    })
                })
            })
    }
        axios
            .get('http://localhost:4001/api/students')
            .then(res => {
                putTheThingInTheView(res)
                })
            addForm.addEventListener('submit', submitHandler)
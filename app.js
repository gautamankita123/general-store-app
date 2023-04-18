const itemName = document.querySelector('#item-name');
const itemDescription = document.querySelector('#item-description');
const itemPrice = document.querySelector('#item-price');
const itemQuantity = document.querySelector('#item-qty');
const btn = document.querySelector('.add');
const tableBody = document.querySelector('.table_body');

btn.addEventListener('click', addItem);
window.addEventListener('DOMContentLoaded', getItems);
tableBody.addEventListener('click', buyOne);
tableBody.addEventListener('click', buyTwo);
tableBody.addEventListener('click', buyThree);

function getItems() {
    axios
        .get('https://crudcrud.com/api/650f8c2a4bc74d56989eff9f2e0e346d/items')
        .then(response => {
            response.data.forEach(item => {
                let output = `<tr id=${item._id}>
                                <td>${item.name}</td>
                                <td>${item.description}</td>
                                <td>${item.price}</td>
                                <td>${item.quantity}</td>
                                <td>
                                    <div>
                                        <button type="submit" class="btn btn-info buy1">Buy 1</button>
                                        <button type="submit" class="btn btn-info buy2">Buy 2</button>
                                        <button type="submit" class="btn btn-info buy3">Buy 3</button>
                                    </div>
                                </td>
                            </tr>`;
                tableBody.innerHTML += output;
            })
        })
        .catch(err => console.error(err));
}

function addItem(e) {
    e.preventDefault();
    const name = itemName.value;
    const description = itemDescription.value;
    const price = itemPrice.value;
    const quantity = itemQuantity.value;
    let item = {
        "name": name,
        "description": description,
        "price": price,
        "quantity": quantity,
    };
    if (name && description && price && quantity) {
        axios
            .post('https://crudcrud.com/api/650f8c2a4bc74d56989eff9f2e0e346d/items', item)
            .then(res => {
                let output = `<tr id=${res.data._id}>
                                <td>${res.data.name}</td>
                                <td>${res.data.description}</td>
                                <td>${res.data.price}</td>
                                <td>${res.data.quantity}</td>
                                <td>
                                    <div>
                                        <button type="submit" class="btn btn-info buy1">Buy 1</button>
                                        <button type="submit" class="btn btn-info buy2">Buy 2</button>
                                        <button type="submit" class="btn btn-info buy3">Buy 3</button>
                                    </div>
                                </td>
                            </tr>`;
                tableBody.innerHTML += output;
            })
            .catch(err => console.error(err));
    }
    if (!name && !description && !price && !quantity) {
        alert('All fields are required');
    }
}

function buyOne(e) {
    if (e.target.classList.contains('buy1')) {
        const item = e.target.parentElement.parentElement.parentElement;
        const id = item.getAttribute('id');
        let updatedItem = {
            "name": item.children[0].textContent,
            "description": item.children[1].textContent,
            "price": item.children[2].textContent,
            "quantity": (item.children[3].textContent - 1),
        };
        axios
            .put(`https://crudcrud.com/api/650f8c2a4bc74d56989eff9f2e0e346d/items/${id}`, updatedItem)
            .then(response => {
                item.children[3].textContent -= 1;
            })
            .catch(err => console.error(err));
    }
}

function buyTwo(e) {
    if (e.target.classList.contains('buy2')) {
        const item = e.target.parentElement.parentElement.parentElement;
        const id = item.getAttribute('id');
        let updatedItem = {
            "name": item.children[0].textContent,
            "description": item.children[1].textContent,
            "price": item.children[2].textContent,
            "quantity": (item.children[3].textContent - 2),
        };
        axios
            .put(`https://crudcrud.com/api/650f8c2a4bc74d56989eff9f2e0e346d/items/${id}`, updatedItem)
            .then(response => {
                item.children[3].textContent -= 2;
            })
            .catch(err => console.error(err));
    }
}

function buyThree(e) {
    if (e.target.classList.contains('buy3')) {
        const item = e.target.parentElement.parentElement.parentElement;
        const id = item.getAttribute('id');
        let updatedItem = {
            "name": item.children[0].textContent,
            "description": item.children[1].textContent,
            "price": item.children[2].textContent,
            "quantity": (item.children[3].textContent - 3),
        };
        axios
            .put(`https://crudcrud.com/api/650f8c2a4bc74d56989eff9f2e0e346d/items/${id}`, updatedItem)
            .then(response => {
                item.children[3].textContent -= 3;
            })
            .catch(err => console.error(err));
    }
}
const {createStore} = window.Redux;
const initialState = ['listen to music'];
const hobbyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_HOBBY': {
            const newList = [...state];
            newList.push((action.payload));
            return newList;
        }
        default: return state
    }
}

const store = createStore(hobbyReducer);
//handle form submit
const hobbyForm = document.querySelector('#hobbyForm');
if (hobbyForm) {
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const hobbyText = hobbyForm.querySelector('#hobbyText');
        if (!hobbyText) return;
        const action = {
            type: 'ADD_HOBBY',
            payload: hobbyText.value
        }
        store.dispatch(action);
        hobbyForm.reset();
    }
    hobbyForm.addEventListener('submit', handleFormSubmit);
}
store.subscribe(() => {
    console.log('STATE UPDATE:', store.getState());
    const newHobbyList = store.getState();
    renderHobbyList(newHobbyList);
    localStorage.setItem('hobbyList',JSON.stringify(newHobbyList));
})

//render hobby list
const renderHobbyList = (hobbyList) => {
    if (!Array.isArray(hobbyList) || hobbyList.length === 0) return;
    const ulElement = document.querySelector('#hobbyList')
    if (!ulElement) return;
    ulElement.innerHTML = ''; // reset previous content of ul
    for (const hobby of hobbyList) {
        const liElement = document.createElement('li');
        liElement.textContent = hobby;
        ulElement.appendChild(liElement);
    }
}
// render initial hobby list
const initialHobbyList = store.getState()
renderHobbyList(initialHobbyList);
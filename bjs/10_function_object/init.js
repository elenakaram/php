
window.onload = function()
{ 
    document.querySelector('#generatePersonOutput').onclick = function () {
        generatePerson(); 
    }

    document.querySelector('#clearCart').onclick = function () {
        clearCart();
    }
};

function generatePerson() {
    const initPerson = personGenerator.getPerson();
    document.querySelector('#genderOutput').innerText = initPerson.gender;
    document.querySelector('#firstNameOutput').innerText = initPerson.firstName;
    document.querySelector('#patronymicOutput').innerText = initPerson.patronymic;
    document.querySelector('#surnameOutput').innerText = initPerson.surName;
    document.querySelector('#birthYearOutput').innerText = initPerson.yearBirth;
    document.querySelector('#professionOutput').innerText = initPerson.profession;    
};

function clearCart() {
    document.querySelector('#genderOutput').innerText = '';
    document.querySelector('#firstNameOutput').innerText = '';
    document.querySelector('#patronymicOutput').innerText = '';
    document.querySelector('#surnameOutput').innerText = '';
    document.querySelector('#birthYearOutput').innerText = '';
    document.querySelector('#professionOutput').innerText = '';  
}




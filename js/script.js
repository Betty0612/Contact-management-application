window.onload = function () {
    //Get Buttons
    var AddBtn = document.getElementById('AddBtn');
    var AddFormDiv = document.querySelector('.AddForm');
    var cancelBtn = document.getElementById('Cancel');
    var AddNowBtn = document.getElementById('AddNow');
    //Get Form Fields
    var firstName = document.getElementById('fname');
    var lastName = document.getElementById('lname');
    var BirthDate = document.getElementById('Bdate');
    var PhoneNumber = document.getElementById('PNumber');
    var EMail = document.getElementById('E_mail');
    var address = document.getElementById('address');

    var ContactTableDiv = document.querySelector('.ContactTable');

    AddBtn.addEventListener("click", function () {
        AddFormDiv.style.display = "block";
    });
    cancelBtn.addEventListener("click", function () {
        AddFormDiv.style.display = "none";
    });

    AddNowBtn.addEventListener("click", checkData);

    ContactTableDiv.addEventListener("click", removeEntry);

    //Array for data store
    var contTable = [];

    function jsonStructure(firstName, lastName, BirthDate, PhoneNumber, EMail, address) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.BirthDate = BirthDate;
        this.PhoneNumber = PhoneNumber;
        this.EMail = EMail;
        this.address = address;
    }

    function checkData() {
        var letters = /^[A-Za-z]+$/;
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var phoneno = /^\d{2,15}$/;
        if (firstName.value.length == 0 || lastName.value.length == 0 || BirthDate.value.length == 0 || PhoneNumber.value.length == 0 || EMail.value.length == 0) {
            alert("Please fill out all required fields!");
            return false;
        } else if (!firstName.value.match(letters)) {
            alert("First name may only contain letters!");
            return false;
        } else if (!lastName.value.match(letters)) {
            alert("Last name may only contain letters!");
            return false;
        } else if (!PhoneNumber.value.match(phoneno)) {
            alert("Phone number may only contain numbers!");
            return false;
        } else if (!EMail.value.match(mailformat)) {
            alert("Must be a valid e-mail!");
            return false;
        } else addToContacts();
    }

    function addToContacts() {
        var isNotNull = firstName.value != '' && lastName.value != '' && BirthDate.value != '' && PhoneNumber.value != '' && EMail.value != '';
        if (isNotNull) {
            var obj = new jsonStructure(firstName.value, lastName.value, BirthDate.value, PhoneNumber.value, EMail.value, address.value);
            contTable.push(obj);
            localStorage['ContactTable'] = JSON.stringify(contTable);
            AddFormDiv.style.display = "none";
            clearForm();
            showContactTable();
        }
    }

    function removeEntry(e) {
        if (e.target.classList.contains('Delbtn')) {
            var remID = e.target.getAttribute('data-id');
            contTable.splice(remID, 1);
            localStorage['ContactTable'] = JSON.stringify(contTable);
            showContactTable();
        }
    }

    function clearForm() {
        var FormField = document.querySelectorAll('.FormField');
        for (var i in FormField) {
            FormField[i].value = '';
        }
    }

    function showContactTable() {
        if (localStorage['ContactTable'] === undefined) {
            localStorage['ContactTable'] = '';
            localStorage.clear();
        } else {
            contTable = JSON.parse(localStorage['ContactTable']);
            ContactTableDiv.innerHTML = '';
            var titleAllCont = '<div class="title"> <h3>All Contacts</h3> </div> <hr>';
            ContactTableDiv.innerHTML += titleAllCont;
            var table = '<table class="contTab">';
            table +=
                '<tr>' +
                '<th>First Name</th>' +
                '<th>Last Name</th> ' +
                '<th>Date of birth</th>' +
                '<th>Phone number</th>' +
                '<th>E-mail</th>' +
                '<th>Address</th>' +
                '<th>Delete</th>' +
                '</tr>';
            for (var x in contTable) {
                table +=
                    '<tr>' +
                    '<td>' + contTable[x].firstName + '</td>' +
                    '<td>' + contTable[x].lastName + '</td>' +
                    '<td>' + contTable[x].BirthDate + '</td>' +
                    '<td>' + contTable[x].PhoneNumber + '</td>' +
                    '<td>' + contTable[x].EMail + '</td>' +
                    '<td>' + contTable[x].address + '</td>' +
                    '<td>  <button type="button" class="RedBtn Delbtn" data-id="' + x + '">Delete</button></td>' +
                    '</tr>';
            }
            table += '</table>';
            ContactTableDiv.innerHTML += table;
        }
    }
    showContactTable();
    AddFormDiv.style.display = "none";
}
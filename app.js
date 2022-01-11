const title = document.querySelector("#title");
const author = document.querySelector("#author");
const year = document.querySelector("#year");
const totalPages = document.querySelector("#totalPages");
const pagesRead = document.querySelector("#pagesRead");
const btnAdd = document.querySelector("#btn-add");
const btnEdit = document.querySelector("#btn-edit");
const btnDelete = document.querySelector("#btn-delete");
const tableBody = document.querySelector("#table-body");
const tableBody2 = document.querySelector("#table-body2");

var selectRow = null;

let arr = [];


function onEdit(td) {
    selectRow = td.parentElement.parentElement;
    title.value = selectRow.cells[1].innerHTML;
    author.value = selectRow.cells[2].innerHTML;
    year.value = selectRow.cells[3].innerHTML;
    totalPages.value = selectRow.cells[4].innerHTML;
    pagesRead.value = selectRow.cells[5].innerHTML;
}

function displayRecords(arr) {
    let len = arr.length;
    if (len > 0) {
        let rows = '';
        for (let i = 0; i < arr.length; i++) {
            rows += `<tr>
        <th scope="row">${i+1}</th>
        <td>${arr[i].bookTitle}</td>
        <td>${arr[i].bookAuthor}</td>
        <td>${arr[i].publishedYear}</td>
        <td>${arr[i].bookTotalPages}</td>
        <td>${arr[i].bookPagesRead}</td>
        <td>
            <i onClick="onEdit(this)" class="far fa-edit btn btn-primary btn-edit"></i>
        </td>
        <td>
            <i onClick="deleteRecord(this)" class="fas fa-trash-alt btn btn-danger btn-delete"></i>
        </td>
    </tr>`;
            tableBody.innerHTML = rows;
        }
    } else {
        tableBody.innerHTML = ``;
    }
}

function resetForm() {
    title.value = '';
    author.value = '';
    year.value = '';
    totalPages.value = '';
    pagesRead.value = '';
    selectRow = null;
}

function insertRecord() {
    if (selectRow == null) {
        // get form data and create new object
        let len = arr.length;
        let newRecord = {
                bookIndex: len + 1,
                bookTitle: title.value,
                bookAuthor: author.value,
                publishedYear: year.value,
                bookTotalPages: totalPages.value,
                bookPagesRead: pagesRead.value,
            }
            // push the objects into an array 
        arr.push(newRecord);
    } else {
        // update korbe 
        updateRecord(arr, selectRow);
    }
    // display all records on the table 
    bookCompletedStatus(arr);
    displayRecords(arr);
}

console.log(`Developed by: HossAin Shuvo`);
console.log(`Facebook: https://www.facebook.com/hossain.shuvo.7860`);

btnAdd.addEventListener("click", function() {

    // basic validation 
    if (title.value === "") {
        alert('give book title');
    } else if (author.value === "") {
        alert('give book author');
    } else if (year.value === "") {
        alert('give book published year');
    } else if (totalPages.value === "") {
        alert('give total pages');
    } else if (pagesRead.value === "") {
        alert('give pages read');
    }
    if (title.value !== '' && author.value !== '' && year.value !== '' && totalPages.value !== '' && pagesRead.value !== '') {
        insertRecord();
        resetForm();
    }
})

function updateRecord(arr, selectRow) {
    let temp = Number(selectRow.cells[0].innerHTML);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].bookIndex === temp) {
            arr[i].bookTitle = title.value;
            arr[i].bookAuthor = author.value;
            arr[i].publishedYear = year.value;
            arr[i].bookTotalPages = totalPages.value;
            arr[i].bookPagesRead = pagesRead.value;
        }
    }
}

function deleteRecord() {
    arr.pop();
    displayRecords(arr);
}

function displayCompletedBooks(arr) {
    let len = arr.length;
    if (len > 0) {
        let rows = '';
        for (let i = 0; i < arr.length; i++) {
            rows += `<tr>
        <th scope="row">${i+1}</th>
        <td>${arr[i].bookTitle}</td>
        <td>${arr[i].bookAuthor}</td>
        <td>${arr[i].publishedYear}</td>
        <td>${arr[i].bookTotalPages}</td>
    </tr>`;
            tableBody2.innerHTML = rows;
        }
    } else {
        tableBody2.innerHTML = ``;
    }
}


function bookCompletedStatus(arr) {
    let arrBookComplete = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].bookTotalPages === arr[i].bookPagesRead) {
            arrBookComplete.push(arr[i]);
            arr.splice(i, 1);
        }
    }
    displayCompletedBooks(arrBookComplete);
}
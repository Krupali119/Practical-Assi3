document.getElementById('getBooks').addEventListener('click', function() {
    const url = 'https://openlibrary.org/subjects/bestsellers.json';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Unable to fetch data');
            }
            return response.json();
        })
        .then(data => {
            displayBooks(data.works);
        })
        .catch(error => {
            document.getElementById('bookList').innerHTML = `<p>${error.message}</p>`;
        });
});

function displayBooks(books) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = ''; // Clear previous results

    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.innerHTML = `
            <img src="${book.cover_id ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg` : 'https://via.placeholder.com/150'}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>Author: ${book.authors.map(author => author.name).join(', ')}</p>
        `;
        bookList.appendChild(bookItem);
    });
}

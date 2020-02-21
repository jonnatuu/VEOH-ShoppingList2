const notes_view = ((data) => {
    let html = `
    <html>
    <head>
    <meta http-equiv="Content-Type", content="text/html;charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="../css/style.css">
    </head>
    <body>
        Logged in as user: ${data.user_name}
        <form action="/logout" method="POST">
            <button type="submit">Log out</button>
        </form>`;


    data.notes.forEach((note) => {
        html += note.text;
        html += `
            <form action="delete-note" method="POST">
                <input type="hidden" name="note_id" value="${note._id}">
                <button type="submit">Poista ostoslsita</button>
            </form>
            `;
    });

    html += `
        <form action="/add-note" method="POST">
            <input type="text" name="note">
            <button type="submit">Lisää ostoslista</button>
        </form>
    </html>
    </body>
    `;
    return html;
});


const note_view = (data) => {
    let html = `
    <html>
    <body>
        Note text: ${data.text}
    </body>
    </html>
    `;
    return html;
};

module.exports.notes_view = notes_view;
module.exports.note_view = note_view;
const shoppinglists_view = ((data) => {
    let html = `
    <html>
    <head>
    <meta http-equiv="Content-Type", content="text/html;charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="../css/style.css">
    </head>
    <body>
    <div id="keskiosa">
        Kirjautunut käyttäjänä: ${data.user_name} <br><br>
        <form action="/logout" method="POST">
            <button type="submit">Kirjaudu ulos</button>
        </form>`;


    data.shoppinglists.forEach((shoppinglist) => {
        html += `
            <a href="/shoppinglist/${shoppinglist._id}">${shoppinglist.name}</a><br><br>
            <form action="delete-shoppinglist" method="POST">
                <input type="hidden" name="shoppinglist_id" value="${shoppinglist._id}">
                <button type="submit">Poista ostoslista</button>
            </form>
            `;
    });

    html += `
        <form action="/add-shoppinglist" method="POST">
            <input type="text" name="shoppinglist">
            <button type="submit">Lisää ostoslista</button>
        </form>
    <br><br>
    <img src="css/pic.jpg" class="logo" alt="mypic" width="300"></img>
    </div>
    </body>
    </html>
    `;
    return html;
});


const shoppinglist_view = ((data) => {
    let html = `
    <html>
    <body>
    <meta http-equiv="Content-Type", content="text/html;charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="../css/style.css">
    <div id="keskiosa">
        Ostoslistan nimi: ${data.shoppinglist_name} <br><br>
    `;

    data.products.forEach((product) => {
        html += `
        <p>
        <h4> ${product.name}<br></h4>
        <img src="${product.img}" width="150px" height="150px" /><br>
        Määrä: ${product.quantity}
        </p>
        `;

    });

    html += `
    <form action="/add-product/${data.shoppinglist_id}" method="POST">
    Ostoksen nimi: <input type="txt" name="product_name"><br>
    Tuotteen kuva: <input type="text" name="product_image_url"><br>
    Määrä: <input type="number" name="product_quantity"><br><br>
    <button type="submit">Lisää tuote</button><br><br>

    </form>
    </div>
    </body>
    </html>
    `;
    
    return html;
});

module.exports.shoppinglists_view = shoppinglists_view;
module.exports.shoppinglist_view = shoppinglist_view;
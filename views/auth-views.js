const login_view = () => {
    let html = `
    <html>
    <head>
    <meta http-equiv="Content-Type", content="text/html;charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="../css/style.css">
    </head>
    <body>
        <div id="keskiosa">
        <h1>Shopping list app by Jonna</h1>
        <form action="/login" method="POST">
            <input type="text" name="user_name">
            <button type="submit">Log in</button>
        </form>
        <form action="/register" method="POST">
            <input type="text" name="user_name">
            <button type="submit">Register</button>
        </form><br><br>
  
        </div>
    </body>
    <html>
    `;

    return html;
}

module.exports.login_view = login_view;
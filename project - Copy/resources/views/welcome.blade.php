<!-- resources/views/welcome.blade.php -->

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome</title>
        <link rel="stylesheet" href="{{ asset('css/welcome.css') }}">
    </head>

    <body>

    <header class="header">
    <div class="logo-container">
        <h1>CENTER FOR DEFENCE RESEARCH AND DEVELOPMENT</h1>
    </header>
            <div class="login1">
            <a href="{{ route('login') }}" class="login-button">Login</a>
            </div>
            <!-- Add your logo here -->
            <img src="{{ asset('images\crd logo.png') }}" alt="Logo" class="logo">
            


            <main>
                <section>
                    <h2 class="header2">Quotation Tracking System</h2>
                </section>
            </main>

    </body>
</html>

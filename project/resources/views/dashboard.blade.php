<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="{{ asset('css/admin.css') }}">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}"> <!-- If you still need Bootstrap -->
</head>
<body>
    <div class="container">
        <h1>Dashboard</h1>

        <!-- Navigation Bar -->
        <nav>
            <ul class="nav">
                <li><a href="{{ route('add.officers') }}">Add Officers</a></li>
                <li><a href="{{ route('manage.officers') }}">Manage Officers</a></li>
            </ul>
        </nav>

        <!-- Logout Form -->
        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
            @csrf
        </form>

        <button onclick="event.preventDefault(); document.getElementById('logout-form').submit();" class="btn btn-danger logout-button">
            Logout
        </button>

        <!-- Add your dashboard content here -->
    </div>
    
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="<?php echo e(asset('css/admin.css')); ?>">
    <link rel="stylesheet" href="<?php echo e(asset('css/app.css')); ?>"> <!-- If you still need Bootstrap -->
</head>
<body>
    <div class="container">
        <h1>Dashboard</h1>

        <!-- Navigation Bar -->
        <nav>
            <ul class="nav">
                <li><a href="<?php echo e(route('add.officers')); ?>">Add Officers</a></li>
                <li><a href="<?php echo e(route('manage.officers')); ?>">Manage Officers</a></li>
                <li><a href="<?php echo e(route('add.officers')); ?>">Add Projects</a></li>
                <li><a href="<?php echo e(route('add.officers')); ?>">Manage Projects</a></li>
            </ul>
        </nav>

        <!-- Logout Form -->
        <form id="logout-form" action="<?php echo e(route('logout')); ?>" method="POST" style="display: none;">
            <?php echo csrf_field(); ?>
        </form>

        <button onclick="event.preventDefault(); document.getElementById('logout-form').submit();" class="btn btn-danger logout-button">
            Logout
        </button>

        <!-- Add your dashboard content here -->
    </div>
    
    <script src="<?php echo e(asset('js/app.js')); ?>"></script>
</body>
</html>


<?php /**PATH D:\CDRD\Account_Section\project\resources\views/dashboard.blade.php ENDPATH**/ ?>
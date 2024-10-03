<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link rel="stylesheet" href="<?php echo e(asset('css/register.css')); ?>">
</head>

<body class="page2">
<header>
    <img src="<?php echo e(asset('images/crd logo.png')); ?>" alt="Logo" class="logo">
</header>

<main>
    <section class="register-section">
        <h2 class="header2">Register</h2>
        <?php if($errors->any()): ?>
            <div class="error">
                <ul>
                    <?php $__currentLoopData = $errors->all(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $error): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <li><?php echo e($error); ?></li>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </ul>
            </div>
        <?php endif; ?>

        <form action="<?php echo e(route('register')); ?>" method="POST">
            <?php echo csrf_field(); ?>
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div class="form-group">
                <label for="password_confirmation">Confirm Password:</label>
                <input type="password" id="password_confirmation" name="password_confirmation" required>
            </div>
            <button type="submit" class="register-button">Register</button>
        </form>

        <p>Already have an account? <a href="<?php echo e(route('login')); ?>">Login here</a></p>
    </section>
</main>

</body>

</html>
<?php /**PATH D:\CDRD\Account_Section\project\resources\views/auth/register.blade.php ENDPATH**/ ?>
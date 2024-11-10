<!DOCTYPE html>
<html lang="en">
  <head>

    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Twitter -->
    <meta name="twitter:site" content="@themepixels">
    <meta name="twitter:creator" content="@themepixels">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="DashForge">
    <meta name="twitter:description" content="Responsive Bootstrap 5 Dashboard Template">
    <meta name="twitter:image" content="http://themepixels.me/dashforge/img/dashforge-social.png">

    <!-- Facebook -->
    <meta property="og:url" content="http://themepixels.me/dashforge">
    <meta property="og:title" content="DashForge">
    <meta property="og:description" content="Responsive Bootstrap 5 Dashboard Template">

    <meta property="og:image" content="http://themepixels.me/dashforge/img/dashforge-social.png">
    <meta property="og:image:secure_url" content="http://themepixels.me/dashforge/img/dashforge-social.png">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="600">

    <!-- Meta -->
    <meta name="description" content="Responsive Bootstrap 5 Dashboard Template">
    <meta name="author" content="ThemePixels">

    <!-- Favicon -->
    <link rel="shortcut icon" type="image/x-icon" href="<?php echo base_url('assets/img/favicon.png') ?>">

    <title>DashForge Responsive Bootstrap 5 Dashboard Template</title>

    <!-- vendor css -->
    <link href="<?php echo base_url('assets/lib/@fortawesome/fontawesome-free/css/all.min.css') ?>" rel="stylesheet">
    <link href="<?php echo base_url('assets/lib/remixicon/fonts/remixicon.css') ?>" rel="stylesheet">
    <link href="<?php echo base_url('assets/lib/jqvmap/jqvmap.min.css') ?>" rel="stylesheet">

    <!-- DashForge CSS -->
    
    <link rel="stylesheet" href="<?php echo base_url('assets/css/dashforge.css') ?>">
    <link rel="stylesheet" href="<?php echo base_url('assets/css/dashforge.dashboard.css') ?>">

  </head>
  <body>
  <?php echo view('menu.php'); ?>

    <div class="content ht-100v pd-0">

      <div class="content-body">
        <?php echo view('dashboard.php'); ?>
      </div>
    </div>

    <script src="<?php echo base_url('assets/lib/jquery/jquery.min.js') ?>"></script>
    <script src="<?php echo base_url('assets/lib/bootstrap/js/bootstrap.bundle.min.js') ?>"></script>
    <script src="<?php echo base_url('assets/lib/feather-icons/feather.min.js') ?>"></script>
    <script src="<?php echo base_url('assets/lib/ionicons/ionicons/ionicons.esm.js') ?>" type="module"></script>
    <script src="<?php echo base_url('assets/lib/perfect-scrollbar/perfect-scrollbar.min.js') ?>"></script>
    <script src="<?php echo base_url('assets/lib/jquery.flot/jquery.flot.js') ?>"></script>
    <script src="<?php echo base_url('assets/lib/jquery.flot/jquery.flot.stack.js') ?>"></script>
    <script src="<?php echo base_url('assets/lib/jquery.flot/jquery.flot.resize.js') ?>"></script>
    <script src="<?php echo base_url('assets/lib/chart.js/Chart.bundle.min.js') ?>"></script>
    <script src="<?php echo base_url('assets/lib/jqvmap/jquery.vmap.min.js') ?>"></script>
    <script src="<?php echo base_url('assets/lib/jqvmap/maps/jquery.vmap.usa.js') ?>"></script>

    <script src="<?php echo base_url('assets/js/dashforge.js') ?>"></script>
    <script src="<?php echo base_url('assets/js/dashforge.aside.js') ?>"></script>
    <script src="<?php echo base_url('assets/js/dashforge.sampledata.js') ?>"></script>

    <!-- append theme customizer -->
    <script src="<?php echo base_url('assets/lib/js-cookie/js.cookie.js') ?>"></script>
    <script src="<?php echo base_url('assets/js/dashboard-one.js') ?>"></script>
    <script src="<?php echo base_url('assets/js/dashforge.settings.js') ?>"></script>
    
</div>


  </body>

</html>

<!DOCTYPE html>
<html lang="en">
  <head>

    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Meta -->
    <meta name="description" content="<?php echo $description ?>">
    <meta name="author" content="<?php echo $author ?>">

    <!-- Favicon -->
    <link rel="shortcut icon" type="image/x-icon" href="<?php echo getIMGPath('favicon.png') ?>">

    <title><?php echo $title ?></title>

    <!-- vendor css -->
    <link rel="stylesheet" href="<?php echo getLibPath('@fortawesome/fontawesome-free/css/all.min.css') ?>">
    <link rel="stylesheet" href="<?php echo getLibPath('remixicon/fonts/remixicon.css') ?>">
    <link rel="stylesheet" href="<?php echo getLibPath('jqvmap/jqvmap.min.css') ?>">
    <link rel="stylesheet" href="<?php echo getCSSPath('dataTables.dataTables.min.css') ?>">
    <link rel="stylesheet" href="<?php echo getCSSPath('fixedColumns.dataTables.css') ?>">
    <link rel="stylesheet" href="<?php echo getCSSPath('select.dataTables.css') ?>">
    <link rel="stylesheet" href="<?php echo getCSSPath('buttons.dataTables.css') ?>">

    <link rel="stylesheet" href="<?php echo getCSSPath('all.min.css') ?>">
    <link rel="stylesheet" href="<?php echo getCSSPath('jquery-ui.css') ?>">
    <link rel="stylesheet" href="<?php echo getCSSPath('jquery.toast.css') ?>" />
    <link rel="stylesheet" href="<?php echo getCSSPath('select2.min.css') ?>" />

    <!-- DashForge CSS -->    
    <link rel="stylesheet" href="<?php echo getCSSPath('dashforge.css') ?>">
    <link rel="stylesheet" href="<?php echo getCSSPath('dashforge.demo.css') ?>">
    <link rel="stylesheet" href="<?php echo getCSSPath('dashforge.dashboard.css') ?>">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">


    <!-- Custom -->
    <script src="<?php echo getLibPath('jquery/jquery.min.js') ?>"></script>
    <script src="<?php echo getJSPath('logic/common.js') ?>"></script>


  </head>
  <body>
  <div class="page-loader-wrapper" style="display: none;">
      <div class="loader"></div>
    </div>
  <?php echo view('menu.php'); ?>
  
    <div class="content pd-0">
    <?php echo view('contentheader.php'); ?>
      <div class="content-body">
        <?php echo view($include); ?>
      </div>
    </div>
    
    
    <script src="<?php echo getJSPath('axios.min.js') ?>"></script>
    <script src="<?php echo getJSPath('select2.min.js') ?>" defer ></script>
    <script src="<?php echo getJSPath('dataTables.min.js') ?>"></script>
    <script src="<?php echo getJSPath('dataTables.js') ?>"></script>
    <script src="<?php echo getJSPath('dataTables.fixedColumns.js') ?>"></script>
    <script src="<?php echo getJSPath('dataTables.select.js') ?>"></script>

    <script src="<?php echo getJSPath('dataTables.buttons.js') ?>"></script>
    <script src="<?php echo getJSPath('jszip.min.js') ?>"></script>
    <script src="<?php echo getJSPath('pdfmake.min.js') ?>"></script>
    <script src="<?php echo getJSPath('vfs_fonts.js') ?>"></script>
    <script src="<?php echo getJSPath('buttons.html5.min.js') ?>"></script>
    <script src="<?php echo getJSPath('buttons.print.min.js') ?>"></script>

    <script src="<?php echo getJSPath('jquery-3.7.1.js') ?>"></script>
    <script src="<?php echo getJSPath('jquery-ui.js') ?>"></script>
    <script src="<?php echo getJSPath('jquery.toast.js') ?>" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script src="<?php echo getLibPath('bootstrap/js/bootstrap.bundle.min.js') ?>"></script>
    <script src="<?php echo getLibPath('feather-icons/feather.min.js') ?>"></script>
    <script src="<?php echo getLibPath('ionicons/ionicons/ionicons.esm.js') ?>" type="module"></script>
    <script src="<?php echo getLibPath('perfect-scrollbar/perfect-scrollbar.min.js') ?>"></script>
    <script src="<?php echo getLibPath('jquery.flot/jquery.flot.js') ?>"></script>
    <script src="<?php echo getLibPath('jquery.flot/jquery.flot.stack.js') ?>"></script>
    <script src="<?php echo getLibPath('jquery.flot/jquery.flot.resize.js') ?>"></script>
    <script src="<?php echo getLibPath('chart.js/Chart.bundle.min.js') ?>"></script>
    <script src="<?php echo getLibPath('jqvmap/jquery.vmap.min.js') ?>"></script>
    <script src="<?php echo getLibPath('jqvmap/maps/jquery.vmap.usa.js') ?>"></script>

    <script src="<?php echo getJSPath('dashforge.js') ?>"></script>
    <script src="<?php echo getJSPath('dashforge.aside.js') ?>"></script>
    <script src="<?php echo getJSPath('dashforge.sampledata.js') ?>"></script>
    <script src="<?php echo getJSPath('dashboard-one.js') ?>"></script>
    
    <!-- append theme customizer -->
    <script src="<?php echo getLibPath('js-cookie/js.cookie.js') ?>"></script>
    <script src="<?php echo getJSPath('dashforge.settings.js') ?>"></script>
    <script>
       $(function(){
        'use script'

        window.darkMode = function(){
          $('.btn-white').addClass('btn-dark').removeClass('btn-white');
        }

        window.lightMode = function() {
          $('.btn-dark').addClass('btn-white').removeClass('btn-dark');
        }

        var hasMode = Cookies.get('df-mode');
        if(hasMode === 'dark') {
          darkMode();
        } else {
          lightMode();
        }
      })
    </script>
</div>


  </body>

</html>

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
    <link rel="shortcut icon" type="image/x-icon" href="../../assets/img/favicon.png">

    <title>DashForge Responsive Bootstrap 5 Dashboard Template</title>

    <!-- vendor css -->
    <link href="<?php echo base_url('../../lib/@fortawesome/fontawesome-free/css/all.min.css')?>" rel="stylesheet">
    <link href="<?php echo base_url('../../lib/ionicons/css/ionicons.min.css')?>" rel="stylesheet">
    <link href="<?php echo base_url('../../lib/remixicon/fonts/remixicon.css')?>" rel="stylesheet">

    <!-- DashForge CSS -->
    <link rel="stylesheet" href="<?php echo base_url('../../assets/css/dashforge.css')?>">
    <link rel="stylesheet" href="<?php echo base_url('../../assets/css/dashforge.auth.css')?>">
  </head>
  <body>


    <div class="content content-fixed content-auth">
      <div class="container">
        <div class="media align-items-stretch justify-content-center  pos-relative">
          <div class="media-body align-items-center d-none d-lg-flex">
            <div class="mx-wd-600">
              <img src="<?php echo base_url('../../assets/img/signin.png')?>" class="img-fluid" alt="">
            </div>
            <div class="pos-absolute b-0 l-0 tx-12 tx-center">
              Workspace design vector is created by <a href="https://www.freepik.com/pikisuperstar" target="_blank">pikisuperstar (freepik.com)</a>
            </div>
          </div><!-- media-body -->
          <div class="sign-wrapper mg-lg-l-50 mg-xl-l-60">
            
            <form action="<?php echo base_url().'verifylogin' ?>"  method="post">

              <div class="wd-100p">
                <h3 class="tx-color-01 mg-b-5">Forgot passoword</h3>
                <p class="tx-color-03 tx-16 mg-b-40">Enter your email address for reset of password</p>
                <?php if (session()->has('error')): ?>
                  <div class="alert alert-danger">
                      <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                      <strong>Sorry!</strong> <?php echo session('error'); ?>                            
                  </div>
                <?php endif; ?>
                <div class="form-group">
                  <label>Email address</label>
                  <input name="username"  type="text"  class="form-control" placeholder="yourname@yourmail.com">
                </div>
                <button class="btn btn-brand-02 w-100">Sand</button>
                

                <div class="tx-13 mg-t-20 tx-center">Remamber?<a href="<?php echo base_url().'login'?>">Login</a></div>
              </div>
            </form>
          </div><!-- sign-wrapper -->
        </div><!-- media -->
      </div><!-- container -->
    </div><!-- content -->

    <footer class="footer">
      <div>
        <span>&copy; 2023 DashForge v1.0.0. </span>
        <span>Created by <a href="http://themepixels.me">ThemePixels</a></span>
      </div>
      <div>
        <!-- <nav class="nav">
          <a href="https://themeforest.net/licenses/standard" class="nav-link">Licenses</a>
          <a href="../../change-log.html" class="nav-link">Change Log</a>
          <a href="https://discordapp.com/invite/RYqkVuw" class="nav-link">Get Help</a>
        </nav> -->
      </div>
    </footer>

    <script src="<?php echo base_url('../../lib/jquery/jquery.min.js')?>"></script>
    <script src="<?php echo base_url('../../lib/bootstrap/js/bootstrap.bundle.min.js')?>"></script>
    <script src="<?php echo base_url('../../lib/feather-icons/feather.min.js')?>"></script>
    <script src="<?php echo base_url('../../lib/perfect-scrollbar/perfect-scrollbar.min.js')?>"></script>

    <script src="<?php echo base_url('../../assets/js/dashforge.js')?>"></script>

    <!-- append theme customizer -->
    <script src="<?php echo base_url('../../lib/js-cookie/js.cookie.js')?>"></script>
    <script src="<?php echo base_url('../../assets/js/dashforge.settings.js')?>"></script>
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
  </body>
</html>

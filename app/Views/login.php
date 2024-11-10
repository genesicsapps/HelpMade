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
    <link rel="shortcut icon" type="image/x-icon" href="../../assets/img/favicon.png">

    <title><?php echo $title ?></title>

    <!-- vendor css -->
    <link href="<?php echo base_url('../../lib/@fortawesome/fontawesome-free/css/all.min.css')?>" rel="stylesheet">
    <link href="<?php echo base_url('../../lib/ionicons/css/ionicons.min.css')?>" rel="stylesheet">
    <link href="<?php echo base_url('../../lib/remixicon/fonts/remixicon.css')?>" rel="stylesheet">

    <!-- DashForge CSS -->
    <link rel="stylesheet" href="<?php echo base_url('../../assets/css/dashforge.css')?>">
    <link rel="stylesheet" href="<?php echo base_url('../../assets/css/dashforge.auth.css')?>">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-toast-plugin/1.3.2/jquery.toast.css" integrity="sha512-8D+M+7Y6jVsEa7RD6Kv/Z7EImSpNpQllgaEIQAtqHcI0H6F4iZknRj0Nx1DCdB+TwBaS+702BGWYC0Ze2hpExQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />

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
                <h3 class="tx-color-01 mg-b-5">Sign In</h3>
                <p class="tx-color-03 tx-16 mg-b-40">Welcome back! Please signin to continue.</p>
                <?php if (session()->has('error')): ?>
                  <div class="alert alert-danger">
                      <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                      <strong>Sorry!</strong> <?php echo session('error'); ?>                            
                  </div>
                <?php endif; ?>
                <div class="form-group">
                  <label>Email address</label>
                  <input id="userEmail" name="username"  type="text"  class="form-control" placeholder="yourname@yourmail.com">
                </div>
                <div class="form-group">
                  <div class="d-flex justify-content-between mg-b-5">
                    <label class="mg-b-0-f">Password</label>
                    <a href="<?php echo base_url().'forgotpassword' ?>" class="tx-13">Forgot password?</a>
                  </div>
                  <input id="userPassword" name="pwd" type="password" class="form-control" placeholder="Enter your password">
                </div>
                <button class="btn btn-brand-02 w-100">Sign In</button>
                
                <div class="tx-13 mg-t-20 tx-center">Don't have an account? <a href="<?php echo base_url().'signup'?>">Create an Account</a></div>
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
    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-toast-plugin/1.3.2/jquery.toast.js" integrity="sha512-Y+cHVeYzi7pamIOGBwYHrynWWTKImI9G78i53+azDb1uPmU1Dz9/r2BLxGXWgOC7FhwAGsy3/9YpNYaoBy7Kzg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>


    <script src="<?php echo base_url('../../lib/jquery/jquery.min.js')?>"></script>
    <script src="<?php echo base_url('../../lib/bootstrap/js/bootstrap.bundle.min.js')?>"></script>
    <script src="<?php echo base_url('../../lib/feather-icons/feather.min.js')?>"></script>
    <script src="<?php echo base_url('../../lib/perfect-scrollbar/perfect-scrollbar.min.js')?>"></script>

    <script src="<?php echo base_url('../../assets/js/dashforge.js')?>"></script>

    <!-- append theme customizer -->
    <script src="<?php echo base_url('../../lib/js-cookie/js.cookie.js')?>"></script>
    <script src="<?php echo base_url('../assets/js/dashforge.settings.js')?>"></script>
    <script src="<?php echo getJSPath('logic/common.js') ?>"></script>

    <!-- <script src="<?php echo getJSPath('logic/login.js') ?>"></script> -->

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

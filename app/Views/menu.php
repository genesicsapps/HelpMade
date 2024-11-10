    <aside id="main_nav" class="aside aside-fixed">
      <div class="aside-header">
        <a href="<?php echo base_url(); ?>" class="aside-logo">dash<span>forge</span></a>
        <a href="" class="aside-menu-link">
          <i data-feather="menu"></i>
          <i data-feather="x"></i>
        </a>
      </div>
      <div class="aside-body">
        <div class="aside-loggedin">
          <div class="d-flex align-items-center justify-content-start">
            <a href="" class="avatar"><img src="https://placehold.co/387" class="rounded-circle" alt=""></a>
            <div class="aside-alert-link">
              <a href="<?php echo base_url().'profile' ?>" class="" data-bs-toggle="tooltip" title="View Profile"><i data-feather="user"></i></a>
              <a href="" class="new" data-bs-toggle="tooltip" title="You have 2 unread messages"><i data-feather="message-square"></i></a>
              <a href="" class="new" data-bs-toggle="tooltip" title="You have 4 new notifications"><i data-feather="bell"></i></a>
              <a href="<?php echo base_url().'logout' ?>" data-bs-toggle="tooltip" title="Sign out"><i data-feather="log-out"></i></a>
            </div>
          </div>
          <div class="aside-loggedin-user">
            <a href="#loggedinMenu" class="d-flex align-items-center justify-content-between mg-b-2" data-bs-toggle="collapse">
              <h6 class="tx-semibold mg-b-0">Katherine Pechon</h6>
            </a>
            <p class="tx-color-03 tx-12 mg-b-0">Administrator</p>
          </div>
        </div><!-- aside-loggedin -->
        <ul id="menu_list" class="nav nav-aside" >

        </ul>
      </div>
    </aside>
    <aside id="setup_nav" class="aside aside-fixed d-none">
      <div class="aside-body">
        <div class="aside-loggedin">
          <div class="d-flex align-items-center justify-content-start">
            <div class="aside-alert-link">
             
              <a data-bs-toggle="tooltip" title="Sign out" onclick="toggleNav()"><i data-feather="log-out"></i></a>
            </div>
          </div>
         
        </div><!-- aside-loggedin -->
        <ul id="menu_list2" class="nav nav-aside" >
        <li id="menu_h_3" class="nav-item">
          <a href="./staff" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
             <span>Staff</span>
          </a>
        </li>
        </ul>
      </div>
    </aside>
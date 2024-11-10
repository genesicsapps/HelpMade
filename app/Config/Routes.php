<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
// $routes->get('/', 'Home::index');

$routes->get('/', 'Pages::index',['filter' => 'isLogin']);
$routes->get('/profile', 'Pages::profile',['filter' => 'isLogin']);
$routes->get('/product', 'Pages::product',['filter' => 'isLogin']);
$routes->get('/brand', 'Pages::brand',['filter' => 'isLogin']);
$routes->get('/category', 'Pages::category',['filter' => 'isLogin']);
$routes->get('/department', 'Pages::department',['filter' => 'isLogin']);
$routes->get('/company', 'Pages::company',['filter' => 'isLogin']);
$routes->get('/myproduct', 'Pages::myproduct',['filter' => 'isLogin']);
$routes->get('/lookups', 'Pages::lookups',['filter' => 'isLogin']);
$routes->get('/test', 'Pages::test',['filter' => 'isLogin']);
$routes->get('/customers', 'Pages::customers',['filter' => 'isLogin']);
$routes->get('/projects', 'Pages::projects',['filter' => 'isLogin']);
$routes->get('/leads', 'Pages::leads',['filter' => 'isLogin']);
$routes->get('/tasks', 'Pages::tasks',['filter' => 'isLogin']);
$routes->get('/supports', 'Pages::supports',['filter' => 'isLogin']);
$routes->get('/sales', 'Pages::sales',['filter' => 'isLogin']);
$routes->get('/expenses', 'Pages::expenses',['filter' => 'isLogin']);
$routes->get('/expensesvsincome', 'Pages::expensesvsincome',['filter' => 'isLogin']);
$routes->get('/timesheets', 'Pages::timesheets',['filter' => 'isLogin']);
$routes->get('/kbarticles', 'Pages::kbarticles',['filter' => 'isLogin']);
$routes->get('/media', 'Pages::media',['filter' => 'isLogin']);
$routes->get('/bulkpdfexport', 'Pages::bulkpdfexport',['filter' => 'isLogin']);
$routes->get('/csvexport', 'Pages::csvexport',['filter' => 'isLogin']);
$routes->get('/calender', 'Pages::calender',['filter' => 'isLogin']);
$routes->get('/announcements', 'Pages::announcements',['filter' => 'isLogin']);
$routes->get('/goals', 'Pages::goals',['filter' => 'isLogin']);
$routes->get('/activitylog', 'Pages::activitylog',['filter' => 'isLogin']);
$routes->get('/surveys', 'Pages::surveys',['filter' => 'isLogin']);
$routes->get('/databasebackup', 'Pages::databasebackup',['filter' => 'isLogin']);
$routes->get('/ticketpipelog', 'Pages::ticketpipelog',['filter' => 'isLogin']);
$routes->get('/proposals', 'Pages::proposals',['filter' => 'isLogin']);
$routes->get('/estimates', 'Pages::estimates',['filter' => 'isLogin']);
$routes->get('/invoices', 'Pages::invoices',['filter' => 'isLogin']);
$routes->get('/payments', 'Pages::payments',['filter' => 'isLogin']);
$routes->get('/creditnotes', 'Pages::creditnotes',['filter' => 'isLogin']);
$routes->get('/items', 'Pages::items',['filter' => 'isLogin']);
$routes->get('/users', 'Pages::users',['filter' => 'isLogin']);


$routes->get('/modelacessories', 'Pages::modelacessories',['filter' => 'isLogin']);
$routes->get('/modelspareparts', 'Pages::modelspareparts',['filter' => 'isLogin']);
$routes->get('/login', 'Pages::login');
$routes->get('/signup', 'Pages::signup');
$routes->get('/forgotpassword', 'Pages::forgotpassword');
$routes->get('/logout', 'Pages::logout');

$routes->post('/verifylogin', 'Pages::verifylogin');

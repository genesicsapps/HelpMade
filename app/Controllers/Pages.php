<?php

namespace App\Controllers;
use GuzzleHttp\Client;

class Pages extends BaseController
{
    public function index()
    {
        // if (isset($_SESSION['FULLNAME'])) {
        //     echo "Session variable 'USERID' set successfully!".$_SESSION['FULLNAME'];
        // } else {
        //     echo "Failed to set session variable 'USERID'.";
        // }
        // exit;
        $data['title'] 		= COMPANYNAME.'- Dashboard';
        $data['keywords'] 	= '';
        $data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Dashboard';
        $data['include']	= 'dashboard';	// page name
        return view('template',$data);
    }

    public function login()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Login';
		$data['include']	= 'login';	// page name

        return view('login',$data);
    }

    public function signup()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Login';
		$data['include']	= 'signup';	// page name
        return view('signup',$data);
    }

    public function forgotpassword()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'forgotpassword';
		$data['include']	= 'forgotpassword';	// page name
        return view('forgotpassword',$data);
    }

    public function verifylogin()
    {
        $username = $this->request->getPost('username');
        $password = $this->request->getPost('pwd');
        // Validate input (you may use form validation here)
        $client = new Client();
        $response = $client->request('POST', 'http://localhost:8085/api/auth/login',[
            'json' => [
                'EmailAddress'=>$username,
                'Password'=>$password
            ]
        ]);
        $body = $response->getBody();
        $data = json_decode($body, true);
        // Check credentials against database
        // if ($this->authenticate($username, $password)) {
        if($data['result'] == 'You have been logged in.') {
            // Set session data
            $this->setUserSession($data['AuthToken']);

            return redirect()->to('/'); // Redirect to dashboard or any other page
        } else {
            return redirect()->to('/login')->with('error', 'Invalid username or password'); // Redirect back to login with error message
        }
    }

    private function setUserSession($AuthToken)
    {
        $userdata = json_decode(base64_decode(explode('.',$AuthToken)[0]),true);
        setcookie("AuthToken",$AuthToken, time()+3600, "/");
        $session = session();
        $session->set('UserData', $userdata);
        foreach ($userdata as $key => $value) {
            $_SESSION[$key] = $value;
            setcookie($key,$value, time()+3600, "/");
        }
        $session->set('isLoggedIn', true);
    }

    public function profile()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'User Profile';
		$data['include']	= 'profile';	// page name
        return view('template',$data);
    }

    public function logout()
    {
        $session = session();
        // Remove session data
        $session->remove('username');
        $session->remove('isLoggedIn');

        // Destroy the session
        $session->destroy();

        helper('cookie');
        foreach ($_COOKIE as $cookie_name => $cookie_value) {
            delete_cookie($cookie_name,'/dc','localhost');
        }

        // Redirect to login page or any other page
        return redirect()->to('/login');
    }

    public function product()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Product';
		$data['include']	= 'product';	// page name
        return view('template',$data);
    }

    public function brand()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Brand';
		$data['include']	= 'brand';	// page name
        return view('template',$data);
    }
    
    public function department()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Department';
		$data['include']	= 'department';	// page name
        return view('template',$data);
    }

    public function category()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Category';
		$data['include']	= 'category';	// page name
        return view('template',$data);
    }

    public function company()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Campany';
		$data['include']	= 'company';	// page name
        return view('template',$data);
    }
    
    public function myproduct()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'My product';
		$data['include']	= 'myproduct';	// page name
        return view('template',$data);
    }

    public function test()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'test';
		$data['include']	= 'test';	// page name
        return view('template',$data);
    }

    public function lookups()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Lookups';
		$data['include']	= 'lookups';	// page name
        return view('template',$data);
    }

    public function modelacessories()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Model acessories';
		$data['include']	= 'model_acessories';	// page name
        return view('template',$data);
    }
    
    public function modelspareparts()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Model spareparts';
		$data['include']	= 'model_spareparts';	// page name
        return view('template',$data);
    }

    public function customers()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Customers';
		$data['include']	= 'customers';	// page name
        return view('template',$data);
    }

    public function Projects()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Projects';
		$data['include']	= 'Projects';	// page name
        return view('template',$data);
    }

    public function Leads()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Leads';
		$data['include']	= 'Leads';	// page name
        return view('template',$data);
    }

    public function Tasks()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Tasks';
		$data['include']	= 'Tasks';	// page name
        return view('template',$data);
    }

    public function Supports()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Supports';
		$data['include']	= 'Supports';	// page name
        return view('template',$data);
    }

    public function Sales()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Sales';
		$data['include']	= 'Sales';	// page name
        return view('template',$data);
    }

    public function Expenses()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Expenses';
		$data['include']	= 'Expenses';	// page name
        return view('template',$data);
    }

    public function ExpensesVsIncome()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Expenses vs Income';
		$data['include']	= 'ExpensesvsIncome';	// page name
        return view('template',$data);
    }

    public function TimeSheets()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Time Sheets Overview';
		$data['include']	= 'TimeSheets';	// page name
        return view('template',$data);
    }

    public function KBArticles()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'KB Articles';
		$data['include']	= 'KBArticles';	// page name
        return view('template',$data);
    }

    public function Media()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Media';
		$data['include']	= 'Media';	// page name
        return view('template',$data);
    }

    public function BulkPDFExport()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Bulk PDF Export';
		$data['include']	= 'BulkPDFExport';	// page name
        return view('template',$data);
    }

    public function CSVExport()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'CSV Export';
		$data['include']	= 'CSVExport';	// page name
        return view('template',$data);
    }

    public function Calender()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Calender';
		$data['include']	= 'Calender';	// page name
        return view('template',$data);
    }

    public function Announcements()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Announcements';
		$data['include']	= 'Announcements';	// page name
        return view('template',$data);
    }

    public function Goals()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Goals';
		$data['include']	= 'Goals';	// page name
        return view('template',$data);
    }

    public function ActivityLog()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'ActivityLog';
		$data['include']	= 'ActivityLog';	// page name
        return view('template',$data);
    }

    public function Surveys()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Surveys';
		$data['include']	= 'Surveys';	// page name
        return view('template',$data);
    }
    
    public function DatabaseBackup()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Database Backup';
		$data['include']	= 'DatabaseBackup';	// page name
        return view('template',$data);
    }
        
    public function TicketPipeLog()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Ticket Pipe Log';
		$data['include']	= 'TicketPipeLog';	// page name
        return view('template',$data);
    }
            
    public function Proposals()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Proposals';
		$data['include']	= 'Proposals';	// page name
        return view('template',$data);
    }
                
    public function Estimates()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Estimates';
		$data['include']	= 'Estimates';	// page name
        return view('template',$data);
    }
                    
    public function Invoices()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Invoices';
		$data['include']	= 'Invoices';	// page name
        return view('template',$data);
    }

    public function Payments()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Payments';
		$data['include']	= 'Payments';	// page name
        return view('template',$data);
    }

    
    public function CreditNotes()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Credit Notes';
		$data['include']	= 'CreditNotes';	// page name
        return view('template',$data);
    }

    public function Items()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Items';
		$data['include']	= 'Items';	// page name
        return view('template',$data);
    }
    
    public function Users()
    {
		$data['title'] 		= COMPANYNAME.'- Dashboard';
		$data['keywords'] 	= '';
		$data['description']= '';
        $data['author']= '';
        $data['PageName']   = 'Users';
		$data['include']	= 'Users';	// page name
        return view('template',$data);
    }
}

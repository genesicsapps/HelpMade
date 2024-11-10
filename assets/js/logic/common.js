let baseurl = 'http://localhost';
let brandLookupURL = baseurl+'/ep_dc/api/brand/lookup';	
let productLookupURL = baseurl+'/ep_dc/api/product/lookup/';
let productTypeLookupURL = baseurl+'/ep_dc/api/brandproducttype/lookup/';
let seriesLookupURL = baseurl+'/ep_dc/api/brandseries/lookup/';
let modelLookupURL = baseurl+'/ep_dc/api/brandseriesmodels/lookup/';
var userData = '';

$(document).ready(()=>{
  $('.select2').select2();
  $('.select2').css('width', '100%');

   userData = JSON.parse(atob(getCookie('AuthToken').split('.')[0]));
   loadMenu();
   // Get the pathname from the URL
const pathname = window.location.pathname;

// Extract the file name from the pathname
const pageName = pathname.substring(pathname.lastIndexOf('/') + 1);

console.log(pageName);

setTimeout(() => {
  $(`#nav_${pageName}`).addClass('active');
  $(`#nav_${pageName}`).parent().parent().addClass('active show');
  
}, 1000);
})

function associateDOMEvent(eventName, componentArrayInfo)
{
  for(var i= 0; i <= componentArrayInfo.length-1 ; i++)
    $(document).on(eventName, componentArrayInfo[i][0], componentArrayInfo[i][1]);
}

function getLookup(componentname,  lookupUrl, searchLength, onGetData, onCreateDDList, onSelectItem, blankobj = {},onCreateNew)
{
  // $(componentname).addClass('ui-autocomplete-loading');

  $(componentname).autocomplete({
    minLength: searchLength,
    source: function(request, response) {   
      {
        $.ajax({
          type: "get",
          url: lookupUrl,
          success: function(msg) {
            if(msg.length == 0){
              if( Object.keys(blankobj).length > 0)
                msg.push(blankobj);
            }
            onGetData();
            response($.map(msg, function(item) {
              return onCreateDDList(item);
            }));
            // $(componentname).removeClass('ui-autocomplete-loading');

          }
        })
      }
    },
    select: function(event, ui) {
      if(ui.item.createnew)
        onCreateNew();
      else
        onSelectItem(ui);
    }
  })

  // $(`${id}`).off('click');

  // $(componentname).on('click', function() {
  //   $(componentname).autocomplete("search", $(componentname).val()); // Trigger search with current input value
  // });
}

function onSelect2GetData(data,key,moreData){
  return $.map(data, function(item) {
    let obj = {
      id: item.uid, // Ensure this is a unique identifier
        text: item[key]
    };
    if(moreData){
      obj[moreData[0]] = item[moreData[0]];
    }
      return obj
    })
}

function setSelect2AutoComplete(component,lookupurl,getDataKey,postDataKey,componentUrl,onSelect,moreData,onSaveSuccess,payload){
   $(component).off('select2:select');
  $(component).select2({
      placeholder: 'Select an option',
      ajax: {
        url: lookupurl, // Replace with your API URL
        dataType: 'json',
        delay: 250,
        data: function(params) {
          return {
            q: params.term, // Search term
            page: params.page || 1 // Page number for pagination
          };
        },
        processResults: function(data, params) {
          params.page = params.page || 1;
          var results = onSelect2GetData(data,getDataKey,moreData);
  
          // Add a "Create new" option if no results are found
          if (data.length === 0) {
            results.push({
              id: 'create-new',
              text: `Create : ${params.term?params.term:''}`
            });
          }
  
          return {
            results: results,
            pagination: {
              more: (params.page * 30) < data.total_count // Adjust based on your API response
            }
          };
        },
        cache: true,
        error: function(res){
          if(res.message == 'Unauthorised access: Auth token is missing. Please re-login.')
              location.href = './login'
        }
        
      },
      escapeMarkup: function(markup) { return markup; }, // Let Select2 handle markup
      templateResult: function(item) {
        if (item.id === 'create-new') {
          return $('<span>' + item.text + '</span>');
        }
        if(item.text != '')
        return $('<span>' + item.text + '</span>');
      },
      templateSelection: function(item) {
        if (item.id === 'create-new') {
          return item.text;
        }
        return item.text;
      }
    });
    $(component).on('select2:select',(e)=> {select2AutoCompleteOnSelect(e,component,componentUrl,postDataKey,onSelect,onSaveSuccess,payload)});
}

function select2AutoCompleteOnSelect(e,component,uri,key,onSelect,onSaveSuccess,payload) {
  var data = e.params.data;
      const newText = data.text.replace('Create : ','');
      console.log(newText)
      if(onSelect)
        onSelect(e.params.data)
      if (data.id === 'create-new') {
        let obj = { [key]: newText }
        if(payload)
          obj = {...obj,...payload};
        $.ajax({
          type: 'POST',
          url: uri, 
          data: JSON.stringify(obj), 
          contentType: 'application/json',
          success: function(response) {
            $(component).append(new Option(newText, response.UID, false, true)).trigger('change');
            $(component).val(response.UID).trigger('change');
            onSaveSuccess(response);
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.error('Failed to add new item:', textStatus, errorThrown);
          }
        });
      }
}

function RestCall(method, url, bdata = '', onSuccess, onError = false) {
  axios({
    method: method,
    url: `${baseurl}/ep_dc/api${url}`,
    data: bdata
  })
    .then(function (response) {
      onSuccess(response.data);
    })
    .catch(function (error) {
      if (onError == false) {
        if(error.response){
          showGenericError(error.response.data.message)
        }
        else
          showGenericError(error.message);

        if(error.response.data.message == 'Unauthorised access: Auth token is missing. Please re-login.')
          location.href = './login'

        console.log(error)
      }
      else
        onError;

    })
    .finally(function () {
      hideLoader()
    });
}

function showGenericError(msg) {
  showToast(msg, 'danger');
}

function setDataTableNew(data, tableName, NotVisibleColumnsName, onclick, buttonlist = ['excel']) {
  let tbl = new DataTable(tableName, {
    data: data,
    columns: apiDataToDataTableColums(data, onclick),
    // scrollX: true,
    scrollY: 440,
    destroy:true,
    order: [[0,'desc']],
    columnDefs: [
      {
        orderable: false,
        render: DataTable.render.select(),
        targets: 0
      },
      {
        bVisible: false,
        aTargets: getTableFieldIndex(data, NotVisibleColumnsName),
      }
    ],
    layout: {
      topStart: {
        buttons: buttonlist
      }
    },
    initComplete: function () {
      var btns = $('.dt-button');
      className: 'btn btn-primary btn-xs',
      btns.removeClass('dt-button');
    },
    pageLength: 20,
    select: {
      style: 'single'
    },
    fixedColumns: {
      start: 2
    },
    order: [[1, 'asc']],
    scrollCollapse: true,
    createdRow: function( row, data, dataIndex ) {
      if ( data['IsVerified'] == "0" ) {
        $(row).addClass( 'isVerified' );
      }
    }
  });

  $('.dt-scroll-headInner').css('width','100%');
  $('.dataTable').css('width','100%');

  $(".buttons-html5").addClass("btn btn-info btn-xs");

  return tbl;
}

function apiDataToDataTableColums(data, onclick) {
  if(data.length == 0)
    return;
  let array = [];
  let keys = Object.keys(data[0])
  array.push({
    data: '',
    title: ''
  });
  let uid = data[0].UID ? 'UID' : 'uid';
  $.each(keys, (i, e) => {
    if (e == 'uid' || e == 'UID') {
      array.push({
        data: uid, render: function (data) {
          return `<a href="#" onclick="${onclick}(${data})"> ${data} </a>`
        },
        title: 'UID'
      })
    }
    else {
      array.push({
        data: e,
        title: e.toUpperCase()
      })
    }
  })
  return array;
}

function getTableFieldIndex(data, fields) {
  if(data.length == 0)
    return;
  
  let keys = Object.keys(data[0])
  let index = [];
  $.each(keys, (i, e) => {
    $.each(fields, (ind, f) => {
      if (e == f) {
        index.push(i + 1);
      }
    })
  });
  return index;
}

function showLoader() {
  $('.page-loader-wrapper').css('display', 'block');
}

function hideLoader() {
  $('.page-loader-wrapper').css('display', 'none');
}

function resetDiv(divSelector) {
  const div = $(divSelector);

  // Clear text inputs, textareas
  div.find('input[type="text"], input[type="password"], input[type="email"], input[type="number"], textarea').val('');

  // Reset select elements to their default value
  div.find('select').each(function () {
    this.selectedIndex = 0;
  });

  // Uncheck checkboxes and radio buttons
  div.find('input[type="checkbox"], input[type="radio"]').prop('checked', false);

  // Optionally, reset other input types (like date, range, etc.)
  div.find('input[type="date"], input[type="range"]').val('');

  // If needed, reset file inputs
  div.find('input[type="file"]').val(null);
}

function switchTabs(activeClass, inactiveClass) {
  $(`#${activeClass}_body`).addClass('active show')
  $(`#${activeClass}`).addClass('active')

  $(`#${inactiveClass}_body`).removeClass('active show')
  $(`#${inactiveClass}`).removeClass('active')
}

function showToast(msg, type) {
  $.toast({
    text: msg,
    position: "top-right",
    stack: false,
    icon: type,
  });
}

function keysToLowerCase(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(keysToLowerCase);
  }

  return Object.keys(obj).reduce((result, key) => {
    const newKey = key.toLowerCase();
    result[newKey] = keysToLowerCase(obj[key]);
    return result;
  }, {});
}

function moveKeyToFirst(obj, key) {
  // Create a new empty object
  const newObj = {};
  
  // Check if the key exists in the original object
  if (obj.hasOwnProperty(key)) {
    // Add the desired key-value pair to the new object
    newObj[key] = obj[key];
  }

  // Add the remaining key-value pairs to the new object
  for (const k in obj) {
    if (k !== key) {
      newObj[k] = obj[k];
    }
  }

  return newObj;
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function dropDown(id,list,onNewSelect,onExitingSelect){
  if ($(`${id}`).hasClass('ui-autocomplete-input')) {
    $(`${id}`).autocomplete("destroy");
 }
  $(`${id}`).autocomplete({
    source: function(request, response) {
        var results = $.ui.autocomplete.filter(list, request.term);

        // Append a custom "Create new" option if no match is found
        if (!results.length) {
            results.push({
                label: 'Create new: ' + request.term,
                value: request.term,
                createNew: true
            });
        }

        response(results);
    },
    select: function(event, ui) {
        if (ui.item.createNew) {
            // Run your specific function here
            onNewSelect(ui.item.value);
            setTimeout(() => {
              $('.focus').focus()
            }, 500);
            $('.focus').keydown(function(event) {
              if (event.key === 'Enter') {
                  $('.btn-primary').focus();
              }
          });
        } else {
            // Handle the selection of an existing option
            if(onExitingSelect)
             onExitingSelect()
        }
    },
    minLength: 0 // Show all results when the input is focused or clicked
})
// .on('focus', function () {
//     // Trigger search when input is focused
//     $(this).autocomplete('search', '');
// });
$(`${id}`).off('blur');

  $(`${id}`).on('blur', function () {
    let valueFound = false;;
    $.each(list,(i,e)=>{
      if($(`${id}`).val() == e){
        valueFound = true;
      }
    })

    if(!valueFound)
      $(`${id}`).val('');
  });
}

function validateForm(data) {
  let isValid = true;
  $.each(data,(i,e)=>{
    if($(`#${e}`).val() == ''){
      $(`#${e}`).next().removeClass('d-none');
      $(`#${e}`).addClass('parsley-error');
      isValid = false;
    }
    else{
      $(`#${e}`).next().addClass('d-none');
      $(`#${e}`).removeClass('parsley-error');
    }
  })
  return isValid;
}

function loadMenu(){
  RestCall('GET','/menu/list/'+userData.USERGROUP,'',onLoadMeneSuccess)
}

let array = [2.1,1,1.1,2,2,3,1.3]
let shotArray = []

 
function onLoadMeneSuccess(res){
  
  res = sortByRank(res)

  console.log(res)
  let MenuHeader = [];
  $.each(res,(i,e)=>{
    if(MenuHeader.indexOf(e.menugroup) == -1){
      MenuHeader.push(e.menugroup)
    }
  })
  console.log(MenuHeader)
  let menuHtml = '';

  $.each(MenuHeader,(i,el)=>{
    let subMenu = '';
    if(el == 'Single'){
      $.each(res,(i,e)=>{
        if(e.menugroup == el){
          menuHtml += `<li id="menu_h_${i}"  class="nav-item">
          <a href="./${e.menulink}" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
             <span>${e.menuname}</span>
          </a>
        </li>`;
        }
      })

    }
    else{
      $.each(res,(i,e)=>{
        if(e.menugroup == el){
          subMenu += `<li id="nav_${e.menulink}" ><a href="./${e.menulink}">${e.menuname}</a></li>`
        }
      });
      menuHtml += `<li id="menu_${i}" onclick="openMenu(${i})" class="nav-item with-sub">
                    <a href="#" class="nav-link">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                       <span>${el}</span>
                    </a>
                    <ul>
                      ${subMenu}
                    </ul>
                  </li>`;
    }



  });

  $.each(res,(i,e)=>{

  })

  $('#menu_list').append(menuHtml);
}

function openMenu(id){
  if($(`#menu_${id}`).hasClass('show')){
    $(`#menu_${id}`).removeClass('show')
  }
  else{
    $('.nav-item').removeClass('show');
    $(`#menu_${id}`).addClass('show')
  }
}

function sortByRank(menuItems) {
  return menuItems.sort((a, b) => {
    // If both items have no rank, leave their order unchanged
    if (a.rank === null && b.rank === null) {
      return 0;
    }
    
    // If one item has a rank and the other doesn't, place the one with the rank first
    if (a.rank === null) {
      return 1;
    }
    if (b.rank === null) {
      return -1;
    }
    
    // Otherwise, sort by the rank value in ascending order
    return a.rank - b.rank;
  });
}

function toggleNav(){
    if($('#setup_nav').hasClass('d-none')){
      $('#setup_nav').removeClass('d-none')
      $('#main_nav').addClass('d-none')
    }
    else{
      $('#setup_nav').addClass('d-none')
      $('#main_nav').removeClass('d-none')
    }
}


function loadList(url,onLoadListSuccess,variable){
  showLoader();
  return new Promise((resolve,reject)=>{
      RestCall('GET',url,'', (res)=>{
        variable = [];
        if(res.List){
          $.each(res.List,(i,e)=>{
            if(e){
              let uid = e.UID?'UID':'uid'
              listData.push(moveKeyToFirst(e,uid))
            }
          })
        }
        else
          listData = res;
        if(onLoadListSuccess,variable)
          onLoadListSuccess();
        resolve(res)
      },);
  });
}


function onSave(url,elementToDataObject,validateObj,onSaveSuccess){
  let obj = {};    
  elementToDataObject(obj);
  if(validateForm(validateObj)){
      showLoader();
      if(parseInt(obj.UID) > 0){
          RestCall('PUT',url+'/'+obj.UID,obj, onSaveSuccess);
      }else{
          delete obj.UID;
          RestCall('POST',url,obj, onSaveSuccess);
      }    
  }
}

function onGetDetailByIDNew(detailCall,url,id,onGetDetailByIDSuccess,listData,dataObjToElement,tab1,tab2,customFunc){
  $('#btnNew').click();
  showLoader();
  resetDiv('#mailcontent');
  if(detailCall == true){
      RestCall('GET',`/${url}/${id}`,'',()=>{onGetDetailByIDSuccess();customFunc()});
  }     
  else{
      $.each(listData,(i,e)=>{
          if(id == e.UID){
              dataObjToElement(e);
          }    
      });
      if(customFunc)
        customFunc();    
      hideLoader();
  }    
  switchTabs(tab1,tab2);
}
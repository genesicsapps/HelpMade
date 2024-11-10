let ModuleName = 'Department';
let detailCall = false;
let listData = [];
let lstTable = '';
let departmentValidate = ['department_name'];
let listURL = '/department'
let lstTblBtnArr = [
    'excel',
    {
      text: 'New',
      className: 'btn btn-success btn-xs',
      action: function (e, dt, node, config) {
            onNewRecord()
        }
    },
    {
      text: 'Edit',
      className: 'btn btn-primary btn-xs',
      action: function (e, dt, node, config) {
          onEditRecord()
      }
    },
    {
      text: 'Delete',
      className: 'btn btn-danger btn-xs',
      action: function (e, dt, node, config) {
            onDeleteRecord()
        }
    }
];

$(document).ready(async function() {
    await loadList(listURL,onLoadListSuccess,listData);
    // loadList()
    $('#btnSave').click(function (){
        onSave(listURL,elementToDataObject,departmentValidate,onSaveSuccess)
    });
});

function onNewRecord(){
    resetDiv('#maincontent');
    preSetValue();
    $('#DepartmentModal').modal('show');
}

function preSetValue(){
    $("#department_name").val('');
    $('#is_active').prop('checked', true);
    $('#is_verified').prop('checked', false);
}

function loadList(){
    showLoader();
    RestCall('GET','/department','', onLoadListSuccess);
}

function onLoadListSuccess(r_data){
    var NotVisibleColumnsName = ["PID",'ModBy','CreatedBy','CreatedOn','LastUpdatedOn','IsActive','IsVerified','Remarks'];
    listData = [];
    $.each(r_data.List,(i,e)=>{
        if(e){
            let uid = e.UID?'UID':'uid'
            listData.push(moveKeyToFirst(e,uid))
        }
    })
    lstTable = setDataTableNew(listData,'#listTable',NotVisibleColumnsName,'onGetDetailByID',lstTblBtnArr);
}

function onGetDetailByID(id){
    onGetDetailByIDNew(false,listURL,id,onGetDetailByIDSuccess,listData,dataObjToElement)
    $('#DepartmentModal').modal('show');
}

function onGetDetailByIDSuccess(msg){
    let obj = keysToLowerCase(msg)
    dataObjToElement(obj);
}


function onSaveSuccess(msg){
    showToast(`${ModuleName} saved successfully`,'success');
    resetDiv('#maincontent');
    loadList(listURL,onLoadListSuccess,listData);
    $('#DepartmentModal').modal('hide');
}

function elementToDataObject(obj){
    obj.UID            = parseInt($("#uid").val());
    obj.DepartmentName = $("#department_name").val();
    obj.IsActive   = 0;
    if($("#is_active").prop('checked') == true){
        obj.IsActive   = 1;
    }
    obj.IsVerified = 0;
    if($("#is_verified").prop('checked') == true){
        obj.IsVerified = 1;
    }
    obj.Remarks    = $("#remarks").val();
}

function dataObjToElement(obj){
    $("#uid").val(obj.UID);
    $("#department_name").val(obj.DepartmentName);
    if(obj.IsActive)
        $('#is_active').prop('checked', true);
    else
        $('#is_active').prop('checked', false);

    if(obj.IsVerified)
        $('#is_verified').prop('checked', true);
    else
        $('#is_verified').prop('checked', false);

    $("#remarks").val(obj.Remarks);
}

function onEditRecord(){
    resetDiv('#maincontent');
    var selectedRows = lstTable.rows('.selected').data();
    if (selectedRows.length > 0) {
       showDepartmentModel(lstTable.rows('.selected').data()[0]);
    } else {
        alert('Select a row to edit');
    }    
}

function showDepartmentModel(data){
    $('#DepartmentModal').modal('show');
    onGetDetailByID(data.UID)
}

function onDeleteRecord(){
    var selectedRows = lstTable.rows('.selected').data();
    if (selectedRows.length > 0) {
        var confirmation = confirm("Are you sure you want to delete this record?");
        if (confirmation) {
            deleteRecord(lstTable.rows('.selected').data()[0].UID);
        }
    } else {
        alert('Select a row to delete');
    }    
}

function deleteRecord(id){
    RestCall('DELETE','/department/'+id,{}, onDeleteRecordSuccess);
}

function onDeleteRecordSuccess(){
    showToast(`${ModuleName} deleted successfully`,'success');
    loadList(listURL,onLoadListSuccess,listData);
}
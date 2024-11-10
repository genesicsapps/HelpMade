let ModuleName = 'Product';
let detailCall = false;
$(document).ready(function() {
    loadList();
    $('#btnNew').click(function () {
        resetDiv('#maincontent');
        preSetValue();
        $('#is_active').prop('checked', false);
        $('#is_verified').prop('checked', false);
    });

    $('#btnSave').click(function () {
        onSave()
    });

    $('#btnDelete').click(function () {
        // ask for confirmation
        resetDiv('#mailcontent');
        onDelete()
    });

});

let listData = [];

function preSetValue(){

}

function loadList(){
    showLoader();
    RestCall('GET','/company','', onLoadListSuccess);
}

function onLoadListSuccess(r_data){
    var NotVisibleColumnsName = ["PID",'ModBy','CreatedBy','CreatedDate','LastUpdatedOn'];
    listData = [];
    $.each(r_data.List,(i,e)=>{
        if(e){
            let uid = e.UID?'UID':'uid'
            listData.push(moveKeyToFirst(e,uid))
        }
    })
    setDataTableNew(listData,'#listTable',NotVisibleColumnsName,'onGetDetailByID');
}

function onGetDetailByID(id){
    showLoader();
    resetDiv('#mailcontent');
    if(detailCall == true){
        RestCall('GET','/company/'+id,'',onGetDetailByIDSuccess)
    } 
    else{
        $.each(listData,(i,e)=>{
            if(id == e.UID){
                dataObjToElement(e);
            }
        })
        hideLoader();
    }
    switchTabs('detail','list');
}

function onGetDetailByIDSuccess(msg){
    let obj = keysToLowerCase(msg)
    dataObjToElement(obj);
}

function onSave(){
    showLoader();
    let obj = {};    
    elementToDataObject(obj);

    if(parseInt(obj.UID) > 0){
        RestCall('PUT','/company/'+obj.UID,obj, onSaveSuccess);
    }else{
        delete obj.UID;
        RestCall('POST','/company',obj, onSaveSuccess);
    }    
}

function onSaveSuccess(msg){
    showToast(`${ModuleName} saved successfully`,'success');
    isEditing = false;
    switchTabs('list','detail');
    resetDiv('#mailcontent');
    loadList();
}

function elementToDataObject(obj){
    obj.UID            = parseInt($("#uid").val());
    obj.CompanyName = $("#company_name").val();
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
    $("#company_name").val(obj.CompanyName);
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

function onDelete(){
    $('#deleteModal').modal('show');
}

function deleteData(){
    let selectedId = $('#uid').val()
    RestCall('DELETE','/department/'+selectedId,{}, onDeleteSuccess);
}

function onDeleteSuccess(){
    showToast(`${ModuleName} deleted successfully`,'success');
    $('#deleteModal').modal('hide');
    switchTabs('list','detail');
    resetDiv('#mailcontent');
    loadList();
}
let ModuleName = 'Product';
let detailCall = false;
$(document).ready(function() {
    loadList();
    $('#btnNew').click(function () {
        resetDiv('#maincontent');
        preSetValue();
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
let departmentList = [];

function preSetValue(){

}

function loadList(){
    showLoader();
    RestCall('GET','/category','', onLoadListSuccess);
}

async function onLoadListSuccess(r_data){
    var NotVisibleColumnsName = ["PID",'ModBy','CreatedBy','CreatedDate','LastUpdatedOn'];
    listData = [];
    $.each(r_data.List,(i,e)=>{
        if(e){
            let uid = e.UID?'UID':'uid'
            listData.push(moveKeyToFirst(e,uid))
        }
    })
    setDataTableNew(listData,'#listTable',NotVisibleColumnsName,'onGetDetailByID');

    $('#parend_category').append(`<option value="0">Select</option>`);
    $.each(listData,(i,e)=>{
        $('#parend_category').append(`<option value="${e.UID}">${e.CategoryName}</option>`);
    })

    await getDepartmentsList();
    $('#department').append(`<option value="0">Select</option>`);
    $.each(departmentList,(i,e)=>{
        $('#department').append(`<option value="${e.UID}">${e.DepartmentName}</option>`);
    })
}

function onGetDetailByID(id){
    showLoader();
    resetDiv('#mailcontent');

    $('#department').val('0').trigger('change');
    $("#uid").val('');
    $("#cateory_name").val('');
    $("#type_name").val('');
    $("#parend_category").val('0').trigger("change");

    if(detailCall == true){
        RestCall('GET','/category/'+id,'',onGetDetailByIDSuccess)
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
        RestCall('PUT','/category/'+obj.UID,obj, onSaveSuccess);
    }else{
        delete obj.UID;
        RestCall('POST','/category',obj, onSaveSuccess);
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
    obj.CategoryName   = $("#cateory_name").val();
    obj.TypeName       = $("#type_name").val();
    obj.PID            = parseInt($("#parend_category").val());
    obj.DepartmentArr  = JSON.stringify($('#department').val()) 
}

function getDepartmentsList(){
    return new Promise((resolve, reject) =>{
        RestCall('GET','/department','', (res)=>{
            $.each(res.List,(i,e)=>{
                if(e)
                    departmentList.push(e);
            })
            resolve();
        });
    })
}

function dataObjToElement(obj){
    $("#uid").val(obj.UID);
    $("#cateory_name").val(obj.CategoryName);
    $("#type_name").val(obj.TypeName).trigger("change");
    $("#parend_category").val(obj.PID).trigger("change");
    $("#department").val(JSON.parse(obj.DepartmentArr)).trigger("change");
}

function onDelete(){
    $('#deleteModal').modal('show');
}

function deleteData(){
    let selectedId = $('#uid').val()
    RestCall('DELETE','/category/'+selectedId,{}, onDeleteSuccess);
}

function onDeleteSuccess(){
    showToast(`${ModuleName} deleted successfully`,'success');
    $('#deleteModal').modal('hide');
    switchTabs('list','detail');
    resetDiv('#mailcontent');
    loadList();
}
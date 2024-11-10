let ModuleName = 'Product';
let detailCall = false;
let lstProductTypeTable = [];
let productValidate = ['product_name'];
let listURL = '/product'
let productTypeUrl = '/producttype';
$(document).ready(async function() {
    await loadList(listURL,onLoadListSuccess,listData);
    $('#btnNew').click(function () {
        resetDiv('#maincontent');
        preSetValue();
        $('#department').val('');
        $("#uid").val('');
        $("#product_name").val('');
        $('#is_active').prop('checked', false);
        $('#is_verified').prop('checked', false);
        $("#remarks").val('');
        $('#product_type_div').addClass('d-none')
    });

    $('#btnSave').click(function () {
        onSave(listURL,elementToDataObject,productValidate,onSaveSuccess)
    });

    $('#btnDelete').click(function () {
        // ask for confirmation
        if(confirm("Are you sure you want to delete this product")){
            deleteData();
        }
        resetDiv('#mailcontent');
    });

    $('#Edate').datepicker({
        dateFormat: "yy-mm-dd"
    });
});

let listData = [];
let categoryList =[]

function preSetValue(){

}

function onLoadListSuccess(){
    var NotVisibleColumnsName = ["PID",'ModBy','CreatedBy','CreatedDate','LastUpdatedOn','SubProducts','ProductType','IsActive','IsVerified'];
    setDataTableNew(listData,'#listTable',NotVisibleColumnsName,'onGetDetailByID');
    getDepartmentList();
}

function getDepartmentList(){
    RestCall('GET','/department','', (res)=>{
        $.each(res.List,(i,e)=>{
            if(e)
                $('#department').append(`<option value="${e.UID}">${e.DepartmentName}</option>`);
        })
    });
}  

function onGetDetailByID(id){
    onGetDetailByIDNew(false,listURL,id,onGetDetailByIDSuccess,listData,dataObjToElement,'detail','list');
}

function onGetDetailByIDSuccess(msg){
    let obj = keysToLowerCase(msg)
    dataObjToElement(obj);
}


async function onSaveSuccess(msg){
    showToast(`${ModuleName} saved successfully`,'success');
    isEditing = false;
    switchTabs('list','detail');
    resetDiv('#mailcontent');
    await loadList(listURL,onLoadListSuccess,listData);
    // onLoadListSuccess();
    $('#btnNew').click();
}

function elementToDataObject(obj){
    obj.UID             = parseInt($("#uid").val());
    obj.PID             = parseInt($("#brand").val());
    obj.ProductName     = $("#product_name").val();
    obj.Department      = $('#department').val();
    obj.IsActive        = 0;
    obj.PID             = 0
    if($("#is_active").prop('checked') == true){
        obj.IsActive   = 1;
    }
    obj.IsVerified = 0;
    if($("#is_verified").prop('checked') == true){
        obj.IsVerified = 1;
    }
    obj.Remarks    = $("#remarks").val();
}

function loadProductTypeTable(array){
    let listData = [];
    let lstTblBtnArr = [
        'excel',
        {
        text: 'New',
        className: 'btn btn-success btn-xs',
        action: function (e, dt, node, config) {
                onProductTypeNewRecord()
            }
        },
        {
        text: 'Edit',
        className: 'btn btn-primary btn-xs',
        action: function (e, dt, node, config) {
            onProductTypeEditRecord()
        }
        },
        {
        text: 'Delete',
        className: 'btn btn-danger btn-xs',
        action: function (e, dt, node, config) {
                onProductTypeDeleteRecord()
            }
        }
    ];
    $.each(array,(i,e)=>{
        if(e){
            let uid = e.UID?'UID':'uid'
            listData.push(moveKeyToFirst(e,uid))
        }
    })
    var NotVisibleColumnsName = ["PID",'ModBy','CreatedBy','CreatedOn','LastUpdatedOn','SubProducts','ProductType','IsActive','IsVerified'];
    lstProductTypeTable = setDataTableNew(listData,'#productTypeListTable',NotVisibleColumnsName,'onGetProjectTypeDetailByID',lstTblBtnArr);
   
}

function dataObjToElement(obj){
    $("#uid").val(obj.UID);
    $("#product_name").val(obj.ProductName);
    $('#department').val(JSON.parse(obj.DepartmentArr)).trigger("change");
    if(obj.IsActive)
        $('#is_active').prop('checked', true);
    else
        $('#is_active').prop('checked', false);

    if(obj.IsVerified)
        $('#is_verified').prop('checked', true);
    else
        $('#is_verified').prop('checked', false);

    $("#remarks").val(obj.Remarks);

    $('#product_type_div').removeClass('d-none');
    loadProductTypeTable(obj.ProductType);
}

function onDelete(){
    $('#deleteModal').modal('show');
}

function deleteData(){
    let selectedId = $('#uid').val()
    RestCall('DELETE','/product/'+selectedId,{}, onDeleteSuccess);
}

async function onDeleteSuccess(){
    showToast(`${ModuleName} deleted successfully`,'success');
    $('#deleteModal').modal('hide');
    switchTabs('list','detail');
    resetDiv('#mailcontent');
   await loadList();
   onLoadListSuccess();
    $('#btnNew').click();
}

function getSubCategory(){
    $.each(categoryList,(i,e)=>{
        if($('#category').val() == e.PID)
           $('#subCategory').append(`<option value="${e.UID}">${e.CategoryName}</option>`);
    })
}

function getSeries(){
    $.each(categoryList,(i,e)=>{
        if($('#subCategory').val() == e.PID)
           $('#series').append(`<option value="${e.UID}">${e.CategoryName}</option>`);
    })
}

function getModel(){
    $.each(categoryList,(i,e)=>{
        if($('#series').val() == e.PID)
           $('#model').append(`<option value="${e.UID}">${e.CategoryName}</option>`);
    })
}

function onProductTypeNewRecord(){
    $('#productTypeModal').modal('show');
    preSetProductTypeValue()
}

function preSetProductTypeValue(){
    $('#productType_uid').val('');
    $('#productType_name').val('');
    $('#productType_remarks').val('');
    $('#productType_is_active').prop('checked', true);
    $('#productType_is_verified').prop('checked', false);
}

function saveProductType(){
    onSave(productTypeUrl,elementToDataObjectOfProductType,[],onSaveProductTypeSuccess);
}

function elementToDataObjectOfProductType(obj){
    obj.UID        = parseInt($("#productType_uid").val());
    obj.ProductTypeName  = $("#productType_name").val();
    obj.PID              = parseInt($("#uid").val());
    obj.IsActive   = 0;
    if($("#productType_is_active").prop('checked') == true){
        obj.IsActive   = 1;
    }
    obj.IsVerified = 0;
    if($("#productType_is_verified").prop('checked') == true){
        obj.IsVerified = 1;
    }
    obj.Remarks    = $("#productType_remarks").val();
}

async function onSaveProductTypeSuccess(){
    await loadList(listURL,onLoadListSuccess,listData);
    $.each(listData,(i,e)=>{
        if($('#uid').val() == e.UID){
            loadProductTypeTable(e.ProductType);
        }
    });
    showToast(`Product saved successfully`,'success');
    $('#productTypeModal').modal('hide');
}

function onProductTypeEditRecord(){
    var selectedRows = lstProductTypeTable.rows('.selected').data();
    if (selectedRows.length > 0) {
       showProductTypeModel(lstProductTypeTable.rows('.selected').data()[0]);
    } else {
        alert('Select a row to edit');
    } 
}

function showProductTypeModel(data){
    $('#productTypeModal').modal('show');
    onGetProductTypeDetailByID(data.UID)
}

function onGetProductTypeDetailByID(id){
    $.each(listData,(i,e)=>{
        $.each(e.ProductType,(i,e)=>{
            if(id == e.UID){
                productTypeDataObjToElement(e);
            }
        })
    })
}

function productTypeDataObjToElement(obj){
    $("#productType_uid").val(obj.UID);
    $("#productType_name").val(obj.ProductTypeName);
    if(obj.IsActive)
        $('#productType_is_active').prop('checked', true);
    else
        $('#productType_is_active').prop('checked', false);

    if(obj.IsVerified)
        $('#productType_is_verified').prop('checked', true);
    else
        $('#productType_is_verified').prop('checked', false);

    $("#productType_remarks").val(obj.Remarks);
}

function onProductTypeDeleteRecord(){
    var selectedRows = lstProductTypeTable.rows('.selected').data();
    if (selectedRows.length > 0) {
        var confirmation = confirm("Are you sure you want to delete this record?");
        if (confirmation) {
            deleteProductTypeRecord(lstProductTypeTable.rows('.selected').data()[0].UID);
        }
    } else {
        alert('Select a row to delete');
    }    
}

function deleteProductTypeRecord(id){
    RestCall('DELETE','/producttype/'+id,{}, onDeleteProductTypeRecordSuccess);
}

async function onDeleteProductTypeRecordSuccess(){
    await loadList(listURL,onLoadListSuccess,listData);
    $.each(listData,(i,e)=>{
        if($('#uid').val() == e.UID){
            loadProductTypeTable(e.ProductType);
        }
    });
    showToast(`Product type deleted successfully`,'success');
}
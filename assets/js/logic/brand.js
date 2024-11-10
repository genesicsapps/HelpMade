let detailCall = false;
let ModuleName = 'Brand';
let lstBrandProductTable = '';
let lstBrandSeriesTable  = '';
let lstBrandSeriesModelTable = '';
let lstBrandProuductTypeTable = '';
let productTypeName = '';
let productName = '';
let brandVaildate = ['brand_name'];
let listURL = '/brand';
let productURL = '/product';
let productTypenURL = '/producttype';
let brandSeriesModelsURL = '/brandseriesmodels';
let brandProductTypeURL = '/brandproducttype';
let brandProductURL = '/brandproduct'
let brandSeriesURL = '/brandseries';
let detailURL = '/brand/';
let listData = [];
let productList = [];

$(document).ready(async function() {
    await loadList(listURL,onLoadListSuccess,listData);
    $('#btnNew').click(function () {
        resetDiv('#maincontent');
        preSetValue();
        $("#uid").val('');
        $("#brand_name").val('');
        $('#is_active').prop('checked', false);
        $('#is_verified').prop('checked', false);
        $("#remarks").val('');
    });

    $('#btnSave').click(function () {
        onSave(listURL,elementToDataObject,brandVaildate,onSaveSuccess);     
    });

    $('#btnDelete').click(function () {
        // ask for confirmation
       if(confirm("Are you sure you want to delete this brand")){
        deleteData();
       }
        resetDiv('#mailcontent');
    });

    $('#Edate').datepicker({
        dateFormat: "yy-mm-dd"
    });

    await getProductList();
    loadProductDropDown();

    $('.select').select2();
    $('.select').css('width','100%');
});

function loadProductDropDown(){
    let productName = []
    $.each(productList,(i,e)=>{
        productName.push(e.ProductName);
    });

    dropDown('#product_name',productName,openCreateProductModel)
}

function openCreateProductModel(){
    productName = $('#product_name').val();
    $('#createProductModal').modal('show');
    $('#createProductModelTitle').html(`Are you sure you want to add this ${$('#product_name').val()} product`)
}

function saveProduct(){
    onSave(productURL,elementToDataObjectProduct,[],onSaveProductSuccess);
}

function elementToDataObjectProduct(obj){
    obj.PID             = 0;
    obj.ProductName     = productName;
    obj.Department      = [];
    obj.IsActive        = 0;
    obj.PID             = 0
}

async function onSaveProductSuccess(){
     await getProductList();
    loadProductDropDown();
    $('#createProductModal').modal('hide');
    $('#product_name').val(productName);
    showToast('Product save successfully','success')
}


function preSetValue(){

}


function getProductList(){
    productList = [];
    return new Promise((reslove,reject) =>{
        RestCall('GET','/product','', (res)=>{
            $.each(res.List,(i,e)=>{
                if(e)
                    productList.push(e);
            })
            reslove();
        });
    })
}

function onLoadListSuccess(){
    var NotVisibleColumnsName = ["PID",'ModBy','CreatedBy','CreatedOn','LastUpdatedOn','IsActive','BrandSeries','BrandProducts','IsVerified','Remarks'];
    setDataTableNew(listData,'#listTable',NotVisibleColumnsName,'onGetDetailByID');
}

async function onGetDetailByID(id){
    // showLoader();
    // resetDiv('#mailcontent');
    // if(detailCall == true){
    //     RestCall('GET',`${detailURL}`+id,'',onGetDetailByIDSuccess)
    // } 
    // else{
    //     $.each(listData,(i,e)=>{
    //         if(id == e.UID){
    //             dataObjToElement(e);
    //             loadBrandProductTable(e.BrandProducts);
    //             loadBrandSeriesTable(e.BrandSeries);
    //         }
    //     })
    //     hideLoader();
    // }
    // switchTabs('detail','list');
    onGetDetailByIDNew(false,detailURL,id,onGetDetailByIDSuccess,listData,dataObjToElement,'detail','list',()=>{
        $.each(listData,(i,e)=>{
            if(id == e.UID){
                loadBrandProductTable(e.BrandProducts);
                loadBrandSeriesTable(e.BrandSeries);
            }
        })
    });

}

function onGetDetailByIDSuccess(msg){
    let obj = keysToLowerCase(msg)
    dataObjToElement(obj);
}

function onSaveSuccess(msg){
    showToast(`${ModuleName} saved successfully`,'success');
    isEditing = false;
    switchTabs('list','detail');
    resetDiv('#mailcontent');
    $('#btnNew').click()
    loadList(listURL,onLoadListSuccess,listData);
}

function elementToDataObject(obj){
    obj.UID        = parseInt($("#uid").val());
    obj.BrandName  = $("#brand_name").val();
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
    $("#brand_name").val(obj.BrandName);

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
    RestCall('DELETE','/brand/'+selectedId,{}, onDeleteSuccess);
}

function onDeleteSuccess(){
    showToast(`${ModuleName} deleted successfully`,'success');
    $('#deleteModal').modal('hide');
    switchTabs('list','detail');
    resetDiv('#mailcontent');
    loadList(listURL,onLoadListSuccess,listData);
    $('#btnNew').click();
}

function loadBrandProductTable(array){
    let listData = [];
    $.each(array,(i,e)=>{
        if(e){
            let uid = e.UID?'UID':'uid'
            listData.push(moveKeyToFirst(e,uid))
        }
    })
    let lstTblBtnArr = [
        'excel',
        {
        text: 'New',
        className: 'btn btn-success btn-xs',
        action: function (e, dt, node, config) {
                onBrandProductNewRecord()
            }
        },
        {
        text: 'Edit',
        className: 'btn btn-primary btn-xs',
        action: function (e, dt, node, config) {
            onBrandProductEditRecord()
        }
        },
        {
        text: 'Delete',
        className: 'btn btn-danger btn-xs',
        action: function (e, dt, node, config) {
                onBrandProductDeleteRecord()
            }
        }
    ];
    var NotVisibleColumnsName = ["PID",'ModBy','UID','CreatedBy','CreatedOn','LastUpdatedOn','BrandProductType','ProductID','IsActive','BrandSeries','BrandProducts','IsVerified','Remarks'];
    lstBrandProductTable =  setDataTableNew(listData,'#productTable',NotVisibleColumnsName,'onGetProductDetailByID',lstTblBtnArr);

    let table = new DataTable('#productTable');
    $('#productTable tbody').on('click', 'tr', function () {
        let product = table.row(this).data();

        loadProductTypeTable(product.BrandProductType);
    });

    $('#productTypeTable').html('')
    if(listData[0])
        loadProductTypeTable(listData[0].BrandProductType);
    table.row(':eq(0)', { page: 'current' }).select();
}

function loadProductTypeTable(array){
    let listData = [];
    $.each(array,(i,e)=>{
        if(e){
            let uid = e.UID?'UID':'uid'
            listData.push(moveKeyToFirst(e,uid));
        }
    })
    let lstTblBtnArr = [
        'excel',
        {
        text: 'New',
        className: 'btn btn-success btn-xs',
        action: function (e, dt, node, config) {
                onBrandProductTypeNewRecord()
            }
        },
        {
        text: 'Edit',
        className: 'btn btn-primary btn-xs',
        action: function (e, dt, node, config) {
            onBrandProductTypeEditRecord()
        }
        },
        {
        text: 'Delete',
        className: 'btn btn-danger btn-xs',
        action: function (e, dt, node, config) {
                onBrandProductTypeDeleteRecord()
            }
        }
    ];
    var NotVisibleColumnsName = ["PID",'ModBy','UID','CreatedBy','ProductTypeID','ModelDescription','SeriesID','ModelID','CreatedOn','LastUpdatedOn','BrandProductType','ProductID','IsActive','BrandSeries','BrandProducts','IsVerified','Remarks'];
    lstBrandProuductTypeTable =  setDataTableNew(listData,'#productTypeTable',NotVisibleColumnsName,'onGetProductTypeDetailByID',lstTblBtnArr);
}

function onBrandProductTypeDeleteRecord(){
    var selectedRows = lstBrandProuductTypeTable.rows('.selected').data();
    if (selectedRows.length > 0) {
        var confirmation = confirm("Are you sure you want to delete this record?");
        if (confirmation) {
            deleteBrandProductTypeRecord(lstBrandProuductTypeTable.rows('.selected').data()[0].UID);
        }
    } else {
        alert('Select a row to delete');
    } 
}

function preSetProductTypeValue(){
    $('#productType_uid').val('');
    $('#productType_series').val('');
    $('#productType_model_description').val('');
    $('#productType_is_active').prop('checked', true);
    $('#productType_is_verified').prop('checked', false);
}

function onBrandProductTypeEditRecord(){
    preSetProductTypeValue();
    var selectedRows = lstBrandProuductTypeTable.rows('.selected').data();
    if (selectedRows.length > 0) {
       showBrandProductTypeModel(lstBrandProuductTypeTable.rows('.selected').data()[0].UID);
    } else {
        alert('Select a row to edit');
    } 
}

function showBrandProductTypeModel(id){
    $('#brandProductTypeModal').modal('show');
    onGetBrandProductTypeModelDetailByID(id)

}

function onGetBrandProductTypeModelDetailByID(id){
    $.each(listData,(i,e)=>{
        $.each(e.BrandProducts,(i,e)=>{
            $.each(e.BrandProductType,(i,e)=>{
                if(e.UID == id)
                    brandProductTypeModelDataObjToElement(e);
            })
        })
    })
}

function brandProductTypeModelDataObjToElement(obj){
    $("#productType_uid").val(obj.UID);
    $("#productType_type").val(obj.ProductTypeName);
    
    $('#productType_series').html(`<option value="">Select</option>`);

    $.each(listData,(i,e)=>{
        if(e.UID == $('#uid').val()){
            $.each(e.BrandSeries,(i,e)=>{
                $('#productType_series').append(`
                    <option value="${e.UID}">${e.SeriesName}</option>
                `)
            })
        }
    })

    $('#productType_series').val(obj.SeriesID).trigger('change');
    $('#productType_model').val(obj.ModelID);
    $('#productType_model_description').val(obj.ModelDescription)

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

function deleteBrandProductTypeRecord(id){
    RestCall('DELETE','/brandproducttype/'+id,{}, onDeleteBrandProductTypeRecordSuccess);
}

async function onDeleteBrandProductTypeRecordSuccess(){
    showToast('Product type has been deleted','success');
    await loadList(listURL,onLoadListSuccess,listData);
    $.each(listData,(i,e)=>{
        if(e.UID == $('#uid').val()){
            $.each(e.BrandProducts,(i,e)=>{
                if(e.UID == lstBrandProductTable.rows('.selected').data()[0].UID){
                    loadProductTypeTable(e.BrandProductType);
                }
            })
        }
    })
}

function loadBrandSeriesTable(array){
    let listData = [];
    $.each(array,(i,e)=>{
        if(e){
            let uid = e.UID?'UID':'uid'
            listData.push(moveKeyToFirst(e,uid))
        }
    });
    let lstTblBtnArr = [
        'excel',
        {
        text: 'New',
        className: 'btn btn-success btn-xs',
        action: function (e, dt, node, config) {
                onBrandSeriesNewRecord()
            }
        },
        {
        text: 'Edit',
        className: 'btn btn-primary btn-xs',
        action: function (e, dt, node, config) {
            onBrandSeriesEditRecord()
        }
        },
        {
        text: 'Delete',
        className: 'btn btn-danger btn-xs',
        action: function (e, dt, node, config) {
                onBrandSeriesDeleteRecord()
            }
        }
    ];
    var NotVisibleColumnsName = ["PID",'ModBy','UID','CreatedBy','BrandSeriesModel','CreatedOn','LastUpdatedOn','IsActive','BrandSeries','BrandProducts','IsVerified','Remarks'];
    lstBrandSeriesTable = setDataTableNew(listData,'#seriesTable',NotVisibleColumnsName,'onGetSeriesDetailByID',lstTblBtnArr);

    let table = new DataTable('#seriesTable');
    $('#seriesTable tbody').on('click', 'tr', function () {
        let series = table.row(this).data();
        loadSeriesModelTable(series.BrandSeriesModel);
    });
    $('#seriesModelTable').html('')
    if(listData[0])
        loadSeriesModelTable(listData[0].BrandSeriesModel);
    
    table.row(':eq(0)', { page: 'current' }).select();
}

function loadSeriesModelTable(array){
    let listData = [];
    let lstTblBtnArr = [
        'excel',
        {
        text: 'New',
        className: 'btn btn-success btn-xs',
        action: function (e, dt, node, config) {
                onBrandSeriesModelNewRecord()
            }
        },
        {
        text: 'Edit',
        className: 'btn btn-primary btn-xs',
        action: function (e, dt, node, config) {
            onBrandSeriesModelEditRecord()
        }
        },
        {
        text: 'Delete',
        className: 'btn btn-danger btn-xs',
        action: function (e, dt, node, config) {
                onBrandSeriesModelDeleteRecord()
            }
        }
    ];
    $.each(array,(i,e)=>{
        if(e){
            let uid = e.UID?'UID':'uid'
            listData.push(moveKeyToFirst(e,uid))
        }
    })
    var NotVisibleColumnsName = ["PID",'ModBy','UID','CreatedBy','CreatedOn','LastUpdatedOn','BrandProductType','ProductID','IsActive','BrandSeries','BrandProducts','IsVerified','Remarks'];
    lstBrandSeriesModelTable = setDataTableNew(listData,'#seriesModelTable',NotVisibleColumnsName,'onGetSeriesTypeDetailByID',lstTblBtnArr);
}

function onBrandProductNewRecord(){
    $('#brandProductModal').modal('show');
    preSetBrandProductValue();
}

function preSetBrandProductValue(){
    $('#product_uid').val('');
    $('#product_name').val('');
    $('#product_remarks').val('');
    $('#product_is_active').prop('checked', true);
    $('#product_is_verified').prop('checked', false);
}

function saveBrandProduct(){
    // showLoader();
    // let obj = {};    
    // elementToDataObjectOfBrandProduct(obj);

    // if(parseInt(obj.UID) > 0){
    //     RestCall('PUT','/brandproduct/'+obj.UID,obj, onSaveBrandProductSuccess);
    // }else{
    //     delete obj.UID;
    //     RestCall('POST','/brandproduct',obj, onSaveBrandProductSuccess);
    // } 

    onSave(brandProductURL,elementToDataObjectOfBrandProduct,[],onSaveBrandProductSuccess);     

}

async function onSaveBrandProductSuccess(){
    await loadList(listURL,onLoadListSuccess,listData);
    $.each(listData,(i,e)=>{
        if($('#uid').val() == e.UID){
            loadBrandProductTable(e.BrandProducts);
        }
    });
    showToast(`Product saved successfully`,'success');
    $('#brandProductModal').modal('hide');
}

function elementToDataObjectOfBrandProduct(obj){
    obj.UID       = parseInt($('#product_uid').val());
    $.each(productList, (i,e)=>{
        if(e.ProductName == $('#product_name').val()){
            obj.ProductID = e.UID
        }
    })
    obj.PID       = parseInt($('#uid').val());
    obj.IsActive  = 0;
    if($("#product_is_active").prop('checked') == true){
        obj.IsActive   = 1;
    }
    obj.IsVerified = 0;
    if($("#product_is_verified").prop('checked') == true){
        obj.IsVerified = 1;
    }
    obj.Remarks    = $("#product_remarks").val();
}

function onBrandProductEditRecord(){
    resetDiv('#maincontent');
    var selectedRows = lstBrandProductTable.rows('.selected').data();
    if (selectedRows.length > 0) {
       showBrandProductModel(lstBrandProductTable.rows('.selected').data()[0]);
    } else {
        alert('Select a row to edit');
    }    
}

function showBrandProductModel(data){
    $('#brandProductModal').modal('show');
    onGetBrandProductDetailByID(data.UID)
}

function onGetBrandProductDetailByID(id){
    $.each(listData,(i,e)=>{
        $.each(e.BrandProducts,(i,e)=>{
            if(id == e.UID){
                brandProductDataObjToElement(e);
            }
        })
    })
}

function brandProductDataObjToElement(obj){
    $("#product_uid").val(obj.UID);
    $("#product_name").val(obj.ProductName);
    if(obj.IsActive)
        $('#product_is_active').prop('checked', true);
    else
        $('#product_is_active').prop('checked', false);

    if(obj.IsVerified)
        $('#product_is_verified').prop('checked', true);
    else
        $('#product_is_verified').prop('checked', false);

    $("#product_remarks").val(obj.Remarks);
}

function onBrandProductDeleteRecord(){
    var selectedRows = lstBrandProductTable.rows('.selected').data();
    if (selectedRows.length > 0) {
        var confirmation = confirm("Are you sure you want to delete this record?");
        if (confirmation) {
            deleteBrandProductRecord(lstBrandProductTable.rows('.selected').data()[0].UID);
        }
    } else {
        alert('Select a row to delete');
    }    
}

function deleteBrandProductRecord(id){
    RestCall('DELETE','/brandproduct/'+id,{}, onDeleteBrandProductRecordSuccess);
}

async function onDeleteBrandProductRecordSuccess(){
    await loadList(listURL,onLoadListSuccess,listData);
    $.each(listData,(i,e)=>{
        if($('#uid').val() == e.UID){
            loadBrandProductTable(e.BrandProducts);
        }
    });
    showToast(`Product deleted successfully`,'success');
}

function onBrandSeriesNewRecord(){
    $('#brandSeriesModal').modal('show');
    preSetSeriesProductValue()
}

function preSetSeriesProductValue(){
    $('#series_uid').val('');
    $('#series_name').val('');
    $('#series_remarks').val('');
    $('#series_is_active').prop('checked', true);
    $('#series_is_verified').prop('checked', false);
}

function saveBrandSeries(){
    // showLoader();
    // let obj = {};    
    // elementToDataObjectOfBrandSeries(obj);

    // if(parseInt(obj.UID) > 0){
    //     RestCall('PUT','/brandseries/'+obj.UID,obj, onSaveBrandSeriesSuccess);
    // }else{
    //     delete obj.UID;
    //     RestCall('POST','/brandseries',obj, onSaveBrandSeriesSuccess);
    // } 

    onSave(brandSeriesURL,elementToDataObjectOfBrandSeries,[],onSaveBrandSeriesSuccess);     

}

async function onSaveBrandSeriesSuccess(){
    await loadList(listURL,onLoadListSuccess,listData);
    $.each(listData,(i,e)=>{
        if($('#uid').val() == e.UID){
            loadBrandSeriesTable(e.BrandSeries);
        }
    });
    showToast(`Series saved successfully`,'success');
    $('#brandSeriesModal').modal('hide');
}

function elementToDataObjectOfBrandSeries(obj){
    obj.UID        = parseInt($('#series_uid').val());
    obj.SeriesName = $('#series_name').val();
    obj.PID        = parseInt($('#uid').val());
    obj.IsActive   = 0;
    if($("#series_is_active").prop('checked') == true){
        obj.IsActive   = 1;
    }
    obj.IsVerified = 0;
    if($("#series_is_verified").prop('checked') == true){
        obj.IsVerified = 1;
    }
    obj.Remarks    = $("#series_remarks").val();
}

function onBrandSeriesEditRecord(){
    preSetSeriesProductValue();
    var selectedRows = lstBrandSeriesTable.rows('.selected').data();
    if (selectedRows.length > 0) {
       showBrandSeriesModel(lstBrandSeriesTable.rows('.selected').data()[0]);
    } else {
        alert('Select a row to edit');
    } 
}

function showBrandSeriesModel(data){
    $('#brandSeriesModal').modal('show');
    onGetBrandSeriesDetailByID(data.UID)
}

function onGetBrandSeriesDetailByID(id){
    $.each(listData,(i,e)=>{
        $.each(e.BrandSeries,(i,e)=>{
            if(id == e.UID){
                brandSeriesDataObjToElement(e);
            }
        })
    })
}

function brandSeriesDataObjToElement(obj){
    $("#series_uid").val(obj.UID);
    $("#series_name").val(obj.SeriesName);
    if(obj.IsActive)
        $('#series_is_active').prop('checked', true);
    else
        $('#series_is_active').prop('checked', false);

    if(obj.IsVerified)
        $('#series_is_verified').prop('checked', true);
    else
        $('#series_is_verified').prop('checked', false);

    $("#series_remarks").val(obj.Remarks);
}

function onBrandSeriesDeleteRecord(){
    var selectedRows = lstBrandSeriesTable.rows('.selected').data();
    if (selectedRows.length > 0) {
        var confirmation = confirm("Are you sure you want to delete this record?");
        if (confirmation) {
            deleteBrandSeriesRecord(lstBrandSeriesTable.rows('.selected').data()[0].UID);
        }
    } else {
        alert('Select a row to delete');
    }    
}

function deleteBrandSeriesRecord(id){
    RestCall('DELETE','/brandseries/'+id,{}, onDeleteBrandSeriesRecordSuccess);
}

async function onDeleteBrandSeriesRecordSuccess(){
    await loadList(listURL,onLoadListSuccess,listData);
    $.each(listData,(i,e)=>{
        if($('#uid').val() == e.UID){
            loadBrandSeriesTable(e.BrandSeries);
        }
    });
    showToast(`Series deleted successfully`,'success');
}

function onBrandSeriesModelNewRecord(){
    $('#brandSeriesModelModal').modal('show');
    preSetBrandSeriesModelValue()
}

function preSetBrandSeriesModelValue(){
    $('#model_uid').val('');
    $('#model_name').val('');
    $('#model_remarks').val('');
    $('#model_is_active').prop('checked', true);
    $('#model_is_verified').prop('checked', false);
}

function saveBrandSeriesModel(){
    // showLoader();
    // let obj = {};    
    // elementToDataObjectOfBrandSeriesModel(obj);

    // if(parseInt(obj.UID) > 0){
    //     RestCall('PUT','/brandseriesmodels/'+obj.UID,obj, onSaveBrandSeriesModelSuccess);
    // }else{
    //     delete obj.UID;
    //     RestCall('POST','/brandseriesmodels',obj, onSaveBrandSeriesModelSuccess);
    // } 

    onSave(brandSeriesModelsURL,elementToDataObjectOfBrandSeriesModel,[],onSaveBrandSeriesModelSuccess);     

}

function elementToDataObjectOfBrandSeriesModel(obj){
    obj.UID       = parseInt($('#model_uid').val());
    obj.ModelName = $('#model_name').val();
    obj.PID       = lstBrandSeriesTable.rows('.selected').data()[0].UID;
    obj.IsActive  = 0;
    if($("#model_is_active").prop('checked') == true){
        obj.IsActive   = 1;
    }
    obj.IsVerified = 0;
    if($("#model_is_verified").prop('checked') == true){
        obj.IsVerified = 1;
    }
    obj.Remarks    = $("#model_remarks").val(); 
}

async function onSaveBrandSeriesModelSuccess(){
    await loadList(listURL,onLoadListSuccess,listData);
    $.each(listData,(i,e)=>{
        if($('#uid').val() == e.UID){
            $.each(e.BrandSeries,(i,e)=>{
                if(e.UID == lstBrandSeriesTable.rows('.selected').data()[0].UID){
                    loadSeriesModelTable(e.BrandSeriesModel);
                }
            })
        }
    });
    showToast(`Model saved successfully`,'success');
    $('#brandSeriesModelModal').modal('hide');
}

function onBrandSeriesModelEditRecord(){
    preSetBrandSeriesModelValue();
    var selectedRows = lstBrandSeriesModelTable.rows('.selected').data();
    if (selectedRows.length > 0) {
       showBrandSeriesModelModal(lstBrandSeriesModelTable.rows('.selected').data()[0]);
    } else {
        alert('Select a row to edit');
    } 
}

function showBrandSeriesModelModal(data){
    $('#brandSeriesModelModal').modal('show');
    onGetBrandSeriesModelDetailByID(data.UID)
}

function onGetBrandSeriesModelDetailByID(id){
    $.each(listData,(i,e)=>{
        $.each(e.BrandSeries,(i,e)=>{
            $.each(e.BrandSeriesModel,(i,e)=>{
                if(e.UID == id)
                    brandSeriesModelDataObjToElement(e);
            })
        })
    })
}

function brandSeriesModelDataObjToElement(obj){
    $("#model_uid").val(obj.UID);
    $("#model_name").val(obj.ModelName);
    if(obj.IsActive)
        $('#model_is_active').prop('checked', true);
    else
        $('#model_is_active').prop('checked', false);

    if(obj.IsVerified)
        $('#model_is_verified').prop('checked', true);
    else
        $('#model_is_verified').prop('checked', false);

    $("#model_remarks").val(obj.Remarks);
}

function onBrandSeriesModelDeleteRecord(){
    var selectedRows = lstBrandSeriesModelTable.rows('.selected').data();
    if (selectedRows.length > 0) {
        var confirmation = confirm("Are you sure you want to delete this record?");
        if (confirmation) {
            deleteBrandSeriesModelRecord(lstBrandSeriesModelTable.rows('.selected').data()[0].UID);
        }
    } else {
        alert('Select a row to delete');
    } 
}

function deleteBrandSeriesModelRecord(id){
    RestCall('DELETE','/brandseriesmodels/'+id,{}, onDeleteBrandSeriesModelRecordSuccess);
}

async function onDeleteBrandSeriesModelRecordSuccess(){
    await loadList(listURL,onLoadListSuccess,listData);
    $.each(listData,(i,e)=>{
        if($('#uid').val() == e.UID){
            $.each(e.BrandSeries,(i,e)=>{
                if(e.UID == lstBrandSeriesTable.rows('.selected').data()[0].UID){
                    loadSeriesModelTable(e.BrandSeriesModel);
                }
            })
        }
    });
    showToast(`Model deleted successfully`,'success');
}

function onBrandProductTypeNewRecord(){
    $('#brandProductTypeModal').modal('show');
    let id = lstBrandProductTable.rows('.selected').data()[0].UID;
    let ProductID = lstBrandProductTable.rows('.selected').data()[0].ProductID;
    $('#productType_series').html(`<option value="">Select</option>`);
    $('#productType_type').html(`<option value="">Select</option>`)

    $.each(listData,(i,e)=>{
        if(e.UID == $('#uid').val()){
            $.each(e.BrandSeries,(i,e)=>{
                $('#productType_series').append(`
                    <option value="${e.UID}">${e.SeriesName}</option>
                `)
            })
        }
    })

    $.each(productList, (i,e)=>{
        if(ProductID == e.UID){
            let array = []
            $.each(e.ProductType,(i,e)=>{
                array.push(e.ProductTypeName)
            })
            dropDown('#productType_type',array,openCreateProductTypeModel)
        }
    })
    console.log(id)
    preSetBrandProductTypeValue()
}

function openCreateProductTypeModel(res){
    productTypeName = res;
    $('#createProductTypeModal').modal('show');
    $('#createProductTypeModelTitle').html(`Are you sure you want to create ${res} product type in product ${lstBrandProductTable.rows('.selected').data()[0].ProductName}`)
}

function saveProductType(){
    // let obj = {};
    // elementToDataObjectProductType(obj)
    // RestCall('POST','/producttype',obj, onSaveProductTypeSuccess);

    onSave(productTypenURL,elementToDataObjectProductType,[],onSaveProductTypeSuccess);     
}

function elementToDataObjectProductType(obj){
    obj.ProductTypeName  = productTypeName;
    obj.PID              = lstBrandProductTable.rows('.selected').data()[0].ProductID;
    obj.IsActive   = 0;
    obj.IsVerified = 0;
    obj.Remarks    = '';
}

async function onSaveProductTypeSuccess(res){
    await loadList(listURL,onLoadListSuccess,listData);
    $.each(listData,(i,e)=>{
        if(e.UID == $('#uid').val()){
            $.each(e.BrandProducts,(i,e)=>{
                if(e.UID == lstBrandProductTable.rows('.selected').data()[0].UID){
                    loadProductTypeTable(e.BrandProductType);

                }
            })
        }
    })
    $('#productType_type').val(res.ProductTypeName); 
    showToast('Product type has been saved successfully','success')
    $('#createProductTypeModal').modal('hide');
}

function preSetBrandProductTypeValue(){
    $('#productType_uid').val('');
    $('#productType_series').val('');
    $('#productType_model').val('');
    $('#productType_uid').val('');
    $('#productType_remarks').val('');
    $('#productType_is_active').prop('checked', true);
    $('#productType_is_verified').prop('checked', false);
}

function getSeriesModel(){
    $('#productType_model').append(`<option value="">Select</option>`)

    $.each(listData,(i,e)=>{
        if(e.UID == $('#uid').val()){
            $.each(e.BrandSeries,(i,e)=>{
                if(e.UID == $('#productType_series').val()){
                    $.each(e.BrandSeriesModel,(i,e)=>{
                        $('#productType_model').append(`
                            <option value="${e.UID}">${e.ModelName}</option>
                        `);
                    })
                }
            })
        }
    })
}

function saveBrandProductType(){
    onSave(brandProductTypeURL,elementToDataObjectOfBrandProductType,[],onSaveBrandProductTypeSuccess);     
}

async function onSaveBrandProductTypeSuccess(res){
    preSetBrandProductTypeValue()
    await loadList(listURL,onLoadListSuccess,listData);
    $('#brandProductTypeModal').modal('hide');
   
    $.each(listData, (i,e)=>{
        if(e.UID == $('#uid').val()){
            $.each(e.BrandProducts,(i,e)=>{
                if(e.UID == lstBrandProductTable.rows('.selected').data()[0].UID){
                    loadProductTypeTable(e.BrandProductType);
                }
            })
        }
    })
}

function elementToDataObjectOfBrandProductType(obj){
    let id = lstBrandProductTable.rows('.selected').data()[0].ProductID;

    obj.UID              = parseInt($('#productType_uid').val());
    obj.ProductID        = id;
    $.each(productList, (i,e)=>{
        $.each(e.ProductType,(i,e)=>{
            if($('#productType_type').val() == e.ProductTypeName){
                obj.ProductTypeID =  e.UID;
            }
        })
    })

    obj.SeriesID         = parseInt($('#productType_series').val());
    obj.ModelID          = parseInt($('#productType_model').val());
    obj.ModelDescription = $('#productType_model_description').val();


    obj.PID       = parseInt($('#uid').val());
    obj.IsActive  = 0;
    if($("#productType_is_active").prop('checked') == true){
        obj.IsActive   = 1;
    }
    obj.IsVerified = 0;
    if($("#productType_is_verified").prop('checked') == true){
        obj.IsVerified = 1;
    }
    obj.Remarks    = $("#productType_remarks").val(); 
}
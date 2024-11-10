let ModuleName = 'Product';
let detailCall = true;
let dropDownsIDs = ['brand','product','productType','series','model']
let listURL = '/myproduct'
$(document).ready(async function() {
   await loadList(listURL,onLoadListSuccess,listData);
    $('#btnNew').click(function () {
        resetDiv('#maincontent');
        preSetValue();
        resetForm();
    });

    $('#btnSave').click(function () {
        onSave()
    });

    $('#btnDelete').click(function () {
        // ask for confirmation
        resetDiv('#mailcontent');
        onDelete()
    });

    
    $('#Edate').datepicker({
        dateFormat: "yy-mm-dd"
    });
    // associateBookingKeyUpEvents();
    
    $('.select').select2();

    $.each(dropDownsIDs,(i,e)=>{
        $(`#${e}`).on('change', function() {
            var value = $(`#${e}`).val();
            var modifiedValue = value.replace('Create ','');
            $(`#${e}`).val(modifiedValue);
        });
    });
    
    
    loadBrandDropDown();
});

function loadBrandDropDown(){
    let brandurl = baseurl+'/ep_dc/api/brand';
    setSelect2AutoComplete('#brand',brandLookupURL,'brandname','BrandName',brandurl,onBrandSelectItem,[],onSaveBrandModalSuccess);

}

function onBrandSelectItem(){
    loadProductDropDown();
    loadSeriesDropDown();
}

function loadProductDropDown(){
    if($('#product').hasClass('select2-hidden-accessible'))
        $('#product').select2('destroy').empty();
    if($('#productType').hasClass('select2-hidden-accessible'))
        $('#productType').select2('destroy').empty();

    $('#productType').select2();
    let proucturl = baseurl+'/ep_dc/api/product';
    setSelect2AutoComplete('#product',productLookupURL+$('#brand').val(),'productname','ProductName',proucturl,onProductSelectItem,['brandproductid'],onSaveProductSuccess);
}

function loadSeriesDropDown(){
    if($('#series').hasClass('select2-hidden-accessible'))
        $('#series').select2('destroy').empty();
    if($('#model').hasClass('select2-hidden-accessible'))
        $('#model').select2('destroy').empty();

    let seriesUrl = baseurl+'/ep_dc/api/brandseries';
    setSelect2AutoComplete('#series',seriesLookupURL+$('#brand').val(),'seriesname','SeriesName',seriesUrl,onSeriesSelectItem,[],onSaveSeriesSuccess,{PID:parseInt($('#brand').val())});
    $('#model').select2();
}

function onSaveSeriesSuccess(){
    loadModelDropDown();
}

function onSeriesSelectItem(){
    if($('#model').hasClass('select2-hidden-accessible'))
     $('#model').select2('destroy').empty();

    loadModelDropDown();
} 

function loadModelDropDown(){
    if($('#model').hasClass('select2-hidden-accessible'))
     $('#model').select2('destroy').empty();
    let modelUrl = baseurl+'/ep_dc/api/brandseriesmodels';
    setSelect2AutoComplete('#model',modelLookupURL+$('#series').val(),'modelname','ModelName',modelUrl,'',[],'',{PID:parseInt($('#series').val())});
}

function onProductSelectItem(e){
    console.log(e);
    if(!e.brandproductid)
        addProductInBrand(e)
    if($('#productType').hasClass('select2-hidden-accessible'))
         $('#productType').select2('destroy').empty();
    loadProductTypeDropdown();

}

function loadProductTypeDropdown(){
    if($('#productType').hasClass('select2-hidden-accessible'))
         $('#productType').select2('destroy').empty();
    let prouctTypeUrl = baseurl+'/ep_dc/api/producttype';
    setSelect2AutoComplete('#productType',productTypeLookupURL+$('#product').val(),'producttypename','ProductTypeName',prouctTypeUrl,'',[],onSaveBrandProductTypeSuccess,{PID:parseInt($('#product').val())});
}


let listData = [];
let categoryList = [];
let brandList = [];
let departmentList = [];

function preSetValue(){
    $('#brandproducttypeid').val('');
}

// async function loadList(){
//     showLoader();
//     await getProductList();
// }

function onLoadListSuccess(){
        loadTable();
}

function getProductList(){
    listData = [];
    return new Promise((resolve, reject) =>{
        RestCall('GET','/myproduct','', (res)=>{
            $.each(res,(i,e)=>{
                if(e){
                    let uid = e.UID?'UID':'uid'
                    listData.push(moveKeyToFirst(e,uid))
                }
            })
            resolve();
        });
    })
}


function loadTable(){
    var NotVisibleColumnsName = ["PID",'ModBy','CreatedBy','CreatedDate','LastUpdatedOn'];
    setDataTableNew(listData,'#listTable',NotVisibleColumnsName,'onGetDetailByID');
}

function onGetDetailByID(id){
    showLoader();
    resetDiv('#mailcontent');
    if(detailCall == true){
        RestCall('GET','/myproduct/'+id,'',onGetDetailByIDSuccess)
    } 
    else{
        $.each(listData,(i,e)=>{
            if(id == e.uid){
                dataObjToElement(e);
            }
        })
        hideLoader();
    }
    switchTabs('detail','list');
}

function onGetDetailByIDSuccess(msg){
    let obj = keysToLowerCase(msg)
    dataObjToElement(obj[0]);
}

function onSave(){
    // if(validateForm(dropDownsIDs)){
        if($('#uid').val() == '')
            addProductTypeInBrand()
        else
            onSaveBrandProductTypeSuccess()
    // }
}

function onSaveSuccess(msg){
    showToast(`${ModuleName} saved successfully`,'success');

    resetForm();
    isEditing = false;
    switchTabs('list','detail');
    resetDiv('#mailcontent');
    loadList();
    $('#btnNew').click()
}

function resetForm(){
    $('#brand').select2('destroy').empty();
    loadBrandDropDown();
    $('#product').select2('destroy').empty();
    $('#productType').select2('destroy').empty();
    $('#series').select2('destroy').empty();
    $('#model').select2('destroy').empty();

    $('.select').select2();
}

function elementToDataObject(obj){
    obj.PID = userData.COMPANYID;
    obj.UID = $('#myproductid').val();
}

function dataObjToElement(obj){
    $("#uid").val(obj.uid);
    $("#brandid").val(obj.brandid);
    $("#seriesid").val(obj.seriesid);
    $("#producttypeid").val(obj.producttypeid);
    $("#productid").val(obj.productid);
    $("#modelid").val(obj.seriesmodelid);
    // $("#brand").val(obj.brandname);
    // $("#product").val(obj.productname);
    // $("#productType").val(obj.producttypename);
    // $("#series").val(obj.seriesname);
    // $("#model").val(obj.modelname);
    $('#brandproducttypeid').val(obj.brandproducttypeid);
    
    $('#brand').append(`<option value="${obj.brandid}">${obj.brandname}</option>`);
    $('#brand').val(obj.brandid).trigger('change');

    $('#product').append(`<option value="${obj.productid}">${obj.productname}</option>`);
    $('#productid').val(obj.productid).trigger('change');

    $('#productType').append(`<option value="${obj.producttypeid}">${obj.producttypename}</option>`);
    $('#productType').val(obj.producttypeid).trigger('change');

    $('#series').append(`<option value="${obj.seriesid}">${obj.seriesname}</option>`);
    $('#series').val(obj.seriesid).trigger('change');

    $('#model').append(`<option value="${obj.seriesmodelid}">${obj.modelname}</option>`);
    $('#modelid').val(obj.seriesmodelid).trigger('change');


    console.log(obj);
    loadBrandDropDown();
    $('#brand').val(obj.brandid).trigger('change')
}

function onDelete(){
    $('#deleteModal').modal('show');
}

function deleteData(){
    let selectedId = $('#uid').val()
    RestCall('DELETE','/myproduct/'+selectedId,{}, onDeleteSuccess);
}

function onDeleteSuccess(){
    showToast(`${ModuleName} deleted successfully`,'success');
    $('#deleteModal').modal('hide');
    switchTabs('list','detail');
    resetDiv('#mailcontent');
    loadList();
}

function openCreateProductTypeModal(){
    this.productType = $('#productType').val().replace('Create ','');
    $('#createProductTypeModelTitle').html(`Are you sure you want to create ${this.productType} in ${$('#product').val()}`)
    $('#createProductTypeModal').modal('show');
}

function saveProductType(){
    let obj = {};
    obj.ProductTypeName  = this.productType;
    obj.PID              = parseInt($('#productid').val())
    obj.IsActive   = 0;
    obj.IsVerified = 0;
    obj.Remarks    = '';
    RestCall('POST','/producttype',obj, onSaveProductTypeSuccess);
}

async function onSaveProductTypeSuccess(res){
    this.productTypeID = res.UID;
    $('#productType').val(this.productType)
    $('#producttypeid').val(res.UID);
    $('#createProductTypeModal').modal('hide');
}

function addProductTypeInBrand(){
    let obj = {};
    obj.UID              = parseInt($('#uid').val())
    obj.ProductID        = parseInt($('#product').val());
    obj.ProductTypeID    = parseInt($('#productType').val());
    obj.SeriesID         = parseInt($('#series').val());
    obj.ModelID          = parseInt($('#model').val());
    obj.PID              = parseInt($('#brand').val());

    if(validate){
        let bpt = parseInt($('#brandproducttypeid').val());
        if(!bpt)
            RestCall('POST','/brandproducttype',obj, onAddProductTypeInBrandSuccess);
        else
            onSaveMyProduct(bpt)
    }
}

function onAddProductTypeInBrandSuccess(res){
    onSaveMyProduct(res.UID) 
}

function validate(){
    if(!$('#brandid').val())
    {
        alert('Please select brand, this can not be empty.');
        return false;
    }
    
    if(!$('#productid').val()){
        alert('Please select product, this can not be empty.');
        return false;
    }
    
    if(!$('#producttypeid').val()){
        alert('Please select product type, this can not be empty.');
        return false;
    }
    
    if(!$('#seriesid').val()){
        alert('Please select series, this can not be empty.');
        return false;
    }
    
    if(!$('#modelid').val()){
        alert('Please select model, this can not be empty.');
        return false
    }
    return true;
}


function onSaveMyProduct(bpt){
    let obj = {};
    obj.ProductTypeID = bpt;
    elementToDataObject(obj);

    if(parseInt(obj.UID) > 0){
        RestCall('PUT','/myproduct/'+obj.UID,obj, onSaveSuccess);
    }else{
        delete obj.UID;
        RestCall('POST','/myproduct',obj, onSaveSuccess);
    } 
}

 function onSaveBrandProductTypeSuccess(res){
   
    let obj = {};    
    if(res){
        // $('#brandproducttypeid').val(res.UID);
        obj.ProductTypeID = res.UID;
    }
    else{
        obj.ProductTypeID = parseInt($('#brandproducttypeid').val());
    }
    elementToDataObject(obj);
    if(!res){
         showLoader();
        if(parseInt(obj.UID) > 0){
            RestCall('PUT','/myproduct/'+obj.UID,obj, onSaveSuccess);
        }else{
            delete obj.UID;
            RestCall('POST','/myproduct',obj, onSaveSuccess);
        }    
    }
}


function openCreateProductModal(){
    $('#createProductModal').modal('show');
    this.productName = $('#product').val().replace('Create ','');
    $('#createProductModelTitle').html(`Are you sure you want to create this ${this.productName} product`)
}

function saveProduct(){
    let obj = {}
    obj.PID             = 0;
    obj.ProductName     = this.productName;
    obj.Department      = [];
    obj.IsActive        = 0;
    obj.PID             = 0
    RestCall('POST','/product',obj, onSaveProductSuccess);
}

async function onSaveProductSuccess(res){
    addProductInBrand({id:res.UID});
    loadProductTypeDropdown();
}

function addProductInBrand(e){
    if(e.id > 0){
        let obj = {};
        obj.ProductID = e.id;
        obj.PID = parseInt($('#brand').val());
        obj.IsActive   = 0;
        obj.Remarks    = '';
         RestCall('POST','/brandproduct',obj, onSaveBrandProductSuccess);
    }
}

 async function onSaveBrandProductSuccess(){
    showToast('Product has be save','success');
    $('#createProductModal').modal('hide');
}

function openCreateProductSeriesModal(){
    seriesName = $('#series').val();
    $('#createSeriesModal').modal('show');
    $('#createSeriesModelTitle').html('Are you sure you want to create this '+seriesName+' series')
}

function saveSeries(){
    let obj = {};
    obj.SeriesName = seriesName;
    obj.PID        = parseInt($('#brandid').val())
    obj.IsActive   = 0;
    obj.Remarks    = '';
    RestCall('POST','/brandseries',obj, onSaveBrandSeriesSuccess);
}

async function onSaveBrandSeriesSuccess(res){
    showToast('Series saved successfully','success')
    $('#series').val(res.SeriesName);
    $('#seriesid').val(res.UID);
    $('#createSeriesModal').modal('hide');
}

function openCreateProductSeriesModelModal(){
    modelName = $('#model').val()
    $('#createModelModal').modal('show');
    $('#createModelModelTitle').html('Are you sure you want to create this '+modelName+' model');
} 

function saveModel(){
    let obj = {};
    obj.ModelName = modelName;
    obj.PID       = parseInt($('#seriesid').val())
    obj.IsActive  = 0;
    obj.Remarks    = '';
    RestCall('POST','/brandseriesmodels',obj, onSaveBrandSeriesModelSuccess);
}

async function onSaveBrandSeriesModelSuccess(res){
    $('#modelid').val(res.UID)
    $('#model').val(res.ModelName)
    $('#createModelModal').modal('hide');
    showToast('Model created successfully','success');
}

function openCreateBrandModal() {
    this.brandName = $('#brand').val().replace('Create ','');
    $('#createBrandModelTitle').html(`Are you sure you want to create "${this.brandName}" brand`);
    $('#createBrandModal').modal('show');
}

function saveBrandModal(){
    let obj = {};
    obj.BrandName  = this.brandName;
    obj.IsActive   = 0;
    obj.IsVerified = 0;
    obj.Remarks    = '';
    RestCall('POST','/brand',obj, onSaveBrandModalSuccess);
}

async function onSaveBrandModalSuccess(res){
    showToast('Brand has been saved','success');
    loadProductDropDown();
    loadSeriesDropDown();
}


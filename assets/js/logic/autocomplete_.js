

// function associateBookingKeyUpEvents(){
//     associateDOMEvent('keyup'		, [
//         ['#brand'				, onBrandKeyUp],
//         ['#product'				, onProductKeyUp],
//         ['#productType'			, onProductTypeKeyUp],
//         ['#series'              , onSeriesKeyUp],
//         ['#model'              , onModelKeyUp],
//     ]);
// }

// Start Of Brand Lookup
function onBrandKeyUp(e){
    if (e.key === 'Backspace' || e.keyCode === 8) {
        return false; 
    }
    let blankobj = {};
    blankobj.brandname = 'Create '+$('#brand').val().trim();
    blankobj.uid = 0;
    blankobj.createnew = true;
    getLookup('#brand', brandLookupURL+$(this).val(), 0, onBrandGetData, onBrandCreateDDList, onBrandSelectItem, blankobj,openCreateBrandModal);
}

function onBrandGetData(){
    $('#brandid').val('');   

    $('#productid').val('');
    $('#product').val('');
    $('#producttypeid').val('');
    $('#productType').val('');
    $('#seriesid').val('');
    $('#series').val('');
    $('#modelid').val('');
    $('#model').val('');
}

function onBrandCreateDDList(item){
    let retobj = {}
    retobj.label =  item.brandname;
    retobj.id =  item.uid;
    if(item.createnew)
        retobj.createnew = 1
    else
        retobj.createnew = 0;

    return retobj;
}

function onBrandSelectItem(){
    let proucturl = baseurl+'/ep_dc/api/product';
    setSelect2AutoComplete('#product',productLookupURL+$('#brand').val(),'productname','ProductName',proucturl,onProductSelectItem);
}
// End Of Brand lookup


// Start Of Product lookup
function onProductKeyUp(e){
    if (e.key === 'Backspace' || e.keyCode === 8) {
        return false; 
    }

    var parentid = parseInt($('#brandid').val())
    if (!parentid){
        alert('Please select brand before select product');
        return;
    }
    let blankobj = {};
    blankobj.productname = 'Create '+$('#product').val().trim();
    blankobj.uid = 0;
    blankobj.createnew = true;
    getLookup('#product', productLookupURL+$('#brandid').val()+'/'+$(this).val(), 1, onProductGetData, onProductCreateDDList, onProductSelectItem, blankobj,openCreateProductModal);
}

function onProductGetData(){
    $('#productid').val('');   

    $('#producttypeid').val('');
    $('#productType').val('');
    $('#seriesid').val('');
    $('#series').val('');
    $('#modelid').val('');
    $('#model').val('');
}

function onProductCreateDDList(item){
    let retobj = {...item}
    retobj.label =  item.productname;
    retobj.id =  item.productid;
    if(item.createnew)
        retobj.createnew = 1
    else
        retobj.createnew = 0;

    return retobj;
}

function onProductSelectItem(ui){
    $('#product').val(ui.item.label.toUpperCase());
    $('#productid').val(ui.item.id);

    if(!ui.item.brandproductid){
        $('#productid').val(ui.item.productid);
        $('#brandproducttype').val(ui.item.brandseries)
    }

}
// End Of Product Lookup


// Start Of Series lookup
function onSeriesKeyUp(e){
    if (e.key === 'Backspace' || e.keyCode === 8) {
        return false; 
    }

    var parentid = parseInt($('#brandid').val())
    if (!parentid){
        alert('Please select brand before select product');
        return;
    }

    let blankobj = {};
    blankobj.seriesname = 'Create '+$('#series').val().trim();
    blankobj.uid = 0;
    blankobj.createnew = true;
    getLookup('#series', seriesLookupURL+$('#seriesid').val()+'/'+$(this).val(), 1, onSeriesGetData, onSeriesCreateDDList, onSeriesSelectItem, blankobj,openCreateProductSeriesModal);
}

function onSeriesGetData(){
    $('#seriesid').val('');
    
    $('#modelid').val('');
    $('#model').val('');
}

function onSeriesCreateDDList(item){
    let retobj = {...item}
    retobj.label =  item.seriesname;
    retobj.id =  item.uid;
    if(item.createnew)
        retobj.createnew = 1
    else
        retobj.createnew = 0;

    return retobj;
}

function onSeriesSelectItem(ui){
    $('#series').val(ui.item.label.toUpperCase());
    $('#seriesid').val(ui.item.id);
}
// End Of Series Lookup


// Start Of Series Model lookup
function onModelKeyUp(e){
    if (e.key === 'Backspace' || e.keyCode === 8) {
        return false; 
    } 

    var parentid = parseInt($('#brandid').val())
    if (!parentid){
        alert('Please select brand before select product');
        return;
    }

    let blankobj = {};
    blankobj.modelname = 'Create '+$('#model').val().trim();
    blankobj.uid = 0;
    blankobj.createnew = true;
    getLookup('#model', modelLookupURL+$('#seriesid').val()+'/'+$(this).val(), 1, onSeriesModelGetData, onSeriesModelCreateDDList, onSeriesModelSelectItem, blankobj,openCreateProductSeriesModelModal);
}

function onSeriesModelGetData(){
    $('#modelid').val('');   
}

function onSeriesModelCreateDDList(item){
    let retobj = {...item}
    retobj.label =  item.modelname;
    retobj.id =  item.uid;
    if(item.createnew)
        retobj.createnew = 1
    else
        retobj.createnew = 0;

    return retobj;
}

function onSeriesModelSelectItem(ui){
    $('#model').val(ui.item.label.toUpperCase());
    $('#modelid').val(ui.item.id);
}
// End Of Series Model Lookup


// Start Of Product Type lookup
function onProductTypeKeyUp(e){
    if (e.key === 'Backspace' || e.keyCode === 8) {
        return false; 
    }
    var parentid = parseInt($('#productid').val())
    if (!parentid){
        alert('Please select product before select product type');
        return;
    }

    let blankobj = {};
    blankobj.producttypename = 'Create '+$('#productType').val().trim();
    blankobj.uid = 0;
    blankobj.createnew = true;
    getLookup('#productType', productTypeLookupURL+$('#productid').val()+'/'+$(this).val(), 1, onProductTypeGetData, onProductTypeCreateDDList, onProductTypeSelectItem, blankobj,openCreateProductTypeModal);
}

function onProductTypeGetData(){
    $('#producttypeid').val('');   

    $('#seriesid').val('');
    $('#series').val('');
    $('#modelid').val('');
    $('#model').val('');
}

function onProductTypeCreateDDList(item){
    let retobj = {...item}
    retobj.label =  item.producttypename;
    retobj.id =  item.uid;
    if(item.createnew)
        retobj.createnew = 1
    else
        retobj.createnew = 0;

    return retobj;
}

function onProductTypeSelectItem(ui){
    $('#productType').val(ui.item.label.toUpperCase());
    $('#producttypeid').val(ui.item.id);
}
// End Of Product type Lookup


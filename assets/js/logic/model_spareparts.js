let ModuleName = 'Lookup';
let detailCall = false;
$(document).ready(function() {
    loadList();
    $('#btnNew').click(function () {
        resetDiv('#maincontent');
        preSetValue();
        $("#uid").val('');
        $("#name").val('');
        $("#part_no").val('');
        $("#remarks").val('');
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
});

let listData = [];

function preSetValue(){

}

function loadList(){
    showLoader();
    RestCall('GET','/lookups','', onLoadListSuccess);
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

async function onGetDetailByID(id){
    showLoader();
    resetDiv('#mailcontent');
    if(detailCall == true){
        RestCall('GET','/lookups/'+id,'',onGetDetailByIDSuccess)
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
        RestCall('PUT','/lookups/'+obj.UID,obj, onSaveSuccess);
    }else{
        delete obj.UID;
        RestCall('POST','/lookups',obj, onSaveSuccess);
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
    obj.UID       = parseInt($("#uid").val());
    obj.Name      = $("#name").val();
    obj.PartNo    = $("#part_no").val();
    obj.Remarks   = $("#remarks").val();
}

function dataObjToElement(obj){
    $("#uid").val(obj.UID);
    $("#name").val(obj.Name);
    $("#part_no").val(obj.part_no);
    $("#remarks").val(obj.remarsk);

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
    loadList();
}

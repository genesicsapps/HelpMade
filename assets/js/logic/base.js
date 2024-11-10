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

    $('#Edate').datepicker({
        dateFormat: "yy-mm-dd"
    });
});

let listData = [];

function preSetValue(){

}

function loadList(){
    showLoader();
    RestCall('GET','/brand','', onLoadListSuccess);
}

function onLoadListSuccess(r_data){
    var NotVisibleColumnsName = ['uuid','pid','modby','createdby','createddate','lastupdatedon'];
    listData = r_data;
    setDataTableNew(r_data,'#listTable',NotVisibleColumnsName,'onGetDetailByID');
}

function onGetDetailByID(id){
    showLoader();
    resetDiv('#mailcontent');
    if(detailCall == true){
        RestCall('GET','/heatmap/'+id,'',onGetDetailByIDSuccess)
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
    dataObjToElement(obj);
}

function onSave(){
    showLoader();
    let obj = {};    
    elementToDataObject(obj);

    if(parseInt(obj.UID) > 0){
        RestCall('PUT','/heatmap/'+obj.UID,obj, onSaveSuccess);
    }else{
        delete obj.UID;
        RestCall('POST','/heatmap',obj, onSaveSuccess);
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
    obj.UID = $("uid").val();
    obj.EntryDate = $("#Edate").val();
    obj.PID       = 54;
    obj.Shift     = $("#shift").val();
    obj.HeatNo    = $("#HeatNo").val();
    obj.ConLife    = parseInt($("#heat_ConLife").val());
    obj.TapHoleLife = parseInt($("#heat_TapHoleLife").val());
    obj.LanceLife = parseInt($("#heat_LanceLife").val());
    obj.Grade = $("#heat_Grade").val();
    obj.ScrapQty = parseInt($("#heat_ScrapQty").val());
    obj.HMQty = parseInt($("#heat_HMQty").val());
    obj.HMD_C = parseInt($("#heat_HMD_C").val());
    obj.HMD_MN = parseInt($("#heat_HMD_MN").val());
    obj.HMD_S = parseInt($("#heat_HMD_S").val());
    obj.HMD_P = parseInt($("#heat_HMD_P").val());
    obj.HMD_SI = parseInt($("#heat_HMD_SI").val());
}

function dataObjToElement(obj){
    $("#uid").val(obj.uid);
    $("#Edate").val(obj.entrydate);;
    $("#shift").val(obj.shift);
    $("#HeatNo").val(obj.heatno);
    $("#heat_ConLife").val(obj.conlife);
    $("#heat_TapHoleLife").val(obj.tapholelife);
    $("#heat_LanceLife").val(obj.lancelife);
    $("#heat_Grade").val(obj.grade);
    $("#heat_ScrapQty").val(obj.scrapqty);
    $("#heat_HMQty").val(obj.hmqty);
    $("#heat_HMD_C").val(obj.hmd_c);
    $("#heat_HMD_MN").val(obj.hmd_mn);
    $("#heat_HMD_S").val(obj.hmd_s);
    $("#heat_HMD_P").val(obj.hmd_p);
    $("#heat_HMD_SI").val(obj.hmd_si);
}

function onDelete(){
    $('#deleteModal').modal('show');
}

function deleteData(){
    let selectedId = $('#uid').val()
    RestCall('DELETE','/heatmap/'+selectedId,{}, onDeleteSuccess);
}

function onDeleteSuccess(){
    showToast(`${ModuleName} deleted successfully`,'success');
    $('#deleteModal').modal('hide');
    switchTabs('list','detail');
    resetDiv('#mailcontent');
    loadList();
}
let ModuleName = 'Lookup';
let detailCall = false;
let lookupGroupsList = [];
let lookupValidate = ['lookups_group','lookups_name','lookups_value'];
$(document).ready(function() {
    loadList();
    $('#btnNew').click(function () {
        resetDiv('#maincontent');
        preSetValue();
        $("#lookups_group").val('');
        $("#lookups_name").val('');
        $("#lookups_value").val('');
        $('#is_active').prop('checked', false);
        $('#is_verified').prop('checked', false);
        $('#lookValueTable').addClass('d-none');

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
let lookupGroups = [];

function preSetValue(){

}

function loadList(){
    showLoader();
    RestCall('GET','/lookup','', onLoadListSuccess);
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

    lookupGroups = [];
    $.each(listData,(i,e)=>{
        if(!lookupGroups.includes(e.LookupGroup)){
            lookupGroups.push(e.LookupGroup);
        }
    });

    $("#lookups_group").autocomplete({
        source: lookupGroups,
        select:function(){
            setTimeout(() => {
                loadLookupTable2($("#lookups_group").val())
                
            }, 200);
        }
    });

   
    formatLookupGroup();
    $('#looku_group_table').html(`
        <table id="groupListTable" class="display compact">

        </table>
    `)

    setDataTableNew(lookupGroupsList,'#groupListTable',NotVisibleColumnsName,'');

    var table = new DataTable(`#groupListTable`);
    $('#groupListTable tbody').on('click', 'tr', function () {
        $('#lookupValueTable_1').removeClass('d-none');
      loadLookupTable(table.row(this).data());
        
    });
}

function loadLookupTable(data){
    var NotVisibleColumnsName = ["PID",'ModBy','CreatedBy','CreatedOn','LastUpdatedOn','IsActive','IsVerified'];

    let array = [];
    $.each(listData, (i,e)=>{
        if(e.LookupGroup == data['Lookup Group']){
            array.push(e);
        }
    })
    setDataTableNew(array,'#groupValueListTable_1',NotVisibleColumnsName,'onGetDetailByID');
}

function formatLookupGroup(){
    let array = [];
    lookupGroupsList = [];
    $.each(listData,(i,e)=>{
      if(!array.includes(e.LookupGroup)){
        array.push(e.LookupGroup);
      }
    });
  
    $.each(array,(i,e)=>{
      lookupGroupsList.push({"Lookup Group":e});
    })
  }

async function onGetDetailByID(id){
    showLoader();
    resetDiv('#mailcontent');
    if(detailCall == true){
        RestCall('GET','/lookup/'+id,'',onGetDetailByIDSuccess)
    } 
    else{
        $.each(listData,(i,e)=>{
            if(id == e.UID){
                dataObjToElement(e);
                loadLookupTable2(e.LookupGroup)
            }
        })
        hideLoader();
    }
    switchTabs('detail','list');
}

function loadLookupTable2(lookupGroup){
    $('#lookValueTable').removeClass('d-none');
    var NotVisibleColumnsName = ["PID",'ModBy','CreatedBy','CreatedOn','LastUpdatedOn','IsActive','IsVerified',];

    let array = [];
    $.each(listData, (i,e)=>{
        if(e.LookupGroup == lookupGroup){
            array.push(e);
        }
    })
    setDataTableNew(array,'#groupValueListTable_2',NotVisibleColumnsName,'onGetDetailByID');
}

function onGetDetailByIDSuccess(msg){
    let obj = keysToLowerCase(msg)
    dataObjToElement(obj);
}

function onSave(){
    let obj = {};    
    elementToDataObject(obj);
    
    if(validateForm(lookupValidate)){
        showLoader();
        if(parseInt(obj.UID) > 0){
            RestCall('PUT','/lookup/'+obj.UID,obj, onSaveSuccess);
        }else{
            delete obj.UID;
            RestCall('POST','/lookup',obj, onSaveSuccess);
        }    
    }
}

function onSaveSuccess(msg){
    showToast(`${ModuleName} saved successfully`,'success');
    $('#lookupValueTable_1').addClass('d-none');

    isEditing = false;
    switchTabs('list','detail');
    resetDiv('#mailcontent');
    loadList();
    $('#btnNew').click()
}

function elementToDataObject(obj){
    obj.UID       = parseInt($("#uid").val());
    obj.LookupGroup = $("#lookups_group").val();
    obj.LookupName = $("#lookups_name").val();
    obj.LookupValue = $("#lookups_value").val();
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
    $("#lookups_group").val(obj.LookupGroup);
    $("#lookups_name").val(obj.LookupName);
    $("#lookups_value").val(obj.LookupValue);

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
    RestCall('DELETE','/lookup/'+selectedId,{}, onDeleteSuccess);
}

function onDeleteSuccess(){
    showToast(`${ModuleName} deleted successfully`,'success');
    $('#deleteModal').modal('hide');
    switchTabs('list','detail');
    $('#lookupValueTable_1').addClass('d-none');

    resetDiv('#mailcontent');
    loadList();
    $('#btnNew').click()  
}

<script src="<?php echo getJSPath('logic/lookups.js') ?>"></script>
<style>
        .full-screen-div {
            height: calc(100vh - 150px);; /* Set height to 100% of the viewport height */
            /* background-color: lightblue;  */
        }
    </style>
<div class="tx-13">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" id="list" data-bs-toggle="tab" href="#list_body" role="tab" aria-controls="list" aria-selected="true">List</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="detail" data-bs-toggle="tab" href="#detail_body" role="tab" aria-controls="detail" aria-selected="false">Detail</a>
        </li>
    </ul>
    <div class="tab-content bd bd-gray-400 bd-t-0 pd-10 full-screen-div" id="myTabContent">
        <div class="tab-pane fade show active" id="list_body" role="tabpanel" aria-labelledby="list-tab">
            <div id="list_table" class="row">
                <div id="looku_group_table" class="col-lg-6 col-sm-12">
                    <table id="groupListTable" class="display compact">

                    </table>
                </div>
                <div id="lookupValueTable_1" class="col-lg-6 col-sm-12 d-none">
                    <table id="groupValueListTable_1" class="display compact">

                    </table>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="detail_body" role="tabpanel" aria-labelledby="detail-tab">
        <div class="col-md-12">
            <button type="button" id="btnNew" class="btn btn-xs btn-primary">New</button>
            <button type="button" id="btnSave"  class="btn btn-xs btn-success">Save</button>
            <button type="button" id="btnDelete"  class="btn btn-xs btn-danger">Delete</button>
        </div>
        <br>
        <div id="maincontent" class="row" novalidate>
            <div class="row row-sm">
                <div class="col-lg-1 col-md-6 col-sm-12">
                    <label class="d-block">UID</label>
                    <input id="uid" type="text"  class="form-control" placeholder="UID" disabled>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <label class="d-block">Lookups Group<span class="tx-danger">*</span></label>
                    <input id="lookups_group" type="text" name="text" class="form-control" placeholder="lookups group">
                    <ul class="parsley-errors-list filled d-none">
                        <li class="parsley-required">Please enter lookup group</li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <label class="d-block">Lookups Name<span class="tx-danger">*</span></label>
                    <input id="lookups_name" type="text" name="text" class="form-control" placeholder="lookups key">
                    <ul class="parsley-errors-list filled d-none">
                        <li class="parsley-required">Please enter lookup name</li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <label class="d-block">Lookups Value<span class="tx-danger">*</span></label>
                    <input id="lookups_value" type="text" name="text" class="form-control" placeholder="lookups value">
                    <ul class="parsley-errors-list filled d-none">
                        <li class="parsley-required">Please enter lookup value</li>
                    </ul>
                </div>
                <div class="col-lg-1 col-md-6 col-sm-12 mt-4">
                    <div class="custom-control custom-checkbox mt-2">
                        <input type="checkbox" class="custom-control-input" id="is_active">
                        <label class="custom-control-label" for="">Is active</label>
                    </div>
                </div>
                <div class="col-lg-1 col-md-6 col-sm-12 mt-4">
                    <div class="custom-control custom-checkbox mt-2">
                        <input type="checkbox" class="custom-control-input" id="is_verified">
                        <label class="custom-control-label" for="">Is verified</label>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12 mg-t-10">
                    <label class="d-block">Remarks</label>
                    <input id="remarks" type="text" name="text" class="form-control" placeholder="Remarks">
                </div>
                <div id="lookValueTable" class="col-12 d-none">
                    <table id="groupValueListTable_2" class="display compact">

                    </table>
                </div>
            </div>
        </div>
    </div>
</div><!-- container -->


<!-- Modals -->
<?php echo view('modal_delete'); ?>

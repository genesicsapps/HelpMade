<script src="<?php echo getJSPath('logic/model_spareparts.js') ?>"></script>
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
            <div id="list_table" class="">
                <table id="listTable" class="display compact">

                </table>
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
                <div class="col-sm-2 mg-t-10">
                    <label class="d-block">UID</label>
                    <input id="uid" type="text"  class="form-control" placeholder="UID" disabled>
                </div>
                <div class="col-sm-2 mg-t-10">
                    <label class="d-block">Name</label>
                    <input id="name" type="text" name="text" class="form-control" placeholder="Name">
                </div>
                <div class="col-sm-2 mg-t-10">
                    <label class="d-block">Part No</label>
                    <input id="part_no" type="text" name="text" class="form-control" placeholder="Part No">
                </div>
                <div class="col-sm-2 mg-t-10">
                    <label class="d-block">Remarks</label>
                    <input id="remarks" type="text" name="text" class="form-control" placeholder="Remarks">
                </div>
            </div>
        </div>
    </div>
</div><!-- container -->


<!-- Modals -->
<?php echo view('modal_delete'); ?>

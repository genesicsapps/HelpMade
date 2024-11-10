<!-- <script src="<?php echo getJSPath('logic/common.js') ?>"></script> -->
<script src="<?php echo getJSPath('logic/product.js') ?>"></script>
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
    <div class="tab-content bd bd-gray-400 bd-t-0 pd-10 full-screen-div_disable" id="myTabContent">
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
                <div class="col-lg-1 col-md-6 col-sm-12 mg-t-10">
                    <label class="d-block">UID</label>
                    <input id="uid" type="text"  class="form-control" placeholder="UID" disabled>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12 mg-t-10">
                    <label class="d-block">Product name<span class="tx-danger">*</span></label>
                    <input id="product_name" type="text" name="text" class="form-control" placeholder="Product name">
                    <ul class="parsley-errors-list filled d-none">
                        <li class="parsley-required">Please enter product name</li>
                    </ul>
                </div>
                <div class="col-lg-8 col-sm-12 col-md-8 mg-t-10">
                    <label class="d-block">Department</label>
                    <select id="department" class="form-control select2" multiple="multiple">

                    </select>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12 mg-t-10">
                    <label class="d-block">Remarks</label>
                    <input id="remarks" type="text" name="text" class="form-control" placeholder="Remarks">
                </div>
                <div class="col-lg-1 col-md-6 col-sm-12 mt-4">
                    <input type="checkbox" class="d-block mx-3" id="is_active">
                    <label class="custom-control-label " for="">Is active</label>
                </div>
                <div class="col-lg-1 col-md-6 col-sm-12 mt-4">
                    <input type="checkbox" class="d-block mx-3" id="is_verified">
                    <label class="custom-control-label" for="">Is verified</label>
                </div>
                <div id="product_type_div" class="col-12 d-none mt-3">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="prductList" data-bs-toggle="tab" href="#prductList_body" role="tab" aria-controls="projectList_body" aria-selected="true">List</a>
                        </li>
                    </ul>
                    <div class="tab-content bd bd-gray-300 bd-t-0 pd-20" id="myTabContent">
                        <div class="tab-pane fade show active" id="prductList_body" role="tabpanel" aria-labelledby="home-tab">
                            <table id="productTypeListTable" class="display compact" style="width:100%">                                           

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div><!-- container -->


<!-- Modals -->
<?php echo view('modal_delete'); ?>
<?php echo view('modal_product_type'); ?>

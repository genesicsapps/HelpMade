<script src="<?php echo getJSPath('logic/myproduct.js') ?>"></script>
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
            <div class="row mb-3" id= "maincontent">
                <div class="col-lg-2 col-sm-6 col-md-6 mg-t-10" >
                    <label class="d-block">ID</label>
                    <input id="brandproducttypeid" type="hidden"  class="form-control" display="none">
                    <input id="uid" type="text" disabled class="form-control">
                </div>
                <!-- <div class="col-lg-2 col-sm-6 col-md-6 mg-t-10">
                    <label class="d-block">Brand ex<span class="tx-danger">*</span></label>
                    <select name="" id="mySelect2" style="width: 100%;"></select>
                </div> -->
                <div class="col-lg-2 col-sm-6 col-md-6 mg-t-10">
                    <label class="d-block">Brand<span class="tx-danger">*</span></label>
                    <input id="brandid" type="hidden"  class="form-control" display="none">
                    <select name="" id="brand" style="width: 100%;"></select>
                     <ul class="parsley-errors-list filled d-none">
                        <li class="parsley-required">Please select brand name</li>
                    </ul>
                </div>
                <div class="col-lg-3 col-sm-6 col-md-6 mg-t-10">
                    <label class="d-block">Product<span class="tx-danger">*</span></label>
                    <input id="productid" type="hidden"  class="form-control" display="none">
                    <select class="form-control select"  name="" id="product" style="width: 100%;"></select>
                     <ul class="parsley-errors-list filled d-none">
                        <li class="parsley-required">Please select product name</li>
                    </ul>
                </div>
                <div class="col-lg-3 col-sm-6 col-md-6 mg-t-10">
                    <label class="d-block">Product type<span class="tx-danger">*</span></label>
                    <input id="producttypeid" type="hidden"  class="form-control" display="none">
                    <select class="form-control select" name="" id="productType" style="width: 100%;"></select>

                     <ul class="parsley-errors-list filled d-none">
                        <li class="parsley-required">Please enter pruduct type name</li>
                    </ul>
                </div>
                <div class="col-lg-2 col-sm-6 col-md-6 mg-t-10">
                    <label class="d-block">Series<span class="tx-danger">*</span></label>
                    <input id="seriesid" type="hidden"  class="form-control" display="none">
                    <select class="form-control select" name="" id="series" style="width: 100%;"></select>

                     <ul class="parsley-errors-list filled d-none">
                        <li class="parsley-required">Please select series name</li>
                    </ul>
                </div>
                <div class="col-lg-2 col-sm-6 col-md-6 mg-t-10">
                    <label class="d-block">Model<span class="tx-danger">*</span></label>
                    <input id="modelid" type="hidden"  class="form-control" display="none">
                    <select class="form-control select" name="" id="model" style="width: 100%;"></select>
                     <ul class="parsley-errors-list filled d-none">
                        <li class="parsley-required">Please select model name</li>
                    </ul>
                </div>
                <div class="col-12">

                </div>
            </div>
        </div>
</div><!-- container -->

<!-- Modals -->
<?php echo view('modal_create_brand'); ?>
<?php echo view('modal_create_product'); ?>
<?php echo view('modal_create_product_type'); ?>
<?php echo view('modal_create_model'); ?>
<?php echo view('modal_create_series'); ?>




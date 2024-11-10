<script src="<?php echo getJSPath('logic/brand.js') ?>"></script>
<style>
        .full-screen-div {
            height: calc(100vh - 150px);; /* Set height to 100% of the viewport height */
            /* background-color: lightblue;  */
        }
        .select2-container {
  z-index: 1250; /* Ensure this is higher than the modal's z-index */
}

.ui-autocomplete {  
  z-index: 1250; /* Ensure this is higher than the modal's z-index */
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
            <?php echo view('crudbtn'); ?>

        </div>
        <br>
        <div id="maincontent" class="row" novalidate>
            <div class="row row-sm">
                <div class="col-lg-2 col-md-6 col-sm-12 mg-t-10">
                    <label class="d-block">UID</label>
                    <input id="uid" type="text"  class="form-control" placeholder="UID" disabled>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-12 mg-t-10">
                    <label class="d-block">Brand name <span class="tx-danger">*</span></label>
                    <input id="brand_name" type="text" name="text" class="form-control" placeholder="Brand name">
                    <ul class="parsley-errors-list filled d-none">
                        <li class="parsley-required">Please enter brand name</li>
                    </ul>
                </div>
                <div class="col-lg-1 col-md-6 col-sm-12 mt-4">
                    <div class="custom-control custom-checkbox mt-3">
                        <input type="checkbox" class="custom-control-input" id="is_active">
                        <label class="custom-control-label" for="">Is active</label>
                    </div>
                </div>
                <div class="col-lg-1 col-md-6 col-sm-12 mt-4">
                    <div class="custom-control custom-checkbox mt-3">
                        <input type="checkbox" class="custom-control-input" id="is_verified">
                        <label class="custom-control-label" for="">Is verified</label>
                    </div>
                </div>
                <div class="col-sm-2 mg-t-10">
                    <label class="d-block">Remarks</label>
                    <input id="remarks" type="text" name="text" class="form-control" placeholder="Remarks">
                </div>
                <div id="brand_series_product" class="col-12 mt-3">
                    <ul class="nav nav-tabs" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="product" data-bs-toggle="tab" href="#product_body" role="tab" aria-controls="profile" aria-selected="false">Product</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " id="series" data-bs-toggle="tab" href="#series_body" role="tab" aria-controls="home" aria-selected="true">Series</a>
                        </li>
                    </ul>
                    <div class="tab-content bd bd-gray-300 bd-t-0 pd-20">
                        <div class="tab-pane fade" id="series_body" role="tabpanel" aria-labelledby="home-tab">
                           <div class="row">
                                <div class="col-6">
                                    <table id="seriesTable" class="display compact">

                                    </table>
                                </div>
                                <div class="col-6">
                                    <table id="seriesModelTable" class="display compact">

                                    </table>
                                </div>
                           </div>
                        </div>
                        <div class="tab-pane fade active show" id="product_body" role="tabpanel" aria-labelledby="profile-tab">
                            <div class="row">
                                <div class="col-6">
                                    <table id="productTable" class="display compact">

                                    </table>
                                </div>
                                <div class="col-6">
                                    <table id="productTypeTable" class="display compact">

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div><!-- container -->


<!-- Modals -->
<?php echo view('modal_delete'); ?>
<?php echo view('modal_brand_product'); ?>
<?php echo view('modal_brand_series'); ?>
<?php echo view('modal_brand_series_model'); ?>
<?php echo view('modal_brand_product_type'); ?>
<?php echo view('modal_create_product_type'); ?>
<?php echo view('modal_create_product'); ?>

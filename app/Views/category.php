<script src="<?php echo getJSPath('logic/category.js') ?>"></script>
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
                <div class="col-lg-1 col-sm-6 col-md-6 mg-t-10">
                    <label class="d-block">UID</label>
                    <input id="uid" type="text"  class="form-control" placeholder="UID" disabled>
                </div>
                <div class="col-lg-4 col-sm-6 col-md-6 mg-t-10">
                    <label class="d-block">Category name</label>
                    <input id="cateory_name" type="text" name="text" class="form-control" placeholder="Category name">
                </div>
                <div class="col-lg-4 col-sm-6 col-md-6 mg-t-10">
                    <label class="d-block">Parent Category</label>
                    <select id="parend_category" type="text" name="text" class="form-control select2" placeholder="Type name">
                       
                    </select>
                </div>
                <div class="col-lg-2 col-sm-6 col-md-6 mg-t-10">
                    <label class="d-block">Type name</label>
                    <select id="type_name" type="text" name="text" class="form-control select2" placeholder="Type name">
                        <option value="0">Select</option>
                        <option value="CATEGORY">CATEGORY</option>
                        <option value="SUBCATEGORY">SUBCATEGORY</option>
                        <option value="SERIES">SERIES</option>
                        <option value="MODEL">MODEL</option>
                    </select>
                </div>
                <div class="col-lg-6 col-sm-6 col-md-6 mg-t-10">
                    <label class="d-block">Department</label>
                    <select id="department" class="form-control select2" multiple="multiple">

                    </select>

                </div>
            </div>
        </div>
    </div>
</div><!-- container -->


<!-- Modals -->
<?php echo view('modal_delete'); ?>

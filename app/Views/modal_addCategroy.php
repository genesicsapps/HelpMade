<div class="modal fade" id="addCategroyModal" tabindex="-1" aria-labelledby="exampleModalLabel6" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content tx-14">
        <div class="modal-header">
        <h6 class="modal-title" id="exampleModalLabel6">Add Department</h6>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true"></span>
        </button>
        </div>
        <div class="modal-body">
            <div class="row">
            <div class="col-12">
                    <label class="d-block">Product name</label>
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
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary tx-13" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary tx-13" onclick="modalSaveCategory()">Save</button>
        </div>
    </div>
    </div>
</div>
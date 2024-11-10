<div class="modal fade" id="brandSeriesModal" tabindex="-1" aria-labelledby="exampleModalLabel6" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content tx-14">
        <div class="modal-header">
        <h6 class="modal-title" id="exampleModalLabel6">Series</h6>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true"></span>
        </button>
        </div>
        <div class="modal-body" id="maincontent">
            <div class="row">
                <div class="col-2">
                    <label class="d-block">UID</label>
                    <input id="series_uid" type="text"  class="form-control" placeholder="UID" disabled>
                </div>
                <div class="col-10">
                    <label class="d-block">Series</label>
                    <input id="series_name" type="text"  class="form-control focus" placeholder="series name" >
                </div>
                <div class="col-12">
                    <label class="d-block">Remarks</label>
                    <input id="series_remarks" type="text" name="text" class="form-control" placeholder="Remarks">
                </div>
                <div class="col-3">
                    <label class="d-block">Is active</label>
                    <input type="checkbox" class="custom-control-input" id="series_is_active">
                </div>
                <div class="col-3">
                    <label class="d-block">Is verified</label>
                    <input type="checkbox" class="custom-control-input" id="series_is_verified">
                </div>
            </div>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary tx-13" data-bs-dismiss="modal">Close</button>
        <button type="button" id = "SeriesBtnSave" onclick="saveBrandSeries()" class="btn btn-primary tx-13">Save</button>
        </div>
    </div>
    </div>
</div>

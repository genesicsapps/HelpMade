<script src="<?php echo getJSPath('logic/customers.js') ?>"></script>
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
                <table id="listTable" class="display compact"></table>
            </div>
        </div>
        <div class="tab-pane fade" id="detail_body" role="tabpanel" aria-labelledby="detail-tab">
        <div class="col-md-12">
            <?php echo view('crudbtn'); ?>
        </div>
        <br>
        <div id="maincontent" class="row" novalidate>
            <div class="row row-sm">
                <div class="col-sm-2 mg-t-10">
                    <label class="d-block">UID</label>
                    <input id="uid" type="text"  class="form-control" placeholder="UID" disabled>
                </div>
                <div class="col-sm-2 mg-t-10">
                    <label class="d-block">Date</label>
                    <input id="Edate" type="text" name="date" class="form-control" placeholder="Date">
                </div>
                <div class="col-sm-2 mg-t-10">
                    <label class="d-block">Heat No</label>
                    <input id="HeatNo" type="number" name="" class="form-control" rows="2" placeholder="Heat No">
                </div>
                <div class="col-sm-2 mg-t-10">
                    <label class="d-block">Con life</label>
                    <input id="heat_ConLife" type="number" name="" class="form-control" rows="2" placeholder="Con life">
                </div>
                <div class="col-sm-2 mg-t-10">
                    <label class="d-block">Tap hole life</label>
                    <input id="heat_TapHoleLife" type="number" name="" class="form-control" rows="2" placeholder="Tap hole life">
                </div>
                <div class="col-sm-2 mg-t-10">
                    <label class="d-block">Lance life</label>
                    <input id="heat_LanceLife" type="number" name="" class="form-control" rows="2" placeholder="Lance life">
                </div>
                <div class="col-sm-2 mg-t-10">
                    <label class="d-block">Grade</label>
                    <input id="heat_Grade" type="number" name="" class="form-control" rows="2" placeholder="Grade">
                </div>
                <div class="col-sm-2 mg-t-10">
                    <label class="d-block">Scrap qty</label>
                    <input id="heat_ScrapQty" type="number" name="" class="form-control" rows="2" placeholder="Scrap qty">
                </div>
                <div class="col-sm-2 mg-t-10">
                    <label class="d-block">HM qty</label>
                    <input id="heat_HMQty" type="number" name="" class="form-control" rows="2" placeholder="HM qty">
                </div>
                <div class="col-sm-2 mg-t-10">
                    <label class="d-block">HMD C</label>
                    <input id="heat_HMD_C" type="number" name="" class="form-control" rows="2" placeholder="HMD C">
                </div>
                <div class="col-sm-2 mg-t-10">
                    <label class="d-block">HMD MN</label>
                    <input id="heat_HMD_MN" type="number" name="" class="form-control" rows="2" placeholder="HMD MN">
                </div>
            </div>
        </div>
    </div>
</div><!-- container -->


<!-- Modals -->
<?php echo view('modal_delete'); ?>

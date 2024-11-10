<script src="<?php echo getJSPath('logic/department.js') ?>"></script>
<style>
        .full-screen-div {
            height: calc(100vh - 150px);; /* Set height to 100% of the viewport height */
            /* background-color: lightblue;  */
        }
    </style>
<div class="tx-13">
    <div data-label="Department" class="df-example">
        <div id="list_table" class="">
            <table id="listTable" class="display compact">

            
            </table>
        </div>
    </div>
</div><!-- container -->


<!-- Modals -->  
<?php echo view('modal_Department'); ?> 

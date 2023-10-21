<template>
    <!-- Self Pickup Radio Button -->
    <div class="card mb-3">
        <div class="card-header">
            <div class="form-check">
                <label class="btn btn-lg btn-default">
                    <input type="radio" class="form-check-input" id="radio1" name="radios" value="pickup"
                        data-toggle="collapse" data-target="#pickup" aria-expanded="true" aria-controls="pickup">
                    <label class="form-check-label" for="radio1">Self Pickup (Free)</label>
                </label>
            </div>
        </div>
        <!-- Collapsible panel -->
        <div id="pickup" class="collapse">
            <div class="card-body">
                <div id="map"></div>
                <div>
                    <p>{Store Name}</p>
                    <p>{Seller's Address}</p>
                    <p>{Opening Hours}</p>
                </div>
                <div>
                    <p>
                        Choose a pickup time!
                    </p>
                </div>
                <!-- Calendar -->
                <form>
                    <input class="form-control" type="datetime-local" name="slot" placeholder="Select Date & Time">
                </form>


            </div>
        </div>
    </div>

    <!-- Delivery Radio Button -->
    <div class="card mb-3">
        <div class="card-header">
            <div class="form-check">
                <label class="btn btn-lg btn-default">
                    <input type="radio" class="form-check-input" id="radio2" name="radios" value="deliver"
                        data-toggle="collapse" data-target="#delivery" aria-expanded="true" aria-controls="delivery">
                    <label class="form-check-label" for="radio2">Doorstep Delivery ($20)</label>
                </label>
            </div>
        </div>
        <!-- Collapsible panel -->
        <div id="delivery" class="collapse">
            <div class="card-body">

                <h5>Address</h5>
                <div class="form-row mt-4">
                    <div class="col">
                        <input type="text" placeholder="Street Name, Building" />
                    </div>
                    <br />
                    <div class="col-12 col-sm-6">
                        <input type="text" placeholder="Postal Code" />
                    </div>
                    <br />
                    <div class="col-6 col-sm-3 mt-4 mt-sm-0">
                        <input type="text" placeholder="Unit No." />
                    </div>

                    <br />
                    <h5>Contact Number</h5>
                    <div class="form-row mt-4">
                        <div class="col">
                            <input type="text" placeholder="Name" />
                        </div>
                        <br />
                        <div class="col-12 col-sm-6">
                            <input type="text" placeholder="Phone Number" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Delivery",
    data() {
        return {};
    }
};

$('#pickup, #delivery').collapse('hide');
$('input[name="radios"]').change(function () {
    if ($('#radio1').is(":checked")) {
        $('#pickup').collapse('show');
    } else {
        $('#pickup').collapse('hide');
    }
    if ($('#radio2').is(":checked")) {
        $('#delivery').collapse('show');
    } else {
        $('#delivery').collapse('hide');
    }
});
</script>

<style>
    body {
  margin: 30px;
}
.container {
  margin-top: 30px;
}

</style>

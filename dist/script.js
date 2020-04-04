$(document).ready(function() {
        $('#multiple-checkboxes').multiselect({
          includeSelectAllOption: true,
        });
    });
function d(){
  console.log($("#multiple-checkboxes option:selected").text());
}

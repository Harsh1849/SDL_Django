$(document).ready(function () {
    $("#searchInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("table tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    // Add click event to table headers for sorting (optional)
    $("th[data-field]").click(function () {
        var field = $(this).data("field");
        var sortType = $(this).data("sort-type");
        var rows = $("tbody tr").get();
        rows.sort(function (a, b) {
            var aValue = $(a).find("td:eq(" + field + ")").text();
            var bValue = $(b).find("td:eq(" + field + ")").text();
            if (field === 0) {
                // For the "Date & Time" column, convert the date string to Date objects for comparison
                aValue = new Date(aValue).getTime();
                bValue = new Date(bValue).getTime();
            }
            return sortType === "asc" ? aValue - bValue : bValue - aValue;
        });
        // Toggle the sort type for the next click
        $(this).data("sort-type", sortType === "asc" ? "desc" : "asc");
        $("tbody").empty().append(rows);
    });

    $("#downloadExcelButton").click(function () {
        // Export table to Excel
        var table = $(".table")[0];
        var wb = XLSX.utils.table_to_book(table, { sheet: "data_sheet" });
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
        var blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, "data_export.xlsx");
    });
});
let itemNameElm = document.getElementById("item");
let qntityElm = document.getElementById("quty");
let sellingPrice = document.getElementById("sell");
let stockElm = document.getElementById("stock");
let totalElm = document.getElementById("total");
let tempTotal = document.getElementById("posnic_total");
let grandTotalElm = document.getElementById("grand_total");
let mainGrandTotalElm = document.getElementById("main_grand_total");
let discountElm = document.getElementById("discount");
let discountAmountElm = document.getElementById("disacount_amount");
let payableAmountElm = document.getElementById("payable_amount");


$(document).ready(function () {
    // validate signup form on keyup and submit
    $("#form1").validate({
        rules: {
            bill_no: {
                required: true,
                minlength: 3,
            },
            stockid: {
                required: true,
            },
            grand_total: {
                required: true,
            },
            supplier: {
                required: true,
            },
        },
        messages: {
            supplier: {
                required: "Please Enter Supplier",
            },
            stockid: {
                required: "Please Enter Stock ID",
            },
            grand_total: {
                required: "Add Stock Items",
            },
            bill_no: {
                required: "Please Enter Bill Number",
                minlength: "Bill Number must consist of at least 3 characters",
            },
        },
    });
    $("#supplier").autocomplete("customer1.php", {
        width: 160,
        autoFill: true,
        selectFirst: true,
    });
    $("#item").autocomplete("stock.php", {
        width: 160,
        autoFill: true,
        mustMatch: true,
        selectFirst: true,
    });
    $("#item").blur(function () {
        totalElm.value =
            sellingPrice.value *
            qntityElm.value;
    });
    $("#item").blur(function () {
        $.post(
            "check_item_details.php",
            { stock_name1: $(this).val() },
            function (data) {
                $("#sell").val(data.sell);
                $("#stock").val(data.stock);
                $("#guid").val(data.guid);
                if (data.sell != undefined) $("#0").focus();
            },
            "json"
        );
    });
    $("#supplier").blur(function () {
        $.post(
            "check_customer_details.php",
            { stock_name1: $(this).val() },
            function (data) {
                $("#address").val(data.address);
                $("#contact1").val(data.contact1);

                if (data.address != undefined) $("#0").focus();
            },
            "json"
        );
    });
    $("#test1").jdPicker();
    $("#test2").jdPicker();

    var hauteur = 0;
    $(".code").each(function () {
        if ($(this).height() > hauteur) hauteur = $(this).height();
    });

    $(".code").each(function () {
        $(this).height(hauteur);
    });
});

/**
 * Custom functions for Using in DOM
 */

function numbersonly(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (
        unicode != 8 &&
        unicode != 46 &&
        unicode != 37 &&
        unicode != 38 &&
        unicode != 39 &&
        unicode != 40
    ) {
        //if the key isn't the backspace key (which we should allow)
        if (unicode < 48 || unicode > 57) return false;
    }
}
function edit_stock_details(id) {
    document.getElementById("display").style.display = "block";

    itemNameElm.value = document.getElementById(id + "st").value;
    qntityElm.value = document.getElementById(id + "q").value;
    sellingPrice.value = document.getElementById(id + "s").value;
    stockElm.value = document.getElementById(id + "p").value;
    totalElm.value = document.getElementById(id + "to").value;
    tempTotal.value = document.getElementById(id + "to").value;

    document.getElementById("guid").value = id;
    document.getElementById("edit_guid").value = id;
}
function clear_data() {
    document.getElementById("display").style.display = "none";

    itemNameElm.value = "";
    qntityElm.value = "";
    sellingPrice.value = "";
    stockElm.value = "";
    totalElm.value = "";
    tempTotal.value = "";

    document.getElementById("guid").value = "";
    document.getElementById("edit_guid").value = "";
}
function add_values() {
    if (unique_check()) {
        if (document.getElementById("edit_guid").value == "") {
            if (
                itemNameElm.value != "" &&
                qntityElm.value != "" &&
                totalElm.value != ""
            ) {
                code = itemNameElm.value;

                quty = qntityElm.value;
                sell = sellingPrice.value;
                disc = stockElm.value;
                total = totalElm.value;
                item = document.getElementById("guid").value;
                main_total = tempTotal.value;

                $(
                    "<tr id=" +
                    item +
                    "><td><input type=hidden value=" +
                    item +
                    " id=" +
                    item +
                    'id ><input type=text name="stock_name[]"  id=' +
                    item +
                    'st style="width: 150px" class="round  my_with" ></td><td><input type=text name=quty[] readonly="readonly" value=' +
                    quty +
                    " id=" +
                    item +
                    'q class="round  my_with" style="text-align:right;" ></td><td><input type=text name=sell[] readonly="readonly" value=' +
                    sell +
                    " id=" +
                    item +
                    's class="round  my_with" style="text-align:right;"  ></td><td><input type=text name=stock[] readonly="readonly" value=' +
                    disc +
                    " id=" +
                    item +
                    'p class="round  my_with" style="text-align:right;" ></td><td><input type=text name=jibi[] readonly="readonly" value=' +
                    total +
                    " id=" +
                    item +
                    'to class="round  my_with" style="width: 120px;margin-left:20px;text-align:right;" ><input type=hidden name=total[] id=' +
                    item +
                    "my_tot value=" +
                    main_total +
                    '> </td><td><input type=button value="" id=' +
                    item +
                    ' style="width:30px;border:none;height:30px;background:url(images/edit_new.png)" class="round" onclick="edit_stock_details(this.id)"  ></td><td><input type=button value="" id=' +
                    item +
                    ' style="width:30px;border:none;height:30px;background:url(images/close_new.png)" class="round" onclick= $(this).closest("tr").remove() ></td></tr>'
                )
                    .fadeIn("slow")
                    .appendTo("#item_copy_final");
                qntityElm.value = "";
                sellingPrice.value = "";
                stockElm.value = "";
                totalElm.value = "";
                itemNameElm.value = "";
                document.getElementById("guid").value = "";
                if (grandTotalElm.value == "") {
                    grandTotalElm.value = main_total;
                } else {
                    grandTotalElm.value =
                        parseFloat(grandTotalElm.value) +
                        parseFloat(main_total);
                }
                mainGrandTotalElm.value =
                    "$ " +
                    parseFloat(grandTotalElm.value).toFixed(2);
                document.getElementById(item + "st").value = code;
                document.getElementById(item + "to").value = total;
            } else {
                alert("Please Select An Item");
            }
        } else {
            id = document.getElementById("edit_guid").value;
            document.getElementById(id + "st").value = itemNameElm.value;
            document.getElementById(id + "q").value = qntityElm.value;
            document.getElementById(id + "s").value = sellingPrice.value;
            document.getElementById(id + "p").value = stockElm.value - qntityElm.value;
            document.getElementById(id + "to").value = totalElm.value;
            // console.log(parseFloat(tempTotal.value))
            data1 = parseFloat(grandTotalElm.value) + (parseFloat(totalElm.value) - parseFloat(tempTotal.value));
            mainGrandTotalElm.value = data1;
            grandTotalElm.value = data1;

            // document.getElementById('grand_total').value=parseFloat(document.getElementById('grand_total').value)+parseFloat(document.getElementById('total').value);
            //alert(data1);
            //alert(parseFloat(document.getElementById(id+'my_tot').value));
            //alert(parseFloat(document.getElementById('posnic_total').value));
            // balance_amount();

            document.getElementById(id + "my_tot").value = totalElm.value;
            qntityElm.value = "";
            sellingPrice.value = "";
            stockElm.value = "";
            totalElm.value = "";
            itemNameElm.value = "";
            document.getElementById("guid").value = "";
            document.getElementById("edit_guid").value = "";
            document.getElementById('posnic_total').value = ""
        }
        document.getElementById("display").style.display = "none";

    }
    discount_amount();
}
function unique_check() {
    if (
        !document.getElementById(document.getElementById("guid").value) ||
        document.getElementById("edit_guid").value ==
        document.getElementById("guid").value
    ) {
        return true;
    } else {
        alert("This Item is already added In This Purchase");
        itemNameElm.focus();
        id = document.getElementById("edit_guid").value;

        itemNameElm.focus();
        itemNameElm.value = document.getElementById(
            id + "st"
        ).value;
        qntityElm.value = document.getElementById(
            id + "q"
        ).value;
        sellingPrice.value = document.getElementById(
            id + "s"
        ).value;
        stockElm.value = document.getElementById(
            id + "p"
        ).value;
        totalElm.value = document.getElementById(
            id + "to"
        ).value;
        document.getElementById("guid").value = id;
        document.getElementById("edit_guid").value = id;
        return false;
    }
}
function total_amount() {
    totalElm.value = sellingPrice.value * qntityElm.value;
    // tempTotal.value = document.getElementById( "total").value;
    // document.getElementById('total').value = '$ ' + parseFloat(document.getElementById('total').value).toFixed(2);
    // balance_amount();
}
function balance_amount() {
    if (grandTotalElm.value != "") {
        data = parseFloat(grandTotalElm.value);
        // document.getElementById("balance").value = data - parseFloat(document.getElementById("payment").value);
        if (parseFloat(grandTotalElm.value) >= parseFloat(document.getElementById("payment").value)) {
            document.getElementById("balance").value = parseFloat(grandTotalElm.value) - parseFloat(document.getElementById("payment").value);
        } else {
            if (grandTotalElm.value != "") {
                document.getElementById("balance").value = "000.00";
                document.getElementById("payment").value = parseFloat(
                    grandTotalElm.value
                );
            } else {
                document.getElementById("balance").value = "000.00";
                document.getElementById("payment").value = "";
            }
        }
    } else {
        document.getElementById("balance").value = "";
    }
}
function quantity_chnage(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (unicode != 13 && unicode != 9) {
        let qty = document.getElementById("quty");
        let selling_price = document.getElementById("sell");
        let totalValue = document.getElementById("total");
        // let stockAmount = document.getElementById("stock");
        // stockAmount.value = stockAmount.value - qty.value;
        totalValue.value = qty.value * selling_price.value;
    }
    if (unicode != 27) {
    } else {
        itemNameElm.focus();
    }
}

function numbersonly(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (
        unicode != 8 &&
        unicode != 46 &&
        unicode != 37 &&
        unicode != 27 &&
        unicode != 38 &&
        unicode != 39 &&
        unicode != 40 &&
        unicode != 9
    ) {
        //if the key isn't the backspace key (which we should allow)
        if (unicode < 48 || unicode > 57) return false;
    }
}
function stock_size() {
    //alert(document.getElementById('stock').value);
    if (
        parseFloat(qntityElm.value) >
        parseFloat(stockElm.value)
    ) {
        qntityElm.value = document.getElementById(
            "stock"
        ).value;
    }
}
function discount_amount() {
    if (grandTotalElm.value != "") {
        if (discountElm.value > 0) {
            discountAmountElm.value = (parseFloat(grandTotalElm.value) * parseFloat(discountElm.value)) / 100;
        }
        let discont = parseFloat(discountAmountElm.value) || 0;
        payableAmountElm.value = parseFloat(grandTotalElm.value) - discont;
    }
}
function reduce_balance(id) {
    var minus = parseFloat(document.getElementById(id + "my_tot").value);
    grandTotalElm.value =
        parseFloat(grandTotalElm.value) - minus;
    mainGrandTotalElm.value =
        "$ " + parseFloat(grandTotalElm.value).toFixed(2);
    discount_amount();
    //console.log(id);
}
function discount_type() {
    if (document.getElementById("round").checked) {
        document.getElementById("discount").readOnly = true;
        document.getElementById("disacount_amount").readOnly = false;
        if (parseFloat(document.getElementById("grand_total")) != "") {
            discountAmountElm.value = "";
            discountElm.value = "";
            discount_amount();
        }
    } else {
        document.getElementById("discount").readOnly = false;
        document.getElementById("disacount_amount").readOnly = true;
    }
}
function discount_as_amount() {
    if (
        parseFloat(discountAmountElm.value) >
        parseFloat(grandTotalElm.value)
    )
        discountAmountElm.value = "";
    payableAmountElm.value = parseFloat(
        grandTotalElm.value
    );

    if (grandTotalElm.value != "") {
        if (
            parseFloat(discountAmountElm.value) <
            parseFloat(grandTotalElm.value)
        ) {
            discont = parseFloat(discountAmountElm.value);

            payableAmountElm.value =
                parseFloat(grandTotalElm.value) - discont;
            if (
                parseFloat(document.getElementById("payment").value) >
                parseFloat(payableAmountElm.value)
            ) {
                document.getElementById("payment").value = parseFloat(
                    payableAmountElm.value
                );
            }
        } else {
            // document.getElementById('disacount_amount').value=parseFloat(document.getElementById('grand_total').value)-1;
        }
    }
}

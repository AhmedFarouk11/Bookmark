var Site_name = document.getElementById("Bookmarkname");
var site_url = document.getElementById("Bookmarkurl");
var Submit = document.getElementById("Submit");
var site_arr = [];
if (localStorage.getItem("sites") !== null) {
    site_arr = JSON.parse(localStorage.getItem("sites"));
    dispaly_website()
}
function Add_Data() {

    if (SiteNameValidation() && SiteUrlValidation()) {
        Submit.classList.remove("disabled");

        var website = {
            website_name: Site_name.value,
            website_url: site_url.value,
        };

        Swal.fire({
            title: "Are you sure You want to Add this website?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00A884",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Add it!",
        }).then((result) => {
            if (result.isConfirmed) {
                // Add website to the array and localStorage
                site_arr.push(website);
                localStorage.setItem("sites", JSON.stringify(site_arr));
                dispaly_website(); // Call display function
                Swal.fire({
                    title: "Added to the list!",
                    text: "Your Website has been added.",
                    icon: "success",
                });
            } else {
                Swal.fire({
                    title: "Cancelled",
                    text: "Your website was not added.",
                    icon: "info",
                });
            }
        });
        clear_inputs()
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Site Name or Url is not valid, Please follow the rules below : Site name must contain at least 3 characters Site URL must be a valid oneSomething went wrong!"
          });
    }
}

// Attach event listeners to input fields to re-enable the button when valid data is entered


function dispaly_website() {
    var rowdata = ""
    for (var i = 0; i < site_arr.length; i++) {
        rowdata += ` <tr>
                            <td id="index_id">
                            ${i + 1}
                            </td>
                            <td id="website_nameid">
                            ${site_arr[i].website_name}
                            </td>
                            <td>
                             <button class="btn bg-success text-white" onclick="handleVisit('${site_arr[i].website_url}')">
                                        <span><i class="fa-regular fa-eye"></i></span>
                                        Visit
                                    </button>
                                                              
                            </td>
                            <td>
                                <button onclick = "Delete_website(${i})" class="btn bg-danger text-white">
                                    <span><i class="fa-regular fa-trash-can"></i></span>
                                    Delete
                                </button>
                            </td>
                        </tr>`
    }
    document.getElementById("tabledata").innerHTML = rowdata
}
function Delete_website(index) {
    Swal.fire({
        title: "Are you sure You want to delete this website?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "primary",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            site_arr.splice(index, 1)
            localStorage.setItem("sites", JSON.stringify(site_arr))
            dispaly_website()
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });

}
function clear_inputs() {
    Site_name.value = null
    site_url.value = null
    Site_name.classList.remove("is-valid")
    site_url.classList.remove("is-valid")
}
function Nav_website() {
    let timerInterval;
    Swal.fire({
        title: "Wait!",
        html: "",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
        }
    });
}
function handleVisit(url) {
    Nav_website();
    setTimeout(() => {
        window.open(url, "_blank");
    }, 2000);
}
function SiteNameValidation() {
    var alert_name = document.getElementById("Alert_name")
    var ragex = /^(?![-_])[a-zA-Z0-9-_]{3,63}(?<![-_])$/
    var website_namevar = Site_name.value
    if (ragex.test(website_namevar)) {
        Site_name.classList.add("is-valid")
        Site_name.classList.remove("is-invalid")
        alert_name.classList.add("d-none")
        return true
    }
    else {
        Site_name.classList.add("is-invalid")
        Site_name.classList.remove("is-valid")
        alert_name.classList.remove("d-none")
        return false
    }

}
function SiteUrlValidation() {
    var alert_Url = document.getElementById("Alert_Url")
    var ragex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gm
    var website_urlvar = site_url.value
    if (ragex.test(website_urlvar)) {
        site_url.classList.add("is-valid")
        site_url.classList.remove("is-invalid")
        alert_Url.classList.add("d-none")
        return true
    }
    else {
        site_url.classList.add("is-invalid")
        site_url.classList.remove("is-valid")
        alert_Url.classList.remove("d-none")
        return false
    }

}

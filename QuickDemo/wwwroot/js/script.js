var imageArry = [];
//I added event handler for the file upload control to access the files properties.
document.addEventListener("DOMContentLoaded", init, false);

//To save an array of attachments
var AttachmentArray = [];

//counter for attachment array
var arrCounter = 0;

//to make sure the error message for number of files will be shown only one time.
var filesCounterAlertStatus = false;

//un ordered list to keep attachments thumbnails
var ul = document.createElement("ul");
ul.className = "thumb-Images";
ul.id = "imgList";

function init() {
    //add javascript handlers for the file upload event
    document
        .querySelector("#files")
        .addEventListener("change", handleFileSelect, false);
}
//the handler for file upload event
function handleFileSelect(e) {

    //to make sure the user select file/files
    if (!e.target.files) return;

    //To obtaine a File reference
    var files = e.target.files;

    // Loop through the FileList and then to render image files as thumbnails.
    for (var i = 0, f; (f = files[i]); i++) {
        //instantiate a FileReader object to read its contents into memory
        var fileReader = new FileReader();

        // Closure to capture the file information and apply validation.
        fileReader.onload = (function (readerEvt) {
            return function (e) {
                //Apply the validation rules for attachments upload
                ApplyFileValidationRules(readerEvt);

                //Render attachments thumbnails.
                RenderThumbnail(e, readerEvt);

                //Fill the array of attachment
                FillAttachmentArray(e, readerEvt);
            };
        })(f);

        // Read in the image file as a data URL.
        // readAsDataURL: The result property will contain the file/blob's data encoded as a data URL.
        // More info about Data URI scheme https://en.wikipedia.org/wiki/Data_URI_scheme
        fileReader.readAsDataURL(f);

    }
    document
        .getElementById("files")
        .addEventListener("change", handleFileSelect, false);
}

function removeimagesfromArry(e, id) {

    if (confirm("Are you sure you want to delete this?")) {
        // $("#delete-button").attr("href", "query.php?ACTION=delete&ID='1'");
        imageArry = imageArry.filter(prop => prop.name !== e);
        console.log(imageArry);
        /*  $('#' + id).parent().remove();*/
        $('#liimg' + id.split('.')[0]).remove();
    }
    else {
        return false;
    }
}

//Apply the validation rules for attachments upload
function ApplyFileValidationRules(readerEvt) {
    //To check file type according to upload conditions
    if (CheckFileType(readerEvt.type) == false) {
        alert(
            "The file (" +
            readerEvt.name +
            ") does not match the upload conditions, You can only upload jpg/png/gif/pdf/excel files"
        );
        e.preventDefault();
        return;
    }

    //To check file Size according to upload conditions
    if (CheckFileSize(readerEvt.size) == false) {
        alert(
            "The file (" +
            readerEvt.name +
            ") does not match the upload conditions, The maximum file size for uploads should not exceed 300 KB"
        );
        e.preventDefault();
        return;
    }

    //To check files count according to upload conditions
    if (CheckFilesCount(AttachmentArray) == false) {
        if (!filesCounterAlertStatus) {
            filesCounterAlertStatus = true;
            alert(
                "You have added more than 10 files. According to upload conditions you can upload 10 files maximum"
            );
        }
        e.preventDefault();
        return;
    }
}

//To check file type according to upload conditions
function CheckFileType(fileType) {
    if (fileType == "image/jpeg") {
        return true;
    } else if (fileType == "image/png") {
        return true;
    } else if (fileType == "image/gif") {
        return true;
    } else if (fileType == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        return true;
    } else if (fileType == "application/pdf") {
        return true;
    } else {
        return false;
    }
    return true;
}

//To check file Size according to upload conditions
function CheckFileSize(fileSize) {
    if (fileSize < 300000000) {
        return true;
    } else {
        return false;
    }
    return true;
}

//To check files count according to upload conditions
function CheckFilesCount(AttachmentArray) {
    //Since AttachmentArray.length return the next available index in the array,
    //I have used the loop to get the real length
    var len = 0;
    for (var i = 0; i < AttachmentArray.length; i++) {
        if (AttachmentArray[i] !== undefined) {
            len++;
        }
    }
    //To check the length does not exceed 10 files maximum
    if (len > 9) {
        return false;
    } else {
        return true;
    }
}
//Render attachments thumbnails.
function RenderThumbnail(e, readerEvt) {
    var li = document.createElement("li");
    li.id = "liimg" + readerEvt.name.split('.')[0];
    ul.appendChild(li);
    li.innerHTML = [
        '<div   class="img-wrap img-wrapper">' +
        '<a href="', e.target.result, '"><img class="thumb" src="',
        e.target.result,
        '" title="',
        escape(readerEvt.name),
        '" data-id="',
        readerEvt.name,
        '"/></a>' + "<span class=\"close\"><i class=\"fa fa-trash-o\" onclick=\"removeimagesfromArry('" + readerEvt.name + "','" + readerEvt.name + "')\"></i></span></div>"
    ].join("");
    imageArry.push({ 'name': readerEvt.name, 'base64Data': e.target.result })

    var div = document.createElement("div");
    div.className = "file-info";
    li.appendChild(div);
    div.innerHTML = [readerEvt.name].join("");
    document.getElementById("image-gallery").insertBefore(ul, null);
}

//Fill the array of attachment
function FillAttachmentArray(e, readerEvt) {
    AttachmentArray[arrCounter] = {
        AttachmentType: 1,
        ObjectType: 1,
        FileName: readerEvt.name,
        FileDescription: "Attachment",
        NoteText: "",
        MimeType: readerEvt.type,
        Content: e.target.result.split("base64,")[1],
        FileSizeInBytes: readerEvt.size
    };
    arrCounter = arrCounter + 1;
}
function fileUpload() {
    var imgDTO = new Object();
    imgDTO = imageArry;
    if (imgDTO.length > 0) {
        $.ajax({
            type: "POST",
            url: '/FileUpload/UploadFile',
            data: { imgDTO },
            success: function (response) {
                if (response != null) {
                    alert(response);
                    window.location.href = "http://localhost:37903/fileUpload/DisplayImages";
                }
                else {
                    alert('No Response..!');
                }
            },
            error: function (error) {
                alert("something went wrong");
            }
        });
    }
    else {
        alert("Please choose atleast one file..!");
    }


}
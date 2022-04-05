// Execute when the document is ready
// $(document).ready(() => {



// const { ConnectionClosedEvent } = require("mongodb");
// const { $where } = require("../../schemas/UserSchema");

    
// })
//Globals

let cropper;


$("#postTextarea, #replyTextarea").keyup((event) => {
    var textbox = $(event.target);
    var value = textbox.val().trim();

    var isModal = textbox.parents(".modal").length == 1;

    var submitButton = isModal? $("#submitReplyButton") : $("#submitPostButton");
    // if (submitButtion.length == 0) {
    //     return alert("No submit button found");
    // }

    if (value == "") {
        submitButton.prop("disabled", true);
        return;
    }

    submitButton.prop("disabled", false);
})

$("#submitPostButton, #submitReplyButton").click((event) => {
    var button = $(event.target);

    var isModal = button.parents(".modal").length == 1;
    var textbox = isModal? $("#replyTextarea") : $("#postTextarea");

    var data = {
        content: textbox.val()
    }

    if (isModal) {
        var id = button.data().id;
        if (id == null)
            return alert("Button id is null");
        // var postId = getPostIdFromElement(button)
        data.replyTo = id;
    }
    // alert('sfa');
    $.post("/api/posts", data, postData => {
        // var html = createPostHtml(postData);
        document.location.reload(true);
        // $(".postsContainer").prepend(html);
        // textbox.val("");
        // button.prop("disabled", true);
    })
})

$("#replyModal").on("show.bs.modal", (event) => {
    var button = $(event.relatedTarget);
    var postId = getPostIdFromElement(button);
    console.log(postId);
    $("#submitReplyButton").data("id", postId);
    // if (postId === undefined) {
    //     return;
    // }

    $.get(`/api/posts/${postId}`, results => {
        outputPosts(results.postData, $("#originalPostContainer"));
    })
})

$("#replyModal").on("hidden.bs.modal", (event) => {
    $("#originalPostContainer").html("");
    // document.location.reload(true);
})

$("#deletePostModal").on("show.bs.modal", (event) => {
    var button = $(event.relatedTarget);
    var postId = getPostIdFromElement(button);
    // console.log(postId);
    $("#deletePostButton").data("id", postId);
    // if (postId === undefined) {
    //     return;
    // }

    // $.delete(`/api/posts/${postId}`, results => {
    //     outputPosts(results.postData, $("#originalPostContainer"));
    // })
})

// add post id to submit button when modal is shown

$("#confirmPinModal").on("show.bs.modal", (event) => {
    var button = $(event.relatedTarget);
    var postId = getPostIdFromElement(button);
    // console.log(postId);
    $("#pinPostButton").data("id", postId);
    // if (postId === undefined) {
    //     return;
    // }

    // $.delete(`/api/posts/${postId}`, results => {
    //     outputPosts(results.postData, $("#originalPostContainer"));
    // })
})

$("#unpinModal").on("show.bs.modal", (event) => {
    var button = $(event.relatedTarget);
    var postId = getPostIdFromElement(button);
    // console.log(postId);
    $("#unpinPostButton").data("id", postId);
    // if (postId === undefined) {
    //     return;
    // }

    // $.delete(`/api/posts/${postId}`, results => {
    //     outputPosts(results.postData, $("#originalPostContainer"));
    // })
})

$("#deletePostModal").on("hidden.bs.modal", (event) => {
    $("#originalPostContainer").html("");
    // document.location.reload(true);
})

$('#deletePostButton').click((event) => {
    var postId = $(event.target).data("id");
    

    $.ajax({
        url: `/api/posts/${postId}`,
        type: "DELETE",
        success: (postData) => {
            document.location.reload(true);
        }
    })
})

$('#pinPostButton').click((event) => {
    var postId = $(event.target).data("id");
    

    $.ajax({
        url: `/api/posts/${postId}`,
        type: "PUT",
        data: {pinned:true},
        success: (postData) => {
            document.location.reload(true);
        }
    })
})

$('#unpinPostButton').click((event) => {
    var postId = $(event.target).data("id");
    

    $.ajax({
        url: `/api/posts/${postId}`,
        type: "PUT",
        data: {pinned:false},
        success: (postData) => {
            document.location.reload(true);
        }
    })
})

$("#filePhoto").change(function(){
    // var input = $(event);
    
    if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var image = document.getElementById("imagePreview");

            image.src = e.target.result;
            // $("#imagePreview").attr("src", e.target.result);

            if (cropper !== undefined) {
                cropper.destroy();
            }


            cropper = new Cropper(image, {
                aspectRatio: 1 / 1,
                background: false
            });
            
        }


        reader.readAsDataURL(this.files[0]);
    }
})

$("#fileCoverPhoto").change(function(){
    // var input = $(event);
    
    if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var image = document.getElementById("coverPreview");

            image.src = e.target.result;
            // $("#imagePreview").attr("src", e.target.result);

            if (cropper !== undefined) {
                cropper.destroy();
            }


            cropper = new Cropper(image, {
                aspectRatio: 16 / 9,
                background: false
            });
            
        }


        reader.readAsDataURL(this.files[0]);
    }
})

$("#imageUploadButton").click((event) => {
    var canvas = cropper.getCroppedCanvas();

    if (canvas == null) {
        alert("Could not upload image. Make sure it is an image file.")
        return;
    }

    canvas.toBlob((blob) => {
        var formData = new FormData();

        formData.append("croppedImage", blob);

        $.ajax({
            url: "/api/users/profilePicture",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: () => {
                document.location.reload(true);
            }
        });
    })
})

$("#coverPhotoButton").click((event) => {
    var canvas = cropper.getCroppedCanvas();

    if (canvas == null) {
        alert("Could not upload image. Make sure it is an image file.")
        return;
    }

    canvas.toBlob((blob) => {
        var formData = new FormData();

        formData.append("croppedImage", blob);

        $.ajax({
            url: "/api/users/coverPhoto",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: () => {
                document.location.reload(true);
            }
        });
    })
})

$(document).on("click", ".likeButton",(event) => {
    var button = $(event.target);
    var postId = getPostIdFromElement(button);
    
    if (postId === undefined) {
        return;
    }

    $.ajax({
        url: `/api/posts/${postId}/like`,
        type: "PUT",
        success: (postData) => {
            // document.location.reload(true);
            button.find("span").text(postData.likes.length || "");

            if (postData.likes.includes(userLoggedIn._id)) {
                button.addClass("active");
            } else {
                button.removeClass("active");
            }
        }
    })

})

$(document).on("click", ".retweetButton",(event) => {
    var button = $(event.target);
    var postId = getPostIdFromElement(button);
    
    if (postId === undefined) {
        return;
    }

    $.ajax({
        url: `/api/posts/${postId}/retweet`,
        type: "POST",
        success: (postData) => {
            document.location.reload(true);
            // console.log(postData);
            // button.find("span").text(postData.retweetUsers.length || "");

            // if (postData.retweetUsers.includes(userLoggedIn._id)) {
            //     document.location.reload(true);
            //     // button.addClass("active");
            // } else {
            //     button.removeClass("active");
            // }
        }
    })

})

$(document).on("click", ".post",(event) => {
    var element = $(event.target);
    var postId = getPostIdFromElement(element);
    
    if (postId !== undefined && !element.is("button")) 
        window.location.href = '/post/' + postId;
})

$(document).on("click", ".followButton",(event) => {
    var button = $(event.target);

    var userId = button.data().user;

    $.ajax({
        url: `/api/users/${userId}/follow`,
        type: "PUT",
        success: (data, status, xhr) => {
            // console.log(data);
            if (xhr.status == 404){
                alert("User not found");
                return;
            }
            // var difference = 1;
            if (data.following && data.following.includes(userId)) {
                button.addClass("following");
                button.text("Following");
            } else {
                button.removeClass("following");
                button.text("Follow");
                // difference = -1;
            }

            document.location.reload(true);


            // var followersLabel = $("#followersValue");
            // if (followersLabel.length != 0) {
            //     var followersText = followersLabel.text();
            //     followersText = parseInt(followersText);
            //     followersLabel.text(followersText + difference);
            // }


        }
    })
})

function getPostIdFromElement(element) {
    var isRoot = element.hasClass("post");
    var rootElement = isRoot == true ? element : element.closest(".post");
    var postId = rootElement.data().id;
    // console.log(postId);
    if (postId === undefined) 
        return alert("Post id undefined.");
    
    return postId;
}

function createPostHtml(postData, largeFont = false) {
    
    if (postData == null)
        return alert("post object is null");

    // var retweetId = postData._id;
    
    // console.log(postData);

    var isRetweet = postData.retweetData !== undefined;
    var retweetedBy = isRetweet ? postData.postedBy.username : null;

    if (isRetweet) {
        if (postData.retweetData != null) {
            postData = postData.retweetData;
        } 
        if (postData.content === undefined) {
            var originalDeleted = true;
            postData.content = "<span>Original tweet is not available</span>";
        }
        // isRetweet = postData.retweetData !== undefined;
        // } else {
            // postData.content = "<span>Original tweet is not available</span>"
        // }
    }

    // console.log(postData);
    
    // postData = isRetweet && postData.retweetData != null ? postData.retweetData : postData;
    // console.log(postData);

    // if(postData == null) {
    //     $.ajax({
    //         url: `/api/posts/${postId}`,
    //         type: "DELETE",
    //         success: (postData) => {
    //             document.location.reload(true);
    //         }
    //     })
    // } 

    var postedBy = postData.postedBy;

    if (postedBy._id === undefined) {
        return console.log("User object not populated");
    }

    var displayName = postedBy.firstName + " " + postedBy.lastName;
    var timestamp = timeDifference(new Date(), new Date(postData.createdAt));

    var likeButtonActiveClass = postData.likes.includes(userLoggedIn._id) ? "active" : "";
    var retweetButtonActiveClass = postData.retweetUsers.includes(userLoggedIn._id) ? "active" : "";
    // data attributes

    var largeFontClass = largeFont ? "largeFont" : "";

    var retweetText = "";
    if (isRetweet) {
        retweetText = `<span><i class="fa-solid fa-retweet"></i> Retweeted by @<a href='/profile/${retweetedBy}'>${retweetedBy}</span>`;
    }


    var replyFlag = "";
    if (postData.replyTo && postData.replyTo._id) {
        if (!postData.replyTo._id) {
            console.log(postData);
            return alert("ReplyTo is not populated");
        } else if (!postData.replyTo.postedBy._id) {
            return alert("PostedBy is not populated");
        }

        var replyToUsername = postData.replyTo.postedBy.username;
        replyFlag = `<div class='replyFlag'>Replying to <a href='/profile/${replyToUsername}'>@${replyToUsername}</a></div>`;
    }

    var buttons = "";
    var pinnedPostText = "";
    if (postData.postedBy._id == userLoggedIn._id && (!isRetweet || originalDeleted)) {
        var pinnedClass = "";
        var dataTarget = "#confirmPinModal";
        if (postData.pinned === true) {
            pinnedClass = 'active';
            pinnedPostText = "<i class='fa-solid fa-thumbtack'></i><span>Pinned post</span>"
            dataTarget = "#unpinModal";
        }
        buttons = `<button class = 'pinButton ${pinnedClass}' data-id="${postData._id}" data-bs-toggle="modal" data-bs-target="${dataTarget}"><i class="fa-solid fa-thumbtack"></i></button>
        <button data-id="${postData._id}" data-bs-toggle="modal" data-bs-target="#deletePostModal"><i class="fa-solid fa-xmark"></i></button>`;
        
    }

    return `<div class = 'post ${largeFontClass}' data-id='${postData._id}'>
                <div class='postActionContainer'>
                    ${retweetText}
                </div>
                <div class = 'mainContentContainer'>
                    <div class='userImageContainer'>
                        <img src='${postedBy.profilePic}'>
                    </div>
                    <div class='postContentContainer'>
                        <div class='pinnedPostText'>${pinnedPostText}</div>
                        <div class='header'>
                            <a href='/profile/${postedBy.username}' class='displayName'>${displayName}</a>
                            <span class='username'>@${postedBy.username}</span>
                            <span class='date'>${timestamp}</span>
                            ${buttons}
                        </div>
                        ${replyFlag}
                        <div class='postBody'>
                            <span>${postData.content}</span>
                        </div>
                        <div class='postFooter'>
                            <div class='postButtonContainer'>
                                <button data-bs-toggle="modal" data-bs-target="#replyModal">
                                    <i class="fa-solid fa-comment"></i>
                                </button>
                            </div>
                            <div class='postButtonContainer green'>
                                <button class = 'retweetButton ${retweetButtonActiveClass}'>
                                    <i class="fa-solid fa-retweet"></i>
                                    <span>${postData.retweetUsers.length || ""}</span>
                                </button>
                            </div>
                            <div class='postButtonContainer red'>
                                <button class='likeButton ${likeButtonActiveClass}'>
                                    <i class="fa-solid fa-heart"></i>
                                    <span>${postData.likes.length || ""}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
}

function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        if (elapsed / 1000 < 30)
            return "Just now";
        return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
        return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

function outputPosts(results, container) {
    container.html("");

    if(!Array.isArray(results)) {
        results = [results];
    }

    results.forEach(result => {
        var html = createPostHtml(result);
        container.append(html);
    })

    if (results.length == 0) {
        container.append("<span class='noResults'>Nothing to show</span>");
    }
}

function outputPinnedPost(results, container) {
    if (results.length == 0) {
        constainer.hide();
        return;
    }
    
    container.html("");

    results.forEach(result => {
        var html = createPostHtml(result);
        container.append(html);
    })
}

function outputPostsWithReplies(results, container) {
    container.html("");

    if (results.replyTo !== undefined && results.replyTo._id !== undefined) {
        var html = createPostHtml(results.replyTo);
        container.append(html);
    }

    var mainPostHtml = createPostHtml(results.postData, true);
    container.append(mainPostHtml);

    results.replies.forEach(result => {
        var html = createPostHtml(result);
        container.append(html);
    })
}
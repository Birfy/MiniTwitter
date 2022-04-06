var selectedUsers = [];
var timer;

$("#userSearchTextbox").keydown((event) => {
    clearTimeout(timer);

    var textbox = $(event.target);
    var value = textbox.val();

    if (value == "" && (event.which == 8 || event.keyCode == 8)) {
        // remove user from selection
        selectedUsers.pop();
        updateSelectedUsersHtml();
        $(".resultsContainer").html("");

        if (selectedUsers.length == 0) {
            $("#createChatButton").prop("disabled", true);
        }
        return;
    }

    timer = setTimeout(() => {
        value = textbox.val().trim();

        if (value == "") {
            $(".resultsContainer").html("");
        } else {
            searchUsers(value);
        }
    }, 500)

    
})

$("#createChatButton").click((event) => {
    var data = JSON.stringify(selectedUsers);

    $.post("/api/chats", { users: data}, (chat)=> {

        if (!chat || !chat._id) {
            return alert("Invalid response from server");
        }
        window.location.href = `/messages/${chat._id}`;
    })
})

function outputSelectableUsers(results, container) {

    // console.log(results);
    container.html("");
    // console.log(container);
    results.forEach(result => {

        if (result._id == userLoggedIn._id || selectedUsers.some(u => u._id == result._id)) {
            return;
        }
        var html = createUserHtml(result, false);
        var element = $(html);
        
        element.click(() => userSelected(result))

        container.append(element);
    })

    if (results.length == 0) {
        container.append("<span class='noResults'> No results found</span>")
    }
}

function userSelected(user) {
    selectedUsers.push(user);
    updateSelectedUsersHtml();
    $("#userSearchTextbox").val("").focus();
    $(".resultsContainer").html("");
    $("#createChatButton").prop("disabled", false);
}

function updateSelectedUsersHtml() {
    var elements = [];

    selectedUsers.forEach(user => {
        var name = user.firstName + " " + user.lastName;
        var userElement = $(`<span class="selectedUser">${name}</span>`);
        elements.push(userElement);        
    });

    $(".selectedUser").remove();

    $("#selectedUsers").prepend(elements);
}




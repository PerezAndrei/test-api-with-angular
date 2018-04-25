$(function () {
    Ims.InitCommon();
    //Ims.InitUser();
    //Ims.InitImage();
    //Ims.InitTag();
});

(function (ims, $) {
    ims.InitCommon = function () {
        var regionSelect = $("#region"),
            citySelect = $("#city"),
            contentSelectCity = $("#select-city"),
            domainCheckbox = $("#separaite-domain"),
            domainContent = $(".domain-content"),
            inputShowPassword = $("#show-password"),
            inputPassword = $("#password"),
            inputLogin = $("#login"),
            registerBtn = $("#registerBtn"),
            timerId = null,
            allSelects = $(document).find("select");

        $("form").on("valid.bs.validator", function() {
            checkSelectsError();
        });

        allSelects.on("change", function () {
            var el = $(this);
            selectError(el);
            checkSelectsError();
        });

        function checkSelectsError() {
            var selectError = $("div.select-error");
            if (selectError.length > 0) {
                registerBtn.attr("disabled", true);
            } else if ($("#login-exist").hasClass("active")) {
                registerBtn.attr("disabled", true);
            } else {
                registerBtn.attr("disabled", false);
            }
        }

        function selectError(el) {
            var el = $(el);
            var parent = el.closest("div .form-group");
            if (el.val() === "0" || el.val().length === 0) {
                if (!parent.hasClass("select-error")) {
                    parent.toggleClass("select-error");
                }
            } else {
                if (parent.hasClass("select-error")) {
                    parent.toggleClass("select-error");
                }
            }
        }

        registerBtn.on("click", function() {
            var elemets = $("select");
            elemets.each(function(index, item) {
                var val = $(item).val();
                if (val === "0" || val.length === 0) {
                    var parent = $(item).closest("div .form-group");
                    parent.toggleClass("select-error");
                }
            });
        });

        regionSelect.on("change", function () {
            var val = $(this).val();

            if (val !== "0" && val !== null) {
                getCities(val);
            } else {
                setCities(null);
            }
        });

        domainCheckbox.on("change", function() {
            var el = $(this);
            var isChecked = el.is(":checked");
            if (isChecked) {
                domainContent.show(500);
            } else {
                domainContent.hide(500);
            }
        });

        inputShowPassword.on("click", function() {
            var el = $(this);
            var isChecked = el.is(":checked");
            if (isChecked) {
                passwordVisibility(true);
            } else {
                passwordVisibility(false);
            }
        });

        inputPassword.on("keyup", function() {
            passwordStrength($(this).val());
        });

        inputLogin.on("keyup", function () {
            var value = $(this).val();
            if (timerId !== null) {
                clearTimeout(timerId);
            }
            timerId = setTimeout(checkLogin, 1500, value);
        });

        function checkLogin(login) {
            var msgExist = $("#login-exist");
            var msgFree = $("#login-free");
            var loginGroup = $("#login-group");
            var inputLogin = $("#login");

            
            if (login.length > 0) {;
                var url = `/api/users/${login}`;
                var type = "Get";
                var tagsPopularPromise = ims.query(url, type);
                tagsPopularPromise.then(result => {
                    if (result !== null) {
                        if (!loginGroup.hasClass("has-error")) {
                            loginGroup.toggleClass("has-error");
                        }
                        if (!inputLogin.hasClass("input-error")) {
                            inputLogin.toggleClass("input-error");
                        }
                        if (msgFree.hasClass("active")) {
                            msgFree.toggleClass("active");
                        }
                        if (!msgExist.hasClass("active")) {
                            msgExist.addClass("active");
                        }
                        
                        } else {
                            if (msgExist.hasClass("active")) {
                                msgExist.toggleClass("active");
                            }
                            if (!msgFree.hasClass("active")) {
                                msgFree.addClass("active");
                            }
                            if (loginGroup.hasClass("has-error")) {
                                loginGroup.toggleClass("has-error");
                            }
                            if (inputLogin.hasClass("input-error")) {
                                inputLogin.toggleClass("input-error");
                            }
                    }
                        checkSelectsError();
                    },
                    error => {
                        console.log(error);
                        checkSelectsError();
                    }
                );

            } else {
                if (msgExist.hasClass("active")) {
                    msgExist.toggleClass("active");
                }

                if (msgFree.hasClass("active")) {
                    msgFree.toggleClass("active");
                }

                if (loginGroup.hasClass("has-error")) {
                    loginGroup.toggleClass("has-error");
                }
                if (inputLogin.hasClass("input-error")) {
                    inputLogin.toggleClass("input-error");
                }
            }
        }

        function passwordVisibility(isVisibility) {
            if (isVisibility) {
                inputPassword.attr("type", "text");
            } else {
                inputPassword.attr("type", "password");
            }
        }

        function getCities(cityId) {
            var url = `/api/cities/${cityId}`;
            var type = "Get";
            var tagsPopularPromise = ims.query(url, type);
            tagsPopularPromise.then(result => {
                setCities(result),
                error => {
                    console.log(error);
                }
            });
        }

        function setCities(data) {
            var select = $("<select></select>");
            var attrs = {
                id: "city",
                "data-live-search": "true",
                name: "city"
            }
            select.attr(attrs);
            var chooseOption = $("<option></option>").val("0").text("Выберите...");
            select.append(chooseOption);
            $.each(data, function(index, item) {
                var option = $("<option></option>");
                option.val(item.id);
                option.text(item.name);
                select.append(option);
            });
            contentSelectCity.empty();
            select.on("change", function () {
                var el = $(this);
                selectError(el);
            });
            contentSelectCity.append(select);
            $("#city").selectpicker();
        }

        function passwordStrength(password) {

            var desc = [{ 'width': '0px' }, { 'width': '10%' }, { 'width': '40%' }, { 'width': '60%' }, { 'width': '80%' }, { 'width': '100%' }];

            var descClass = ['', 'progress-bar-danger', 'progress-bar-warning', 'progress-bar-warning', 'progress-bar-success', 'progress-bar-success'];

            var score = 0;
            //if password bigger than 6 give 1 point
            if (password.length >= 1) score++;

            //if password has both lower and uppercase characters give 1 point	
            if ((password.match(/[a-z]/)) && (password.match(/[A-Z]/))) score++;

            //if password has at least one number give 1 point
            if (password.match(/\d+/)) score++;

            //if password has at least one special caracther give 1 point
            if (password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) score++;

            //if password bigger than 12 give another 1 point
            if (password.length > 10) score++;

            // display indicator
            descClass.forEach(function(item, index) {
                $("#jak_pstrength").removeClass(item);
            });
            $("#jak_pstrength").addClass(descClass[score]).css(desc[score]);
        }
    };
    
    ims.query = function (url, type, async) {
        if (async === undefined) {
            async = true;
        }
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: url,
                type: type,
                async: async,
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXhr, status, error) {
                    alert(error);
                }
            });
        });
    }

    ims.queryPost = function (url, contType, data) {
        var contentType = "application/json;charset=utf-8";
        if (contType !== undefined) {
            contentType = contType;
        }
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: url,
                type: "Post",
                contentType: contentType,
                processData: false,
                data: data,
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXhr, status, error) {
                    ims.showError(error);
                }
            });
        });
    }

    ims.showError = function(msgError) {
        $("p#msg-modal-error").text(msgError);
        $("#modal-error").modal("show");
    }

})(window.Ims = window.Ims || {}, jQuery);


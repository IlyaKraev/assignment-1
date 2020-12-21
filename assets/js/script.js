// 
// 
//          BEHOLD! A JAVASCRIPT FILE TO DWARF DOSTOYEVSKYI'S "WAR AND PEACE"!
// 
// 

// JQuery is Love. JQuery is Life <3
$(document).ready(function() {

    // ACORDION SCRIPT
    $(".parent").click(function() {
        $(this).next().slideDown(500).siblings(".child").slideUp(500);
    });

    $(".next_page").click(function() {
        alert("Error: no connection to server.");
    });




    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
    //
    /////   COURSE FORM SCRIPTS

    // VALIDATE NEW COURSE //
    if ($('body').is('.course_form')) {

        // DATE PICKER SCRIPT
        $('#sdate').datepicker({
            onSelect: function(dateText, inst) {
                $('#edate').datepicker('option', 'minDate', new Date(dateText));
            },
        });
        $('#edate').datepicker({
            onSelect: function(dateText, inst) {
                $('#sdate').datepicker('option', 'maxDate', new Date(dateText));
            }
        });

        const titleEl = document.querySelector('#title');
        const topicEl = document.querySelector('#topic');
        const streamEl = document.querySelector('#stream');
        const sdateEl = document.querySelector('#sdate');
        const edateEl = document.querySelector('#edate');
        const studentEl = document.querySelector('#sselect');
        const assignmentEl = document.querySelector('#aselect');
        const trainerEl = document.querySelector('#tselect');

        const form = document.querySelector('#cform');

        const checkTitle = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const title = titleEl.value.trim();

            if (!isRequired(title)) {
                showError(titleEl, 'Title cannot be blank.');
            } else if (!isBetween(title.length, min, max)) {
                showError(titleEl, `Title must be between ${min} and ${max} characters.`)
            } else if (!istitleValid(title)) {
                showError(titleEl, 'Title is not valid.')
            } else {
                showSuccess(titleEl);
                valid = true;
            }
            return valid;
        };

        const checkTopic = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const topic = topicEl.value.trim();

            if (!isRequired(topic)) {
                showError(topicEl, 'Topic cannot be blank.');
            } else if (!isBetween(topic.length, min, max)) {
                showError(topicEl, `Topic must be between ${min} and ${max} characters.`)
            } else if (!isTopicValid(topic)) {
                showError(topicEl, 'Topic is not valid.')
            } else {
                showSuccess(topicEl);
                valid = true;
            }
            return valid;
        };


        const checkStream = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const stream = streamEl.value.trim();

            if (!isRequired(stream)) {
                showError(streamEl, 'Stream cannot be blank.');
            } else if (!isBetween(stream.length, min, max)) {
                showError(streamEl, `Stream must be between ${min} and ${max} characters.`)
            } else if (!isStreamValid(stream)) {
                showError(streamEl, 'Stream is not valid. Must be comprised of two words')
            } else {
                showSuccess(streamEl);
                valid = true;
            }
            return valid;
        };


        const checkSdate = () => {
            let valid = false;
            const sdate = sdateEl.value.trim();
            if (!isRequired(sdate)) {
                showError(sdateEl, 'Starting date cannot be blank.');
            } else {
                showSuccess(sdateEl);
                valid = true;
            }
            return valid;
        };

        const checkEdate = () => {
            let valid = false;
            const edate = edateEl.value.trim();
            if (!isRequired(edate)) {
                showError(edateEl, 'Starting date cannot be blank.');
            } else {
                showSuccess(edateEl);
                valid = true;
            }
            return valid;
        };

        const checkStudents = () => {
            let valid = false;
            const students = studentEl.value;
            if (students === '') {
                showError(studentEl, 'At least one student must be selected.');
            } else {
                showSuccess(studentEl);
                valid = true;
            }
            return valid;

        }
        const checkTrainers = () => {
            let valid = false;
            const trainers = trainerEl.value;
            if (trainers === '') {
                showError(trainerEl, 'At least one trainer must be selected.');
            } else {
                showSuccess(trainerEl);
                valid = true;
            }
            return valid;

        }
        const checkAssignments = () => {
            let valid = false;
            const assignments = assignmentEl.value;
            if (assignments === '') {
                showError(assignmentEl, 'At least one assignment must be selected.');
            } else {
                showSuccess(assignmentEl);
                valid = true;
            }
            return valid;

        }

        const isRequired = value => value === '' ? false : true;
        const isBetween = (length, min, max) => length < min || length > max ? false : true;


        const showError = (input, message) => {
            // get the form-field element
            const formField = input.parentElement;
            // add the error class
            formField.classList.remove('success');
            formField.classList.add('error');

            // show the error message
            const error = formField.querySelector('small');
            error.textContent = message;
        };

        const showSuccess = (input) => {
            // get the form-field element
            const formField = input.parentElement;

            // remove the error class
            formField.classList.remove('error');
            formField.classList.add('success');

            // hide the error message
            const error = formField.querySelector('small');
            error.textContent = '';
        }

        const istitleValid = (title) => {
            const re = /^[a-zA-Z]+([0-9])*$/;
            return re.test(title);
        }

        const isTopicValid = (topic) => {
            const re = /^[a-zA-Z#]+(,\s*[a-zA-Z#]+)*$/;
            return re.test(topic);
        }

        const isStreamValid = (stream) => {
            const re = /^\s*[A-Za-z0-9]+(?:\s+[A-Za-z0-9]+)*\s*$/;
            return re.test(stream);
        };



        const debounce = (fn, delay = 500) => {
            let timeoutId;
            return (...args) => {
                // cancel the previous timer
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                // setup a new timer
                timeoutId = setTimeout(() => {
                    fn.apply(null, args)
                }, delay);
            };
        };

        form.addEventListener('submit', function(e) {
            // prevent the form from submitting
            e.preventDefault();

            // validate fields
            let isTitleValid = checkTitle(),
                isTopicValid = checkTopic(),
                isStreamValid = checkStream(),
                isSdateValid = checkSdate(),
                isEdateValid = checkEdate(),
                isStudentsValid = checkStudents(),
                isTrainersValid = checkTrainers(),
                isAssignmentsValid = checkAssignments();

            let isFormValid = isTitleValid &&
                isTopicValid &&
                isStreamValid &&
                isSdateValid &&
                isEdateValid &&
                isStudentsValid &&
                isTrainersValid &&
                isAssignmentsValid;

            // submit if the form is valid
            if (isFormValid) {
                alert("Course " + topicEl.value + " " + streamEl.value + " created!");
                form.reset();
            }
        });

        // This bit turns the input boxes green if the value has been corrected
        form.addEventListener('input', debounce(function(e) {
            switch (e.target.id) {
                case 'title':
                    checkTitle();
                    break;
                case 'topic':
                    checkTopic();
                    break;
                case 'stream':
                    checkStream();
                    break;
                case 'sdate':
                    checkSdate();
                    break;
                case 'edate':
                    checkEdate();
                    break;
                case 'sselect':
                    checkStudents();
                    break;
                case 'tselect':
                    checkTrainers();
                    break;
                case 'aselect':
                    checkAssignments();
            }
        }));

    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
    //
    // VALIDATE THE DUMMY COURSES

    // COURSE NUMERO UNO

    if ($('body').is('.courses')) {

        //EDIT BUTTON 
        $("#edit1").click(function() {
            $('#form1 input').removeAttr('readonly'),
                $('#sdate1').prop('disabled', false),
                $('#edate1').prop('disabled', false),
                $('#form1 input').prop('disabled', false),
                $('#edit1').prop('disabled', true),
                $('#form1 select').prop('disabled', false);
        });

        // DATE PICKER SCRIPT
        $('#sdate1').datepicker({
            onSelect: function(dateText, inst) {
                $('#edate1').datepicker('option', 'minDate', new Date(dateText));
            },
        });
        $('#edate1').datepicker({
            onSelect: function(dateText, inst) {
                $('#sdate1').datepicker('option', 'maxDate', new Date(dateText));
            }
        });


        const titleEl = document.querySelector('#title1');
        const topicEl = document.querySelector('#topic1');
        const streamEl = document.querySelector('#stream1');
        const sdateEl = document.querySelector('#sdate1');
        const edateEl = document.querySelector('#edate1');
        const studentEl = document.querySelector('#sselect1');
        const assignmentEl = document.querySelector('#aselect1');
        const trainerEl = document.querySelector('#tselect1');

        const form = document.querySelector('#form1');

        const checkTitle = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const title = titleEl.value.trim();

            if (!isRequired(title)) {
                showError(titleEl, 'Title cannot be blank.');
            } else if (!isBetween(title.length, min, max)) {
                showError(titleEl, `Title must be between ${min} and ${max} characters.`)
            } else if (!istitleValid(title)) {
                showError(titleEl, 'Title is not valid.')
            } else {
                showSuccess(titleEl);
                valid = true;
            }
            return valid;
        };

        const checkTopic = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const topic = topicEl.value.trim();

            if (!isRequired(topic)) {
                showError(topicEl, 'Title cannot be blank.');
            } else if (!isBetween(topic.length, min, max)) {
                showError(topicEl, `Title must be between ${min} and ${max} characters.`)
            } else if (!isTopicValid(topic)) {
                showError(topicEl, 'Title is not valid.')
            } else {
                showSuccess(topicEl);
                valid = true;
            }
            return valid;
        };


        const checkStream = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const stream = streamEl.value.trim();

            if (!isRequired(stream)) {
                showError(streamEl, 'Stream cannot be blank.');
            } else if (!isBetween(stream.length, min, max)) {
                showError(streamEl, `Stream must be between ${min} and ${max} characters.`)
            } else if (!isStreamValid(stream)) {
                showError(streamEl, 'Stream is not valid.')
            } else {
                showSuccess(streamEl);
                valid = true;
            }
            return valid;
        };


        const checkSdate = () => {
            let valid = false;
            const sdate = sdateEl.value.trim();
            if (!isRequired(sdate)) {
                showError(sdateEl, 'Starting date cannot be blank.');
            } else {
                showSuccess(sdateEl);
                valid = true;
            }
            return valid;
        };

        const checkEdate = () => {
            let valid = false;
            const edate = edateEl.value.trim();
            if (!isRequired(edate)) {
                showError(edateEl, 'Starting date cannot be blank.');
            } else {
                showSuccess(edateEl);
                valid = true;
            }
            return valid;
        };


        const checkStudents = () => {
            let valid = false;
            const students = studentEl.value;
            if (students === '') {
                showError(studentEl, 'At least one student must be selected.');
            } else {
                showSuccess(studentEl);
                valid = true;
            }
            return valid;

        }
        const checkTrainers = () => {
            let valid = false;
            const trainers = trainerEl.value;
            if (trainers === '') {
                showError(trainerEl, 'At least one trainer must be selected.');
            } else {
                showSuccess(trainerEl);
                valid = true;
            }
            return valid;

        }
        const checkAssignments = () => {
            let valid = false;
            const assignments = assignmentEl.value;
            if (assignments === '') {
                showError(assignmentEl, 'At least one assignment must be selected.');
            } else {
                showSuccess(assignmentEl);
                valid = true;
            }
            return valid;

        }




        const isRequired = value => value === '' ? false : true;
        const isBetween = (length, min, max) => length < min || length > max ? false : true;


        const showError = (input, message) => {
            // get the form-field element
            const formField = input.parentElement;
            // add the error class
            formField.classList.remove('success');
            formField.classList.add('error');

            // show the error message
            const error = formField.querySelector('small');
            error.textContent = message;
        };

        const showSuccess = (input) => {
            // get the form-field element
            const formField = input.parentElement;

            // remove the error class
            formField.classList.remove('error');
            formField.classList.add('success');

            // hide the error message
            const error = formField.querySelector('small');
            error.textContent = '';
        }

        const istitleValid = (title) => {
            const re = /^[a-zA-Z]+([0-9])*$/;
            return re.test(title);
        }

        const isTopicValid = (topic) => {
            const re = /^[a-zA-Z#]+(,\s*[a-zA-Z#]+)*$/;
            return re.test(topic);
        }

        const isStreamValid = (stream) => {
            const re = /^\s*[A-Za-z0-9]+(?:\s+[A-Za-z0-9]+)*\s*$/;
            return re.test(stream);
        };



        const debounce = (fn, delay = 500) => {
            let timeoutId;
            return (...args) => {
                // cancel the previous timer
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                // setup a new timer
                timeoutId = setTimeout(() => {
                    fn.apply(null, args)
                }, delay);
            };
        };

        form.addEventListener('submit', function(e) {
            // prevent the form from submitting
            e.preventDefault();

            // validate fields
            let isTitleValid = checkTitle(),
                isTopicValid = checkTopic(),
                isStreamValid = checkStream(),
                isSdateValid = checkSdate(),
                isEdateValid = checkEdate(),
                isStudentsValid = checkStudents(),
                isTrainersValid = checkTrainers(),
                isAssignmentsValid = checkAssignments();

            let isFormValid = isTitleValid &&
                isTopicValid &&
                isStreamValid &&
                isSdateValid &&
                isEdateValid &&
                isStudentsValid &&
                isTrainersValid &&
                isAssignmentsValid;

            // submit if the form is valid
            if (isFormValid) {
                alert("Course " + topicEl.value + " " + streamEl.value + " updated!");
                var x = $("#title1").val();
                var y = $("#topic1").val();
                var z = $("#stream1").val();
                $("#course1").html(x + ", " + y + ", " + z);
                $('#form1 input').attr('readonly', 'readonly'),
                    $('#sdate1').prop('disabled', true),
                    $('#edate1').prop('disabled', true),
                    $('.update').prop('disabled', true),
                    $('#edit1').prop('disabled', false),
                    $('#form1 select').prop('disabled', true);
            }
        });

        form.addEventListener('input', debounce(function(e) {
            switch (e.target.id) {
                case 'title1':
                    checkTitle();
                    break;
                case 'topic1':
                    checkTopic();
                    break;
                case 'stream1':
                    checkStream();
                    break;
                case 'sdate1':
                    checkSdate();
                    break;
                case 'edate1':
                    checkEdate();
                    break;
                case 'sselect1':
                    checkStudents();
                    break;
                case 'tselect1':
                    checkTrainers();
                    break;
                case 'aselect1':
                    checkAssignments();
            }
        }));

    };


    // COURSE NUMERO DOS

    if ($('body').is('.courses')) {

        //EDIT BUTTON 
        $("#edit2").click(function() {
            $('#form2 input').removeAttr('readonly'),
                $('#sdate2').prop('disabled', false),
                $('#edate2').prop('disabled', false),
                $('#form2 input').prop('disabled', false),
                $('#edit2').prop('disabled', true),
                $('#form2 select').prop('disabled', false);
        });

        // DATE PICKER SCRIPT
        $('#sdate2').datepicker({
            onSelect: function(dateText, inst) {
                $('#edate2').datepicker('option', 'minDate', new Date(dateText));
            },
        });
        $('#edate2').datepicker({
            onSelect: function(dateText, inst) {
                $('#sdate2').datepicker('option', 'maxDate', new Date(dateText));
            }
        });


        const titleEl = document.querySelector('#title2');
        const topicEl = document.querySelector('#topic2');
        const streamEl = document.querySelector('#stream2');
        const sdateEl = document.querySelector('#sdate2');
        const edateEl = document.querySelector('#edate2');
        const studentEl = document.querySelector('#sselect2');
        const assignmentEl = document.querySelector('#aselect2');
        const trainerEl = document.querySelector('#tselect2');

        const form = document.querySelector('#form2');

        const checkTitle = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const title = titleEl.value.trim();

            if (!isRequired(title)) {
                showError(titleEl, 'Title cannot be blank.');
            } else if (!isBetween(title.length, min, max)) {
                showError(titleEl, `Title must be between ${min} and ${max} characters.`)
            } else if (!istitleValid(title)) {
                showError(titleEl, 'Title is not valid.')
            } else {
                showSuccess(titleEl);
                valid = true;
            }
            return valid;
        };

        const checkTopic = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const topic = topicEl.value.trim();

            if (!isRequired(topic)) {
                showError(topicEl, 'Title cannot be blank.');
            } else if (!isBetween(topic.length, min, max)) {
                showError(topicEl, `Title must be between ${min} and ${max} characters.`)
            } else if (!isTopicValid(topic)) {
                showError(topicEl, 'Title is not valid.')
            } else {
                showSuccess(topicEl);
                valid = true;
            }
            return valid;
        };


        const checkStream = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const stream = streamEl.value.trim();

            if (!isRequired(stream)) {
                showError(streamEl, 'Stream cannot be blank.');
            } else if (!isBetween(stream.length, min, max)) {
                showError(streamEl, `Stream must be between ${min} and ${max} characters.`)
            } else if (!isStreamValid(stream)) {
                showError(streamEl, 'Stream is not valid.')
            } else {
                showSuccess(streamEl);
                valid = true;
            }
            return valid;
        };


        const checkSdate = () => {
            let valid = false;
            const sdate = sdateEl.value.trim();
            if (!isRequired(sdate)) {
                showError(sdateEl, 'Starting date cannot be blank.');
            } else {
                showSuccess(sdateEl);
                valid = true;
            }
            return valid;
        };

        const checkEdate = () => {
            let valid = false;
            const edate = edateEl.value.trim();
            if (!isRequired(edate)) {
                showError(edateEl, 'Starting date cannot be blank.');
            } else {
                showSuccess(edateEl);
                valid = true;
            }
            return valid;
        };


        const checkStudents = () => {
            let valid = false;
            const students = studentEl.value;
            if (students === '') {
                showError(studentEl, 'At least one student must be selected.');
            } else {
                showSuccess(studentEl);
                valid = true;
            }
            return valid;

        }
        const checkTrainers = () => {
            let valid = false;
            const trainers = trainerEl.value;
            if (trainers === '') {
                showError(trainerEl, 'At least one trainer must be selected.');
            } else {
                showSuccess(trainerEl);
                valid = true;
            }
            return valid;

        }
        const checkAssignments = () => {
            let valid = false;
            const assignments = assignmentEl.value;
            if (assignments === '') {
                showError(assignmentEl, 'At least one assignment must be selected.');
            } else {
                showSuccess(assignmentEl);
                valid = true;
            }
            return valid;

        }




        const isRequired = value => value === '' ? false : true;
        const isBetween = (length, min, max) => length < min || length > max ? false : true;


        const showError = (input, message) => {
            // get the form-field element
            const formField = input.parentElement;
            // add the error class
            formField.classList.remove('success');
            formField.classList.add('error');

            // show the error message
            const error = formField.querySelector('small');
            error.textContent = message;
        };

        const showSuccess = (input) => {
            // get the form-field element
            const formField = input.parentElement;

            // remove the error class
            formField.classList.remove('error');
            formField.classList.add('success');

            // hide the error message
            const error = formField.querySelector('small');
            error.textContent = '';
        }

        const istitleValid = (title) => {
            const re = /^[a-zA-Z]+([0-9])*$/;
            return re.test(title);
        }

        const isTopicValid = (topic) => {
            const re = /^[a-zA-Z#]+(,\s*[a-zA-Z#]+)*$/;
            return re.test(topic);
        }

        const isStreamValid = (stream) => {
            const re = /^\s*[A-Za-z0-9]+(?:\s+[A-Za-z0-9]+)*\s*$/;
            return re.test(stream);
        };



        const debounce = (fn, delay = 500) => {
            let timeoutId;
            return (...args) => {
                // cancel the previous timer
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                // setup a new timer
                timeoutId = setTimeout(() => {
                    fn.apply(null, args)
                }, delay);
            };
        };

        form.addEventListener('submit', function(e) {
            // prevent the form from submitting
            e.preventDefault();

            // validate fields
            let isTitleValid = checkTitle(),
                isTopicValid = checkTopic(),
                isStreamValid = checkStream(),
                isSdateValid = checkSdate(),
                isEdateValid = checkEdate(),
                isStudentsValid = checkStudents(),
                isTrainersValid = checkTrainers(),
                isAssignmentsValid = checkAssignments();

            let isFormValid = isTitleValid &&
                isTopicValid &&
                isStreamValid &&
                isSdateValid &&
                isEdateValid &&
                isStudentsValid &&
                isTrainersValid &&
                isAssignmentsValid;

            // submit if the form is valid
            if (isFormValid) {
                alert("Course " + topicEl.value + " " + streamEl.value + " updated!");
                var x = $("#title2").val();
                var y = $("#topic2").val();
                var z = $("#stream2").val();
                $("#course2").html(x + ", " + y + ", " + z);
                $('#form2 input').attr('readonly', 'readonly'),
                    $('#sdate2').prop('disabled', true),
                    $('#edate2').prop('disabled', true),
                    $('.update').prop('disabled', true),
                    $('#edit2').prop('disabled', false),
                    $('#form2 select').prop('disabled', true);
            }
        });

        form.addEventListener('input', debounce(function(e) {
            switch (e.target.id) {
                case 'title2':
                    checkTitle();
                    break;
                case 'topic2':
                    checkTopic();
                    break;
                case 'stream2':
                    checkStream();
                    break;
                case 'sdate2':
                    checkSdate();
                    break;
                case 'edate2':
                    checkEdate();
                    break;
                case 'sselect2':
                    checkStudents();
                    break;
                case 'tselect2':
                    checkTrainers();
                    break;
                case 'aselect2':
                    checkAssignments();
            }
        }));

    };


    // COURSE NUMERO TRES

    if ($('body').is('.courses')) {

        //EDIT BUTTON 
        $("#edit3").click(function() {
            $('#form3 input').removeAttr('readonly'),
                $('#sdate3').prop('disabled', false),
                $('#edate3').prop('disabled', false),
                $('#form3 input').prop('disabled', false),
                $('#edit3').prop('disabled', true),
                $('#form3 select').prop('disabled', false);
        });

        // DATE PICKER SCRIPT
        $('#sdate3').datepicker({
            onSelect: function(dateText, inst) {
                $('#edate3').datepicker('option', 'minDate', new Date(dateText));
            },
        });
        $('#edate3').datepicker({
            onSelect: function(dateText, inst) {
                $('#sdate3').datepicker('option', 'maxDate', new Date(dateText));
            }
        });


        const titleEl = document.querySelector('#title3');
        const topicEl = document.querySelector('#topic3');
        const streamEl = document.querySelector('#stream3');
        const sdateEl = document.querySelector('#sdate3');
        const edateEl = document.querySelector('#edate3');
        const studentEl = document.querySelector('#sselect3');
        const assignmentEl = document.querySelector('#aselect3');
        const trainerEl = document.querySelector('#tselect3');

        const form = document.querySelector('#form3');

        const checkTitle = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const title = titleEl.value.trim();

            if (!isRequired(title)) {
                showError(titleEl, 'Title cannot be blank.');
            } else if (!isBetween(title.length, min, max)) {
                showError(titleEl, `Title must be between ${min} and ${max} characters.`)
            } else if (!istitleValid(title)) {
                showError(titleEl, 'Title is not valid.')
            } else {
                showSuccess(titleEl);
                valid = true;
            }
            return valid;
        };

        const checkTopic = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const topic = topicEl.value.trim();

            if (!isRequired(topic)) {
                showError(topicEl, 'Title cannot be blank.');
            } else if (!isBetween(topic.length, min, max)) {
                showError(topicEl, `Title must be between ${min} and ${max} characters.`)
            } else if (!isTopicValid(topic)) {
                showError(topicEl, 'Title is not valid.')
            } else {
                showSuccess(topicEl);
                valid = true;
            }
            return valid;
        };


        const checkStream = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const stream = streamEl.value.trim();

            if (!isRequired(stream)) {
                showError(streamEl, 'Stream cannot be blank.');
            } else if (!isBetween(stream.length, min, max)) {
                showError(streamEl, `Stream must be between ${min} and ${max} characters.`)
            } else if (!isStreamValid(stream)) {
                showError(streamEl, 'Stream is not valid.')
            } else {
                showSuccess(streamEl);
                valid = true;
            }
            return valid;
        };


        const checkSdate = () => {
            let valid = false;
            const sdate = sdateEl.value.trim();
            if (!isRequired(sdate)) {
                showError(sdateEl, 'Starting date cannot be blank.');
            } else {
                showSuccess(sdateEl);
                valid = true;
            }
            return valid;
        };

        const checkEdate = () => {
            let valid = false;
            const edate = edateEl.value.trim();
            if (!isRequired(edate)) {
                showError(edateEl, 'Starting date cannot be blank.');
            } else {
                showSuccess(edateEl);
                valid = true;
            }
            return valid;
        };


        const checkStudents = () => {
            let valid = false;
            const students = studentEl.value;
            if (students === '') {
                showError(studentEl, 'At least one student must be selected.');
            } else {
                showSuccess(studentEl);
                valid = true;
            }
            return valid;

        }
        const checkTrainers = () => {
            let valid = false;
            const trainers = trainerEl.value;
            if (trainers === '') {
                showError(trainerEl, 'At least one trainer must be selected.');
            } else {
                showSuccess(trainerEl);
                valid = true;
            }
            return valid;

        }
        const checkAssignments = () => {
            let valid = false;
            const assignments = assignmentEl.value;
            if (assignments === '') {
                showError(assignmentEl, 'At least one assignment must be selected.');
            } else {
                showSuccess(assignmentEl);
                valid = true;
            }
            return valid;

        }




        const isRequired = value => value === '' ? false : true;
        const isBetween = (length, min, max) => length < min || length > max ? false : true;


        const showError = (input, message) => {
            // get the form-field element
            const formField = input.parentElement;
            // add the error class
            formField.classList.remove('success');
            formField.classList.add('error');

            // show the error message
            const error = formField.querySelector('small');
            error.textContent = message;
        };

        const showSuccess = (input) => {
            // get the form-field element
            const formField = input.parentElement;

            // remove the error class
            formField.classList.remove('error');
            formField.classList.add('success');

            // hide the error message
            const error = formField.querySelector('small');
            error.textContent = '';
        }

        const istitleValid = (title) => {
            const re = /^[a-zA-Z]+([0-9])*$/;
            return re.test(title);
        }

        const isTopicValid = (topic) => {
            const re = /^[a-zA-Z#]+(,\s*[a-zA-Z#]+)*$/;
            return re.test(topic);
        }

        const isStreamValid = (stream) => {
            const re = /^\s*[A-Za-z0-9]+(?:\s+[A-Za-z0-9]+)*\s*$/;
            return re.test(stream);
        };



        const debounce = (fn, delay = 500) => {
            let timeoutId;
            return (...args) => {
                // cancel the previous timer
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                // setup a new timer
                timeoutId = setTimeout(() => {
                    fn.apply(null, args)
                }, delay);
            };
        };

        form.addEventListener('submit', function(e) {
            // prevent the form from submitting
            e.preventDefault();

            // validate fields
            let isTitleValid = checkTitle(),
                isTopicValid = checkTopic(),
                isStreamValid = checkStream(),
                isSdateValid = checkSdate(),
                isEdateValid = checkEdate(),
                isStudentsValid = checkStudents(),
                isTrainersValid = checkTrainers(),
                isAssignmentsValid = checkAssignments();

            let isFormValid = isTitleValid &&
                isTopicValid &&
                isStreamValid &&
                isSdateValid &&
                isEdateValid &&
                isStudentsValid &&
                isTrainersValid &&
                isAssignmentsValid;

            // submit if the form is valid
            if (isFormValid) {
                alert("Course " + topicEl.value + " " + streamEl.value + " updated!");
                var x = $("#title3").val();
                var y = $("#topic3").val();
                var z = $("#stream3").val();
                $("#course3").html(x + ", " + y + ", " + z);
                $('#form3 input').attr('readonly', 'readonly'),
                    $('#sdate3').prop('disabled', true),
                    $('#edate3').prop('disabled', true),
                    $('.update').prop('disabled', true),
                    $('#edit3').prop('disabled', false),
                    $('#form3 select').prop('disabled', true);
            }
        });

        form.addEventListener('input', debounce(function(e) {
            switch (e.target.id) {
                case 'title3':
                    checkTitle();
                    break;
                case 'topic3':
                    checkTopic();
                    break;
                case 'stream3':
                    checkStream();
                    break;
                case 'sdate3':
                    checkSdate();
                    break;
                case 'edate3':
                    checkEdate();
                    break;
                case 'sselect3':
                    checkStudents();
                    break;
                case 'tselect3':
                    checkTrainers();
                    break;
                case 'aselect3':
                    checkAssignments();
            }
        }));

    };

    // COURSE NUMERO QUATRO

    if ($('body').is('.courses')) {

        //EDIT BUTTON 
        $("#edit4").click(function() {
            $('#form4 input').removeAttr('readonly'),
                $('#sdate4').prop('disabled', false),
                $('#edate4').prop('disabled', false),
                $('#form4 input').prop('disabled', false),
                $('#edit4').prop('disabled', true),
                $('#form4 select').prop('disabled', false);
        });

        // DATE PICKER SCRIPT
        $('#sdate4').datepicker({
            onSelect: function(dateText, inst) {
                $('#edate4').datepicker('option', 'minDate', new Date(dateText));
            },
        });
        $('#edate4').datepicker({
            onSelect: function(dateText, inst) {
                $('#sdate4').datepicker('option', 'maxDate', new Date(dateText));
            }
        });


        const titleEl = document.querySelector('#title4');
        const topicEl = document.querySelector('#topic4');
        const streamEl = document.querySelector('#stream4');
        const sdateEl = document.querySelector('#sdate4');
        const edateEl = document.querySelector('#edate4');
        const studentEl = document.querySelector('#sselect4');
        const assignmentEl = document.querySelector('#aselect4');
        const trainerEl = document.querySelector('#tselect4');

        const form = document.querySelector('#form4');

        const checkTitle = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const title = titleEl.value.trim();

            if (!isRequired(title)) {
                showError(titleEl, 'Title cannot be blank.');
            } else if (!isBetween(title.length, min, max)) {
                showError(titleEl, `Title must be between ${min} and ${max} characters.`)
            } else if (!istitleValid(title)) {
                showError(titleEl, 'Title is not valid.')
            } else {
                showSuccess(titleEl);
                valid = true;
            }
            return valid;
        };

        const checkTopic = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const topic = topicEl.value.trim();

            if (!isRequired(topic)) {
                showError(topicEl, 'Title cannot be blank.');
            } else if (!isBetween(topic.length, min, max)) {
                showError(topicEl, `Title must be between ${min} and ${max} characters.`)
            } else if (!isTopicValid(topic)) {
                showError(topicEl, 'Title is not valid.')
            } else {
                showSuccess(topicEl);
                valid = true;
            }
            return valid;
        };


        const checkStream = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const stream = streamEl.value.trim();

            if (!isRequired(stream)) {
                showError(streamEl, 'Stream cannot be blank.');
            } else if (!isBetween(stream.length, min, max)) {
                showError(streamEl, `Stream must be between ${min} and ${max} characters.`)
            } else if (!isStreamValid(stream)) {
                showError(streamEl, 'Stream is not valid.')
            } else {
                showSuccess(streamEl);
                valid = true;
            }
            return valid;
        };


        const checkSdate = () => {
            let valid = false;
            const sdate = sdateEl.value.trim();
            if (!isRequired(sdate)) {
                showError(sdateEl, 'Starting date cannot be blank.');
            } else {
                showSuccess(sdateEl);
                valid = true;
            }
            return valid;
        };

        const checkEdate = () => {
            let valid = false;
            const edate = edateEl.value.trim();
            if (!isRequired(edate)) {
                showError(edateEl, 'Starting date cannot be blank.');
            } else {
                showSuccess(edateEl);
                valid = true;
            }
            return valid;
        };


        const checkStudents = () => {
            let valid = false;
            const students = studentEl.value;
            if (students === '') {
                showError(studentEl, 'At least one student must be selected.');
            } else {
                showSuccess(studentEl);
                valid = true;
            }
            return valid;

        }
        const checkTrainers = () => {
            let valid = false;
            const trainers = trainerEl.value;
            if (trainers === '') {
                showError(trainerEl, 'At least one trainer must be selected.');
            } else {
                showSuccess(trainerEl);
                valid = true;
            }
            return valid;

        }
        const checkAssignments = () => {
            let valid = false;
            const assignments = assignmentEl.value;
            if (assignments === '') {
                showError(assignmentEl, 'At least one assignment must be selected.');
            } else {
                showSuccess(assignmentEl);
                valid = true;
            }
            return valid;

        }




        const isRequired = value => value === '' ? false : true;
        const isBetween = (length, min, max) => length < min || length > max ? false : true;


        const showError = (input, message) => {
            // get the form-field element
            const formField = input.parentElement;
            // add the error class
            formField.classList.remove('success');
            formField.classList.add('error');

            // show the error message
            const error = formField.querySelector('small');
            error.textContent = message;
        };

        const showSuccess = (input) => {
            // get the form-field element
            const formField = input.parentElement;

            // remove the error class
            formField.classList.remove('error');
            formField.classList.add('success');

            // hide the error message
            const error = formField.querySelector('small');
            error.textContent = '';
        }

        const istitleValid = (title) => {
            const re = /^[a-zA-Z]+([0-9])*$/;
            return re.test(title);
        }

        const isTopicValid = (topic) => {
            const re = /^[a-zA-Z#]+(,\s*[a-zA-Z#]+)*$/;
            return re.test(topic);
        }

        const isStreamValid = (stream) => {
            const re = /^\s*[A-Za-z0-9]+(?:\s+[A-Za-z0-9]+)*\s*$/;
            return re.test(stream);
        };



        const debounce = (fn, delay = 500) => {
            let timeoutId;
            return (...args) => {
                // cancel the previous timer
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                // setup a new timer
                timeoutId = setTimeout(() => {
                    fn.apply(null, args)
                }, delay);
            };
        };

        form.addEventListener('submit', function(e) {
            // prevent the form from submitting
            e.preventDefault();

            // validate fields
            let isTitleValid = checkTitle(),
                isTopicValid = checkTopic(),
                isStreamValid = checkStream(),
                isSdateValid = checkSdate(),
                isEdateValid = checkEdate(),
                isStudentsValid = checkStudents(),
                isTrainersValid = checkTrainers(),
                isAssignmentsValid = checkAssignments();

            let isFormValid = isTitleValid &&
                isTopicValid &&
                isStreamValid &&
                isSdateValid &&
                isEdateValid &&
                isStudentsValid &&
                isTrainersValid &&
                isAssignmentsValid;

            // submit if the form is valid
            if (isFormValid) {
                alert("Course " + topicEl.value + " " + streamEl.value + " updated!");
                var x = $("#title4").val();
                var y = $("#topic4").val();
                var z = $("#stream4").val();
                $("#course4").html(x + ", " + y + ", " + z);
                $('#form4 input').attr('readonly', 'readonly'),
                    $('#sdate4').prop('disabled', true),
                    $('#edate4').prop('disabled', true),
                    $('.update').prop('disabled', true),
                    $('#edit4').prop('disabled', false),
                    $('#form4 select').prop('disabled', true);
            }
        });

        form.addEventListener('input', debounce(function(e) {
            switch (e.target.id) {
                case 'title4':
                    checkTitle();
                    break;
                case 'topic4':
                    checkTopic();
                    break;
                case 'stream4':
                    checkStream();
                    break;
                case 'sdate4':
                    checkSdate();
                    break;
                case 'edate4':
                    checkEdate();
                    break;
                case 'sselect4':
                    checkStudents();
                    break;
                case 'tselect4':
                    checkTrainers();
                    break;
                case 'aselect4':
                    checkAssignments();
            }
        }));

    };







    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
    //
    ////  VALIDATION OF STUDENT FORM

    if ($('body').is('.student_form')) {
        const firstnameEl = document.querySelector('#firstname');
        const lastnameEl = document.querySelector('#lastname');
        const emailEl = document.querySelector('#email');
        const phoneEl = document.querySelector('#phone');
        const dobEl = document.querySelector('#dob');
        const feesEl = document.querySelector('#fees');
        const courseEl = document.querySelector('#cselect');

        const form = document.querySelector('#sform');

        const checkfirstname = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const firstname = firstnameEl.value.trim();

            if (!isRequired(firstname)) {
                showError(firstnameEl, 'First name cannot be blank.');
            } else if (!isBetween(firstname.length, min, max)) {
                showError(firstnameEl, `First name must be between ${min} and ${max} characters.`)
            } else if (!isFirstNameValid(firstname)) {
                showError(firstnameEl, 'First name is not valid.')
            } else {
                showSuccess(firstnameEl);
                valid = true;
            }
            return valid;
        };

        const checklastname = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const lastname = lastnameEl.value.trim();

            if (!isRequired(lastname)) {
                showError(lastnameEl, 'Last name cannot be blank.');
            } else if (!isBetween(lastname.length, min, max)) {
                showError(lastnameEl, `Last name must be between ${min} and ${max} characters.`)
            } else if (!isLastNameValid(lastname)) {
                showError(lastnameEl, 'Last name is not valid.')
            } else {
                showSuccess(lastnameEl);
                valid = true;
            }
            return valid;
        };


        const checkEmail = () => {
            let valid = false;
            const email = emailEl.value.trim();
            if (!isRequired(email)) {
                showError(emailEl, 'Email cannot be blank.');
            } else if (!isEmailValid(email)) {
                showError(emailEl, 'Email is not valid.')
            } else {
                showSuccess(emailEl);
                valid = true;
            }
            return valid;
        };

        const checkPhone = () => {
            let valid = false;
            const phone = phoneEl.value.trim();
            if (!isRequired(phone)) {
                showError(phoneEl, 'Phone cannot be blank.');
            } else if (!isPhoneValid(phone)) {
                showError(phoneEl, 'Phone is not valid')
            } else {
                showSuccess(phoneEl);
                valid = true;
            }
            return valid;
        }

        const checkDob = () => {
            let valid = false;
            const dob = dobEl.value.trim();
            if (!isRequired(dob)) {
                showError(dobEl, 'Date of birth cannot be blank.');
            } else if (!isDobValid(dob)) {
                showError(dobEl, 'Date of birth is not valid.')
            } else {
                showSuccess(dobEl);
                valid = true;
            }
            return valid;
        };

        const checkFees = () => {
            let valid = false;
            const fees = feesEl.value.trim();
            if (fees === '0') {
                showError(feesEl, 'Tuition fees cannot be 0.');
            } else if (!isRequired(fees)) {
                showError(feesEl, 'Tuition fees cannot be blank.');
            } else {
                showSuccess(feesEl);
                valid = true;
            }
            return valid;
        };

        const checkEnrollment = () => {
            let valid = false;
            const enrollment = courseEl.value;
            if (enrollment === '') {
                showError(courseEl, 'At least one course must be selected.');
            } else {
                showSuccess(courseEl);
                valid = true;
            }
            return valid;

        }



        const isRequired = value => value === '' ? false : true;
        const isBetween = (length, min, max) => length < min || length > max ? false : true;


        const showError = (input, message) => {
            // get the form-field element
            const formField = input.parentElement;
            // add the error class
            formField.classList.remove('success');
            formField.classList.add('error');

            // show the error message
            const error = formField.querySelector('small');
            error.textContent = message;
        };

        const showSuccess = (input) => {
            const formField = input.parentElement;

            formField.classList.remove('error');
            formField.classList.add('success');

            const error = formField.querySelector('small');
            error.textContent = '';
        }

        const isFirstNameValid = (firstname) => {
            const re = /^[a-zA-Z]*$/;
            return re.test(firstname);
        }

        const isLastNameValid = (lastname) => {
            const re = /^[a-zA-Z]*$/;
            return re.test(lastname);
        }

        const isEmailValid = (email) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        };

        const isPhoneValid = (phone) => {
            const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            return re.test(phone);
        };

        const isDobValid = (dob) => {
            const re = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
            return re.test(dob);
        }

        form.addEventListener('submit', function(e) {
            // prevent the form from submitting
            e.preventDefault();

            // validate fields
            let isfirstnameValid = checkfirstname(),
                isLastNameValid = checklastname(),
                isEmailValid = checkEmail(),
                isphoneValid = checkPhone(),
                isDoBvalid = checkDob(),
                isfeevalid = checkFees(),
                isEnrollmentValid = checkEnrollment();

            let isFormValid = isfirstnameValid &&
                isLastNameValid &&
                isEmailValid &&
                isphoneValid &&
                isDoBvalid &&
                isfeevalid &&
                isEnrollmentValid;

            // submit if the form is valid
            if (isFormValid) {
                alert("Student " + firstnameEl.value + " " + lastnameEl.value + " created!");
                form.reset();
            }
        });

        const debounce = (fn, delay = 500) => {
            let timeoutId;
            return (...args) => {
                // cancel the previous timer
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                // setup a new timer
                timeoutId = setTimeout(() => {
                    fn.apply(null, args)
                }, delay);
            };
        };

        form.addEventListener('input', debounce(function(e) {
            switch (e.target.id) {
                case 'firstname':
                    checkfirstname();
                    break;
                case 'lastname':
                    checklastname();
                    break;
                case 'email':
                    checkEmail();
                    break;
                case 'phone':
                    checkPhone();
                    break;
                case 'dob':
                    checkDob();
                    break;
                case 'fees':
                    checkFees();
                    break;
                case 'cselect':
                    checkEnrollment();
            }
        }));

    };






    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
    //
    // VALIDATION OF DUMMY STUDENTS

    // STUDENT ONE

    if ($('body').is('.students')) {

        $("#edit1").click(function() {
            $('#form1 input').removeAttr('readonly'),
                $('#form1 input').prop('disabled', false),
                $('#edit1').prop('disabled', true),
                $('#form1 select').prop('disabled', false);
        });


        const firstnameEl = document.querySelector('#firstname1');
        const lastnameEl = document.querySelector('#lastname1');
        const emailEl = document.querySelector('#email1');
        const phoneEl = document.querySelector('#phone1');
        const dobEl = document.querySelector('#dob1');
        const feesEl = document.querySelector('#fees1');
        const courseEl = document.querySelector('#cselect1');
        const assignmentEl = document.querySelector('#aselect1');

        const form = document.querySelector('#form1');

        const checkfirstname = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const firstname = firstnameEl.value.trim();

            if (!isRequired(firstname)) {
                showError(firstnameEl, 'First name cannot be blank.');
            } else if (!isBetween(firstname.length, min, max)) {
                showError(firstnameEl, `First name must be between ${min} and ${max} characters.`)
            } else if (!isFirstNameValid(firstname)) {
                showError(firstnameEl, 'First name is not valid.')
            } else {
                showSuccess(firstnameEl);
                valid = true;
            }
            return valid;
        };

        const checklastname = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const lastname = lastnameEl.value.trim();

            if (!isRequired(lastname)) {
                showError(lastnameEl, 'Last name cannot be blank.');
            } else if (!isBetween(lastname.length, min, max)) {
                showError(lastnameEl, `Last name must be between ${min} and ${max} characters.`)
            } else if (!isLastNameValid(lastname)) {
                showError(lastnameEl, 'Last name is not valid.')
            } else {
                showSuccess(lastnameEl);
                valid = true;
            }
            return valid;
        };


        const checkEmail = () => {
            let valid = false;
            const email = emailEl.value.trim();
            if (!isRequired(email)) {
                showError(emailEl, 'Email cannot be blank.');
            } else if (!isEmailValid(email)) {
                showError(emailEl, 'Email is not valid.')
            } else {
                showSuccess(emailEl);
                valid = true;
            }
            return valid;
        };

        const checkPhone = () => {
            let valid = false;
            const phone = phoneEl.value.trim();
            if (!isRequired(phone)) {
                showError(phoneEl, 'Phone cannot be blank.');
            } else if (!isPhoneValid(phone)) {
                showError(phoneEl, 'Phone is not valid')
            } else {
                showSuccess(phoneEl);
                valid = true;
            }
            return valid;
        }

        const checkDob = () => {
            let valid = false;
            const dob = dobEl.value.trim();
            if (!isRequired(dob)) {
                showError(dobEl, 'Date of birth cannot be blank.');
            } else if (!isDobValid(dob)) {
                showError(dobEl, 'Date of birth is not valid.')
            } else {
                showSuccess(dobEl);
                valid = true;
            }
            return valid;
        };

        const checkFees = () => {
            let valid = false;
            const fees = feesEl.value.trim();
            if (fees === '0') {
                showError(feesEl, 'Tuition fees cannot be 0.');
            } else if (!isRequired(fees)) {
                showError(feesEl, 'Tuition fees cannot be blank.');
            } else {
                showSuccess(feesEl);
                valid = true;
            }
            return valid;
        };

        const checkEnrollment = () => {
            let valid = false;
            const enrollment = courseEl.value;
            if (enrollment === '') {
                showError(courseEl, 'At least one course must be selected.');
            } else {
                showSuccess(courseEl);
                valid = true;
            }
            return valid;

        }

        const checkAssignment = () => {
            let valid = false;
            const assignment = assignmentEl.value;
            if (assignment === '') {
                showError(assignmentEl, 'At least one assignment must be selected.');
            } else {
                showSuccess(assignmentEl);
                valid = true;
            }
            return valid;

        }



        const isRequired = value => value === '' ? false : true;
        const isBetween = (length, min, max) => length < min || length > max ? false : true;


        const showError = (input, message) => {
            // get the form-field element
            const formField = input.parentElement;
            // add the error class
            formField.classList.remove('success');
            formField.classList.add('error');

            // show the error message
            const error = formField.querySelector('small');
            error.textContent = message;
        };

        const showSuccess = (input) => {
            const formField = input.parentElement;

            formField.classList.remove('error');
            formField.classList.add('success');

            const error = formField.querySelector('small');
            error.textContent = '';
        }

        const isFirstNameValid = (firstname) => {
            const re = /^[a-zA-Z]*$/;
            return re.test(firstname);
        }

        const isLastNameValid = (lastname) => {
            const re = /^[a-zA-Z]*$/;
            return re.test(lastname);
        }

        const isEmailValid = (email) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        };

        const isPhoneValid = (phone) => {
            const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            return re.test(phone);
        };

        const isDobValid = (dob) => {
            const re = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
            return re.test(dob);
        }

        form.addEventListener('submit', function(e) {
            // prevent the form from submitting
            e.preventDefault();

            // validate fields
            let isfirstnameValid = checkfirstname(),
                isLastNameValid = checklastname(),
                isEmailValid = checkEmail(),
                isphoneValid = checkPhone(),
                isDoBvalid = checkDob(),
                isfeevalid = checkFees(),
                isEnrollmentValid = checkEnrollment(),
                isAssignmentValid = checkAssignment();

            let isFormValid = isfirstnameValid &&
                isLastNameValid &&
                isEmailValid &&
                isphoneValid &&
                isDoBvalid &&
                isfeevalid &&
                isAssignmentValid &&
                isEnrollmentValid;

            // submit if the form is valid
            if (isFormValid) {
                alert("Student " + firstnameEl.value + " " + lastnameEl.value + " updated!");
                var x = $("#firstname1").val();
                var y = $("#lastname1").val();
                var z = $("#cselect1").val();
                $("#student1").html(x + " " + y + ", " + z);
                $('#form1 input').attr('readonly', 'readonly'),
                    $('.update').prop('disabled', true),
                    $('#edit1').prop('disabled', false),
                    $('#form1 select').prop('disabled', true);
            }
        });


        const debounce = (fn, delay = 500) => {
            let timeoutId;
            return (...args) => {
                // cancel the previous timer
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                // setup a new timer
                timeoutId = setTimeout(() => {
                    fn.apply(null, args)
                }, delay);
            };
        };

        form.addEventListener('input', debounce(function(e) {
            switch (e.target.id) {
                case 'firstname1':
                    checkfirstname();
                    break;
                case 'lastname1':
                    checklastname();
                    break;
                case 'email1':
                    checkEmail();
                    break;
                case 'phone1':
                    checkPhone();
                    break;
                case 'dob1':
                    checkDob();
                    break;
                case 'fees1':
                    checkFees();
                    break;
                case 'cselect1':
                    checkEnrollment();
                    break;
                case 'aselect1':
                    checkAssignment();
            }
        }));

    };


    // STUDENT TWO
    if ($('body').is('.students')) {

        $("#edit2").click(function() {
            $('#form2 input').removeAttr('readonly'),
                $('#form2 input').prop('disabled', false),
                $('#edit2').prop('disabled', true),
                $('#form2 select').prop('disabled', false);
        });


        const firstnameEl = document.querySelector('#firstname2');
        const lastnameEl = document.querySelector('#lastname2');
        const emailEl = document.querySelector('#email2');
        const phoneEl = document.querySelector('#phone2');
        const dobEl = document.querySelector('#dob2');
        const feesEl = document.querySelector('#fees2');
        const courseEl = document.querySelector('#cselect2');
        const assignmentEl = document.querySelector('#aselect2');

        const form = document.querySelector('#form2');

        const checkfirstname = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const firstname = firstnameEl.value.trim();

            if (!isRequired(firstname)) {
                showError(firstnameEl, 'First name cannot be blank.');
            } else if (!isBetween(firstname.length, min, max)) {
                showError(firstnameEl, `First name must be between ${min} and ${max} characters.`)
            } else if (!isFirstNameValid(firstname)) {
                showError(firstnameEl, 'First name is not valid.')
            } else {
                showSuccess(firstnameEl);
                valid = true;
            }
            return valid;
        };

        const checklastname = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const lastname = lastnameEl.value.trim();

            if (!isRequired(lastname)) {
                showError(lastnameEl, 'Last name cannot be blank.');
            } else if (!isBetween(lastname.length, min, max)) {
                showError(lastnameEl, `Last name must be between ${min} and ${max} characters.`)
            } else if (!isLastNameValid(lastname)) {
                showError(lastnameEl, 'Last name is not valid.')
            } else {
                showSuccess(lastnameEl);
                valid = true;
            }
            return valid;
        };


        const checkEmail = () => {
            let valid = false;
            const email = emailEl.value.trim();
            if (!isRequired(email)) {
                showError(emailEl, 'Email cannot be blank.');
            } else if (!isEmailValid(email)) {
                showError(emailEl, 'Email is not valid.')
            } else {
                showSuccess(emailEl);
                valid = true;
            }
            return valid;
        };

        const checkPhone = () => {
            let valid = false;
            const phone = phoneEl.value.trim();
            if (!isRequired(phone)) {
                showError(phoneEl, 'Phone cannot be blank.');
            } else if (!isPhoneValid(phone)) {
                showError(phoneEl, 'Phone is not valid')
            } else {
                showSuccess(phoneEl);
                valid = true;
            }
            return valid;
        }

        const checkDob = () => {
            let valid = false;
            const dob = dobEl.value.trim();
            if (!isRequired(dob)) {
                showError(dobEl, 'Date of birth cannot be blank.');
            } else if (!isDobValid(dob)) {
                showError(dobEl, 'Date of birth is not valid.')
            } else {
                showSuccess(dobEl);
                valid = true;
            }
            return valid;
        };

        const checkFees = () => {
            let valid = false;
            const fees = feesEl.value.trim();
            if (fees === '0') {
                showError(feesEl, 'Tuition fees cannot be 0.');
            } else if (!isRequired(fees)) {
                showError(feesEl, 'Tuition fees cannot be blank.');
            } else {
                showSuccess(feesEl);
                valid = true;
            }
            return valid;
        };

        const checkEnrollment = () => {
            let valid = false;
            const enrollment = courseEl.value;
            if (enrollment === '') {
                showError(courseEl, 'At least one course must be selected.');
            } else {
                showSuccess(courseEl);
                valid = true;
            }
            return valid;

        }

        const checkAssignment = () => {
            let valid = false;
            const assignment = assignmentEl.value;
            if (assignment === '') {
                showError(assignmentEl, 'At least one assignment must be selected.');
            } else {
                showSuccess(assignmentEl);
                valid = true;
            }
            return valid;

        }



        const isRequired = value => value === '' ? false : true;
        const isBetween = (length, min, max) => length < min || length > max ? false : true;


        const showError = (input, message) => {
            // get the form-field element
            const formField = input.parentElement;
            // add the error class
            formField.classList.remove('success');
            formField.classList.add('error');

            // show the error message
            const error = formField.querySelector('small');
            error.textContent = message;
        };

        const showSuccess = (input) => {
            const formField = input.parentElement;

            formField.classList.remove('error');
            formField.classList.add('success');

            const error = formField.querySelector('small');
            error.textContent = '';
        }

        const isFirstNameValid = (firstname) => {
            const re = /^[a-zA-Z]*$/;
            return re.test(firstname);
        }

        const isLastNameValid = (lastname) => {
            const re = /^[a-zA-Z]*$/;
            return re.test(lastname);
        }

        const isEmailValid = (email) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        };

        const isPhoneValid = (phone) => {
            const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            return re.test(phone);
        };

        const isDobValid = (dob) => {
            const re = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
            return re.test(dob);
        }

        form.addEventListener('submit', function(e) {
            // prevent the form from submitting
            e.preventDefault();

            // validate fields
            let isfirstnameValid = checkfirstname(),
                isLastNameValid = checklastname(),
                isEmailValid = checkEmail(),
                isphoneValid = checkPhone(),
                isDoBvalid = checkDob(),
                isfeevalid = checkFees(),
                isEnrollmentValid = checkEnrollment(),
                isAssignmentValid = checkAssignment();

            let isFormValid = isfirstnameValid &&
                isLastNameValid &&
                isEmailValid &&
                isphoneValid &&
                isDoBvalid &&
                isfeevalid &&
                isAssignmentValid &&
                isEnrollmentValid;

            // submit if the form is valid
            if (isFormValid) {
                alert("Student " + firstnameEl.value + " " + lastnameEl.value + " updated!");
                var x = $("#firstname2").val();
                var y = $("#lastname2").val();
                var z = $("#cselect2").val();
                $("#student2").html(x + " " + y + ", " + z);
                $('#form2 input').attr('readonly', 'readonly'),
                    $('.update').prop('disabled', true),
                    $('#edit2').prop('disabled', false),
                    $('#form2 select').prop('disabled', true);
            }
        });


        const debounce = (fn, delay = 500) => {
            let timeoutId;
            return (...args) => {
                // cancel the previous timer
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                // setup a new timer
                timeoutId = setTimeout(() => {
                    fn.apply(null, args)
                }, delay);
            };
        };

        form.addEventListener('input', debounce(function(e) {
            switch (e.target.id) {
                case 'firstname2':
                    checkfirstname();
                    break;
                case 'lastname2':
                    checklastname();
                    break;
                case 'email2':
                    checkEmail();
                    break;
                case 'phone2':
                    checkPhone();
                    break;
                case 'dob2':
                    checkDob();
                    break;
                case 'fees2':
                    checkFees();
                    break;
                case 'cselect2':
                    checkEnrollment();
                    break;
                case 'aselect2':
                    checkAssignment();
            }
        }));
    };

    // STUDENT THREE
    if ($('body').is('.students')) {

        $("#edit3").click(function() {
            $('#form3 input').removeAttr('readonly'),
                $('#form3 input').prop('disabled', false),
                $('#edit3').prop('disabled', true),
                $('#form3 select').prop('disabled', false);
        });


        const firstnameEl = document.querySelector('#firstname3');
        const lastnameEl = document.querySelector('#lastname3');
        const emailEl = document.querySelector('#email3');
        const phoneEl = document.querySelector('#phone3');
        const dobEl = document.querySelector('#dob3');
        const feesEl = document.querySelector('#fees3');
        const courseEl = document.querySelector('#cselect3');
        const assignmentEl = document.querySelector('#aselect3');

        const form = document.querySelector('#form3');

        const checkfirstname = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const firstname = firstnameEl.value.trim();

            if (!isRequired(firstname)) {
                showError(firstnameEl, 'First name cannot be blank.');
            } else if (!isBetween(firstname.length, min, max)) {
                showError(firstnameEl, `First name must be between ${min} and ${max} characters.`)
            } else if (!isFirstNameValid(firstname)) {
                showError(firstnameEl, 'First name is not valid.')
            } else {
                showSuccess(firstnameEl);
                valid = true;
            }
            return valid;
        };

        const checklastname = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const lastname = lastnameEl.value.trim();

            if (!isRequired(lastname)) {
                showError(lastnameEl, 'Last name cannot be blank.');
            } else if (!isBetween(lastname.length, min, max)) {
                showError(lastnameEl, `Last name must be between ${min} and ${max} characters.`)
            } else if (!isLastNameValid(lastname)) {
                showError(lastnameEl, 'Last name is not valid.')
            } else {
                showSuccess(lastnameEl);
                valid = true;
            }
            return valid;
        };


        const checkEmail = () => {
            let valid = false;
            const email = emailEl.value.trim();
            if (!isRequired(email)) {
                showError(emailEl, 'Email cannot be blank.');
            } else if (!isEmailValid(email)) {
                showError(emailEl, 'Email is not valid.')
            } else {
                showSuccess(emailEl);
                valid = true;
            }
            return valid;
        };

        const checkPhone = () => {
            let valid = false;
            const phone = phoneEl.value.trim();
            if (!isRequired(phone)) {
                showError(phoneEl, 'Phone cannot be blank.');
            } else if (!isPhoneValid(phone)) {
                showError(phoneEl, 'Phone is not valid')
            } else {
                showSuccess(phoneEl);
                valid = true;
            }
            return valid;
        }

        const checkDob = () => {
            let valid = false;
            const dob = dobEl.value.trim();
            if (!isRequired(dob)) {
                showError(dobEl, 'Date of birth cannot be blank.');
            } else if (!isDobValid(dob)) {
                showError(dobEl, 'Date of birth is not valid.')
            } else {
                showSuccess(dobEl);
                valid = true;
            }
            return valid;
        };

        const checkFees = () => {
            let valid = false;
            const fees = feesEl.value.trim();
            if (fees === '0') {
                showError(feesEl, 'Tuition fees cannot be 0.');
            } else if (!isRequired(fees)) {
                showError(feesEl, 'Tuition fees cannot be blank.');
            } else {
                showSuccess(feesEl);
                valid = true;
            }
            return valid;
        };

        const checkEnrollment = () => {
            let valid = false;
            const enrollment = courseEl.value;
            if (enrollment === '') {
                showError(courseEl, 'At least one course must be selected.');
            } else {
                showSuccess(courseEl);
                valid = true;
            }
            return valid;

        }

        const checkAssignment = () => {
            let valid = false;
            const assignment = assignmentEl.value;
            if (assignment === '') {
                showError(assignmentEl, 'At least one assignment must be selected.');
            } else {
                showSuccess(assignmentEl);
                valid = true;
            }
            return valid;

        }



        const isRequired = value => value === '' ? false : true;
        const isBetween = (length, min, max) => length < min || length > max ? false : true;


        const showError = (input, message) => {
            // get the form-field element
            const formField = input.parentElement;
            // add the error class
            formField.classList.remove('success');
            formField.classList.add('error');

            // show the error message
            const error = formField.querySelector('small');
            error.textContent = message;
        };

        const showSuccess = (input) => {
            const formField = input.parentElement;

            formField.classList.remove('error');
            formField.classList.add('success');

            const error = formField.querySelector('small');
            error.textContent = '';
        }

        const isFirstNameValid = (firstname) => {
            const re = /^[a-zA-Z]*$/;
            return re.test(firstname);
        }

        const isLastNameValid = (lastname) => {
            const re = /^[a-zA-Z]*$/;
            return re.test(lastname);
        }

        const isEmailValid = (email) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        };

        const isPhoneValid = (phone) => {
            const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            return re.test(phone);
        };

        const isDobValid = (dob) => {
            const re = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
            return re.test(dob);
        }

        form.addEventListener('submit', function(e) {
            // prevent the form from submitting
            e.preventDefault();

            // validate fields
            let isfirstnameValid = checkfirstname(),
                isLastNameValid = checklastname(),
                isEmailValid = checkEmail(),
                isphoneValid = checkPhone(),
                isDoBvalid = checkDob(),
                isfeevalid = checkFees(),
                isEnrollmentValid = checkEnrollment(),
                isAssignmentValid = checkAssignment();

            let isFormValid = isfirstnameValid &&
                isLastNameValid &&
                isEmailValid &&
                isphoneValid &&
                isDoBvalid &&
                isfeevalid &&
                isAssignmentValid &&
                isEnrollmentValid;

            // submit if the form is valid
            if (isFormValid) {
                alert("Student " + firstnameEl.value + " " + lastnameEl.value + " updated!");
                var x = $("#firstname3").val();
                var y = $("#lastname3").val();
                var z = $("#cselect3").val();
                $("#student3").html(x + " " + y + ", " + z);
                $('#form3 input').attr('readonly', 'readonly'),
                    $('.update').prop('disabled', true),
                    $('#edit3').prop('disabled', false),
                    $('#form3 select').prop('disabled', true);
            }
        });


        const debounce = (fn, delay = 500) => {
            let timeoutId;
            return (...args) => {
                // cancel the previous timer
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                // setup a new timer
                timeoutId = setTimeout(() => {
                    fn.apply(null, args)
                }, delay);
            };
        };

        form.addEventListener('input', debounce(function(e) {
            switch (e.target.id) {
                case 'firstname3':
                    checkfirstname();
                    break;
                case 'lastname3':
                    checklastname();
                    break;
                case 'email3':
                    checkEmail();
                    break;
                case 'phone3':
                    checkPhone();
                    break;
                case 'dob3':
                    checkDob();
                    break;
                case 'fees3':
                    checkFees();
                    break;
                case 'cselect3':
                    checkEnrollment();
                    break;
                case 'aselect3':
                    checkAssignment();
            }
        }));
    };

    // STUDENT FOUR
    if ($('body').is('.students')) {

        $("#edit4").click(function() {
            $('#form4 input').removeAttr('readonly'),
                $('#form4 input').prop('disabled', false),
                $('#edit4').prop('disabled', true),
                $('#form4 select').prop('disabled', false);
        });


        const firstnameEl = document.querySelector('#firstname4');
        const lastnameEl = document.querySelector('#lastname4');
        const emailEl = document.querySelector('#email4');
        const phoneEl = document.querySelector('#phone4');
        const dobEl = document.querySelector('#dob4');
        const feesEl = document.querySelector('#fees4');
        const courseEl = document.querySelector('#cselect4');
        const assignmentEl = document.querySelector('#aselect4');

        const form = document.querySelector('#form4');

        const checkfirstname = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const firstname = firstnameEl.value.trim();

            if (!isRequired(firstname)) {
                showError(firstnameEl, 'First name cannot be blank.');
            } else if (!isBetween(firstname.length, min, max)) {
                showError(firstnameEl, `First name must be between ${min} and ${max} characters.`)
            } else if (!isFirstNameValid(firstname)) {
                showError(firstnameEl, 'First name is not valid.')
            } else {
                showSuccess(firstnameEl);
                valid = true;
            }
            return valid;
        };

        const checklastname = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const lastname = lastnameEl.value.trim();

            if (!isRequired(lastname)) {
                showError(lastnameEl, 'Last name cannot be blank.');
            } else if (!isBetween(lastname.length, min, max)) {
                showError(lastnameEl, `Last name must be between ${min} and ${max} characters.`)
            } else if (!isLastNameValid(lastname)) {
                showError(lastnameEl, 'Last name is not valid.')
            } else {
                showSuccess(lastnameEl);
                valid = true;
            }
            return valid;
        };


        const checkEmail = () => {
            let valid = false;
            const email = emailEl.value.trim();
            if (!isRequired(email)) {
                showError(emailEl, 'Email cannot be blank.');
            } else if (!isEmailValid(email)) {
                showError(emailEl, 'Email is not valid.')
            } else {
                showSuccess(emailEl);
                valid = true;
            }
            return valid;
        };

        const checkPhone = () => {
            let valid = false;
            const phone = phoneEl.value.trim();
            if (!isRequired(phone)) {
                showError(phoneEl, 'Phone cannot be blank.');
            } else if (!isPhoneValid(phone)) {
                showError(phoneEl, 'Phone is not valid')
            } else {
                showSuccess(phoneEl);
                valid = true;
            }
            return valid;
        }

        const checkDob = () => {
            let valid = false;
            const dob = dobEl.value.trim();
            if (!isRequired(dob)) {
                showError(dobEl, 'Date of birth cannot be blank.');
            } else if (!isDobValid(dob)) {
                showError(dobEl, 'Date of birth is not valid.')
            } else {
                showSuccess(dobEl);
                valid = true;
            }
            return valid;
        };

        const checkFees = () => {
            let valid = false;
            const fees = feesEl.value.trim();
            if (fees === '0') {
                showError(feesEl, 'Tuition fees cannot be 0.');
            } else if (!isRequired(fees)) {
                showError(feesEl, 'Tuition fees cannot be blank.');
            } else {
                showSuccess(feesEl);
                valid = true;
            }
            return valid;
        };

        const checkEnrollment = () => {
            let valid = false;
            const enrollment = courseEl.value;
            if (enrollment === '') {
                showError(courseEl, 'At least one course must be selected.');
            } else {
                showSuccess(courseEl);
                valid = true;
            }
            return valid;

        }

        const checkAssignment = () => {
            let valid = false;
            const assignment = assignmentEl.value;
            if (assignment === '') {
                showError(assignmentEl, 'At least one assignment must be selected.');
            } else {
                showSuccess(assignmentEl);
                valid = true;
            }
            return valid;

        }



        const isRequired = value => value === '' ? false : true;
        const isBetween = (length, min, max) => length < min || length > max ? false : true;


        const showError = (input, message) => {
            // get the form-field element
            const formField = input.parentElement;
            // add the error class
            formField.classList.remove('success');
            formField.classList.add('error');

            // show the error message
            const error = formField.querySelector('small');
            error.textContent = message;
        };

        const showSuccess = (input) => {
            const formField = input.parentElement;

            formField.classList.remove('error');
            formField.classList.add('success');

            const error = formField.querySelector('small');
            error.textContent = '';
        }

        const isFirstNameValid = (firstname) => {
            const re = /^[a-zA-Z]*$/;
            return re.test(firstname);
        }

        const isLastNameValid = (lastname) => {
            const re = /^[a-zA-Z]*$/;
            return re.test(lastname);
        }

        const isEmailValid = (email) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        };

        const isPhoneValid = (phone) => {
            const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            return re.test(phone);
        };

        const isDobValid = (dob) => {
            const re = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
            return re.test(dob);
        }

        form.addEventListener('submit', function(e) {
            // prevent the form from submitting
            e.preventDefault();

            // validate fields
            let isfirstnameValid = checkfirstname(),
                isLastNameValid = checklastname(),
                isEmailValid = checkEmail(),
                isphoneValid = checkPhone(),
                isDoBvalid = checkDob(),
                isfeevalid = checkFees(),
                isEnrollmentValid = checkEnrollment(),
                isAssignmentValid = checkAssignment();

            let isFormValid = isfirstnameValid &&
                isLastNameValid &&
                isEmailValid &&
                isphoneValid &&
                isDoBvalid &&
                isfeevalid &&
                isAssignmentValid &&
                isEnrollmentValid;

            // submit if the form is valid
            if (isFormValid) {
                alert("Student " + firstnameEl.value + " " + lastnameEl.value + " updated!");
                var x = $("#firstname4").val();
                var y = $("#lastname4").val();
                var z = $("#cselect4").val();
                $("#student4").html(x + " " + y + ", " + z);
                $('#form4 input').attr('readonly', 'readonly'),
                    $('.update').prop('disabled', true),
                    $('#edit4').prop('disabled', false),
                    $('#form4 select').prop('disabled', true);
            }
        });


        const debounce = (fn, delay = 500) => {
            let timeoutId;
            return (...args) => {
                // cancel the previous timer
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                // setup a new timer
                timeoutId = setTimeout(() => {
                    fn.apply(null, args)
                }, delay);
            };
        };

        form.addEventListener('input', debounce(function(e) {
            switch (e.target.id) {
                case 'firstname4':
                    checkfirstname();
                    break;
                case 'lastname4':
                    checklastname();
                    break;
                case 'email4':
                    checkEmail();
                    break;
                case 'phone4':
                    checkPhone();
                    break;
                case 'dob4':
                    checkDob();
                    break;
                case 'fees4':
                    checkFees();
                    break;
                case 'cselect4':
                    checkEnrollment();
                    break;
                case 'aselect4':
                    checkAssignment();
            }
        }));
    };

    // STUDENT FIVE
    if ($('body').is('.students')) {

        $("#edit5").click(function() {
            $('#form5 input').removeAttr('readonly'),
                $('#form5 input').prop('disabled', false),
                $('#edit5').prop('disabled', true),
                $('#form5 select').prop('disabled', false);
        });


        const firstnameEl = document.querySelector('#firstname5');
        const lastnameEl = document.querySelector('#lastname5');
        const emailEl = document.querySelector('#email5');
        const phoneEl = document.querySelector('#phone5');
        const dobEl = document.querySelector('#dob5');
        const feesEl = document.querySelector('#fees5');
        const courseEl = document.querySelector('#cselect5');
        const assignmentEl = document.querySelector('#aselect5');

        const form = document.querySelector('#form5');

        const checkfirstname = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const firstname = firstnameEl.value.trim();

            if (!isRequired(firstname)) {
                showError(firstnameEl, 'First name cannot be blank.');
            } else if (!isBetween(firstname.length, min, max)) {
                showError(firstnameEl, `First name must be between ${min} and ${max} characters.`)
            } else if (!isFirstNameValid(firstname)) {
                showError(firstnameEl, 'First name is not valid.')
            } else {
                showSuccess(firstnameEl);
                valid = true;
            }
            return valid;
        };

        const checklastname = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const lastname = lastnameEl.value.trim();

            if (!isRequired(lastname)) {
                showError(lastnameEl, 'Last name cannot be blank.');
            } else if (!isBetween(lastname.length, min, max)) {
                showError(lastnameEl, `Last name must be between ${min} and ${max} characters.`)
            } else if (!isLastNameValid(lastname)) {
                showError(lastnameEl, 'Last name is not valid.')
            } else {
                showSuccess(lastnameEl);
                valid = true;
            }
            return valid;
        };


        const checkEmail = () => {
            let valid = false;
            const email = emailEl.value.trim();
            if (!isRequired(email)) {
                showError(emailEl, 'Email cannot be blank.');
            } else if (!isEmailValid(email)) {
                showError(emailEl, 'Email is not valid.')
            } else {
                showSuccess(emailEl);
                valid = true;
            }
            return valid;
        };

        const checkPhone = () => {
            let valid = false;
            const phone = phoneEl.value.trim();
            if (!isRequired(phone)) {
                showError(phoneEl, 'Phone cannot be blank.');
            } else if (!isPhoneValid(phone)) {
                showError(phoneEl, 'Phone is not valid')
            } else {
                showSuccess(phoneEl);
                valid = true;
            }
            return valid;
        }

        const checkDob = () => {
            let valid = false;
            const dob = dobEl.value.trim();
            if (!isRequired(dob)) {
                showError(dobEl, 'Date of birth cannot be blank.');
            } else if (!isDobValid(dob)) {
                showError(dobEl, 'Date of birth is not valid.')
            } else {
                showSuccess(dobEl);
                valid = true;
            }
            return valid;
        };

        const checkFees = () => {
            let valid = false;
            const fees = feesEl.value.trim();
            if (fees === '0') {
                showError(feesEl, 'Tuition fees cannot be 0.');
            } else if (!isRequired(fees)) {
                showError(feesEl, 'Tuition fees cannot be blank.');
            } else {
                showSuccess(feesEl);
                valid = true;
            }
            return valid;
        };

        const checkEnrollment = () => {
            let valid = false;
            const enrollment = courseEl.value;
            if (enrollment === '') {
                showError(courseEl, 'At least one course must be selected.');
            } else {
                showSuccess(courseEl);
                valid = true;
            }
            return valid;

        }

        const checkAssignment = () => {
            let valid = false;
            const assignment = assignmentEl.value;
            if (assignment === '') {
                showError(assignmentEl, 'At least one assignment must be selected.');
            } else {
                showSuccess(assignmentEl);
                valid = true;
            }
            return valid;

        }



        const isRequired = value => value === '' ? false : true;
        const isBetween = (length, min, max) => length < min || length > max ? false : true;


        const showError = (input, message) => {
            // get the form-field element
            const formField = input.parentElement;
            // add the error class
            formField.classList.remove('success');
            formField.classList.add('error');

            // show the error message
            const error = formField.querySelector('small');
            error.textContent = message;
        };

        const showSuccess = (input) => {
            const formField = input.parentElement;

            formField.classList.remove('error');
            formField.classList.add('success');

            const error = formField.querySelector('small');
            error.textContent = '';
        }

        const isFirstNameValid = (firstname) => {
            const re = /^[a-zA-Z]*$/;
            return re.test(firstname);
        }

        const isLastNameValid = (lastname) => {
            const re = /^[a-zA-Z]*$/;
            return re.test(lastname);
        }

        const isEmailValid = (email) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        };

        const isPhoneValid = (phone) => {
            const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            return re.test(phone);
        };

        const isDobValid = (dob) => {
            const re = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
            return re.test(dob);
        }

        form.addEventListener('submit', function(e) {
            // prevent the form from submitting
            e.preventDefault();

            // validate fields
            let isfirstnameValid = checkfirstname(),
                isLastNameValid = checklastname(),
                isEmailValid = checkEmail(),
                isphoneValid = checkPhone(),
                isDoBvalid = checkDob(),
                isfeevalid = checkFees(),
                isEnrollmentValid = checkEnrollment(),
                isAssignmentValid = checkAssignment();

            let isFormValid = isfirstnameValid &&
                isLastNameValid &&
                isEmailValid &&
                isphoneValid &&
                isDoBvalid &&
                isfeevalid &&
                isAssignmentValid &&
                isEnrollmentValid;

            // submit if the form is valid
            if (isFormValid) {
                alert("Student " + firstnameEl.value + " " + lastnameEl.value + " updated!");
                var x = $("#firstname5").val();
                var y = $("#lastname5").val();
                var z = $("#cselect5").val();
                $("#student5").html(x + " " + y + ", " + z);
                $('#form5 input').attr('readonly', 'readonly'),
                    $('.update').prop('disabled', true),
                    $('#edit5').prop('disabled', true),
                    $('#form5 select').prop('disabled', true);
            }
        });


        const debounce = (fn, delay = 500) => {
            let timeoutId;
            return (...args) => {
                // cancel the previous timer
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                // setup a new timer
                timeoutId = setTimeout(() => {
                    fn.apply(null, args)
                }, delay);
            };
        };

        form.addEventListener('input', debounce(function(e) {
            switch (e.target.id) {
                case 'firstname5':
                    checkfirstname();
                    break;
                case 'lastname5':
                    checklastname();
                    break;
                case 'email5':
                    checkEmail();
                    break;
                case 'phone5':
                    checkPhone();
                    break;
                case 'dob5':
                    checkDob();
                    break;
                case 'fees5':
                    checkFees();
                    break;
                case 'cselect5':
                    checkEnrollment();
                    break;
                case 'aselect5':
                    checkAssignment();
            }
        }));
    };



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
    //
    /////   VALIDATION OF TRAINER FORM


    if ($('body').is('.trainer_form')) {
        const firstnameEl = document.querySelector('#firstname');
        const lastnameEl = document.querySelector('#lastname');
        const emailEl = document.querySelector('#email');
        const phoneEl = document.querySelector('#phone');
        const dobEl = document.querySelector('#dob');
        const subjectEl = document.querySelector('#subject');
        const courseEl = document.querySelector('#cselect');

        const form = document.querySelector('#tform');

        const checkfirstname = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const firstname = firstnameEl.value.trim();

            if (!isRequired(firstname)) {
                showError(firstnameEl, 'First name cannot be blank.');
            } else if (!isBetween(firstname.length, min, max)) {
                showError(firstnameEl, `First name must be between ${min} and ${max} characters.`)
            } else if (!isFirstNameValid(firstname)) {
                showError(firstnameEl, 'First name is not valid.')
            } else {
                showSuccess(firstnameEl);
                valid = true;
            }
            return valid;
        };

        const checklastname = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const lastname = lastnameEl.value.trim();

            if (!isRequired(lastname)) {
                showError(lastnameEl, 'Last name cannot be blank.');
            } else if (!isBetween(lastname.length, min, max)) {
                showError(lastnameEl, `Last name must be between ${min} and ${max} characters.`)
            } else if (!isLastNameValid(lastname)) {
                showError(lastnameEl, 'Last name is not valid.')
            } else {
                showSuccess(lastnameEl);
                valid = true;
            }
            return valid;
        };


        const checkEmail = () => {
            let valid = false;
            const email = emailEl.value.trim();
            if (!isRequired(email)) {
                showError(emailEl, 'Email cannot be blank.');
            } else if (!isEmailValid(email)) {
                showError(emailEl, 'Email is not valid.')
            } else {
                showSuccess(emailEl);
                valid = true;
            }
            return valid;
        };

        const checkPhone = () => {
            let valid = false;
            const phone = phoneEl.value.trim();
            if (!isRequired(phone)) {
                showError(phoneEl, 'Phone cannot be blank.');
            } else if (!isPhoneValid(phone)) {
                showError(phoneEl, 'Phone is not valid')
            } else {
                showSuccess(phoneEl);
                valid = true;
            }
            return valid;
        }


        const checkDob = () => {
            let valid = false;
            const dob = dobEl.value.trim();
            if (!isRequired(dob)) {
                showError(dobEl, 'Date of birth cannot be blank.');
            } else if (!isDobValid(dob)) {
                showError(dobEl, 'Date of birth is not valid.')
            } else {
                showSuccess(dobEl);
                valid = true;
            }
            return valid;
        };

        const checksubject = () => {

            let valid = false;

            const min = 2,
                max = 30;

            const subject = subjectEl.value.trim();

            if (!isRequired(subject)) {
                showError(subjectEl, 'Subject cannot be blank.');
            } else if (!isBetween(subject.length, min, max)) {
                showError(subjectEl, `Subject must be between ${min} and ${max} characters.`)
            } else if (!isSubjectValid(subject)) {
                showError(subjectEl, 'Subject is not valid.')
            } else {
                showSuccess(subjectEl);
                valid = true;
            }
            return valid;
        };

        const checkEnrollment = () => {
            let valid = false;
            const enrollment = courseEl.value;
            if (enrollment === '') {
                showError(courseEl, 'At least one course must be selected.');
            } else {
                showSuccess(courseEl);
                valid = true;
            }
            return valid;

        }


        const isRequired = value => value === '' ? false : true;
        const isBetween = (length, min, max) => length < min || length > max ? false : true;


        const showError = (input, message) => {
            // get the form-field element
            const formField = input.parentElement;
            // add the error class
            formField.classList.remove('success');
            formField.classList.add('error');

            // show the error message
            const error = formField.querySelector('small');
            error.textContent = message;
        };

        const showSuccess = (input) => {
            // get the form-field element
            const formField = input.parentElement;

            // remove the error class
            formField.classList.remove('error');
            formField.classList.add('success');

            // hide the error message
            const error = formField.querySelector('small');
            error.textContent = '';
        }

        const isFirstNameValid = (firstname) => {
            const re = /^[a-zA-Z]*$/;
            return re.test(firstname);
        }

        const isLastNameValid = (lastname) => {
            const re = /^[a-zA-Z]*$/;
            return re.test(lastname);
        }

        const isEmailValid = (email) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        };

        const isPhoneValid = (phone) => {
            const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            return re.test(phone);
        };

        const isDobValid = (dob) => {
            const re = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
            return re.test(dob);
        }

        const isSubjectValid = (subject) => {
            const re = /^[a-zA-Z#]+(,\s*[a-zA-Z#]+)*$/;
            return re.test(subject);
        };




        const debounce = (fn, delay = 500) => {
            let timeoutId;
            return (...args) => {
                // cancel the previous timer
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                // setup a new timer
                timeoutId = setTimeout(() => {
                    fn.apply(null, args)
                }, delay);
            };
        };

        form.addEventListener('submit', function(e) {
            // prevent the form from submitting
            e.preventDefault();

            // validate fields
            let isfirstnameValid = checkfirstname(),
                isLastNameValid = checklastname(),
                isEmailValid = checkEmail(),
                isphoneValid = checkPhone(),
                isDoBvalid = checkDob(),
                isSubjectValid = checksubject(),
                isEnrollmentValid = checkEnrollment();

            let isFormValid = isfirstnameValid &&
                isLastNameValid &&
                isEmailValid &&
                isphoneValid &&
                isDoBvalid &&
                isSubjectValid &&
                isEnrollmentValid;

            // submit if the form is valid
            if (isFormValid) {
                alert("Trainer " + firstnameEl.value + " " + lastnameEl.value + " hired!");
                form.reset();
            }
        });

        form.addEventListener('input', debounce(function(e) {
            switch (e.target.id) {
                case 'firstname':
                    checkfirstname();
                    break;
                case 'lastname':
                    checklastname();
                    break;
                case 'email':
                    checkEmail();
                    break;
                case 'phone':
                    checkPhone();
                    break;
                case 'dob':
                    checkDob();
                    break;
                case 'subject':
                    checksubject();
                    break;
                case 'cselect':
                    checkEnrollment();
            }
        }));
    };


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
    //
    //
    // VALIDATION OF DUMMY TRAINERS

    // TRAINER ONE
    if ($('body').is('.trainers')) {


        $("#edit1").click(function() {
            $('#form1 input').removeAttr('readonly'),
                $('#form1 input').prop('disabled', false),
                $('#edit1').prop('disabled', true),
                $('#form1 select').prop('disabled', false);
        });



        const firstnameEl = document.querySelector('#firstname1');
        const lastnameEl = document.querySelector('#lastname1');
        const emailEl = document.querySelector('#email1');
        const phoneEl = document.querySelector('#phone1');
        const dobEl = document.querySelector('#dob1');
        const subjectEl = document.querySelector('#subject1');
        const courseEl = document.querySelector('#cselect1');

        const form = document.querySelector('#form1');

        const checkfirstname = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const firstname = firstnameEl.value.trim();

            if (!isRequired(firstname)) {
                showError(firstnameEl, 'First name cannot be blank.');
            } else if (!isBetween(firstname.length, min, max)) {
                showError(firstnameEl, `First name must be between ${min} and ${max} characters.`)
            } else if (!isFirstNameValid(firstname)) {
                showError(firstnameEl, 'First name is not valid.')
            } else {
                showSuccess(firstnameEl);
                valid = true;
            }
            return valid;
        };

        const checklastname = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const lastname = lastnameEl.value.trim();

            if (!isRequired(lastname)) {
                showError(lastnameEl, 'Last name cannot be blank.');
            } else if (!isBetween(lastname.length, min, max)) {
                showError(lastnameEl, `Last name must be between ${min} and ${max} characters.`)
            } else if (!isLastNameValid(lastname)) {
                showError(lastnameEl, 'Last name is not valid.')
            } else {
                showSuccess(lastnameEl);
                valid = true;
            }
            return valid;
        };


        const checkEmail = () => {
            let valid = false;
            const email = emailEl.value.trim();
            if (!isRequired(email)) {
                showError(emailEl, 'Email cannot be blank.');
            } else if (!isEmailValid(email)) {
                showError(emailEl, 'Email is not valid.')
            } else {
                showSuccess(emailEl);
                valid = true;
            }
            return valid;
        };

        const checkPhone = () => {
            let valid = false;
            const phone = phoneEl.value.trim();
            if (!isRequired(phone)) {
                showError(phoneEl, 'Phone cannot be blank.');
            } else if (!isPhoneValid(phone)) {
                showError(phoneEl, 'Phone is not valid')
            } else {
                showSuccess(phoneEl);
                valid = true;
            }
            return valid;
        }


        const checkDob = () => {
            let valid = false;
            const dob = dobEl.value.trim();
            if (!isRequired(dob)) {
                showError(dobEl, 'Date of birth cannot be blank.');
            } else if (!isDobValid(dob)) {
                showError(dobEl, 'Date of birth is not valid.')
            } else {
                showSuccess(dobEl);
                valid = true;
            }
            return valid;
        };

        const checksubject = () => {

            let valid = false;

            const min = 2,
                max = 30;

            const subject = subjectEl.value.trim();

            if (!isRequired(subject)) {
                showError(subjectEl, 'Subject cannot be blank.');
            } else if (!isBetween(subject.length, min, max)) {
                showError(subjectEl, `Subject must be between ${min} and ${max} characters.`)
            } else if (!isSubjectValid(subject)) {
                showError(subjectEl, 'Subject is not valid.')
            } else {
                showSuccess(subjectEl);
                valid = true;
            }
            return valid;
        };

        const checkEnrollment = () => {
            let valid = false;
            const enrollment = courseEl.value;
            if (enrollment === '') {
                showError(courseEl, 'At least one course must be selected.');
            } else {
                showSuccess(courseEl);
                valid = true;
            }
            return valid;

        }


        const isRequired = value => value === '' ? false : true;
        const isBetween = (length, min, max) => length < min || length > max ? false : true;


        const showError = (input, message) => {
            // get the form-field element
            const formField = input.parentElement;
            // add the error class
            formField.classList.remove('success');
            formField.classList.add('error');

            // show the error message
            const error = formField.querySelector('small');
            error.textContent = message;
        };

        const showSuccess = (input) => {
            // get the form-field element
            const formField = input.parentElement;

            // remove the error class
            formField.classList.remove('error');
            formField.classList.add('success');

            // hide the error message
            const error = formField.querySelector('small');
            error.textContent = '';
        }

        const isFirstNameValid = (firstname) => {
            const re = /^[a-zA-Z]*$/;
            return re.test(firstname);
        }

        const isLastNameValid = (lastname) => {
            const re = /^[a-zA-Z]*$/;
            return re.test(lastname);
        }

        const isEmailValid = (email) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        };

        const isPhoneValid = (phone) => {
            const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            return re.test(phone);
        };

        const isDobValid = (dob) => {
            const re = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
            return re.test(dob);
        }

        const isSubjectValid = (subject) => {
            const re = /^[a-zA-Z#]+(,\s*[a-zA-Z#]+)*$/;
            return re.test(subject);
        };




        const debounce = (fn, delay = 500) => {
            let timeoutId;
            return (...args) => {
                // cancel the previous timer
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                // setup a new timer
                timeoutId = setTimeout(() => {
                    fn.apply(null, args)
                }, delay);
            };
        };

        form.addEventListener('submit', function(e) {
            // prevent the form from submitting
            e.preventDefault();

            // validate fields
            let isfirstnameValid = checkfirstname(),
                isLastNameValid = checklastname(),
                isEmailValid = checkEmail(),
                isphoneValid = checkPhone(),
                isDoBvalid = checkDob(),
                isSubjectValid = checksubject(),
                isEnrollmentValid = checkEnrollment();

            let isFormValid = isfirstnameValid &&
                isLastNameValid &&
                isEmailValid &&
                isphoneValid &&
                isDoBvalid &&
                isSubjectValid &&
                isEnrollmentValid;

            // submit if the form is valid
            if (isFormValid) {
                alert("Trainer " + firstnameEl.value + " " + lastnameEl.value + " updated!");
                var x = $("#firstname1").val();
                var y = $("#lastname1").val();
                var z = $("#cselect1").val();
                $("#trainer1").html(x + " " + y + ", " + z);
                $('#form1 input').attr('readonly', 'readonly'),
                    $('.update').prop('disabled', true),
                    $('#edit1').prop('disabled', false),
                    $('#form1 select').prop('disabled', true);
            }
        });

        form.addEventListener('input', debounce(function(e) {
            switch (e.target.id) {
                case 'firstname1':
                    checkfirstname();
                    break;
                case 'lastname1':
                    checklastname();
                    break;
                case 'email1':
                    checkEmail();
                    break;
                case 'phone1':
                    checkPhone();
                    break;
                case 'dob1':
                    checkDob();
                    break;
                case 'subject1':
                    checksubject();
                    break;
                case 'cselect1':
                    checkEnrollment();
            }
        }));
    };

    // TRAINER TWO
    if ($('body').is('.trainers')) {
        $("#edit2").click(function() {
            $('#form2 input').removeAttr('readonly'),
                $('#form2 input').prop('disabled', false),
                $('#edit2').prop('disabled', true),
                $('#form2 select').prop('disabled', false);
        });



        const firstnameEl = document.querySelector('#firstname2');
        const lastnameEl = document.querySelector('#lastname2');
        const emailEl = document.querySelector('#email2');
        const phoneEl = document.querySelector('#phone2');
        const dobEl = document.querySelector('#dob2');
        const subjectEl = document.querySelector('#subject2');
        const courseEl = document.querySelector('#cselect2');

        const form = document.querySelector('#form2');

        const checkfirstname = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const firstname = firstnameEl.value.trim();

            if (!isRequired(firstname)) {
                showError(firstnameEl, 'First name cannot be blank.');
            } else if (!isBetween(firstname.length, min, max)) {
                showError(firstnameEl, `First name must be between ${min} and ${max} characters.`)
            } else if (!isFirstNameValid(firstname)) {
                showError(firstnameEl, 'First name is not valid.')
            } else {
                showSuccess(firstnameEl);
                valid = true;
            }
            return valid;
        };

        const checklastname = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const lastname = lastnameEl.value.trim();

            if (!isRequired(lastname)) {
                showError(lastnameEl, 'Last name cannot be blank.');
            } else if (!isBetween(lastname.length, min, max)) {
                showError(lastnameEl, `Last name must be between ${min} and ${max} characters.`)
            } else if (!isLastNameValid(lastname)) {
                showError(lastnameEl, 'Last name is not valid.')
            } else {
                showSuccess(lastnameEl);
                valid = true;
            }
            return valid;
        };


        const checkEmail = () => {
            let valid = false;
            const email = emailEl.value.trim();
            if (!isRequired(email)) {
                showError(emailEl, 'Email cannot be blank.');
            } else if (!isEmailValid(email)) {
                showError(emailEl, 'Email is not valid.')
            } else {
                showSuccess(emailEl);
                valid = true;
            }
            return valid;
        };

        const checkPhone = () => {
            let valid = false;
            const phone = phoneEl.value.trim();
            if (!isRequired(phone)) {
                showError(phoneEl, 'Phone cannot be blank.');
            } else if (!isPhoneValid(phone)) {
                showError(phoneEl, 'Phone is not valid')
            } else {
                showSuccess(phoneEl);
                valid = true;
            }
            return valid;
        }


        const checkDob = () => {
            let valid = false;
            const dob = dobEl.value.trim();
            if (!isRequired(dob)) {
                showError(dobEl, 'Date of birth cannot be blank.');
            } else if (!isDobValid(dob)) {
                showError(dobEl, 'Date of birth is not valid.')
            } else {
                showSuccess(dobEl);
                valid = true;
            }
            return valid;
        };

        const checksubject = () => {

            let valid = false;

            const min = 2,
                max = 30;

            const subject = subjectEl.value.trim();

            if (!isRequired(subject)) {
                showError(subjectEl, 'Subject cannot be blank.');
            } else if (!isBetween(subject.length, min, max)) {
                showError(subjectEl, `Subject must be between ${min} and ${max} characters.`)
            } else if (!isSubjectValid(subject)) {
                showError(subjectEl, 'Subject is not valid.')
            } else {
                showSuccess(subjectEl);
                valid = true;
            }
            return valid;
        };

        const checkEnrollment = () => {
            let valid = false;
            const enrollment = courseEl.value;
            if (enrollment === '') {
                showError(courseEl, 'At least one course must be selected.');
            } else {
                showSuccess(courseEl);
                valid = true;
            }
            return valid;

        }


        const isRequired = value => value === '' ? false : true;
        const isBetween = (length, min, max) => length < min || length > max ? false : true;


        const showError = (input, message) => {
            // get the form-field element
            const formField = input.parentElement;
            // add the error class
            formField.classList.remove('success');
            formField.classList.add('error');

            // show the error message
            const error = formField.querySelector('small');
            error.textContent = message;
        };

        const showSuccess = (input) => {
            // get the form-field element
            const formField = input.parentElement;

            // remove the error class
            formField.classList.remove('error');
            formField.classList.add('success');

            // hide the error message
            const error = formField.querySelector('small');
            error.textContent = '';
        }

        const isFirstNameValid = (firstname) => {
            const re = /^[a-zA-Z]*$/;
            return re.test(firstname);
        }

        const isLastNameValid = (lastname) => {
            const re = /^[a-zA-Z]*$/;
            return re.test(lastname);
        }

        const isEmailValid = (email) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        };

        const isPhoneValid = (phone) => {
            const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            return re.test(phone);
        };

        const isDobValid = (dob) => {
            const re = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
            return re.test(dob);
        }

        const isSubjectValid = (subject) => {
            const re = /^[a-zA-Z#]+(,\s*[a-zA-Z#]+)*$/;
            return re.test(subject);
        };




        const debounce = (fn, delay = 500) => {
            let timeoutId;
            return (...args) => {
                // cancel the previous timer
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                // setup a new timer
                timeoutId = setTimeout(() => {
                    fn.apply(null, args)
                }, delay);
            };
        };

        form.addEventListener('submit', function(e) {
            // prevent the form from submitting
            e.preventDefault();

            // validate fields
            let isfirstnameValid = checkfirstname(),
                isLastNameValid = checklastname(),
                isEmailValid = checkEmail(),
                isphoneValid = checkPhone(),
                isDoBvalid = checkDob(),
                isSubjectValid = checksubject(),
                isEnrollmentValid = checkEnrollment();

            let isFormValid = isfirstnameValid &&
                isLastNameValid &&
                isEmailValid &&
                isphoneValid &&
                isDoBvalid &&
                isSubjectValid &&
                isEnrollmentValid;

            // submit if the form is valid
            if (isFormValid) {
                alert("Trainer " + firstnameEl.value + " " + lastnameEl.value + " updated!");
                var x = $("#firstname2").val();
                var y = $("#lastname2").val();
                var z = $("#cselect2").val();
                $("#trainer2").html(x + " " + y + ", " + z);
                $('#form2 input').attr('readonly', 'readonly'),
                    $('.update').prop('disabled', true),
                    $('#edit2').prop('disabled', false),
                    $('#form2 select').prop('disabled', true);
            }
        });

        form.addEventListener('input', debounce(function(e) {
            switch (e.target.id) {
                case 'firstname2':
                    checkfirstname();
                    break;
                case 'lastname2':
                    checklastname();
                    break;
                case 'email2':
                    checkEmail();
                    break;
                case 'phone2':
                    checkPhone();
                    break;
                case 'dob2':
                    checkDob();
                    break;
                case 'subject2':
                    checksubject();
                    break;
                case 'cselect2':
                    checkEnrollment();
            }
        }));
    };

    // TRAINER THREE
    if ($('body').is('.trainers')) {
        $("#edit3").click(function() {
            $('#form3 input').removeAttr('readonly'),
                $('#form3 input').prop('disabled', false),
                $('#edit2').prop('disabled', true),
                $('#form3 select').prop('disabled', false);
        });



        const firstnameEl = document.querySelector('#firstname3');
        const lastnameEl = document.querySelector('#lastname3');
        const emailEl = document.querySelector('#email3');
        const phoneEl = document.querySelector('#phone3');
        const dobEl = document.querySelector('#dob3');
        const subjectEl = document.querySelector('#subject3');
        const courseEl = document.querySelector('#cselect3');

        const form = document.querySelector('#form3');

        const checkfirstname = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const firstname = firstnameEl.value.trim();

            if (!isRequired(firstname)) {
                showError(firstnameEl, 'First name cannot be blank.');
            } else if (!isBetween(firstname.length, min, max)) {
                showError(firstnameEl, `First name must be between ${min} and ${max} characters.`)
            } else if (!isFirstNameValid(firstname)) {
                showError(firstnameEl, 'First name is not valid.')
            } else {
                showSuccess(firstnameEl);
                valid = true;
            }
            return valid;
        };

        const checklastname = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const lastname = lastnameEl.value.trim();

            if (!isRequired(lastname)) {
                showError(lastnameEl, 'Last name cannot be blank.');
            } else if (!isBetween(lastname.length, min, max)) {
                showError(lastnameEl, `Last name must be between ${min} and ${max} characters.`)
            } else if (!isLastNameValid(lastname)) {
                showError(lastnameEl, 'Last name is not valid.')
            } else {
                showSuccess(lastnameEl);
                valid = true;
            }
            return valid;
        };


        const checkEmail = () => {
            let valid = false;
            const email = emailEl.value.trim();
            if (!isRequired(email)) {
                showError(emailEl, 'Email cannot be blank.');
            } else if (!isEmailValid(email)) {
                showError(emailEl, 'Email is not valid.')
            } else {
                showSuccess(emailEl);
                valid = true;
            }
            return valid;
        };

        const checkPhone = () => {
            let valid = false;
            const phone = phoneEl.value.trim();
            if (!isRequired(phone)) {
                showError(phoneEl, 'Phone cannot be blank.');
            } else if (!isPhoneValid(phone)) {
                showError(phoneEl, 'Phone is not valid')
            } else {
                showSuccess(phoneEl);
                valid = true;
            }
            return valid;
        }


        const checkDob = () => {
            let valid = false;
            const dob = dobEl.value.trim();
            if (!isRequired(dob)) {
                showError(dobEl, 'Date of birth cannot be blank.');
            } else if (!isDobValid(dob)) {
                showError(dobEl, 'Date of birth is not valid.')
            } else {
                showSuccess(dobEl);
                valid = true;
            }
            return valid;
        };

        const checksubject = () => {

            let valid = false;

            const min = 2,
                max = 30;

            const subject = subjectEl.value.trim();

            if (!isRequired(subject)) {
                showError(subjectEl, 'Subject cannot be blank.');
            } else if (!isBetween(subject.length, min, max)) {
                showError(subjectEl, `Subject must be between ${min} and ${max} characters.`)
            } else if (!isSubjectValid(subject)) {
                showError(subjectEl, 'Subject is not valid.')
            } else {
                showSuccess(subjectEl);
                valid = true;
            }
            return valid;
        };

        const checkEnrollment = () => {
            let valid = false;
            const enrollment = courseEl.value;
            if (enrollment === '') {
                showError(courseEl, 'At least one course must be selected.');
            } else {
                showSuccess(courseEl);
                valid = true;
            }
            return valid;

        }


        const isRequired = value => value === '' ? false : true;
        const isBetween = (length, min, max) => length < min || length > max ? false : true;


        const showError = (input, message) => {
            // get the form-field element
            const formField = input.parentElement;
            // add the error class
            formField.classList.remove('success');
            formField.classList.add('error');

            // show the error message
            const error = formField.querySelector('small');
            error.textContent = message;
        };

        const showSuccess = (input) => {
            // get the form-field element
            const formField = input.parentElement;

            // remove the error class
            formField.classList.remove('error');
            formField.classList.add('success');

            // hide the error message
            const error = formField.querySelector('small');
            error.textContent = '';
        }

        const isFirstNameValid = (firstname) => {
            const re = /^[a-zA-Z]*$/;
            return re.test(firstname);
        }

        const isLastNameValid = (lastname) => {
            const re = /^[a-zA-Z]*$/;
            return re.test(lastname);
        }

        const isEmailValid = (email) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        };

        const isPhoneValid = (phone) => {
            const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            return re.test(phone);
        };

        const isDobValid = (dob) => {
            const re = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
            return re.test(dob);
        }

        const isSubjectValid = (subject) => {
            const re = /^[a-zA-Z#]+(,\s*[a-zA-Z#]+)*$/;
            return re.test(subject);
        };




        const debounce = (fn, delay = 500) => {
            let timeoutId;
            return (...args) => {
                // cancel the previous timer
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                // setup a new timer
                timeoutId = setTimeout(() => {
                    fn.apply(null, args)
                }, delay);
            };
        };

        form.addEventListener('submit', function(e) {
            // prevent the form from submitting
            e.preventDefault();

            // validate fields
            let isfirstnameValid = checkfirstname(),
                isLastNameValid = checklastname(),
                isEmailValid = checkEmail(),
                isphoneValid = checkPhone(),
                isDoBvalid = checkDob(),
                isSubjectValid = checksubject(),
                isEnrollmentValid = checkEnrollment();

            let isFormValid = isfirstnameValid &&
                isLastNameValid &&
                isEmailValid &&
                isphoneValid &&
                isDoBvalid &&
                isSubjectValid &&
                isEnrollmentValid;

            // submit if the form is valid
            if (isFormValid) {
                alert("Trainer " + firstnameEl.value + " " + lastnameEl.value + " updated!");
                var x = $("#firstname3").val();
                var y = $("#lastname3").val();
                var z = $("#cselect3").val();
                $("#trainer3").html(x + " " + y + ", " + z);
                $('#form3 input').attr('readonly', 'readonly'),
                    $('.update').prop('disabled', true),
                    $('#edit3').prop('disabled', false),
                    $('#form3 select').prop('disabled', true);
            }
        });

        form.addEventListener('input', debounce(function(e) {
            switch (e.target.id) {
                case 'firstname3':
                    checkfirstname();
                    break;
                case 'lastname3':
                    checklastname();
                    break;
                case 'email3':
                    checkEmail();
                    break;
                case 'phone3':
                    checkPhone();
                    break;
                case 'dob3':
                    checkDob();
                    break;
                case 'subject3':
                    checksubject();
                    break;
                case 'cselect3':
                    checkEnrollment();
            }
        }));
    };

    // TRAINER FOUR
    if ($('body').is('.trainers')) {
        $("#edit4").click(function() {
            $('#form4 input').removeAttr('readonly'),
                $('#form4 input').prop('disabled', false),
                $('#edit4').prop('disabled', true),
                $('#form4 select').prop('disabled', false);
        });



        const firstnameEl = document.querySelector('#firstname4');
        const lastnameEl = document.querySelector('#lastname4');
        const emailEl = document.querySelector('#email4');
        const phoneEl = document.querySelector('#phone4');
        const dobEl = document.querySelector('#dob4');
        const subjectEl = document.querySelector('#subject4');
        const courseEl = document.querySelector('#cselect4');

        const form = document.querySelector('#form4');

        const checkfirstname = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const firstname = firstnameEl.value.trim();

            if (!isRequired(firstname)) {
                showError(firstnameEl, 'First name cannot be blank.');
            } else if (!isBetween(firstname.length, min, max)) {
                showError(firstnameEl, `First name must be between ${min} and ${max} characters.`)
            } else if (!isFirstNameValid(firstname)) {
                showError(firstnameEl, 'First name is not valid.')
            } else {
                showSuccess(firstnameEl);
                valid = true;
            }
            return valid;
        };

        const checklastname = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const lastname = lastnameEl.value.trim();

            if (!isRequired(lastname)) {
                showError(lastnameEl, 'Last name cannot be blank.');
            } else if (!isBetween(lastname.length, min, max)) {
                showError(lastnameEl, `Last name must be between ${min} and ${max} characters.`)
            } else if (!isLastNameValid(lastname)) {
                showError(lastnameEl, 'Last name is not valid.')
            } else {
                showSuccess(lastnameEl);
                valid = true;
            }
            return valid;
        };


        const checkEmail = () => {
            let valid = false;
            const email = emailEl.value.trim();
            if (!isRequired(email)) {
                showError(emailEl, 'Email cannot be blank.');
            } else if (!isEmailValid(email)) {
                showError(emailEl, 'Email is not valid.')
            } else {
                showSuccess(emailEl);
                valid = true;
            }
            return valid;
        };

        const checkPhone = () => {
            let valid = false;
            const phone = phoneEl.value.trim();
            if (!isRequired(phone)) {
                showError(phoneEl, 'Phone cannot be blank.');
            } else if (!isPhoneValid(phone)) {
                showError(phoneEl, 'Phone is not valid')
            } else {
                showSuccess(phoneEl);
                valid = true;
            }
            return valid;
        }


        const checkDob = () => {
            let valid = false;
            const dob = dobEl.value.trim();
            if (!isRequired(dob)) {
                showError(dobEl, 'Date of birth cannot be blank.');
            } else if (!isDobValid(dob)) {
                showError(dobEl, 'Date of birth is not valid.')
            } else {
                showSuccess(dobEl);
                valid = true;
            }
            return valid;
        };

        const checksubject = () => {

            let valid = false;

            const min = 2,
                max = 30;

            const subject = subjectEl.value.trim();

            if (!isRequired(subject)) {
                showError(subjectEl, 'Subject cannot be blank.');
            } else if (!isBetween(subject.length, min, max)) {
                showError(subjectEl, `Subject must be between ${min} and ${max} characters.`)
            } else if (!isSubjectValid(subject)) {
                showError(subjectEl, 'Subject is not valid.')
            } else {
                showSuccess(subjectEl);
                valid = true;
            }
            return valid;
        };

        const checkEnrollment = () => {
            let valid = false;
            const enrollment = courseEl.value;
            if (enrollment === '') {
                showError(courseEl, 'At least one course must be selected.');
            } else {
                showSuccess(courseEl);
                valid = true;
            }
            return valid;

        }


        const isRequired = value => value === '' ? false : true;
        const isBetween = (length, min, max) => length < min || length > max ? false : true;


        const showError = (input, message) => {
            // get the form-field element
            const formField = input.parentElement;
            // add the error class
            formField.classList.remove('success');
            formField.classList.add('error');

            // show the error message
            const error = formField.querySelector('small');
            error.textContent = message;
        };

        const showSuccess = (input) => {
            // get the form-field element
            const formField = input.parentElement;

            // remove the error class
            formField.classList.remove('error');
            formField.classList.add('success');

            // hide the error message
            const error = formField.querySelector('small');
            error.textContent = '';
        }

        const isFirstNameValid = (firstname) => {
            const re = /^[a-zA-Z]*$/;
            return re.test(firstname);
        }

        const isLastNameValid = (lastname) => {
            const re = /^[a-zA-Z]*$/;
            return re.test(lastname);
        }

        const isEmailValid = (email) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        };

        const isPhoneValid = (phone) => {
            const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            return re.test(phone);
        };

        const isDobValid = (dob) => {
            const re = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
            return re.test(dob);
        }

        const isSubjectValid = (subject) => {
            const re = /^[a-zA-Z#]+(,\s*[a-zA-Z#]+)*$/;
            return re.test(subject);
        };




        const debounce = (fn, delay = 500) => {
            let timeoutId;
            return (...args) => {
                // cancel the previous timer
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                // setup a new timer
                timeoutId = setTimeout(() => {
                    fn.apply(null, args)
                }, delay);
            };
        };

        form.addEventListener('submit', function(e) {
            // prevent the form from submitting
            e.preventDefault();

            // validate fields
            let isfirstnameValid = checkfirstname(),
                isLastNameValid = checklastname(),
                isEmailValid = checkEmail(),
                isphoneValid = checkPhone(),
                isDoBvalid = checkDob(),
                isSubjectValid = checksubject(),
                isEnrollmentValid = checkEnrollment();

            let isFormValid = isfirstnameValid &&
                isLastNameValid &&
                isEmailValid &&
                isphoneValid &&
                isDoBvalid &&
                isSubjectValid &&
                isEnrollmentValid;

            // submit if the form is valid
            if (isFormValid) {
                alert("Trainer " + firstnameEl.value + " " + lastnameEl.value + " updated!");
                var x = $("#firstname4").val();
                var y = $("#lastname4").val();
                var z = $("#cselect4").val();
                $("#trainer4").html(x + " " + y + ", " + z);
                $('#form4 input').attr('readonly', 'readonly'),
                    $('.update').prop('disabled', true),
                    $('#edit4').prop('disabled', false),
                    $('#form4 select').prop('disabled', true);
            }
        });

        form.addEventListener('input', debounce(function(e) {
            switch (e.target.id) {
                case 'firstname4':
                    checkfirstname();
                    break;
                case 'lastname4':
                    checklastname();
                    break;
                case 'email4':
                    checkEmail();
                    break;
                case 'phone4':
                    checkPhone();
                    break;
                case 'dob4':
                    checkDob();
                    break;
                case 'subject4':
                    checksubject();
                    break;
                case 'cselect4':
                    checkEnrollment();
            }
        }));
    };

    // TRAINER FIVE
    if ($('body').is('.trainers')) {
        $("#edit5").click(function() {
            $('#form5 input').removeAttr('readonly'),
                $('#form5 input').prop('disabled', false),
                $('#edit5').prop('disabled', true),
                $('#form5 select').prop('disabled', false);
        });



        const firstnameEl = document.querySelector('#firstname5');
        const lastnameEl = document.querySelector('#lastname5');
        const emailEl = document.querySelector('#email5');
        const phoneEl = document.querySelector('#phone5');
        const dobEl = document.querySelector('#dob5');
        const subjectEl = document.querySelector('#subject5');
        const courseEl = document.querySelector('#cselect5');

        const form = document.querySelector('#form5');

        const checkfirstname = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const firstname = firstnameEl.value.trim();

            if (!isRequired(firstname)) {
                showError(firstnameEl, 'First name cannot be blank.');
            } else if (!isBetween(firstname.length, min, max)) {
                showError(firstnameEl, `First name must be between ${min} and ${max} characters.`)
            } else if (!isFirstNameValid(firstname)) {
                showError(firstnameEl, 'First name is not valid.')
            } else {
                showSuccess(firstnameEl);
                valid = true;
            }
            return valid;
        };

        const checklastname = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const lastname = lastnameEl.value.trim();

            if (!isRequired(lastname)) {
                showError(lastnameEl, 'Last name cannot be blank.');
            } else if (!isBetween(lastname.length, min, max)) {
                showError(lastnameEl, `Last name must be between ${min} and ${max} characters.`)
            } else if (!isLastNameValid(lastname)) {
                showError(lastnameEl, 'Last name is not valid.')
            } else {
                showSuccess(lastnameEl);
                valid = true;
            }
            return valid;
        };


        const checkEmail = () => {
            let valid = false;
            const email = emailEl.value.trim();
            if (!isRequired(email)) {
                showError(emailEl, 'Email cannot be blank.');
            } else if (!isEmailValid(email)) {
                showError(emailEl, 'Email is not valid.')
            } else {
                showSuccess(emailEl);
                valid = true;
            }
            return valid;
        };

        const checkPhone = () => {
            let valid = false;
            const phone = phoneEl.value.trim();
            if (!isRequired(phone)) {
                showError(phoneEl, 'Phone cannot be blank.');
            } else if (!isPhoneValid(phone)) {
                showError(phoneEl, 'Phone is not valid')
            } else {
                showSuccess(phoneEl);
                valid = true;
            }
            return valid;
        }


        const checkDob = () => {
            let valid = false;
            const dob = dobEl.value.trim();
            if (!isRequired(dob)) {
                showError(dobEl, 'Date of birth cannot be blank.');
            } else if (!isDobValid(dob)) {
                showError(dobEl, 'Date of birth is not valid.')
            } else {
                showSuccess(dobEl);
                valid = true;
            }
            return valid;
        };

        const checksubject = () => {

            let valid = false;

            const min = 2,
                max = 30;

            const subject = subjectEl.value.trim();

            if (!isRequired(subject)) {
                showError(subjectEl, 'Subject cannot be blank.');
            } else if (!isBetween(subject.length, min, max)) {
                showError(subjectEl, `Subject must be between ${min} and ${max} characters.`)
            } else if (!isSubjectValid(subject)) {
                showError(subjectEl, 'Subject is not valid.')
            } else {
                showSuccess(subjectEl);
                valid = true;
            }
            return valid;
        };

        const checkEnrollment = () => {
            let valid = false;
            const enrollment = courseEl.value;
            if (enrollment === '') {
                showError(courseEl, 'At least one course must be selected.');
            } else {
                showSuccess(courseEl);
                valid = true;
            }
            return valid;

        }


        const isRequired = value => value === '' ? false : true;
        const isBetween = (length, min, max) => length < min || length > max ? false : true;


        const showError = (input, message) => {
            // get the form-field element
            const formField = input.parentElement;
            // add the error class
            formField.classList.remove('success');
            formField.classList.add('error');

            // show the error message
            const error = formField.querySelector('small');
            error.textContent = message;
        };

        const showSuccess = (input) => {
            // get the form-field element
            const formField = input.parentElement;

            // remove the error class
            formField.classList.remove('error');
            formField.classList.add('success');

            // hide the error message
            const error = formField.querySelector('small');
            error.textContent = '';
        }

        const isFirstNameValid = (firstname) => {
            const re = /^[a-zA-Z]*$/;
            return re.test(firstname);
        }

        const isLastNameValid = (lastname) => {
            const re = /^[a-zA-Z]*$/;
            return re.test(lastname);
        }

        const isEmailValid = (email) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        };

        const isPhoneValid = (phone) => {
            const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            return re.test(phone);
        };

        const isDobValid = (dob) => {
            const re = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
            return re.test(dob);
        }

        const isSubjectValid = (subject) => {
            const re = /^[a-zA-Z#]+(,\s*[a-zA-Z#]+)*$/;
            return re.test(subject);
        };




        const debounce = (fn, delay = 500) => {
            let timeoutId;
            return (...args) => {
                // cancel the previous timer
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                // setup a new timer
                timeoutId = setTimeout(() => {
                    fn.apply(null, args)
                }, delay);
            };
        };

        form.addEventListener('submit', function(e) {
            // prevent the form from submitting
            e.preventDefault();

            // validate fields
            let isfirstnameValid = checkfirstname(),
                isLastNameValid = checklastname(),
                isEmailValid = checkEmail(),
                isphoneValid = checkPhone(),
                isDoBvalid = checkDob(),
                isSubjectValid = checksubject(),
                isEnrollmentValid = checkEnrollment();

            let isFormValid = isfirstnameValid &&
                isLastNameValid &&
                isEmailValid &&
                isphoneValid &&
                isDoBvalid &&
                isSubjectValid &&
                isEnrollmentValid;

            // submit if the form is valid
            if (isFormValid) {
                alert("Trainer " + firstnameEl.value + " " + lastnameEl.value + " updated!");
                var x = $("#firstname5").val();
                var y = $("#lastname5").val();
                var z = $("#cselect5").val();
                $("#trainer5").html(x + " " + y + ", " + z);
                $('#form5 input').attr('readonly', 'readonly'),
                    $('.update').prop('disabled', true),
                    $('#edit5').prop('disabled', false),
                    $('#form5 select').prop('disabled', true);
            }
        });

        form.addEventListener('input', debounce(function(e) {
            switch (e.target.id) {
                case 'firstname5':
                    checkfirstname();
                    break;
                case 'lastname5':
                    checklastname();
                    break;
                case 'email5':
                    checkEmail();
                    break;
                case 'phone5':
                    checkPhone();
                    break;
                case 'dob5':
                    checkDob();
                    break;
                case 'subject5':
                    checksubject();
                    break;
                case 'cselect5':
                    checkEnrollment();
            }
        }));
    };


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
    // 
    // VALIDATION OF ASSIGNMENT FORM

    if ($('body').is('.assignment_form')) {



        $("#subdate").datepicker({
            inline: true
        });



        const titleEl = document.querySelector('#title');
        const descriptionEl = document.querySelector('#description');
        const subdateEl = document.querySelector('#subdate');
        const courseEl = document.querySelector('#cselect');

        const form = document.querySelector('#aform');

        const checkTitle = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const title = titleEl.value.trim();

            if (!isRequired(title)) {
                showError(titleEl, 'Title cannot be blank.');
            } else if (!isBetween(title.length, min, max)) {
                showError(titleEl, `Title must be between ${min} and ${max} characters.`)
            } else if (!istitleValid(title)) {
                showError(titleEl, 'Title is not valid.')
            } else {
                showSuccess(titleEl);
                valid = true;
            }
            return valid;
        };


        const checkDescription = () => {

            let valid = false;

            const min = 2,
                max = 50;

            const description = descriptionEl.value.trim();

            if (!isRequired(description)) {
                showError(descriptionEl, 'Description cannot be blank.');
            } else if (!isBetween(description.length, min, max)) {
                showError(descriptionEl, `Description must be between ${min} and ${max} characters.`)
            } else if (!isDescriptionValid(description)) {
                showError(descriptionEl, 'Description is not valid.')
            } else {
                showSuccess(descriptionEl);
                valid = true;
            }
            return valid;
        };


        const checkSubdate = () => {
            let valid = false;
            const subdate = subdateEl.value.trim();
            if (!isRequired(subdate)) {
                showError(subdateEl, 'Submission date cannot be blank.');
            } else {
                showSuccess(subdateEl);
                valid = true;
            }
            return valid;
        };

        const checkCourse = () => {
            let valid = false;
            const course = courseEl.value;
            if (course === '') {
                showError(courseEl, 'At least one course must be selected.');
            } else {
                showSuccess(courseEl);
                valid = true;
            }
            return valid;

        }




        const isRequired = value => value === '' ? false : true;
        const isBetween = (length, min, max) => length < min || length > max ? false : true;


        const showError = (input, message) => {
            // get the form-field element
            const formField = input.parentElement;
            // add the error class
            formField.classList.remove('success');
            formField.classList.add('error');

            // show the error message
            const error = formField.querySelector('small');
            error.textContent = message;
        };

        const showSuccess = (input) => {
            // get the form-field element
            const formField = input.parentElement;

            // remove the error class
            formField.classList.remove('error');
            formField.classList.add('success');

            // hide the error message
            const error = formField.querySelector('small');
            error.textContent = '';
        }

        const istitleValid = (title) => {
            const re = /^[a-zA-Z ]+([0-9 ])*$/;
            return re.test(title);
        }

        const isDescriptionValid = (description) => {
            const re = /^\s*[A-Za-z0-9]+(?:\s+[A-Za-z0-9]+)*\s*$/;
            return re.test(description);
        }


        const debounce = (fn, delay = 500) => {
            let timeoutId;
            return (...args) => {
                // cancel the previous timer
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                // setup a new timer
                timeoutId = setTimeout(() => {
                    fn.apply(null, args)
                }, delay);
            };
        };

        form.addEventListener('submit', function(e) {
            // prevent the form from submitting
            e.preventDefault();

            // validate fields
            let isTitleValid = checkTitle(),
                isDescriptionValid = checkDescription(),
                isSubdateValid = checkSubdate(),
                isCourseValid = checkCourse();


            let isFormValid = isTitleValid &&
                isDescriptionValid &&
                isSubdateValid &&
                isCourseValid;

            // submit if the form is valid
            if (isFormValid) {
                alert("Assignment " + titleEl.value + " created!");
                form.reset();
            }
        });

        form.addEventListener('input', debounce(function(e) {
            switch (e.target.id) {
                case 'title':
                    checkTitle();
                    break;
                case 'description':
                    checkDescription();
                    break;
                case 'subdate':
                    checkSubdate();
                    break;
                case 'cselect':
                    checkCourse();
            }
        }));
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////   VALIDATION OF DUMMY ASSIGNMENTS

    // ASSIGNMENT NUMBAH WAHN!

    if ($('body').is('.assignments')) {
        $("#subdate1").datepicker({
            inline: true
        });

        $("#edit1").click(function() {
            $('#form1 input').removeAttr('readonly'),
                $('#form1 input').prop('disabled', false),
                $('#edit1').prop('disabled', true),
                $('#form1 select').prop('disabled', false);
        });

        const titleEl = document.querySelector('#title1');
        const descriptionEl = document.querySelector('#description1');
        const subdateEl = document.querySelector('#subdate1');
        const courseEl = document.querySelector('#cselect1');

        const form = document.querySelector('#form1');

        const checkTitle = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const title = titleEl.value.trim();

            if (!isRequired(title)) {
                showError(titleEl, 'Title cannot be blank.');
            } else if (!isBetween(title.length, min, max)) {
                showError(titleEl, `Title must be between ${min} and ${max} characters.`)
            } else if (!istitleValid(title)) {
                showError(titleEl, 'Title is not valid.')
            } else {
                showSuccess(titleEl);
                valid = true;
            }
            return valid;
        };


        const checkDescription = () => {

            let valid = false;

            const min = 2,
                max = 50;

            const description = descriptionEl.value.trim();

            if (!isRequired(description)) {
                showError(descriptionEl, 'Description cannot be blank.');
            } else if (!isBetween(description.length, min, max)) {
                showError(descriptionEl, `Description must be between ${min} and ${max} characters.`)
            } else if (!isDescriptionValid(description)) {
                showError(descriptionEl, 'Description is not valid.')
            } else {
                showSuccess(descriptionEl);
                valid = true;
            }
            return valid;
        };


        const checkSubdate = () => {
            let valid = false;
            const subdate = subdateEl.value.trim();
            if (!isRequired(subdate)) {
                showError(subdateEl, 'Submission date cannot be blank.');
            } else {
                showSuccess(subdateEl);
                valid = true;
            }
            return valid;
        };

        const checkCourse = () => {
            let valid = false;
            const course = courseEl.value;
            if (course === '') {
                showError(courseEl, 'At least one course must be selected.');
            } else {
                showSuccess(courseEl);
                valid = true;
            }
            return valid;

        }




        const isRequired = value => value === '' ? false : true;
        const isBetween = (length, min, max) => length < min || length > max ? false : true;


        const showError = (input, message) => {
            // get the form-field element
            const formField = input.parentElement;
            // add the error class
            formField.classList.remove('success');
            formField.classList.add('error');

            // show the error message
            const error = formField.querySelector('small');
            error.textContent = message;
        };

        const showSuccess = (input) => {
            // get the form-field element
            const formField = input.parentElement;

            // remove the error class
            formField.classList.remove('error');
            formField.classList.add('success');

            // hide the error message
            const error = formField.querySelector('small');
            error.textContent = '';
        }

        const istitleValid = (title) => {
            const re = /^[a-zA-Z ]+([0-9 ])*$/;
            return re.test(title);
        }

        const isDescriptionValid = (description) => {
            const re = /^\s*[A-Za-z0-9]+(?:\s+[A-Za-z0-9]+)*\s*$/;
            return re.test(description);
        }


        const debounce = (fn, delay = 500) => {
            let timeoutId;
            return (...args) => {
                // cancel the previous timer
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                // setup a new timer
                timeoutId = setTimeout(() => {
                    fn.apply(null, args)
                }, delay);
            };
        };

        form.addEventListener('submit', function(e) {
            // prevent the form from submitting
            e.preventDefault();

            // validate fields
            let isTitleValid = checkTitle(),
                isDescriptionValid = checkDescription(),
                isSubdateValid = checkSubdate(),
                isCourseValid = checkCourse();


            let isFormValid = isTitleValid &&
                isDescriptionValid &&
                isSubdateValid &&
                isCourseValid;

            // submit if the form is valid
            if (isFormValid) {
                alert("Assignment " + titleEl.value + " updated!");
                var x = $("#title1").val();
                var y = $("#cselect1").val();
                $("#assignment1").html(x + ", " + y);
                $('#form1 input').attr('readonly', 'readonly'),
                    $('.update').prop('disabled', true),
                    $('#edit1').prop('disabled', false),
                    $('#form1 select').prop('disabled', true);

            }
        });

        form.addEventListener('input', debounce(function(e) {
            switch (e.target.id) {
                case 'title1':
                    checkTitle();
                    break;
                case 'description1':
                    checkDescription();
                    break;
                case 'subdate1':
                    checkSubdate();
                    break;
                case 'cselect1':
                    checkCourse();
            }
        }));
    };

    // ASSIGNMENT NUMBER TWO
    if ($('body').is('.assignments')) {
        $("#subdate2").datepicker({
            inline: true
        });

        $("#edit2").click(function() {
            $('#form2 input').removeAttr('readonly'),
                $('#form2 input').prop('disabled', false),
                $('#edit2').prop('disabled', true),
                $('#form2 select').prop('disabled', false);
        });

        const titleEl = document.querySelector('#title2');
        const descriptionEl = document.querySelector('#description2');
        const subdateEl = document.querySelector('#subdate2');
        const courseEl = document.querySelector('#cselect2');

        const form = document.querySelector('#form2');

        const checkTitle = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const title = titleEl.value.trim();

            if (!isRequired(title)) {
                showError(titleEl, 'Title cannot be blank.');
            } else if (!isBetween(title.length, min, max)) {
                showError(titleEl, `Title must be between ${min} and ${max} characters.`)
            } else if (!istitleValid(title)) {
                showError(titleEl, 'Title is not valid.')
            } else {
                showSuccess(titleEl);
                valid = true;
            }
            return valid;
        };


        const checkDescription = () => {

            let valid = false;

            const min = 2,
                max = 50;

            const description = descriptionEl.value.trim();

            if (!isRequired(description)) {
                showError(descriptionEl, 'Description cannot be blank.');
            } else if (!isBetween(description.length, min, max)) {
                showError(descriptionEl, `Description must be between ${min} and ${max} characters.`)
            } else if (!isDescriptionValid(description)) {
                showError(descriptionEl, 'Description is not valid.')
            } else {
                showSuccess(descriptionEl);
                valid = true;
            }
            return valid;
        };


        const checkSubdate = () => {
            let valid = false;
            const subdate = subdateEl.value.trim();
            if (!isRequired(subdate)) {
                showError(subdateEl, 'Submission date cannot be blank.');
            } else {
                showSuccess(subdateEl);
                valid = true;
            }
            return valid;
        };

        const checkCourse = () => {
            let valid = false;
            const course = courseEl.value;
            if (course === '') {
                showError(courseEl, 'At least one course must be selected.');
            } else {
                showSuccess(courseEl);
                valid = true;
            }
            return valid;

        }




        const isRequired = value => value === '' ? false : true;
        const isBetween = (length, min, max) => length < min || length > max ? false : true;


        const showError = (input, message) => {
            // get the form-field element
            const formField = input.parentElement;
            // add the error class
            formField.classList.remove('success');
            formField.classList.add('error');

            // show the error message
            const error = formField.querySelector('small');
            error.textContent = message;
        };

        const showSuccess = (input) => {
            // get the form-field element
            const formField = input.parentElement;

            // remove the error class
            formField.classList.remove('error');
            formField.classList.add('success');

            // hide the error message
            const error = formField.querySelector('small');
            error.textContent = '';
        }

        const istitleValid = (title) => {
            const re = /^[a-zA-Z ]+([0-9 ])*$/;
            return re.test(title);
        }

        const isDescriptionValid = (description) => {
            const re = /^\s*[A-Za-z0-9]+(?:\s+[A-Za-z0-9]+)*\s*$/;
            return re.test(description);
        }


        const debounce = (fn, delay = 500) => {
            let timeoutId;
            return (...args) => {
                // cancel the previous timer
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                // setup a new timer
                timeoutId = setTimeout(() => {
                    fn.apply(null, args)
                }, delay);
            };
        };

        form.addEventListener('submit', function(e) {
            // prevent the form from submitting
            e.preventDefault();

            // validate fields
            let isTitleValid = checkTitle(),
                isDescriptionValid = checkDescription(),
                isSubdateValid = checkSubdate(),
                isCourseValid = checkCourse();


            let isFormValid = isTitleValid &&
                isDescriptionValid &&
                isSubdateValid &&
                isCourseValid;

            // submit if the form is valid
            if (isFormValid) {
                alert("Assignment " + titleEl.value + " updated!");
                var x = $("#title2").val();
                var y = $("#cselect2").val();
                $("#assignment2").html(x + ", " + y);
                $('#form2 input').attr('readonly', 'readonly'),
                    $('.update').prop('disabled', true),
                    $('#edit2').prop('disabled', false),
                    $('#form2 select').prop('disabled', true);

            }
        });

        form.addEventListener('input', debounce(function(e) {
            switch (e.target.id) {
                case 'title2':
                    checkTitle();
                    break;
                case 'description2':
                    checkDescription();
                    break;
                case 'subdate2':
                    checkSubdate();
                    break;
                case 'cselect2':
                    checkCourse();
            }
        }));
    };

    // ASSIGNMENT NUMBER THREE
    if ($('body').is('.assignments')) {
        $("#subdate3").datepicker({
            inline: true
        });

        $("#edit3").click(function() {
            $('#form3 input').removeAttr('readonly'),
                $('#form3 input').prop('disabled', false),
                $('#edit3').prop('disabled', true),
                $('#form3 select').prop('disabled', false);
        });

        const titleEl = document.querySelector('#title3');
        const descriptionEl = document.querySelector('#description3');
        const subdateEl = document.querySelector('#subdate3');
        const courseEl = document.querySelector('#cselect3');

        const form = document.querySelector('#form3');

        const checkTitle = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const title = titleEl.value.trim();

            if (!isRequired(title)) {
                showError(titleEl, 'Title cannot be blank.');
            } else if (!isBetween(title.length, min, max)) {
                showError(titleEl, `Title must be between ${min} and ${max} characters.`)
            } else if (!istitleValid(title)) {
                showError(titleEl, 'Title is not valid.')
            } else {
                showSuccess(titleEl);
                valid = true;
            }
            return valid;
        };


        const checkDescription = () => {

            let valid = false;

            const min = 2,
                max = 50;

            const description = descriptionEl.value.trim();

            if (!isRequired(description)) {
                showError(descriptionEl, 'Description cannot be blank.');
            } else if (!isBetween(description.length, min, max)) {
                showError(descriptionEl, `Description must be between ${min} and ${max} characters.`)
            } else if (!isDescriptionValid(description)) {
                showError(descriptionEl, 'Description is not valid.')
            } else {
                showSuccess(descriptionEl);
                valid = true;
            }
            return valid;
        };


        const checkSubdate = () => {
            let valid = false;
            const subdate = subdateEl.value.trim();
            if (!isRequired(subdate)) {
                showError(subdateEl, 'Submission date cannot be blank.');
            } else {
                showSuccess(subdateEl);
                valid = true;
            }
            return valid;
        };

        const checkCourse = () => {
            let valid = false;
            const course = courseEl.value;
            if (course === '') {
                showError(courseEl, 'At least one course must be selected.');
            } else {
                showSuccess(courseEl);
                valid = true;
            }
            return valid;

        }




        const isRequired = value => value === '' ? false : true;
        const isBetween = (length, min, max) => length < min || length > max ? false : true;


        const showError = (input, message) => {
            // get the form-field element
            const formField = input.parentElement;
            // add the error class
            formField.classList.remove('success');
            formField.classList.add('error');

            // show the error message
            const error = formField.querySelector('small');
            error.textContent = message;
        };

        const showSuccess = (input) => {
            // get the form-field element
            const formField = input.parentElement;

            // remove the error class
            formField.classList.remove('error');
            formField.classList.add('success');

            // hide the error message
            const error = formField.querySelector('small');
            error.textContent = '';
        }

        const istitleValid = (title) => {
            const re = /^[a-zA-Z ]+([0-9 ])*$/;
            return re.test(title);
        }

        const isDescriptionValid = (description) => {
            const re = /^\s*[A-Za-z0-9]+(?:\s+[A-Za-z0-9]+)*\s*$/;
            return re.test(description);
        }


        const debounce = (fn, delay = 500) => {
            let timeoutId;
            return (...args) => {
                // cancel the previous timer
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                // setup a new timer
                timeoutId = setTimeout(() => {
                    fn.apply(null, args)
                }, delay);
            };
        };

        form.addEventListener('submit', function(e) {
            // prevent the form from submitting
            e.preventDefault();

            // validate fields
            let isTitleValid = checkTitle(),
                isDescriptionValid = checkDescription(),
                isSubdateValid = checkSubdate(),
                isCourseValid = checkCourse();


            let isFormValid = isTitleValid &&
                isDescriptionValid &&
                isSubdateValid &&
                isCourseValid;

            // submit if the form is valid
            if (isFormValid) {
                alert("Assignment " + titleEl.value + " updated!");
                var x = $("#title3").val();
                var y = $("#cselect3").val();
                $("#assignment3").html(x + ", " + y);
                $('#form3 input').attr('readonly', 'readonly'),
                    $('.update').prop('disabled', true),
                    $('#edit3').prop('disabled', false),
                    $('#form3 select').prop('disabled', true);

            }
        });

        form.addEventListener('input', debounce(function(e) {
            switch (e.target.id) {
                case 'title3':
                    checkTitle();
                    break;
                case 'description3':
                    checkDescription();
                    break;
                case 'subdate3':
                    checkSubdate();
                    break;
                case 'cselect3':
                    checkCourse();
            }
        }));
    };

    // ASSIGNMENT NUMBER FOUR
    if ($('body').is('.assignments')) {
        $("#subdate4").datepicker({
            inline: true
        });

        $("#edit4").click(function() {
            $('#form4 input').removeAttr('readonly'),
                $('#form4 input').prop('disabled', false),
                $('#edit4').prop('disabled', true),
                $('#form4 select').prop('disabled', false);
        });

        const titleEl = document.querySelector('#title4');
        const descriptionEl = document.querySelector('#description4');
        const subdateEl = document.querySelector('#subdate4');
        const courseEl = document.querySelector('#cselect4');

        const form = document.querySelector('#form4');

        const checkTitle = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const title = titleEl.value.trim();

            if (!isRequired(title)) {
                showError(titleEl, 'Title cannot be blank.');
            } else if (!isBetween(title.length, min, max)) {
                showError(titleEl, `Title must be between ${min} and ${max} characters.`)
            } else if (!istitleValid(title)) {
                showError(titleEl, 'Title is not valid.')
            } else {
                showSuccess(titleEl);
                valid = true;
            }
            return valid;
        };


        const checkDescription = () => {

            let valid = false;

            const min = 2,
                max = 50;

            const description = descriptionEl.value.trim();

            if (!isRequired(description)) {
                showError(descriptionEl, 'Description cannot be blank.');
            } else if (!isBetween(description.length, min, max)) {
                showError(descriptionEl, `Description must be between ${min} and ${max} characters.`)
            } else if (!isDescriptionValid(description)) {
                showError(descriptionEl, 'Description is not valid.')
            } else {
                showSuccess(descriptionEl);
                valid = true;
            }
            return valid;
        };


        const checkSubdate = () => {
            let valid = false;
            const subdate = subdateEl.value.trim();
            if (!isRequired(subdate)) {
                showError(subdateEl, 'Submission date cannot be blank.');
            } else {
                showSuccess(subdateEl);
                valid = true;
            }
            return valid;
        };

        const checkCourse = () => {
            let valid = false;
            const course = courseEl.value;
            if (course === '') {
                showError(courseEl, 'At least one course must be selected.');
            } else {
                showSuccess(courseEl);
                valid = true;
            }
            return valid;

        }




        const isRequired = value => value === '' ? false : true;
        const isBetween = (length, min, max) => length < min || length > max ? false : true;


        const showError = (input, message) => {
            // get the form-field element
            const formField = input.parentElement;
            // add the error class
            formField.classList.remove('success');
            formField.classList.add('error');

            // show the error message
            const error = formField.querySelector('small');
            error.textContent = message;
        };

        const showSuccess = (input) => {
            // get the form-field element
            const formField = input.parentElement;

            // remove the error class
            formField.classList.remove('error');
            formField.classList.add('success');

            // hide the error message
            const error = formField.querySelector('small');
            error.textContent = '';
        }

        const istitleValid = (title) => {
            const re = /^[a-zA-Z ]+([0-9 ])*$/;
            return re.test(title);
        }

        const isDescriptionValid = (description) => {
            const re = /^\s*[A-Za-z0-9]+(?:\s+[A-Za-z0-9]+)*\s*$/;
            return re.test(description);
        }


        const debounce = (fn, delay = 500) => {
            let timeoutId;
            return (...args) => {
                // cancel the previous timer
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                // setup a new timer
                timeoutId = setTimeout(() => {
                    fn.apply(null, args)
                }, delay);
            };
        };

        form.addEventListener('submit', function(e) {
            // prevent the form from submitting
            e.preventDefault();

            // validate fields
            let isTitleValid = checkTitle(),
                isDescriptionValid = checkDescription(),
                isSubdateValid = checkSubdate(),
                isCourseValid = checkCourse();


            let isFormValid = isTitleValid &&
                isDescriptionValid &&
                isSubdateValid &&
                isCourseValid;

            // submit if the form is valid
            if (isFormValid) {
                alert("Assignment " + titleEl.value + " updated!");
                var x = $("#title4").val();
                var y = $("#cselect4").val();
                $("#assignment4").html(x + ", " + y);
                $('#form4 input').attr('readonly', 'readonly'),
                    $('.update').prop('disabled', true),
                    $('#edit4').prop('disabled', false),
                    $('#form4 select').prop('disabled', true);

            }
        });

        form.addEventListener('input', debounce(function(e) {
            switch (e.target.id) {
                case 'title4':
                    checkTitle();
                    break;
                case 'description4':
                    checkDescription();
                    break;
                case 'subdate4':
                    checkSubdate();
                    break;
                case 'cselect4':
                    checkCourse();
            }
        }));
    };

    // ASSIGNMENT NUMBER FIVE
    if ($('body').is('.assignments')) {
        $("#subdate5").datepicker({
            inline: true
        });

        $("#edit5").click(function() {
            $('#form5 input').removeAttr('readonly'),
                $('#form5 input').prop('disabled', false),
                $('#edit5').prop('disabled', true),
                $('#form5 select').prop('disabled', false);
        });

        const titleEl = document.querySelector('#title5');
        const descriptionEl = document.querySelector('#description5');
        const subdateEl = document.querySelector('#subdate5');
        const courseEl = document.querySelector('#cselect5');

        const form = document.querySelector('#form5');

        const checkTitle = () => {

            let valid = false;

            const min = 2,
                max = 25;

            const title = titleEl.value.trim();

            if (!isRequired(title)) {
                showError(titleEl, 'Title cannot be blank.');
            } else if (!isBetween(title.length, min, max)) {
                showError(titleEl, `Title must be between ${min} and ${max} characters.`)
            } else if (!istitleValid(title)) {
                showError(titleEl, 'Title is not valid.')
            } else {
                showSuccess(titleEl);
                valid = true;
            }
            return valid;
        };


        const checkDescription = () => {

            let valid = false;

            const min = 2,
                max = 50;

            const description = descriptionEl.value.trim();

            if (!isRequired(description)) {
                showError(descriptionEl, 'Description cannot be blank.');
            } else if (!isBetween(description.length, min, max)) {
                showError(descriptionEl, `Description must be between ${min} and ${max} characters.`)
            } else if (!isDescriptionValid(description)) {
                showError(descriptionEl, 'Description is not valid.')
            } else {
                showSuccess(descriptionEl);
                valid = true;
            }
            return valid;
        };


        const checkSubdate = () => {
            let valid = false;
            const subdate = subdateEl.value.trim();
            if (!isRequired(subdate)) {
                showError(subdateEl, 'Submission date cannot be blank.');
            } else {
                showSuccess(subdateEl);
                valid = true;
            }
            return valid;
        };

        const checkCourse = () => {
            let valid = false;
            const course = courseEl.value;
            if (course === '') {
                showError(courseEl, 'At least one course must be selected.');
            } else {
                showSuccess(courseEl);
                valid = true;
            }
            return valid;

        }




        const isRequired = value => value === '' ? false : true;
        const isBetween = (length, min, max) => length < min || length > max ? false : true;


        const showError = (input, message) => {
            // get the form-field element
            const formField = input.parentElement;
            // add the error class
            formField.classList.remove('success');
            formField.classList.add('error');

            // show the error message
            const error = formField.querySelector('small');
            error.textContent = message;
        };

        const showSuccess = (input) => {
            // get the form-field element
            const formField = input.parentElement;

            // remove the error class
            formField.classList.remove('error');
            formField.classList.add('success');

            // hide the error message
            const error = formField.querySelector('small');
            error.textContent = '';
        }

        const istitleValid = (title) => {
            const re = /^[a-zA-Z ]+([0-9 ])*$/;
            return re.test(title);
        }

        const isDescriptionValid = (description) => {
            const re = /^\s*[A-Za-z0-9]+(?:\s+[A-Za-z0-9]+)*\s*$/;
            return re.test(description);
        }


        const debounce = (fn, delay = 500) => {
            let timeoutId;
            return (...args) => {
                // cancel the previous timer
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                // setup a new timer
                timeoutId = setTimeout(() => {
                    fn.apply(null, args)
                }, delay);
            };
        };

        form.addEventListener('submit', function(e) {
            // prevent the form from submitting
            e.preventDefault();

            // validate fields
            let isTitleValid = checkTitle(),
                isDescriptionValid = checkDescription(),
                isSubdateValid = checkSubdate(),
                isCourseValid = checkCourse();


            let isFormValid = isTitleValid &&
                isDescriptionValid &&
                isSubdateValid &&
                isCourseValid;

            // submit if the form is valid
            if (isFormValid) {
                alert("Assignment " + titleEl.value + " updated!");
                var x = $("#title5").val();
                var y = $("#cselect5").val();
                $("#assignment5").html(x + ", " + y);
                $('#form5 input').attr('readonly', 'readonly'),
                    $('.update').prop('disabled', true),
                    $('#edit5').prop('disabled', false),
                    $('#form5 select').prop('disabled', true);

            }
        });

        form.addEventListener('input', debounce(function(e) {
            switch (e.target.id) {
                case 'title5':
                    checkTitle();
                    break;
                case 'description5':
                    checkDescription();
                    break;
                case 'subdate5':
                    checkSubdate();
                    break;
                case 'cselect5':
                    checkCourse();
            }
        }));
    };

});
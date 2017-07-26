$(document).ready(function() {
    $('.newsub').click(function(event) {
        event.preventDefault();
        var newField = $('#' + $(this).attr('attr')).clone();
        newField.attr('id', '')
        newField.val('');
        $(this).prev().after('<br>');
        $(this).prev().after(newField);
    });
    $('.edit').click(function() {
        $.ajax({
            url: "/itemdata/edit",
            data: {'name':$(this).attr('attr'), 'index': $(this).attr('item')},
            type: "POST",
            success: function (data) {
                insertFields(data);
            }
        });
    });
});

function insertFields(data) {
    var dataKeys = Object.keys(data);
    for (var i = 0; i < dataKeys.length; i++) {
        if (typeof(data[dataKeys[i]]) === 'string') {
            var field = $('form').find('[name=' + dataKeys[i] + ']');
            field.val(data[dataKeys[i]]);
        }
        else if (typeof(data[dataKeys[i]]) === 'object') {
            var keys = Object.keys(data[dataKeys[i]]);
            var subData = data[dataKeys[i]];
            for (var j = 0; j < keys.length; j++) {
                var name = '[name="sub' + keys[j] + ',' + dataKeys[i] + '"]';
                var field = $('form').find(name);
                field.val(subData[keys[j]]);
            }
        }
    }
}
$(document).ready(function() {
    $('#searchInput').on('input', function() {
        const query = $(this).val();
        if (query.length < 3) {
            $('#suggestions').empty().hide(); // Hide suggestions if less than 3 characters
            return;
        }

        const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;

        $.ajax({
            url: url,
            method: 'GET',
            success: function(data) {
                const suggestions = data.docs.slice(0, 5); // Get the first 5 results
                displaySuggestions(suggestions);
            },
            error: function() {
                $('#suggestions').empty().hide(); // Hide suggestions on error
            }
        });
    });

    function displaySuggestions(suggestions) {
        const suggestionsContainer = $('#suggestions');
        suggestionsContainer.empty(); // Clear previous suggestions

        if (suggestions.length === 0) {
            suggestionsContainer.hide(); // Hide if no results
            return;
        }

        suggestions.forEach(suggestion => {
            const item = $('<div>')
                .addClass('suggestion-item')
                .text(suggestion.title)
                .on('click', function() {
                    $('#searchInput').val(suggestion.title);
                    suggestionsContainer.empty().hide(); // Clear suggestions on selection
                });
            suggestionsContainer.append(item);
        });

        suggestionsContainer.show(); // Show suggestions
    }

    // Hide suggestions when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.container').length) {
            $('#suggestions').empty().hide();
        }
    });
});

$(function() {
    var wall = new freewall("#container");

    wall.reset({
        selector: '.item',
        cellH: 'auto',
        onResize: function() {
            wall.refresh();
        }
    });

    wall.fitWidth();
});
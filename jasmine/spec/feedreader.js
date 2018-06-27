/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {
        /* tests to make sure that the allFeeds variable has been
         * defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* tests the allFeeds object to ensure each feed has a URL
         * defined and that it's not empty
         */
        it('have urls', function() {
            allFeeds.forEach(function(each) {
                expect(each['url']).toBeDefined();
                expect(each['url'].length).not.toBe(0);
            })
        });

        /* tests the allFeeds object to ensure each feed has a name
         * defined and that it's not empty
         */
        it('have names', function() {
            allFeeds.forEach(function(each) {
                expect(each['name']).toBeDefined();
                expect(each['name'].length).not.toBe(0);
            })
        });
    });

    describe('The menu', function() {
        /* tests to make sure the menu element is hidden by
         * default
         */
        var body = $('body');
        var menuIcon = $('.menu-icon-link');

        it('is hidden by default', function() {
            expect(body.attr('class')).toContain('menu-hidden');
        });

        /* tests to make sure visibility of the menu element toggles
         * when clicked
         */
        it('is visible when clicked', function() {
            // click once to make visible
            menuIcon.trigger( "click" );
            expect(body.attr('class')).not.toContain('menu-hidden');

            // click twice to hide again
            menuIcon.trigger( "click" );
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {
        /* tests to make sure the .feed container has at least a single
         * .entry element after the loadFeed function is called and completes
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('contains at least 1 entry element on load', function(done) {
            var entryList = $('.feed .entry-link');
            expect(entryList.length).not.toBe(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        /* tests to make sure content changes when a new feed is loaded
         */
        var feedOne, feedTwo;

        beforeEach(function(done) {
            loadFeed(0, function() {
                feedOne = $('.feed').html();
                loadFeed(1, function(){
                    feedTwo = $('.feed').html();
                    done();
                });
            });
        });

        it('changes content', function() {
            expect(feedOne).not.toBe(feedTwo);
        });
    });
}());

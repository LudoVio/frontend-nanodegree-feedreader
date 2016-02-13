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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* Make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have an URL defined and not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.trim()).toBeTruthy();
            });
        });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a name defined and not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.trim()).toBeTruthy();
            });
        });

    });

    describe('The menu', function() {

        /* Ensures the menu element is
         * hidden by default.
         */
        it('is hidden by default', function () {
            expect(document.body.classList).toContain('menu-hidden');
        });

        /* Ensures the menu changes
         * visibility when the menu icon is clicked.
         */
        it('has a visibility toggled by a click on the menu icon', function () {
            var menuIcon = document.getElementsByClassName('menu-icon-link')[0];

            /* Trigger a builtin click event
             * source: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
             */
            function simulateClick() {
                var event = new MouseEvent('click', {
                    'view': window,
                    'bubbles': true,
                    'cancelable': true
                });

                return menuIcon.dispatchEvent(event);
            }

            expect(document.body.classList).toContain('menu-hidden');
            expect(simulateClick()).toBe(true);
            expect(document.body.classList).not.toContain('menu-hidden');
            expect(simulateClick()).toBe(true);
            expect(document.body.classList).toContain('menu-hidden');
        });
    });

    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('contains at least a single .entry element after loadFeed function is called', function () {

        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
     describe('New Feed Selection', function() {

         /* TODO: Write a test that ensures when a new feed is loaded
          * by the loadFeed function that the content actually changes.
          * Remember, loadFeed() is asynchronous.
          */
         it('makes the content actually changes', function () {

         });
     });

}());

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
                expect(feed.url.trim()).toBeTruthy();
            });
        });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a name defined and not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name.trim()).toBeTruthy();
            });
        });

        xit('contains smashingmagazine', function () {
            expect(allFeeds.any(function (feed) {
                return feed.name === 'smashingmagazine';
            })).toBe(true);
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

            expect(document.body.classList).toContain('menu-hidden');
            menuIcon.click();
            expect(document.body.classList).not.toContain('menu-hidden');
            menuIcon.click();
            expect(document.body.classList).toContain('menu-hidden');
        });
    });

    describe('Initial Entries', function() {
        /* Ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('contains at least a single .entry element after loadFeed function is called', function (done) {
            loadFeed(0, function () {
                var entryList = document.querySelectorAll('.feed .entry');

                expect(entryList.length).toBeGreaterThan(0);
                done();
            });
        });
    });

     describe('New Feed Selection', function() {
         /* Ensures when a new feed is loaded
          * by the loadFeed function that the content actually changes.
          */

         // Take 2 Array of Element or 2 Element and check if they have the same innerHTML
         function haveSameInnerHTML (list1, list2) {
             if (! ('innerHTML' in list1 && 'innerHTML' in list2) &&
                 ! ('length' in list1 && 'length' in list2)) {
                 return false
             }

             if ('innerHTML' in list1) {
                 return list1.innerHTML === list2.innerHTML;
             } else {
                 if (list1.length !== list2.length) {
                     return false
                 } else {
                     return list1.every(function (el, idx) {
                         return haveSameInnerHTML(list1[idx], list2[idx]);
                     });
                 }
             }
         }

         it('makes the content actually changes', function (done) {
             loadFeed(0, function () {
                 var firstList = Array.prototype.slice.call(document.querySelectorAll('.feed .entry'), 0);

                 loadFeed(1, function () {
                     var secondList = Array.prototype.slice.call(document.querySelectorAll('.feed .entry'), 0);

                     expect(haveSameInnerHTML(firstList, secondList)).toBe(false);
                     done();
                 });
             });
         });

         it('is the same if the selection is the same', function (done) {
             loadFeed(0, function () {
                 var firstList = Array.prototype.slice.call(document.querySelectorAll('.feed .entry'), 0);

                 loadFeed(0, function () {
                     var secondList = Array.prototype.slice.call(document.querySelectorAll('.feed .entry'), 0);

                     expect(haveSameInnerHTML(firstList, secondList)).toBe(true);
                     done();
                 });
             });
         });
     });

}());

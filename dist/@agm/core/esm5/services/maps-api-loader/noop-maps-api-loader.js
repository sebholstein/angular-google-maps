/**
 * When using the NoOpMapsAPILoader, the Google Maps API must be added to the page via a `<script>`
 * Tag.
 * It's important that the Google Maps API script gets loaded first on the page.
 */
var NoOpMapsAPILoader = /** @class */ (function () {
    function NoOpMapsAPILoader() {
    }
    NoOpMapsAPILoader.prototype.load = function () {
        if (!window.google || !window.google.maps) {
            throw new Error('Google Maps API not loaded on page. Make sure window.google.maps is available!');
        }
        return Promise.resolve();
    };
    return NoOpMapsAPILoader;
}());
export { NoOpMapsAPILoader };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9vcC1tYXBzLWFwaS1sb2FkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9tYXBzLWFwaS1sb2FkZXIvbm9vcC1tYXBzLWFwaS1sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7Ozs7R0FJRztBQUNIO0lBQUE7SUFRQSxDQUFDO0lBUEMsZ0NBQUksR0FBSjtRQUNFLElBQUksQ0FBRSxNQUFjLENBQUMsTUFBTSxJQUFJLENBQUUsTUFBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDM0QsTUFBTSxJQUFJLEtBQUssQ0FDWCxnRkFBZ0YsQ0FBQyxDQUFDO1NBQ3ZGO1FBQ0QsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQVJELElBUUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXBzQVBJTG9hZGVyIH0gZnJvbSAnLi9tYXBzLWFwaS1sb2FkZXInO1xuXG4vKipcbiAqIFdoZW4gdXNpbmcgdGhlIE5vT3BNYXBzQVBJTG9hZGVyLCB0aGUgR29vZ2xlIE1hcHMgQVBJIG11c3QgYmUgYWRkZWQgdG8gdGhlIHBhZ2UgdmlhIGEgYDxzY3JpcHQ+YFxuICogVGFnLlxuICogSXQncyBpbXBvcnRhbnQgdGhhdCB0aGUgR29vZ2xlIE1hcHMgQVBJIHNjcmlwdCBnZXRzIGxvYWRlZCBmaXJzdCBvbiB0aGUgcGFnZS5cbiAqL1xuZXhwb3J0IGNsYXNzIE5vT3BNYXBzQVBJTG9hZGVyIGltcGxlbWVudHMgTWFwc0FQSUxvYWRlciB7XG4gIGxvYWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCEod2luZG93IGFzIGFueSkuZ29vZ2xlIHx8ICEod2luZG93IGFzIGFueSkuZ29vZ2xlLm1hcHMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnR29vZ2xlIE1hcHMgQVBJIG5vdCBsb2FkZWQgb24gcGFnZS4gTWFrZSBzdXJlIHdpbmRvdy5nb29nbGUubWFwcyBpcyBhdmFpbGFibGUhJyk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxufVxuIl19
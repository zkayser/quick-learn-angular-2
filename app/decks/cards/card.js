"use strict";
var Card = (function () {
    function Card() {
        this.totalSeen = 0;
        this.repOfTen = 0;
        this.ofTenForMaster = 0;
        this.temporaryExpire = false;
        this.createdAt = new Date();
        this.lastUpdated = new Date();
    }
    return Card;
}());
exports.Card = Card;
//# sourceMappingURL=card.js.map